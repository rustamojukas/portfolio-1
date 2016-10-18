module.exports = function () {
  var formValidation = require('./form-validation');
  // formValidation.init();
  var $form = $('#feedback-form');
  var skillReference = getSkillItems($form);
  console.log(skillReference);
  function init() {
    addListeners();
  }

  function getSkillItems(form) {
    var $skillForm = $form.filter('#skill-form');
    if ($skillForm.length > 0) {
      var $skillItems = $skillForm.find('input[type="text"]');
      var data = {};
      $skillItems.each(function (i, item) {
        var title = item.getAttribute('name');
        data[title] = item.value;

      });
      return data;
    }
    return false;
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
      console.log('form NOT submitted to ' + url);
      return false;
    }
    var data;
    if (skillReference) {
      console.log(111);
      var ModifiedItems = checkModifiedData(form);
      if (ModifiedItems && Object.keys(ModifiedItems).length) {
        data = ModifiedItems;
      }
    } else {
      console.log('ttt');
      data = form.serialize();
    }
    // console.log(data);

    var $ajaxDeferred = $.ajax({
      url: url,
      method: 'POST',
      data: data
    });
    checkResponse($ajaxDeferred, url);

  }

  function checkModifiedData(form) {
    if (form.attr('id') === 'skill-form' && form.attr('action') === '/skill/update') {
      var $inputs = form.find('input[type="text"]');
      var ModifiedItems = {};
      $inputs.each(function (i, item) {
        var title = item.getAttribute('name');
        var value = item.value;
        if (skillReference[title] != value) {
          ModifiedItems[title] = value;
        }
      });
      return ModifiedItems;

    }
    return null;
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
          if (url !== '/skill/update') {
            $form.trigger('reset');
          }
          skillReference = getSkillItems($form);
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