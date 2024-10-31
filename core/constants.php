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

//--------- CONSTANTS REQUIRED BY THE OTA CORE START -------------------------------------
// these contstants must be provided by the (drupal || wordpress || ...) plugin integration code:
// OTA_URL - absolute URL of the core-folder
// OTA_REL_URL - relative URL of the core-folder
//--------- CONSTANTS REQUIRED BY THE OTA CORE END -------------------------------------

require_once ("annotation.php");

define('OTA_DIR_CORE',dirname(__file__));
define('OTA_DIR_COOKIE', OTA_DIR_CORE."/tmp");

// these constants are set by the plugin and used by the plugin integration code
define('OTA_SESSION_TAGS', "ota_session_tags");
define('OTA_TOKEN',"ota_token");


// ALL OF THE FOLLOWING constants are exported to the core client-side js (see the exportContstants function below)



//---------------------------------- ONTOLOGY --------------------------------------------------------------
define('ONTOSMINER_LANGUAGE_RUSSIAN','russian');
define('ONTOSMINER_LANGUAGE_ENGLISH','english');
define('ONTOSMINER_LANGUAGE_DEFAULT',ONTOSMINER_LANGUAGE_ENGLISH);


define('ONTOSMINER_HOST_ENGLISH','http://news.ontos.com');
define('ONTOSMINER_HOST_RUSSIAN','http://news.avicomp.ru');
define('ONTOSMINER_ONTOLOGY_ENGLISH','common.english');
define('ONTOSMINER_ONTOLOGY_RUSSIAN','common.russian');


// TODO: these should possibly be exported to the client-side js, so that no duplicate definition of these constants is made in the constants.js
define('OTA_MINER_ONTOLOGY_PERSON', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Person");
define('OTA_MINER_ONTOLOGY_LOCATION', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Location");
define('OTA_MINER_ONTOLOGY_CONFERENCE', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Conference");
define('OTA_MINER_ONTOLOGY_MASS_MEDIA', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Mass_Media");
define('OTA_MINER_ONTOLOGY_PARTY', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Party");
define('OTA_MINER_ONTOLOGY_GENERAL_ORGANISATION', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Organization");
define('OTA_MINER_ONTOLOGY_COMMERCIAL_ORGANISATION', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Commercial_Organization");
define('OTA_MINER_ONTOLOGY_STATE_ORGANISATION', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#State_Organization");
define('OTA_MINER_ONTOLOGY_MILITARY_ORGANISATION', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Military_Organization");
define('OTA_MINER_ONTOLOGY_EDUCATIONAL_ORGANISATION', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Educational_Organization");
define('OTA_MINER_ONTOLOGY_PLACE', "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Place");
define('OTA_MINER_ONTOLOGY_PRODUCT',"http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Product");

function OTA_MINER_ONTOLOGY_ORGANISATION(){
	$organisation = array(OTA_MINER_ONTOLOGY_GENERAL_ORGANISATION, OTA_MINER_ONTOLOGY_MASS_MEDIA,OTA_MINER_ONTOLOGY_PARTY,OTA_MINER_ONTOLOGY_COMMERCIAL_ORGANISATION,OTA_MINER_ONTOLOGY_STATE_ORGANISATION,OTA_MINER_ONTOLOGY_MILITARY_ORGANISATION,OTA_MINER_ONTOLOGY_EDUCATIONAL_ORGANISATION);
	return $organisation;
}


// --------------------------- Exporting Constants to JavaScript ---------------------------------------
function exportConstants($parameters){
	$content  = "<script language=\"javascript\">";
	$content .=	exportParameters($parameters);
	$content .= exportHighlightingConstants($parameters->getHighlightings());
	$content .= "</script>";
	return $content;
}

function exportParameters($parameters){
	$content =	"
		ota_miner_login='".$parameters->getLogin()."';
		ota_miner_password='".$parameters->getPassword()."';
		ontosminer_host='".$parameters->getHost()."';
	
		ota_miner_path='".$parameters->getHost()."';
		ontosminer_path='".OTA_REL_URL."';
		ota_path='".OTA_REL_URL."';
		ontosminer_full_path='".OTA_URL."';
		ota_full_path='".OTA_URL."';
		ota_full_path_img='".OTA_URL."/img';
		ontosminer_waitSymbol_path='".OTA_URL."/img';
		
		ota_entityTypes='".$parameters->getEntityTypes()."';
		ota_ontology='".$parameters->getOntology()."'; 
		tags=".json_encode($parameters->getJsonTags()).";
		token='".$parameters->getToken()."';";
	return $content;
}

require_once ('lib/log4php-2.0-incubation/Logger.php');
$rootLogger = Logger::getRootLogger();
$rootLogger->removeAllAppenders();
if (!$rootLogger->getAllAppenders()) {
	$rootLogger->setLevel(Level.DEBUG);
	$appender = new LoggerAppenderFile("MyAppender");
	$appenderlayout = new LoggerLayoutPattern();
	$appenderlayout->setConversionPattern("%d [%t] %-5p %c - %m%n");
	$appender->setFile(OTA_DIR_CORE."/log/ota.log",true);
	$appender->setLayout($appenderlayout);
	$appender->activateOptions();

	$rootLogger->addAppender($appender);
}



?>