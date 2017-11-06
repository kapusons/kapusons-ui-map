var isMobile = false;
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

var map, infowindow, aMarkers = [];

function centerMap(LatLngList, map) {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
		bounds.extend(LatLngList[i]);
	}
	map.setCenter(bounds.getCenter());
	map.setZoom((window.innerWidth > 600 ? 8 : 7));
  //map.fitBounds(bounds);
}

function placeMarkers(feat, map){
	var items   = feat.f.items; 
	if(!items) return false;
	var aLatLng = [];
	infowindow  = new google.maps.InfoWindow();

	for (var i = 0; i < items.length; i++) {
		var lat = items[i]['lat'];
		var lng = items[i]['lng'];
		if (!lat || !lng) continue;

		var ltlg = new google.maps.LatLng(lat, lng);
		aLatLng.push(ltlg);

		marker = new google.maps.Marker({
			"id": items[i]['id'],
      "name": items[i]['name'],
      "title": items[i]['title'],
      "address": items[i]['address'],
      "city": items[i]['city'],
      "website": items[i]['website'],
      "email": items[i]['email'],
      "phone": items[i]['phone'],
      "url": items[i]['url'],
			"position": ltlg,
			"map": map
		});

		aMarkers.push(marker);

		google.maps.event.addListener(marker, 'click', (function (m, infowindow) {
			var info = '<div class="infowindow">' +
			'<h3>' + m.name + '</h3>' +
			'<div class="info">' + 
			(m.title ? 
				' <div class="info-title"><span>' + m.title + '</span></div>'  
				: '') + 
			(m.city ? 
				' <div><span class="label">City:</span> <span>' + m.city + '</span></div>'  
				: '') +
			(m.address ? 
				' <div><span class="label">Address:</span> <span>' + m.address + '</span></div>' 
				: '') +
			(m.phone ? 
				' <div><span class="label">Phone:</span> <span>' + m.phone + '</span></div>' 
				: '') +
			(m.email ? 
				' <div><span class="label">Email:</span> <span><a href="mailto:' + m.email + '">' + m.email + '</a></span></div>' 
				: '') +
			(m.website ? 
				' <div><span class="label">Website:</span> <span><a href="' + m.website + '" target="_blank">' + m.website + '</a></span></div>' 
				: '') +
			(m.url ?
				' <a href="' + m.url + '" class="scheda-trigger">Details</a>'
				: '') +
			' </div>' + '<p style="font-size: 10px; margin-top: 10px; padding: 2px 5px; background: lightgrey;">Google Maps GeoJSON Implementation by Kapusons <img src="img/logo.png" style="height: 20px"></p>' +
			'</div>';

			$('.region-list-wrapper').append(info);

			return function () {
				infowindow.close();
				infowindow.setContent(info);
				setTimeout(function(){
					infowindow.open(map, m);
				}, 300);

				setTimeout(function(){
					map.setZoom(12);
					map.setCenter(m.getPosition());
				}, 500)
			}

		})(marker, infowindow));

	}

	document.getElementById('map-tail').style.display = "none";
	centerMap(aLatLng, map);

}

function centerTo(location){
	map.setOptions({
		center: location,
		zoom: configuration.mapOptions.zoom,
	});
}

function styleFeaturedMap(){
	map.data.setStyle(function(feature) {
		var fillColor = feature.getProperty('selected') ? configuration.styles.feature.fillColorSelected
			: configuration.styles.feature.fillColor ;
		return (
			$.extend( configuration.styles.feature, {fillColor: fillColor} )
		);
	});
}

function cleanMarkers() {
	for (var i = 0; i < aMarkers.length; i++ ) {
		aMarkers[i].setMap(null);
	}
	aMarkers.length = 0;
}

function turnOffMapLabels(){
	map.setOptions({
		"styles": [
		{
			featureType: "all",
			elementType: "labels",
			stylers: [
			{ visibility: "off" }
			]
		}
		]
	});
}

function turnOnMapLabels(){
	map.setOptions({
		"styles": [
		{
			stylers: [
			{ visibility: "on" }
			]
		}
		]
	});
}

function setMobileMapHeight(){

	if(!isMobile) return ;

	var h = 0;

  if($('.map-region-detail-body').length){ // open detail
  	h += $('.map-region-detail-body').outerHeight(true);
  	h += parseInt($('#map-region-detail > h3').css('height').replace(/px/ig, ''));
  	h += $('.navigation-wrapper').outerHeight(true);
  }else{
  	if($('.col-left').hasClass('open')){
  		$('.region-list-wrapper li, .region-list-wrapper > div').each(function(){
  			h += $(this).outerHeight(true);
  		});
  		h += $('.navigation-wrapper').outerHeight(true);
  	}else{
  		h = '100vh';
  	}
  }

  $('.map-wrapper').css({height: h});
  
  if($('html, body').scrollTop() > 0){
  	$('html, body').animate({
  		scrollTop: $('.map-wrapper').offset().top
  	}, 800);
  }
}

function initMap() {

	var italy =  {lat: 41.913355, lng: 12.484130};

	map = new google.maps.Map(document.getElementById('map-canvas'), configuration.mapOptions);

  // Load the GeoJSON manually (works cross-origin since google sets the required HTTP headers)
  $.getJSON(configuration.dataSource, function (data) {
  	map.data.addGeoJson(data, { idPropertyName: 'name' });
  }); 

  styleFeaturedMap();

  map.data.addListener('addfeature', function(e) {
  	var feature = e.feature ;
    var regName = feature.f.name; //f.BRK_NAME; //
    var regListItem = $('<li data-region="' + regName.toLowerCase() + '"></li>');
    var regTrigger = $('<a href="#" class="region-name">' + regName + '</a>');
    var regCloseTrigger = $('<a href="#" title="Torna alla mappa generale" class="close-region-detail"><img src="img/x.png"></a>');
    regListItem.append(regTrigger).append(regCloseTrigger);

    regTrigger.on({
    	mouseenter: function(){
    		google.maps.event.trigger(map.data, 'mouseover', {
    			feature: feature
    		});
    	},

    	mouseleave: function(){
    		google.maps.event.trigger(map.data, 'mouseout', {
    			feature: feature
    		});
    	},

    	click: function(ev){
    		ev.preventDefault();
    		ev.stopPropagation();
    		var $this = $(this);
    		if($this.closest('li').hasClass('active')) return false;

    		google.maps.event.trigger(map.data, 'click', {
    			feature: feature
    		});

    		setMobileMapHeight();

    		setTimeout(function(){
    			if(isMobile) return;

    			psb.update();
    			$('.region-list-wrapper').get(0).scrollTop = 0;
    		}, 500);
    	}
    })

    $('.region-list').append(regListItem);

    regCloseTrigger.on('click', function(ev){
    	ev.preventDefault();
    	cleanMarkers();
    	centerTo(configuration.mapOptions.center);
    	styleFeaturedMap();
    	turnOffMapLabels();
    	$('#map-region-detail').empty().hide();
    	$('.region-list-wrapper').removeClass('region-selected');
    	$('.region-list-wrapper').append($('.region-list'));
    	$('.region-list-wrapper .infowindow').remove();
    	$(this).closest('li').removeClass('active').siblings().fadeIn();

    	setMobileMapHeight();

    	setTimeout(function(){
    		if(isMobile) return;

    		psb.update();
    		$('.region-list-wrapper').get(0).scrollTop = 0;
    	}, 500);

    })
  });

  // Set mouseover event for each feature.
  map.data.addListener('mouseover', function(e) {
  	if(isMobile) return false;
  	document.getElementById('map-tail').textContent =  e.feature.getId();
  	document.getElementById('map-tail').style.display = "inline";
  	map.data.overrideStyle(e.feature, {fillColor: '#5992f1'});
  });

  // Set mouseout event for each feature.
  map.data.addListener('mouseout', function(e) {
  	if(isMobile) return false;
  	document.getElementById('map-tail').style.display = "none";
  	e.feature.setProperty('fillColor', '#008542');
  	map.data.revertStyle();
  });

  // trap swipe origin coordinates
  map.data.addListener('mousedown', function(e) {
  	map.clickX = e.xa.clientX;
  	map.clickY = e.xa.clientY;
  })

  map.data.addListener('click', function(e) {

    // do nothing if scrolling (on mobile)
    if(e.xa && (e.xa.clientY > (map.clickY + 30) || e.xa.clientY < (map.clickY - 30))){
    	return false;
    }

    // seleziono la regione cliccata sul menu di sx
    var activeRegion = $('.region-list > li[data-region="' + e.feature.f.name.toLowerCase() + '"]');
    $('.region-list-wrapper').addClass('region-selected');
    $('.navigation-header').after($('.region-list'));
    $('.region-list > li').removeClass('active');
    
    // mark active region and hide all the others
    activeRegion.addClass('active');
    activeRegion.siblings().hide();

    // Nascondo i poligoni/regione
    map.data.setStyle(function(feature) {
    	return ({
    		visible: false
    	});
    });

    turnOnMapLabels();
    placeMarkers(e.feature, map);

  });

  // Get mouse coordinates and create dynamc box.
  document.body.onmousemove = function(e) {
  	if($(e.target).closest('.region-list').length){
  		$("#map-tail").hide();
  		return;
  	};
  	document.getElementById("map-tail").style.left = (e.clientX + 25) + 'px';
  	document.getElementById("map-tail").style.top = (e.clientY - ( $('#map-canvas').offset().top - $(document).scrollTop())) + 'px';
  };

  // Show the map once loaded
  google.maps.event.addListenerOnce(map, 'idle', function(){
  	$('#map-canvas').animate({
  		opacity: 1
  	})
  });
}

$(function(){ 

	if(!isMobile){
		psb = new PerfectScrollbar('.region-list-wrapper', {
			wheelPropagation:true
		});
	}

	$('.map-wrapper').css({
		height: ($(window).height() >= 900 ? ($(window).height() - $('header').height()) : '100vh')
	})

	$(document).on('click', '.region-list-wrapper .infowindow h3', function(){
		var index = $('.region-list-wrapper .infowindow').index($(this).closest('.infowindow'));
		$('.col-left').removeClass('open');
		google.maps.event.trigger(aMarkers[index], 'click');
		setMobileMapHeight();
	})

	$(document).on('click', '.scheda-trigger', function(ev){
		ev.preventDefault();
		var url = $(this).attr('href');
		$.ajax({
			url : url,
			type : 'GET'
		}).done(function(data) {
				$('#map-region-detail').show().css({opacity: 0}).html(data);

				setMobileMapHeight();
				
				$('#map-region-detail').css({opacity: 1})

				if(isMobile) {
					if(!$('.col-left').hasClass('open')) $('.mobile-handler').trigger('click');
					return;
				}

				if($('.map-region-detail-body').height() > ($('#map-region-detail').height() - $('#map-region-detail > h3').height())){
					$('.map-region-detail-body').css({height: ($('#map-region-detail').height() - $('#map-region-detail > h3').height())})

					new PerfectScrollbar('.map-region-detail-body', {
						wheelPropagation: true
					});
				}
		});
	})

	$(document).on('click', '.close-csv-detail', function(ev){
		ev.preventDefault();
		$('#map-region-detail').fadeOut(function(){
			$(this).empty();
			setMobileMapHeight();
		});
	})

	$('.mobile-handler').on('click', function(ev){
		ev.preventDefault();
		$('.col-left').toggleClass('open');

		setMobileMapHeight();
	})

	$('.mobile-close').on('click', function(ev){
		ev.preventDefault();
		$('.close-csv-detail').trigger('click');
		$('.col-left').toggleClass('open');

		setMobileMapHeight();
	})

	$('.col-left .navigation-header').on('click', function(ev){
  	$('.region-list > li.active .close-region-detail').trigger('click');
  })

  initMap();

});