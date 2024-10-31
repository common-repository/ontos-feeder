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

var OTA_HIGHLIGHTING = {};

OTA_HIGHLIGHTING.getAnnotations = function() {
	var annotations = new Array();

	for ( var a = 0; a < window.navigationWidget.entities.length; a++) {
		var currentEntity = window.navigationWidget.entities[a];
		for ( var annIndex = 0; annIndex < currentEntity.start.length; annIndex++) {
			var annotation = {
				start : currentEntity.start[annIndex], end : currentEntity.end[annIndex], type : currentEntity.type, eid : currentEntity.eid, name : currentEntity.name, index : annIndex

			};
			annotations.push(annotation);
		}
	}
	return annotations;
};

OTA_HIGHLIGHTING.sortAnnotationsDESC = function(annotations) {
	annotations.sort(OTA_HIGHLIGHTING.annotationComparatorDESC);
	for ( var a = 0; a < annotations.length; a++)
		LOGGER.debug("HIGHLIGHTING DESC-sortedAnnotations: annotation " + a + ", name: " + annotations[a].name + ", start at: " + annotations[a].start);

	return annotations;
};

OTA_HIGHLIGHTING.annotationComparatorDESC = function(annotation1, annotation2){
	return annotation2.start-annotation1.start;
};
