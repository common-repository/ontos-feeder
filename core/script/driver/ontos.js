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
 
// ONTOS Namespace
var ONTOS = {};

ONTOS.Miner = function() {
	var myself = this;

	this.getNumberOfDocuments = function(eid, token, onSuccess) {
		var jsonQuery = {
			get : 'docs', select : [ 'total' ], limit : 5 };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = ontosminer_host + "/api/ontology;jsessionid=" + token + "?entity=http://www.ontosearch.com/2008/01/identification%23" + eid;

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : onSuccess });

	};

	this.getDocuments = function(eid, token, onSuccess, onError) {
		var jsonQuery = {
			get : 'docs', select : [
					'total', {
						get : 'coll', select : {
							get : '0', select : [
									'url', 'title' ] } } ], limit : 5 };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = ontosminer_host + "/api/ontology;jsessionid=" + token + "?entity=http://www.ontosearch.com/2008/01/identification%23" + eid;

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : function(data) {
				if (data) {
					if (data.success) {
						if (data.result)
							onSuccess(data.result);
					} else
						onError("");
				} else
					onError("data is: " + data);
			}, error : function(data) {
				onError(data);
			} });

	};

	this.getStatusRole = function(eid, token, onSuccess, onError) {
		var propsWFoundHandler = function(data) {
			if (data["http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Status_Role"] != null)
				onSuccess(data["http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Status_Role"]);
			else
				onError("");
		};

		myself.getPropsW(eid, token, propsWFoundHandler, onError);

	};

	this.getPropsW = function(eid, token, onSuccess, onError) {

		var jsonQuery = {
			get : 'ent', uri : 'http://www.ontosearch.com/2008/01/identification%23' + eid, select : [ 'propsw' ] };

		var propsWFoundHandler = function(data) {
			if (data.propsw != null)
				onSuccess(data.propsw);
			else
				onError("");
		};

		myself.getData(eid, token, jsonQuery, propsWFoundHandler, onError);
	};

	this.getData = function(eid, token, jsonQuery, onSuccess, onError) {

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = ontosminer_host + "/api/ontology;jsessionid=" + token + "?query=" + query;

		jQuery.ajax( {
			url : path, dataType : 'jsonp',

			success : function(data) {
				if (data) {
					if (data.result)
						onSuccess(data.result);
					else
						onError("");
				} else
					onError("data is: " + data);
			}, error : function(data) {
				onError(data);
			} });

	};

	this.getVendorRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'Vendor');
	};

	this.getLocatesRepresentsRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'Locates_Represents');
	};

	this.getInteractionsRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'Interactions');
	};

	this.getMentionedByRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'MentionedBy');
	};

	this.getMentionsRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'Mentions');
	};
	this.getAffairsWithOrganisationsRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'Affairs_with_Organizations');
	};
	this.getAffairsWithPersonalitiesRelationship = function(eid, token, onSuccess) {
		this.getRelation(eid, token, onSuccess, 'Affairs_with_Personalities');
	};

	this.getRelation = function(eid, token, onSuccess, type) {
		var jsonQuery = {
			get : 'rels', direction : 'outgoing', threshhold : 0,

			select : [
					'total', {
						get : 'coll', select : [
								'type', 'mentions', {
									get : 'typeLabel', lang : 'EN' }, {
									get : 'to', select : [
											'id', 'label', 'type', {
												get : 'typeLabel', lang : 'EN' } ] } ] } ], offset : 0, limit : 20,
			relType : 'http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english%23' + type, subjects : [ 'http://www.ontosearch.com/2008/01/identification%23' + eid ], op : 'UNION' };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = ontosminer_host + "/api/ontology;jsessionid=" + token + "?";

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : onSuccess });

	};

};

ONTOS.Utils = function() {

	function entityWeightComparatorASC(entityA, entityB) {
		return entityA.weight - entityB.weight;
	}
	function entityWeightComparatorDESC(entityA, entityB) {
		return entityB.weight - entityA.weight;
	}

	function entityNameComparatorASC(entityA, entityB) {
		return entityA.name > entityB.name;
	}
	function entityNameComparatorDESC(entityA, entityB) {
		return entityB.name > entityA.name;
	}

	this.sortEntitiesByWeightDESC = function(entities) {
		entities.sort(entityWeightComparatorDESC);
		return entities;
	};

	this.sortEntitiesByNameASC = function(entities) {
		entities.sort(entityNameComparatorASC);
		return entities;
	};

	this.getEntitiesAsArray = function(tags, entityTypes, callback) {
		var entities = new Array();
		var _entityTypes = entityTypes.split(',');
		for (i = 0; i < _entityTypes.length; i++) {
			var entityType = _entityTypes[i];
			LOGGER.debug("LOOKUP Entities of Type:" + entityType);
			var entitiesOfParticularType = getDistinctEntities(tags, entityType);
			entities = entities.concat(entitiesOfParticularType);
			LOGGER.debug("LOOKUP Entities of Type:" + entityType + " RETURNED " + entitiesOfParticularType.length + " Entities");
			LOGGER.debug("TOTAL Entities found so far :" + entities.length);
		}

		getCleanNames(entities, callback);
	};

	// stores all entities of provided type in an array and returns it
	function getAllInstancesOfType(jsonTags, entityType) {
		var result = new Array();
		for ( var i = 0; i < jsonTags.result.length; i++) {
			var triple = jsonTags.result[i];
			LOGGER.debug("Found TRIPLE: triple.s=" + triple.s + ", triple.p=" + triple.p + ", triple.o=" + triple.o);
			if ((triple.p == ONTOSMINER_ONTOLOGY_INSTANCEOF) && (triple.o == entityType)) {
				LOGGER.debug("Found TRIPLE is a suitable ENTITY of Type " + entityType + "!");
				objects = triple.s.split("#");
				var object = objects[1];
				result[result.length] = {
					name : null, eid : object, type : entityType, start : null, end : null };
			}
		}
		return result;
	}

	// stores all entities in an array and returns it
	function getAllEntitiesWithPredicateOfType(jsonTags, entityType) {
		var result = new Array();
		for ( var i = 0; i < jsonTags.result.length; i++) {
			var triple = jsonTags.result[i];
			LOGGER.debug("Found TRIPLE: triple.s=" + triple.s + ", triple.p=" + triple.p + ", triple.o=" + triple.o);
			if ((triple.p == entityType)) {
				LOGGER.debug("Found TRIPLE is a suitable ENTITY of Type " + entityType + "!");
				objects = triple.s.split("#");
				var object = objects[1];

				result[result.length] = {
					name : null, eid : object, type : entityType, start : null, end : null };
			}
		}
		return result;
	}

	// returns the entity with the specified eid from an entity array
	function getEntity(result, eid) {
		for ( var i = 0; i < result.length; i++) {
			if (result[i].eid == eid)
				return result[i];
		}
		return null;
	}

	function insertAdditionalProperties(entities, jsonTags, properties) {
		for ( var i = 0; i < jsonTags.result.length; i++) {
			var triple = jsonTags.result[i];
			var eid = triple.s;
			eid = eid.split("#");
			eid = eid[1];
			var entity = getEntity(entities, eid);
			if (entity != null) {
				for ( var j = 0; j < properties.length; j++) {
					var property = properties[j];
					objects = triple.o.split(property.separator);
					var object = objects[1];
					if ((triple.p == property.type)) {
						LOGGER.debug("INSERTED name=" + object + " into entity={" + entity.eid + "}");
						if (entity[property.name]==null)
							entity[property.name] = new Array();
						entity[property.name].push(object);
					}
				}
			}
		}
	}

	// copies properties given by the "String[] matching.properties" from "from"
	// into "to"
	function copyProperties(to, from, matching) {
		for ( var i = 0; i < to.length; i++) {
			var target = to[i];
			for ( var j = 0; j < from.length; j++) {
				var source = from[j];
				if (target[matching.targetProperty] == source[matching.sourceProperty]) {
					for ( var k = 0; k < matching.properties.length; k++) {
						var property = matching.properties[k];
						if (target[property]==null)
							target[property] = source[property].slice();
						else
							target[property] = target[property].concat(source[property].slice());
						LOGGER.debug("PROPERTY name=" + property + " copied from entity=" + source + " into entity=" + target);
					}
				}
			}
		}
	}

	// removes Entities with an unset parameter
	function removeIllegalEntities(entities) {
		var cleanEntities = new Array();
		for ( var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			if ((entity.eid != null) && (entity.name != null) && (entity.start != null) && (entity.end != null))
				cleanEntities[cleanEntities.length] = entity;
		}
		return cleanEntities;
	}

	function getDistinctEntities(tags, entityType) {
		var names = entityType.split('#');
		var jsonTags;
		jsonTags = JSON.parse(tags, function(key, value) {
			return value;
		});

		LOGGER.debug("Collecting all Entities of Type " + entityType);
		var entities = getAllInstancesOfType(jsonTags, entityType);
		LOGGER.debug("Found " + entities.length + " Entities of Type " + entityType);
		LOGGER.debug("Collecting all Entities of Type " + ONTOSMINER_ONTOLOGY_ANNOTATION);
		var annotations = getAllEntitiesWithPredicateOfType(jsonTags, ONTOSMINER_ONTOLOGY_ANNOTATION);
		LOGGER.debug("Found " + annotations.length + " Entities of Type " + ONTOSMINER_ONTOLOGY_ANNOTATION);

		LOGGER.debug("Inserting start and stop Properties from mined Triples into Anntotations");
		insertAdditionalProperties(annotations, jsonTags, [
				{
					name : "entity", type : ONTOSMINER_ONTOLOGY_ANNOTATION, separator : "#" }, {
					name : "start", type : ONTOSMINER_ONTOLOGY_ANNOTATION_TEXTPOSITION_START, separator : '"' }, {
					name : "end", type : ONTOSMINER_ONTOLOGY_ANNOTATION_TEXTPOSITION_END, separator : '"' }

		]);

		LOGGER.debug("Inserting Property 'name' from Mined Triples into found Entities");
		insertAdditionalProperties(entities, jsonTags, [ {
			name : "name", type : ONTOSMINER_ONTOLOGY_LABEL_REL, separator : '"' } ]);

		LOGGER.debug("Copying Properties from Anntotations into found Entities");
		copyProperties(entities, annotations, {
			sourceProperty : "entity", targetProperty : "eid", properties : [
					"start", "end" ] });

		LOGGER.debug("Removing Entities that has empty properties");
		LOGGER.debug("Entities left: " + entities.length);
		return entities;
	}

	function getCleanNames(entities, callback) {
		var myEntities = new Array();
		var entitiesLength = entities.length;
		for ( var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var entityID = entity.eid;
			if (!entityID.startsWith("EID-")) {
				entity.weight = 0;
				myEntities.push(entity);
				LOGGER.debug("Added NON-EID-Entity id:" + entity.eid + ",savedEntity.name:" + entity.name + ", savedEntity.type:" + entity.type + ", savedEntity.weight: " + entity.weight);
				continue;
			}
			;

			var jsonQuery = {
				get : 'ent', uri : 'http://www.ontosearch.com/2008/01/identification%23' + entityID, select : [
						'label', {
							get : 'docs', select : [ 'total' ] } ] };

			var query = JSON.stringify(jsonQuery, function(key, value) {
				return value;
			});

			var path = ontosminer_host + "/api/ontology;jsessionid=" + token + "?query=" + query;

			jQuery.ajax( {
				url : path,
				dataType : 'jsonp',

				success : (function() {
					LOGGER.debug("Iteration i:" + i + ", query:" + query + ", label:" + entity.name);
					var savedEntity = entity;
					return function(data) {
						LOGGER.debug("Callback query:" + query + ", data:" + data + ", savedEntity.label:" + savedEntity.name);
						if (data)
							if (data.result)
								if (data.result['label']) {
									LOGGER.debug("Callback query:" + query + ", data.result:" + data.result['label']);
									savedEntity.name = data.result['label'];

									// set weight
									savedEntity.weight = 0;
									if (data.result.docs['total'])
										savedEntity.weight = data.result.docs['total'];

									LOGGER.debug("Callback savedEntity.id:" + savedEntity.eid + ",savedEntity.name:" + savedEntity.name + ", savedEntity.type:" + savedEntity.type
											+ ", savedEntity.weight: " + savedEntity.weight);

									myEntities.push(savedEntity);
									LOGGER.debug("Callback myEntities.length:" + myEntities.length);
									if (myEntities.length == entitiesLength) {
										LOGGER.debug("myEntities full :" + myEntities);
										callback(myEntities);
									}
								} else {
									// Kein gültiges Label, da
									// {"result":{},"success":true}
									entitiesLength--;
									LOGGER.debug("Callback result = {}, entitiesLength decreased:" + entitiesLength);
									if (myEntities.length == entitiesLength) {
										LOGGER.debug("myEntities full :" + myEntities);
										callback(myEntities);
									}
								}
					};
				})()});

			function red(data) {
			}
		}
		return myEntities;
	}
};
