jQuery(document).ready(function($) {

	var path = 'css/theme/',
		screenWidth = $(window).width();
	
	$('body').append('<div id="theme-switcher">'+
						'<div id="toggle-switcher"><i class="linea-basic_gear"></i></div>'+
						'<div class="heading-switcher"><h5>Switcher</h5></div>' +
						'<div class="container-switcher">' +
							'<ul class="color-theme small-block-grid-4">' +
								'<li><span id="default"></span></li>' +
								'<li><span id="blue"></span></li>' +
								'<li><span id="green"></span></li>' +
								'<li><span id="yellow"></span></li>' +
								'<li><span id="red"></span></li>' +
								'<li><span id="brown"></span></li>' +
								'<li><span id="purple"></span></li>' +
								'<li><span id="green-dark"></span></li>' +
							'</ul>' +
							// '<hr>' +
							// '<h5>Frame</h5>'+
							// '<div class="option" id="frame">' +
							// 	'<a class="active" id="fullWidth" href="#">Full Width</a>' +
							// 	'<a href="#" id="box">Box</a>' +
							// '</div>'+
							// '<ul class="pattern-theme small-block-grid-4">' +
							// 	'<li><span id="pattern1"></span></li>' +
							// 	'<li><span id="pattern2"></span></li>' +
							// 	'<li><span id="pattern3"></span></li>' +
							// 	'<li><span id="pattern4"></span></li>' +
							// '</ul>' +
						'</div>' +
						'<div class="footer-switcher"><a id="reset" class="reset">Reset</a></div>' +
					'</div>');

	if (Modernizr.touch) {
		$('#theme-switcher').find(".color-theme + hr").hide();
		$('#theme-switcher').find("#frame").hide();
	}

	$('#theme-switcher').find('li').slice(-4).css('padding-bottom', '0');

	if((screenWidth < 767)) {
		$('#toggle-switcher').hide();
	}

	// ------------------------ toggle button ------------------------ 
	$('#toggle-switcher').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			$('#theme-switcher').animate({'right':'-194px'});
		} else{
			$(this).addClass('active');
			$('#theme-switcher').animate({'right':'0px'});
		}
	});
	
	// ------------------------ function declaration ------------------------
	// deactive class
	function colorDeactive() {
		$('#theme-switcher ul.color-theme li span').removeClass('active');
	}

	// theme change
	function changeTheme(self) {
		colorChoice = self.attr('id');
		
		$('link#theme').attr('href', path + colorChoice +'.css');
		$.cookie('setColorTheme', colorChoice);
	}

	// color default
	function colorDefault() {
		$('#theme-switcher ul.color-theme li:first-child span').addClass('active');
	}

	// frame change
	function frameChange(frameChoice) {

		if(frameChoice == "box") {
			$('#main-container').addClass('box');

			boxheaderhandle();

			// show pattern choice
			$(".pattern-theme").slideDown("slow");

			// default pattern
			patternDeactive();
		} else {
			boxheaderdisable();
			
			$('#main-container').removeClass('box');

			// hide pattern choice
			$(".pattern-theme").slideUp("slow");
			
			// reset pattern
			resetPattern();
		}

		$.cookie('setFrameTheme', frameChoice);
	}

	// pattern change
	function changePattern(patternChoice) {

		$('body').css({
			'background-image' 		: 'url('+ path + 'pattern/' + patternChoice +'.png)',
			'background-repeat'	: 'repeat'
		});

		$.cookie('setPatternTheme', patternChoice);
	}
	
	// deactive class
	function patternDeactive() {
		$('#theme-switcher ul.pattern-theme li span').removeClass('active');
	}

	// reset pattern
	function resetPattern() {
		$('body').css('background-image' , 'none');
		
		$.cookie('setPatternTheme', 'default-pattern');		
	}

	// ------------------------ Exception ------------------------
	function exceptionColor() {
		var pathname = window.location.pathname,
		getURL = pathname.toLowerCase();

		if (getURL.indexOf("index-version6") >= 0) {
			$('link#theme').attr('href', path +'blue.css');
			$('#theme-switcher ul.color-theme #blue').addClass('active');
			$.cookie('setColorTheme', 'blue');
		}

		if (getURL.indexOf("index-version7") >= 0) {
			$('link#theme').attr('href', path +'default.css');
			$('#theme-switcher ul.color-theme #default').addClass('active');
			$.cookie('setColorTheme', 'default');
		} 

		if (getURL.indexOf("index-version8") >= 0) {
			$('link#theme').attr('href', path +'blue.css');
			$('#theme-switcher ul.color-theme #blue').addClass('active');
			$.cookie('setColorTheme', 'blue');
		} 

		if (getURL.indexOf("index-version9") >= 0) {
			$('link#theme').attr('href', path +'green-dark.css');
			$('#theme-switcher ul.color-theme #green-dark').addClass('active');
			$.cookie('setColorTheme', 'green-dark');
		} 

		if (getURL.indexOf("index-version10") >= 0) {
			$('link#theme').attr('href', path +'default.css');
			$('#theme-switcher ul.color-theme #default').addClass('active');
			$.cookie('setColorTheme', 'default');
		} 
	}

	// ------------------------ Color Theme ------------------------
	// set to color default (default)
	colorDefault();
	
	$('#theme-switcher ul.color-theme li span').click(function(e){
		e.preventDefault();
		var self = $(this);

		// deactive color class
		colorDeactive();

		// active color choice
		self.addClass('active');

		// change color theme
		changeTheme(self);
	});

	// ------------------------ frame theme ------------------------ 
	$('#frame a').click(function(e){
		e.preventDefault();
		
		var self = $(this),
			frameChoice = self.attr("id");

		frameChange(frameChoice);

		$('#frame a').removeClass('active');
		self.addClass('active');
	});

	// ------------------------ pattern for box frame ------------------------ 
	$('#theme-switcher ul.pattern-theme li span').click(function(e){
		var self = $(this);
		patternChoice = self.attr('id');

		// deactive color class
		patternDeactive();

		// active pattern choice
		self.addClass('active');

		// change pattern theme
		changePattern(patternChoice);

	});
	
	// ------------------------ header option ------------------------
	$(".select-link").on('change', function() {
		var headerLink = $(this).val();
		
		window.location = headerLink;
	});

	// ------------------------ check if cookie exist ------------------------ 
	if($.cookie() != 'null') { 
		colorChoice = $.cookie('setColorTheme');
		frameChoice = $.cookie('setFrameTheme');
		patternChoice = $.cookie('setPatternTheme');

		// -- color theme cookie exist
		if(colorChoice != 'null') {

			// fix first cookie check
			if (colorChoice == null) {
				colorChoice = 'default';
			};

			$('link#theme').attr('href', path + colorChoice +'.css');

			colorDeactive();
			$('#theme-switcher ul.color-theme li').find('span#' + colorChoice).addClass('active');
		} else {
			colorDefault();
			$('link#theme').attr('href', path +'default.css');
		}

		// -- frame theme cookie exist
		$('#main-container').removeClass();
		if(frameChoice == 'box') {
			$('#main-container').addClass(frameChoice);

			// show pattern choice
			$(".pattern-theme").slideDown("slow");

			$('#frame a').removeClass('active');
			$('#frame').find('a#' + frameChoice).addClass('active');

			boxheaderhandle();
		}

		// -- pattern theme cookie exist
		if(patternChoice != 'null') {
			if (frameChoice == 'box') {
				changePattern(patternChoice);
				patternDeactive();

				$('#theme-switcher ul.pattern-theme li').find('span#' + patternChoice).addClass('active');
			} else {
				patternDeactive(); 
				resetPattern();
			};

		} else {
			patternDeactive();
			resetPattern();
		}
	}

	// ------------------------ run Exception ------------------------ 
	exceptionColor();

	// ------------------------ reset ------------------------
	$('#reset').click(function(e){
		e.preventDefault();

		// -- color theme reset
		colorDeactive();
		colorDefault();

		// reset color property
		$('link#theme').attr('href', path +'default.css');

		// -- frame theme reset
		$('#main-container').removeClass();
		$('#frame a').removeClass('active');

		// reset frame property
		$('#frame').find('#fullWidth').addClass('active');
		$(".pattern-theme").slideUp("slow");

		// -- pattern theme reset
		patternDeactive() 
		resetPattern();

		// -- reset cookie
		$.cookie('setColorTheme', null);
		$.cookie('setFrameTheme', null);
		$.cookie('setPatternTheme', null);
	});

	/* -----------------------------------------------------------------------
	* Disable Box Frame on mobile
	* ----------------------------------------------------------------------- */ 
	if (screenWidth < 767) {
		$("#main-container").removeClass("box");

		var getElement = $("header .header-info");
		$(getElement).insertBefore($("header .header-container"));
		
		console.log("disable box mode on mobile device");
	}

	// epicon box handle
	function boxheaderhandle(){
		$("#main-container").each(function() {
			if ($(this).hasClass("box")) {
				var getElement = $("header .header-info");
				$(getElement).prependTo($("header"));
			}            
		});
	}

	function boxheaderdisable() {
		$("#main-container").each(function() {
			if ($(this).hasClass("box")) {
				var getElement = $("header .header-info");
				$(getElement).insertBefore($("header .header-container"));
			}            
		});
	}
});