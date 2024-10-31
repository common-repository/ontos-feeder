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
 
function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}
function usingIE() {
	return (getInternetExplorerVersion() > -1);
}
function checkVersion() {
	var msg = "You're not using Windows Internet Explorer.";
	var ver = getInternetExplorerVersion();
	if (ver > -1) {
		if (ver >= 8.0)
			msg = "You're using a recent copy of Windows Internet Explorer."
		else
			msg = "You should upgrade your copy of Windows Internet Explorer.";
	}
	alert(msg);
}

function checkBrowser() {
	var namebrowser = navigator.appName;
	var version = navigator.appVersion;
	var sprache = navigator.language;
	var plattform = navigator.platform;
	var code = navigator.appCodeName;

	switch (namebrowser) {
	case "Microsoft Internet Explorer":
		CURRENT_BROWSER = BROWSER_IE;
		break;
	case "Netscape": {
		if (version.match(/chrome/i))
			CURRENT_BROWSER = BROWSER_CHROME;
		else
			CURRENT_BROWSER = BROWSER_MOZILLA;
		break;
	}
	default:
		CURRENT_BROWSER = BROWSER_UNBEKANNT;
	}
}
DEBUG = false;

LOGGER_LEVEL = log4javascript.Level.DEBUG;
LOGGER = log4javascript.getLogger();
if (DEBUG) {
	var popUpAppender = new log4javascript.PopUpAppender();
	popUpAppender.setThreshold(LOGGER_LEVEL);
	var popUpLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
	popUpAppender.setLayout(popUpLayout);
	LOGGER.addAppender(popUpAppender);
}



ERROR_CONSTANT = false;
SUCCESS_CONSTANT = true;
BROWSER_MOZILLA = "Mozilla";
BROWSER_IE = "Internet Explorer";
BROWSER_CHROME = "Chrome";
BROWSER_UNBEKANNT = "unbekannt";
checkBrowser();


// Constants declared without "const" so the ie8 doesn't complain
ONTOSMINER_ONTOLOGY_PERSON = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Person";
ONTOSMINER_ONTOLOGY_LOCATION = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Location";
ONTOSMINER_ONTOLOGY_CONFERENCE = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Conference";
ONTOSMINER_ONTOLOGY_MASS_MEDIA = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Mass_Media";
ONTOSMINER_ONTOLOGY_PARTY = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Party";
ONTOSMINER_ONTOLOGY_GENERAL_ORGANISATION = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Organization";
ONTOSMINER_ONTOLOGY_COMMERCIAL_ORGANISATION = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Commercial_Organization";
ONTOSMINER_ONTOLOGY_STATE_ORGANISATION = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#State_Organization";
ONTOSMINER_ONTOLOGY_MILITARY_ORGANISATION = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Military_Organization";
ONTOSMINER_ONTOLOGY_EDUCATIONAL_ORGANISATION = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Educational_Organization";
ONTOSMINER_ONTOLOGY_PRODUCT = "http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#Product";

ONTOSMINER_ONTOLOGY_INSTANCEOF = "http://sofa.semanticweb.org/sofa/v1.0/system#__INSTANCEOF_REL";
ONTOSMINER_ONTOLOGY_LABEL_REL = "http://sofa.semanticweb.org/sofa/v1.0/system#__LABEL_REL";
ONTOSMINER_ONTOLOGY_ANNOTATION_TEXTPOSITION_START = "http://www.ontosearch.com/2007/12/annotation-ns#plainStart";
ONTOSMINER_ONTOLOGY_ANNOTATION_TEXTPOSITION_END = "http://www.ontosearch.com/2007/12/annotation-ns#plainEnd";
ONTOSMINER_ONTOLOGY_ANNOTATION = "http://www.ontosearch.com/2007/12/annotation-ns#entity";

ONTOSMINER_WAIT_SYMBOL_PATH = "ajax-loader.gif";
ONTOSMINER_WAIT_SYMBOL_ID = "ontosminer_wait_symbol";

ONTOSMINER_FREEBASE_SYMBOL_PATH = "/img/freebase.gif";
ONTOSMINER_WIKIPEDIA_SYMBOL_PATH = "/img/wikipedia.gif";
ONTOSMINER_ONTOS_SYMBOL_PATH = "/img/ontos.gif";

ONTOS_NAVIGATION_WIDGET_DIV = "ontos_navigation_widget";
ONTOS_NAVIGATION_WIDGET_SLIDER_DIV = "ontos_navigation_widget_slider";
ONTOS_NAVIGATION_WIDGET_FS_LEGEND = "ontos_dbpedia_content_fs_legend";