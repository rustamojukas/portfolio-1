module.exports = (function () {
  function init(form) {
    _setUpListeners(form);
  }

  function _setUpListeners(form) {
    form.on('reset input click', _removeTooltip);
  }

  function _removeTooltip() {
    $(this).find('.tooltip').remove();
  }

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
    if ($elem) {
      var toolTipText = $elem.data('content');
      if (!toolTipText) {
        toolTipText = 'Не заполнено поле';
      }
      var $toolTip = $('<div />').text(toolTipText);
      _setTooltipPosition($toolTip, position);
      _insertToolTip($elem,$toolTip, insertInto);
    }

  }

  function _setTooltipPosition($toolTip,position) {
    switch (position) {
      case 'top':
        $toolTip.addClass('tooltip arrow-bottom');
        break;
      case 'bottom':
        $toolTip.addClass('tooltip arrow-top');
        break;
      case 'left':
        $toolTip.addClass('tooltip arrow-right');
        break;
      case 'right':
        $toolTip.addClass('tooltip arrow-left');
        break;
      default:
        $toolTip.addClass('tooltip arrow-bottom');
    }
  }

  function _insertToolTip($elem,$tooltip,insertInto) {
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
  }
})();