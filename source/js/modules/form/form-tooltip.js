module.exports = (function () {
  function init(form) {
    _setUpListeners(form);
  }

  function _setUpListeners(form) {
    form.on('reset click', _removeTooltip);
  }

  var _removeTooltip = function () {
    $(this).find('.tooltip').remove();
  };

  /**
   * @param options
   *  elem : elem
   * position : top,bottom,left,right (default- top)
   * insertInto : parent,form  (default-parent)
   */
  function create(options) {
    var position = options.position || 'top';
    var $elem = options.elem || null;
    var insertInto = options.insertInto || 'parent';  //parent,form
    var text = options.text || 'Не заполнено поле';
    if ($elem) {
      var toolTipText = $elem.data('content');
      if (!toolTipText) {
        toolTipText = text;
      } else if (options.text) {
        toolTipText = text;
      }
      var $toolTip = $('<div />').text(toolTipText);
      _setTooltipPosition($toolTip, position);
      _insertToolTip($elem, $toolTip, insertInto);
    }

  }

  function _setTooltipPosition($toolTip, position) {
    $toolTip.addClass('tooltip');
    switch (position) {
      case 'top':
        $toolTip.addClass('arrow-bottom');
        break;
      case 'bottom':
        $toolTip.addClass('arrow-top');
        break;
      case 'left':
        $toolTip.addClass('arrow-right');
        break;
      case 'right':
        $toolTip.addClass('arrow-left');
        break;
      default:
        $toolTip.addClass('arrow-bottom');
    }
  }

  function _insertToolTip($elem, $tooltip, insertInto) {
    switch (insertInto) {
      case 'form':
        var $form = $elem.closest('form');
        $form.append($tooltip);
        break;
      case 'parent':
      default:
        var $parent = $elem.parent();
        $parent.append($tooltip);
    }
  }

  return {
    init: init,
    create: create
  };

})();