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
 
TASKS.OntosDocumentsTask = function(aEntityName,eid,token){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.ONTOS_DOCUMENTS_TASK);
	this.entityName = aEntityName;
	this.setTaskPointer(this);
	
	this.run = function() {
		var miner = new ONTOS.Miner();
		miner.getDocuments(eid, token, myself.valueReceived,myself.valueError);
	};

	this.setValue = function(data) {
		var docDiv = document.getElementById(myself.domElementName);
		docDiv.innerHTML = "";
		$('#'+myself.domImageName)[0].src="";
		$('#'+myself.domImageName).toggleClass("invisibleEntry", true);
		jQuery.each(data.coll, function(index, value) { 
			var docUrl =  value[0].url; 
			var domain = (new UTILS.Strings()).getDomain(docUrl);
			var docName = value[0].title;
			docDiv.innerHTML +="<a  TARGET='_blank' style='font-size:0.9em;font-family:\"Times New Roman\",Times,serif;' title=\""+domain+"\"href=\""+docUrl+"\">\""+docName.substring(0,15) + "...\"</a>";
		});
	};
};
TASKS.OntosDocumentsTask.prototype = new TASKS.OntosTask();
TASKS.OntosDocumentsTask.prototype.constructor = TASKS.OntosDocumentsTask;