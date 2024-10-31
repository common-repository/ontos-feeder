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

/*
 *  add the getTags Button to the Toolbar
 */
/* init process for button control */

function OTA_addbuttons() {

	/* Don't bother doing this stuff if the current user lacks permissions */
	if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') )
	return;

	/* Add only in Rich Editor mode w/ Blog language ID set to English */
	if ( get_user_option('rich_editing') == 'true' ) {
		add_filter( 'mce_external_plugins', 'add_OTA_plugin' );
		add_filter( 'mce_buttons', 'register_OTA_gettags_button' );
	}
}


function add_OTA_plugin( $plugin_array ) {
	$plugin_array['OTA_getTagsButton'] = WP_PLUGIN_URL . '/ontos-feeder/tinymce/editor_plugin.js';
	return $plugin_array;
}

function register_OTA_gettags_button( $buttons ) {
	
	array_push( $buttons, 'separator', 'OTA_getTagsButton' );
	return $buttons;
}



add_action( 'init', 'OTA_addbuttons' );
?>