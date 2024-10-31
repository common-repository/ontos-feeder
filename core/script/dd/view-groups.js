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
 
// contentId = id des Div, das den Inhalt der Gruppe beinhaltet und ein oder
// ausgeblendet werden kann
// caption = Ueberschrift der Gruppe
// imageName = Dateiname (kurz) des die Gruppe repraesentierenden Icons
var GROUPS = { MAPPINGS : {
	SUMMARY_GROUP : {
		contentId : "summary_group", caption : "Summary", imageName : "" },

	RELATIONS_GROUP : {
		contentId : "popup_ontos_relations", caption : "Relations", imageName : "ontos.gif" },

	DOCUMENTS_GROUP : {
		contentId : "popup_ontos_documents", caption : "Articles", imageName : "ontos.gif" },

	WEBSITES_GROUP : {
		contentId : "popup_websites", caption : "Websites", imageName : "globe.png" },

	SOCIAL_NETWORKS_GROUP : {
		contentId : "popup_socialnetworks", caption : "Social networks", imageName : "facebook.png" } } };

GROUPS.GroupContentIDProvider = function(groupMapping) {
	return (new UTILS.Strings()).cleanName(groupMapping.contentId);
};
GROUPS.GroupIconIDProvider = function(groupMapping) {
	return (new UTILS.Strings()).cleanName(groupMapping.contentId) + "_img";
};
GROUPS.GroupCaptionProvider = function(groupMapping) {
	return groupMapping.caption;
};
GROUPS.GroupIconNameProvider = function(groupMapping) {
	return groupMapping.imageName;
};

GROUPS.GroupBase = function(aGroupMapping) {
	var groupSelf = this;
	this.groupMapping = aGroupMapping;
	// counts registered tasks
 	this.tasks = new Array(); 
	this.taskCounter = 0;
	// counts tasks executed successfully / erroneously
	this.successfullTasks = 0;
	this.erroneousTasks = 0;

	this.onTaskExecuted = function(taskName, status, result) {
		if (status) {
			groupSelf.successfullTasks++;
			LOGGER.debug(GROUPS.GroupContentIDProvider(groupSelf.groupMapping) + " task " + taskName + " has executed successfully, total task# = " + groupSelf.taskCounter + ", successful: "
					+ groupSelf.successfullTasks + ", erroneous: " + groupSelf.erroneousTasks + ", pending: " + groupSelf.getPendingTasksNumber());
		} else {
			groupSelf.erroneousTasks++;
			LOGGER.debug(GROUPS.GroupContentIDProvider(groupSelf.groupMapping) + " task " + taskName + " has failed, total task# = " + groupSelf.taskCounter + ", successful: "
					+ groupSelf.successfullTasks + ", erroneous: " + groupSelf.erroneousTasks + ", pending: " + groupSelf.getPendingTasksNumber());
		}

		groupSelf.toggleGroup();
	};

	this.toggleGroup = function() {
		// template method
		if (groupSelf.getPendingTasksNumber() == 0) {
			// all tasks done
			if (groupSelf.successfullTasks == 0) {
				// group is empty
				LOGGER.debug(GROUPS.GroupContentIDProvider(groupSelf.groupMapping) + " group is emtpy, no successfull tasks, total task# = " + groupSelf.taskCounter + ", successful: "
						+ groupSelf.successfullTasks + ", erroneous: " + groupSelf.erroneousTasks + ", pending: " + groupSelf.getPendingTasksNumber());
				var divId = GROUPS.GroupContentIDProvider(groupSelf.groupMapping);
				// ie bugfix:
				if ($('#' + divId)[0])
					$('#' + divId)[0].children[0].innerHTML = "<span>Nothing found</span>";
			} else {
				// group is NOT empty
				LOGGER.debug(GROUPS.GroupContentIDProvider(groupSelf.groupMapping) + " group has at least one successful task, total task# = " + groupSelf.taskCounter + ", successful: "
						+ groupSelf.successfullTasks + ", erroneous: " + groupSelf.erroneousTasks + ", pending: " + groupSelf.getPendingTasksNumber());
			}
			groupSelf.resetCounter();
			LOGGER.debug(GROUPS.GroupContentIDProvider(groupSelf.groupMapping) + " task counters resetted, total task# = " + groupSelf.taskCounter + ", successful: " + groupSelf.successfullTasks
					+ ", erroneous: " + groupSelf.erroneousTasks + ", pending: " + groupSelf.getPendingTasksNumber());
		}
	};

	this.getNoErrors = function() {
		return (erroneousTasks == 0);
	};

	this.getPendingTasksNumber = function() {
		return groupSelf.taskCounter - (groupSelf.successfullTasks + groupSelf.erroneousTasks);
	};

	this.getTaskCounter = function() {
		return groupSelf.taskCounter;
	};

	this.resetCounter = function() {
		groupSelf.taskCounter = 0;
		groupSelf.successfullTasks = 0;
		groupSelf.erroneousTasks = 0;
		
		groupSelf.tasks = new Array();
	};

	// convenience method to register itself as a listener of a task
	// increments the number of tasks automatically without the need to expose a
	// public incrementNumberOfTasks method
	this.registerAtTask = function(task) {
		task.addStatusObserver(this);
		groupSelf.tasks.push(task);
		
		this.taskCounter++;
		
		LOGGER.debug(GROUPS.GroupContentIDProvider(groupSelf.groupMapping) + " task added: " + task.name + ", total task# = " + this.taskCounter + ", successful: " + this.successfullTasks
				+ ", erroneous: " + this.erroneousTasks + ", pending: " + this.getPendingTasksNumber());
	};
	
	
	this.render = function(){
		var fieldset  = "<fieldset>";
			fieldset += createFieldsetHeader();
		 	fieldset += createFieldsetBody();
		 	fieldset += "</fieldset>";
		return fieldset;
	};

	function createFieldsetHeader(){
		var header="";
		if (CURRENT_BROWSER==BROWSER_IE)
			header= "<legend style='width:100%;'>";
		else if (CURRENT_BROWSER==BROWSER_MOZILLA)
			header= "<legend>";
		else
			header= "<legend style='width:100%;'>";
		header +="<div style='width:100%;height:20px;'>"+
							getLogoImage()+
							getCaption()+
							getOpenCloseButton()+
					"</div></legend>";
		return header;
	};
	
	function createFieldsetBody(){
		var body= "<div id='"+GROUPS.GroupContentIDProvider(groupSelf.groupMapping)+"'>" +
				  "<div style='visibility:hidden;height:0px;display:none;'>"+ groupSelf.getLinks() +"</div></div>";
		return body;
	}
	
	function getLogoImage(){
		var link = "<img src='"+ontosminer_full_path+"/img/"+groupSelf.groupMapping.imageName+"' style='float:left;height:20px; vertical-align:top; padding-right:8px;'></img>";
		return link;
	}
	
	function getCaption(){
		var link = "<b  style='float:left; vertical-align:middle;height:20px;'>"+GROUPS.GroupCaptionProvider(groupSelf.groupMapping)+"</b>";
		return link;
	}
	
	function getOpenCloseButton(id,divId){
		var id = GROUPS.GroupIconIDProvider(groupSelf.groupMapping);
		var divId = GROUPS.GroupContentIDProvider(groupSelf.groupMapping);
		var link = "<img id='"+id+"' class='img_button' style='float:right;' src='"+ontosminer_full_path+"/img/group-closed.gif' onclick='open_arrow(\""+ontosminer_full_path+"\", \""+id+"\", \""+divId+"\")'/>";
		return link;
	}
	
	// made public to achieve "protected"-ness
	this.getLinks = function(){
		var links =  "";
		var labels = new Array();
		
		if (groupSelf.tasks.length==0)
			return "<span>Nothing found</span>";
		
		for(var i=0;i<groupSelf.tasks.length;i++){
			var task = groupSelf.tasks[i];
			// check auf Uniqueness (verschiedene Tasks können demselben Tag
			// (mapping.label) zugeordnet werden), es sollen jedoch nicht
			// mehrmals dieselben Tags mit der selben Id gerendert werden.
			// Genausowenig wie mehere resultate (da tasks verkettet
			// ausgeführt
			// werden und nicht parallel)
			var label = TASKS.TaskLabelIDProvider(task.getMapping());
			if (! labels.contains(label))
				{	
					links += getAJAXLink(task.getMapping(),false);
					labels.push(label);
				}
		}

		return links;
	};
	
	
	function getAJAXLink(taskMapping,lineBreak) {
		return getLink(TASKS.TaskDivIDProvider(taskMapping),TASKS.TaskLabelIDProvider(taskMapping),TASKS.TaskIconIDProvider(taskMapping),"/img/ajax-loader2.gif", "looking up "+TASKS.TaskLabelCaptionProvider(taskMapping), lineBreak);
	};

	function getLink(divId, domElementId, imgId,iconShortPath, text, lineBreak) {
		var link = "<div id='"+divId+"' style='padding:0px;margin:0px;vertical-align:middle;'>\
					<img id='"+imgId+"' style='width:12px;float:left;vertical-align:middle;' src='"+ontosminer_full_path + iconShortPath +"'/>\
					<span id='"+domElementId+"'>"+text+"</span>";
		if (lineBreak)
			link +="<br/>";
		
		link+="</div>";
		
		return link;
	};
	
};

//override rendering method
GROUPS.SummaryGroup = function(){
	this.render = function(){
		var links =  "<div id='ontosminer_popup_summary'>"+this.getLinks()+"</div>";
		return links;
	};
};
GROUPS.SummaryGroup.prototype = new GROUPS.GroupBase(GROUPS.MAPPINGS.SUMMARY_GROUP);
GROUPS.SummaryGroup.prototype.constructor = GROUPS.SummaryGroup;


// create groups
GROUPS.RELATIONS = new GROUPS.GroupBase(GROUPS.MAPPINGS.RELATIONS_GROUP);
GROUPS.DOCUMENTS = new GROUPS.GroupBase(GROUPS.MAPPINGS.DOCUMENTS_GROUP);
GROUPS.WEBSITES = new GROUPS.GroupBase(GROUPS.MAPPINGS.WEBSITES_GROUP);
GROUPS.SOCIALNETS = new GROUPS.GroupBase(GROUPS.MAPPINGS.SOCIAL_NETWORKS_GROUP);

GROUPS.SUMMARY = new GROUPS.SummaryGroup();
