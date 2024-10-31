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
 
// NAVIGATION_Namespace
var NAVIGATION = {};

// these are set by the server
if (!tags)
	var tags = "";
if (!token)
	var token = "";
if (!ontosminer_waitSymbol_path)
	var ontosminer_waitSymbol_path = "";
if (!ontosminer_path)
	var ontosminer_path = "";
if (!ontosminer_full_path)
	var ontosminer_full_path = "";
if (!ota_highlighting_prefix)
	var ota_highlighting_prefix = "";
if (!ota_highlighting_suffix)
	var ota_highlighting_suffix = "";
if (!ota_entityTypes)
	var ota_entityTypes = ONTOSMINER_ONTOLOGY_PERSON;
if (!ontosminer_host)
	var ontosminer_host = "";


jQuery(document).ready(function($) {

	if (tags != "") {
		renderNavigationWidget();
	}
});

function renderNavigationWidget() {
	jQuery("#" + ONTOS_NAVIGATION_WIDGET_DIV).bind('mousewheel', function(event, delta) {
		wheel(event, delta);
		return false;
	});

	window.navigationWidget = new NAVIGATION.Widget(ontosminer_path, tags, ota_entityTypes, ontosminer_waitSymbol_path);
	if (DEBUG) {
		var ajaxAppender = new log4javascript.AjaxAppender(ontosminer_full_path + "/jslogger.php");
		ajaxAppender.setThreshold(LOGGER_LEVEL);
		LOGGER.addAppender(ajaxAppender);
		LOGGER.debug("------------TAGs Received, START WORKING ---------------------");
	}
}

NAVIGATION.Widget = function(ontosminer_path, _tags, _entityTypes, _waitSymbolPath) {
	// remember the "this" pointer for use inside callbacks
	var self = this;

	var proxyPath = ontosminer_full_path + "/proxy_curl.php";

	var tags = _tags;
	var entityTypes = _entityTypes;
	
	var waitSymbolPath = _waitSymbolPath;

	var thumbnailesRequested = 0;
	var stringUtils = new UTILS.Strings();
	var ontosUtils = new ONTOS.Utils();
	var sparqlizer = new SPARQL.Sparqlizer(proxyPath);

	var entities;
	var previousEntities;
	var currentPageIndex;

	var tasks = new Array();
	var helpTasks = new Array();

	// starting thumbnail row showed
	this.currentRow = 0;
	this.maxRows = 0;

	
	this.run = function() {
		self.currentPageIndex = 0;
		self.previousEntities = new Array();

		ontosUtils.getEntitiesAsArray(tags, entityTypes, self.sortAndRenderMinedEntities);
	};

	this.sortAndRenderMinedEntities = function(aentities) {
		var e="";
		for (var i=0;i<aentities.length;i++)
			e += ", " +aentities[i].name;

		LOGGER.debug("NAVIGATION Path: currentPageIndes="+self.currentPageIndex+", Entities: "+e);
		self.entities = ontosUtils.sortEntitiesByWeightDESC(aentities);
		
		jQuery("#ota_button_back").attr("disabled", true);
		jQuery("#ota_button_back  > img").attr("src", ota_full_path_img+"/btn_prev_disabled.png");

		self.renderImages(self.entities);
	};

	this.sortAndRenderRelatedEntities = function(entities) {
		var e="";
		for (var i=0;i<entities.length;i++)
			e += ", " +entities[i].name;

		LOGGER.debug("NAVIGATION Path: currentPageIndes="+self.currentPageIndex+", Entities: "+e);
		self.entities = ontosUtils.sortEntitiesByNameASC(entities);
		
		jQuery("#ota_button_back").attr("disabled", false);
		jQuery("#ota_button_back  > img").attr("src", ota_full_path_img+"/btn_prev.png");
		
		self.renderImages(entities);
	};

	this.renderPreviousEntities = function() {
	
		if (self.currentPageIndex > 1) {
			(new UTILS.Images()).wipeRight();
			self.currentPageIndex--;
			self.sortAndRenderRelatedEntities(self.previousEntities.pop());
			

		} else if (self.currentPageIndex == 1) {
			self.currentPageIndex--;
			(new UTILS.Images()).wipeRight(function() {
				self.sortAndRenderMinedEntities(self.previousEntities.pop());
			});
			
		}
	};
	
	this.renderTextImages = function() {
		self.renderImages(self.entities);
	};

	this.renderImages = function(entities) {

		$("#" + ONTOS_NAVIGATION_WIDGET_FS_LEGEND)[0].innerHTML = "Entities (" + entities.length + ")";
		self.currentRow = 0;
		
		// 3 rows visible
		var width = $("#" + ONTOS_NAVIGATION_WIDGET_DIV)[0].clientWidth;
		var height = $("#" + ONTOS_NAVIGATION_WIDGET_DIV)[0].clientHeight;
		var thumbnailsPerRow = Math.floor(width/85);
		var thumbnailsPerColumn = Math.floor(height/150);
		
		var rows = Math.round(entities.length / thumbnailsPerRow);
		self.maxRows = rows - thumbnailsPerColumn;

		var htmlOutput = "";
		thumbnailesRequested = 0;
		$("#" + ONTOS_NAVIGATION_WIDGET_DIV)[0].innerHTML += '<div id="effectdiv"></div>';
		// clear previous content
		$("#" + ONTOS_NAVIGATION_WIDGET_DIV)[0].innerHTML = "<div id='" + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV
				+ "' style='position: relative; padding:0px;width: 100%;margin:0px; paddiong:0px;  height: 2000px; float: left;border:solid 0px black;' ></div>";

		$("#" + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV)[0].innerHTML = "";
		
		
		self.switchButtons();
		
		for ( var a = 0; a < entities.length; a++) {

			var entityName = entities[a].name;
			var entityID = entities[a].eid;
			var entityType = entities[a].type;
			LOGGER.debug("Processing ENTITY " + a + ": name=" + entityName + ", eid=" + entityID + ", type=" + entityType);
			// // skip new entities that are not in the IKB
			// if (!entityID.startsWith('EID'))
			// continue;

			self.getThumbnails(entityName, entityID, entityType);

		}
		return htmlOutput;
	};

	this.getThumbnails = function(entityName, entityID, entityType) {
		var task;
		var helpTask;
		if (UTILS.Types.isPerson(entityType)) {
			task = new TASKS.WikipediaPersonThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			helpTask = new TASKS.FreebasePersonThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			task.nextTask = helpTask;

		} else if (UTILS.Types.isOrganisation(entityType)) {
			task = new TASKS.WikipediaOrganisationThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			helpTask = new TASKS.FreebaseOrganisationThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			task.nextTask = helpTask;
			
		} else if (UTILS.Types.isLocation(entityType)) {
			task = new TASKS.WikipediaLocationThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			helpTask = new TASKS.FreebaseLocationThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			task.nextTask = helpTask;
		} else if (UTILS.Types.isProduct(entityType)) {
			task = new TASKS.WikipediaProductThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			helpTask = new TASKS.FreebaseProductThumbnailTask(entityName, entityID, entityType, self.thumbnailsReceived, self.thumbnailsError);
			task.nextTask = helpTask;
		}else
			return;

		this.addEmptyThumbnail(entityName, entityID);
		thumbnailesRequested++;

		tasks.push(task);
		helpTasks.push(helpTask);
		task.run();
	};

	this.addEmptyThumbnail = function(entityName, entityID) {
		var eid = stringUtils.getEID(entityName, entityID);
		$("#" + ONTOS_NAVIGATION_WIDGET_SLIDER_DIV)[0].innerHTML += "<div id='ontos_dbpedia_"
				+ eid
				+ "' class=\"caption\" style='position:relative;width:85px;height:150px;border:marging-left:1px; padding:2px;float:left;border:1px solid gray;overflow:hidden;'  onmouseover='this.style.backgroundColor=\"yellow\"' onmouseout='this.style.backgroundColor=\"white\"'>  <img style='z-index:2; visibility:visible;position:absolute; top:50%;left:50%;height:16px;width:16px;margin-top:-8px;margin-left:-8px;' id='ontosminer_dbpedia_waitSymbol_"
				+ eid + "' src='" + waitSymbolPath + "/ajax-loader.gif'/><p id=\"imageline" + entityName + "\"></p></div>";
	};

	this.thumbnailsReceived = function(entityName, entityID, entityType, result, overlayIcon) {
		LOGGER.debug("thumbnailReceived entityName:" + entityName + ", entityID:" + entityID + ", entityType:" + entityType + ", result:" + result);
		var eid = stringUtils.getEID(entityName, entityID);

		var divName = "ontos_dbpedia_" + eid;
		var imageId = "ontos_dbpedia_thumbnail_" + eid;
		var imageStyle = "width: auto; height: 150px; padding: 0px;visibility:visible;cursor:pointer;";
		var imageSrc = result[0]['thumbnail'];

		var popupMenu = self.createPopupMenu(entityName, entityID, entityType);

		var label = "<label>" + entityName + "</label>";

		var image = "<img           id=\"" + imageId + "\" " + "style=\"" + imageStyle + "\" " + "src=\"" + imageSrc + "\" " + "onmousedown=\"" + popupMenu + "\">" + "</img>";

		LOGGER.debug("Thumbnail for entity " + entityName + " is: " + image);

		var imageDiv = "<div id='" + divName
				+ "_thumbnail' style='width: 85px;text-align:center;  height:120px; padding: 0px; magin:0px; vertical-align: top; visibility: visible; opacity: 1; overflow:hidden;' >" + "</div>"
				+ label;
		$("#" + divName)[0].innerHTML = imageDiv;

		if (overlayIcon)
			$("#" + divName)[0].innerHTML += overlayIcon;

		var magnifierIcon = "<a id='"
				+ imageId
				+ "_magnifier' href='"
				+ imageSrc
				+ "'><img id='"
				+ imageId
				+ "_magnify' src='"
				+ ontosminer_full_path
				+ "/img/magnifier.png' style='position: absolute; left:69px;top:3px; width: 16px; height: auto; backgroundColor:red; padding: 0px; vertical-align: top; visibility: visible; opacity: 1;'/></a>";
		LOGGER.debug("thumbnailsReceived entityName:" + entityName + ", imageSrc: " + imageSrc + ", magnifierIcon: " + magnifierIcon);
		$("#" + divName)[0].innerHTML += magnifierIcon;

		$("a#" + imageId + "_magnifier").fancybox( {
			'showCloseButton' : true,
			'titlePosition' : 'over',
			'type' : 'image',
			'href' : imageSrc,
			'transitionIn' : 'elastic',
			'transitionOut' : 'elastic',
			'speedIn' : 600,
			'speedOut' : 200,
			'overlayShow' : false
		});

		var imageUtils = new UTILS.Images();
		imageUtils.load(divName + "_thumbnail", imageSrc, imageStyle);

		self.bindPopupMenu(jQuery("#" + divName + "_thumbnail"), entityName, entityID, entityType);
		self.thumbnailChecked(entityName);

	};

	this.getOrganisations = function(eid, entityType, token) {
		hidemenu();
		(new UTILS.Images()).wipeLeft();

		var miner = new ONTOS.Miner();
		if (UTILS.Types.isPerson(entityType))
			miner.getAffairsWithOrganisationsRelationship(eid, token, self.relationReceived);
		else if (UTILS.Types.isOrganisation(entityType))
			miner.getInteractionsRelationship(eid, token, self.relationReceived);
		else if (UTILS.Types.isLocation(entityType))
			miner.getLocatesRepresentsRelationship(eid, token, self.relationReceived);
		else if (UTILS.Types.isProduct(entityType))
			miner.getVendorRelationship(eid, token, self.relationReceived);
	};

	this.getPersons = function(eid, entityType, token) {
		hidemenu();
		(new UTILS.Images()).wipeLeft();
		
		var miner = new ONTOS.Miner();
		if (UTILS.Types.isPerson(entityType))
			miner.getMentionedByRelationship(eid, token, self.relationReceived);
		else if (UTILS.Types.isOrganisation(entityType))
			miner.getAffairsWithPersonalitiesRelationship(eid, token, self.relationReceived);
		else if (UTILS.Types.isLocation(entityType))
			miner.getMentionedByRelationship(eid, token, self.relationReceived);
		else if (UTILS.Types.isProduct(entityType))
			miner.getMentionedByRelationship(eid, token, self.relationReceived);
	};

	this.getMentionedBy = function(eid, token) {
		hidemenu();
		var miner = new ONTOS.Miner();
		miner.getMentionedByRelationship(eid, token, self.relationReceived);
	};

	this.getMentions = function(eid, token) {
		hidemenu();
		var miner = new ONTOS.Miner();
		miner.getMentionsRelationship(eid, token, self.relationReceived);
	};

	this.getAffairsWithOrganisations = function(eid, token) {
		hidemenu();

		var miner = new ONTOS.Miner();
		miner.getAffairsWithOrganisationsRelationship(eid, token, self.relationReceived);
	};

	this.getAffairsWithPersonalities = function(eid, token) {
		hidemenu();

		var miner = new ONTOS.Miner();
		miner.getAffairsWithPersonalitiesRelationship(eid, token, self.relationReceived);
	};

	this.relationReceived = function(data) {
		hidemenu();
		(new UTILS.Images()).normalPosition();

		if (!self.testSuccess(data))
			return;

		// remember previous entities;
		self.currentPageIndex++;
		self.previousEntities.push(self.entities);

		var entities = self.setEntityNames(data);
		self.sortAndRenderRelatedEntities(entities);
	};

	this.setEntityNames = function(data) {
		var entities = new Array();
		jQuery.each(data.result.coll, function(index, value) {
			entities[index] = {
				eid : value.to.id.split('#')[1],
				name : value.to.label,
				type : value.to.type
			};
		});
		return entities;
	};

	this.testSuccess = function(data) {
		if (data.success == 'error') {
			alert('Error occured: ' + data.result);
			return false;
		}
		;
		if (data.result.coll.length == 0) {
			alert('No result found');
			return false;
		}
		;
		return true;
	};

	this.thumbnailsError = function(entityName, entityID, entityType, aQuery) {
		LOGGER.debug("thumbnailsError entityName:" + entityName + ", entityID:" + entityID + ", entityType:" + entityType + ", aQuery:" + aQuery);
		var popupMenu = self.createPopupMenu(entityName, entityID, entityType);

		var imgSrc;
		if (UTILS.Types.isPerson(entityType)) {
			imgSrc = "/img/no_person_wikimedia.jpg'";
		} else if (UTILS.Types.isOrganisation(entityType)) {
			imgSrc = "/img/no_organisation.png'";
		}  else if (UTILS.Types.isLocation(entityType)) {
			imgSrc = "/img/no_location.png'";
		}  else if (UTILS.Types.isProduct(entityType)) {
			imgSrc = "/img/no_product.png'";
		} else {
			imgSrc = "/img/no_person_wikimedia.jpg'";
		}

		var imageId = "ontos_dbpedia_thumbnail_NOT_FOUND_" + eid;

		var htmlOutput = "<img id='" + imageId + "' style='position:relative;width: 85px; height: auto; padding: 0px;vertical-align:top;' src='" + ontosminer_full_path + imgSrc
				+ "'><label style='font-size:12px;font-family:\"Times New Roman\",Times,serif;'>" + entityName + "</label></img>";

		var eid = stringUtils.getEID(entityName, entityID);

		$("#ontos_dbpedia_" + eid)[0].innerHTML = htmlOutput;

		self.bindPopupMenu(jQuery("#ontos_dbpedia_" + eid), entityName, entityID, entityType);
		self.thumbnailChecked(entityName);
	};

	this.createPopupMenu = function(entityName, entityID, entityType) {
		var popupMenu = "(new POPUP.Menu()).showPopup(event, null, '" + (new UTILS.Strings()).cleanPopupName(entityName) + "','" + entityID + "','" + entityType + "', '" + token + "')";
		LOGGER.debug("Popup-Menu for entity " + entityName + " is: " + popupMenu);
		return popupMenu;
	};

	this.bindPopupMenu = function(element, entityName, entityID, entityType, offset, annotationId) {
		element.mousedown((function(event) {
			var eName = (new UTILS.Strings()).cleanPopupName(entityName);
			var eid = entityID;
			var etype = entityType;
			var tkn = token;
			return function(event) {
				LOGGER.debug("Recalled: " + eName + ", " + eid + ", " + etype + ", " + tkn);
				(new POPUP.Menu()).showPopup(event, offset, eName, eid, etype, tkn, annotationId);
			};
		})());
	};

	this.thumbnailChecked = function(entityName) {
		// Thumbnails pointer dekrementieren und bei 0 den Wait Symbol
		// verstecken
		thumbnailesRequested--;
		if (thumbnailesRequested == 0)
			this.hideWaitSymbol(entityName);
	};

	this.showWaitSymbol = function(entityName) {
		$("#ontosminer_dbpedia_waitSymbol_" + stringUtils.cleanName(entityName)).attr("style",
				"z-index:2; visibility:visible;position:absolute; top:50%;left:50%;height:16px;width:16px;margin-top:-8px;margin-left:-8px;");
	};

	this.hideWaitSymbol = function(entityName) {
		$("#ontosminer_dbpedia_waitSymbol_" + stringUtils.cleanName(entityName)).attr("style",
				"z-index:2; visibility:hidden;position:absolute; top:50%;left:50%;height:16px;width:16px;margin-top:-8px;margin-left:-8px;");
	};
	
	this.switchButtons = function(){
		if (self.currentRow < self.maxRows) {
			jQuery("#ota_button_down").attr("disabled", false);
			jQuery("#ota_button_down  > img").attr("src", ota_full_path_img+"/btn_down.png");
		}
		else {
			jQuery("#ota_button_down").attr("disabled",true);
			jQuery("#ota_button_down  > img").attr("src", ota_full_path_img+"/btn_down_disabled.png");
		}
		
		if (self.currentRow > 0) {
			jQuery("#ota_button_up").attr("disabled", false);
			jQuery("#ota_button_up  > img").attr("src", ota_full_path_img+"/btn_up.png");
		}
		else {
			jQuery("#ota_button_up").attr("disabled", true);
			jQuery("#ota_button_up  > img").attr("src", ota_full_path_img+"/btn_up_disabled.png");
		}
	}

	this.run();

}
