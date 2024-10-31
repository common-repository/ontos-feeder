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


class Parameters {

	private $host;
	private $login;
	private $password;
	private $ontology;

	private $token;
	private $jsonTags;
	private $entityTypes;

	private $highlightings;
	
	public function __construct($db_configuration=null,$token=null,$jsonTags=null,$entityTypes=null) {
		if ($db_configuration){
			$this->setHost($db_configuration['host']);
			$this->setLogin($db_configuration['login']);
			$this->setPassword($db_configuration['password']);
			$this->setOntology($db_configuration['ontology']);
			$this->setHighlightings($db_configuration['highlightings']);
		}
		if ($token)
			$this->setToken($token);
		if ($jsonTags)
			$this->setJsonTags($jsonTags);
		if ($entityTypes)
			$this->setEntityTypes($entityTypes);
		
		

	}
	
	public function getHost()					{	return $this->host;	}
	public function setHost($host)				{	$this->host=$host;	}
	public function getLogin()					{	return $this->login;	}
	public function setLogin($login)			{	$this->login=$login;	}
	public function getPassword()				{	return $this->password;	}
	public function setPassword($password)		{	$this->password=$password;	}
	public function getOntology()				{	return $this->ontology;	}
	public function setOntology($ontology)		{	$this->ontology=$ontology;	}

	public function getToken()					{	return $this->token;	}
	public function setToken($token)			{	$this->token=$token;	}
	public function getJsonTags()				{	return $this->jsonTags;	}
	public function setJsonTags($jsonTags)		{	$this->jsonTags=$jsonTags;	}
	public function getEntityTypes()			{	return $this->entityTypes;	}
	public function setEntityTypes($entityTypes){	$this->entityTypes=$entityTypes;	}

	public function getHighlightings()				{	return $this->highlightings;	}
	public function setHighlightings($highlightings){	$this->highlightings=$highlightings;	}
}
?>