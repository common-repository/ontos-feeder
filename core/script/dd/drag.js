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
 
function beginDrag(elementToDrag, event) {
	// Figure out where the element currently is
	// The element must have left and top CSS properties in a style attribute
	// Also, we assume they are set using pixel units
	var x = parseInt(elementToDrag.style.left);
	var y = parseInt(elementToDrag.style.top);

	// Compute the distance between that point and the mouse-click
	// The nested moveHandler function below needs these values
	var deltaX = event.clientX - x;
	var deltaY = event.clientY - y;

	// Register the event handlers that will respond to the mousemove
	// and mouseup events that follow this mousedown event. Note that
	// these are registered as capturing event handlers on the document.
	// These event handlers remain active while the mouse button remains
	// pressed and are removed when the button is released.

	if (!document.addEventListener) { // ie fix
		document.attachEvent("onmousemove", moveHandler);
		document.attachEvent("onmouseup", upHandler);
		event.cancelBuble = true;
	} else { // mozilla etc.
		document.addEventListener("mousemove", moveHandler, true);
		document.addEventListener("mouseup", upHandler, true);
		// We've handled this event. Don't let anybody else see it.
		event.stopPropagation();
		event.preventDefault();
	}

	/**
	 * This is the handler that captures mousemove events when an element is
	 * being dragged. It is responsible for moving the element.
	 */
	function moveHandler(event) {
		// Move the element to the current mouse position, adjusted as
		// necessary by the offset of the initial mouse-click
		elementToDrag.style.left = (event.clientX - deltaX) + "px";
		elementToDrag.style.top = (event.clientY - deltaY) + "px";

		if (!document.removeEventListener) { // ie fix
			event.cancelBuble = true;
		} else { // mozilla etc.
			// And don't let anyone else see this event
			event.stopPropagation();
		}
	}

	/**
	 * This is the handler that captures the final mouseup event that occurs at
	 * the end of a drag
	 */
	function upHandler(event) {

		if (!document.removeEventListener) { // ie fix
			document.detachEvent("onmousemove", moveHandler);
			document.detachEvent("onmouseup", upHandler);
			event.cancelBuble = true;
		} else { // mozilla etc.
			// Unregister the capturing event handlers
			document.removeEventListener("mouseup", upHandler, true);
			document.removeEventListener("mousemove", moveHandler, true);
			// And don't let the event propagate any further
			event.stopPropagation();
		}

	}
}