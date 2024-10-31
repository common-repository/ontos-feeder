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
 
function FCKeditor_OnComplete(editorInstance) {
	LOGGER.debug("------------FCK EDITOR Attached------------");
	OTA_HIGHLIGHTING.wysiwygEditor = editorInstance;
	OTA_HIGHLIGHTING.addCSS("annotations_edit_inactive.css", ota_fck_getCSSContainer);

	ota_fck_waitForNavigationWidget(editorInstance);
}

function ota_fck_waitForNavigationWidget(editorInstance) {
	if (!window.navigationWidget)
	{ 
		setTimeout(function() {
			ota_fck_waitForNavigationWidget(editorInstance);
		}, 100);
	}else {
		ota_fck_highlight();
	}
}

function ota_fck_highlight() {

	if (!window.navigationWidget.entities)
	{	// wait till all entities are loaded;
		setTimeout("ota_fck_highlight()", 100);
	}else
	{	// call generic highlighting method providing callbacks to the getter
		// and setter of the editor's html
		(new OTA_HIGHLIGHTING.Worker(ota_fck_getHTML, ota_fck_setHTML, ota_fck_findElement, ota_fck_getOffset, ota_fck_getCSSContainer)).run();
		LOGGER.debug("HIGHLIGHTING WAITED for " +window.navigationWidget.entities.length+" entities");
	}
}

function ota_fck_getHTML() {
	return OTA_HIGHLIGHTING.wysiwygEditor.GetHTML(true);
}
function ota_fck_setHTML(html) {
	OTA_HIGHLIGHTING.wysiwygEditor.EditorDocument.body.innerHTML = html;
}

function ota_fck_getCSSContainer() {
	return OTA_HIGHLIGHTING.wysiwygEditor.EditorDocument.childNodes[0].childNodes[0];
	
}
/**
 * looks up an element with the givn idwithin the editing area
 * @return 
 */
function ota_fck_findElement(elementId){
	var element = jQuery("#edit-body___Frame").contents().find('iframe').contents().find('#'+elementId);
	return element;
}

/** returns the offset of the editing area (which is embedded into two iframes)
 * 
 * @return offset of the iframes
 */
function ota_fck_getOffset() {
	var offset1 = jQuery("#edit-body___Frame").offset();
	var offset2 = jQuery("#edit-body___Frame").contents().find('iframe').offset();
	
	var browser = new UTILS.Browser();
	var scroll = browser.getScrollXY();
	
	var offset = {
		top : offset1.top + offset2.top,
		left : offset1.left + offset2.left
	};
	
	// not in IE8
	if (! (CURRENT_BROWSER == BROWSER_IE))
	{				
		offset.top -= scroll.scrOfY;
		offset.left-= -scroll.scrOfX;
	}
	
	return offset;
}