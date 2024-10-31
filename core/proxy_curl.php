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

class Proxy {
	private $logger;
	private $dbpedia_prefix="http://dbpedia.org/sparql?format=application/json&query=";

	public function __construct() {
		$this->logger = Logger::getLogger('Proxy');
	}

	public function process() {
		$this->logger->debug("Entering application");

	// raw request content
	//	$data = file_get_contents('php://input');
	
		if (isset($_POST['target']))
			$target = $_POST['target'];
		else if (isset($_GET['target']))
			$target = $_GET['target'];
		else $target = false;

		if (isset($_POST['query']))
			$proxy_url = $_POST['query'];
		else if (isset($_GET['query']))
			$proxy_url = $_GET['query'];
		else $proxy_url = false;

		$this->logger->debug("Target-Parameter:".$target);
		$this->logger->debug("Query-Parameter:".$proxy_url);

		$query = rawurlencode($proxy_url);

		if ($target) {
			$response = $this->processMinerRequest($target, $query);
		}
		else {
			$response = $this->processDBPediaRequest($this, $query);
		}

		$this->outputHTML($response);
	}

	private function outputHTML($repsonse){
		header("Content-Type: text/xml");
		echo $repsonse;
	}

	private function processMinerRequest($target, $query){
		$connection = new OTA_Connection();
		$response =$connection->post($target,"&query=".$query);
		return $response;
	}

	private function processDBPediaRequest($target, $query) {
		$connection = new OTA_Connection();
		$response =$connection->get($this->dbpedia_prefix, $query);
		return $response;
	}
}


Logger::configure('log4php.proxy.properties');
$proxy = new Proxy();
$proxy->process();

?>