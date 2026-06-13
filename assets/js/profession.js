(function () {
  var form = document.getElementById('sg-form');
  if (!form) return;

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

  form.addEventListener('submit', function (e) {
    e.preventDefault();
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

    if (!valid) return;

    fetch(form.action, { method: 'POST', body: new FormData(form), mode: 'no-cors' })
      .then(function () {
        form.style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
      })
      .catch(function () {
        document.getElementById('error-message').style.display = 'block';
      });
  });
})();
