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
 
function restoreWikipediaSummary(tasks) {
	jQuery.each(tasks, function(index, task) {
		task.restoreLastValue();
	});
}

function getAjaxLinks(tasks) {

	jQuery.each(tasks, function(index, task) {
		task.run();
	});

}


function createTasks(entityType, entityName, eid, token) {
	var tasks = new Array();

	// empty groups
	GROUPS.SUMMARY.resetCounter();
	GROUPS.RELATIONS.resetCounter();
	GROUPS.DOCUMENTS.resetCounter();
	GROUPS.WEBSITES.resetCounter();
	GROUPS.SOCIALNETS.resetCounter();
	
	var osRelationsToPersonRelationsTask = new TASKS.PersonRelationsTask(eid, entityType, token);
	var osRelationToOrganisationsTask = new TASKS.OrganisationRelationsTask(eid, entityType, token);
	GROUPS.RELATIONS.registerAtTask(osRelationsToPersonRelationsTask);
	GROUPS.RELATIONS.registerAtTask(osRelationToOrganisationsTask);
	tasks.push(osRelationsToPersonRelationsTask);
	tasks.push(osRelationToOrganisationsTask);
	
	var osDocumentsTask = new TASKS.OntosDocumentsTask(entityName, eid, token);
	GROUPS.DOCUMENTS.registerAtTask(osDocumentsTask);
	var osReportTask = new TASKS.OntosReportTask(entityName, eid);
	GROUPS.WEBSITES.registerAtTask(osReportTask);
	tasks.push(osDocumentsTask);
	tasks.push(osReportTask);
	
	if (UTILS.Types.isPerson(entityType)) {
		// generating tasks 
		var wpPersonNationalityTask = new TASKS.WikipediaPersonNationalityTask(entityName);
		var fbPersonNationalityTask = new TASKS.FreebasePersonNationalityTask(entityName);
		
		var fbPersonNYTimesArticleTask = new TASKS.FreebasePersonNYTimesArticleTask(entityName);
		var fbPersonTwitterTask = new TASKS.FreebasePersonTwitterTask(entityName);
		var fbPersonFacebookTask = new TASKS.FreebasePersonFacebookTask(entityName);
		var fbPersonLinkedinTask = new TASKS.FreebasePersonLinkedinTask(entityName);

		
		var wpPersonWikipediaPageTask = new TASKS.WikipediaPersonWikipediaPageTask(entityName);
		var fbPersonWikipediaPageTask = new TASKS.FreebasePersonWikipediaPageTask(entityName);
		var wpPersonHomepageTask = new TASKS.WikipediaPersonHomepageTask(entityName);
		var fbPersonHomepageTask = new TASKS.FreebasePersonHomepageTask(entityName);
		
		
		var wpPersonAgeTask = new TASKS.WikipediaPersonAgeTask(entityName);
		var fbPersonAgeTask = new TASKS.FreebasePersonAgeTask(entityName);
		var osStatusRoleTask = new TASKS.OntosStatusRoleTask(entityName, eid, token);

		// setting tasks dependencies
		wpPersonNationalityTask.nextTask = fbPersonNationalityTask;
		wpPersonAgeTask.nextTask = fbPersonAgeTask;
		wpPersonHomepageTask.nextTask = fbPersonHomepageTask;
		wpPersonWikipediaPageTask.nextTask = fbPersonWikipediaPageTask;
		
		// binding groups to listen to tasks responses
		GROUPS.SUMMARY.registerAtTask(osStatusRoleTask);
		GROUPS.SUMMARY.registerAtTask(wpPersonNationalityTask);
		GROUPS.SUMMARY.registerAtTask(wpPersonAgeTask);
		
		
		
		GROUPS.WEBSITES.registerAtTask(wpPersonWikipediaPageTask);
		GROUPS.WEBSITES.registerAtTask(wpPersonHomepageTask);
		GROUPS.WEBSITES.registerAtTask(fbPersonNYTimesArticleTask);
		
		GROUPS.SOCIALNETS.registerAtTask(fbPersonTwitterTask);
		GROUPS.SOCIALNETS.registerAtTask(fbPersonFacebookTask);
		GROUPS.SOCIALNETS.registerAtTask(fbPersonLinkedinTask);
		
		// putting taks in an array
		tasks.push(wpPersonNationalityTask);
		tasks.push(wpPersonAgeTask);
		tasks.push(wpPersonWikipediaPageTask);
		tasks.push(wpPersonHomepageTask);
		tasks.push(fbPersonNYTimesArticleTask);
		tasks.push(fbPersonTwitterTask);
		tasks.push(fbPersonFacebookTask);
		tasks.push(fbPersonLinkedinTask);
		tasks.push(osStatusRoleTask);
	}

	else if (UTILS.Types.isOrganisation(entityType)) {
		// generating tasks 
		var fbOrganisationFoundationDateTask = new TASKS.FreebaseCompanyFoundationDateTask(entityName);
		var fbOrganisationStockMarketsTask = new TASKS.FreebaseCompanyStockMarketNameTask(entityName);
		var fbOrganisationNYTimesArticleTask = new TASKS.FreebaseCompanyNYTimesArticleTask(entityName);
		var osStatusRoleTask = new TASKS.OntosStatusRoleTask(entityName, eid, token);

		
		
		var wpOragnisationWikipediaPageTask = new TASKS.WikipediaOrganisationWikipediaPageTask(entityName);
		var fbOragnisationWikipediaPageTask = new TASKS.FreebaseOrganisationWikipediaPageTask(entityName);
		var wpOrganisationHomepageTask = new TASKS.WikipediaOrganisationHomepageTask(entityName);
		var fbOrganisationHomepageTask = new TASKS.FreebaseOrganisationHomepageTask(entityName);
		var wpOrganisationLocationTask = new TASKS.WikipediaOrganisationLocationTask(entityName);
		var fbOrganisationLocationTask = new TASKS.FreebaseOrganisationLocationTask(entityName);
		
		var fbOrganisationTwitterTask = new TASKS.FreebaseOrganisationTwitterTask(entityName);
		var fbOrganisationFacebookTask = new TASKS.FreebaseOrganisationFacebookTask(entityName);
		var fbOrganisationLinkedinTask = new TASKS.FreebaseOrganisationLinkedinTask(entityName);

		// setting tasks dependencies
		wpOragnisationWikipediaPageTask.nextTask = fbOragnisationWikipediaPageTask;
		wpOrganisationHomepageTask.nextTask = fbOrganisationHomepageTask;
		wpOrganisationLocationTask.nextTask = fbOrganisationLocationTask;
		
		// binding groups to listen to tasks responses
		GROUPS.SUMMARY.registerAtTask(osStatusRoleTask);
		GROUPS.SUMMARY.registerAtTask(fbOrganisationFoundationDateTask);
		GROUPS.SUMMARY.registerAtTask(fbOrganisationStockMarketsTask);
		GROUPS.SUMMARY.registerAtTask(wpOrganisationLocationTask);
			
		GROUPS.WEBSITES.registerAtTask(wpOragnisationWikipediaPageTask);
		GROUPS.WEBSITES.registerAtTask(wpOrganisationHomepageTask);
		GROUPS.WEBSITES.registerAtTask(fbOrganisationNYTimesArticleTask);
		
		
		GROUPS.SOCIALNETS.registerAtTask(fbOrganisationTwitterTask);
		GROUPS.SOCIALNETS.registerAtTask(fbOrganisationFacebookTask);
		GROUPS.SOCIALNETS.registerAtTask(fbOrganisationLinkedinTask);

		// putting taks in an array
		tasks.push(fbOrganisationFoundationDateTask);
		tasks.push(wpOragnisationWikipediaPageTask);
		tasks.push(wpOrganisationHomepageTask);
		tasks.push(wpOrganisationLocationTask);
		tasks.push(fbOrganisationStockMarketsTask);
		tasks.push(fbOrganisationNYTimesArticleTask);
		tasks.push(fbOrganisationTwitterTask);
		tasks.push(fbOrganisationFacebookTask);
		tasks.push(fbOrganisationLinkedinTask);
		tasks.push(osStatusRoleTask);
	}
	
	else if (UTILS.Types.isLocation(entityType)) {
		var wpLocationWikipediaPageTask = new TASKS.WikipediaLocationWikipediaPageTask(entityName);
		var fbLocationWikipediaPageTask = new TASKS.FreebaseLocationWikipediaPageTask(entityName);
		var wpLocationHomepageTask = new TASKS.WikipediaLocationHomepageTask(entityName);
		var fbLocationHomepageTask = new TASKS.FreebaseLocationHomepageTask(entityName);
		var fbLocationNYTimesArticleTask = new TASKS.FreebaseLocationNYTimesArticleTask(entityName);
		var fbLocationCapitalTask = new TASKS.FreebaseLocationCapitalTask(entityName);
		var fbLocationPopulationTask = new TASKS.FreebaseLocationPopulationTask(entityName);
		var fbLocationAreaTask = new TASKS.FreebaseLocationAreaTask(entityName);
		var fbLocationContainedByTask = new TASKS.FreebaseLocationContainedByTask(entityName);

		// setting tasks dependencies
		wpLocationWikipediaPageTask.nextTask = fbLocationWikipediaPageTask;
		wpLocationHomepageTask.nextTask = fbLocationHomepageTask;
		
		GROUPS.WEBSITES.registerAtTask(wpLocationWikipediaPageTask);
		GROUPS.WEBSITES.registerAtTask(wpLocationHomepageTask);
		GROUPS.WEBSITES.registerAtTask(fbLocationNYTimesArticleTask);
		GROUPS.SUMMARY.registerAtTask(fbLocationCapitalTask);
		GROUPS.SUMMARY.registerAtTask(fbLocationContainedByTask);
		GROUPS.SUMMARY.registerAtTask(fbLocationPopulationTask);
		GROUPS.SUMMARY.registerAtTask(fbLocationAreaTask);
		
		tasks.push(wpLocationWikipediaPageTask);
		tasks.push(wpLocationHomepageTask);
		tasks.push(fbLocationNYTimesArticleTask);
		tasks.push(fbLocationCapitalTask);
		tasks.push(fbLocationPopulationTask);
		tasks.push(fbLocationAreaTask);
		tasks.push(fbLocationContainedByTask);
	}
	
	else if (UTILS.Types.isProduct(entityType)) {
		var fbProductWikipediaPageTask = new TASKS.FreebaseProductWikipediaPageTask(entityName);
		var fbProductReviewTask = new TASKS.FreebaseProductReviewTask(entityName);
		var fbProductHomepageTask = new TASKS.FreebaseProductHomepageTask(entityName);
		
		GROUPS.WEBSITES.registerAtTask(fbProductWikipediaPageTask);
		GROUPS.WEBSITES.registerAtTask(fbProductHomepageTask);
		
		tasks.push(fbProductWikipediaPageTask);
		tasks.push(fbProductReviewTask);
		tasks.push(fbProductHomepageTask);
	}
	return tasks;
}
