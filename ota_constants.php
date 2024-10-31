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

//--------- CONSTANTS REQUIRED BY THE OTA CORE START -------------------------------------
$ota_basename = plugin_basename(__FILE__);
$ota_basename = explode("/",$ota_basename);
$ota_basename = $ota_basename[0];
define('OTA_URL',WP_PLUGIN_URL."/".$ota_basename.'/core');
define('OTA_REL_URL',"./wp-content/plugins/".$ota_basename.'/core');
//--------- CONSTANTS REQUIRED BY THE OTA CORE END -------------------------------------


define('OTA_TAGS',"OTA_tags");

define('OTA_BLOCK_NAME', "Ontos Feeder");
define('OTA_ERRORMESSAGE_NOCONTENT', 'No tags found');
define('OTA_DEFAULT_USERNAME','');
define('OTA_DEFAULT_PASSWORD','');
define('OTA_DEFAULT_ONTOLOGY','api.common.english');

?>