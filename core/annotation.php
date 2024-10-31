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
 along with Ontos Feeder.  If not, see <http://www.gnu.org/licenses/>.
 */
define('OTA_HIGHLIGHTING_SEPARATOR','$$$$$');
 
require_once ("annotation_rdfa.php");
require_once ("annotation_microformats.php");


function exportHighlightingConstants($currentHighlightingMode){
	$content = exportHighlightingNamespaces();
	$content.= exportHighlightingModes($currentHighlightingMode);
	
	$content.= " 
	    // separator to split the regular expressions apart
		ota_highlighting_separator = '".OTA_HIGHLIGHTING_SEPARATOR."'";
		
	$content.= exportHighlightingRDFa().
	$content.= exportHighlightingMicroformats();
	return $content;
}

// these are namespaces for rdfa higlighting 
define('OTA_HIGHLIGHTING_NAMESPACE_DC', 'dc:');
define('OTA_HIGHLIGHTING_NAMESPACE_FOAF', 'foaf:');
define('OTA_HIGHLIGHTING_NAMESPACE_ONTOS_IDENTIFICATION', 'ontosid:');
define('OTA_HIGHLIGHTING_NAMESPACE_ONTOS_SOFA', 'sofa:');
define('OTA_HIGHLIGHTING_NAMESPACE_ONTOS_COMMON_ENGLISH', 'ontosci:');

define('OTA_HIGHLIGHTING_NAMESPACE_DC_FULL', 'http://purl.org/dc/elements/1.1/');
define('OTA_HIGHLIGHTING_NAMESPACE_FOAF_FULL', 'http://xmlns.com/foaf/0.1/');
define('OTA_HIGHLIGHTING_NAMESPACE_ONTOS_IDENTIFICATION_FULL', 'http://www.ontosearch.com/2008/01/identification#');
define('OTA_HIGHLIGHTING_NAMESPACE_ONTOS_SOFA_FULL', 'http://sofa.semanticweb.org/sofa/v1.0/system#');
define('OTA_HIGHLIGHTING_NAMESPACE_ONTOS_COMMON_ENGLISH_FULL', 'http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#');
function exportHighlightingNamespaces(){
	$content = "	
		ota_highlighting_namespace_dc='".OTA_HIGHLIGHTING_NAMESPACE_DC."';
		ota_highlighting_namespace_foaf='".OTA_HIGHLIGHTING_NAMESPACE_FOAF."';
		ota_highlighting_namespace_ontos_identification='".OTA_HIGHLIGHTING_NAMESPACE_ONTOS_IDENTIFICATION."';
		ota_highlighting_namespace_ontos_sofa='".OTA_HIGHLIGHTING_NAMESPACE_ONTOS_SOFA."';
		ota_highlighting_namespace_ontos_common_english='".OTA_HIGHLIGHTING_NAMESPACE_ONTOS_COMMON_ENGLISH."';
		
		ota_highlighting_namespace_dc_full='".OTA_HIGHLIGHTING_NAMESPACE_DC_FULL."';
		ota_highlighting_namespace_foaf_full='".OTA_HIGHLIGHTING_NAMESPACE_FOAF_FULL."';
		ota_highlighting_namespace_ontos_identification_full='".OTA_HIGHLIGHTING_NAMESPACE_ONTOS_IDENTIFICATION_FULL."';
		ota_highlighting_namespace_ontos_sofa_full='".OTA_HIGHLIGHTING_NAMESPACE_ONTOS_SOFA_FULL."';
		ota_highlighting_namespace_ontos_common_english_full='".OTA_HIGHLIGHTING_NAMESPACE_ONTOS_COMMON_ENGLISH_FULL."';
	";
	return $content;
}

define('ONTOSMINER_HIGHLIGHTINGS_NO','nothing');
define('ONTOSMINER_HIGHLIGHTINGS_RDFA','rdfa');
define('ONTOSMINER_HIGHLIGHTINGS_RDFA_HIGHLIGHTING','rdfa+highlighting');
define('ONTOSMINER_HIGHLIGHTINGS_RDFA_H_POPUP','rdfa+highlighting+popup');
define('ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS','microformats');
define('ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_HIGHLIGHTING','microformats+highlighting');
define('ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_H_POPUP','microformats+highlighting+popup');
define('ONTOSMINER_HIGHLIGHTINGS_DEFAULT',ONTOSMINER_HIGHLIGHTINGS_RDFA);
function exportHighlightingModes($currentHighlightingMode){
	$content = "			
		ota_miner_highlighting_mode='".$currentHighlightingMode."';
		ota_miner_highlighting_mode_no='".ONTOSMINER_HIGHLIGHTINGS_NO."';
		ota_miner_highlighting_mode_rdfa='".ONTOSMINER_HIGHLIGHTINGS_RDFA."';
		ota_miner_highlighting_mode_rdfaHighlighting='".ONTOSMINER_HIGHLIGHTINGS_RDFA_HIGHLIGHTING."';
		ota_miner_highlighting_mode_rdfaHighlightingPopup='".ONTOSMINER_HIGHLIGHTINGS_RDFA_H_POPUP."';
		ota_miner_highlighting_mode_microformats='".ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS."';
		ota_miner_highlighting_mode_microformatsHighlighting='".ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_HIGHLIGHTING."';
		ota_miner_highlighting_mode_microformatsHighlightingPopup='".ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_H_POPUP."';
	";
	return $content;
}
?>