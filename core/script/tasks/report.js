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
 
TASKS.OntosReportTask = function(aEntityName, entityId) {
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.ONTOS_REPORT_TASK);
	this.entityName = aEntityName;

	this.setTaskPointer(this);

	this.run = function() {
		this.valueReceived("dummy");
	};

	this.setValue = function(data) {
		var curDateTime = new Date();
		var curYear = curDateTime.getFullYear();
		var curMonth = curDateTime.getMonth();
		var curDate = curDateTime.getDate();
		var prevMonth = curMonth-1;
		var prevYear =  curYear;
		var prevDate = curDate;
		if (curMonth == 0) {
			prevMonth = 11;
			prevYear--;
		}
		curMonth++;
		prevMonth++;
		
	    if (curMonth<10)
	    	curMonth = "0"+curMonth;
	    if (curDate<10)
	    	curDate = "0" + curDate;
	    if (prevMonth<10)
	    	prevMonth = "0"+prevMonth;
	    if (prevDate<10)
	    	prevDate = "0" + prevDate;
	    
		var to = curYear+"-"+curMonth+"-"+curDate+"T00:00:00Z";
		var from = prevYear+"-"+prevMonth+"-"+prevDate+"T00:00:00Z";
		
		var prefix = ota_highlighting_namespace_ontos_identification_full.replace("#","%23");
		
		jQuery('#' + myself.domElementName)[0].innerHTML = "<a target='_blank' href=\""+ontosminer_host + "/report.jsp?objid=" + prefix+entityId + "&ajax=true&lang=en_EN&from="+from+"&to="+to+"&ontology="+ota_ontology+"&scope=bdb-en&apiurl=api/\">Ontos Summary</a>";
	};
};
TASKS.OntosReportTask.prototype = new TASKS.OntosTask();
TASKS.OntosReportTask.prototype.constructor = TASKS.OntosReportTask;