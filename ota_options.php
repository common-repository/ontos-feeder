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

add_action('admin_menu', 'OTA_plugin_menu');

require_once 'ota_database.php';
require_once 'core/constants.php';

function OTA_plugin_menu() {
	add_options_page('Ontos Settings', 'Ontos Feeder', 'manage_options', 'my-unique-identifier', 'OTA_options');
}


function OTA_options() {

	if (!current_user_can('manage_options'))  {
		wp_die( __('You do not have sufficient permissions to access this page.') );
	}

	// See if the user has posted us some information
	// If they did, this hidden field will be set to 'Y'
	if( isset($_POST[ 'ota_settings_submit_hidden' ]) && $_POST[ 'ota_settings_submit_hidden' ] == 'Y' ) {
		OTA_saveOptions();
	}

	OTA_showOptions();

}

function OTA_saveOptions(){

	$opt_val_login 		= $_POST['login'];
	$opt_val_password 	= $_POST['password'];
	$opt_val_language	= $_POST['language'];
	$opt_val_highlightings	= $_POST['highlightings'];

	$opt_val_entityTypes = array(
		"person"=>$_POST['person']?$_POST['person']:"0", 
		"organisation"=> $_POST['organisation']?$_POST['organisation']:"0", 
		"location" => $_POST['location']?$_POST['location']:"0", 
		"product" => $_POST['product']?$_POST['product']:"0"
		);

		// Save the posted value in the database
		OTA_create_table_if_needed();
		OTA_setConfiguration($opt_val_login, $opt_val_password, $opt_val_language, $opt_val_highlightings, $opt_val_entityTypes);

		echo("
				<div class='updated'>
					<p><strong>Settings saved.</strong></p>
				</div>
		");
}

function OTA_showOptions(){
	// settings form
	// Read in existing option value from database
	$configuration = OTA_getConfiguration();
	$opt_val_login = $configuration['login'];
	$opt_val_password = $configuration['password'];
	$opt_val_language = $configuration['language'];;

	$opt_val_highlightings	= $configuration['highlightings'];

	$opt_val_entityTypes = $configuration['entityTypes'];

	$opt_const_entityTypes = array("person"=>"Person","organisation"=>"Organisation","location"=>"Location","product"=>"Product");
	if ($opt_val_entityTypes==null);
	{
		// default types
		$opt_val_entityTypes["person"]='person';
		$opt_val_entityTypes["organisation"]='organisation';
	}
	foreach ($opt_const_entityTypes as $key=>$value)
	{
		$entityTypeCheckboxes .= "<tr>".
		($entityTypeCheckboxes?"<td/>":"<td>Shown Entity Types:</td>").
									"<td><input type='checkbox' name='$key' value='$key'"; $opt_val_entityTypes["$key"]=="$key"? $entityTypeCheckboxes.=" checked='checked' >$value</input></td></tr>": $entityTypeCheckboxes.=" >$value</input></td></tr>"; 
	}


	$highlighting_no_selected ="";
	$highlighting_rdfa_selected ="";
	$highlighting_rdfaHighlighting_selected ="";
	$highlighting_rdfaHighlightingPopup_selected ="";
	$highlighting_microformats_selected ="";
	$highlighting_microformatsHighlighting_selected ="";
	$highlighting_microformatsHighlightingPopup_selected ="";
	if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_NO)
	{
		$highlighting_no_selected = "checked='checked'";
	}else if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_RDFA)
	{
		$highlighting_rdfa_selected = "checked='checked'";
	}else if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_RDFA_HIGHLIGHTING)
	{
		$highlighting_rdfaHighlighting_selected = "checked='checked'";
	}else if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_RDFA_H_POPUP)
	{
		$highlighting_rdfaHighlightingPopup_selected = "checked='checked'";
	}else if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS)
	{
		$highlighting_microformats_selected = "checked='checked'";
	}else if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_HIGHLIGHTING)
	{
		$highlighting_microformatsHighlighting_selected = "checked='checked'";
	}else if ($opt_val_highlightings==ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_H_POPUP)
	{
		$highlighting_microformatsHighlightingPopup_selected = "checked='checked'";
	}else
	{
		// default value, set on first use when no db entry available;
		$highlighting_rdfa_selected = "checked='checked'";
	}


	$english_selected ="";
	$russian_selected ="";
	if ($opt_val_language==ONTOSMINER_LANGUAGE_ENGLISH)
	{
		$english_selected = "checked='checked'";
	}else if ($opt_val_language==ONTOSMINER_LANGUAGE_RUSSIAN)
	{
		$russian_selected = "checked='checked'";
	}else
	{
		$english_selected = "checked='checked'";
	}
	$content = "
		<div class='wrap'>
			<h2>Ontos Feeder Settings</h2>".wp_nonce_field('update-options')."
			<form name='form_ota_settings' method='post' action=''>
				<input type='hidden' name='ota_settings_submit_hidden' value='Y'>
				<table class='form-table'>
					<tr>
						<td>Login:</td>
						<td><input type='text' name='login' value='".$opt_val_login."' size='64'></td>
					</tr>
					<tr>
						<td>Password:</td>
						<td><input type='password' name='password' value='".$opt_val_password."' size='64'></td>
					</tr>
					<tr>
						 <td>Annotations: </td>
						 <td>
						 	<div>
								 <input type='radio' id='annotation-1' name='highlightings' value='".ONTOSMINER_HIGHLIGHTINGS_NO."' ".$highlighting_no_selected."> no annotations</input><br/>
								 <input type='radio' id='annotation-2' name='highlightings' value='".ONTOSMINER_HIGHLIGHTINGS_RDFA."'  ".$highlighting_rdfa_selected." > annotate entities with RDFa</input><br/>
								 <input type='radio' id='annotation-3' name='highlightings' value='".ONTOSMINER_HIGHLIGHTINGS_RDFA_HIGHLIGHTING."'  ".$highlighting_rdfaHighlighting_selected." > annotate entities with RDFa and highlight them in the text</input><br/>
								 <input type='radio' id='annotation-5' name='highlightings' value='".ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS."'  ".$highlighting_microformats_selected." > annotate entities with Microformats</input><br/>
								 <input type='radio' id='annotation-6' name='highlightings' value='".ONTOSMINER_HIGHLIGHTINGS_MICROFORMATS_HIGHLIGHTING."'  ".$highlighting_microformatsHighlighting_selected." > annotate entities with Microformats and highlight them in the text</input><br/>
							</div>
						 </td>
					</tr>	
					<tr>
						 <td>Text Language: </td>
						 <td>
						 	<div>
								 <input type='radio' id='language-1' name='language' value='".ONTOSMINER_LANGUAGE_ENGLISH."' ".$english_selected."> English</input><br/>
								 <input type='radio' id='language-2' name='language' value='".ONTOSMINER_LANGUAGE_RUSSIAN."'  disabled='true' ".$russian_selected." > Russian</input><br/>
							</div>
						 </td>
					</tr>					
					
					$entityTypeCheckboxes
				</table>
				<hr />
				<p class='submit'>
				<input type='submit' name='Submit' class='button-primary' value='Save' />
				</p>
			</form>
		</div>";

					echo $content;
}


?>