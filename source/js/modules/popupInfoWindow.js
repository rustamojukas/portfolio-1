module.exports=function(){
  var $popup = $('.popup');
  $popup.fadeIn();
  return $popup.find('.popup__content');
};