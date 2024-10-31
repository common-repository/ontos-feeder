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
 
SPARQL.Sparqlizer = function(_host) {
	var host = _host;
	
	this.setup=function(){
		//Create a new SPARQL client object that will use the Space data SPARQL endpoint 
		var sparqler = new SPARQL.Service(host);
			
		//Define standard prefixes. If we set them on the SPARQL client object itself, then 
		//they will be reused for all queries. This means that we DON'T have to include 
		//PREFIX keywords in the query
		sparqler.setPrefix("dc", "http://purl.org/dc/elements/1.1/");
		sparqler.setPrefix("foaf", "http://xmlns.com/foaf/0.1/");
		sparqler.setPrefix("xsd", "http://www.w3.org/2001/XMLSchema#");
		sparqler.setPrefix("space", "http://purl.org/net/schemas/space/");
		sparqler.setPrefix("dbpedia-owl", "http://dbpedia.org/ontology/");
		sparqler.setPrefix("dbpedia-prop", "http://dbpedia.org/property/");
		sparqler.setPrefix("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
		sparqler.setPrefix("rdfs","http://www.w3.org/2000/01/rdf-schema#");
		
		//Do a GET request when performing the query, and request the results as JSON
		sparqler.setMethod("GET")
		sparqler.setOutput("json");

		return sparqler;
	}

	this.query=function(entityName, entityID, entityType, aQuery, onSuccess, onError){
		 var queryObject = this.setup().createQuery();
		 queryObject.selectValueHashes(
				aQuery, 
				{
					failure: function() {
						LOGGER.debug("sparqlizer failure:"+entityName+", entityID:"+entityID+", entityType:"+entityType+", aQuery:"+aQuery);
						onError(entityName,entityID, entityType, aQuery);
					},
					success: function(result){
						LOGGER.debug("sparqlizer success:"+entityName+", entityID:"+entityID+", entityType:"+entityType+", aQuery:"+aQuery+", result:"+result);
						if (result=="")
						  onError(entityName,entityID,entityType, aQuery);
						else
						  onSuccess(entityName,entityID,entityType, result);
					}
				}
			);		
		
	}
}
