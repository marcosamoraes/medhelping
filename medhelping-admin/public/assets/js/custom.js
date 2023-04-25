$(function () {
	'use strict'

	window.addEventListener('load', () => {
		document.getElementById('global-loader').style.display = 'none';
	})
	// ______________ PAGE LOADING
	$("#global-loader").fadeOut("slow");
	// ______________ Card
	const DIV_CARD = 'div.card';

	// ______________ Function for remove card
	$(document).on('click', '[data-bs-toggle="card-remove"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});

	// ______________ Functions for collapsed card
	$(document).on('click', '[data-bs-toggle="card-collapse"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________ Card full screen
	$(document).on('click', '[data-bs-toggle="card-fullscreen"]', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________Main-navbar
	if (window.matchMedia('(min-width: 992px)').matches) {
		// $('.main-navbar .active').removeClass('show');
		$('.main-header-menu .active').removeClass('show');
	}
	$('.main-header .dropdown > a').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	});
	$('.main-navbar .with-sub').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	});
	$('.dropdown-menu .main-header-arrow').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.dropdown').removeClass('show');
	});
	$('#mainSidebarToggle').on('click', function (e) {
		e.preventDefault();
		$('body.horizontalmenu').toggleClass('main-navbar-show');
	});
	$('#mainContentLeftShow').on('click touch', function (e) {
		e.preventDefault();
		$('body').addClass('main-content-left-show');
	});
	$('#mainContentLeftHide').on('click touch', function (e) {
		e.preventDefault();
		$('body').removeClass('main-content-left-show');
	});
	$('#mainContentBodyHide').on('click touch', function (e) {
		e.preventDefault();
		$('body').removeClass('main-content-body-show');
	})
	$('body').append('<div class="main-navbar-backdrop"></div>');
	$('.main-navbar-backdrop').on('click touchstart', function () {
		$('body').removeClass('main-navbar-show');
	});


	// ______________Dropdown menu
	$(document).on('click touchstart', function (e) {
		e.stopPropagation();
		var dropTarg = $(e.target).closest('.main-header .dropdown').length;
		if (!dropTarg) {
			$('.main-header .dropdown').removeClass('show');
		}
		if (window.matchMedia('(min-width: 992px)').matches) {
			var navTarg = $(e.target).closest('.main-navbar .nav-item').length;
			if (!navTarg) {
				$('.main-navbar .show').removeClass('show');
			}
			var menuTarg = $(e.target).closest('.main-header-menu .nav-item').length;
			if (!menuTarg) {
				$('.main-header-menu .show').removeClass('show');
			}
			if ($(e.target).hasClass('main-menu-sub-mega')) {
				$('.main-header-menu .show').removeClass('show');
			}
		} else {
			if (!$(e.target).closest('#mainMenuShow').length) {
				var hm = $(e.target).closest('.main-header-menu').length;
				if (!hm) {
					$('body').removeClass('main-header-menu-show');
				}
			}
		}
	});

	// ______________MainMenuShow
	$('#mainMenuShow').on('click', function (e) {
		e.preventDefault();
		$('body').toggleClass('main-header-menu-show');
	})
	$('.main-header-menu .with-sub').on('click', function (e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
	})
	$('.main-header-menu-header .close').on('click', function (e) {
		e.preventDefault();
		$('body').removeClass('main-header-menu-show');
	})

	// ______________Popover
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl)
	})

	// ______________Tooltip
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})


	// ______________Toast
	$(".toast").toast();

	// ______________Back-top-button
	$(window).on("scroll", function (e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$(document).on("click", "#back-to-top", function (e) {
		$("html, body").animate({
			scrollTop: 0
		}, 0);
		return false;
	});

	// ______________Full screen
	$(document).on("click", ".fullscreen-button", function toggleFullScreen() {
		$('html').addClass('fullscreen');
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
				document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
				document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen();
			}
		} else {
			$('html').removeClass('fullscreen');
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	})

	// ______________Cover Image
	$(".cover-image").each(function () {
		var attr = $(this).attr('data-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});


	// ______________Horizontal-menu Active Class
	function addActiveClass(element) {
		if (current === "") {
			if (element.attr('href').indexOf("#") !== -1) {
				element.parents('.main-navbar .nav-item').last().removeClass('active');
				if (element.parents('.main-navbar .nav-sub').length) {
					element.parents('.main-navbar .nav-sub-item').last().removeClass('active');
				}
			}
		} else {
			if (element.attr('href').indexOf(current) !== -1) {
				element.parents('.main-navbar .nav-item').last().addClass('active');
				if (element.parents('.main-navbar .nav-sub').length) {
					element.parents('.main-navbar .nav-sub-item').last().addClass('active');
					element.parent().addClass('active')
					element.parent().siblings().removeClass('active');
				}
			}
		}
	}
	var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
	$('.main-navbar .nav li a').each(function () {
		var $this = $(this);
		addActiveClass($this);
	})


	/* Headerfixed */
	$(window).on("scroll", function (e) {
		if ($(window).scrollTop() >= 66) {
			$('.main-header').addClass('fixed-header');
		}
		else {
			$('.main-header').removeClass('fixed-header');
		}
	});
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

	// ______________ SWITCHER-toggle ______________//

	/*Light Theme Start*/
	$('body').addClass('light-theme');
	/*Light Theme End*/

	/*Dark Theme Start*/
	// $('body').addClass('dark-theme');
	/*Dark Theme End*/

	/*Light Menu Start*/
	// $('body').addClass('light-menu');
	/*Light Menu End*/

	/*Color Menu Start*/
	// $('body').addClass('color-menu');
	/*Color Menu End*/

	/*Dark Menu Start*/
	// $('body').addClass('dark-menu');
	/*Dark Menu End*/

	/*Light Header Start*/
	// $('body').addClass('header-light');
	/*Light Header End*/

	/*Color Header Start*/
	// $('body').addClass('color-header');
	/*Color Header End*/

	/*Dark Header Start*/
	// $('body').addClass('header-dark');
	/*Dark Header End*/


	/*Boxed Layout Start*/
	// $('body').addClass('layout-boxed');
	/*Boxed Layout End*/

	/*Header-Position Styles Start*/
	// $('body').addClass('scrollable-layout');
	/*Header-Position Styles End*/


	/*Icon Text Sidemenu Start*/
	// $('body').addClass('icontext-menu');
	// icontext();
	// $('body').addClass('main-sidebar-hide');
	/*Icon Text Sidemenu End*/

	/*Icon Overlay Sidemenu Start*/
	// $('body').addClass('icon-overlay');
	// hovermenu();
	// $('body').addClass('main-sidebar-hide');
	/*Icon Overlay Sidemenu End*/

	/*Closed Sidemenu Start*/
	// $('body').addClass('closed-leftmenu');
	// $('body').addClass('main-sidebar-hide');

	/*Closed Sidemenu End*/

	/*Hover Submenu Start*/
	// $('body').addClass('hover-submenu');
	// hovermenu();
	// $('body').addClass('main-sidebar-hide');
	/*Hover Submenu End*/

	/*Hover Submenu Style 1 Start*/
	// $('body').addClass('hover-submenu1');
	// hovermenu();
	// $('body').addClass('main-sidebar-hide');
	/*Hover Submenu Style 1 End*/

	/* Horizontal Menu Start */
	// $('body').addClass('horizontalmenu');
	/*Horizontal Menu End */

	/* Horizontal Hover Menu Start */
	// $('body').addClass('horizontalmenu-hover');
	/* Horizontal Hover Menu End */



	/* RTL version Start */
	// $('body').addClass('rtl');
	/* RTL version End */


	// ______________ SWITCHER-toggle ______________//

	$(document).on('change', '[name="state"]', function() {
		let state_id = $('[name="state"] option:selected').data('id');
		$.getJSON(APP_URL+'/json/cities.json', function(data) {
			data = data.filter(function (v){
		        return v.estado==state_id;
		    });

			$('[name="city"]').html('<option>Selecione uma cidade...</option>');
			let new_content = '';
			$.each(data, function(i, v) {
				new_content += '<option value="' + v.nome + '">' + v.nome + '</option>';
			})
			$('[name="city"]').html(new_content);
		});
	});

	$(document).on('blur', '[name="cep"]', function() {
		let cep = $(this).val();
			cep.replace(/\D/g, "");

		if(cep.length == 8) {
			$('#global-loader').fadeIn();
			$.get('https://viacep.com.br/ws/' + cep + '/json/', function(response) {

				$('[name="address"]').val(response.logradouro);
				$('[name="number"]').val();
				$('[name="area"]').val(response.bairro);
				$('[name="complement"]').val();
				$("[name='state']").val(response.uf).trigger('change');

				setTimeout(function() {
					$('[name="city"]').val(response.localidade).trigger('change');
				}, 1000);

				$('#global-loader').fadeOut();
			});
		}
	});

	$('[name="cpf_cnpj"]').keydown(function(){
	    try {
	        $(this).unmask();
	    } catch (e) {}

	    var tamanho = $(this).val().length;

	    if(tamanho < 11){
	        $(this).mask("999.999.999-99");
	    } else {
	        $(this).mask("99.999.999/9999-99");
	    }

	    // ajustando foco
	    var elem = this;
	    setTimeout(function(){
	        // mudo a posição do seletor
	        elem.selectionStart = elem.selectionEnd = 10000;
	    }, 0);
	    // reaplico o valor para mudar o foco
	    var currentValue = $(this).val();
	    $(this).val('');
	    $(this).val(currentValue);
	});

  	$('[name="value"]').mask('000.000.000.000.000,00', {reverse: true});
  	$('[name="promo_value"]').mask('000.000.000.000.000,00', {reverse: true});

	$('[name="whatsapp"]').mask("(00) 00000-0000");
	function updateMask(event) {
	    var $element = $(this);
	    $(this).off('blur');
	    $element.unmask();
	    if(this.value.replace(/\D/g, '').length > 10) {
	        $element.mask("(00) 00000-0000");
	    } else {
	        $element.mask("(00) 0000-00009");
	    }
	    $(this).on('blur', updateMask);
	}
	$('[name="whatsapp"]').on('blur', updateMask);
});



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

