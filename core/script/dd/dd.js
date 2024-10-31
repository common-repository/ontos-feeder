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
 
/*******************************************************************************
 * Pop-it menu- © Dynamic Drive (www.dynamicdrive.com) This notice MUST stay
 * intact for legal use Visit http://www.dynamicdrive.com/ for full source code
 ******************************************************************************/
 // popup namespace
var POPUP = {};

var ie5 = document.all && !window.opera;
var ns6 = document.getElementById;

if (ie5 || ns6) {
	document.write('<div id="popupmenu" onMouseover="\
												if (window.delayhide)\
													clearTimeout(delayhide);\
					"></div>')
}
function hidemenu(){
	if (window.menuobj) {
		menuobj.style.visibility = "hidden";
		menuobj.style.display = "none";
	};
}

POPUP.Menu = function () {
	
	var menuSelf = this;
	this.tasks = new Array();
	
	
	this.defaultMenuWidth = "180"; // set default menu width.

		this.showPopup = function(e, offsetGetter, entityName, eid, entityType,token, annotationId, optWidth) {
				if (e.which != 1)
			return;
		menuSelf.tasks = new Array(); 
		menuSelf.tasks = createTasks(entityType,entityName,eid,token);
		
		var menu = createMenuCaption(entityName,annotationId)+
		   createSummary(entityType)+
		   createMenu(eid, entityType, token);
	
		
	
		menuSelf.showmenu(e, offsetGetter, menu, optWidth);
	}


	this.showmenu = function(e, offsetGetter, popupMenuHTML, optWidth) {
		if (!document.all && !document.getElementById)
			return clearhidemenu();

		menuobj = ie5 ? document.all.popupmenu : document
				.getElementById("popupmenu");
				
		// set static content
		menuobj.innerHTML = popupMenuHTML;
		
		$(menuobj).draggable();		
		
		// and then populate menu dynamically with data from DBPedia, Freebase,
		// Ontos...
		getAjaxLinks(this.tasks);
		
		menuobj.style.width = this.defaultMenuWidth;
		menuobj.contentwidth = (typeof optWidth != "undefined") ? optWidth
				: this.defaultMenuWidth;
		menuobj.contentheight = menuobj.offsetHeight;
		
// do not work in ie8, cause it is recognized as ie5 whileas event is null
// eventX = ie5 ? event.clientX : e.clientX
// eventY = ie5 ? event.clientY : e.clientY
		eventX = e.clientX;
		eventY = e.clientY;
		
		var browser = new UTILS.Browser();
		var size = browser.getSize();
		var scroll = browser.getScrollXY();
		
		if (offsetGetter)
		{
			offset = offsetGetter();
		
			if (offset)
			{
				// Ajusting position according to the eAdjustment (need this for
				// events inside an IFrame etc.)
				eventX += offset.left;
				eventY += offset.top;
				
				// only when an offsetGetter is there, so the callee is a text
				// Annotation, not a thumbnail
				eventX -= scroll.scrOfX;
				eventY -= scroll.scrOfY;

			}
		}
		
		// Find out how close the mouse is to the corner of the window
		var rightedge = size.width - eventX;
		var bottomedge = size.height - eventY;

		// if the horizontal distance isn't enough to accomodate the width of
		// the
		// context menu
		if (rightedge < menuobj.contentwidth)
			// move the horizontal position of the menu to the left by it's
			// width
			menuobj.style.left = scroll.scrOfX + eventX	- menuobj.contentwidth + 15+"px";
		else
			// position the horizontal position of the menu where the mouse was
			// clicked
			menuobj.style.left = scroll.scrOfX  + eventX + "px";
			// same concept with the vertical position
		if (bottomedge < menuobj.contentheight)
			menuobj.style.top = scroll.scrOfY + eventY - menuobj.contentheight + "px" ;
		else
			menuobj.style.top = scroll.scrOfY + eventY + "px";
			
		menuobj.style.visibility = "visible";
		menuobj.style.display = "block";
		return false;
	}



}