module.exports = function () {
  var formValidation = require('./form-validation');
  var $form = $('#login-form');

  if ($form.length) {
    addListeners();
  }

  function addListeners() {
    $form.on('submit', function (e) {
      e.preventDefault();
      var $this = $(this);
      var url = $this.attr('action');
      ajaxRequest($this, url);
    });
  }

  function ajaxRequest(form, url) {
    if (!formValidation.validateForm(form)) {
      console.log('form validation false');
      return false;
    }
    var data = form.serialize();
    var $ajaxDeferred = $.ajax({
      url: url,
      method: 'POST',
      data: data
    });
    checkResponse($ajaxDeferred);

  }

  function checkResponse(jqXHR) {
    jqXHR.done(function (data, text, jqXHR) {
      if (jqXHR.status === 200 && data === 'wellcome') {
        window.location.href = '/admin';
      }
    });
    jqXHR.fail(function (jqXHR) {
      console.log('fail');
      require('./popupInfoWindow')().html('<div class="form__error">Ошибка авторизации</div>'  + jqXHR.responseText);
      console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);

    });

  }
};