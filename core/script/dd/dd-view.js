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
 
function createMenuCaption(entityName,annotationId){
	return "<div style='text-align:right;cursor:pointer;'>\
			<span style='float:left;height:1.2em;'><b>"+entityName+"</b></span>\
			<img class='img_button_delete_annotation' title='delete this annotation' src='"+ontosminer_full_path+"/img/delete.png' style='vertical-align:middle;margin-left:5px;margin-right:0px;float:none;display:"+(annotationId!=undefined?"inline":"none")+"' onclick='OTA_HIGHLIGHTING.WorkerInstance.removeHighlighting(\""+annotationId+"\");hidemenu();'/>\
			<img class='img_button_close_menu' title='close menu' src='"+ontosminer_full_path+"/img/power_off.png' style='vertical-align:middle;margin-left:5px;margin-right:5px;float:none;' onclick='hidemenu();'/>\
		</div>\
		<hr/>";
}

function createSummary(entityType){
	return GROUPS.SUMMARY.render();
}

function createMenu(eid, entityType, token) {
	var link = "<div>";
	link+=GROUPS.RELATIONS.render();
	link+=GROUPS.DOCUMENTS.render();
	link+=GROUPS.WEBSITES.render();
	link+=GROUPS.SOCIALNETS.render();
	link+="</div>";
	return link;
}


