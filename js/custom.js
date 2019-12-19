/*wow js*/

$(document).ready(function(){

  $(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').fadeIn(); // will first fade out the loading animation 
  $('#preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(500).css({'overflow':'visible'});
});

    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();


/* filter js*/



    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
         if(value == "mon")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
 
    
        if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");
     });



  /* back to top button js */
  


  // hide #back-top first
  $("#back-top").hide();
  
  // fade in #back-top
  $(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#back-top').fadeIn();
      } else {
        $('#back-top').fadeOut();
      }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });


  /* owl crousel js */
if($('.ps_slider .owl-carousel').length){
$('.ps_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    autoplay:false,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});

}


/* testimonial slider */

if($('.slider1 .owl-carousel').length){
$('.slider1 .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    autoplay:true,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:3
        }
    }
});

}



/* mail function */

$("#submit").click(function(){
          var fname = $('#first_name').val();
          var phone = $('#phone').val();
          var email = $('#email').val();
          var message = $('#additionnal_message').val();
          var letters = /^[A-Za-z]+$/;
          var number = /^[0-9]+$/;
          var mail_letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

          
          if (fname != "" && phone != "" && email != "" && message != "") {
            if(fname.match(letters)) { 
              if(phone.match(number) && phone.length == 10) {
                if(email.match(mail_letters)){
                  $.ajax({
                  method : 'post',
                  url : 'js/ajax.php',
                  data :  {'first_name' : fname ,
                        'phone_number' : phone,
                        'email' : email,
                        'message' : message,
                        },
                   }).done(function(resp){
                     if( resp == 1){
                      document.getElementById("error").style.color = "green";
                       document.getElementById("error").innerHTML = "Mail Send Successfully";
                      $('#first_name').val('');
                       $('#phone').val('');
                       $('#email').val('');
                       $('#additionnal_message').val('');
                     }else{
                      document.getElementById("error").style.color = "red";
                        document.getElementById("error").innerHTML = "Mail not Send";
                     }
                   console.log(resp);});
                }else{
                  document.getElementById("error").style.color = "red";
                  document.getElementById("error").innerHTML = "Please Fill The  Correct Mail Id";
                }
              }else{
                document.getElementById("error").style.color = "red";
                document.getElementById("error").innerHTML = "Please Fill The  Correct Number";
              }
            }else
            { document.getElementById("error").style.color = "red";
              document.getElementById("error").innerHTML = "Please Fill The Correct Name";
            }   
          }else{
            document.getElementById("error").style.color = "red";
            document.getElementById("error").innerHTML = "Please Fill All Detail";
          }
        });
  });

// window height js

$(window).on('load', function() {

   //window height

   var h = window.innerHeight;
    $(".ps_slider .item").css("height", h);
   $(".ps_slider .item").css("width", "100%");
    
  
  });




