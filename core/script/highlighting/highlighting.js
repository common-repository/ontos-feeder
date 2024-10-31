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
 


OTA_HIGHLIGHTING.addCSS =function(cssName, getCSSContainer){
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", ontosminer_full_path+"/css/"+cssName);
		getCSSContainer().appendChild(link);
};

OTA_HIGHLIGHTING.Worker = function(getHTML, setHTML, getElement, getOffset, getCSSContainer) {
	var getter = getHTML;
	var setter = setHTML;
	var CSSContainer = getCSSContainer;
	var getElement = getElement;
	var getOffset = getOffset;
	var self = this;
	var stringUtils = new UTILS.Strings();

	this.run = function() {
		
		if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_no)
		{
			// no highlighting when deselected
			self.highlightedHTML = getter();
			self.highlightedHTML = stringUtils.removeCRLF(self.highlightedHTML);
			self.highlightedHTML = self.removeHighlightings(self.highlightedHTML);
			setter(self.highlightedHTML);
			return;
		}
		
		OTA_HIGHLIGHTING.addCSS("annotations_edit.css", getCSSContainer);

		self.highlightedHTML = getter();
		self.highlightedHTML = stringUtils.removeCRLF(self.highlightedHTML);

		self.highlightedHTML = self.removeHighlightings(self.highlightedHTML);

		var annotations = OTA_HIGHLIGHTING.getAnnotations();
		annotations = OTA_HIGHLIGHTING.sortAnnotationsDESC(annotations);
		highlightAnnotations(annotations);
		
		setter(self.highlightedHTML);

		bindEntities();
	};

	function bindEntities(){
		for ( var a = 0; a < window.navigationWidget.entities.length; a++) {
			var entity = window.navigationWidget.entities[a];
			for (var annIndex = 0; annIndex<entity.start.length;annIndex++)
			{
				var annotationId = 'highlighted_'+entity.eid+"-"+annIndex;
				var element = getElement(annotationId);
				window.navigationWidget.bindPopupMenu(element, entity.name, entity.eid, entity.type, getOffset,annotationId);
			}
		}
	}
	function highlightAnnotations(annotations){
		for ( var a = 0; a < annotations.length; a++) {
			var annotation = annotations[a];
			if (a>0) {
				var prevAnnotation = annotations[a-1];
				if (parseInt(annotation.end)>parseInt(prevAnnotation.start))
					// overlapping annotations, skip the current one
					continue;
				
				// check if not an attribute
				// by searching for an opening =
				start = annotation.start;
				buf = self.highlightedHTML;
				var isAttr = false;
				for (var j = start; j > 0; j--)
					if ("=" == buf.substring(j, j + 1)) {
						isAttr = true;
						break;
					} else if (">" == buf.substring(j, j + 1) ) {
						break;
					}
				if (isAttr)
					continue;
			};
			if ((ota_miner_highlighting_mode == ota_miner_highlighting_mode_rdfa) ||
				(ota_miner_highlighting_mode == ota_miner_highlighting_mode_rdfaHighlighting) ||
				(ota_miner_highlighting_mode == ota_miner_highlighting_mode_rdfaHighlightingPopup))
					highlightEntityAsRDFa(annotations[a]);
			else if((ota_miner_highlighting_mode == ota_miner_highlighting_mode_microformats) ||
					(ota_miner_highlighting_mode == ota_miner_highlighting_mode_microformatsHighlighting) ||
					(ota_miner_highlighting_mode == ota_miner_highlighting_mode_microformatsHighlightingPopup))
				highlightEntityAsMicroformat(annotations[a]);
		}
	}
	
	function highlightEntityAsMicroformat(annotation) {
		var template = getTemplate(annotation);

		var start = parseInt(annotation.start);
		var end = parseInt(annotation.end);
		var eid = annotation.eid;
		var annotationIndex = "-"+annotation.index;
		var entityType = annotation.type;
		var entityTypeShort = entityType.split("#");
		entityTypeShort = entityTypeShort[1];

		template = template.replace(/\%EID/, "highlighted_" + eid+annotationIndex);
		template = template.replace(/\%RESOURCE/, eid);
		template = template.replace(/\%TYPE/, entityTypeShort);

		var propertyValue = "";
		if (UTILS.Types.isPerson(entityType))
			propertyValue = "fn";
		else if (UTILS.Types.isOrganisation(entityType))
			propertyValue = "fn org";
		else if (UTILS.Types.isLocation(entityType))
			propertyValue = "fn";
		else if (UTILS.Types.isProduct(entityType))
			propertyValue = "fn";
		
		template = template.replace(/\%PROPERTY/, propertyValue);
		
		var sourceHTML = self.highlightedHTML;
		template = template.replace(/\%CONTENTS/,sourceHTML.substring(start, end));
		var resultHTML = sourceHTML.substring(0, start);
		resultHTML += template;
		resultHTML += sourceHTML.substring(end);
		self.highlightedHTML = resultHTML;
		
		LOGGER.debug("HIGHLIGHTING ENTITY: eid=" + annotation.eid + ", name=" + annotation.name + ", start=" + start + ", end=" + end + ", resultHTML=" + resultHTML);	
	}
	
	function highlightEntityAsRDFa(annotation) {
		var template = getTemplate(annotation);

		var start = parseInt(annotation.start);
		var end = parseInt(annotation.end);
		var eid = annotation.eid;
		var fullEid = ota_highlighting_namespace_ontos_identification_full+eid;
		var annotationIndex = "-"+annotation.index;
		var entityType = annotation.type;
		var entityTypeShort = entityType.split("#");
		entityTypeShort = ota_highlighting_namespace_ontos_common_english+entityTypeShort[1];
		
		template = template.replace(/\%EID/, "highlighted_" + eid+annotationIndex);
		template = template.replace(/\%RESOURCE/, ota_highlighting_namespace_ontos_identification+eid);
		template = template.replace(/\%TYPE/, entityTypeShort);
		template = template.replace(/\%FULLEID/, fullEid);

		var propertyValue = "";
		if (UTILS.Types.isPerson(entityType))
			propertyValue = ota_highlighting_namespace_foaf+"name";
		else if (UTILS.Types.isOrganisation(entityType))
			propertyValue = ota_highlighting_namespace_dc+"title";
		else if (UTILS.Types.isLocation(entityType))
			propertyValue = ota_highlighting_namespace_dc+"title";
		else if (UTILS.Types.isProduct(entityType))
			propertyValue = ota_highlighting_namespace_dc+"title";
		
		template = template.replace(/\%PROPERTY/, propertyValue);
		
		var sourceHTML = self.highlightedHTML;
		template = template.replace(/\%CONTENTS/,sourceHTML.substring(start, end));
		var resultHTML = sourceHTML.substring(0, start);
		resultHTML += template;
		resultHTML += sourceHTML.substring(end);
		self.highlightedHTML = resultHTML;
		
		LOGGER.debug("HIGHLIGHTING ENTITY: eid=" + annotation.eid + ", name=" + annotation.name + ", start=" + start + ", end=" + end + ", resultHTML=" + resultHTML);
	}
	
	function getTemplate(annotation) {
		// choose rdfa highlighting placeholders
		if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_rdfa)
		{
			template  =ota_highlighting_rdfa['noHighlighting'];
		}
		else if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_rdfaHighlighting)
		{
			template  = ota_highlighting_rdfa['highlighting'];
		}
		else if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_rdfaHighlightingPopup)
		{
			template  = ota_highlighting_rdfa['highlighting'];
		}
		
		// choose microformats highligthing placeholders
		else if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_microformats)
		{
			if (annotation.type == ONTOSMINER_ONTOLOGY_LOCATION)
				template  = ota_highlighting_mf['location_noHighlighting'];
			else
				template  = ota_highlighting_mf['noHighlighting'];
		}
		else if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_microformatsHighlighting)
		{
			if (annotation.type == ONTOSMINER_ONTOLOGY_LOCATION)
				template  = ota_highlighting_mf['location_highlighting'];
			else
				template  = ota_highlighting_mf['highlighting'];
		}
		else if (ota_miner_highlighting_mode == ota_miner_highlighting_mode_microformatsHighlightingPopup)
		{
			if (annotation.type == ONTOSMINER_ONTOLOGY_LOCATION)
				template  = ota_highlighting_mf['location_highlighting'];
			else
				template  = ota_highlighting_mf['highlighting'];
		}
		return template;
	}
	
	this.removeHighlightings=function(text){
		LOGGER.info("HIGHLIGHTING removeHighlightings entered: highlighted Text =" + text);
		var expressions = ota_highlighting_rdfa_filter_all.concat(ota_highlighting_mf_filter_all);
	
		for(var i=0;i<expressions.length;i++){
			text = removeHighlightings(text,expressions[i]);
		}
		
		LOGGER.info("HIGHLIGHTING removeHighlightings exiting: UNhighlighted Text =" + text);
		return text;
	};
	
	function removeHighlightings(text, expression){
		var parts = expression.split(ota_highlighting_separator);
		var prefix = parts[0];
		var suffix = parts[1];
		var index = parseInt(parts[2]);
		
		var escaped_prefix = prefix.replace('/','\/');
		escaped_suffix = suffix.replace('/','\/');
		// entity names may contain: [-\w\s.,'] (minus, characters,underscores,digits, point, comma, apostroph)
		var expr = new RegExp(prefix+"([-\\w\\s.,']*?)"+suffix, "g");
		var matches = text.match(expr,text);
		if ((matches) && (matches.length>0))
		{
			text  = text.replace(expr,"$"+index);
			LOGGER.debug('HIGHLIGHTINGs Removed. Non-highlighted Text: '+text);
		}
		else
			LOGGER.debug('HIGHLIGHTINGs not found. Non-highlighted Text: '+text);
		
		return text;
	};

	
	this.removeHighlighting = function(annotationId){
		LOGGER.info("HIGHLIGHTING removeHighlighting("+annotationId+") entered: highlighted Text =" + text);
		var text = getter();
		
		var expressions = ota_highlighting_rdfa_filter_one.concat(ota_highlighting_mf_filter_one);
		
		for(var i=0;i<expressions.length;i++){
			expressions[i] = expressions[i].replace(/\%EID/, annotationId);
			text = removeHighlightings(text,expressions[i]);
		}

		setter(text);
		bindEntities();
		LOGGER.info("HIGHLIGHTING removeHighlighting("+annotationId+") exiting: UNhighlighted Text =" + text);
	};
	
	OTA_HIGHLIGHTING.WorkerInstance = this;
};
