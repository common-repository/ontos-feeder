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
$('document').ready(function() {
	$('[class~=ota_highlighting]').each(function(i,e){
		if (typeof($(this).attr('resource')) != "undefined")
		{
			// RDFa
			var eid = $(this).attr('resource').split(':')[1];
			$(this).attr('href','http://www.ontosearch.com/2008/01/identification#'+eid);
			$(this).attr('rel','#showInfo');
		} else
		{
			// Microformats
			var eid = $(this).children("[class='uid']").html();
			$(this).children("[class='fn']").attr('href','http://www.ontosearch.com/2008/01/identification#'+eid);
			$(this).children("[class='fn']").attr('rel','#showInfo');
			$(this).children("[class='fn org']").attr('href','http://www.ontosearch.com/2008/01/identification#'+eid);
			$(this).children("[class='fn org']").attr('rel','#showInfo');
			$(this).children("[class='adr']").children("[class='locality']").attr('href','http://www.ontosearch.com/2008/01/identification#'+eid);
			$(this).children("[class='adr']").children("[class='locality']").attr('rel','#showInfo');
			
		}
		
	});	
});