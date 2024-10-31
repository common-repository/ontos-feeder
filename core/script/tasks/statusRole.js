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
 
TASKS.OntosStatusRoleTask = function(aEntityName,eid,token){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.ONTOS_STATUS_ROLE_TASK);
	this.entityName = aEntityName;
	this.setTaskPointer(this);
	
	this.run = function() {
		var miner = new ONTOS.Miner();
		miner.getStatusRole(eid, token, myself.valueReceived, myself.valueError);
	};

	this.setValue = function(data) {
		var length = data.length;
		if (length>2)
			length = 2;
		$('#'+myself.domElementName)[0].innerHTML = "";
		var role ="";
		for (var i=0;i<length;i++)
		{ 
			LOGGER.debug("i="+i);
			role +=  data[i][1] +", "; 
			
		};
		role = role.substring(0,role.length-2);
		$('#'+myself.domElementName)[0].innerHTML += "Roles: "+role;
	};
};
TASKS.OntosStatusRoleTask.prototype = new TASKS.OntosTask();
TASKS.OntosStatusRoleTask.prototype.constructor = TASKS.OntosStatusRoleTask;