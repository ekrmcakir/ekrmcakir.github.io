/**
 * EKREM ÇAKIR — Interactive Portfolio Logic
 * Inspired by Eric Cole (eric-cole.framer.website)
 */

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initViewToggle();
  initFormInteractions();
  initEmailCopy();
});

// 1. Live UTC+3 Clock
function initClock() {
  const clockEl = document.getElementById('live-time');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', {
      timeZone: 'Europe/Istanbul',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    clockEl.textContent = timeStr;
  }

  update();
  setInterval(update, 1000);
}

// 2. View Toggle ([GRID] vs [LIST]) — Exact Eric Cole Feature
function initViewToggle() {
  const btnGrid = document.getElementById('btn-view-grid');
  const btnList = document.getElementById('btn-view-list');
  const viewContainer = document.getElementById('projects-view');

  if (!btnGrid || !btnList || !viewContainer) return;

  btnGrid.addEventListener('click', () => {
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
    viewContainer.classList.remove('view-list');
    viewContainer.classList.add('view-grid');
  });

  btnList.addEventListener('click', () => {
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
    viewContainer.classList.remove('view-grid');
    viewContainer.classList.add('view-list');
  });
}

// 3. Contact Form Option Buttons & Submission
function initFormInteractions() {
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      optionButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function handleFormSubmit() {
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const message = document.getElementById('form-message').value;
  const activeType = document.querySelector('.option-btn.active')?.getAttribute('data-type') || 'General';

  // Construct mailto link
  const subject = encodeURIComponent(`Inquiry from ${name} [${activeType}]`);
  const body = encodeURIComponent(`Hi Ekrem,\n\nName: ${name}\nEmail: ${email}\nType: ${activeType}\n\nProject / Inquiry Details:\n${message}\n`);
  
  window.location.href = `mailto:ekrmcakir@gmail.com?subject=${subject}&body=${body}`;
  showToast('Opening your email client...');
}

// 4. Copy Email to Clipboard
function initEmailCopy() {
  const copyBtn = document.getElementById('btn-copy');
  const copyLabel = document.getElementById('copy-label');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'ekrmcakir@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      showToast('Copied ekrmcakir@gmail.com to clipboard');
      if (copyLabel) {
        const orig = copyLabel.textContent;
        copyLabel.textContent = 'COPIED!';
        setTimeout(() => {
          copyLabel.textContent = orig;
        }, 2000);
      }
    } catch (err) {
      showToast('ekrmcakir@gmail.com');
    }
  });
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}
