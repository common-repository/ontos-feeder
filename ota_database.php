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

require_once 'core/constants.php';

function OTA_create_table_if_needed(){
	global $table_prefix, $wpdb;
	$ontos_table = $table_prefix . "ontos";
	if($wpdb->get_var("show tables like '$ontos_table'") != $ontos_table){


		$query = "CREATE TABLE `".$ontos_table."` (
					  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
					  `user` varchar(128) NOT NULL DEFAULT '',
					  `login` varchar(128) NOT NULL DEFAULT '',
					  `password` varchar(128) NOT NULL DEFAULT '',
					  `language` varchar(256) NOT NULL DEFAULT '',
					  `highlightings` varchar(256) NOT NULL DEFAULT '',
					  `entityTypes` varchar(512) NOT NULL DEFAULT 'person',
					  PRIMARY KEY (`id`),
					  UNIQUE KEY `id` (`id`),
					  UNIQUE KEY `user` (`user`),
					  KEY `idx_login` (`login`),
					  KEY `idx_user` (`user`)
				) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
		";
		$wpdb->query($query);
	}
}

function OTA_setConfiguration($login,$password, $language, $highlightings, $entityTypes){
	global $user_login;
	get_currentuserinfo();
	$userName = $user_login;

	global $table_prefix, $wpdb;
	$ontos_table = $table_prefix . "ontos";

	array_walk($entityTypes, create_function('&$i,$k','$i="$k=$i";'));
	$entityTypesCSV = implode(",",$entityTypes);
	
	$selectQuery = "select count(*) as userNumber from ".$ontos_table." where user='".$userName."'";
	$insertQuery = "insert into ".$ontos_table."(user,login,`password`,language,highlightings, entityTypes) values('".$userName."', '".$login."', '".$password."', '".$language."', '".$highlightings."', '".$entityTypesCSV."')";
	$updateQuery = "update ".$ontos_table." set `password`='".$password."',login='".$login."',language='".$language."',highlightings='".$highlightings."',entityTypes='".$entityTypesCSV."'  where user='".$userName."'";
	$result = $wpdb->get_results($selectQuery);
	$count=0;
	foreach($result as $row) {
		$count=$row->userNumber;
	}
	if ($count==0)
	{	
		$result = $wpdb->query($insertQuery);
		
	}else{
		$result = $wpdb->query($updateQuery);
	}
	return $result;
}

function OTA_getConfiguration(){
	global $table_prefix, $wpdb;
	$ontos_table = $table_prefix . "ontos";

	global $user_login;
	get_currentuserinfo();
	$user = $user_login;


	$selectQuery = "select * from ".$ontos_table." where user='".$user."'";
	$result = $wpdb->get_results($selectQuery);
	$configuration = null;
	foreach ($result as $row)
	{
		$entityTypes1 = explode(",",$row->entityTypes);
		foreach($entityTypes1 as $value1){
			$value2 = explode("=", $value1);
			if ($value2[1]!="0")
				$entityTypes[trim($value2[0])]=$value2[1];
		}
		$realEntityTypes=ota_getRealEntityTypes($entityTypes);
		
		$configuration=array("login"=>$row->login,"password"=>$row->password,"language"=>$row->language,"highlightings"=>$row->highlightings, "entityTypes"=>$entityTypes, "realEntityTypes"=>$realEntityTypes);
		if($configuration['language']==ONTOSMINER_LANGUAGE_ENGLISH) {
			$configuration['host'] = ONTOSMINER_HOST_ENGLISH;
			$configuration['ontology'] = ONTOSMINER_ONTOLOGY_ENGLISH;
		} else if($configuration['language']==ONTOSMINER_LANGUAGE_RUSSIAN) {
			$configuration['host'] = ONTOSMINER_HOST_RUSSIAN;
			$configuration['ontology'] = ONTOSMINER_ONTOLOGY_RUSSIAN;
		}
	}
	return $configuration;
}

function ota_getRealEntityTypes($entityTypes)
{
	$realEntityTypes = array();
	foreach($entityTypes as $entityType)
	{
		switch ($entityType)
		{
			case "person": array_push($realEntityTypes,OTA_MINER_ONTOLOGY_PERSON);break;
			case "location": array_push($realEntityTypes,OTA_MINER_ONTOLOGY_LOCATION);break;
			case "product": array_push($realEntityTypes,OTA_MINER_ONTOLOGY_PRODUCT);break;
			case "organisation": 
				foreach (OTA_MINER_ONTOLOGY_ORGANISATION() as $realOrganisationType)
				{	
					array_push($realEntityTypes,$realOrganisationType);
				}
				break;
			default:;
		};
	};
	return $realEntityTypes;
}
?>