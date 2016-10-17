module.exports = (function () {
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
      _createTooltip(elem,'bottom');
      return false;
    }
    if(elem.closest('#skill-form').length){
      return false;
    }
    _createTooltip(elem);
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
  var _createTooltip=function(elem,position){
    var content = elem.data('content');
    if(!content){
      content='Не заполнено поле';
    }
    var toolTip = $('<div />').text(content);
    if(position==='bottom'){
      toolTip.addClass('tooltip arrow-top');
    }else{
      toolTip.addClass('tooltip arrow-bottom');
    }
    toolTip.insertAfter(elem);
  };

  return {
    init: init,
    validateForm: validateForm
  };
})();