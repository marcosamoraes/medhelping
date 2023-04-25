// Swticher Cookie Base
/**
 * Styleswitch stylesheet switcher built on jQuery
 * Under an Attribution, Share Alike License
 * By Kelvin Luck ( http://www.kelvinluck.com/ )
 * Thanks for permission! 
 **/

// DEMO Swticher Base
jQuery('.demo-icon').click(function () {
	if (jQuery('.demo_changer').hasClass("active")) {
		jQuery('.demo_changer').animate({ "right": "-270px" }, function () {
			jQuery('.demo_changer').removeClass("active");
		});
	} else {
		jQuery('.demo_changer').animate({ "right": "0px" }, function () {
			jQuery('.demo_changer').addClass("active");
		});
	}
});

//p-scroll bar
const ps5 = new PerfectScrollbar('.sidebar-right1', {
	useBothWheelAxes: true,
	suppressScrollX: true,
});

jQuery('.main-content').click(function () {
	if (jQuery('.demo_changer').hasClass("active")) {
		jQuery('.demo_changer').animate({ "right": "-270px" }, function () {
			jQuery('.demo_changer').removeClass("active");
		});
	}
});

jQuery('.main-signin-wrapper').click(function () {
	if (jQuery('.demo_changer').hasClass("active")) {
		jQuery('.demo_changer').animate({ "right": "-270px" }, function () {
			jQuery('.demo_changer').removeClass("active");
		});
	}
});

function switcherEvents() {
	'use strict';

	/* layout-setting Start*/
	$('.layout-setting').on("click", function (e) {
		if (!(document.querySelector('body').classList.contains('dark-theme'))) {
			$('body').addClass('dark-theme');
			$('body').removeClass('light-theme');

			$('#myonoffswitch5').prop('checked', true);
			$('#myonoffswitch8').prop('checked', true);

			localStorage.setItem('spruhadarkMode', true);
			localStorage.removeItem('spruhalightMode');
			$('#myonoffswitch2').prop('checked', true);

		} else {
			$('body').removeClass('dark-theme');
			$('body').addClass('light-theme');
			$('#myonoffswitch3').prop('checked', true);
			$('#myonoffswitch6').prop('checked', true);

			localStorage.setItem('spruhalightMode', true);
			localStorage.removeItem('spruhadarkMode');
			$('#myonoffswitch1').prop('checked', true);
		}
	});
	/* layout-setting End*/

	/*Light Theme Start*/
	$(document).on("click", '#myonoffswitch1', function () {
		if (this.checked) {
			$('body').addClass('light-theme');
			$('body').removeClass('dark-theme');
			$('#myonoffswitch3').prop('checked', true);
			$('#myonoffswitch6').prop('checked', true);

			// remove dark theme properties	
			localStorage.removeItem('spruhadarkPrimary')

			// remove light theme properties
			localStorage.removeItem('spruhaprimaryColor')
			localStorage.removeItem('spruhaprimaryHoverColor')
			localStorage.removeItem('spruhaprimaryBorderColor')

			checkOptions();
			const root = document.querySelector(':root');
			root.style = "";
			names()
		}
		localStorageBackup();
	});
	/*Light Theme End*/

	/*Dark Theme Start*/
	$(document).on("click", '#myonoffswitch2', function () {
		if (this.checked) {
			$('body').addClass('dark-theme');
			$('body').removeClass('light-theme');
			$('#myonoffswitch5').prop('checked', true);
			$('#myonoffswitch8').prop('checked', true);

			// remove light theme properties
			localStorage.removeItem('spruhaprimaryColor')
			localStorage.removeItem('spruhaprimaryHoverColor')
			localStorage.removeItem('spruhaprimaryBorderColor')
			localStorage.removeItem('spruhadarkPrimary')
			checkOptions();

			const root = document.querySelector(':root');
			root.style = "";
			names()
		}
		localStorageBackup()
	});
	/*Dark Theme End*/

	/*Light Menu Start*/
	$(document).on("click", '#myonoffswitch3', function () {
		if (this.checked) {
			$('body').addClass('light-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
		}
	});
	/*Light Menu End*/

	/*Color Menu Start*/
	$(document).on("click", '#myonoffswitch4', function () {
		if (this.checked) {
			$('body').addClass('color-menu');
			$('body').removeClass('light-menu');
			$('body').removeClass('dark-menu');
		}
	});
	/*Color Menu End*/

	/*Dark Menu Start*/
	$(document).on("click", '#myonoffswitch5', function () {
		if (this.checked) {
			$('body').addClass('dark-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('light-menu');
		}
	});
	/*Dark Menu End*/

	/*Light Header Start*/
	$(document).on("click", '#myonoffswitch6', function () {
		if (this.checked) {
			$('body').addClass('header-light');
			$('body').removeClass('color-header');
			$('body').removeClass('header-dark');
		}
	});
	/*Light Header End*/

	/*Color Header Start*/
	$(document).on("click", '#myonoffswitch7', function () {
		if (this.checked) {
			$('body').addClass('color-header');
			$('body').removeClass('header-light');
			$('body').removeClass('header-dark');
		}
	});
	/*Color Header End*/

	/*Dark Header Start*/
	$(document).on("click", '#myonoffswitch8', function () {
		if (this.checked) {
			$('body').addClass('header-dark');
			$('body').removeClass('color-header');
			$('body').removeClass('header-light');
		}
	});
	/*Dark Header End*/

	/*Full Width Layout Start*/
	$(document).on("click", '#myonoffswitch9', function () {
		if (this.checked) {
			$('body').addClass('layout-fullwidth');
			$('body').removeClass('layout-boxed');
		}
	});
	/*Full Width Layout End*/

	/*Boxed Layout Start*/
	$(document).on("click", '#myonoffswitch10', function () {
		if (this.checked) {
			$('body').addClass('layout-boxed');
			$('body').removeClass('layout-fullwidth');
		}
		
		// if (document.querySelector('body').classList.contains('horizontalmenu') && !document.querySelector('body').classList.contains('error-1')) {
			checkHoriMenu();
			// responsive();
		// }
	});
	/*Boxed Layout End*/

	/*Header-Position Styles Start*/
	$(document).on("click", '#myonoffswitch11', function () {
		if (this.checked) {
			$('body').addClass('fixed-layout');
			$('body').removeClass('scrollable-layout');
		}
	});
	$(document).on("click", '#myonoffswitch12', function () {
		if (this.checked) {
			$('body').addClass('scrollable-layout');
			$('body').removeClass('fixed-layout');
		}
	});
	/*Header-Position Styles End*/

	/*Default Sidemenu Start*/
	$(document).on("click", '#myonoffswitch13', function () {
		if (this.checked) {
			$('body').addClass('default-menu');
			$('body').removeClass('main-sidebar-hide');
			hovermenu();
			$('body').removeClass('icontext-menu');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
		}
	});
	/*Default Sidemenu End*/

	/*Icon Text Sidemenu Start*/
	$(document).on("click", '#myonoffswitch14', function () {
		if (this.checked) {
			$('body').addClass('icontext-menu');
			icontext();
			$('body').addClass('main-sidebar-hide');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('hover-submenu');
		}
	});
	/*Icon Text Sidemenu End*/

	/*Icon Overlay Sidemenu Start*/
	$(document).on("click", '#myonoffswitch15', function () {
		if (this.checked) {
			$('body').addClass('icon-overlay');
			hovermenu();
			$('body').addClass('main-sidebar-hide');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('icontext-menu');
		}
	});
	/*Icon Overlay Sidemenu End*/

	/*Closed Sidemenu Start*/
	$(document).on("click", '#myonoffswitch16', function () {
		if (this.checked) {
			$('body').addClass('closed-leftmenu');
			$('body').addClass('main-sidebar-hide');
			$('body').removeClass('default-menu');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('icontext-menu');

		}
	});
	/*Closed Sidemenu End*/

	/*Hover Submenu Start*/
	$(document).on("click", '#myonoffswitch17', function () {
		if (this.checked) {
			$('body').addClass('hover-submenu');
			hovermenu();
			$('body').addClass('main-sidebar-hide');
			$('body').removeClass('hover-submenu1');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('icontext-menu');
		}
	});
	/*Hover Submenu End*/

	/*Hover Submenu Style 1 Start*/
	$(document).on("click", '#myonoffswitch18', function () {
		if (this.checked) {
			$('body').addClass('hover-submenu1');
			hovermenu();
			$('body').addClass('main-sidebar-hide');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('icontext-menu');
		}
	});
	/*Hover Submenu Style 1 End*/

	/* Vertical Menu Start */
	$(document).on("click", '#myonoffswitch01', function () {
		if (this.checked) {
			$('body').addClass('leftmenu');
			$('body').addClass('main-body');
			$('body').removeClass('horizontalmenu');
			$('body').removeClass('horizontalmenu-hover');
			$('.main-content').addClass('side-content');
			$('.main-header').removeClass(' hor-header');
			$('.main-header').addClass('sticky');
			$('.main-content').removeClass('hor-content');
			$('.main-container').removeClass('container');
			$('.main-container-1').removeClass('container');
			$('.main-container').addClass('container-fluid');
			$('.main-menu').removeClass('main-navbar hor-menu ');
			$('.main-menu').addClass('main-sidebar main-sidebar-sticky side-menu');
			$('.main-container-1').addClass('main-sidebar-header');
			$('.main-body-1').addClass('main-sidebar-body');
			$('.menu-icon').addClass('sidemenu-icon');
			$('.menu-icon').removeClass('hor-icon');
			// HorizontalHovermenu();
			// ActiveSubmenu();
			var position = window.location.pathname.split('/');
			$(".main-menu li a").each(function () {
				var $this = $(this);
				var pageUrl = $this.attr("href");
				if (pageUrl) {
					if (position[position.length - 1] == pageUrl) {
						$(this).addClass("active");
						$(this).parent().prev().addClass("active"); // add active to li of the current link
						$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
						$(this).parent().parent().parent().parent().prev().addClass("active");
						$(this).parent().parent().parent().parent().parent().addClass("is-expanded");
						$(this).parent().parent().prev().click(); // click the item to make it drop
						$(this).parent().parent().slideDown(300, function () { });
						$(this).parent().parent().parent().parent().slideDown(300, function () { });
						$(this).parent().parent().parent().parent().slideDown(300, function () { });
						return false;
					}
				}
			})
			// responsive();
			localStorage.setItem("spruhavertical", true);
			localStorage.removeItem("spruhahorizontalmenu");
			localStorage.removeItem("spruhahorizontalmenuhover");

		}
	});
	/* Vertical Menu End */

	/* Horizontal Menu Start */
	$(document).on("click", '#myonoffswitch02', function () {
		if (this.checked) {
			if (window.innerWidth >= 992) {
				let subNavSub = document.querySelectorAll('.sub-nav-sub');
				subNavSub.forEach((e) => {
					e.style.display = '';
				})
				let subNav = document.querySelectorAll('.nav-sub')
				subNav.forEach((e) => {
					e.style.display = '';
				})
			}
			$('body').addClass('horizontalmenu');
			$('body').removeClass('horizontalmenu-hover');
			$('body').removeClass('leftmenu');
			$('body').removeClass('main-body');
			$('.main-content').addClass('hor-content');
			$('.main-header').addClass('hor-header');
			$('.main-header').removeClass('sticky');
			$('.main-content').removeClass('side-content');
			$('.main-container-1').addClass('container');
			$('.main-container-1').removeClass('main-sidebar-header');
			$('.main-menu').addClass('main-navbar hor-menu');
			$('.main-menu').removeClass('main-sidebar main-sidebar-sticky side-menu');
			$('.main-body-1').removeClass('main-sidebar-body');
			$('.menu-icon').removeClass('sidemenu-icon');
			$('.menu-icon').addClass('hor-icon');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('main-sidebar-hide');
			$('body').removeClass('main-sidebar-open');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			// HorizontalHovermenu();
			localStorage.removeItem("spruhavertical");
			localStorage.setItem("spruhahorizontalmenu", true);
			localStorage.removeItem("spruhahorizontalmenuhover");
			if (document.querySelector('body').classList.contains('horizontalmenu') && !document.querySelector('body').classList.contains('error-1')) {
				checkHoriMenu();
				responsive();
			}
			if (!document.querySelector('.horizontalmenu').classList.contains('error-1')) {
				$(".main-container").addClass("container");
				$(".main-container").removeClass("container-fluid");
			}
		}
	});
	/*Horizontal Menu End */

	/* Horizontal Hover Menu Start */
	$(document).on("click", '#myonoffswitch03', function () {
		if (this.checked) {
			if (window.innerWidth >= 992) {
				let subNavSub = document.querySelectorAll('.sub-nav-sub');
				subNavSub.forEach((e) => {
					e.style.display = '';
				})
				let subNav = document.querySelectorAll('.nav-sub')
				subNav.forEach((e) => {
					e.style.display = '';
				})
			}
			$('body').addClass('horizontalmenu');
			$('body').addClass('horizontalmenu-hover');
			$('body').removeClass('leftmenu');
			$('body').removeClass('main-body');
			$('.main-content').addClass('hor-content');
			$('.main-header').addClass('hor-header');
			$('.main-header').removeClass('sticky');
			$('.main-content').removeClass('side-content');
			$('.main-container-1').addClass('container');
			$('.main-menu').addClass('main-navbar hor-menu');
			$('.main-menu').removeClass('main-sidebar main-sidebar-sticky side-menu');
			$('.main-container-1').removeClass('main-sidebar-header');
			$('.main-body-1').removeClass('main-sidebar-body');
			$('.menu-icon').removeClass('sidemenu-icon');
			$('.menu-icon').addClass('hor-icon');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('main-sidebar-hide');
			$('body').removeClass('main-sidebar-open');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			if (document.querySelector('body').classList.contains('horizontalmenu') && !document.querySelector('body').classList.contains('error-1')) {
				checkHoriMenu();
				responsive();
			}
			if (!document.querySelector('.horizontalmenu').classList.contains('error-1')) {
				$(".main-container").addClass("container");
				$(".main-container").removeClass("container-fluid");
			}
			localStorage.removeItem("spruhavertical");
			localStorage.removeItem("spruhahorizontalmenu");
			localStorage.setItem("spruhahorizontalmenuhover", true);
		}
	});
	/* Horizontal Hover Menu End */



	/* LTR version Start */
	$(document).on("click", '#myonoffswitch19', function () {
		if (this.checked) {
			$('body').addClass('ltr');
			$('body').removeClass('rtl');
			$("html[lang=en]").attr("dir", "ltr");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = false; //don't know if both are necessary
				carouselData.options.rtl = false;
				$(element).trigger('refresh.owl.carousel');
			});

			localStorage.removeItem("spruhartl");
			localStorage.setItem("spruhaltr", true);
		}
	});
	/* LTR version End */

	/* RTL version Start */
	$(document).on("click", '#myonoffswitch20', function () {
		if (this.checked) {
			$('body').addClass('rtl');
			$('body').removeClass('ltr');
			$("html[lang=en]").attr("dir", "rtl");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = true; //don't know if both are necessary
				carouselData.options.rtl = true;
				$(element).trigger('refresh.owl.carousel');
			});

			localStorage.removeItem("spruhaltr");
			localStorage.setItem("spruhartl", true);
		}
	});
	/* RTL version End */

}
switcherEvents();

function resetData() {
	$('#myonoffswitch5').prop('checked', true);
	$('#myonoffswitch6').prop('checked', true);
	$('#myonoffswitch1').prop('checked', true);
	$('#myonoffswitch9').prop('checked', true);
	$('#myonoffswitch11').prop('checked', true);
	$('#myonoffswitch13').prop('checked', true);
	$('body')?.removeClass('dark-theme');
	$('body')?.addClass('dark-menu');
	$('body')?.removeClass('light-menu');
	$('body')?.removeClass('color-menu');
	$('body')?.removeClass('header-dark');
	$('body')?.removeClass('header-light');
	$('body')?.removeClass('color-header');
	$('body')?.removeClass('layout-boxed');
	$('body')?.removeClass('icontext-menu');
	$('body')?.removeClass('icon-overlay');
	$('body')?.removeClass('closed-leftmenu');
	$('body')?.removeClass('hover-submenu');
	$('body')?.removeClass('hover-submenu1');
	$('body')?.removeClass('scrollable-layout');
	$('body')?.removeClass('fixed-layout');
	$('body')?.removeClass('main-sidebar-hide');


	$('body').addClass('leftmenu');
	$('body').addClass('main-body');
	$('body').removeClass('horizontalmenu');
	$('body').removeClass('horizontalmenu-hover');
	$('.main-content').addClass('side-content');
	$('.main-header').removeClass(' hor-header');
	$('.main-header').addClass('sticky');
	$('.main-content').removeClass('hor-content');
	$('.main-container').removeClass('container');
	$('.main-container-1').removeClass('container');
	$('.main-container').addClass('container-fluid');
	$('.main-menu').removeClass('main-navbar hor-menu ');
	$('.main-menu').addClass('main-sidebar main-sidebar-sticky side-menu');
	$('.main-container-1').addClass('main-sidebar-header');
	$('.main-body-1').addClass('main-sidebar-body');
	$('.menu-icon').addClass('sidemenu-icon');
	$('.menu-icon').removeClass('hor-icon');
	// HorizontalHovermenu();
	ActiveSubmenu();
	var position = window.location.pathname.split('/');
	$(".main-menu li a").each(function () {
		var $this = $(this);
		var pageUrl = $this.attr("href");
		if (pageUrl) {
			if (position[position.length - 1] == pageUrl) {
				$(this).addClass("active");
				$(this).parent().prev().addClass("active"); // add active to li of the current link
				$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
				$(this).parent().parent().parent().parent().prev().addClass("active");
				$(this).parent().parent().parent().parent().parent().addClass("is-expanded");
				$(this).parent().parent().prev().click(); // click the item to make it drop
				$(this).parent().parent().slideDown(300, function () { });
				$(this).parent().parent().parent().parent().slideDown(300, function () { });
				$(this).parent().parent().parent().parent().slideDown(300, function () { });
				return false;
			}
		}
	})
	responsive();
	localStorage.setItem("spruhavertical", true);
	localStorage.removeItem("spruhahorizontalmenu");
	localStorage.removeItem("spruhahorizontalmenuhover");

	$('body').addClass('ltr');
	$('body').removeClass('rtl');
	$("html[lang=en]").attr("dir", "ltr");
	$("head link#style").attr("href", $(this));
	(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css"));
	var carousel = $('.owl-carousel');
	$.each(carousel, function (index, element) {
		// element == this
		var carouselData = $(element).data('owl.carousel');
		carouselData.settings.rtl = false; //don't know if both are necessary
		carouselData.options.rtl = false;
		$(element).trigger('refresh.owl.carousel');
	});

	localStorage.removeItem("spruhartl");
	localStorage.setItem("spruhaltr", true);

}

function checkOptions() {
	// light header 
	if (document.querySelector('body').classList.contains('header-light')) {
		$('#myonoffswitch6').prop('checked', true);
	}
	// color header 
	if (document.querySelector('body').classList.contains('color-header')) {
		$('#myonoffswitch7').prop('checked', true);
	}
	// dark header 
	if (document.querySelector('body').classList.contains('header-dark')) {
		$('#myonoffswitch8').prop('checked', true);
	}

	// light menu
	if (document.querySelector('body').classList.contains('light-menu')) {
		$('#myonoffswitch3').prop('checked', true);
	}
	// color menu
	if (document.querySelector('body').classList.contains('color-menu')) {
		$('#myonoffswitch4').prop('checked', true);
	}
	// dark menu
	if (document.querySelector('body').classList.contains('dark-menu')) {
		$('#myonoffswitch5').prop('checked', true);
	}
	// rtl
	if (document.querySelector('body').classList.contains('rtl')) {
		$('#myonoffswitch20').prop('checked', true);
	}
	// Horizontal
	if (document.querySelector('body').classList.contains('horizontalmenu')) {
		$('#myonoffswitch02').prop('checked', true);
	}
	// Horizontal hover
	if (document.querySelector('body').classList.contains('horizontalmenu-hover')) {
		$('#myonoffswitch03').prop('checked', true);
	}
}

checkOptions();
(function () {
	"use strict";

	$(document).ready(function () {

		//On ready function for Horizontal Menu Start
		let bodyhorizontal = $('body').hasClass('horizontalmenu');
		if (bodyhorizontal) {
			if (window.innerWidth >= 992) {
				let subNavSub = document.querySelectorAll('.sub-nav-sub');
				subNavSub.forEach((e) => {
					e.style.display = '';
				})
				let subNav = document.querySelectorAll('.nav-sub')
				subNav.forEach((e) => {
					e.style.display = '';
				})
			}
			$('body').addClass('horizontalmenu');
			$('body').removeClass('horizontalmenu-hover');
			$('body').removeClass('leftmenu');
			$('body').removeClass('main-body');
			$('.main-content').addClass('hor-content');
			$('.main-header').addClass('hor-header');
			$('.main-header').removeClass('sticky');
			$('.main-content').removeClass('side-content');
			$('.main-container-1').addClass('container');
			$('.main-menu').addClass('main-navbar hor-menu');
			$('.main-menu').removeClass('main-sidebar main-sidebar-sticky side-menu');
			$('.main-container-1').removeClass('main-sidebar-header');
			$('.main-body-1').removeClass('main-sidebar-body');
			$('.menu-icon').removeClass('sidemenu-icon');
			$('.menu-icon').addClass('hor-icon');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('main-sidebar-hide');
			$('body').removeClass('main-sidebar-open');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			// HorizontalHovermenu();
			if (document.querySelector('body').classList.contains('horizontalmenu') && !document.querySelector('body').classList.contains('error-1')) {
				checkHoriMenu();
				responsive();
			}
			if (!document.querySelector('.horizontalmenu').classList.contains('error-1')) {
				$(".main-container").addClass("container");
				$(".main-container").removeClass("container-fluid");
			}
		}
		//On ready function for Horizontal Menu End


		function light() {
			// if (localStorage.getItem("dark-menu") == null || localStorage.getItem("dark-menu") == undefined) {
			// 	localStorage.setItem("spruhadark-menu", "true")
			// }

			if (document.querySelector('body').classList.contains('light-theme')) {
				$('#myonoffswitch5').prop('checked', true);
				$('#myonoffswitch6').prop('checked', true);
			}

			if (localStorage.getItem("dark-menu") == 'true') {
				document.querySelector('body')?.classList.add('dark-menu')
			}
			else {
				document.querySelector('body')?.classList.remove('dark-menu')
			}
		}
		light();


		let bodyhorizontalHover = $('body').hasClass('horizontalmenu-hover');
		if (bodyhorizontalHover) {
			if (window.innerWidth >= 992) {
				let subNavSub = document.querySelectorAll('.sub-nav-sub');
				subNavSub.forEach((e) => {
					e.style.display = '';
				})
				let subNav = document.querySelectorAll('.nav-sub')
				subNav.forEach((e) => {
					e.style.display = '';
				})
			}
			$('body').addClass('horizontalmenu');
			$('body').addClass('horizontalmenu-hover');
			$('body').removeClass('leftmenu');
			$('body').removeClass('main-body');
			$('.main-content').addClass('hor-content');
			$('.main-header').addClass('hor-header');
			$('.main-header').removeClass('sticky');
			$('.main-content').removeClass('side-content');
			$('.main-container-1').addClass('container');
			$('.main-menu').addClass('main-navbar hor-menu');
			$('.main-menu').removeClass('main-sidebar main-sidebar-sticky side-menu');
			$('.main-container-1').removeClass('main-sidebar-header');
			$('.main-body-1').removeClass('main-sidebar-body');
			$('.menu-icon').removeClass('sidemenu-icon');
			$('.menu-icon').addClass('hor-icon');
			$('body').removeClass('default-menu');
			$('body').removeClass('closed-leftmenu');
			$('body').removeClass('icontext-menu');
			$('body').removeClass('main-sidebar-hide');
			$('body').removeClass('main-sidebar-open');
			$('body').removeClass('icon-overlay');
			$('body').removeClass('hover-submenu');
			$('body').removeClass('hover-submenu1');
			if (document.querySelector('body').classList.contains('horizontalmenu') && !document.querySelector('body').classList.contains('error-1')) {
				checkHoriMenu();
				responsive();
			}
			if (!document.querySelector('.horizontalmenu').classList.contains('error-1')) {
				$(".main-container").addClass("container");
				$(".main-container").removeClass("container-fluid");
			}
		}

		let bodyRtl = $('body').hasClass('rtl');
		if (bodyRtl) {
			$('body').addClass('rtl');
			$('body').removeClass('ltr');
			$("html[lang=en]").attr("dir", "rtl");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = true; //don't know if both are necessary
				carouselData.options.rtl = true;
				$(element).trigger('refresh.owl.carousel');
			});
			$(".fc-theme-standard ").addClass("fc-direction-rtl");
			$(".fc-theme-standard ").removeClass("fc-direction-ltr");
			$(".fc-header-toolbar ").addClass("fc-toolbar-rtl");
			$(".fc-header-toolbar ").removeClass("fc-toolbar-ltr");

		}
	});
	
})()
