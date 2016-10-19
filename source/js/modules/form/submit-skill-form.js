module.exports = function () {

  var $form = $('#skill-form');
  var popupWindow = require('../popupInfoWindow');
  var data = {};
  var $skillInputs;
  if ($form.length) {
    addListeners();
    originalData();
  }

  function addListeners() {
    $form.on('submit', function (e) {
      e.preventDefault();
      var url = '/skill/update';
      ajaxRequest($(this), url);
    });
  }

  function ajaxRequest(form, url) {
    if (!validate(form)) {
      console.log('form validation false');
      return false;
    }

    console.log(data);
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
        originalData();
        popupWindow().html(jqXHR.responseText).css('color','#5dff00');
      }
    });
    jqXHR.fail(function (jqXHR) {
      console.log('fail');
      popupWindow().html('<div class="form__error">Серверная ошибка</div>' + jqXHR.responseText).css('color','#ff0000');
      console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);

    });

  }

  function originalData() {
    $skillInputs = $form.find('input[type="text"]');
    $skillInputs.each(function () {
      var $this = $(this);
      var name = $this.attr('name');
      data[name] = $this.val();
    });
  }

  function getChangedData() {
    $skillInputs.each(function () {
      var $this = $(this);
      var name = $this.attr('name');
      var val = $this.val();
      if (data[name] === val) {
        delete data[name];
      } else {
        data[name] = val;
      }
    });
  }


  function validate(form) {
    var valid = true;
    var formError=require('./form-error');
    var regexp = /^[0-9]{1,3}$/;
    formError.init(form);
    $skillInputs.each(function () {
      var $this = $(this);
      var val = $this.val();
      if (!regexp.test(val) || val>100 || val<0) {
        console.log(val);
        formError.create($this);
        valid = false;
      }
    });
    if(!valid){
      popupWindow().html('Проверьте правильность ввода').css('color','#ff0000');
      return valid;
    }
    getChangedData();
    if (!Object.keys(data).length) {
      valid = false;
      popupWindow().html('Данные не изменены').css('color','#faff05');
      console.log('Данные не изменены');
      originalData();
    }

    return valid;
  }
};