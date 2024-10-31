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
 
TASKS.WikipediaPersonAgeTask = function(aEntityName){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.WIKIPEDIA_PERSON_AGE_TASK);
	this.entityName = aEntityName;
	this.setTaskPointer(this);
	
	this.run = function() {
		var query = "PREFIX dbpedia-owl: <http://dbpedia.org/ontology/> "
				+ "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "
				+ "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  " 
				+ "SELECT DISTINCT ?born " 
				+ "WHERE { "
				+ "	?person rdf:type dbpedia-owl:Person ."
				+ "	?person dbpedia-owl:birthDate ?born ."
				+ "	?person rdfs:label '" + (new UTILS.Strings()).cleanSparQlName(myself.entityName) + "'@en ."
				+ "  }";
		
		myself.miner = new SPARQL.Sparqlizer(ontosminer_full_path + "/proxy_curl.php");
		myself.miner.query("", "", "", query, myself.valueReceived, myself.valueError);
	
	};
	
	this.setValue = function(data) {
		$('#'+myself.domElementName)[0].innerHTML = "Age: ";
		var value = data[0];
		var curDate=new Date();
		var age;
		var bornDate=new Date(value.born);
		// ie fix:
		if (bornDate = "NaN"){
			var bornArr = value.born.split("-"); 
			age =  curDate.getFullYear()  - bornArr[0];
			if (curDate.getMonth()<bornArr[1])
				age -= 1;
			if (curDate.getMonth()==bornArr[1])
				if (curDate.getDay()<bornArr[2])
					age -= 1;
		}
		else {
			// ff etc.
			age = curDate.getFullYear() - bornDate.getFullYear();
			if (curDate.getMonth() < bornDate.getMonth())
				age -= 1;
			if (curDate.getMonth() == bornDate.getMonth())
				if (curDate.getDay() < bornDate.getDay())
					age -= 1;
		};
		$('#'+myself.domElementName)[0].innerHTML +=" "+age;
	};
};
TASKS.WikipediaPersonAgeTask.prototype = new TASKS.WikipediaTask();
TASKS.WikipediaPersonAgeTask.prototype.constructor = TASKS.WikipediaPersonAgeTask;

//----
TASKS.FreebasePersonAgeTask = function(aEntityName){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.FREEBASE_PERSON_AGE_TASK);
	this.entityName = aEntityName;
	
	this.setTaskPointer(this);
	
	this.run = function() {
		myself.miner.getPersonAgeByName(myself.entityName,myself.valueReceived, myself.valueError);
	};
	
	this.setValue = function(data) {
		$('#'+myself.domElementName)[0].innerHTML = "Age: ";
		var value = data;
		var curDate=new Date();
		var age;
		var bornDate=new Date(value);
		// ie fix:
		if (bornDate = "NaN"){
			var bornArr = value.split("-"); 
			age =  curDate.getFullYear()  - bornArr[0];
			if (curDate.getMonth()<bornArr[1])
				age -= 1;
			if (curDate.getMonth()==bornArr[1])
				if (curDate.getDay()<bornArr[2])
					age -= 1;
		}
		else {
			// ff etc.
			age = curDate.getFullYear() - bornDate.getFullYear();
			if (curDate.getMonth() < bornDate.getMonth())
				age -= 1;
			if (curDate.getMonth() == bornDate.getMonth())
				if (curDate.getDay() < bornDate.getDay())
					age -= 1;
		};
		$('#'+myself.domElementName)[0].innerHTML +=" "+age;
	};
};
TASKS.FreebasePersonAgeTask.prototype = new TASKS.FreebaseTask();
TASKS.FreebasePersonAgeTask.prototype.constructor = TASKS.FreebasePersonAgeTask;