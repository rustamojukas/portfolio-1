module.exports = (function () {
  function init($form) {
    _setUpListeners($form);
  }

  function _setUpListeners($form) {
    $form.on('input click', '.error', _removeError);
    $form.on('reset', _clearForm);
    $form.on('input', 'input,textarea', _onInput)
  }

  function _removeError() {
    $(this).removeClass('error');
  }

  function _clearForm() {
    $(this).find('.error').removeClass('error');
  }

  function _onInput() {
    var $this = $(this);
    if ($this.val().length > 0) {
      $this.parent().addClass('valid');
    } else {
      $this.parent().removeClass('valid');
      $this.parent().addClass('error');
    }
  }

  function create($elem, options) {
    var target;
    if(!options){
      target = 'parent';
    }else{
      target = options.target;
    }
 // self,parent
    switch (target) {
      case 'self':
        $elem.removeClass('valid');
        $elem.addClass('error');
        break;
      case 'parent':
      default:
        var $parent = $elem.parent();
        $parent.removeClass('valid');
        $parent.addClass('error');
    }
  }

  return {
    init: init,
    create: create
  }

})();
