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
 
TASKS.WikipediaProductThumbnailTask = function(aEntityName,aEntityID,aEntityType,aOnSuccess, aOnError){
	var myself = this;
	this.eid = (new UTILS.Strings()).getEID(aEntityName,aEntityID);
	this.setMapping(TASKS.MAPPINGS.WIKIPEDIA_PRODUCT_THUMBNAIL_TASK, myself.eid);
	
	this.entityName = aEntityName;
	this.entityID = aEntityID;
	this.entityType = aEntityType;
	this.onSuccess = aOnSuccess;
	this.onError = aOnError;
	
	this.setTaskPointer(this);
	
	this.run = function() {
		LOGGER.debug("WikipediaProductThumbnailTask run : entityName:"+myself.entityName);

		var query = "SELECT ?thumbnail " 
			    + "WHERE { "
				+ "	?product dbpedia-owl:thumbnail ?thumbnail ." 
				+ "	?product rdfs:label '" + (new UTILS.Strings()).cleanSparQlName(myself.entityName) + "'@en ."
				+ "	?product dbpedia-owl:product ?vendor ." 
				+ "  }";

		myself.miner = new SPARQL.Sparqlizer(ontosminer_full_path + "/proxy_curl.php");
		myself.miner.query(myself.entityName, myself.entityID, myself.entityType, query, myself.valueReceived,  myself.valueError);
	
	};
	
	this.valueReceived = function(entityName,entityID,entityType, data)
	{
		// adding Overlay Icon indicating thumbnail source
		var overlayIcon = "<img src='" + ontosminer_full_path + "/img/wikipedia.gif' style='position: absolute; left:5px;top:3px; width: 16px; height: auto; backgroundColor:red; padding: 0px; vertical-align: top; visibility: visible; opacity: 1;'/>";
		// delegate to navigation wizard to show the thumbnail
		myself.onSuccess(entityName,entityID,entityType, data, overlayIcon);
	};
	
	this.valueError = function(entityName,entityID,entityType, data) {
		// show default picture in the navigation widget
		if (!myself.nextTask) 
			myself.onError(entityName,entityID,entityType, data);
		else {
			LOGGER.debug("WikipediaProductThumbnailTask valueError : calling next Task:"+myself.nextTask.name);
			// call constructor to fallback to the next task;
			myself.nextTask.run(entityName,entityID,entityType, data);
		}
	};
};
TASKS.WikipediaProductThumbnailTask.prototype = new TASKS.WikipediaTask();
TASKS.WikipediaProductThumbnailTask.prototype.constructor = TASKS.WikipediaProductThumbnailTask;

TASKS.FreebaseProductThumbnailTask = function(aEntityName,aEntityID,aEntityType,aOnSuccess, aOnError){
	LOGGER.debug("FreebaseProductThumbnailTask constructor : entityName:"+aEntityName+", entityID:"+aEntityID);
	var myself = this;
	this.eid = (new UTILS.Strings()).getEID(aEntityName,aEntityID);
	this.setMapping(TASKS.MAPPINGS.FREEBASE_PRODUCT_THUMBNAIL_TASK,myself.eid);

	this.entityName = aEntityName;
	this.entityID = aEntityID;
	this.entityType = aEntityType;
	this.onSuccess = aOnSuccess;
	this.onError = aOnError;

	this.setTaskPointer(this);
	
	this.run = function() {
		LOGGER.debug("FreebaseProductThumbnailTask run : entityName:"+myself.entityName);
		myself.miner.getProductThumbnailByName(myself.entityName,myself.valueReceived,  myself.valueError);
	};
	
	this.valueReceived = function(data) {
		// show person thumbnail in the navigation widget
		// format result according to the sparqlizer
		var result = [
			{
				"thumbnail":"http://img.freebase.com/api/trans/raw/"+data
			}
		];
		
		// adding Overlay Icon indicating thumbnail source
		var overlayIcon = "<img src='" + ontosminer_full_path + "/img/freebase.gif' style='position: absolute; left:5px;top:3px; width: 16px; height: auto; backgroundColor:red; padding: 0px; vertical-align: top; visibility: visible; opacity: 1;'/>";
		// delegate to the navigation wizard to show the thumbnail
		myself.onSuccess(myself.entityName,myself.entityID,myself.entityType,result,overlayIcon );
	};
	
	this.valueError = function(data) {
		// show default picture in the navigation widget
		if (!myself.nextTask) 
			myself.onError(myself.entityName,myself.entityID,myself.entityType, data);
		// call constructor to fallback to the next task;
		else {
			LOGGER.debug("FreebaseProductThumbnailTask valueError : calling next Task:"+myself.nextTask);
			TASKS.FreebaseProductThumbnailTask.prototype.valueError.call(myself, myself.entityName,myself.entityID,myself.entityType, data);
		}
	};
};
TASKS.FreebaseProductThumbnailTask.prototype = new TASKS.FreebaseTask();
TASKS.FreebaseProductThumbnailTask.prototype.constructor = TASKS.FreebaseProductThumbnailTask;
