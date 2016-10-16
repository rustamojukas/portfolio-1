module.exports=function(){

  var $tabs = $('.tabs');
  if($tabs.length){
    var $tabItems = $('.tabs__list-item');
    var $tabsContent=$('.tabs__content');
    $tabs.on('click','.tabs__link',function (e) {
      e.preventDefault();
      var $this=$(this);
      var id=$this.attr('href');
      $tabItems.removeClass('active');
      $tabsContent.removeClass('active');
      $this.closest('.tabs__list-item').addClass('active');
      $tabsContent.filter($(id)).addClass('active');
    });
    $('.tabs__link').eq(0).trigger('click');
  }
};