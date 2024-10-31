<?php
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
along with Ontos Topic Feeder.  If not, see <http://www.gnu.org/licenses/>.
*/

require_once("core/navigationwidget.php");

/* Use the admin_menu action to define the custom boxes */
add_action('admin_menu', 'ota_add_custom_box');

/* Adds a custom section to the "advanced" Post and Page edit screens */
function ota_add_custom_box() {
	if( function_exists( 'add_meta_box' )) {
		add_meta_box( 'ota_sectionid', __( 'Ontos Feeder', 'ota_textdomain' ),
                'ota_inner_custom_box', 'post', 'advanced' );
	} 
}

/* Prints the inner fields for the custom post/page section */
function ota_inner_custom_box() {
	$widget = new OTA_NavigationWidget();
	$content = $widget->renderNavigationWidget(OTA_URL);
	echo $content;
}
?>