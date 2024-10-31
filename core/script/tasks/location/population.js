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
 
TASKS.FreebaseLocationPopulationTask = function(aEntityName) {
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.FREEBASE_LOCATION_POPULATION_TASK);
	this.entityName = aEntityName;

	this.setTaskPointer(this);

	this.run = function() {
		myself.miner.getLocationPopulationByName(myself.entityName, myself.valueReceived, myself.valueError);
	};

	this.setValue = function(data) {
		var population = "";
		// data must contain a list of DESC-Sorted year:value pairs, show only
		// the most current one
		for ( var i = 0; i < data.length; i++) {
			population = "Population (" + data[i].year + "): " + data[i].number;
		}
		$('#' + myself.domElementName)[0].innerHTML = population;
	};
};
TASKS.FreebaseLocationPopulationTask.prototype = new TASKS.FreebaseTask();
TASKS.FreebaseLocationPopulationTask.prototype.constructor = TASKS.FreebaseLocationPopulationTask;