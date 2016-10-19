module.exports = function () {
  var $form = $('#works-form');
  var popupWindow = require('../popupInfoWindow');

  if ($form.length) {
    addListeners();
  }

  function addListeners() {
    $form.on('submit', function (e) {
      e.preventDefault();
      var url = '/works';
      ajaxRequest($(this), url);
    });
  }

  function ajaxRequest(form, url) {
    if (!validate(form)) {
      console.log('form validation false');
      return false;
    }
    var formData = new FormData(form[0]);
    // var data = form.serialize();
    var $ajaxDeferred = $.ajax({
      url: url,
      processData:false,
      contentType:false,
      method: 'POST',
      data: formData
    });
    checkResponse($ajaxDeferred);

  }

  function checkResponse(jqXHR) {
    jqXHR.done(function (data, text, jqXHR) {
      if (jqXHR.status === 200) {
        popupWindow().html(jqXHR.responseText).css('color', '#5dff00');
      }
      $form.trigger('reset');
    });
    jqXHR.fail(function (jqXHR) {
      console.log('fail');
      popupWindow().html('<div class="form__error">Серверная ошибка</div>' + jqXHR.responseText).css('color', '#ff0000');
      console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseText);

    });

  }

  function validate(form) {
    var valid = true;
    var formTooltip = require('./form-tooltip');
    var formError = require('./form-error');
    formTooltip.init(form);
    formError.init(form);

    var $title = form.find('#works-title');
    var $tech = form.find('#works-tech');
    var $pic = form.find('#works-pic');

    var titleVal = $title.val();
    var techVal = $tech.val();

    if (!titleVal || titleVal < 4) {
      formTooltip.create({
        elem: $title,
        text: 'Слишком короткий заголовок'
      });
      formError.create($title);
      valid = false;
    }
    if (!techVal || techVal < 2) {
      formTooltip.create({
        elem: $tech,
        text: 'Слишком короткий текст'
      });
      formError.create($tech);
      valid = false;
    }

    // if (!titleVal) {
    //   formTooltip.create({
    //     elem: $title
    //   });
    //   formError.create($title);
    //   valid = false;
    // } else if (titleVal.length < 4) {
    //   formTooltip.create({
    //     elem: $title,
    //     text: 'Слишком короткий заголовок'
    //   });
    //   formError.create($title);
    //   valid = false;
    // }
    // if (!textVal) {
    //   formTooltip.create({
    //     elem: $text,
    //     position: 'bottom'
    //   });
    //   formError.create($text);
    //   valid = false;
    // } else if (textVal.length < 4) {
    //   formTooltip.create({
    //     elem: $text,
    //     text: 'Слишком короткий текст',
    //     position: 'bottom'
    //   });
    //   formError.create($text);
    //   valid = false;
    // }
    // if(!dateVal || dateVal<10 || !/^[\/0-9]{10}$/.test(dateVal)){
    //   formTooltip.create({
    //     elem: $date,
    //     text: 'Проверьте корректность даты',
    //     position: 'top'
    //   });
    //   formError.create($date);
    //   valid = false;
    // }

    return valid;
    // return false;
  }
};