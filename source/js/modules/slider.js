module.exports = function () {
  var $slider = $('.slider');

  if ($slider.length > 0) {
    var generateSliderText = require('./generate-slider-text');
    var flag = true;
    var downCounter = 0;
    var upCounter = 2;
    var awayCounter = 0;
    var $downList = $('.slider__preview-list-down',$slider);
    var $upList = $('.slider__preview-list-up',$slider);
    var $controlDown = $('.slider__control_down',$slider);
    var $controlUp = $('.slider__control_up',$slider);
    var $viewBig = $('.slider__view-big',$slider);
    var $title = $('.slider__main-subtitle',$slider);
    var $tech = $('.slider__tech',$slider);
    var $sliderPic = $('.slider__view-pic',$slider);
    var $sliderLink = $('.slider__link',$slider);

    //down items
    var $downItems = $downList.find('.slider__preview-item');
    //up items
    var $upItems = $upList.find('.slider__preview-item');
    //all elements
    var length = $downItems.length;
    //set slider data
    setSliderData($downItems.eq(downCounter));

    $downList.on('next', '.active', function (e) {
      $viewBig.addClass('animate');
    });

    $slider.on('transitionend', '.away', function (e) {
      $(this).removeClass('away').trigger('endAway');
    });
    $slider.on('endAway', function () {
      awayCounter++;
      if (awayCounter === 2) {
        awayCounter = 0;
        flag = true;
        $viewBig.removeClass('animate');
      }
    });

    //control-up
    $controlDown.on('click', function (e) {
      e.preventDefault();
      var $downActive = $downItems.filter('.active');
      var $upActive = $upItems.filter('.active');

      var $reqDownItem = $downItems.eq(downCounter);
      var $reqUpItem = $upItems.eq(upCounter);
      //active
      if (flag) {
        flag = false;
        upCounter++;
        downCounter++;
        if (downCounter >= length) {
          downCounter = 0;
        }
        if (upCounter >= length) {
          upCounter = 0;
        }
        action($downActive, $upActive, $reqDownItem, $reqUpItem);
      }

    });
    //control-down
    $controlUp.on('click', function (e) {
      e.preventDefault();
      var $downActive = $downItems.filter('.active');
      var $upActive = $upItems.filter('.active');
      if (flag) {
        flag = false;
        upCounter--;
        downCounter--;
        if (downCounter < 0) {
          downCounter = length - 1;
        }
        if (upCounter < 0) {
          upCounter = length - 1;
        }
        var $reqDownItem = $downItems.eq(downCounter - 1);
        var $reqUpItem = $upItems.eq(upCounter - 1);

        action($downActive, $upActive, $reqDownItem, $reqUpItem);
      }
    });
  }
  function action(downActive, upActive, reqDown, reqUp) {
    //remove active
    downActive.removeClass('active');
    upActive.removeClass('active');
    //add away
    downActive.addClass('away');
    upActive.addClass('away');
    //next
    reqDown.addClass('active').trigger('next');
    reqUp.addClass('active');

    setSliderData($downItems.eq(downCounter));

  }

  function setSliderData(activeElement){
    $sliderPic.attr('src', activeElement.data('pic'));
    $sliderLink.attr('href', activeElement.data('link'));
    generateSliderText($title, activeElement);
    generateSliderText($tech, activeElement);
  }
};