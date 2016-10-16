//googlemaps
require('./modules/maps')();

$(function () {
  //preloader
  require('./modules/preloader')();
  //skillsDraw(svg-radius)
  require('./modules/skills')(42);
  //auth-btn
  require('./modules/auth-button')();
  //btn-menu
  require('./modules/btn-menu')();
  //popup-close
  require('./modules/popup-close')();
  //anchor scroll
  require('./modules/anchor-scroll')();
  //slider
  require('./modules/slider')();
  //blog-sidebar-marker
  require('./modules/blog-sidebar-marker')();
  //blog-sidebar-hide
  require('./modules/blog-sidebar-hide')();
  //form-validation
  require('./modules/form-submit')();
  //admin-tabs
  require('./modules/admin-tabs')();
});





