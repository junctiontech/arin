/* --------------------------------------------------------------------------
 * Indonez     : Keid - Modern HTML Template
 *  
 * file        : theme-script.js
 * Version     : 1.0
 * Author      : indonez - team
 * Author URI  : http://indonez.com
 *
 * Indonez Copyright 2015 All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * javascript plugin configuration
      1. jQuery Responsive Pie Chart
      2. jQuery Parallax
      3. jQuery Progress Bar
      4. jQuery Menu
      5. jQuery Counter
 
 * javascript handle initialization
      1. menu and responsive
      2. animation
      3. chart and progress bar
      4. twitter
      5. tab and accordion
      6. scrollUp
      7. alert
      8. isotope
      9. fancybox
      10. mediaelement
      11. retina
      12. datepicker
      13. masonry
      14. carousel
         - testimonial carousel - services.html
         - client carousel - testimonials.html
         - twitter carousel - index-version3.html
         - app mobile carousel - index-version6.html
         - portfolio single - portfolio-single.html
         - blog carousel - blog.html
 * 
 * -------------------------------------------------------------------------- */

(function($) {
/* --------------------------------------------------------------------------
 * jQuery Responsive Pie Chart
 * -------------------------------------------------------------------------- */
   "use strict";

   // jQuery easypiechart constructor
   var defaultset = {
      barColor    : '#95a5a6',
      trackColor  : '#f1f1f1',
      scaleColor  : false,
      lineCap     : 'round',
      lineWidth   : 20,
      size        : 100,
      animation   : 5000,
      font        : 16,
      fontColor   : "inherit",
      bgColor     : false
   };

   $.fn.responsivePieChart = function (options) {

      return this.each(function() {

         var chartConfig = $.extend({}, defaultset, options),
         widthElement = getSize(chartConfig.size, $(this), chartConfig.mode); 

         $(this).css({
            'height'       : widthElement,
            'width'        : widthElement,
            'position'     : 'relative',
            'display'      : 'inline-block',
            'margin'       : 'auto 0',
            'text-align'   : 'center'
         });

         $(this).append("<div class='percent' style='position:absolute;top:0;left:0;line-height:"+widthElement+"px;text-align:center;width:"+widthElement+"px;color:"+chartConfig.fontColor+";font-size:"+chartConfig.font+"px;font-weight:300;'></div>");
         if (chartConfig.bgColor) {
            widthElement = widthElement - chartConfig.lineWidth;
            $(this).css({'padding': chartConfig.lineWidth / 2 });
         }

         $(this).easyPieChart({
            barColor    : chartConfig.barColor,
            trackColor  : chartConfig.trackColor,
            scaleColor  : chartConfig.scaleColor,
            lineCap     : chartConfig.lineCap,
            lineWidth   : chartConfig.lineWidth,
            size        : widthElement,
            animation   : chartConfig.animation,
            onStep: function(from, to, percent) {
               $(this.el).find('.percent').text(Math.round(percent)+'%');
            }
         });
      });  
   };
   
   function getSize(chartSize, self) {
      var defaultSize = 100,
      widthElement;
      if (chartSize == defaultSize) {
         widthElement = self.parent().width();
      } else {
         widthElement = chartSize;
      }

      return widthElement;
   }

})(jQuery) + (function($){

/* --------------------------------------------------------------------------
 * Plugin: jQuery Parallax
 * Version 1.1.3
 * Author: Ian Lunn
 * Twitter: @IanLunn
 * Author URL: http://www.ianlunn.co.uk/
 * Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * -------------------------------------------------------------------------- */

   "use strict";

   var $window = $(window);
   var windowHeight = $window.height();

   $window.resize(function () {
      windowHeight = $window.height();
   });

   $.fn.parallax = function(xpos, speedFactor, outerHeight) {
      var $this = $(this);
      var getHeight;
      var firstTop;
      var paddingTop = 0;
      
      //get the starting position of each element to have parallax applied to it    
      $this.each(function(){
          firstTop = $this.offset().top;
      });

      if (outerHeight) {
         getHeight = function(jqo) {
            return jqo.outerHeight(true);
         };
      } else {
         getHeight = function(jqo) {
            return jqo.height();
         };
      }
         
      // setup defaults if arguments aren't specified
      if (arguments.length < 1 || xpos === null) { xpos = "50%"; }
      if (arguments.length < 2 || speedFactor === null) { speedFactor = 0.1; }
      if (arguments.length < 3 || outerHeight === null) { outerHeight = true; }
      
      // function to be called whenever the window is scrolled or resized
      function update(){
         var pos = $window.scrollTop();            

         $this.each(function(){
            var $element = $(this);
            var top = $element.offset().top;
            var height = getHeight($element);

            // Check if totally above or totally below viewport
            if (top + height < pos || top > pos + windowHeight) {
               return;
            }

            $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
         });
      }     

      $window.bind('scroll', update).resize(update);
      update();
   };

})(jQuery) + (function($){
/* --------------------------------------------------------------------------
 * jQuery Progress Bar
 * -------------------------------------------------------------------------- */
   "use strict";

   // jQuery progress bar
   $.fn.responsiveProgressBar = function () {
      return this.each(function() {
         var bar = $(this);
         var percentage = $(this).attr('data-percent');

         progress(percentage, bar);
      });
   };

   function progress(percent, element) {
      var progressBarWidth = percent * element.width() / 100;
      element.find('.progress-content').append("<div class='progress-meter'></div>").animate({ 
         width: progressBarWidth,
         number: percent
      }, {
         duration: 4000,
         step: function(number) { // called on every step
            // Update the element's value:
            element.find('.progress-meter').text(Math.round(number)+'%');
         } 
      });
   }

})(jQuery) + (function($){
/* --------------------------------------------------------------------------
 * Menu Configuration
 * -------------------------------------------------------------------------- */
   "use strict";
   
   if ($.fn.smartmenus) {
         $.fn.foundstrapmenu = function (options) {
            return this.each(function() {
               var self = $(this);

               self.smartmenus({
                  mainMenuSubOffsetX: 0,
                  mainMenuSubOffsetY: 0,    
                  subMenusSubOffsetX: 0,
                  subMenusSubOffsetY: -48,
                  subIndicatorsText : ''
               }).find('li.active').children('a').addClass('active');
            });
         };
   } else {
      console.log("menu requires jQuery smartmenus plugin");
   }

})(jQuery) + (function($){
/* --------------------------------------------------------------------------
 * jQuery Counter
 * -------------------------------------------------------------------------- */ 
   "use strict";

   if ($.fn.countTo) {
      if (!Modernizr.touch) {
         // run with trigger
         $('.counter-trigger').waypoint(function() { 
            $('.count-me').each(function() {
               $(this).data('countToOptions', {
                  formatter: function (value, options) {
                     return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                  }
               });

               // start all the timers
               $('.timer').each(count);

               function count(options) {
                  var $this = $(this);
                  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                  $this.countTo(options);
               }

            });
         }, { offset: '80%', triggerOnce: true });
      }  
   }
})(jQuery) + (function($){
/* --------------------------------------------------------------------------
 * jQuery Handle Initialization
 * -------------------------------------------------------------------------- */
   "use strict";

   /* ----------- SETTING ----------- */
   var themeApp = {
      
      // ----------- menu and responsive ----------- 
      theme_menu:function() {
         $("#menu").foundstrapmenu();

         $(".mega-menu-container").each(function() {
            var getImg = $(this).find(".mega-menu-imgbg"),
               imgSrc = getImg.attr("src");
            
            getImg.hide();
            $(this).css({
               'background-image' : 'url('+ imgSrc +')'
            });
         });

         if ($(window).width() < 767) {
            var imgLogo = $(".logo-container img");
            var getImgLogo = imgLogo.attr("src");
            var isWhiteLogo = getImgLogo.toLowerCase().indexOf("logo-white");

            $(".menu-container").hide();

            if ($.fn.retina) {
               if (isWhiteLogo >= 0) {
                  $(".logo-container img").attr("src", "img/logo/logo@2x.png");
               }
            } else { 
               if (isWhiteLogo <= 0) {
                  $(".logo-container img").attr("src", "img/logo/logo.png");
               }
            }
            
            $(".slideshow").each(function() {
               $("#me-header").removeClass("header-transparent");
            });

            $(".header-info-container").append('<div class="menu-trigger"><i class="linea-arrows_hamburger2"></i></div>');

            // responsive menu
            $(".menu-trigger").click(function(e){
               e.preventDefault();
               if($(this).hasClass("active")) {
                  // when menu close
                  $(this).removeClass("active");
                  $(".menu-container").slideUp("slow");
               } else {
                  // when menu open
                  $(this).addClass("active");
                  $(".menu-container").slideDown("slow");
               }
            });
         }
      },
      
      // ----------- animation ----------- 
      theme_animation:function() {
         if (!Modernizr.touch) {
            if ($(".me-animate")[0]) {
               $(".me-animate").css('opacity', '0');
            }

            $(".me-animate").waypoint(function() {
               var animate = $(this).attr('data-animate');
               var delayanimate = $(this).attr('data-animate-delay');

               if( delayanimate > 0 ) {
                  var delayTime = (delayanimate / 1000) + 's';

                  $(this).css({
                     'visibility'              : 'visible',
                     '-webkit-animation-delay' : delayTime,
                     '-moz-animation-delay'    : delayTime,   
                     '-o-animation-delay'      : delayTime,     
                     'animation-delay'         : delayTime
                  });
               }

               $(this).css('opacity', '1');
               $(this).addClass("animated " + animate);
            }, {
               offset: '80%',
               triggerOnce: true
            });

            $(window).scroll(function() {   
               if($(window).scrollTop() + $(window).height() == $(document).height()) {
                  $(".me-animate").each(function() {
                     $(this).removeClass("animated");
                  });
               }
            });
         }
      },

      // ----------- chart and progress bar ----------- 
      theme_chart:function() {

         if ($.fn.easyPieChart) {
            $(".chart").responsivePieChart({
               barColor    : '#e6ae48',
               lineCap     : 'square',
               lineWidth   : 5,
               font        : 28
            });

            $(".chart-green").responsivePieChart({ 
               lineCap     : 'square',
               lineWidth   : 5,
               font        : 28,
               barColor    : '#41c28a'
            });
            
            $(".chart-blue").responsivePieChart({ 
               lineCap     : 'square',
               lineWidth   : 5,
               font        : 28,
               barColor    : '#29a7e4'
            });
            
            $(".chart-yellow").responsivePieChart({ 
               lineCap     : 'square',
               lineWidth   : 5,
               font        : 28,
               barColor    : '#f1c40f'
            });
            
            $(".chart-red").responsivePieChart({ 
               lineCap     : 'square',
               lineWidth   : 5,
               font        : 28,
               barColor : '#f15c44'
            });
            
            $(".chart-grey").responsivePieChart({ 
               lineCap     : 'square',
               lineWidth   : 5,
               font        : 28,
               barColor    : '#95a5a6'
            });
         }

         $('.progress-bar').responsiveProgressBar();

      },

      // ----------- twitter ----------- 
      theme_twitter:function() {
         if ($.fn.tweet) {
            $("#twitter-widget").tweet({
               username: "envato",
               join_text: "auto",
               modpath: 'js/twitter/',
               count: 2,
               loading_text: "Loading tweets...",
               template: "<div class='twitter-text'><p>{text}</p></div>"
            });

            // twitter contact
            $("#twitter-carousel").tweet({
               username: "twitter",
               join_text: "auto",
               modpath: 'js/twitter/',
               count: 5,
               loading_text: "Loading tweets...",
               template: "<div class='twitter-text'><p>{text}</p></div>"
            });
         }
      },

      // ----------- tab and accordion ----------- 
      theme_tab:function() {
         
         if ($.fn.easyResponsiveTabs) {            
            $('.top-tab').easyResponsiveTabs({ type : 'tab-top' });
            $('.bottom-tab').easyResponsiveTabs({ type : 'tab-bottom' });
            $('.left-tab').easyResponsiveTabs({ type : 'tab-left' });
            $('.right-tab').easyResponsiveTabs({ type : 'tab-right' });
            $('.accordion').easyResponsiveTabs({ type : 'accordion' });
         }
      },

      // ----------- scrollUp -----------
      theme_scrollUp:function() {
         $.scrollUp({
            scrollText: '<i class="fa fa-chevron-up"></i>',
            scrollSpeed: 1000,
            zIndex: 99
         });
      },

      // ----------- alert -----------
      theme_alert:function() {
         $('a[data-component="alert"]').each(function() {
            $(this).click(function(e){
               e.preventDefault();
               $(this).parent().remove();
            });   
         });
      },

      // ----------- isotope -----------
      theme_isotope:function() {
         if ($.fn.isotope) {
            $(window).load(function () {
               var l = $(".portfolio-container");
               l.isotope({
                  filter: "*",
                  animationOptions: {
                     duration: 750,
                     easing: "linear",
                     queue: false
                  }
               });

               $(".portfolio-filter a").click(function () {
                  var n = $(this).attr("data-filter");
                  l.isotope({
                     filter: n,
                     animationOptions: {
                        duration: 750,
                        easing: "linear",
                        queue: false
                     }
                  });
                  return false;
               });

               var k = $(".portfolio-filter"),
               m = k.find("a");
               m.click(function () {
                  var o = $(this);
                  if (o.hasClass("selected")) {
                     return false;
                  }

                  var n = o.parents(".portfolio-filter");
                  n.find(".selected").removeClass("selected");
                  o.addClass("selected");
               });
            });
         }
      },

      // ----------- fancybox -----------
      theme_fancybox:function() {
         if ($.fn.fancybox) {
            $(".fancybox").fancybox({
               padding:0,
               openEffect:'elastic',
               openSpeed:250,
               closeEffect:'elastic',
               closeSpeed:250,
               closeClick:false,
               helpers:{
                  title: { type:'outside'},
                  media:{}
               }
            });

            $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
               openEffect : 'none',
               closeEffect : 'none',
               prevEffect : 'none',
               nextEffect : 'none',
               padding : 0,

               arrows : false,
               helpers : {
                  media : {},
                  buttons : {}
               }
            });
         }
      },

      // ----------- mediaelement -----------
      theme_mediaelement:function() {
          $("audio, video").each(function() {
            $(this).mediaelementplayer({
               success: function(media, player) {
                  player.addEventListener("playing", function() {
                  }, false);
               }
            });
         });
      },

      // ----------- retina -----------
      theme_retina:function() {
         if ($.fn.retina) {
            $('img.retina').retina("@2x");
         } else {
            console.log("jQuery Retina plugin not found"); 
         }
      },

      // ----------- datepicker -----------
      theme_datepicker:function() {
         if ($.fn.datepicker) {
            $(".me-datepicker").datepicker({
               format: 'mm-dd-yyyy'
            });

            // for check in datepicker
            var nowTemp = new Date();
            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

            var checkin = $('#checkIn').datepicker({
               onRender: function(date) {
                  return date.valueOf() < now.valueOf() ? 'disabled' : '';
               }
            }).on('changeDate', function(ev) {
               if (ev.date.valueOf() > checkout.date.valueOf()) {
                  var newDate = new Date(ev.date)
                  newDate.setDate(newDate.getDate() + 1);
                  checkout.setValue(newDate);
               }
               checkin.hide();
               $('#checkOut')[0].focus();
            }).data('datepicker');
            var checkout = $('#checkOut').datepicker({
               onRender: function(date) {
                  return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
               }
            }).on('changeDate', function(ev) {
               checkout.hide();
            }).data('datepicker');
         }
      },

      // ----------- masonry -----------
      theme_masonry:function() {
         if ($.fn.masonry) {
            var masonryHeight = [],
            masonryElement = jQuery(".masonry");

            masonryElement.masonry({
               itemSelector: '.block-size',
               columnWidth: ".grid-sizer"
            });
         }
      },

      // ----------- carousel -----------
      theme_carousel:function() {
         
         // ----------- testimonial carousel - services.html
         var testimonialCarousel = $(".testimonial-carousel");
         
         testimonialCarousel.owlCarousel({
            autoPlay : 6000,
            navigation : false, 
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem: true,
            pagination: true
         });

         // ----------- client carousel - testimonials.html
         $(".client-carousel").owlCarousel({
            itemsCustom: [[0,1],[400,2],[700,4],[1000,5],[1200,5],[1600,5]],
            autoPlay : 6000,
            navigation : false, 
            slideSpeed : 300,
            paginationSpeed : 400,
            pagination: false
         });

         // ----------- twitter carousel - index-version3.html
         $("#twitter-carousel ul").owlCarousel({
            singleItem: true,
            navigation : false, 
            pagination: false,
            slideSpeed : 500,
            paginationSpeed : 400,
            autoPlay: 3000 
         });

         // ----------- app mobile carousel - index-version6.html
         $(".app-carousel").owlCarousel({
            itemsCustom: [[0,1],[400,2],[700,2],[1000,3],[1200,4],[1600,4]],
            autoPlay : 6000,
            navigation : false, 
            slideSpeed : 300,
            paginationSpeed : 400,
            pagination: true
         });

         // ----------- portfolio single - portfolio-single.html
         $(".portosingle-carousel").owlCarousel({
            autoPlay : 6000,
            navigation : false, 
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem: true,
            pagination: false
         });

         // ----------- blog carousel - blog.html
         var blogCarousel = $(".blog-carousel");
         
         $(".blog-carousel-nav .left-nav").click(function(){
            blogCarousel.trigger('owl.next');
         });

         $(".blog-carousel-nav .right-nav").click(function(){
            blogCarousel.trigger('owl.prev');
         });

         blogCarousel.owlCarousel({
            autoPlay : 6000,
            navigation : false, 
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem: true,
            pagination: false
         });
      },

      // theme init
      theme_init:function(){
         themeApp.theme_menu();
         themeApp.theme_animation();
         themeApp.theme_scrollUp();
         themeApp.theme_tab();
         themeApp.theme_isotope();
         themeApp.theme_fancybox();
         themeApp.theme_mediaelement();
         themeApp.theme_chart();
         themeApp.theme_alert();
         themeApp.theme_retina();
         themeApp.theme_twitter();
         themeApp.theme_datepicker();
         themeApp.theme_carousel();
         themeApp.theme_masonry();
      }
   }

   jQuery(window).load(function($){

   });

   jQuery(document).ready(function($){
      themeApp.theme_init();       
   });
   
})(jQuery);