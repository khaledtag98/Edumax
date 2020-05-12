jQuery(document).ready(function ($) {
	function morphDropdown(element) {
		this.element = element;
		this.mainNavigation = this.element.find(".main-nav");
		this.mainNavigationItems = this.mainNavigation.find(".has-dropdown");
		this.dropdownList = this.element.find(".dropdown-list");
		this.dropdownWrappers = this.dropdownList.find(".dropdown");
		this.dropdownItems = this.dropdownList.find(".content");
		this.dropdownBg = this.dropdownList.find(".bg-layer");
		this.mq = this.checkMq();
		this.bindEvents();
	}

	morphDropdown.prototype.checkMq = function () {
		//check screen size
		var self = this;
		return window
			.getComputedStyle(self.element.get(0), "::before")
			.getPropertyValue("content")
			.replace(/'/g, "")
			.replace(/"/g, "")
			.split(", ");
	};

	morphDropdown.prototype.bindEvents = function () {
		var self = this;
		//hover over an item in the main navigation
		this.mainNavigationItems
			.mouseenter(function (event) {
				//hover over one of the nav items -> show dropdown
				self.showDropdown($(this));
			})
			.mouseleave(function () {
				setTimeout(function () {
					//if not hovering over a nav item or a dropdown -> hide dropdown
					if (
						self.mainNavigation.find(".has-dropdown:hover").length == 0 &&
						self.element.find(".dropdown-list:hover").length == 0
					)
						self.hideDropdown();
				}, 50);
			});

		//hover over the dropdown
		this.dropdownList.mouseleave(function () {
			setTimeout(function () {
				//if not hovering over a dropdown or a nav item -> hide dropdown
				self.mainNavigation.find(".has-dropdown:hover").length == 0 &&
					self.element.find(".dropdown-list:hover").length == 0 &&
					self.hideDropdown();
			}, 50);
		});

		//click on an item in the main navigation -> open a dropdown on a touch device
		this.mainNavigationItems.on("touchstart", function (event) {
			var selectedDropdown = self.dropdownList.find(
				"#" + $(this).data("content")
			);
			if (
				!self.element.hasClass("is-dropdown-visible") ||
				!selectedDropdown.hasClass("active")
			) {
				event.preventDefault();
				self.showDropdown($(this));
			}
		});

		//on small screens, open navigation clicking on the menu icon
		this.element.on("click", ".nav-trigger", function (event) {
			event.preventDefault();
			self.element.toggleClass("nav-open");
		});
	};

	morphDropdown.prototype.showDropdown = function (item) {
		this.mq = this.checkMq();
		if (this.mq == "desktop") {
			var self = this;
			var selectedDropdown = this.dropdownList.find("#" + item.data("content")),
				selectedDropdownHeight = selectedDropdown.innerHeight(),
				selectedDropdownWidth = selectedDropdown
				.children(".content")
				.innerWidth(),
				selectedDropdownLeft =
				item.offset().left +
				item.innerWidth() / 2 -
				selectedDropdownWidth / 2;

			//update dropdown position and size
			this.updateDropdown(
				selectedDropdown,
				parseInt(selectedDropdownHeight),
				selectedDropdownWidth,
				parseInt(selectedDropdownLeft)
			);
			//add active class to the proper dropdown item
			this.element.find(".active").removeClass("active");
			selectedDropdown
				.addClass("active")
				.removeClass("move-left move-right")
				.prevAll()
				.addClass("move-left")
				.end()
				.nextAll()
				.addClass("move-right");
			item.addClass("active");
			//show the dropdown wrapper if not visible yet
			if (!this.element.hasClass("is-dropdown-visible")) {
				setTimeout(function () {
					self.element.addClass("is-dropdown-visible");
				}, 10);
			}
		}
	};

	morphDropdown.prototype.updateDropdown = function (
		dropdownItem,
		height,
		width,
		left
	) {
		this.dropdownList.css({
			"-moz-transform": "translateX(" + left + "px)",
			"-webkit-transform": "translateX(" + left + "px)",
			"-ms-transform": "translateX(" + left + "px)",
			"-o-transform": "translateX(" + left + "px)",
			transform: "translateX(" + left + "px)",
			width: width + "px",
			height: height + "px"
		});

		this.dropdownBg.css({
			"-moz-transform": "scaleX(" + width + ") scaleY(" + height + ")",
			"-webkit-transform": "scaleX(" + width + ") scaleY(" + height + ")",
			"-ms-transform": "scaleX(" + width + ") scaleY(" + height + ")",
			"-o-transform": "scaleX(" + width + ") scaleY(" + height + ")",
			transform: "scaleX(" + width + ") scaleY(" + height + ")"
		});
	};

	morphDropdown.prototype.hideDropdown = function () {
		this.mq = this.checkMq();
		if (this.mq == "desktop") {
			this.element
				.removeClass("is-dropdown-visible")
				.find(".active")
				.removeClass("active")
				.end()
				.find(".move-left")
				.removeClass("move-left")
				.end()
				.find(".move-right")
				.removeClass("move-right");
		}
	};

	morphDropdown.prototype.resetDropdown = function () {
		this.mq = this.checkMq();
		if (this.mq == "mobile") {
			this.dropdownList.removeAttr("style");
		}
	};

	var morphDropdowns = [];
	if ($(".cd-morph-dropdown").length > 0) {
		$(".cd-morph-dropdown").each(function () {
			//create a morphDropdown object for each .cd-morph-dropdown
			morphDropdowns.push(new morphDropdown($(this)));
		});

		var resizing = false;

		//on resize, reset dropdown style property
		updateDropdownPosition();
		$(window).on("resize", function () {
			if (!resizing) {
				resizing = true;
				!window.requestAnimationFrame ?
					setTimeout(updateDropdownPosition, 300) :
					window.requestAnimationFrame(updateDropdownPosition);
			}
		});

		function updateDropdownPosition() {
			morphDropdowns.forEach(function (element) {
				element.resetDropdown();
			});

			resizing = false;
		}
	}
});

$(document).ready(function () {
	$(".categories-carousel .owl-carousel").owlCarousel({
		navigation: false,
		loop: true,
		margin: 10,
		stagePadding: 75,
		nav: true,
		autoplay: true,
		responsiveRefreshRate: 50,
		autoplayTimeout: 4000,
		autoplaySpeed: 2000,
		autoplayHoverPause: true,
		responsive: {
			185: {
				items: 1
			},

			600: {
				items: 2
			},
			730: {
				items: 3,
				stagePadding: 35,
			},

			1100: {
				items: 5,
				stagePadding: 35,

			}
		}
	});

	$(".course-card .owl-carousel").owlCarousel({
		navigation: false,
		loop: true,
		margin: 10,
		stagePadding: 75,
		nav: true,
		autoplay: true,
		responsiveRefreshRate: 50,
		autoplayTimeout: 4000,
		autoplaySpeed: 2000,
		autoplayHoverPause: true,
		responsive: {
			185: {
				items: 1,
				stagePadding: 35,
			},

			600: {
				items: 2,
				stagePadding: 35,
			},

			1100: {
				items: 3
			}
		}
	});
});


let card = $(".course-card");
let modalClose = $(".modal-close");
let globalOverlay = $(".overlay");
let closeBtn = $(".close");
let $cardsContainer = $(".courses");
let containerHeight;
let scrollPosition;
let cardIsClickable = true;
let modalCloseIsClickable = true;
let cardMode = true;
let position;
let initHeight;
let initWidth;

card.click(open);

globalOverlay.click(close);
closeBtn.click(closeBtnFN);

function open() {
	if (cardMode) {
		$("html").css("scroll-behavior", "auto");
		$("body").addClass("noscroll");
		scrollPosition = $("html").scrollTop();
		containerHeight = $cardsContainer.height();
		$cardsContainer.css("height", containerHeight);
		cardMode = false;
		position = $(this)[0].getBoundingClientRect();
		initHeight = $(this).height();
		initWidth = $(this).width();
		$(this).addClass("fixed");
		$(this).css("top", position.top);
		$(this).css("left", position.left);
		$(this).css("width", initWidth);
		$(this).css("height", initHeight);
		$(this)
			.find(".card-body-inner")
			.fadeOut(250);
		globalOverlay.addClass("active-overlay");
		globalOverlay.animate({
				opacity: 0.7
			},
			200
		);
		$(this).animate({
				width: "96%",
				height: "96%",
				top: "2%",
				left: "2%"
			},
			300,
			function () {
				$(this)
					.find(".card-body-inner-alt")
					.fadeIn(250);
				$(this)
					.siblings(".card")
					.css("opacity", "0");
				$(this).removeClass("noJquery");
			}
		);
	}
}

function close() {
	if (!cardMode) {
		$("body").removeClass("noscroll");
		cardMode = true;
		let $myCard = $(this).siblings(".card");
		$myCard.find(".card-body-inner-alt").fadeOut(250);
		$(this).animate({
				opacity: 0
			},
			300
		);
		$(this).removeClass("active-overlay");
		$myCard.animate({
				width: initWidth,
				height: initHeight,
				top: position.top,
				left: position.left
			},
			300,
			function () {
				cardMode = true;
				$myCard.find(".card-body-inner").fadeIn(250);
				$myCard.removeClass("fixed");
				$myCard.attr("style", "");
				$("html").scrollTop(scrollPosition);
				$myCard.siblings().attr("style", "");
				$myCard.addClass("noJquery");
				$("html").attr("style", "");
				$cardsContainer.attr("style", "");
			}
		);
	}
}

function closeBtnFN() {
	if (!cardMode) {
		$("body").removeClass("noscroll");
		let $myCard = $(this).closest(".card");
		console.log($myCard.siblings());
		$myCard.find(".card-body-inner-alt").fadeOut(250);
		globalOverlay.animate({
				opacity: 0
			},
			300
		);

		globalOverlay.removeClass("active-overlay");
		$myCard.animate({
				width: initWidth,
				height: initHeight,
				top: position.top,
				left: position.left
			},
			300,
			function () {
				cardMode = true;
				$myCard.find(".card-body-inner").fadeIn(250);
				$myCard.removeClass("fixed");
				$myCard.attr("style", "");
				$("html").scrollTop(scrollPosition);
				$myCard.siblings().attr("style", "");
				$myCard.addClass("noJquery");
				$("html").attr("style", "");
				$cardsContainer.attr("style", "");
			}
		);
	}
}