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

var TASKS = {

MAPPINGS :

{

	// person
	FREEBASE_PERSON_THUMBNAIL_TASK : {
		taskName : "freebase_person_thumbnail_task", label : "ontos_dbpedia", caption : "Freebase Thumbnail" },

	FREEBASE_PERSON_NATIONALITY_TASK : {
		taskName : "freebase_person_nationality_task", label : "ontosminer_popup_nationality", caption : "Nationality" },

	FREEBASE_PERSON_NYT_ARTICLE_TASK : {
		taskName : "freebase_person_nyt_article_task", label : "ontosminer_popup_NYTimesWebsite", caption : "New York Times Article" },

	FREEBASE_PERSON_TWITTER_TASK : {
		taskName : "freebase_person_twitter_task", label : "ontosminer_popup_twitter", caption : "Twitter" },

	FREEBASE_PERSON_FACEBOOK_TASK : {
		taskName : "freebase_person_facebook_task", label : "ontosminer_popup_facebook", caption : "Facebook" },

	FREEBASE_PERSON_LINKEDIN_TASK : {
		taskName : "freebase_person_linkedin_task", label : "ontosminer_popup_linkedin", caption : "LinkedIn" },

	WIKIPEDIA_PERSON_THUMBNAIL_TASK : {
		taskName : "wikipedia_person_thumbnail_task", label : "ontos_dbpedia", caption : "Wikipedia Thumbnail" },

	WIKIPEDIA_PERSON_NATIONALITY_TASK : {
		taskName : "wikipedia_person_nationality_task", label : "ontosminer_popup_nationality", caption : "Nationality" },

	FREEBASE_PERSON_AGE_TASK : {
		taskName : "freebase_person_age_task", label : "ontosminer_popup_age", caption : "Age" },

	WIKIPEDIA_PERSON_AGE_TASK : {
		taskName : "wikipedia_person_age_task", label : "ontosminer_popup_age", caption : "Age" },

	WIKIPEDIA_PERSON_WIKIPEDIAPAGE_TASK : {
		taskName : "wikipedia_person_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	FREEBASE_PERSON_WIKIPEDIAPAGE_TASK : {
		taskName : "freebase_person_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	FREEBASE_PERSON_HOMEPAGE_TASK : {
		taskName : "freebase_person_homepage_task", label : "ontosminer_popup_homepage", caption : "Homepage" },

	WIKIPEDIA_PERSON_HOMEPAGE_TASK : {
		taskName : "wikipedia_person_homepage_task", label : "ontosminer_popup_homepage", caption : "Homepage" },

	// organsation
	FREEBASE_ORGANISATION_THUMBNAIL_TASK : {
		taskName : "freebase_organisation_thumbnail_task", label : "ontos_dbpedia", caption : "Freebase Thumbnail" },

	FREEBASE_ORGANISATION_FOUNDATION_DATE_TASK : {
		taskName : "freebase_organisation_foundation_date_task", label : "ontosminer_popup_foundationDate", caption : "Foundation Date" },

	FREEBASE_ORGANISATION_STOCK_MARKETS_TASK : {
		taskName : "freebase_organisation_stock_markets_task", label : "ontosminer_popup_stockMarket_name", caption : "Stock Market Tickers" },

	FREEBASE_ORGANISATION_NYT_ARTICLE_TASK : {
		taskName : "freebase_organisation_nyt_article_task", label : "ontosminer_popup_NYTimesWebsite", caption : "New York Times Artcle" },

	FREEBASE_ORGANISATION_TWITTER_TASK : {
		taskName : "freebase_organisation_twitter_task", label : "ontosminer_popup_twitter", caption : "Twitter" },

	FREEBASE_ORGANISATION_FACEBOOK_TASK : {
		taskName : "freebase_organisation_facebook_task", label : "ontosminer_popup_facebook", caption : "Facebook" },

	FREEBASE_ORGANISATION_LINKEDIN_TASK : {
		taskName : "freebase_organisation_linkedin_task", label : "ontosminer_popup_linkedin", caption : "LinkedIn" },

	WIKIPEDIA_ORGANISATION_WIKIPEDIAPAGE_TASK : {
		taskName : "wikipedia_organisation_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	FREEBASE_ORGANISATION_WIKIPEDIAPAGE_TASK : {
		taskName : "freebase_organisation_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	WIKIPEDIA_ORGANISATION_HOMEPAGE_TASK : {
		taskName : "wikipedia_organisation_homepage_task", label : "ontosminer_popup_homepage", caption : "Homepage" },

	WIKIPEDIA_ORGANISATION_LOCATION_TASK : {
		taskName : "wikipedia_organisation_location_task", label : "ontosminer_popup_orgaionsation_location", caption : "Location" },

	FREEBASE_ORGANISATION_LOCATION_TASK : {
		taskName : "freebase_organisation_location_task", label : "ontosminer_popup_orgaionsation_location", caption : "Location" },

	WIKIPEDIA_ORGANISATION_THUMBNAIL_TASK : {
		taskName : "wikipedia_organisation_thumbnail_task", label : "ontos_dbpedia", caption : "Wikipedia Thumbnail" },

	FREEBASE_ORGANISATION_HOMEPAGE_TASK : {
		taskName : "freebase_organisation_homepage_task", label : "ontosminer_popup_homepage", caption : "Homepage" },

	// location
	FREEBASE_LOCATION_THUMBNAIL_TASK : {
		taskName : "freebase_location_thumbnail_task", label : "ontos_dbpedia", caption : "Freebase Thumbnail" },

	WIKIPEDIA_LOCATION_THUMBNAIL_TASK : {
		taskName : "wikipedia_location_thumbnail_task", label : "ontos_dbpedia", caption : "Wikipedia Thumbnail" },

	WIKIPEDIA_LOCATION_WIKIPEDIAPAGE_TASK : {
		taskName : "wikipedia_location_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	WIKIPEDIA_LOCATION_HOMEPAGE_TASK : {
		taskName : "wikipedia_location_homepage_task", label : "ontosminer_location_homepage", caption : "Homepage" },

	FREEBASE_LOCATION_NYT_ARTICLE_TASK : {
		taskName : "freebase_location_nyt_article_task", label : "ontosminer_popup_NYTimesWebsite", caption : "New York Times Artcle" },

	FREEBASE_LOCATION_CAPITAL_TASK : {
		taskName : "freebase_location_capital_task", label : "ontosminer_popup_capital", caption : "the Capital" },

	FREEBASE_LOCATION_POPULATION_TASK : {
		taskName : "freebase_location_population_task", label : "ontosminer_popup_population", caption : "the Ppopulation" },

	FREEBASE_LOCATION_AREA_TASK : {
		taskName : "freebase_location_area_task", label : "ontosminer_popup_area", caption : "the Area" },

	FREEBASE_LOCATION_CONTAINEDBY_TASK : {
		taskName : "freebase_location_containedby_task", label : "ontosminer_popup_container", caption : "the Containment" },

	FREEBASE_LOCATION_WIKIPEDIAPAGE_TASK : {
		taskName : "freebase_location_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	FREEBASE_LOCATION_HOMEPAGE_TASK : {
		taskName : "freebase_location_homepage_task", label : "ontosminer_popup_homepage", caption : "Homepage" },

	// product
	WIKIPEDIA_PRODUCT_THUMBNAIL_TASK : {
		taskName : "wikipedia_product_thumbnail_task", label : "ontos_dbpedia", caption : "Wikipedia Thumbnail" },

	FREEBASE_PRODUCT_THUMBNAIL_TASK : {
		taskName : "freebase_product_thumbnail_task", label : "ontos_dbpedia", caption : "Freebase Thumbnail" },

	FREEBASE_PRODUCT_REVIEW_TASK : {
		taskName : "freebase_product_review_task", label : "ontosminer_popup_productReview", caption : "Review" },

	FREEBASE_PRODUCT_HOMEPAGE_TASK : {
		taskName : "freebase_product_homepage_task", label : "ontosminer_popup_homepage", caption : "Homepage" },

	FREEBASE_PRODUCT_WIKIPEDIAPAGE_TASK : {
		taskName : "freebase_product_wikipediapage_task", label : "ontosminer_popup_wikipediapage", caption : "Wikipedia Article" },

	// ontos
	ONTOS_DOCUMENTS_TASK : {
		taskName : "ontos_documents_task", label : "ontos_documents", caption : "Ontos Articles" },

	ONTOS_STATUS_ROLE_TASK : {
		taskName : "ontos_status_role_task", label : "ontos_status_role", caption : "Ontos Tags" },

	ONTOS_RELATIONS_2_PERSON_TASK : {
		taskName : "ontos_relations-2-person_task", label : "ontos_relations_person", caption : "Persons" },

	ONTOS_RELATIONS_2_ORGANISATION_TASK : {
		taskName : "ontos_relations-2-organisation_task", label : "ontos_relations_organisation", caption : "Organisations" },

	ONTOS_REPORT_TASK : {
		taskName : "ontos_report_task", label : "ontos_report", caption : "Ontos Report" }

}

};

TASKS.TaskLabelIDProvider = function(taskMapping) {
	return (new UTILS.Strings()).cleanName(taskMapping.label);
};
TASKS.TaskIconIDProvider = function(taskMapping) {
	return (new UTILS.Strings()).cleanName(taskMapping.label) + "_img";
};
TASKS.TaskLabelCaptionProvider = function(taskMapping) {
	return taskMapping.caption;
};
TASKS.TaskDivIDProvider = function(taskMapping) {
	return (new UTILS.Strings()).cleanName(taskMapping.label) + "_div";
};
