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
require_once 'constants.php';

class OTA_Connection {
	private $logger;
	public function __construct() {
		$this->logger = Logger::getLogger('OTA_Connection');
	}

	public function get($host, $params){
		$this->logger->debug("get-request: ".$host.$params);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$host.$params);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_COOKIEFILE, OTA_DIR_COOKIE."/cookiefile");
		curl_setopt($ch, CURLOPT_COOKIEJAR, OTA_DIR_COOKIE."/cookiefile");
		curl_setopt($ch, CURLOPT_POST, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1" );
		$result = curl_exec($ch);

		$this->logger->debug("get-response: ".$result);
		
		curl_close($ch);
		return $result;
	}
	
	public function post($host, $params){
		$this->logger->debug("post-request: ".$host.$params);
		
		$ch = curl_init();
		$params = substr($params,1);
		curl_setopt($ch, CURLOPT_URL,$host);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_COOKIEFILE, OTA_DIR_COOKIE."/cookiefile");
		curl_setopt($ch, CURLOPT_COOKIEJAR, OTA_DIR_COOKIE."/cookiefile");
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 5.1; rv:1.7.3) Gecko/20041001 Firefox/0.10.1" );
		$result = curl_exec($ch);

		$this->logger->debug("post-response: ".$result);
		curl_close($ch);
		return $result;
	}
}