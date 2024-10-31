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

require_once("core/rdfa.php");

function fb_change_mce_options($initArray) {
	// Comma separated string od extendes tags
	// Command separated string of extended elements
	// ORDERING IS IMPORTANT TO BE ABLE TO REMOVE THIS TAG BEFORE SENDING IT TO THE MINER
	// MUST MATCH EITHER OTA_HIGHLIGHTING_REGEXP1_PREFIX or OTA_HIGHLIGHTING_REGEXP2_PREFIX
	$ext = 'span[class|id|typeof|resource|property|style|href|rel]';

	if ( isset( $initArray['extended_valid_elements'] ) ) {
		$initArray['extended_valid_elements'] .= ',' . $ext;
	} else {
		$initArray['extended_valid_elements'] = $ext;
	}

	return $initArray;
}
add_filter('tiny_mce_before_init', 'fb_change_mce_options');


function OTA_init()
{
	// add RDFa only when an appropriate option is selected
	$configuration = OTA_getConfiguration();
	$opt_val_highlightings	= $configuration['highlightings'];
	if (
	($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_RDFA) ||
	($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_RDFA_HIGHLIGHTING) ||
	($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_RDFA_H_POPUP)
	)
	{
		ob_start('_ontosFeeder_rdfa_doctype');
	}
}

function _ontosFeeder_rdfa_doctype($buffer){
	return _ontosFeeder_addRdfaDoctype($buffer);
}

add_action( 'init', 'OTA_init' );
?>