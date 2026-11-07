import { useEffect } from 'react';

type Language = 'es' | 'en';

const getPageLanguage = (): Language => (document.documentElement.lang === 'en' ? 'en' : 'es');

/** El idioma lo define la ruta (/ y /en); aquí solo se traducen las opciones de los select */
const applyLanguage = (language: Language) => {
  document.querySelectorAll<HTMLOptionElement>('option[data-es-text]').forEach((option) => {
    const text = language === 'en' ? option.dataset.enText ?? '' : option.dataset.esText ?? '';

    if (option.textContent !== text) {
      option.textContent = text;
    }
  });
};

const buildMobileMenu = (open: boolean) => {
  document.getElementById('mobileMenu')?.remove();

  if (!open) return;

  const navLinks = document.querySelector<HTMLElement>('.nav-links');
  if (!navLinks) return;

  const menu = document.createElement('div');
  menu.id = 'mobileMenu';
  menu.innerHTML = navLinks.innerHTML;

  const cta = document.querySelector<HTMLAnchorElement>('.nav-cta');
  if (cta) {
    const link = document.createElement('a');
    link.href = cta.getAttribute('href') ?? '#contacto';
    link.innerHTML = cta.innerHTML;
    menu.appendChild(link);
  }

  document.body.appendChild(menu);
};

const runCounter = (element: HTMLElement) => {
  if (element.dataset.done) return;

  element.dataset.done = '1';

  const prefix = element.dataset.prefix ?? '';
  const suffix = element.dataset.suffix ?? '';
  const count = element.dataset.count ?? '0';
  const target = Number.parseFloat(count);

  if (prefix === '∞') {
    element.textContent = '∞';
    return;
  }

  if (Number.isNaN(target)) return;

  const decimals = count.includes('.') ? 1 : 0;
  const finalText = `${prefix}${target.toFixed(decimals)}${suffix}`;
  const duration = 1400;
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    element.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    element.textContent = finalText;
  };

  requestAnimationFrame(tick);

  window.setTimeout(() => {
    if (element.textContent !== finalText) element.textContent = finalText;
  }, duration + 400);
};

const fireCounters = (element: HTMLElement) => {
  element.querySelectorAll<HTMLElement>('[data-count]').forEach(runCounter);
  if (element.hasAttribute('data-count')) runCounter(element);
};

const revealElement = (element: HTMLElement) => {
  if (element.classList.contains('in')) return;

  element.classList.add('in');
  fireCounters(element);

  window.setTimeout(() => {
    element.style.transition = 'none';
  }, 1500);
};

const forceShow = (element: HTMLElement) => {
  element.style.transition = 'none';
  element.classList.add('in');
  fireCounters(element);
};

const checkReveals = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

  document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) revealElement(element);
  });

  document.querySelectorAll<HTMLElement>('.mock [data-count]:not([data-done])').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.96 && rect.bottom > 0) runCounter(element);
  });
};

export const useLandingInteractions = () => {
  useEffect(() => {
    const language = getPageLanguage();
    let languageUpdateFrame: number | null = null;
    const timers: number[] = [];

    const nav = document.getElementById('nav');
    const handleScroll = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 20);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      if (target.closest('#burger')) {
        const open = document.body.classList.toggle('menu-open');
        buildMobileMenu(open);
        return;
      }

      if (target.closest('#mobileMenu a')) {
        document.body.classList.remove('menu-open');
        buildMobileMenu(false);
        return;
      }

      const faqQuestion = target.closest<HTMLButtonElement>('.faq-q');
      if (faqQuestion) {
        const item = faqQuestion.parentElement;
        const answer = item?.querySelector<HTMLElement>('.faq-a');
        if (!item || !answer) return;

        const open = item.classList.toggle('open');
        answer.style.maxHeight = open ? `${answer.scrollHeight}px` : '0';
      }
    };

    const formStartedAt = performance.now();

    const handleSubmit = async (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (form?.id !== 'quoteForm') return;

      event.preventDefault();

      const errorBox = document.getElementById('formError');
      const submit = document.getElementById('quoteSubmit') as HTMLButtonElement | null;
      const showError = (kind: 'validation' | 'captcha' | 'server' | null) => {
        errorBox?.classList.toggle('show', kind !== null);
        errorBox?.querySelectorAll<HTMLElement>('p[data-kind]').forEach((line) => {
          line.hidden = line.dataset.kind !== kind;
        });
      };

      showError(null);

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const payload = {
        name: data.get('name'),
        company: data.get('company'),
        email: data.get('email'),
        service: data.get('service'),
        message: data.get('message'),
        website: data.get('website'),
        token: data.get('cf-turnstile-response'),
        lang: document.documentElement.lang === 'en' ? 'en' : 'es',
        elapsed: Math.round(performance.now() - formStartedAt),
      };

      submit?.classList.add('sending');
      if (submit) submit.disabled = true;

      try {
        const response = await fetch('/api/contacto', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };

        if (response.ok && result.ok) {
          form.style.display = 'none';
          document.getElementById('formSuccess')?.classList.add('show');
          return;
        }

        showError(result.error === 'validation' ? 'validation' : result.error === 'captcha' ? 'captcha' : 'server');
      } catch {
        showError('server');
      }

      // Un token de Turnstile solo sirve una vez: se pide uno nuevo para reintentar
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
      submit?.classList.remove('sending');
      if (submit) submit.disabled = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach(forceShow);
      }
    };

    const growHeroChartBars = () => {
      document.querySelectorAll<HTMLElement>('.chart b').forEach((bar) => {
        const height = bar.style.height;
        bar.style.height = '0%';

        requestAnimationFrame(() => {
          timers.push(
            window.setTimeout(() => {
              bar.style.height = height;
            }, 250),
          );
        });
      });
    };

    const languageObserver = new MutationObserver(() => {
      if (languageUpdateFrame !== null) return;

      languageUpdateFrame = requestAnimationFrame(() => {
        languageUpdateFrame = null;
        applyLanguage(language);
      });
    });
    languageObserver.observe(document.body, { childList: true, subtree: true });

    const prefersNoMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    applyLanguage(language);
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit);

    if (prefersNoMotion || document.hidden) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach(forceShow);
    } else {
      window.addEventListener('scroll', checkReveals, { passive: true });
      window.addEventListener('resize', checkReveals);
      window.addEventListener('load', checkReveals);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      checkReveals();
      timers.push(window.setTimeout(checkReveals, 300));
      timers.push(
        window.setTimeout(() => {
          const viewportHeight = window.innerHeight || 800;
          document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((element) => {
            if (element.getBoundingClientRect().top < viewportHeight) forceShow(element);
          });
        }, 1600),
      );
    }

    if (document.readyState === 'complete') {
      growHeroChartBars();
    } else {
      window.addEventListener('load', growHeroChartBars, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', checkReveals);
      window.removeEventListener('resize', checkReveals);
      window.removeEventListener('load', checkReveals);
      window.removeEventListener('load', growHeroChartBars);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      languageObserver.disconnect();
      if (languageUpdateFrame !== null) cancelAnimationFrame(languageUpdateFrame);
      timers.forEach(window.clearTimeout);
      document.body.classList.remove('menu-open');
      document.getElementById('mobileMenu')?.remove();
    };
  }, []);
};
