module.exports = function () {
  var formValidation = require('./form-validation');
  formValidation.init();
  var $form = $('#login-form,#feedback-form,.admin-form');

  function init() {
    addListeners();
  }

  function addListeners() {
    $form.on('submit', submitForm);
  }

  function submitForm(e) {
    e.preventDefault();
    var url=$form.attr('action');

    // if ($form.attr('id') === 'login-form') {
    //   url = '/login';
    // } else if ($form.attr('id') === 'feedback-form') {
    //   url = '/feedback';
    // } else {
    //   return false;
    // }
    ajaxRequest($form, url);


  }

  function ajaxRequest(form, url) {
    if (!formValidation.validateForm(form)) {
      console.log('form NOT submitted to ' + url);
      return false;
    }
    var $ajaxDeferred = $.ajax({
      url: url,
      method: 'POST',
      data: form.serialize()
    });
    checkResponse($ajaxDeferred, url);

  }

  function checkResponse(jqXHR, url) {
    switch (url) {
      case '/login':
        jqXHR.done(function (data, text, jqXHR) {
          if (jqXHR.status === 200 && data === 'wellcome') {
            window.location.href = '/admin';
          }
        });
        jqXHR.fail(function (jqXHR) {
          if (jqXHR.status === 403) {
            fillPopup().html('<div class="form__error">Ошибка</div>' + jqXHR.responseText);
          } else {
            fillPopup().html('<div class="form__error>Ошибка</div>' + jqXHR.status + ' ' + jqXHR.responseText);
            console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);
          }
        });
        break;
        //reserve
        /*case '/feedback':

         break;*/
      default:
        jqXHR.done(function (data, textStatus, jqXHR) {
          fillPopup().html(data);
          $form.trigger('reset');
        });
        jqXHR.fail(function (jqXHR) {
          fillPopup().html('<div class="form__error>Ошибка</div>' + jqXHR.status + ' ' + jqXHR.responseText);
          console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);
        });
    }

  }

  function fillPopup() {
    return $('.popup').addClass('active').find('.popup__content');
  }

  if ($form.length !== 0) {
    init();

  }


};