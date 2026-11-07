import { useEffect } from 'react'
import Lenis from 'lenis'

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/* ------------------------------------------------------------------ hero canvas */
type RGB = [number, number, number]

/** Sprite de brillo suave (círculo con degradado radial) para dibujar nebulosas y destellos con drawImage. */
const glowSprite = ([r, g, b]: RGB, size = 128) => {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const x = c.getContext('2d')!
  const grad = x.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`)
  grad.addColorStop(0.35, `rgba(${r},${g},${b},.35)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)
  x.fillStyle = grad
  x.fillRect(0, 0, size, size)
  return c
}

/**
 * Galaxia espiral: brazos con polvo oscuro, nebulosas, bulbo estelar, núcleo con destello,
 * anillos orbitales con satélites y campo de estrellas. Nace con una animación de entrada
 * y se inclina con el mouse y el scroll.
 */
const initHeroCanvas = (canvas: HTMLCanvasElement, still: boolean) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  let w = 0
  let h = 0
  let raf = 0
  let visible = true
  let tx = 0
  let ty = 0
  let px = 0
  let py = 0
  let scrollY = 0
  const born = performance.now() + 700

  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
  const mobile = window.innerWidth < 700

  /* paleta continua del centro al borde: blanco → ámbar → rosa → violeta → azul → cian */
  const stops: Array<[number, RGB]> = [
    [0, [255, 248, 240]],
    [0.12, [255, 196, 150]],
    [0.26, [255, 130, 140]],
    [0.42, [190, 90, 240]],
    [0.65, [100, 120, 255]],
    [1, [50, 205, 240]],
  ]
  const sample = (t: number): RGB => {
    for (let i = 1; i < stops.length; i++) {
      if (t <= stops[i][0]) {
        const [t0, c0] = stops[i - 1]
        const [t1, c1] = stops[i]
        const k = (t - t0) / (t1 - t0)
        return [lerp(c0[0], c1[0], k), lerp(c0[1], c1[1], k), lerp(c0[2], c1[2], k)].map(Math.round) as RGB
      }
    }
    return stops[stops.length - 1][1]
  }
  const PAL = 36
  const palette = Array.from({ length: PAL }, (_, i) => {
    const [r, g, b] = sample(i / (PAL - 1))
    return `rgb(${r},${g},${b})`
  })

  type Star = { r: number; a: number; z: number; sz: number; al: number; c: number; v: number; tw: number }
  const stars: Star[] = []
  const armStar = (arm: number, main: boolean): Star => {
    const r = Math.pow(Math.random(), 1.45)
    const spread = (0.16 + r * 0.34) * (main ? 0.85 : 1.25)
    return {
      r,
      a: arm * (Math.PI / 2) + r * 5.1 + gauss() * spread,
      z: gauss() * 0.045 * (1 - r * 0.5),
      sz: Math.random() < 0.07 ? 2.2 : Math.random() < 0.4 ? 1.5 : 1,
      al: (main ? 0.55 : 0.35) + Math.random() * 0.45,
      c: Math.min(PAL - 1, Math.floor(Math.pow(r, 0.8) * PAL)),
      v: gauss() * 0.004,
      tw: Math.random() < 0.035 ? Math.random() * 6.28 : -1,
    }
  }
  const nArm = mobile ? 5200 : 13500
  for (let i = 0; i < nArm; i++) {
    const main = Math.random() < 0.72
    stars.push(armStar(main ? Math.floor(Math.random() * 2) * 2 : 1 + Math.floor(Math.random() * 2) * 2, main))
  }
  // bulbo
  for (let i = 0; i < (mobile ? 900 : 2600); i++) {
    const r = Math.pow(Math.random(), 2.1) * 0.3
    stars.push({
      r,
      a: Math.random() * 6.28,
      z: gauss() * 0.16 * (1 - r),
      sz: Math.random() < 0.1 ? 2 : 1.3,
      al: 0.5 + Math.random() * 0.5,
      c: Math.min(PAL - 1, Math.floor(r * 0.9 * PAL)),
      v: gauss() * 0.01,
      tw: -1,
    })
  }
  // halo disperso
  for (let i = 0; i < (mobile ? 250 : 800); i++) {
    const r = 0.25 + Math.random() * 0.8
    stars.push({ r, a: Math.random() * 6.28, z: gauss() * 0.2, sz: 1, al: 0.18 + Math.random() * 0.3, c: Math.min(PAL - 1, Math.floor(r * PAL)), v: 0, tw: -1 })
  }
  stars.sort((p, q) => p.c - q.c)

  /* polvo oscuro en el borde interior de los brazos */
  const dust = Array.from({ length: mobile ? 500 : 1500 }, () => {
    const r = 0.14 + Math.pow(Math.random(), 1.2) * 0.62
    const arm = Math.floor(Math.random() * 2) * 2
    return { r, a: arm * (Math.PI / 2) + r * 5.1 - 0.42 + gauss() * 0.13, sz: 3 + Math.random() * 5 + r * 4, al: 0.1 + Math.random() * 0.16 }
  })

  /* nebulosas a lo largo de los brazos */
  const sprites = [glowSprite([190, 90, 240]), glowSprite([255, 120, 150]), glowSprite([90, 130, 255]), glowSprite([60, 200, 235])]
  const white = glowSprite([255, 244, 232], 64)
  const warm = glowSprite([255, 170, 120])
  const blobs = Array.from({ length: mobile ? 36 : 80 }, () => {
    const r = 0.12 + Math.pow(Math.random(), 1.1) * 0.85
    const arm = Math.floor(Math.random() * 4)
    return { r, a: arm * (Math.PI / 2) + r * 5.1 + gauss() * 0.22, s: (0.1 + Math.random() * 0.2) * (1.1 - r * 0.4), k: r < 0.35 ? (Math.random() < 0.5 ? 1 : 0) : r < 0.65 ? (Math.random() < 0.5 ? 0 : 2) : Math.random() < 0.5 ? 2 : 3, al: 0.05 + Math.random() * 0.07 }
  })

  /* fondo de estrellas */
  const bg = Array.from({ length: mobile ? 80 : 220 }, () => ({ x: Math.random(), y: Math.random(), s: 0.5 + Math.random() * 1.1, p: Math.random() * 6.28, d: 0.3 + Math.random() }))

  /* satélites en los anillos */
  const rings: Array<{ r: number; col: string; lw: number; sat: number; speed: number; phase: number }> = [
    { r: 0.2, col: 'rgba(255,205,175,.85)', lw: 2.2, sat: 1, speed: 0.55, phase: 0.6 },
    { r: 0.4, col: 'rgba(140,130,255,.7)', lw: 1.6, sat: 1, speed: -0.34, phase: 2.4 },
    { r: 0.68, col: 'rgba(90,165,255,.45)', lw: 1.3, sat: 2, speed: 0.2, phase: 4 },
    { r: 0.97, col: 'rgba(70,215,240,.25)', lw: 1, sat: 1, speed: -0.12, phase: 1 },
  ]

  const resize = () => {
    const r = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    w = r.width
    h = r.height
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const draw = (now: number) => {
    const t = still ? 6 : now / 1000
    const k = still ? 1 : clamp((now - born) / 2600)
    const ease = 1 - Math.pow(1 - k, 3)
    px = lerp(px, tx, 0.045)
    py = lerp(py, ty, 0.045)

    const R0 = Math.min(w * 0.38, h * 0.82)
    const R = R0 * (0.25 + 0.75 * ease)
    const cx = w / 2 + px * 14
    const cy = h * 0.56 + py * 8
    const tilt = clamp(0.3 + py * 0.15 + scrollY * 0.00008, 0.22, 0.62)
    const rot = -0.1 + px * 0.16 + scrollY * 0.00025
    const cr = Math.cos(rot)
    const sr = Math.sin(rot)
    const swirl = (1 - ease) * 3.2
    const spin = t * 0.055

    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, w, h)
    ctx.globalAlpha = 1

    const pos = (r: number, a: number, z: number, out: [number, number]) => {
      const x = Math.cos(a) * r * R
      const y = Math.sin(a) * r * R * tilt + z * R
      out[0] = cx + x * cr - y * sr
      out[1] = cy + x * sr + y * cr
    }
    const o: [number, number] = [0, 0]

    // estrellas de fondo
    ctx.globalCompositeOperation = 'lighter'
    ctx.fillStyle = '#cfd6ff'
    for (const s of bg) {
      ctx.globalAlpha = (0.15 + 0.5 * (0.5 + 0.5 * Math.sin(t * s.d * 1.6 + s.p))) * ease
      ctx.fillRect(s.x * w - px * 10 * s.d, s.y * h - py * 6 * s.d, s.s, s.s)
    }

    // polvo oscuro
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#05040c'
    for (const d of dust) {
      pos(d.r, d.a + spin + swirl / (d.r + 0.2) * 0.3, 0, o)
      ctx.globalAlpha = d.al * ease
      ctx.fillRect(o[0] - d.sz / 2, o[1] - d.sz / 2, d.sz, d.sz)
    }

    ctx.globalCompositeOperation = 'lighter'

    // nebulosas
    for (const b of blobs) {
      pos(b.r, b.a + spin + swirl / (b.r + 0.2) * 0.3, 0, o)
      const sz = R * (0.16 + b.s)
      ctx.globalAlpha = b.al * ease
      ctx.drawImage(sprites[b.k], o[0] - sz / 2, o[1] - (sz * tilt * 1.6) / 2, sz, sz * tilt * 1.6)
    }

    // halo del núcleo (aplastado por la inclinación)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rot)
    ctx.scale(1, tilt)
    ctx.globalAlpha = 0.85 * ease
    ctx.drawImage(warm, -R * 0.5, -R * 0.5, R, R)
    ctx.globalAlpha = 0.5 * ease
    ctx.drawImage(sprites[0], -R * 0.9, -R * 0.9, R * 1.8, R * 1.8)
    ctx.restore()

    // estrellas
    let cur = -1
    for (const p of stars) {
      const a = p.a + spin * (1 + (0.3 - p.r) * 1.6 + p.v * 60) + swirl / (p.r + 0.2) * 0.3
      pos(p.r, a, p.z, o)
      if (p.c !== cur) {
        cur = p.c
        ctx.fillStyle = palette[cur]
      }
      let al = p.al
      if (p.tw >= 0) al *= 0.55 + 0.45 * Math.sin(t * 2.4 + p.tw)
      ctx.globalAlpha = al * ease
      ctx.fillRect(o[0], o[1], p.sz, p.sz)
      if (p.tw >= 0 && p.sz > 2 && al > 0.5) {
        ctx.drawImage(white, o[0] - 6, o[1] - 6, 14, 14)
      }
    }

    // anillos y satélites
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rot)
    ctx.scale(1, tilt)
    for (const rg of rings) {
      ctx.globalAlpha = ease
      ctx.strokeStyle = rg.col
      ctx.lineWidth = rg.lw / tilt
      ctx.shadowColor = rg.col
      ctx.shadowBlur = 18
      ctx.beginPath()
      ctx.arc(0, 0, rg.r * R, 0, Math.PI * 2)
      ctx.stroke()
      ctx.shadowBlur = 0
      for (let i = 0; i < rg.sat; i++) {
        const base = rg.phase + t * rg.speed + (i * Math.PI * 2) / rg.sat
        for (let j = 12; j >= 0; j--) {
          const ang = base - Math.sign(rg.speed) * j * 0.035
          ctx.globalAlpha = (1 - j / 13) * 0.5 * ease
          const sx = Math.cos(ang) * rg.r * R
          const sy = Math.sin(ang) * rg.r * R
          ctx.fillStyle = '#fff'
          ctx.beginPath()
          ctx.arc(sx, sy, (j === 0 ? 2.6 : 1.6) / Math.sqrt(tilt), 0, Math.PI * 2)
          ctx.fill()
        }
        const sx = Math.cos(base) * rg.r * R
        const sy = Math.sin(base) * rg.r * R
        ctx.globalAlpha = 0.9 * ease
        ctx.drawImage(white, sx - 11, sy - 11 / tilt, 22, 22 / tilt)
      }
    }
    ctx.restore()

    // centro brillante + destello horizontal
    ctx.globalAlpha = ease
    const cs = R * 0.22
    ctx.drawImage(white, cx - cs / 2, cy - cs / 2, cs, cs)
    ctx.drawImage(white, cx - cs / 5, cy - cs / 5, cs / 2.5, cs / 2.5)
    const flare = ctx.createLinearGradient(cx - R * 0.75, 0, cx + R * 0.75, 0)
    flare.addColorStop(0, 'rgba(255,200,170,0)')
    flare.addColorStop(0.5, `rgba(255,236,220,${0.5 + 0.2 * Math.sin(t * 1.3)})`)
    flare.addColorStop(1, 'rgba(255,200,170,0)')
    ctx.globalAlpha = ease
    ctx.fillStyle = flare
    ctx.fillRect(cx - R * 0.75, cy - 0.8, R * 1.5, 1.6)

    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  const loop = (now: number) => {
    if (visible && !document.hidden) draw(now)
    raf = requestAnimationFrame(loop)
  }

  const onMove = (e: PointerEvent) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 1.4
    ty = (e.clientY / window.innerHeight - 0.5) * 1.6
  }
  const onScroll = () => {
    scrollY = window.scrollY
  }

  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
  })
  io.observe(canvas)

  if (still) draw(0)
  else raf = requestAnimationFrame(loop)

  return () => {
    cancelAnimationFrame(raf)
    io.disconnect()
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('scroll', onScroll)
  }
}

/* ------------------------------------------------------------------ main hook */
export const useFx = () => {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false
    const cleanups: Array<() => void> = []
    const navH = () => document.getElementById('nav')?.offsetHeight ?? 62

    /* ---------- loader ---------- */
    const loader = document.getElementById('loader')
    const ldn = document.getElementById('ldn')
    let readyFired = false
    const fireReady = () => {
      if (readyFired) return
      readyFired = true
      root.classList.add('ready')
      loader?.classList.add('done')
      window.setTimeout(() => loader?.remove(), 1400)
    }
    if (loader && !reduce && document.getElementById('heroCanvas')) {
      const seen = (() => {
        try {
          return sessionStorage.getItem('idl') === '1'
        } catch {
          return false
        }
      })()
      try {
        sessionStorage.setItem('idl', '1')
      } catch {
        /* sin almacenamiento */
      }
      const dur = seen ? 600 : 1900
      const t0 = performance.now()
      let loaded = document.readyState === 'complete'
      window.addEventListener('load', () => (loaded = true), { once: true })
      const tick = (now: number) => {
        const p = clamp((now - t0) / dur)
        const shown = loaded || p < 0.9 ? p : 0.9
        const eased = 1 - (1 - shown) ** 3
        loader.style.setProperty('--p', String(eased))
        if (ldn) ldn.textContent = String(Math.round(eased * 100))
        if (shown >= 1) {
          fireReady()
          return
        }
        requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      window.setTimeout(fireReady, 3200)
    } else {
      fireReady()
    }

    /* ---------- smooth scroll ---------- */
    let lenis: Lenis | null = null
    let rafId = 0
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 })
      const raf = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]')
      if (!a) return
      const url = new URL(a.href, location.href)
      if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return
      const target = url.hash === '#top' ? document.body : document.querySelector<HTMLElement>(decodeURIComponent(url.hash))
      if (!target) return
      e.preventDefault()
      document.body.classList.remove('menu-open')
      document.getElementById('mobileMenu')?.remove()
      if (lenis) lenis.scrollTo(url.hash === '#top' ? 0 : target, { offset: -navH() + 1, duration: 1.4 })
      else window.scrollTo({ top: url.hash === '#top' ? 0 : target.getBoundingClientRect().top + scrollY - navH() + 1 })
      history.replaceState(null, '', url.hash)
    }
    document.addEventListener('click', onAnchor)
    cleanups.push(() => document.removeEventListener('click', onAnchor))

    /* ---------- hero canvas ---------- */
    const canvas = document.getElementById('heroCanvas') as HTMLCanvasElement | null
    if (canvas) cleanups.push(initHeroCanvas(canvas, reduce))

    /* ---------- scroll-driven pieces ---------- */
    const nav = document.getElementById('nav')
    const progress = document.querySelector<HTMLElement>('.progress')
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    const scrubs = Array.from(document.querySelectorAll<HTMLElement>('[data-scrub]')).map((el) => ({
      el,
      words: Array.from(el.querySelectorAll<HTMLElement>('.w')).filter((w) => w.offsetParent !== null || w.getClientRects().length),
    }))
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav="dark"]'))
    const bel = document.querySelector<HTMLElement>('[data-bel]')
    const belCards = bel ? Array.from(bel.querySelectorAll<HTMLElement>('.bel-card')) : []
    let belIdx = 0
    const blurEl = document.querySelector<HTMLElement>('.bottom-blur')
    const footerEl = document.querySelector<HTMLElement>('footer')
    const proc = document.querySelector<HTMLElement>('[data-proc]')
    const track = proc?.querySelector<HTMLElement>('[data-proc-track]') ?? null
    const steps = track ? Array.from(track.querySelectorAll<HTMLElement>('.step')) : []
    const procNum = proc?.querySelector<HTMLElement>('[data-proc-n]') ?? null
    let overflow = 0
    let lastY = window.scrollY
    let lastStep = 0

    const sizeProc = () => {
      if (!proc || !track) return
      if (window.innerWidth <= 980) {
        proc.style.removeProperty('--proc-h')
        track.style.transform = ''
        overflow = 0
        return
      }
      overflow = Math.max(0, track.scrollWidth - window.innerWidth)
      proc.style.setProperty('--proc-h', `${overflow + window.innerHeight * 1.15}px`)
    }

    const update = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh

      if (blurEl && footerEl) blurEl.classList.toggle('off', footerEl.getBoundingClientRect().top < vh - 30)
      progress?.style.setProperty('--sp', String(max > 0 ? clamp(y / max) : 0))

      if (nav) {
        nav.classList.toggle('scrolled', y > 20)
        const mid = nav.offsetHeight / 2
        const overDark = darkSections.some((el) => {
          const r = el.getBoundingClientRect()
          return r.top <= mid && r.bottom > mid
        })
        nav.classList.toggle('dark', overDark || document.body.classList.contains('menu-open'))
      }
      lastY = y

      if (!reduce) {
        for (const el of parallax) {
          const r = el.getBoundingClientRect()
          if (r.bottom < -200 || r.top > vh + 200) continue
          const f = Number(el.dataset.parallax) || 0
          const off = (vh / 2 - (r.top + r.height / 2 - (Number(el.dataset.pty) || 0))) * f
          el.dataset.pty = String(off)
          el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`
        }
      }

      for (const s of scrubs) {
        const r = s.el.getBoundingClientRect()
        const p = reduce ? 1 : clamp((vh * 0.82 - r.top) / (r.height + vh * 0.28))
        const n = Math.round(p * s.words.length)
        s.words.forEach((w, i) => w.classList.toggle('on', i < n))
      }

      if (bel && belCards.length) {
        let idx = 0
        if (window.innerWidth > 980) {
          const r = bel.getBoundingClientRect()
          const p = clamp(-r.top / Math.max(1, bel.offsetHeight - vh))
          idx = Math.min(belCards.length - 1, Math.floor(p * belCards.length * 0.999))
        } else {
          let best = Infinity
          belCards.forEach((c, i) => {
            const cr = c.getBoundingClientRect()
            const d = Math.abs(cr.top + cr.height / 2 - vh / 2)
            if (d < best) {
              best = d
              idx = i
            }
          })
        }
        if (idx !== belIdx || !belCards[idx].classList.contains('active')) {
          belIdx = idx
          belCards.forEach((c, i) => c.classList.toggle('active', i === idx))
        }
      }

      if (proc && track && overflow > 0) {
        const r = proc.getBoundingClientRect()
        const total = proc.offsetHeight - vh
        const p = clamp(-r.top / total)
        track.style.transform = `translate3d(${(-p * overflow).toFixed(1)}px,0,0)`
        proc.style.setProperty('--pp', String(p))
        const idx = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999))
        if (idx !== lastStep) {
          lastStep = idx
          steps.forEach((s, i) => s.classList.toggle('active', i <= idx))
          if (procNum) procNum.textContent = String(idx + 1).padStart(2, '0')
        }
      }
    }

    sizeProc()
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', () => {
      sizeProc()
      update()
    })
    window.addEventListener('load', () => {
      sizeProc()
      update()
    })
    cleanups.push(() => window.removeEventListener('scroll', update))

    /* ---------- cursor + magnetic buttons ---------- */
    if (finePointer && !reduce) {
      const cur = document.querySelector<HTMLElement>('.cursor')
      let cx = -100
      let cy = -100
      let mx = -100
      let my = -100
      let curRaf = 0
      const loop = () => {
        cx = lerp(cx, mx, 0.2)
        cy = lerp(cy, my, 0.2)
        if (cur) cur.style.transform = `translate3d(${cx}px,${cy}px,0)`
        curRaf = requestAnimationFrame(loop)
      }
      curRaf = requestAnimationFrame(loop)

      const onMove = (e: PointerEvent) => {
        mx = e.clientX
        my = e.clientY
        if (!root.classList.contains('has-cursor')) {
          cx = mx
          cy = my
          root.classList.add('has-cursor')
          cur?.classList.add('show')
        }
        const hot = (e.target as Element | null)?.closest('a,button,summary,label,[data-magnet],.work')
        cur?.classList.toggle('hover', !!hot)

        const mag = (e.target as Element | null)?.closest<HTMLElement>('[data-magnet]')
        document.querySelectorAll<HTMLElement>('[data-magnet].mag-on').forEach((el) => {
          if (el !== mag) {
            el.style.transform = ''
            el.classList.remove('mag-on')
          }
        })
        if (mag) {
          const r = mag.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.18
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.28
          mag.style.transform = `translate(${dx.toFixed(1)}px,${dy.toFixed(1)}px)`
          mag.classList.add('mag-on')
        }
      }
      const onLeave = () => cur?.classList.remove('show')
      const onEnter = () => cur?.classList.add('show')
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('mouseleave', onLeave)
      document.addEventListener('mouseenter', onEnter)
      cleanups.push(() => {
        cancelAnimationFrame(curRaf)
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('mouseleave', onLeave)
        document.removeEventListener('mouseenter', onEnter)
        root.classList.remove('has-cursor')
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])
}
