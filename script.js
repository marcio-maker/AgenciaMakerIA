// script.js - VERSÃO 5.2 SUPER OTIMIZADA E CORRIGIDA - COMPLETA E FUNCIONAL
document.addEventListener('DOMContentLoaded', function () {
  console.debug('MakerAI Studio v5.2 - Sistema otimizado inicializando...');

  // ============ CONFIGURAÇÕES GLOBAIS OTIMIZADAS ============
  const config = {
    debug: true, // Mantenha true para debug durante testes
    carouselInterval: 5000,
    assistantEnabled: true,
    formEndpoint: 'https://formspree.io/f/mzzbpyvz',
    loadingTimeout: 3000,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    animationThreshold: 0.1,
    pwaKey: 'pwa-banner-closed',
    carouselRestartDelay: 5000
  };

  // ============ UTILITÁRIOS OTIMIZADOS ============
  function log(message, data = null) {
    if (config.debug) {
      console.debug(`[MakerAI] ${message}`, data || '');
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function validateEmail(email) {
    return config.emailRegex.test(email);
  }

  // Função de sanitização para prevenir XSS
  function sanitizeHTML(str, allowBasicHTML = false) {
    if (!str) return '';

    const div = document.createElement('div');

    if (allowBasicHTML) {
      // Permite tags seguras para traduções
      const temp = str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/&lt;(\/?(span|strong|em|br|i|b|mark|a)(?:\s[^>]*)?)&gt;/gi, '<$1>');
      div.innerHTML = temp;
    } else {
      div.textContent = str;
    }

    return div.innerHTML;
  }

  // ============ FUNÇÕES DE NOTIFICAÇÃO E OVERLAY ============
  function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');

    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: 'var(--radius)',
      color: 'white',
      backgroundColor: type === 'success' ? '#10b981' :
        type === 'error' ? '#ef4444' :
          type === 'warning' ? '#f59e0b' : '#3b82f6',
      zIndex: '99998',
      boxShadow: 'var(--shadow)',
      animation: 'fadeInUp 0.3s ease',
      maxWidth: '350px',
      wordBreak: 'break-word'
    });

    document.body.appendChild(notification);
    notification.focus();

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  function openOverlay(overlayElement) {
    if (!overlayElement) return;

    overlayElement.classList.add('active');
    overlayElement.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const focusable = overlayElement.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }, 100);

    // Fecha outros overlays abertos
    const allOverlays = ['detailsOverlay', 'caseModal', 'assistantOverlay'];
    allOverlays.forEach(id => {
      const overlay = document.getElementById(id);
      if (overlay && overlay !== overlayElement && overlay.classList.contains('active')) {
        closeOverlay(overlay);
      }
    });
  }

  function closeOverlay(overlayElement) {
    if (!overlayElement) return;
    overlayElement.classList.remove('active');
    overlayElement.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // ============ INICIALIZAÇÃO SEGURA OTIMIZADA ============
  function initComponent(initFunction, componentName) {
    try {
      initFunction();
      log(`${componentName} inicializado`);
      return true;
    } catch (error) {
      console.warn(`Erro ao inicializar ${componentName}:`, error);
      showNotification(`Erro ao carregar ${componentName}`, 'error');
      return false;
    }
  }

  // ============ LOADING SCREEN SUPER OTIMIZADO ============
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) {
      log('Loading screen não encontrado');
      return;
    }

    if (document.readyState === 'complete') {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 500);
      }, 300);
      return;
    }

    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, config.loadingTimeout);

    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
          loadingScreen.classList.add('hidden');
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }
      }, 200);
    });
  }

  // ============ OTIMIZAÇÃO DE IMAGENS ============
  let imageObserver = null;

  function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if (images.length === 0) {
      log('Nenhuma imagem para otimizar');
      return;
    }

    if ('IntersectionObserver' in window) {
      imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.fetchPriority = 'high';
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });

      images.forEach(img => {
        if (!img.complete) {
          imageObserver.observe(img);
        }
      });
    }

    log(`Imagens otimizadas: ${images.length}`);
  }

  // ============ MOBILE MENU OTIMIZADO ============
  function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeMenuBtn = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!hamburgerBtn || !closeMenuBtn || !mobileMenu) {
      log('Elementos do menu mobile não encontrados');
      return;
    }

    let isMenuOpen = false;
    let menuEventListenersAdded = false;

    // === MOVIDA PARA CIMA: função que fecha outros overlays ===
    function closeAllOverlaysExcept(excludeElement) {
      const overlays = ['detailsOverlay', 'caseModal', 'assistantOverlay'];
      overlays.forEach(overlayId => {
        const overlay = document.getElementById(overlayId);
        if (overlay && overlay !== excludeElement && overlay.classList.contains('active')) {
          closeOverlay(overlay);
        }
      });
    }

    function toggleMobileMenu() {
      isMenuOpen = !mobileMenu.classList.contains('active');

      mobileMenu.classList.toggle('active');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isMenuOpen.toString());
      mobileMenu.setAttribute('aria-hidden', (!isMenuOpen).toString());

      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
        closeAllOverlaysExcept(mobileMenu); // agora a função já existe
        if (!menuEventListenersAdded) {
          addMenuEventListeners();
          menuEventListenersAdded = true;
        }
      } else {
        document.body.style.overflow = '';
      }
    }

    function addMenuEventListeners() {
      // Fechar com Escape
      const escapeHandler = (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      };

      // Fechar ao clicar fora
      const clickOutsideHandler = (e) => {
        if (e.target === mobileMenu) {
          toggleMobileMenu();
        }
      };

      mobileMenu.addEventListener('click', clickOutsideHandler);
      document.addEventListener('keydown', escapeHandler);

      // Limpar event listeners quando menu fechar
      mobileMenu.addEventListener('transitionend', function handler() {
        if (!mobileMenu.classList.contains('active')) {
          mobileMenu.removeEventListener('click', clickOutsideHandler);
          document.removeEventListener('keydown', escapeHandler);
          mobileMenu.removeEventListener('transitionend', handler);
          menuEventListenersAdded = false;
        }
      });
    }

    // Event listeners principais
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    closeMenuBtn.addEventListener('click', toggleMobileMenu);

    // Fechar menu ao clicar em links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
          toggleMobileMenu();
        }
      });
    });

    // Botões de controle mobile (idioma e tema)
    mobileMenu.querySelectorAll('.mobile-lang-btn, #mobileThemeToggle').forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          setTimeout(toggleMobileMenu, 300);
        });
      }
    });
  }
  // ============ THEME TOGGLE OTIMIZADO ============
  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const html = document.documentElement;

    if (!themeToggle || !mobileThemeToggle) {
      log('Botões de tema não encontrados');
      return;
    }

    function toggleTheme() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      const icon = newTheme === 'dark' ? '🌙' : '☀️';

      themeToggle.textContent = icon;
      mobileThemeToggle.textContent = icon;
      localStorage.setItem('theme', newTheme);

      if (window.innerWidth > 768) {
        showNotification(`Tema alterado para ${newTheme === 'dark' ? 'escuro' : 'claro'}`, 'info');
      }
    }

    function setSavedTheme() {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      html.setAttribute('data-theme', savedTheme);
      const icon = savedTheme === 'dark' ? '🌙' : '☀️';
      themeToggle.textContent = icon;
      mobileThemeToggle.textContent = icon;
    }

    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);

    setSavedTheme();
  }

  // ============ GERENCIAMENTO DE PREFERÊNCIAS ============
  function initPreferences() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('preferredLang') || 'pt';

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (window.MakerAITranslations) {
      setTimeout(() => {
        window.MakerAITranslations.setLanguage(savedLang);
      }, 100);
    }

    window.addEventListener('storage', (e) => {
      if (e.key === 'theme') {
        document.documentElement.setAttribute('data-theme', e.newValue || 'dark');
      }
      if (e.key === 'preferredLang' && window.MakerAITranslations) {
        window.MakerAITranslations.setLanguage(e.newValue || 'pt');
      }
    });
  }

  // ============ SCROLL HORIZONTAL OTIMIZADO ============
  function initHorizontalScroll() {
    const cardsContainers = document.querySelectorAll('.cards-container');

    if (cardsContainers.length === 0) {
      log('Containers de scroll horizontal não encontrados');
      return;
    }

    cardsContainers.forEach(container => {
      const scrollWrapper = container.querySelector('.cards-scroll-wrapper');
      if (!scrollWrapper) return;

      // Adicionar hint de scroll no mobile/tablet
      if (window.innerWidth <= 1024) {
        const scrollHint = document.createElement('div');
        scrollHint.className = 'cards-scroll-hint';
        scrollHint.setAttribute('data-t', 'scroll.hint');

        // ESTILOS INLINE GARANTEM A APARÊNCIA IMEDIATA
        scrollHint.style.cssText = `
        display: block;
        text-align: center;
        padding: 1rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
        opacity: 0.7;
        animation: fadeInUp 0.8s ease;
        margin-top: 0.5rem;
        font-weight: 500;
        letter-spacing: 0.5px;
      `;

        container.appendChild(scrollHint);

        // Atualizar hint com tradução
        const updateScrollHint = () => {
          if (window.MakerAITranslations) {
            const translation = window.MakerAITranslations.translations[window.MakerAITranslations.getCurrentLang()]?.['scroll.hint'];
            if (translation) scrollHint.textContent = sanitizeHTML(translation);
          } else {
            scrollHint.textContent = '← Arraste para ver mais →';
          }
        };

        // Atualizar agora e quando idioma mudar
        updateScrollHint();

        // Event listener para atualização de idioma
        const handleLanguageChange = () => {
          updateScrollHint();
        };

        // Usar evento customizado do seu sistema de tradução
        window.addEventListener('languageChanged', handleLanguageChange);

        // Limpar event listener quando não for mais necessário
        container.addEventListener('remove', () => {
          window.removeEventListener('languageChanged', handleLanguageChange);
        });
      }

      // Configurar scroll horizontal com mouse wheel
      scrollWrapper.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollWrapper.scrollLeft += e.deltaY;
        }
      });

      // Suporte para touch devices
      let isTouch = false;
      let startX;
      let scrollLeft;

      scrollWrapper.addEventListener('touchstart', (e) => {
        isTouch = true;
        startX = e.touches[0].pageX - scrollWrapper.offsetLeft;
        scrollLeft = scrollWrapper.scrollLeft;
        scrollWrapper.style.scrollBehavior = 'auto'; // Desativa smooth scroll durante drag
      });

      scrollWrapper.addEventListener('touchmove', (e) => {
        if (!isTouch) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        scrollWrapper.scrollLeft = scrollLeft - walk;
      });

      scrollWrapper.addEventListener('touchend', () => {
        isTouch = false;
        scrollWrapper.style.scrollBehavior = 'smooth'; // Reativa smooth scroll
      });

      // Otimização de performance para scroll
      scrollWrapper.addEventListener('scroll', debounce(() => {
        // Opcional: adicionar lógica de parallax ou lazy loading aqui
      }, 100));
    });
  }

  // ============ CAROUSEL OTIMIZADO ============
  function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');

    if (!carouselTrack || dots.length === 0) {
      log('Carousel não encontrado');
      return;
    }

    // ✅ NOVO: Limpar intervalo anterior se existir
    if (window.makerAICarouselInterval) {
      clearInterval(window.makerAICarouselInterval);
      window.makerAICarouselInterval = null;
    }

    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let isUserInteracting = false;

    function goToSlide(index) {
      if (index >= totalSlides) index = 0;
      if (index < 0) index = totalSlides - 1;

      currentSlide = index;
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
        dot.setAttribute('aria-current', i === currentSlide ? 'true' : 'false');
      });

      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', i !== currentSlide ? 'true' : 'false');
      });
    }

    function nextSlide() {
      if (!isUserInteracting) {
        goToSlide(currentSlide + 1);
      }
    }

    function startAutoSlide() {
      if (totalSlides > 1) {
        stopAutoSlide();
        window.makerAICarouselInterval = setInterval(nextSlide, config.carouselInterval);
      }
    }

    function stopAutoSlide() {
      if (window.makerAICarouselInterval) {
        clearInterval(window.makerAICarouselInterval);
        window.makerAICarouselInterval = null;
      }
    }

    function restartAutoSlideWithDelay() {
      isUserInteracting = true;
      stopAutoSlide();
      setTimeout(() => {
        isUserInteracting = false;
        startAutoSlide();
      }, config.carouselRestartDelay);
    }

    // Event listeners para dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        restartAutoSlideWithDelay();
        goToSlide(index);
      });
    });

    // Botões nos slides do carousel (handler unificado)
    document.querySelectorAll('.carousel-actions .btn[data-project]').forEach(btn => {
      btn.addEventListener('click', function () {
        const project = this.dataset.project;
        showNotification(`Projeto "${project}" selecionado. Em uma implementação real, isso abriria uma página de demonstração.`, 'info');
      });
    });

    // Pause no hover
    const carousel = carouselTrack.closest('.carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        stopAutoSlide();
      });

      carousel.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        startAutoSlide();
      });
    }

    // Inicializar
    goToSlide(0);
    startAutoSlide();
  }

  // ============ FAQ ACCORDION OTIMIZADO ============
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length === 0) {
      log('FAQ não encontrado');
      return;
    }

    faqQuestions.forEach(question => {
      const answer = question.nextElementSibling;
      if (!answer) return;

      question.addEventListener('click', function () {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Fecha todas as outras respostas
        faqQuestions.forEach(q => {
          if (q !== this) {
            q.setAttribute('aria-expanded', 'false');
            const otherAnswer = q.nextElementSibling;
            if (otherAnswer) {
              otherAnswer.style.maxHeight = null;
            }
          }
        });

        // Alterna a atual
        this.setAttribute('aria-expanded', !isExpanded);

        if (isExpanded) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });

      // Adicionar suporte a teclado
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  }

  // ============ SERVICE CARDS OTIMIZADO ============
  function initServiceCards() {
    const serviceCards = document.querySelectorAll('.card-toggle');
    const detailsOverlay = document.getElementById('detailsOverlay');
    const closeBtn = detailsOverlay?.querySelector('.close-overlay');
    const detailsContent = document.getElementById('detailsContent');

    if (!detailsOverlay || !closeBtn || !detailsContent) {
      log('Service cards ou overlay não encontrados');
      return;
    }
    
    const serviceDetails = {
      'web-apps': {
        title: 'Web Apps e PWAs',
        description: 'Desenvolvemos Progressive Web Apps (PWAs) de alta performance que funcionam offline, podem ser instaladas como aplicativos nativos e oferecem experiências ricas e interativas, como a demo completa da Universidade de Pais.',
        features: [
          'Responsividade total para todos os dispositivos',
          'Funcionamento offline completo com cache inteligente',
          'Persistência local de dados (progresso, perfil, favoritos e configurações)',
          'Instalação como app nativo com banner e manifest PWA',
          'Performance otimizada e design moderno com animações fluidas'
        ],
        technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Service Workers', 'LocalStorage', 'Web Manifest']
      },
      'ia': {
        title: 'Avatares & Consultores IA',
        description: 'Assistentes conversacionais personalizados que atendem clientes 24/7, realizam vendas, dão suporte e coletam dados valiosos para seu negócio.',
        features: [
          'Integração com LLMs (GPT-4, Claude, etc.)',
          'Treinamento com sua base de conhecimento',
          'Multilíngue e com personalidade definida',
          'Análise de sentimentos e intenções',
          'Relatórios de performance detalhados'
        ],
        technologies: ['OpenAI API', 'FastAPI', 'WebSocket', 'LangChain']
      },
      'rpa': {
        title: 'Automações RPA',
        description: 'Robotic Process Automation para automatizar tarefas repetitivas, aumentar produtividade e reduzir erros humanos.',
        features: [
          'Automação de processos em qualquer software',
          'Integração com APIs e sistemas legados',
          'Agendamento e execução automática',
          'Monitoramento em tempo real',
          'Relatórios de execução e erros'
        ],
        technologies: ['Python', 'Selenium', 'UiPath', 'APIs REST']
      },
      '3d': {
        title: 'Modelagem 3D',
        description: 'Criamos experiências imersivas com gráficos 3D, realidade aumentada e visualizações interativas para produtos, arquitetura e educação.',
        features: [
          'Modelos 3D otimizados para web',
          'Integração com AR (realidade aumentada)',
          'Interatividade com mouse/toque',
          'Animações suaves e realistas',
          'Compatibilidade com todos os navegadores'
        ],
        technologies: ['Three.js', 'Blender', 'WebGL', 'AR.js']
      },
      'dashboards': {
        title: 'Sistemas e Dashboards',
        description: 'Desenvolvemos backends escaláveis, APIs robustas e painéis de análise com visualizações de dados em tempo real.',
        features: [
          'APIs REST/GraphQL documentadas',
          'Autenticação e autorização avançadas',
          'Dashboards com gráficos interativos',
          'Exportação de dados (PDF, Excel, CSV)',
          'Monitoramento e alertas'
        ],
        technologies: ['Node.js', 'FastAPI', 'PostgreSQL', 'Chart.js']
      },
      'seo': {
        title: 'Conteúdo & SEO Técnico',
        description: 'Otimização completa para mecanismos de busca, incluindo SEO técnico, conteúdo otimizado para IA e estratégias de marketing digital.',
        features: [
          'Auditoria técnica completa',
          'Otimização para buscas por voz',
          'Conteúdo gerado por IA otimizado',
          'Schema markup estruturado',
          'Monitoramento de rankings'
        ],
        technologies: ['Next.js SEO', 'Schema.org', 'AI Content Tools', 'Analytics']
      }
    };

    function closeDetailsOverlay() {
      closeOverlay(detailsOverlay);
    }

    serviceCards.forEach(card => {
      card.addEventListener('click', function () {
        const target = this.dataset.target;
        const details = serviceDetails[target];

        if (details) {
          detailsContent.innerHTML = (`
            <h3>${details.title}</h3>
            <p class="subtitle">${details.description}</p>
            
            <h4>Principais Recursos:</h4>
            <ul style="margin: 1rem 0 2rem 0; padding-left: 1.5rem;">
              ${details.features.map(feature => `<li style="margin-bottom: 0.5rem;">${sanitizeHTML(feature)}</li>`).join('')}
            </ul>
            
            <h4>Tecnologias Utilizadas:</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0 2rem 0;">
              ${details.technologies.map(tech =>
            `<span style="background: var(--gradient-primary); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.875rem;">${sanitizeHTML(tech)}</span>`
          ).join('')}
            </div>
            
            <div style="text-align: center;">
              <a href="#contato" class="btn primary">Solicitar Orçamento</a>
            </div>
          `);

          openOverlay(detailsOverlay);
        }
      });
    });

    closeBtn.addEventListener('click', closeDetailsOverlay);

    detailsOverlay.addEventListener('click', (e) => {
      if (e.target === detailsOverlay) {
        closeDetailsOverlay();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && detailsOverlay.classList.contains('active')) {
        closeDetailsOverlay();
      }
    });
  }

  // ============ ASSISTENTE IA ============
  function initAssistant() {
    if (!config.assistantEnabled) return;

    const assistantBtn = document.getElementById('assistantBtn');
    const assistantOverlay = document.getElementById('assistantOverlay');

    if (!assistantBtn) {
      log('Botão do assistente não encontrado');
      return;
    }

    // Decidir qual método usar: popup ou overlay
    const usePopup = true; // Mude para false para usar overlay

    if (usePopup) {
      // Método popup (original)
      assistantBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // Evita abrir múltiplas janelas
        if (assistantBtn.dataset.opened === 'true') return;
        assistantBtn.dataset.opened = 'true';

        // Dimensões responsivas
        const isMobile = window.innerWidth < 768;
        const width = isMobile ? window.innerWidth - 40 : 500;
        const height = isMobile ? window.innerHeight - 100 : 720;

        // Centraliza na tela
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        // Abre o assistant.html em popup
        const assistantWindow = window.open(
          'assistant.html',
          'MakerAI_Assistant',
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no,directories=no`
        );

        // Animação no botão
        assistantBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
          assistantBtn.style.transform = '';
        }, 300);

        // Permite reabrir caso a janela seja fechada
        if (assistantWindow) {
          const checkClosed = setInterval(() => {
            if (assistantWindow.closed) {
              clearInterval(checkClosed);
              assistantBtn.dataset.opened = 'false';
            }
          }, 500);
        } else {
          // Caso o popup seja bloqueado
          showNotification('Popup bloqueado. Por favor, permita popups para este site.', 'warning');
          assistantBtn.dataset.opened = 'false';
        }
      });
    } else {
      // Método overlay (alternativo)
      if (!assistantOverlay) {
        log('Overlay do assistente não encontrado');
        return;
      }

      const closeAssistantBtn = assistantOverlay.querySelector('.close-overlay');

      assistantBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openOverlay(assistantOverlay);
      });

      if (closeAssistantBtn) {
        closeAssistantBtn.addEventListener('click', () => {
          closeOverlay(assistantOverlay);
        });
      }

      assistantOverlay.addEventListener('click', (e) => {
        if (e.target === assistantOverlay) {
          closeOverlay(assistantOverlay);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && assistantOverlay.classList.contains('active')) {
          closeOverlay(assistantOverlay);
        }
      });
    }
  }

  // ============ FORMULÁRIO DE CONTATO - REDIRECIONA PARA WHATSAPP ============
  function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
      log('Formulário de contato não encontrado');
      return;
    }

    // Validação em tempo real
    const validateField = (field) => {
      const value = field.value.trim();
      const parent = field.closest('.form-group');

      if (!parent) return true;

      parent.classList.remove('error', 'success');

      if (field.required && !value) {
        parent.classList.add('error');
        return false;
      }

      if (field.type === 'email' && value) {
        if (!validateEmail(value)) {
          parent.classList.add('error');
          return false;
        }
      }

      if (value) {
        parent.classList.add('success');
      }
      return true;
    };

    const formFields = contactForm.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        const parent = field.closest('.form-group');
        if (parent) parent.classList.remove('error', 'success');
      });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      const originalText = submitBtn.textContent;

      let isValid = true;
      let firstInvalidField = null;

      formFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });

      if (!isValid) {
        showNotification('Por favor, preencha todos os campos corretamente.', 'error');
        if (firstInvalidField) firstInvalidField.focus();
        return;
      }

      // Texto do botão traduzido
      const currentLang = window.MakerAITranslations?.getCurrentLang() || 'pt';
      const sendingText = window.MakerAITranslations?.translations[currentLang]?.['contact.sending_whatsapp'] || 'Enviando para WhatsApp...';
      submitBtn.textContent = sendingText;
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');

      try {
        const name = document.querySelector('#contactForm input[name="name"]')?.value.trim() || 'Não informado';
        const email = document.querySelector('#contactForm input[name="email"]')?.value.trim() || 'Não informado';
        const serviceSelect = document.querySelector('#contactForm select[name="service"]');
        const serviceText = serviceSelect?.selectedOptions[0]?.textContent.trim() || 'Não especificado';
        const message = document.querySelector('#contactForm textarea[name="message"]')?.value.trim() || 'Sem mensagem adicional.';

        // Mensagem traduzida dinamicamente
        let greeting = 'Olá', nameLabel = '*Nome:*', emailLabel = '*E-mail:*', serviceLabel = '*Serviço de interesse:*', messageLabel = '*Mensagem:*', closing = 'Aguardo retorno. Obrigado! 🙌';

        if (currentLang === 'en') {
          greeting = 'Hello';
          nameLabel = '*Name:*';
          emailLabel = '*Email:*';
          serviceLabel = '*Service of interest:*';
          messageLabel = '*Message:*';
          closing = 'Looking forward to your reply. Thank you! 🙌';
        } else if (currentLang === 'es') {
          greeting = 'Hola';
          nameLabel = '*Nombre:*';
          emailLabel = '*Correo:*';
          serviceLabel = '*Servicio de interés:*';
          messageLabel = '*Mensaje:*';
          closing = 'Espero su respuesta. ¡Gracias! 🙌';
        }

        const whatsappText = `${greeting}, MakerAI Studio! 👋%0a%0a` +
          `${nameLabel} ${name}%0a` +
          `${emailLabel} ${email}%0a` +
          `${serviceLabel} ${serviceText}%0a%0a` +
          `${messageLabel}%0a${message}%0a%0a` +
          `${closing}`;

        const whatsappNumber = '5511914809693';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

        contactForm.reset();
        showNotification('Dados validados! Abrindo WhatsApp...', 'success');

        formFields.forEach(field => {
          const parent = field.closest('.form-group');
          if (parent) parent.classList.remove('success', 'error');
        });

        setTimeout(() => {
          window.open(whatsappURL, '_blank');
        }, 1200);

      } catch (error) {
        console.error('Erro ao preparar WhatsApp:', error);
        showNotification('Erro ao abrir WhatsApp. Tente novamente.', 'error');
      } finally {
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.setAttribute('aria-busy', 'false');
        }, 1500);
      }
    });
  }

  // ============ CASES MODAL OTIMIZADO ============
  function initCasesModal() {
    const modal = document.getElementById('caseModal');
    const content = document.getElementById('caseContent');
    if (!modal || !content) {
      log('Modal de cases não encontrado');
      return;
    }

    const cases = {
      saude: {
        title: 'Clínica Médica +300%',
        challenge: 'A clínica enfrentava altas taxas de faltas em consultas e baixa eficiência no agendamento.',
        solution: 'Desenvolvemos um sistema de agendamento inteligente com IA que prevê possíveis faltas e otimiza a agenda.',
        results: ['Redução de 85% nas faltas', 'Aumento de 300% na eficiência do agendamento', 'Satisfação do paciente aumentou em 95%', 'ROI de 12x em 6 meses'],
        technologies: ['React', 'Node.js', 'Machine Learning', 'Twilio API']
      },
      ecommerce: {
        title: 'E-commerce 5x ROI',
        challenge: 'Baixa taxa de conversão e alto abandono de carrinho.',
        solution: 'PWA com chatbot de vendas integrado e sistema de recomendação personalizado.',
        results: ['Aumento de 240% na conversão', 'Redução de 60% no abandono de carrinho', 'ROI de 5x em 4 meses', 'Aumento de 180% no ticket médio'],
        technologies: ['Next.js', 'OpenAI API', 'Stripe', 'Redis']
      },
      educacao: {
        title: 'Plataforma EAD +400%',
        challenge: 'Baixa retenção de alunos e engajamento nas aulas online.',
        solution: 'Sistema gamificado com recompensas, avatares IA e aprendizado adaptativo.',
        results: ['Aumento de 400% na retenção', 'Engajamento cresceu 320%', 'Satisfação dos alunos: 98%', 'Expansão para 3 novos países'],
        technologies: ['React Native', 'WebGL', 'MongoDB', 'Socket.io']
      }
    };

    document.querySelectorAll('[data-case]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.case;
        const data = cases[id];
        if (!data) return;

        content.innerHTML = `
          <h3>${sanitizeHTML(data.title)}</h3>
          <h4>Desafio</h4>
          <p>${sanitizeHTML(data.challenge)}</p>
          <h4>Solução</h4>
          <p>${sanitizeHTML(data.solution)}</p>
          <h4>Resultados</h4>
          <ul>
            ${data.results.map(r => `<li>${sanitizeHTML(r)}</li>`).join('')}
          </ul>
          <h4>Tecnologias Utilizadas</h4>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:2rem;">
            ${data.technologies.map(t => `<span style="background:var(--gradient-primary);color:white;padding:4px 12px;border-radius:20px;font-size:0.875rem;">${sanitizeHTML(t)}</span>`).join('')}
          </div>
          <div style="text-align:center;">
            <a href="#contato" class="btn primary">Quero resultados similares</a>
          </div>
        `;

        openOverlay(modal);
      });
    });

    modal.querySelector('.modal-close')?.addEventListener('click', () => closeOverlay(modal));
    modal.addEventListener('click', e => e.target === modal && closeOverlay(modal));
    document.addEventListener('keydown', e => e.key === 'Escape' && modal.classList.contains('active') && closeOverlay(modal));
  }

  // ============ HANDLERS PARA LINKS DEMO (NOVO) ============
  function initDemoLinks() {
    // Links de projeto (demo-link)
    document.querySelectorAll('.demo-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const project = this.dataset.project || this.dataset.article || 'demo';
        const type = this.dataset.article ? 'artigo' : 'projeto';
        showNotification(`Demonstração do ${type} "${project}" em breve!`, 'info');
      });
    });

    // Botões com data-product, data-assistant, data-project (unificado)
    const handleProductClick = function () {
      const type = this.dataset.product ? 'produto' :
        this.dataset.assistant ? 'assistente' : 'projeto';
      const name = this.dataset.product || this.dataset.assistant || this.dataset.project || 'demo';
      showNotification(`${type} "${name}" selecionado. Em uma implementação real, isso abriria uma demonstração.`, 'info');
    };

    // Aplicar handler único para todos
    document.querySelectorAll('[data-product], [data-assistant], [data-project]').forEach(btn => {
      // Remover listeners anteriores para evitar duplicação
      btn.removeEventListener('click', handleProductClick);
      btn.addEventListener('click', handleProductClick);
    });
  }

  // ============ SMOOTH SCROLL OTIMIZADO ============
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#' || href === '#!') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 100;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  // ============ ANIMAÇÕES DE ENTRADA OTIMIZADAS ============
  let scrollObserver = null;

  function initScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: config.animationThreshold,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observar elementos com classes de animação
    document.querySelectorAll('.section, .card, .tech-card').forEach(el => {
      scrollObserver.observe(el);
    });
  }

  // ============ OTIMIZAÇÃO PARA MOBILE ============
  function initMobileOptimizations() {
    // Detectar touch screen
    const isTouchDevice = 'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
      document.documentElement.classList.add('touch-device');

      document.querySelectorAll('button, a, .card').forEach(el => {
        el.style.tapHighlightColor = 'transparent';
        el.style.webkitTapHighlightColor = 'transparent';
      });
    }

    // Prevenir zoom em inputs no iOS
    document.addEventListener('touchstart', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        document.body.style.zoom = '100%';
      }
    }, { passive: true });

    // Detectar orientação
    const handleOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      document.documentElement.classList.toggle('portrait', isPortrait);
      document.documentElement.classList.toggle('landscape', !isPortrait);
    };

    window.addEventListener('resize', debounce(handleOrientation, 100));
    window.addEventListener('orientationchange', handleOrientation);
    handleOrientation();
  }

  // ============ SISTEMA DE LOGS AVANÇADO ============
  function initAdvancedLogging() {
    if (!config.debug) return;

    window.addEventListener('error', (e) => {
      log(`Erro capturado: ${e.message} em ${e.filename}:${e.lineno}`, e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      log(`Promessa não tratada: ${e.reason}`, e.promise);
    });
  }

  // ============ PERFORMANCE FINAL ============
  function initPerformance() {
    if (window.makerAIInitialized) return;
    window.makerAIInitialized = true;

    // Otimizar para preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--transition-smooth', 'none');
      document.querySelectorAll('[class*="animation"]').forEach(el => {
        el.style.animation = 'none';
      });
    }

    // Log de performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.performance) {
          const navTiming = performance.getEntriesByType('navigation')[0];
          if (navTiming) {
            log(`Carregamento completo em ${(navTiming.loadEventEnd - navTiming.startTime).toFixed(0)}ms`);
          }
        }
      }, 0);
    });
  }

  // ============ LIMPEZA DE OBSERVERS ============
  function cleanupObservers() {
    if (imageObserver) {
      imageObserver.disconnect();
      imageObserver = null;
    }

    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }
  }

  // ============ INICIALIZAÇÃO COMPLETA OTIMIZADA ============
  function initAll() {
    const criticalComponents = [
      { fn: initLoadingScreen, name: 'Loading Screen' },
      { fn: initThemeToggle, name: 'Alternador de Tema' },
      { fn: initAssistant, name: 'Assistente IA' },
      { fn: optimizeImages, name: 'Otimização de Imagens' },
      { fn: initMobileMenu, name: 'Menu Mobile' },
      { fn: initSmoothScroll, name: 'Scroll Suave' },
      { fn: initMobileOptimizations, name: 'Otimizações Mobile' },
      { fn: initDemoLinks, name: 'Links Demo' }
    ];

    const nonCriticalComponents = [
      { fn: initCarousel, name: 'Carrossel' },
      { fn: initFAQ, name: 'FAQ' },
      { fn: initServiceCards, name: 'Cards de Serviço' },
      { fn: initCasesModal, name: 'Modal de Cases' },
      { fn: initContactForm, name: 'Formulário de Contato' },
      { fn: initScrollAnimations, name: 'Animações de Scroll' },
      { fn: initAdvancedLogging, name: 'Logs Avançados' },
      { fn: initPWAInstall, name: 'Banner PWA' }, // <--- DEVE ESTAR AQUI
      { fn: initPerformance, name: 'Performance' }
    ];

    // Executa críticos
    criticalComponents.forEach(c => initComponent(c.fn, c.name));

    // Executa secundários com delay
    setTimeout(() => {
      nonCriticalComponents.forEach(c => initComponent(c.fn, c.name));
    }, 150);

    log('Sistema v5.2 inicializado completamente');
  }

  // ============ EXECUÇÃO SEGURA ============
  try {
    requestAnimationFrame(() => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
      } else {
        initAll();
      }
    });
  } catch (error) {
    console.error('Erro na inicialização:', error);
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
    showNotification('Erro ao inicializar a página. Por favor, recarregue.', 'error');
  }
});

// ============ BANNER DE INSTALAÇÃO PWA OTIMIZADO ============

function initPWAInstall() {
  const banner = document.getElementById('pwaBanner');
  const btnInstall = document.getElementById('btnInstallPWA');
  const btnClose = document.getElementById('btnClosePWA');

  if (!banner || !btnInstall || !btnClose) {
    console.warn('Elementos do banner PWA não encontrados');
    return;
  }

  let deferredPrompt = null;
  const translations = window.MakerAITranslations?.translations || {};
  const getLang = () => window.MakerAITranslations?.getCurrentLang() || 'pt';

  // Função para atualizar todos os textos do banner com tradução
  function updateBannerText() {
    const lang = getLang();
    const t = translations[lang]?.pwa || translations['pt']?.pwa || {};

    const titleEl = banner.querySelector('.pwa-info strong');
    const descEl = banner.querySelector('.pwa-info p');

    if (titleEl) titleEl.textContent = t.title || 'MakerAI no teu telemóvel';
    if (descEl) {
      descEl.innerHTML = t.banner ||
        `Instale o MakerAI Studio e receba <strong>grátis</strong> o Guia de Prompts IA!<br>
         <em>Já instalado por +127 profissionais</em>`;
    }
    btnInstall.textContent = t.install_button || 'Instalar + Receber Guia Grátis';
  }

  // Exibe o banner
  banner.style.display = 'block';
  updateBannerText();

  // Escuta mudança de idioma (evento já disparado pelo seu sistema de tradução)
  window.addEventListener('languageChanged', updateBannerText);

  // Captura o evento de instalação PWA
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA pronto para instalação');
  });

  // Clique no botão Instalar → abre modal de lead
  btnInstall.addEventListener('click', openLeadModal);

  function openLeadModal() {
    // Remove modal antigo se existir
    const existing = document.getElementById('pwaLeadModal');
    if (existing) existing.remove();

    const lang = getLang();
    const t = translations[lang]?.pwa || {};
    const common = translations[lang]?.common || {};

    const modal = document.createElement('div');
    modal.id = 'pwaLeadModal';
    modal.className = 'assistant-overlay active';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'pwa-lead-title');

    modal.innerHTML = `
    <div class="assistant-container-wrapper" style="
      max-width: 460px;
      padding: 2rem;
      text-align: center;
      background: var(--surface);
      color: var(--text);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      border: 1px solid var(--border);
    ">
      <h3 id="pwa-lead-title" style="margin-bottom: 1rem; font-size: 1.8rem;">🎁 Bônus Exclusivo</h3>
      <p style="margin-bottom: 2rem; line-height: 1.7; opacity: 0.9; font-size: 1.05rem;">
        ${t.modal_text ||
      `Instale agora e receba <strong>instantaneamente</strong>:<br><br>
           ✅ Guia Completo de 150+ Prompts IA<br>
           ✅ Dicas Semanais exclusivas no WhatsApp<br><br>
           <em>Já usado por +127 profissionais</em>`}
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <button type="button" id="pwaDirectInstallBtn" class="btn primary large" style="min-width: 220px;">
          ${t.direct_install_button || 'Instalar + Receber no WhatsApp'}
        </button>
        <button type="button" id="pwaLeadCancel" class="btn secondary">
          ${common.later || 'Depois'}
        </button>
      </div>

      <p style="font-size: 0.8rem; margin-top: 1.5rem; opacity: 0.7;">
        ${t.privacy || 'Você será direcionado ao WhatsApp. Seus dados não são coletados aqui.'}
      </p>
    </div>
  `;

    document.body.appendChild(modal);

    // Fechar modal
    const closeModal = () => modal.remove();
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.id === 'pwaLeadCancel') closeModal();
    });
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Botão principal: abre WhatsApp + tenta instalar PWA
    document.getElementById('pwaDirectInstallBtn').addEventListener('click', () => {
      closeModal();

      // Mensagem pré-pronta para o WhatsApp
      const message = encodeURIComponent(
        `🚀 *Quero o Guia de 150+ Prompts IA + Dicas Semanais!*\n\n` +
        `Vi no site MakerAI Studio e instalei o app.\n` +
        `Me envia o bônus exclusivo? 😊`
      );

      // Abre WhatsApp
      window.open(`https://wa.me/5511914809693?text=${message}`, '_blank');

      showNotification('Redirecionando para o WhatsApp...', 'success');

      // Tenta instalar o PWA (se o prompt estiver disponível)
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            showNotification('App instalado com sucesso! 🎉', 'success');
            banner.style.display = 'none'; // Esconde o banner após instalação
          }
          deferredPrompt = null;
        });
      }
    });
  }

  // Fechar banner
  btnClose.addEventListener('click', () => {
    banner.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  });
}
