const menuButton = document.getElementById('menuButton');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    const siteData = {
      title: 'EcoRecicla | Reciclagem e Sustentabilidade',
      text: 'Conheça conteúdos sobre reciclagem, sustentabilidade e descarte consciente.',
      url: window.location.href
    };

    menuButton.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuButton.textContent = navLinks.classList.contains('active') ? 'Fechar' : 'Menu';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuButton.textContent = 'Menu';
      });
    });

    async function shareSite() {
      if (navigator.share) {
        try {
          await navigator.share(siteData);
        } catch (error) {
          console.log('Compartilhamento cancelado ou não permitido.', error);
        }
      } else {
        navigator.clipboard.writeText(siteData.url);
        alert('Link copiado para a área de transferência!');
      }
    }

    shareSiteButton.addEventListener('click', shareSite);

    document.querySelectorAll('[data-share]').forEach(button => {
      button.addEventListener('click', () => {
        const type = button.dataset.share;
        const encodedUrl = encodeURIComponent(siteData.url);
        const encodedText = encodeURIComponent(siteData.text);
        let shareUrl = '';

        if (type === 'whatsapp') {
          shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        }

        if (type === 'facebook') {
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        }

        if (type === 'linkedin') {
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        }

        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      });
    });

    contactForm.addEventListener('submit', event => {
      event.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      const emailTo = 'contato@ecorecicla.com.br';
      const mailSubject = encodeURIComponent(`[Site EcoRecicla] ${subject}`);
      const mailBody = encodeURIComponent(
        `Nome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${message}`
      );

      formFeedback.style.display = 'block';
      window.location.href = `mailto:${emailTo}?subject=${mailSubject}&body=${mailBody}`;
      contactForm.reset();
    });