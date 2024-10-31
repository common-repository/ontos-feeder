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


// ---------------------------------- ANNOTATIONS ----------------------------------------------------
// RDFa

// ----------------------anntotation templates-----------------------------------------------------------------------------------------------
// highlighting
define('OTA_HIGHLIGHTING_RDFA_1', '<span class="ota_highlighting" id="%EID" typeof="%TYPE" resource="%RESOURCE" property="%PROPERTY">%CONTENTS</span>');
// no highlighting
define('OTA_HIGHLIGHTING_RDFA_2', '<span id="%EID" typeof="%TYPE" resource="%RESOURCE" property="%PROPERTY">%CONTENTS</span>');

// ----------------------these are regexp to find ALL the annotations in the text and remove them before reannotating------------------------

define('OTA_HIGHLIGHTING_RDFA_FILTER_ALL_0', '<div>'.OTA_HIGHLIGHTING_SEPARATOR.'</div>'.OTA_HIGHLIGHTING_SEPARATOR.'1');
// highlighting
define('OTA_HIGHLIGHTING_RDFA_FILTER_ALL_1', '<span(\s*?)class="ota_highlighting"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)typeof="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)property="([:\w]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'12');
define('OTA_HIGHLIGHTING_RDFA_FILTER_ALL_2', '<span(\s*?)property="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)typeof="([:\w]*?)"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)class="ota_highlighting">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'12');
// no highlighting
define('OTA_HIGHLIGHTING_RDFA_FILTER_ALL_3', '<span(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)typeof="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)property="([:\w]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_RDFA_FILTER_ALL_4', '<span(\s*?)property="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)typeof="([:\w]*?)"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');


// -----------------------these are regexp to find ONE specific annotation in the text and remove it------------------------------------------
// highlighting
define('OTA_HIGHLIGHTING_RDFA_FILTER_ONE_1', '<span(\s*?)class="ota_highlighting"(\s*?)id="%EID"(\s*?)typeof="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)property="([:\w]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'10');
define('OTA_HIGHLIGHTING_RDFA_FILTER_ONE_2', '<span(\s*?)property="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)typeof="([:\w]*?)"(\s*?)id="%EID"(\s*?)class="ota_highlighting">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'10');
// no highlighting
define('OTA_HIGHLIGHTING_RDFA_FILTER_ONE_3', '<span(\s*?)id="%EID"(\s*?)typeof="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)property="([:\w]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'9');
define('OTA_HIGHLIGHTING_RDFA_FILTER_ONE_4', '<span(\s*?)property="([:\w]*?)"(\s*?)resource="(\w*?):EID-(\w*?)"(\s*?)typeof="([:\w]*?)"(\s*?)id="%EID">'.OTA_HIGHLIGHTING_SEPARATOR.'</span>'.OTA_HIGHLIGHTING_SEPARATOR.'9');

function exportHighlightingRDFa(){
	$content = "
		// anntotation templates
		ota_highlighting_rdfa = new Array();
		ota_highlighting_rdfa['highlighting']='".OTA_HIGHLIGHTING_RDFA_1."';
		ota_highlighting_rdfa['noHighlighting']='".OTA_HIGHLIGHTING_RDFA_2."';
		
		// regular expressions to remove all annotations from the text
		ota_highlighting_rdfa_filter_all = new Array();
		ota_highlighting_rdfa_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ALL_0))."');
		ota_highlighting_rdfa_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ALL_1))."');
		ota_highlighting_rdfa_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ALL_2))."');
		ota_highlighting_rdfa_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ALL_3))."');
		ota_highlighting_rdfa_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ALL_4))."');

		// regular expressions to remove all annotations from the text
		ota_highlighting_rdfa_filter_one = new Array();
		ota_highlighting_rdfa_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ONE_1))."');
		ota_highlighting_rdfa_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ONE_2))."');
		ota_highlighting_rdfa_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ONE_3))."');
		ota_highlighting_rdfa_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_RDFA_FILTER_ONE_4))."');
	";
	
	return $content;
}

function getHighlightingRDFaTemplates(){
	$result = array(OTA_HIGHLIGHTING_RDFA_1,OTA_HIGHLIGHTING_RDFA_2);
	return $result;
}
function getHighlightingRDFaFilterAll(){
	$result = array(OTA_HIGHLIGHTING_RDFA_FILTER_ALL_0,OTA_HIGHLIGHTING_RDFA_FILTER_ALL_1,OTA_HIGHLIGHTING_RDFA_FILTER_ALL_2,OTA_HIGHLIGHTING_RDFA_FILTER_ALL_3,OTA_HIGHLIGHTING_RDFA_FILTER_ALL_4);
	return $result;
}
function getHighlightingRDFaFilterOne(){
	$result = array(OTA_HIGHLIGHTING_RDFA_FILTER_ONE_1,OTA_HIGHLIGHTING_RDFA_FILTER_ONE_2,OTA_HIGHLIGHTING_RDFA_FILTER_ONE_3,OTA_HIGHLIGHTING_RDFA_FILTER_ONE_4);
	return $result;
}

?>