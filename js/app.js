$(document).foundation();

$(document).ready(function() {
        appScroll();
		appPanel();

    });

	function appScroll(){
		var amountScrolled = 200;
		$(window).scroll(function() {
			if ( $(window).scrollTop() > amountScrolled ) {
				$('a.back-to-top').fadeIn('slow');
			} else {
				$('a.back-to-top').fadeOut('slow');
			}
	
		});
		
		$('a.back-to-top').on('click',function(event) {
			//event.preventDefault();
			$('html, body').animate({
				scrollTop: 0
			}, 700);
		});
	};
	
	function appPanel() {
		$('#accordion1').on('shown.bs.collapse', function (e) {
			var offset = $(this).find('.collapse.in').prev('.panel-heading');
			if(offset) {
				$('html,body').animate({
					//Scrolltop if status bar overlay is false
					//scrollTop: $(offset).offset().top -55 //without padding for status bar (android)
					scrollTop: $(offset).offset().top -75 //with status bar (iOS)
				}, 500); 
			}
		}); 
	};

    $(document).ready(function () {
        // Init here.
		"use strict";
        var $body = $('body'),
            $main = $('#main'),
            $site = $('html, body'),
            transition = 'moveright',
            smoothState;

        smoothState = $main.smoothState({
            onBefore: function($anchor, $container) {
                var current = $('[data-viewport]').first().data('viewport'),
                    target = $anchor.data('target');
                current = current ? current : 0;
                target = target ? target : 0;
                if (current === target) {
                    transition = 'moveright';
                } else if (current < target) {
                    transition = 'moveright';
                } else {
                    transition = 'moveleft';
                }
            },
            onStart: {
                duration: 350,
                render: function (url, $container) {
                    $main.attr('data-transition', transition);
                    $main.addClass('is-exiting');
					$site.animate({scrollTop: 0});
                }
            },
            onReady: {
                duration: 0,
                render: function ($container, $newContent) {
                    $container.html($newContent);
                    $container.removeClass('is-exiting');
					appScroll();
					appPanel();
					$('.carousel').carousel({
			             interval: 3000
         			});				
                }
            },
        }).data('smoothState');

    });


$(document).on("tap",(function (event) {
	var clickover = $(event.target);
	var $navbar = $(".navbar-collapse");               
	var _opened = $navbar.hasClass("in");
	if (_opened === true && !clickover.hasClass("navbar-toggle")) {      
		$navbar.collapse('hide');
	}
}));


function initMap() {
	var usCenter = {lat: 38.4398213, lng: -95.5285075};
	var nyOffice = {lat: 40.7502408, lng: -73.9864771};
	var laOffice = {lat: 34.0496083, lng: -118.2563485};
	var rocOffice = {lat: 43.1554916, lng: -77.6143011};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 3,
		center: usCenter,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		minZoom: 3
	});
	
	var nyContentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="contact-us"><b>New York Office</b></h1>'+
      '<div id="bodyContent" class="contact-us">'+
      '<p>7 W 36th St, 12th Fl <br> New York, NY 10018</p>'+
      '<p><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> <a href="tel:12122133222">212.213.3222</a></p>'+
      '</div>'+
      '</div>';
	
	var nyInfoWindow = new google.maps.InfoWindow({
    	content: nyContentString
	});
	
	var laContentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="contact-us"><b>Los Angeles Office</b></h1>'+
      '<div id="bodyContent" class="contact-us">'+
      '<p>520 S Grand Ave, Ste 360 <br> Los Angeles, CA 90071</p>'+
      '<p><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> <a href="tel:12134024890">213.402.4890</a></p>'+
      '</div>'+
      '</div>';
	
	var laInfoWindow = new google.maps.InfoWindow({
    	content: laContentString
	});
	
	var rocContentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="contact-us"><b>Rochester Office</b></h1>'+
      '<div id="bodyContent" class="contact-us">'+
      '<p>8 Exchange Blvd, Ste 170 <br> Rochester, NY 14614</p>'+
      '<p><span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> <a href="tel:15858029837">585.802.9837</a></p>'+
      '</div>'+
      '</div>';
	
	var rocInfoWindow = new google.maps.InfoWindow({
    	content: rocContentString
	});
	
	var nyMarker = new google.maps.Marker({
		position: nyOffice,
		map: map,
		label: "A",
		animation: google.maps.Animation.DROP
	});

	var laMarker = new google.maps.Marker({
		position: laOffice,
		map: map,
		label: "C",
		animation: google.maps.Animation.DROP
	});

	var rocMarker = new google.maps.Marker({
		position: rocOffice,
		map: map,
		label: "B",
		animation: google.maps.Animation.DROP
	});
	
	nyMarker.addListener('click', function() {
		nyInfoWindow.open(map, nyMarker);
		laInfoWindow.close();
		rocInfoWindow.close();
	});
	
	laMarker.addListener('click', function() {
		laInfoWindow.open(map, laMarker);
		rocInfoWindow.close();
		nyInfoWindow.close();
	});
	
	rocMarker.addListener('click', function() {
		rocInfoWindow.open(map, rocMarker);
		nyInfoWindow.close();
		laInfoWindow.close();
	});

	google.maps.event.addDomListener(window, 'resize', function() {
		google.maps.event.trigger(map, "resize");
		map.setCenter(usCenter);
	});
	
	nyInfoWindow.addListener('closeclick', function() {
		map.setCenter(usCenter);
	});
	
	laInfoWindow.addListener('closeclick', function() {
		map.setCenter(usCenter);
	});
	
	rocInfoWindow.addListener('closeclick', function() {
		map.setCenter(usCenter);
	});
	
}