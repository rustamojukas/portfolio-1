module.exports = function () {
  var $form = $('#feedback-form');
  var popupWindow = require('../popupInfoWindow');
  if ($form.length) {
    addListeners();
  }

  function addListeners() {
    $form.on('submit', function (e) {
      e.preventDefault();
      var url = '/feedback';
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
      if (jqXHR.status === 200) {
        popupWindow().html(jqXHR.responseText).css('color','#5dff00');
      }
      $form.trigger('reset');
    });
    jqXHR.fail(function (jqXHR) {
      console.log('fail');
      popupWindow().html('<div class="form__error">Серверная ошибка</div>' + jqXHR.responseText).css('color','#ff0000');
      console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);

    });

  }

  function validate(form) {
    var valid = true;
    var formTooltip = require('./form-tooltip');
    var formError = require('./form-error');
    formTooltip.init(form);
    formError.init(form);
    var $name = form.find('#name');
    var $email=form.find('#email');
    var $message = form.find('#message');

    if (!$name.val()) {
      formTooltip.create({
        elem: $name
      });
      formError.create($name);
      valid = false;
    }
    if (!$email.val()) {
      formTooltip.create({
        elem: $email
      });
      formError.create($email);
      valid = false;
    }
    if (!$message.val()) {
      formTooltip.create({
        elem: $message
      });
      formError.create($message);
      valid = false;
    }

    return valid;
  }
};