/* ============================================================
   AquaPro Plumbing — validation.js
   Contact Form & Quote Form Validation
   ============================================================ */
'use strict';

/* ---------- Helpers ---------- */
function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
function isPhone(v) { return /^[\d\s\(\)\-\+]{7,20}$/.test(v.trim()); }

function setError(inputId, errorId, msg) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.toggle('error', !!msg);
  if (error) error.textContent = msg || '';
  if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
}

function clearError(inputId, errorId) { setError(inputId, errorId, ''); }

/* ---------- Contact Form ---------- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Live validation on blur
  ['name', 'phone', 'email', 'message'].forEach(field => {
    const input = document.getElementById(field);
    if (!input) return;
    input.addEventListener('blur', () => validateField(field));
    input.addEventListener('input', () => clearError(field, `${field}-error`));
  });

  function validateField(field) {
    const val = (document.getElementById(field)?.value || '').trim();
    if (field === 'name') {
      if (!val) setError('name', 'name-error', 'Your name is required.');
      else if (val.length < 2) setError('name', 'name-error', 'Name must be at least 2 characters.');
    }
    if (field === 'phone') {
      if (!val) setError('phone', 'phone-error', 'Phone number is required.');
      else if (!isPhone(val)) setError('phone', 'phone-error', 'Enter a valid phone number.');
    }
    if (field === 'email') {
      if (!val) setError('email', 'email-error', 'Email address is required.');
      else if (!isEmail(val)) setError('email', 'email-error', 'Enter a valid email address.');
    }
    if (field === 'message') {
      if (!val) setError('message', 'message-error', 'Please describe your issue or project.');
      else if (val.length < 10) setError('message', 'message-error', 'Please provide a bit more detail (min 10 chars).');
    }
  }

  function validateAll() {
    ['name', 'phone', 'email', 'message'].forEach(validateField);
    return !form.querySelector('.error');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateAll()) return;

    const btn = document.getElementById('submit-btn');
    const success = document.getElementById('form-success');
    if (btn) { btn.disabled = true; btn.querySelector('span').textContent = 'Sending...'; }

    // Simulate async submission
    setTimeout(() => {
      if (btn) { btn.disabled = false; btn.querySelector('span').textContent = 'Send Message'; }
      if (success) success.hidden = false;
      form.reset();
      setTimeout(() => { if (success) success.hidden = true; }, 6000);
    }, 1200);
  });
})();

/* ---------- Quote Modal Form ---------- */
(function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }

    setTimeout(() => {
      if (btn) { btn.disabled = false; btn.textContent = 'Request Free Quote'; }
      closeModal('quote-modal');
      // Show brief success state via emergency toast
      showToast('Quote request sent. We\'ll contact you within 2 hours.');
    }, 1000);
  });
})();

/* ---------- Simple Toast ---------- */
window.showToast = function(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:32px; left:50%; transform:translateX(-50%);
    background:rgba(0,191,255,0.15); border:1px solid rgba(0,191,255,0.35);
    color:#fff; padding:14px 24px; border-radius:999px;
    font-size:0.875rem; font-weight:600; font-family:inherit;
    backdrop-filter:blur(12px); z-index:9999;
    animation:toastIn 0.3s ease forwards;
    max-width:90vw; text-align:center;
  `;

  if (!document.getElementById('toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = '@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
    document.head.appendChild(s);
  }

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};
