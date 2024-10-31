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

add_action( 'admin_print_styles', 'OTA_load_css' );
add_action( 'wp_print_styles', 'OTA_load_css' );
add_action( 'wp_print_scripts', 'OTA_load_user_javascripts' );
add_action( 'admin_print_scripts', 'OTA_load_admin_javascripts' );
require_once('ota_database.php');
require_once('ota_constants.php');
require_once('core/constants.php');
require_once('core/parameters.php');

function OTA_load_admin_javascripts() {

	if ( OTA_isAdministratorPage() ) {
		// administrator
		wp_enqueue_script('OTA_log4javascript',OTA_URL.'/script/log4javascript-1.4.1/log4javascript.js', array());
		wp_enqueue_script('OTA_jqueryMouseWheel',OTA_URL.'/script/jquery/jquery.mousewheel-3.0.2.js', array('OTA_log4javascript'));


		echo("<script type='text/javascript' src='".OTA_URL."/script/jquery/jquery-1.4.2.js'></script>");

		echo("<script type='text/javascript' src='".OTA_URL."/script/jquery/jquery-fancybox/jquery.fancybox-1.3.1.js'></script>");
		echo("<script type='text/javascript' src='".OTA_URL."/script/jquery/jquery-fancybox/jquery.easing-1.3.pack.js'></script>");
		echo("<script type='text/javascript' src='".OTA_URL."/script/jquery/jquery-ui/jquery-ui-1.8.1.custom.min.js'></script>");


		wp_enqueue_script('OTA_constants',OTA_URL.'/script/constants.js', array('OTA_jqueryMouseWheel'));
		wp_enqueue_script('OTA_sparql',OTA_URL.'/script/driver/sparql/sparql.js', array('OTA_constants'));
		wp_enqueue_script('OTA_sparqlizer',OTA_URL.'/script/driver/sparql/sparqlizer.js', array('OTA_sparql'));
		wp_enqueue_script('OTA_utils',OTA_URL.'/script/utils.js', array('OTA_sparqlizer'));
		wp_enqueue_script('OTA_ontos',OTA_URL.'/script/driver/ontos.js', array('OTA_utils'));

		// set css and js for the button
		wp_enqueue_script('OTA_getTagsButton',OTA_URL.'/script/getTagsButton.js', array('OTA_ontos'));


		wp_enqueue_script('OTA_freebase',OTA_URL.'/script/driver/freebase.js', array('OTA_getTagsButton'));

		wp_enqueue_script('OTA_view-groups',OTA_URL.'/script/dd/view-groups.js', array('OTA_freebase'));


		// tasks
		wp_enqueue_script('OTA_taskMappings',OTA_URL.'/script/tasks/taskMappings.js', array('OTA_view-groups'));
		wp_enqueue_script('OTA_taskBase',OTA_URL.'/script/tasks/taskBase.js', array('OTA_taskMappings'));
		wp_enqueue_script('OTA_taskDocuments',OTA_URL.'/script/tasks/documents.js', array('OTA_taskBase'));
		wp_enqueue_script('OTA_taskStatusRole',OTA_URL.'/script/tasks/statusRole.js', array('OTA_taskDocuments'));
		wp_enqueue_script('OTA_taskReport',OTA_URL.'/script/tasks/report.js', array('OTA_taskStatusRole'));

		wp_enqueue_script('OTA_taskLocationThumbnail',OTA_URL.'/script/tasks/location/thumbnail.js', array('OTA_taskReport'));
		wp_enqueue_script('OTA_taskLocationWikipediaArticle',OTA_URL.'/script/tasks/location/wikipediaArticle.js', array('OTA_taskLocationThumbnail'));
		wp_enqueue_script('OTA_taskLocationHomepage',OTA_URL.'/script/tasks/location/homepage.js', array('OTA_taskLocationWikipediaArticle'));
		wp_enqueue_script('OTA_taskLocationNYTimesArticle',OTA_URL.'/script/tasks/location/newYorkTimesArticle.js', array('OTA_taskLocationHomepage'));
		wp_enqueue_script('OTA_taskLocationCapital',OTA_URL.'/script/tasks/location/capital.js', array('OTA_taskLocationNYTimesArticle'));
		wp_enqueue_script('OTA_taskLocationPopulation',OTA_URL.'/script/tasks/location/population.js', array('OTA_taskLocationCapital'));
		wp_enqueue_script('OTA_taskLocationArea',OTA_URL.'/script/tasks/location/area.js', array('OTA_taskLocationPopulation'));
		wp_enqueue_script('OTA_taskLocationContainedBy',OTA_URL.'/script/tasks/location/containedby.js', array('OTA_taskLocationArea'));

		wp_enqueue_script('OTA_taskProductThumbnail',OTA_URL.'/script/tasks/product/thumbnail.js', array('OTA_taskLocationContainedBy'));
		wp_enqueue_script('OTA_taskProductReview',OTA_URL.'/script/tasks/product/review.js', array('OTA_taskProductThumbnail'));
		wp_enqueue_script('OTA_taskProductHomepage',OTA_URL.'/script/tasks/product/homepage.js', array('OTA_taskProductReview'));
		wp_enqueue_script('OTA_taskProductWikipediaArticle',OTA_URL.'/script/tasks/product/wikipediaArticle.js', array('OTA_taskProductHomepage'));

		wp_enqueue_script('OTA_taskOrganisationFacebook',OTA_URL.'/script/tasks/organisation/facebook.js', array('OTA_taskProductWikipediaArticle'));
		wp_enqueue_script('OTA_taskOrganisationFoundationDate',OTA_URL.'/script/tasks/organisation/foundationDate.js', array('OTA_taskOrganisationFacebook'));
		wp_enqueue_script('OTA_taskOrganisationHomepage',OTA_URL.'/script/tasks/organisation/homepage.js', array('OTA_taskOrganisationFoundationDate'));
		wp_enqueue_script('OTA_taskOrganisationLinkedin',OTA_URL.'/script/tasks/organisation/linkedin.js', array('OTA_taskOrganisationHomepage'));
		wp_enqueue_script('OTA_taskOrganisationLocation',OTA_URL.'/script/tasks/organisation/location.js', array('OTA_taskOrganisationLinkedin'));
		wp_enqueue_script('OTA_taskOrganisationNYTimesArticle',OTA_URL.'/script/tasks/organisation/newYorkTimesArticle.js', array('OTA_taskOrganisationLocation'));
		wp_enqueue_script('OTA_taskOrganisationStockExchange',OTA_URL.'/script/tasks/organisation/stockExchange.js', array('OTA_taskOrganisationNYTimesArticle'));
		wp_enqueue_script('OTA_taskOrganisitaionThumbnail',OTA_URL.'/script/tasks/organisation/thumbnail.js', array('OTA_taskOrganisationStockExchange'));
		wp_enqueue_script('OTA_taskOrganisationTwitter',OTA_URL.'/script/tasks/organisation/twitter.js', array('OTA_taskOrganisitaionThumbnail'));
		wp_enqueue_script('OTA_taskOrganisationWikipediaArticle',OTA_URL.'/script/tasks/organisation/wikipediaArticle.js', array('OTA_taskOrganisationTwitter'));

		wp_enqueue_script('OTA_taskPersonAge',OTA_URL.'/script/tasks/person/age.js', array('OTA_taskOrganisationWikipediaArticle'));
		wp_enqueue_script('OTA_taskPersonFacebook',OTA_URL.'/script/tasks/person/facebook.js', array('OTA_taskPersonAge'));
		wp_enqueue_script('OTA_taskPersonHomepage',OTA_URL.'/script/tasks/person/homepage.js', array('OTA_taskPersonFacebook'));
		wp_enqueue_script('OTA_taskPersonLinkedin',OTA_URL.'/script/tasks/person/linkedin.js', array('OTA_taskPersonHomepage'));
		wp_enqueue_script('OTA_taskPersonNationality',OTA_URL.'/script/tasks/person/nationality.js', array('OTA_taskPersonLinkedin'));
		wp_enqueue_script('OTA_taskPersonNYTimesArticle',OTA_URL.'/script/tasks/person/newYorkTimesArticle.js', array('OTA_taskPersonNationality'));
		wp_enqueue_script('OTA_taskPersonThumbnail',OTA_URL.'/script/tasks/person/thumbnail.js', array('OTA_taskPersonNYTimesArticle'));
		wp_enqueue_script('OTA_taskPersonTwitter',OTA_URL.'/script/tasks/person/twitter.js', array('OTA_taskPersonThumbnail'));
		wp_enqueue_script('OTA_taskPersonWikipediaArticle',OTA_URL.'/script/tasks/person/wikipediaArticle.js', array('OTA_taskPersonTwitter'));

		wp_enqueue_script('OTA_taskRelations2Persons',OTA_URL.'/script/tasks/relations/persons.js', array('OTA_taskPersonWikipediaArticle'));
		wp_enqueue_script('OTA_taskRelations2Organisations',OTA_URL.'/script/tasks/relations/organisations.js', array('OTA_taskRelations2Persons'));


		wp_enqueue_script('OTA_dd-controller',OTA_URL.'/script/dd/dd-controller.js', array('OTA_taskRelations2Organisations'));
		wp_enqueue_script('OTA_drag',OTA_URL.'/script/dd/drag.js', array('OTA_dd-controller'));
		wp_enqueue_script('OTA_dd-view',OTA_URL.'/script/dd/dd-view.js', array('OTA_drag'));
		wp_enqueue_script('OTA_dd',OTA_URL.'/script/dd/dd.js', array('OTA_dd-view'));


		wp_enqueue_script('OTA_navigation-widget',OTA_URL.'/script/navigation_widget.js', array('OTA_dd'));
		wp_enqueue_script('OTA_miner',OTA_URL.'/script/miner/miner.js', array('OTA_navigation-widget'));


		wp_enqueue_script('OTA_annotations',OTA_URL.'/script/highlighting/annotations.js', array('OTA_miner'));
		wp_enqueue_script('OTA_highlighting',OTA_URL.'/script/highlighting/highlighting.js', array('OTA_annotations'));
		wp_enqueue_script('OTA_tinyMCE',OTA_URL.'/script/highlighting/tinymce.js', array('OTA_highlighting'));
		wp_enqueue_script('OTA_jQueryWait',OTA_URL.'/script/jquery/jquery.wait.js', array('OTA_tinyMCE'));

		OTA_exposeConfigurationData();

	}
}
function OTA_load_user_javascripts(){
	if ( ! OTA_isAdministratorPage() ) {
		// export balloon scripts
		echo("<script type='text/javascript' src='".OTA_URL."/script/jquery/jquery-1.4.2.js'></script>");
		echo("<script type='text/javascript' src='".OTA_URL."/script/highlighting/balloon_hook.js'></script>");
	}
}

function OTA_exposeConfigurationData(){
	// Read in existing option values from database
	$configuration = OTA_getConfiguration();
	$entityTypes = implode(",",$configuration["realEntityTypes"]);

	$parameters = new Parameters($configuration,null, null, $entityTypes);

	echo exportConstants($parameters);

}


function OTA_load_css() {
	if ( OTA_isAdministratorPage() ) {
		// administrator
		wp_register_style( 'OTA_css_getTagsButton', WP_PLUGIN_URL . '/OTA/tinymce/getTagsButton.css');
		wp_enqueue_style('OTA_css_jqueryUI');

		wp_register_style('OTA_css_jqueryUI',OTA_URL.'/script/jquery/jquery-ui/css/cupertino/jquery-ui-1.8.1.custom.css');
		wp_enqueue_style('OTA_css_jqueryUI');

		wp_register_style('OTA_css_navigationWidget',OTA_URL.'/css/navigation_widget.css');
		wp_enqueue_style('OTA_css_navigationWidget');

		wp_register_style('OTA_css_jqueryFancyBox', OTA_URL.'/script/jquery/jquery-fancybox/jquery.fancybox-1.3.1.css');
		wp_enqueue_style('OTA_css_jqueryFancyBox');

		wp_register_style('OTA_css_dd', OTA_URL.'/script/dd/dd.css');
		wp_enqueue_style('OTA_css_dd');


		wp_register_style('OTA_css_annotations_view', OTA_URL.'/css/annotations_view.css');
		wp_enqueue_style('OTA_css_annotations_view');
	}
	else {
		// normal user
		wp_register_style('OTA_css_annotations_view', OTA_URL.'/css/annotations_view.css');
		wp_enqueue_style('OTA_css_annotations_view');
	}

}

/* Helper used to check if javascript should be added to page. Helps avoid bloat in admin */
function OTA_isAdministratorPage() {
	global $pagenow;

	$pages = array('post.php', 'post-new.php', 'page.php', 'page-new.php', 'admin.php', 'profile.php');

	if( in_array($pagenow, $pages) )
	return true;

	return false;
}