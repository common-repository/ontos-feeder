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
 
TASKS.TaskBase = function() {

	var taskSelf = this;

	this.name = "TaskBase";
	// anti-flickering - request ajaxed values only on showing the Popup for
	// another entity (e.g. changing the entityName)
	var lastValue;
	this.mapping;
	this.domElementName = "";
	this.domImageName = "";
	this.domDivName = "";
	this.nextTask = null;
	// list of observers interested in task result status (succeeded or
	// erroneous)
	this.statusObservers = new Array();

	this.setTaskPointer = function(taskPointer) {
		taskSelf = taskPointer;
	};

	this.getTaskPointer = function() {
		return taskSelf;
	};

	this.addStatusObserver = function(observer) {
		this.statusObservers.push(observer);
	};

	this.notifyStatusObservers = function(status, result) {
		for ( var i = 0; i < this.statusObservers.length; i++) {
			var observer = this.statusObservers[i];
			observer.onTaskExecuted(this.name, status, result);
		}
	};

	this.setMapping = function(mapping, index) {
		this.mapping = mapping;
		this.name = mapping.taskName;
		this.domElementName = TASKS.TaskLabelIDProvider(mapping);
		this.domImageName = TASKS.TaskIconIDProvider(mapping);
		this.domDivName = TASKS.TaskDivIDProvider(mapping);
		if (index) {
			this.domElementName += "_" + index;
			this.domImageName += "_" + index;
			this.domDivName += "_" + index;
		}
	};

	this.getMapping = function(){
		return this.mapping;
	}
	this.run = function() {
		// call appropriate miner method here in the specific Tasks
	};

	this.valueReceived = function(data, imgPath) {

		if (this.isValueOK(data)) {
			this.notifyStatusObservers(SUCCESS_CONSTANT, data);

			$('#' + this.domDivName).toggleClass("invisibleEntry", false);
			if (imgPath)
				this.setImg(imgPath);
			this.setValue(data);

		} else
			this.valueError(data);
	};

	this.setImg = function(imgPath) {
		if ($('#' + this.domImageName))
			$('#' + this.domImageName)[0].src = imgPath;
	};

	// replaced with the callback at the moment
	this.setValue = function(data) {
		// template method
		// overrite it in sub-classes
		// default:
		$('#' + this.domElementName)[0].innerHTML = data;
	};

	this.isValueOK = function(data) {
		// template method
		// overrite it in sub-classes
		// default:
		return ((data != null) && (data != ""));
	};

	this.setNextTask = function(task) {
		LOGGER.debug("TaskBase.setNextTask name:" + taskSelf.name + ", task-name:" + task.getName());
		taskSelf.nextTask = task;
	};

	this.getName = function() {
		return taskSelf.name;
	};

	this.valueError = function(data) {
		this.notifyStatusObservers(ERROR_CONSTANT, data);

		if ($('#' + this.domElementName)[0])
			$('#' + this.domElementName)[0].innerHTML = "";
		if ($('#' + this.domDivName))
			$('#' + this.domDivName).toggleClass("invisibleEntry", true);
		if ($('#' + this.domImageName)[0])
			$('#' + this.domImageName)[0].src = "";
		this.lastValue = "";
		if (this.nextTask != null) {
			this.nextTask.run();
		}
	};

};

TASKS.FreebaseTask = function() {
	// recreate TASKS.TaskBase so that its local vars are reinitialized.
	// Otherwise the taskSelf becomese static
	TASKS.FreebaseTask.prototype = new TASKS.TaskBase();

	var callBack;
	this.name = "FreebaseTask";
	this.miner = new FREEBASE.Miner();
	this.setTaskPointer = function(taskPointer) {
		TASKS.FreebaseTask.prototype.setTaskPointer(taskPointer);
		callBack = taskPointer;
	};
	this.valueReceived = function(data) {
		TASKS.FreebaseTask.prototype.valueReceived.call(callBack, data, ontosminer_full_path + ONTOSMINER_FREEBASE_SYMBOL_PATH);
	};
	this.valueError = function(entityName, entityID, entityType, data) {
		TASKS.WikipediaTask.prototype.valueError.call(callBack, data);
	};

};
TASKS.FreebaseTask.prototype = new TASKS.TaskBase();
TASKS.FreebaseTask.prototype.constructor = TASKS.FreebaseTask;

TASKS.WikipediaTask = function() {
	// recreate TASKS.TaskBase so that its local vars are reinitialized.
	// Otherwise the taskSelf becomese static
	TASKS.WikipediaTask.prototype = new TASKS.TaskBase();

	var callBack;
	this.name = "WikipediaTask";
	this.setTaskPointer = function(taskPointer) {
		TASKS.WikipediaTask.prototype.setTaskPointer(taskPointer);
		callBack = taskPointer;
	};

	this.valueReceived = function(entityName, entityID, entityType, data) {
		TASKS.WikipediaTask.prototype.valueReceived.call(callBack, data, ontosminer_full_path + ONTOSMINER_WIKIPEDIA_SYMBOL_PATH);
	};

	this.valueError = function(entityName, entityID, entityType, data) {
		TASKS.WikipediaTask.prototype.valueError.call(callBack, data);
	};

};
TASKS.WikipediaTask.prototype = new TASKS.TaskBase();
TASKS.WikipediaTask.prototype.constructor = TASKS.WikipediaTask;

TASKS.OntosTask = function() {
	// recreate TASKS.TaskBase so that its local vars are reinitialized.
	// Otherwise the taskSelf becomese static
	TASKS.OntosTask.prototype = new TASKS.TaskBase();

	var callBack;
	this.name = "OntosTask";
	this.miner = (new ONTOS.Miner());
	this.setTaskPointer = function(taskPointer) {
		TASKS.OntosTask.prototype.setTaskPointer(taskPointer);
		callBack = taskPointer;
	};

	this.valueReceived = function(data) {
		TASKS.OntosTask.prototype.valueReceived.call(callBack, data, ontosminer_full_path + ONTOSMINER_ONTOS_SYMBOL_PATH);
	};

	this.valueError = function(data) {
		TASKS.OntosTask.prototype.valueError.call(callBack, data);
	};

};
TASKS.OntosTask.prototype = new TASKS.TaskBase();
TASKS.OntosTask.prototype.constructor = TASKS.OntosTask;