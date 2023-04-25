
$(function () {


	$(document).on('click touchstart', function (e) {
		e.stopPropagation();
		// closing of sidebar menu when clicking outside of it
		if (!$(e.target).closest('.main-header-menu-icon').length) {
			var sidebarTarg = $(e.target).closest('.main-sidebar').length;
			if (!sidebarTarg) {
				$('body').removeClass('main-sidebar-show');
			}
		}
	});

	$(document).on('click', '#mainSidebarToggle', function (event) {
		event.preventDefault();
		if (window.matchMedia('(min-width: 992px)').matches) {
			$('body.leftmenu').toggleClass('main-sidebar-hide');
		} else {
			$('body.leftmenu').toggleClass('main-sidebar-show');
			$('body.leftmenu').removeClass('main-sidebar-hide');
		}
	});

	// ______________main-sidebar Active Class
	var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');
	function addActiveClass(element) {
		if (current === "") {
			if (element.attr('href').indexOf("#") !== -1) {
				element.parents('.main-sidebar .nav-item').last().removeClass('active');
				if (element.parents('.main-sidebar .nav-sub').length) {
					element.closest('.main-sidebar .nav-item.active').removeClass('show');
					element.parents('.main-sidebar .nav-sub-item').last().removeClass('active');
					element.parent().removeClass('active')
				}
			}
		} else {
			if (element.attr('href').indexOf(current) !== -1) {
				element.parents('.main-sidebar .nav-item').last().addClass('active');
				if (element.parents('.main-sidebar .nav-sub').length) {
					element.closest('.main-sidebar .nav-item.active').addClass('show');
					element.parents('.main-sidebar .nav-sub-item').last().addClass('active');
					element.parent().addClass('active')
					element.parent().siblings().removeClass('active');
				}
			}
		}
	}
	$('.main-sidebar .nav li a').each(function () {
		var $this = $(this);
		addActiveClass($this);
	});


	// default layout
	hovermenu();

	// for Icon-text Menu
	// icontext(); 

	/*---Scroling ---*/
	//P-scroll
	new PerfectScrollbar('.side-menu', {
		suppressScrollX: true,
		suppressScrollY: false,
		useBothWheelAxes: true,
	});

});

function menuClick() {
// Activate sidebar with-sub toggle
$(".main-menu .with-sub").on('click', function (e) {
	var $this = $(this);
	var checkElement = $this.next();
	var animationSpeed = 300,
		slideMenuSelector = '.nav-sub';
	if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
		checkElement.slideUp(animationSpeed, function () {
			checkElement.removeClass('open');
		});
		checkElement.parent("li").removeClass("show");
	}
	else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
		var parent = $this.parents('ul').first();
		var ul = parent.find('ul:visible').slideUp(animationSpeed);
		ul.removeClass('open');
		var parent_li = $this.parent("li");
		checkElement.slideDown(animationSpeed, function () {
			checkElement.addClass('open');
			parent.find('li.show').removeClass('show');
			parent_li.addClass('show');
		});
	}
	if (checkElement.is(slideMenuSelector)) {
		e.preventDefault();
	}
});

// Activate sidebar sub-with-sub toggle
$(".main-menu .sub-with-sub").on('click', function (e) {
	var $this = $(this);
	var checkElement = $this.next();
	var animationSpeed = 300,
		slideMenuSelector = '.sub-nav-sub';
	if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
		checkElement.slideUp(animationSpeed, function () {
			checkElement.removeClass('open');
		});
		checkElement.parent("li").removeClass("show");
	}
	else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
		var parent = $this.parents('ul').first();
		var ul = parent.find('ul:visible').slideUp(animationSpeed);
		ul.removeClass('open');
		var parent_li = $this.parent("li");
		checkElement.slideDown(animationSpeed, function () {
			checkElement.addClass('open');
			parent.find('li.show').removeClass('show');
			parent_li.addClass('show');
		});
	}
	if (checkElement.is(slideMenuSelector)) {
		e.preventDefault();
	}
});


}
//________________Horizontal js
jQuery(function () {
'use strict';
document.addEventListener("touchstart", function () { }, false);
jQuery(function () {
	jQuery('body').wrapInner('<div class="horizontalMenucontainer" />');
});
}());


// ______________HOVER JS start
function hovermenu() {
$(".side-menu").hover(function () {
	if ($('body').hasClass('main-sidebar-hide')) {
		$('body').addClass('main-sidebar-open');
	}
}, function () {
	if ($('body').hasClass('main-sidebar-hide')) {
		$('body').removeClass('main-sidebar-open');
	}
});
}
// ______________HOVER JS End

// ______________ICON-TEXT JS start
function icontext() {
$(".side-menu").off("mouseenter mouseleave");

$(document).on('click', ".side-menu", function (event) {
	if ($('body').hasClass('main-sidebar-hide') == true) {
		$('body').addClass('main-sidebar-open');
	}
});

$(document).on('click', ".main-content", function (event) {
	$('body').removeClass('main-sidebar-open');
});

//Mobile menu 
var alterClass = function () {
	var ww = document.body.clientWidth;
	if (ww < 992) {
		$('body').removeClass('main-sidebar-hide');
	} else if (ww >= 991) {
		$('body').addClass('main-sidebar-hide');
	};
};
$(window).resize(function () {
	alterClass();
});
//Fire it when the page first loads:
alterClass();

}
// ______________ICON-TEXT JS End



function responsive() {
    if (window.innerWidth >= 992) {
        if (document.querySelector("body").classList.contains("main-sidebar-hide") && document.querySelector("body").classList.contains("horizontal")) {
            document.querySelector("body").classList.remove("main-sidebar-hide")
        }
    }
}



// ______________ Horizontal Hover Menu for mobile view  Start

function HorizontalHovermenu() {
let value = document.querySelector('body').classList.contains('horizontalmenu-hover')
if (value && window.innerWidth >= 992) {
	$(".main-menu .with-sub").off('click');
	$(".main-menu .sub-with-sub").off('click')
}
else {
	$(".main-menu .with-sub").off('click');
	$(".main-menu .sub-with-sub").off('click')
	menuClick();
}
}
HorizontalHovermenu();

// window.addEventListener('resize',function(){
// 	HorizontalHovermenu();
// }, true);

// ______________Horizontal Hover Menu End

// ______________Active Class
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
		return false;
	}
}
});
if ($('.nav-sub-link ').hasClass('active')) {
$('.main-menu').animate({
	scrollTop: $('a.nav-sub-link.active').offset().top - 600
}, 600);
}
if ($('.nav-sub-link').hasClass('active')) {
$('.main-menu').animate({
	scrollTop: $('a.nav-sub-link.active').offset().top - 600
}, 600);
}

let slideLeft = document.querySelector(".slide-left");
let slideRight = document.querySelector(".slide-right");
slideLeft.addEventListener("click", () => {
slideClick()
}, true)
slideRight.addEventListener("click", () => { slideClick() }, true)

function slideClick() {
let slide = document.querySelectorAll(".slide");
let slideMenu = document.querySelectorAll(".slide-menu");
slide.forEach((element, index) => {
	if (element.classList.contains("is-expanded") == true) {
		element.classList.remove("is-expanded")
	}
});
slideMenu.forEach((element, index) => {
	if (element.classList.contains("open") == true) {
		element.classList.remove("open");
		element.style.display = "none";
	}
});
}

// horizontal arrows
var sideMenu = $(".menu-nav.nav");
var slide = "100px";

let menuWidth = document.querySelector('.main-container-1')
let menuItems = document.querySelector('.menu-nav')
let prevWidth = [window.innerWidth]

$(window).resize(() => {
	let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]);
	let check = menuItems.getBoundingClientRect().width + (0 - menuWidth?.offsetWidth);
	let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]);

	// to check and adjst the menu on screen size change
	if (marginLeftValue > -check == false && menuWidth?.offsetWidth < menuItems.scrollWidth) {
		sideMenu.stop(false, true).animate({
			marginLeft: -check
		}, {
			duration: 400
		})
	}
	else {
		sideMenu.stop(false, true).animate({
			marginLeft: 0
		}, {
			duration: 400
		})
	}
	// 
	if (marginRightValue < check == false && menuWidth?.offsetWidth < menuItems.scrollWidth) {
		sideMenu.stop(false, true).animate({
			marginRight: -check
		}, {
			duration: 400
		})
	}
	else {
		sideMenu.stop(false, true).animate({
			marginRight: 0
		}, {
			duration: 400
		})
	}
	// 
	if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
		$("#slide-left").addClass("d-none");
		$("#slide-right").addClass("d-none");
	}
	else if (marginLeftValue == 0) {
		$("#slide-left").addClass("d-none");
		$("#slide-right").removeClass("d-none");
	}
	else if (marginLeftValue >= -check) {
		$("#slide-right").addClass("d-none");
		$("#slide-left").removeClass("d-none");
	}
	checkHoriMenu();
	responsive();

	prevWidth.push(window.innerWidth)
	if (prevWidth.length > 2) {
		prevWidth.shift()
	}
	let prevValue = prevWidth[prevWidth.length - 2];
	if (window.innerWidth >= 992 && prevValue < 992) {
		if (document.querySelector('body').classList.contains('horizontalmenu')) {
			var animationSpeed = 300;
			// first level
			var parent = $(".main-menu .with-sub").parents('ul');
			var ul = parent.find('ul:visible').slideUp(animationSpeed);
			ul.removeClass('open');
			var parent1 = $(".main-menu .sub-with-sub").parents('ul');
			var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
			ul1.removeClass('open');
		}
	}
	else {
		ActiveSubmenu()
	}

}
)

function ActiveSubmenu() {
var position = window.location.pathname.split('/');
$(".main-menu li a").each(function () {
	var $this = $(this);
	var pageUrl = $this.attr("href");
	let prevValue = prevWidth[prevWidth.length - 2];
	if (window.innerWidth < 992 && prevValue > 991) {
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
	}
});
}


function checkHoriMenu() {
$("#slide-left").addClass("d-none");
	let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]);
	let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]);
	let check = menuItems.getBoundingClientRect().width + (0 - menuWidth?.offsetWidth);
	let body = document.querySelector('body').classList.contains('ltr')

	if (menuWidth?.offsetWidth > menuItems.scrollWidth) {
		$("#slide-left").addClass("d-none");
		$("#slide-right").addClass("d-none");
	}
	else if (marginLeftValue >= 0 && body == true) {
		$(".ltr #slide-left").addClass("d-none");
	}
	else if (marginLeftValue <= -check && body == true) {
		$(".ltr #slide-right").addClass("d-none");
	}
	else if (marginRightValue >= 0 && body == false) {
		$(".rtl #slide-left").addClass("d-none");
	}
	else if (marginRightValue <= -check && body == false) {
		$(".rtl #slide-right").addClass("d-none");
	}
	else {
		$(".ltr #slide-left").removeClass("d-none");
		$(".ltr #slide-right").removeClass("d-none");
	}
}
checkHoriMenu();
$(document).on("click", ".ltr #slide-left", function () {
let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]);

if (marginLeftValue < 0) {
	sideMenu.stop(false, true).animate({
		// marginRight : 0,
		marginLeft: "+=" + slide
	}, {
		duration: 400
	})
	$("#slide-right").removeClass("d-none");
}
if (marginLeftValue >= 0) {
	$("#slide-left").addClass("d-none");
	sideMenu.stop(false, true).animate({
		// marginRight : 0,
		marginLeft: 0
	}, {
		duration: 400
	})
}
// to remove dropdown when clicking arrows in horizontal menu
let subNavSub = document.querySelectorAll('.sub-nav-sub');
subNavSub.forEach((e) => {
	e.style.display = '';
})
let subNav = document.querySelectorAll('.nav-sub')
subNav.forEach((e) => {
	e.style.display = '';
})
//
});
$(document).on("click", ".ltr #slide-right", function () {
	let marginLeftValue = Math.ceil(window.getComputedStyle(menuItems).marginLeft.split('px')[0]);
	let check = menuItems.getBoundingClientRect().width + (0 - menuWidth?.offsetWidth);
	if (marginLeftValue > -check) {
		sideMenu.stop(false, true).animate({
			// marginLeft : 0,
			marginLeft: "-=" + slide
		}, {
			duration: 400
		})
	}
	else {
		$("#slide-right").addClass("d-none");
	}

	if (marginLeftValue != 0) {
		$("#slide-left").removeClass("d-none");
	}
	// to remove dropdown when clicking arrows in horizontal menu
	let subNavSub = document.querySelectorAll('.sub-nav-sub');
	subNavSub.forEach((e) => {
		e.style.display = '';
	})
	let subNav = document.querySelectorAll('.nav-sub')
	subNav.forEach((e) => {
		e.style.display = '';
	})
	//
});

$(document).on("click", ".rtl #slide-left", function () {
let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]);
let check = menuItems.getBoundingClientRect().width + (0 - menuWidth?.offsetWidth);


if (marginRightValue < 0) {
	sideMenu.stop(false, true).animate({
		// marginRight : 0,
		marginLeft: 0,
		marginRight: "+=" + slide
	}, {
		duration: 400
	})
	$("#slide-right").removeClass("d-none");
}
else {
	$("#slide-left").addClass("d-none");
}

if (marginRightValue >= 0) {
	$("#slide-left").addClass("d-none");
	sideMenu.stop(false, true).animate({
		// marginRight : 0,
		marginLeft: 0
	}, {
		duration: 400
	})
}
// to remove dropdown when clicking arrows in horizontal menu
let subNavSub = document.querySelectorAll('.sub-nav-sub');
subNavSub.forEach((e) => {
	e.style.display = '';
})
let subNav = document.querySelectorAll('.nav-sub')
subNav.forEach((e) => {
	e.style.display = '';
})
//
});
$(document).on("click", ".rtl #slide-right", function () {
let marginRightValue = Math.ceil(window.getComputedStyle(menuItems).marginRight.split('px')[0]);
let check = menuItems.getBoundingClientRect().width + (0 - menuWidth?.offsetWidth);
if (marginRightValue > -check) {
	sideMenu.stop(false, true).animate({
		// marginLeft : 0,
		marginLeft: 0,
		marginRight: "-=" + slide
	}, {
		duration: 400
	})

}
else {

	$("#slide-right").addClass("d-none");
}

if (marginRightValue != 0) {
	$("#slide-left").removeClass("d-none");
}
// to remove dropdown when clicking arrows in horizontal menu
let subNavSub = document.querySelectorAll('.sub-nav-sub');
subNavSub.forEach((e) => {
	e.style.display = '';
})
let subNav = document.querySelectorAll('.nav-sub')
subNav.forEach((e) => {
	e.style.display = '';
})
//
});

document.querySelector('.main-content').addEventListener('click', ()=>{
if (document.querySelector('body').classList.contains('horizontalmenu')) {
	var animationSpeed = 300;
	// first level
	var parent = $(".main-menu .with-sub").parents('ul');
	var ul = parent.find('ul:visible').slideUp(animationSpeed);
	ul.removeClass('open');
	var parent1 = $(".main-menu .sub-with-sub").parents('ul');
	var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
	ul1.removeClass('open');
}
}, true)