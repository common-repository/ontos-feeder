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
 

//  get called from the tinyMce integration code (editor_plugin):
//  ed.onInit.add(function(ed) {
//      ota_tinymce_waitForNavigationWidget(editorInstance);
//  });

function ota_tinymce_waitForNavigationWidget() {
	if (!window.navigationWidget)
	{ 
		setTimeout(function() {
			ota_tinymce_waitForNavigationWidget();
		}, 100);
	}else {
		// registering itself in the highlighting registry
		LOGGER.debug("------------TINYMCE EDITOR Attached------------");
		ota_tinymce_highlight();
	}
}

function ota_tinymce_highlight() {
	if (!window.navigationWidget.entities)
	{	// wait till all entities are loaded;
		setTimeout("ota_tinymce_highlight()", 100);
	}else
	{	// call generic highlighting method providing callbacks to the getter
		// and setter of the editor's html
		LOGGER.debug("HIGHLIGHTING WAITED for " +window.navigationWidget.entities.length+" entities");
		OTA_HIGHLIGHTING.workerInstance.run();
		
	}
}

function ota_tinymce_getHTML() {
	var content = OTA_HIGHLIGHTING.wysiwygEditor.getContent( {
		format : 'html'
	});

	return content;
}
function ota_tinymce_setHTML(html) {
	var content = OTA_HIGHLIGHTING.wysiwygEditor.setContent(html);

}

function ota_tinymce_getCSSContainer() {
	return OTA_HIGHLIGHTING.wysiwygEditor.contentDocument.childNodes[1].childNodes[0];
}
/**
 * looks up an element with the givn idwithin the editing area
 * @return 
 */
function ota_tinymce_findElement(elementId){
	var element = jQuery("#content_ifr").contents().find('#'+elementId);
	return element;
}

/** returns the offset of the editing area (which is embedded into two iframes)
 * 
 * @return offset of the iframes
 */
function ota_tinymce_getOffset() {
	var offset1 = jQuery("#content_ifr").offset();
	var offset = {
		top : offset1.top,
		left : offset1.left
	};
	return offset;
}
function ota_tinymce_addCSS(editorInstance){
	OTA_HIGHLIGHTING.wysiwygEditor = editorInstance;   
	OTA_HIGHLIGHTING.addCSS("annotations_edit_inactive.css",ota_tinymce_getCSSContainer);
}

OTA_HIGHLIGHTING.workerInstance = new OTA_HIGHLIGHTING.Worker(ota_tinymce_getHTML, ota_tinymce_setHTML, ota_tinymce_findElement, ota_tinymce_getOffset, ota_tinymce_getCSSContainer);