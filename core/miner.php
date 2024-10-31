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

require_once ('lib/log4php-2.0-incubation/Logger.php');
require_once 'connection.php';
require_once 'constants.php';


class OTA_Miner {
	private $logger;
	private $connection;

	public function __construct() {
		$this->logger = Logger::getLogger('OTA_Miner');
		$this->connection = new OTA_Connection();
	}

	public function getTags($login, $password, $ontology, $host, $text){
		$this->login($host, $login, $password);
		$tags = $this->parseText($host, $ontology,$text);
		return $tags;
	}

	private function login($host, $login, $password) {
		$query = "/token?j_username=".$login."&j_password=".$password;
		$this->logger->debug('Query: '.$host.$query);
		$token = $this->connection->get($host,$query);
		$_SESSION[OTA_TOKEN]=$token;
	}



	private function removeCRLF(&$text){
		$text = preg_replace("/\n/","",$text);
		$text = preg_replace("/\r/","",$text);
	}

	private function removeHighlightings(&$text){
		$expressions = array_merge(getHighlightingRDFaFilterAll(),getHighlightingMFFilterAll());
		for($i=0; $i < count($expressions); $i++)
		{
			$this->removeHighlighting($text, $expressions[$i]);
		}
	}
	private function removeHighlighting(&$text, $expression){
		$parts = explode(OTA_HIGHLIGHTING_SEPARATOR,$expression);
		$prefix = $parts[0];
		$suffix = $parts[1];
		$index = $parts[2];
		
		$escaped_prefix = str_replace('/','\/',$prefix);
		$escaped_suffix = str_replace('/','\/',$suffix);
		$expr = "/".$escaped_prefix."([-\w\s.,']*?)".$escaped_suffix."/s";
		$found = preg_match($expr,$text,$matches);
		if ($found)
		{
			$text  = preg_replace($expr,"\${".$index."}",$text);
			$this->logger->debug('HIGHLIGHTINGs Removed. Non-highlighted Text: '+$text);
		}
		else
		$this->logger->debug('HIGHLIGHTINGs not found. Non-highlighted Text: '+$text);

	}

	private function parseText($host, $ontology,$text){
		// need to remove CRs and/or LFs because every WYSIWYG editor formats new lines differently
		$this->removeCRLF($text);
		$this->removeHighlightings($text);

		$jsonQuery=json_encode (
		array(
		"get" => "process",
		"ontology" => $ontology,
		"format" => "NTRIPLES",
		"text" => $text)
		);
		$result = $this->runQuery($host,"miner", $jsonQuery, "writeObjects");

		return $result;
	}

	private function runQuery($host, $module, $query, $callback) {

		$host = $host.'/api/miner;jsessionid='.$_SESSION[OTA_TOKEN];
		$urlencoded = rawurlencode($query);

		$this->logger->debug('Query: '.$host.'?query='.$query);
		$this->logger->debug('URLEncoded Query: '.$host.'?query='.$urlencoded);

		$params = '?query='.$urlencoded;

		return $this->connection->post($host,$params);
	}
}