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
 
TASKS.WikipediaPersonWikipediaPageTask = function(aEntityName){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.WIKIPEDIA_PERSON_WIKIPEDIAPAGE_TASK);
	this.entityName = aEntityName;
	this.setTaskPointer(this);
	
	this.run = function() {
		var query = "PREFIX dbpedia-owl: <http://dbpedia.org/ontology/> "
				+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  " 
				+ "SELECT ?page " 
				+ "WHERE { "
				+ "	?person rdf:type dbpedia-owl:Person ."
				+ "	?person rdfs:label '" + (new UTILS.Strings()).cleanSparQlName(myself.entityName) + "'@en ."
				+ " ?person foaf:page ?page ."
				+ "  }";
		
		myself.miner = new SPARQL.Sparqlizer(ontosminer_full_path + "/proxy_curl.php");
		myself.miner.query("", "", "", query, myself.valueReceived, myself.valueError);
	
	};
	
	this.setValue = function(data) {
		$('#'+myself.domElementName)[0].innerHTML = "<a target='_blank' href='"+data[0].page+"'>"+TASKS.TaskLabelCaptionProvider(TASKS.MAPPINGS.WIKIPEDIA_PERSON_WIKIPEDIAPAGE_TASK)+"</a>";
	};
};
TASKS.WikipediaPersonWikipediaPageTask.prototype = new TASKS.WikipediaTask();
TASKS.WikipediaPersonWikipediaPageTask.prototype.constructor = TASKS.WikipediaPersonWikipediaPageTask;

TASKS.FreebasePersonWikipediaPageTask = function(aEntityName){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.FREEBASE_PERSON_WIKIPEDIAPAGE_TASK);
	this.entityName = aEntityName;
	
	this.setTaskPointer(this);
	
	this.run = function() {
		myself.miner.getPersonWikipediaArticleByName(myself.entityName,myself.valueReceived, myself.valueError);
	};
	
	this.setValue = function(data) {
		$('#'+myself.domElementName)[0].innerHTML = "<a target='_blank' href='"+data+"'>"+TASKS.TaskLabelCaptionProvider(TASKS.MAPPINGS.FREEBASE_PERSON_WIKIPEDIAPAGE_TASK)+"</a>";
	};
};
TASKS.FreebasePersonWikipediaPageTask.prototype = new TASKS.FreebaseTask();
TASKS.FreebasePersonWikipediaPageTask.prototype.constructor = TASKS.FreebasePersonWikipediaPageTask;