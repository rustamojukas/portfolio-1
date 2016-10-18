module.exports = (function () {
  var createToolTip = require('./createTooltip');
  var init = function () {
    _setUpListeners();
  };
  var validateForm = function (form) {
    var elements = form.find('input,textarea');
    var valid = true;
    $.each(elements, function (i, elem) {
      var $elem = $(elem);
      var value = $elem.val();
      if (!value.length) {
        _addError($elem);
        valid = false;
      }
      if ($elem.attr('id') === 'isHuman' && !$elem.prop('checked')) {
        _addError($elem);
        valid = false;
      }
      if($elem.attr('id') === 'yes' && !$elem.prop('checked')){
        _addError($elem);
        valid=false;
      }

    });
    return valid;
  };
  var _setUpListeners = function () {
    var $form = $('form');
    $form.on('input click', '.error', _removeError);
    $form.on('input', 'input', _onInput);
    $form.on('reset', _clearForm);
  };
  var _addError = function (elem) {
    var elemParent = elem.parent();
    elemParent.removeClass('valid');
    elemParent.addClass('error');
    if(elem.attr('id')==='yes'){
      createToolTip({
        elem:elem,
        position:'bottom',
        insertInto:'parent'
      });
      return false;
    }
    if(elem.closest('#skill-form').length){
      return false;
    }
    createToolTip({
      elem:elem,
      position:'top',
      insertInto:'parent'
    });
  };
  var _removeError = function () {
    var $this=$(this);
    $this.removeClass('error');
    $this.closest('form').find('.tooltip').remove();

  };
  var _onInput = function () {
    var $this = $(this);
    if ($this.val().length !== 0) {
      $this.parent().addClass('valid');
    } else {
      $this.parent().removeClass('valid');
      $this.parent().addClass('error');
    }
  };
  var _clearForm = function () {
    var $form = $(this);
    $form.find('.error').removeClass('error');
    $form.find('.tooltip').remove();
  };
  init();
  return {
    validateForm: validateForm
  };
})();