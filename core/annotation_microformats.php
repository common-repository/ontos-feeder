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
// Microformats

// these constants are exported to the core client-side js (see the exportContstants function below)
// display:none alone works fine in FF, for hiding a span in the TinyMCE IFrame in IE we need additionally set position: absolute; width: 0px; height: 0px; overflow: hidden; styles.
define('OTA_HIGHLIGHTING_MF_1', '<span class="ota_highlighting vcard" id="%EID"><span class="type" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%TYPE</span><span class="uid" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%RESOURCE</span><span class="%PROPERTY">%CONTENTS</span></span>');
define('OTA_HIGHLIGHTING_MF_2', '<span class="ota_highlighting vcard" id="%EID"><span class="type" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%TYPE</span><span class="uid" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%RESOURCE</span><span class="adr"><span class="locality">%CONTENTS</span></span></span>');
define('OTA_HIGHLIGHTING_MF_3', '<span class="vcard" id="%EID"><span class="type" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%TYPE</span><span class="uid" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%RESOURCE</span><span class="%PROPERTY">%CONTENTS</span></span>');
define('OTA_HIGHLIGHTING_MF_4', '<span class="vcard" id="%EID"><span class="type" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%TYPE</span><span class="uid" style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">%RESOURCE</span><span class="adr"><span class="locality">%CONTENTS</span></span></span>');

// these are regexp to find ALL the annotations in the text and remove them before reannotating
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_1', '<span(\s*?)class="ota_highlighting vcard"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_2', '<span(\s*?)class="ota_highlighting vcard"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_3', '<span(\s*?)class="vcard"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_4', '<span(\s*?)class="vcard"(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');

define('OTA_HIGHLIGHTING_MF_FILTER_ALL_5', '<span(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)class="ota_highlighting vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_6', '<span(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)class="ota_highlighting vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_7', '<span(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)class="vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');
define('OTA_HIGHLIGHTING_MF_FILTER_ALL_8', '<span(\s*?)id="highlighted_EID-(\w*?)-(\w*?)"(\s*?)class="vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'13');

// these are regexp to find ONE specific annotation in the text and remove it
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_1', '<span(\s*?)class="ota_highlighting vcard"(\s*?)id="%EID"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_2', '<span(\s*?)class="ota_highlighting vcard"(\s*?)id="%EID"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_3', '<span(\s*?)class="vcard"(\s*?)id="%EID"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_4', '<span(\s*?)class="vcard"(\s*?)id="%EID"><span(\s*?)class="type"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">(\w*?)</span><span(\s*?)class="uid"(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');

define('OTA_HIGHLIGHTING_MF_FILTER_ONE_5', '<span(\s*?)id="%EID"(\s*?)class="ota_highlighting vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_6', '<span(\s*?)id="%EID"(\s*?)class="ota_highlighting vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_7', '<span(\s*?)id="%EID"(\s*?)class="vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="([\w\s]*?)">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');
define('OTA_HIGHLIGHTING_MF_FILTER_ONE_8', '<span(\s*?)id="%EID"(\s*?)class="vcard"><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="type">(\w*?)</span><span(\s*?)style="position: absolute; width: 0px; display: none; height: 0px; overflow: hidden;"(\s*?)class="uid">([-\w]*?)</span><span(\s*?)class="adr"><span(\s*?)class="locality">'.OTA_HIGHLIGHTING_SEPARATOR.'</span></span></span>'.OTA_HIGHLIGHTING_SEPARATOR.'11');

function exportHighlightingMicroformats(){
	$content = "
		// anntotation templates
		ota_highlighting_mf = new Array();
		ota_highlighting_mf['highlighting']='".OTA_HIGHLIGHTING_MF_1."';
		ota_highlighting_mf['location_highlighting']='".OTA_HIGHLIGHTING_MF_2."';
		ota_highlighting_mf['noHighlighting']='".OTA_HIGHLIGHTING_MF_3."';
		ota_highlighting_mf['location_noHighlighting']='".OTA_HIGHLIGHTING_MF_4."';
		
		// regular expressions to remove all annotations from text
		ota_highlighting_mf_filter_all = new Array();
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_1))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_2))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_3))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_4))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_5))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_6))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_7))."');
		ota_highlighting_mf_filter_all.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ALL_8))."');
				
		// regular expressions to remove a single specific annotation from text
		ota_highlighting_mf_filter_one = new Array();
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_1))."');
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_2))."');
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_3))."');
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_4))."');	
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_5))."');	
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_6))."');	
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_7))."');	
		ota_highlighting_mf_filter_one.push('".str_replace("\w","\\\w",str_replace("\s","\\\s",OTA_HIGHLIGHTING_MF_FILTER_ONE_8))."');	
	";
	return $content;
}

function getHighlightingMFTemplates(){
	$result = array(OTA_HIGHLIGHTING_MF_1,OTA_HIGHLIGHTING_MF_2,OTA_HIGHLIGHTING_MF_3,OTA_HIGHLIGHTING_MF_4);
	return $result;
}
function getHighlightingMFFilterAll(){
	$result = array(OTA_HIGHLIGHTING_MF_FILTER_ALL_1,OTA_HIGHLIGHTING_MF_FILTER_ALL_2,OTA_HIGHLIGHTING_MF_FILTER_ALL_3,OTA_HIGHLIGHTING_MF_FILTER_ALL_4,OTA_HIGHLIGHTING_MF_FILTER_ALL_5,OTA_HIGHLIGHTING_MF_FILTER_ALL_6,OTA_HIGHLIGHTING_MF_FILTER_ALL_7,OTA_HIGHLIGHTING_MF_FILTER_ALL_8);
	return $result;
}
function getHighlightingMFFilterOne(){
	$result = array(OTA_HIGHLIGHTING_MF_FILTER_ONE_1,OTA_HIGHLIGHTING_MF_FILTER_ONE_2,OTA_HIGHLIGHTING_MF_FILTER_ONE_3,OTA_HIGHLIGHTING_MF_FILTER_ONE_4,OTA_HIGHLIGHTING_MF_FILTER_ONE_5,OTA_HIGHLIGHTING_MF_FILTER_ONE_6,OTA_HIGHLIGHTING_MF_FILTER_ONE_7,OTA_HIGHLIGHTING_MF_FILTER_ONE_8);
	return $result;
}

?>