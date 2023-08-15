jQuery(function($) {
    $('.txt-scroll').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
       $(".txt-scroll").css("-webkit-mask-image", "initial");
        }else{
  $(".txt-scroll").css("-webkit-mask-image", "");
        }
    })
});