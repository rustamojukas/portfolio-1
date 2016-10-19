module.exports=function () {
  $('.popup__close').on('click',function(e){
    e.preventDefault();
    $(this).closest('.popup').hide();
  });
};