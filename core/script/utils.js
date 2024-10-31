/*
Ontos Feeder, provides data semantically relevant to the text being edited.
Copyright 2010 Ontos AG

This file is part of Ontos Feeder.

Ontos Feeder is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Ontos Feeder is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with Ontos Feeder.  If not, see <http://www.gnu.org/licenses/>.
*/
 
Array.prototype.contains = function(element) {
	for ( var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};

// UTILS Namespace
var UTILS = {
	interval : [],

	Types : {
		isPerson : function(entityType) {
			return (ONTOSMINER_ONTOLOGY_PERSON == entityType);
		},

		isOrganisation : function(entityType) {
			return ((ONTOSMINER_ONTOLOGY_GENERAL_ORGANISATION == entityType) || (ONTOSMINER_ONTOLOGY_MASS_MEDIA == entityType) || (ONTOSMINER_ONTOLOGY_PARTY == entityType) || (ONTOSMINER_ONTOLOGY_COMMERCIAL_ORGANISATION == entityType)
					|| (ONTOSMINER_ONTOLOGY_STATE_ORGANISATION == entityType) || (ONTOSMINER_ONTOLOGY_MILITARY_ORGANISATION == entityType) || ONTOSMINER_ONTOLOGY_EDUCATIONAL_ORGANISATION == entityType);
		},
		isLocation : function(entityType) {
			return (ONTOSMINER_ONTOLOGY_LOCATION == entityType); 
		},
		isProduct : function(entityType) {
			return (ONTOSMINER_ONTOLOGY_PRODUCT == entityType); 
		}
	}

};

UTILS.Strings = function() {
	this.cleanName = function(personName) {
		var result = "";
		result = personName.replace(/'/g, "");
		result = result.replace(/\s/g, "").replace(/!/g, "_").replace(/\./g, "_");
		return result;
	};
	this.cleanSparQlName = function(personName) {
		var result = personName.replace(/'/g, "\'");
		return result;
	};
	this.cleanFreebaseName = function(personName) {
		var result = personName.replace(/\s/g, "_").toLowerCase();
		return result;
	};
	this.cleanFreebaseSearchName = function(personName) {
		var result = personName.replace(/\s/g, "+").toLowerCase();
		return result;
	};
	this.cleanFreebaseResult = function(personName) {
		var result = personName.replace(/\$002F/g, "/").toLowerCase();
		return result;
	};
	this.cleanPopupName = function(personName) {
		var result = personName.split("'").join("\\'");
		return result;
	};
	this.getEID = function(entityName, entityID) {
		return this.cleanName(entityName) + entityID;
	};
	this.getDomain = function(url) {
		var parts = url.split("/");
		var domainName = parts[2];
		return domainName;
	};

	this.removeCRLF = function(text) {
		var result = text.replace(/\n/g, "");
		result = result.replace(/\r/g, "");
		return result;
	};

};

String.prototype.startsWith = function(str) {
	return (this.match("^" + str) == str);
};

function hidePanel() {
	divmask.hide();
	$("#effectdiv")[0].innerHTML = "";
};

UTILS.Images = function() {

	this.load = function(_targetDiv, _imgSrc, _imgStyle) {
		var img = new Image();
		var tDiv = _targetDiv;
		$(img).load(function() {
			// $(this).css('display', 'none'); // .hide() doesn't work in Safari
				// when the element isn't on the DOM already
				$(this).hide();
				$('#' + _targetDiv).append(this);
				
				$(_targetDiv).append(this);
				$(this).fadeIn(3000);
			}).error(function() {
			// notify the user that the image could not be loaded
				LOGGER.debug("error lodading thumbnail from " + _imgSrc);
			}).attr('src', _imgSrc).attr("style", _imgStyle);
		return;
	};

	function checkIfLoadedJQuery(targetImgId, img) {
		if (img.complete) {
			var target = $('#' + targetImgId);
			
			target[0].src = img.src;

			target[0].style.visibility = "visible";
			window.clearInterval(UTILS.interval[targetImgId]);
		}
		return null;

	}
	;

	fadeIn = function(targetImg) {
		element = targetImg;

		LOGGER.debug("fadeIn targetImg.filters: " + targetImg.filters);
		for (opacity = 0; opacity <= 100; opacity++) {
			window.setTimeout(gradualfade, 10 * opacity, targetImg, opacity);
		}

	};

	showImage = function(targetImg, img) {
		// fade in the image
		fadeIn(targetImg);

		// replace the original invisible image;
		targetImg.src = img.src;
		targetImg.style.visibility = "visible";

	};

	function checkIfLoaded(_targetImgId, targetImg, img) {
		if (img.complete) {
			window.clearInterval(UTILS.interval[_targetImgId]);
			showImage(targetImg, img);
		}
		return null;
	}

	function gradualfade(cur2, _opacity) {
		LOGGER.debug("gradualfade cur2: " + cur2);
		LOGGER.debug("gradualfade cur2.filters: " + cur2.filters);
		if (browserdetect == "mozilla" && cur2.style.MozOpacity < 1)
			cur2.style.MozOpacity = Math.min(parseFloat(_opacity / 100, 0.99));
		else if (browserdetect == "ie") {
			if (cur2.filters && cur2.filters.alpha.opacity < 100)
				cur2.filters.alpha.opacity = _opacity;
		} else if (window.highlighting)
			clearInterval(highlighting);
	}

	// needs jquery
	this.moveToPrevious = function() {
		if (window.navigationWidget.currentRow < window.navigationWidget.maxRows) {
			window.navigationWidget.currentRow++;
			$('#' + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV).animate( {
				top : -180 * window.navigationWidget.currentRow

			}, 50);
		}
		window.navigationWidget.switchButtons();
	};
	// needs jquery
	this.moveToNext = function() {
		if (window.navigationWidget.currentRow > 0) {
			window.navigationWidget.currentRow--;
			$('#' + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV).animate( {
				top : -180 * window.navigationWidget.currentRow

			}, 50);

		}
		window.navigationWidget.switchButtons();
	};

	// moves thumbnails to the left on selecting to a relation
	this.wipeLeft = function() {
		$('#' + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV).animate( {
			left : -this.getNavigationWidgetWidth()

		}, 300);
	};

	this.wipeRight = function(callback) {
		jQuery('#' + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV).animate( {
			left : this.getNavigationWidgetWidth()

		}, 300).wait(0,callback);
	};
	
	this.normalPosition = function() {
		$('#' + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV).animate( {
			left : 0,
			top : 0
		}, 500);
	};
	
	this.getNavigationWidgetWidth = function(){
		var div = $("#"+ONTOS_NAVIGATION_WIDGET_DIV)[0];
		var width = div.clientWidth;
		return width;
	};
};

UTILS.Browser = function() {
	
	this.getScrollXY=function() {
		var scrOfX = 0, scrOfY = 0;

		if( typeof( window.pageYOffset ) == 'number' ) {
			//Netscape compliant
			scrOfY = window.pageYOffset;
			scrOfX = window.pageXOffset;
		} else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
			//DOM compliant
			scrOfY = document.body.scrollTop;
			scrOfX = document.body.scrollLeft;
		} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
			//IE6 standards compliant mode
			scrOfY = document.documentElement.scrollTop;
			scrOfX = document.documentElement.scrollLeft;
		}
		return { scrOfX:scrOfX, scrOfY:scrOfY };
	};
	
	this.getSize = function() {
		var myWidth = 0, myHeight = 0;

		if( typeof( window.innerWidth ) == 'number' ) {
			//Non-IE
			myWidth = window.innerWidth;
			myHeight = window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
			//IE 6+ in 'standards compliant mode'
			myWidth = document.documentElement.clientWidth;
			myHeight = document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
			//IE 4 compatible
			myWidth = document.body.clientWidth;
			myHeight = document.body.clientHeight;
		}
		return { width:myWidth, height:myHeight };
	};
	
};

function wheel(event) {

	var delta = 0;

	if (!event) {
		event = window.event;
	}

	if (event.wheelDelta) {
		delta = event.wheelDelta / 120;
		if (window.opera) {
			delta = -delta;
		}
	}

	else if (event.detail) {
		delta = -event.detail / 3;
	}

	if (delta) {
		if (delta < 0) {
			// window.scrollBy(0, sdr);
			(new UTILS.Images()).moveToPrevious();
		} else {
			// window.scrollBy(0, -sdr);
			(new UTILS.Images()).moveToNext();
		}
	}

	event.returnValue = false;

}

function close_fs(id) {
	document.getElementById(id).getElementsByTagName("div")[0].style.visibility = "hidden";
	document.getElementById(id).getElementsByTagName("div")[0].style.height = 0;
	document.getElementById(id).getElementsByTagName("div")[0].style.display = "none";
}

function open_arrow(path, imgId, divId) {
	document.getElementById(imgId).src = path + "/img/group-open.gif";
	document.getElementById(imgId).style.width = "16px";
	document.getElementById(imgId).style.height = "16px";
	document.getElementById(imgId).attributes["onclick"].value = "close_arrow('" + path + "','" + imgId + "','" + divId + "')";
	window.setTimeout("open_fs('" + divId + "')", 400);
}

function close_arrow(path, imgId, divId) {
	document.getElementById(imgId).src = path + "/img/group-close.gif";
	document.getElementById(imgId).style.width = "16px";
	document.getElementById(imgId).style.height = "16px";
	document.getElementById(imgId).attributes["onclick"].value = "open_arrow('" + path + "','" + imgId + "','" + divId + "')";
	window.setTimeout("close_fs('" + divId + "')", 400);
}

function open_fs(id) {
	document.getElementById(id).getElementsByTagName("div")[0].style.textAlign = "left";
	document.getElementById(id).getElementsByTagName("div")[0].style.visibility = "visible";
	document.getElementById(id).getElementsByTagName("div")[0].style.height = "auto";
	document.getElementById(id).getElementsByTagName("div")[0].style.display = "block";
}
