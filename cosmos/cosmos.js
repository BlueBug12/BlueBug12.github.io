$(function() {
    $('a[href*=\\#]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });
});


$(document).ready(function(){
  $('.pg2_text').on('mousedown touchstart',function(){
    $(this).css('animation-play-state','paused')
  }).bind('mouseup mouseleave touched',function(){
    $(this).css('animation-play-state','running')
  })
})
$(function(){
  $('.home').on('mouseenter',function(){
    $('.arrow').removeClass('hidden transition')
    $(this).transition('fade up',200)
    $('#see').css('visibility','hidden')
    $(this).removeClass('home hidden transition')
    $('.arrow').css('visibility','visible')
    $('.arrow').addClass('animated fadeInUp')
    
  })
})
$(function(){
  $('.arrow').on('click',function(){
    $('#see').removeClass('hidden transition')
    $(this).transition('fade up',200)
    $(this).removeClass('hidden transition')
    $(this).css('visibility','hidden')
    $('#see').css('visibility','visible')
    $('#see').addClass('home')
  })
})
let display=true
$(function(){
  $('#reserve').on('click',function(){
    const style=display
    ?$('#section04').css('filter','grayscale(0%)')
    :$('#section04').css('filter','grayscale(90%)')
    display=!display
  })
})

$(function(){
  $('#pg3_text_left').click(function(){
    $('#pg3_left').css('visibility','visible')
    $('#pg3_left').toggleClass('animated fadeInLeft')
  })
})

