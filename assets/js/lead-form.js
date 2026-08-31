(function () {
  var form = document.getElementById('sg-form');
  if (!form) return;

  var successPanel = document.getElementById('success-message');
  var errorPanel = document.getElementById('error-message');
  var submitBtn = form.querySelector('[type="submit"]');
  var submitting = false;
  var timeoutId = null;

  // Hidden iframe used as the form's POST target: this lets the form submit
  // natively to Brevo (cross-origin, no CORS/no-cors trickery) while keeping
  // the user on the page. We treat the iframe's "load" event as the real
  // completion signal instead of blindly showing success.
  var frame = document.createElement('iframe');
  frame.name = 'sg-postframe';
  frame.setAttribute('aria-hidden', 'true');
  frame.style.display = 'none';
  document.body.appendChild(frame);
  form.setAttribute('target', 'sg-postframe');

  function getErrorLabel(input) {
    var entry = input.closest('.form__entry');
    return entry ? entry.querySelector('.sg-field-error') : null;
  }
  function showError(input, msg) {
    var lbl = getErrorLabel(input);
    if (lbl) { lbl.textContent = msg; lbl.style.display = 'block'; }
  }
  function clearError(input) {
    var lbl = getErrorLabel(input);
    if (lbl) { lbl.textContent = ''; lbl.style.display = ''; }
  }

  form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () { clearError(el); });
  });

  function finishSuccess() {
    if (!submitting) return;
    submitting = false;
    if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'generate_lead',
      form_id: form.dataset.formId
    });

    form.style.display = 'none';
    if (errorPanel) errorPanel.style.display = 'none';
    if (successPanel) successPanel.style.display = 'block';
  }

  function finishError() {
    if (!submitting) return;
    submitting = false;
    if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
    if (errorPanel) errorPanel.style.display = 'block';
    if (submitBtn) { submitBtn.disabled = false; }
  }

  // The iframe fires "load" once on initial insertion (about:blank); the
  // `submitting` guard makes sure we only react to the load that follows a
  // real submission.
  frame.addEventListener('load', finishSuccess);

  form.addEventListener('submit', function (e) {
    // Re-entrancy guard: blocks any second submission while one is in
    // flight, regardless of what re-triggers "submit" (double-click,
    // Enter key, autofill helpers, etc.) — disabling the button alone
    // only stops clicks on that specific element.
    if (submitting) {
      e.preventDefault();
      return;
    }

    var valid = true;

    form.querySelectorAll('[data-required="true"]').forEach(function (el) {
      if (!el.value.trim()) {
        showError(el, el.dataset.errorRequired);
        valid = false;
      }
    });

    var emailInput = document.getElementById('EMAIL');
    if (emailInput && emailInput.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      showError(emailInput, emailInput.dataset.errorEmail);
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    // Valid: let the browser submit natively into the hidden iframe.
    // Do NOT preventDefault here.
    submitting = true;
    if (errorPanel) errorPanel.style.display = 'none';
    if (submitBtn) { submitBtn.disabled = true; }

    // Safety net: if the iframe never signals back (network hang), surface
    // an error instead of leaving the user stuck.
    timeoutId = setTimeout(finishError, 15000);
  });
})();
