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

// FREEBASE Namespace
var FREEBASE = {
		PERSON_TYPE: "&type=/people/person",
		ORGANISATION_TYPE: "&type=/organization/organization&type=/business/company",
		LOCATION_TYPE: "&type=/location/location",
		PRODUCT_TYPE: "&type=/business/consumer_product"
};

FREEBASE.Miner = function() {
	var myself = this;

	// -------------------- THUMBNAILS -----------------------------------------------------------------
	this.getProductThumbnailByName = function(entityName, onSuccess, onError) {
		this.getThumbnailByName(entityName, onSuccess, onError, FREEBASE.PRODUCT_TYPE);
	};

	this.getLocationThumbnailByName = function(entityName, onSuccess, onError) {
		this.getThumbnailByName(entityName, onSuccess, onError, FREEBASE.LOCATION_TYPE);
	};

	this.getOrganisationThumbnailByName = function(entityName, onSuccess, onError) {
		this.getThumbnailByName(entityName, onSuccess, onError, FREEBASE.ORGANISATION_TYPE);
	};

	this.getPersonThumbnailByName = function(entityName, onSuccess, onError) {
		this.getThumbnailByName(entityName, onSuccess, onError, FREEBASE.PERSON_TYPE);
	};


	this.getThumbnailByName = function(entityName, onSuccess, onError, entityType) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/common/topic/image" : [ {

				"id" : null } ] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/common/topic/image"][0].id);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, entityType, nameFoundHandler, onError);
	};

	// -------------------- HOMEPAGEs -----------------------------------------------------------------
	this.getPersonHomepageByName = function(entityName, onSuccess, onError) {
		this.getHomepageByName(entityName,onSuccess,onError, FREEBASE.PERSON_TYPE);
	};
	this.getOrganisationHomepageByName = function(entityName, onSuccess, onError) {
		this.getHomepageByName(entityName,onSuccess,onError, FREEBASE.ORGANISATION_TYPE);
	};
	this.getLocationHomepageByName = function(entityName, onSuccess, onError) {
		this.getHomepageByName(entityName,onSuccess,onError, FREEBASE.LOCATION_TYPE);
	};
	this.getHomepageByName = function(entityName, onSuccess, onError, type) {
		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id,  "/common/topic/webpage":[{uri:null}] }
			};

			var entityFoundHandler = function(data) {
				var result = data.result["/common/topic/webpage"];
				var uri = result[0].uri;
				if (uri)
					onSuccess(uri);
				else 
					onError("");
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, type, nameFoundHandler, onError);
	};

	this.getProductHomepageByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/common/topic/webpage" : [ {
					"/common/webpage/uri" : null, "sort" : "/common/webpage/uri", "limit" : 1 } ] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/common/topic/webpage"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.PRODUCT_TYPE, nameFoundHandler, onError);

	};
	// -------------------- AGE -----------------------------------------------------------------
	this.getPersonAgeByName = function(entityName, onSuccess, onError) {
		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/people/person/date_of_birth" : null }
			};

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/people/person/date_of_birth"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.PERSON_TYPE, nameFoundHandler, onError);
	};

	// -------------------- FOUNDATION DATE ----------------------------------------------------
	this.getCompanyFoundationDateByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/business/company/founded" : null, "/organization/organization/date_founded" : null } };

			var entityFoundHandler = function(data) {

				var companyFounded = data.result["/business/company/founded"];
				var organizationFounded = data.result["/organization/organization/date_founded"];
				if ((companyFounded) && (companyFounded != ""))
					onSuccess(companyFounded);
				else
					onSuccess(organizationFounded);

			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.ORGANISATION_TYPE, nameFoundHandler, onError);
	};

	// -------------------- STOCK EXCHANGE ----------------------------------------------------
	this.getCompanyStockMarketNameByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/business/company/ticker_symbol" : [ {
					"stock_exchange" : null, "ticker_symbol" : null } ] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/business/company/ticker_symbol"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.ORGANISATION_TYPE, nameFoundHandler, onError);
	};

	// -------------------- REVIEW ----------------------------------------------------
	this.getProductReviewByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/business/consumer_product/external_reviews" : [ {
					"/common/webpage/uri" : null, "limit" : 1 } ] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/business/consumer_product/external_reviews"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.PRODUCT_TYPE, nameFoundHandler, onError);

	};

	// -------------------- LIES IN ----------------------------------------------------
	this.getLocationContainedByByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/location/location/containedby" : null } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/location/location/containedby"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.LOCATION_TYPE, nameFoundHandler, onError);

	};

	// -------------------- AREA (km) ----------------------------------------------------
	this.getLocationAreaByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/location/location/area" : null } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/location/location/area"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.LOCATION_TYPE, nameFoundHandler, onError);

	};

	// -------------------- POPULATION ----------------------------------------------------
	this.getLocationPopulationByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/location/statistical_region/population" : [ {
					number : null, year : null, sort : "-year", limit : 1 } ] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/location/statistical_region/population"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.LOCATION_TYPE, nameFoundHandler, onError);

	};

	// -------------------- CAPITAL ----------------------------------------------------
	this.getLocationCapitalByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/location/country/capital" : null } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/location/country/capital"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.LOCATION_TYPE, nameFoundHandler, onError);

	};

	// -------------------- ORGANISATION HEADQUARTER's LOCATION -----------------------------
	this.getOrganisationLocationByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/organization/organization/headquarters":[{citytown:null}] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/organization/organization/headquarters"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.ORGANISATION_TYPE, nameFoundHandler, onError);

	};

	// -------------------- NYTIMES ----------------------------------------------------
	this.getLocationNYTimesArticleByName = function(entityName, onSuccess, onError) {
		this.getNYTimesArticleByName(entityName, onSuccess, onError, FREEBASE.LOCATION_TYPE);
	};

	this.getCompanyNYTimesArticleByName = function(entityName, onSuccess, onError) {
		this.getNYTimesArticleByName(entityName, onSuccess, onError, FREEBASE.ORGANISATION_TYPE);
	};

	this.getNYTimesArticleByName = function(entityName, onSuccess, onError, type) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "/common/topic/webpage" : [ {
					description : "New York Times", uri : null } ] } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result["/common/topic/webpage"]);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, type, nameFoundHandler, onError);

	};

	this.getPersonNYTimesArticleByName = function(entityName, onSuccess, onError) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "key" : {
					"namespace" : "/source/nytimes", "value" : null } } };

			var entityFoundHandler = function(data) {

				var url = (new UTILS.Strings()).cleanFreebaseResult(data.result.key.value);

				onSuccess("http://topics.nytimes.com/" + url);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, FREEBASE.PERSON_TYPE, nameFoundHandler, onError);

	};

	// -------------------- WIKIPEDIA ARTICLE ---------------------------------------------
	this.getPersonWikipediaArticleByName = function(entityName, onSuccess, onError) {
		this.getWikipediaArticleByName(entityName, onSuccess, onError, FREEBASE.PERSON_TYPE);
	};
	
	this.getOrganisationWikipediaArticleByName = function(entityName, onSuccess, onError) {
		this.getWikipediaArticleByName(entityName, onSuccess, onError, FREEBASE.ORGANISATION_TYPE);
	};

	this.getLocationWikipediaArticleByName = function(entityName, onSuccess, onError) {
		this.getWikipediaArticleByName(entityName, onSuccess, onError, FREEBASE.LOCATION_TYPE);
	};
	
	this.getProductWikipediaArticleByName = function(entityName, onSuccess, onError) {
		this.getWikipediaArticleByName(entityName, onSuccess, onError, FREEBASE.PRODUCT_TYPE);
	};

	this.getWikipediaArticleByName = function(entityName, onSuccess, onError, type) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "key" : {
					"namespace" : "/wikipedia/en_id", "value" : null } } };

			var entityFoundHandler = function(data) {

				var url = (new UTILS.Strings()).cleanFreebaseResult(data.result.key.value);

				onSuccess("http://en.wikipedia.org/wiki/index.html?curid=" + url);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);
		};

		this.searchName(entityName, type, nameFoundHandler, onError);

	};
	// -------------------- SOCIAL NETS ---------------------------------------------
	this.getPersonLinkedinLinkByName = function(entityName, onSuccess, onError) {
		this.getSocialLinkByName(entityName, onSuccess, onError, "linkedin", FREEBASE.PERSON_TYPE);
	};
	this.getPersonTwitterLinkByName = function(entityName, onSuccess, onError) {
		this.getSocialLinkByName(entityName, onSuccess, onError, "twitter", FREEBASE.PERSON_TYPE);
	};
	this.getPersonFacebookLinkByName = function(entityName, onSuccess, onError) {
		this.getSocialLinkByName(entityName, onSuccess, onError, "facebook", FREEBASE.PERSON_TYPE);
	};
	this.geOrganisationLinkedinLinkByName = function(entityName, onSuccess, onError) {
		this.getSocialLinkByName(entityName, onSuccess, onError, "linkedin", FREEBASE.ORGANISATION_TYPE);
	};
	this.getOrganisationTwitterLinkByName = function(entityName, onSuccess, onError) {
		this.getSocialLinkByName(entityName, onSuccess, onError, "twitter", FREEBASE.ORGANISATION_TYPE);
	};
	this.getOrganisationFacebookLinkByName = function(entityName, onSuccess, onError) {
		this.getSocialLinkByName(entityName, onSuccess, onError, "facebook", FREEBASE.ORGANISATION_TYPE);
	};

	this.getSocialLinkByName = function(entityName, onSuccess, onError, socialNetName, type) {

		var nameFoundHandler = function(data) {
			var eName = data.result[0];

			var jsonQuery = { "query" : {
				"id" : eName.id, "key" : {
					"namespace" : "/authority/" + socialNetName, "value" : null } } };

			var entityFoundHandler = function(data) {
				onSuccess(data.result.key.value);
			};

			myself.getByName(eName, jsonQuery, entityFoundHandler, onError);

		};

		this.searchName(entityName, type, nameFoundHandler, onError);
	};

	
	
	
	
	
	
	
	// -------------------- BASIC FUNCTIONS: SEARCH NAME, GET BY NAME -------------------
	this.searchName = function(entityName, type, onSuccess, onError) {
		var searchName = (new UTILS.Strings()).cleanFreebaseSearchName(entityName);
		var searchQuery = "http://www.freebase.com/api/service/search?limit=1&start=0&query=" + searchName + type + "&type_strict=any";
		jQuery.ajax( {
			url : searchQuery, dataType : 'jsonp',

			success : function(data) {
				if (data) {
					if (data.result[0])
						onSuccess(data);
					else
						onError("data.result[0] is: " + data.result[0]);
				} else
					onError("data is: " + data);
			}, error : function(data) {
				onError(data);
			} });
	};

	this.getByName = function(eName, jsonQuery, onSuccess, onError) {

		if (eName) {

			var query = JSON.stringify(jsonQuery, function(key, value) {
				return value;
			});

			var path = "http://www.freebase.com/api/service/mqlread?";

			jQuery.ajax( {
				url : path, dataType : 'jsonp', data : "query=" + query,

				success : function(data) {
					if (data) {
						if (data.result)
							onSuccess(data);
						else
							onError("");
					} else
						onError("data is: " + data);
				}, error : function(data) {
					onError(data);
				} });
		} else
			onError("eName undefined:" + eName);

	};

	
	
	
	
	
	
	
	
	// ----------------- simple methods, no searching for the entity by its name
	// is performed. Instead, the entity is directly specified by its freebase
	// id

	this.getNationality = function(entityName, onSuccess, onError) {
		var eName = "/en/" + (new UTILS.Strings()).cleanFreebaseName(entityName);
		var jsonQuery = { "query" : {
			"id" : eName, "/people/person/nationality" : [ { "name" : null } ] } };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = "http://www.freebase.com/api/service/mqlread?";

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : function(data) {
				if (data.result) {
					onSuccess(data.result["/people/person/nationality"][0].name);
				} else {
					onError("");
				}
			} });

	};

	/**
	 * method not currently used
	 */
	this.getCompanyFoundationDate = function(entityName, onSuccess, onError) {
		var eName = "/en/" + (new UTILS.Strings()).cleanFreebaseName(entityName);
		var jsonQuery = { "query" : {
			"id" : eName, "/business/company/founded" : null } };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = "http://www.freebase.com/api/service/mqlread?";

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : function(data) {
				onSuccess(data.result["/business/company/founded"]);
			} });

	};

	/**
	 * method not currently used
	 */
	this.getCompanyStockMarketName = function(entityName, onSuccess, onError) {
		var eName = "/en/" + (new UTILS.Strings()).cleanFreebaseName(entityName);
		var jsonQuery = { "query" : {
			"id" : eName, "/business/company/ticker_symbol" : [ {
				"stock_exchange" : null, "ticker_symbol" : null } ] } };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = "http://www.freebase.com/api/service/mqlread?";

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : function(data) {
				onSuccess(data.result["/business/company/ticker_symbol"]);
			} });

	};

	/**
	 * method not currently used
	 */
	this.getCompanyNYTimesArticle = function(entityName, onSuccess, onError) {
		var eName = "/en/" + (new UTILS.Strings()).cleanFreebaseName(entityName);
		var jsonQuery = { "query" : {
			"id" : eName, "/common/topic/webpage" : [ {
				description : "New York Times", uri : null } ] } };

		var query = JSON.stringify(jsonQuery, function(key, value) {
			return value;
		});

		var path = "http://www.freebase.com/api/service/mqlread?";

		jQuery.ajax( {
			url : path, dataType : 'jsonp', data : "query=" + query,

			success : function(data) {
				if (data.result)
					onSuccess(data.result["/common/topic/webpage"]);
				else
					onError("");
			}, error : function(xhr, textStatus, errorThrown) {
				alert(errorThrown);
			} });

	};
};