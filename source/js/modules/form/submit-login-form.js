module.exports = function () {
  var $form = $('#login-form');
  var popupWindow = require('../popupInfoWindow');
  if ($form.length) {
    addListeners();
  }

  function addListeners() {
    $form.on('submit', function (e) {
      e.preventDefault();
      var url = '/login';
      ajaxRequest($(this), url);
    });
  }

  function ajaxRequest(form, url) {
    if (!validate(form)) {
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
      popupWindow().html('<div class="form__error">Ошибка авторизации</div>' + jqXHR.responseText).css('color','#ff0000');
      console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);

    });

  }

  function validate(form) {
    var valid = true;
    var formTooltip = require('./form-tooltip');
    var formError = require('./form-error');
    formTooltip.init(form);
    formError.init(form);
    var $name = form.find('#login');
    var $password = form.find('#password');
    var $isHuman = form.find('#isHuman');
    var $yes = form.find('#yes');
    if (!$name.val()) {
      formTooltip.create({
        elem: $name
      });
      formError.create($name);
      valid = false;
    }
    if (!$password.val()) {
      formTooltip.create({
        elem: $password
      });
      formError.create($password);
      valid = false;
    }
    if (!$isHuman.prop('checked')) {
      formTooltip.create({
        elem: $isHuman
      });
      formError.create($isHuman);
      valid = false;
    }
    if (!$yes.prop('checked')) {
      formTooltip.create({
        elem: $yes,
        position: 'bottom'
      });
      formError.create($yes);
      valid = false;
    }
    return valid;
  }
};