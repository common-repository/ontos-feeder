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

require_once 'constants.php';

class OTA_NavigationWidget {
	public function renderNavigationWidget($currentPath){
		$content = "
	            	<div class=\"ontos_box\" style=\"padding:0px;\">
					<a href=\"http://www.ontos.com\"><img src=\"".$currentPath."/img/logo2.png\" border=\"0\" align=\"right\"/></a><br/>
					<fieldset id=\"ontos_dbpedia_content_fs\" style=\"padding:0px;width:100%;height:auto;\" >
						<legend id=\"ontos_dbpedia_content_fs_legend\" class=\"opened\" onclick=\"open_fs('ontos_dbpedia_content_fs')\">Entities</legend>
						
						<div id='top_controls' style='position:relative;margin:0px;padding:0px;width:100%;height:25px;'>
						
							<div style='position:absolute;width:100%;height:20px;left:0px;padding:0px;margin:0px;'>

								<button id='ota_button_back' type='button' style='position:absolute;right:0px;width:30px;border:0px;cursor:pointer;' onclick='window.navigationWidget.renderPreviousEntities();'>
									<img src='".$currentPath."/img/btn_prev.png'  style='width:auto;;height:18px;' ></img>
								</button>
								<div style='position:absolute;right:30px;left:0px;'>
										<button id='ota_button_up' type='button' style='width:100%;border:0px;cursor:pointer;' onclick='(new UTILS.Images()).moveToNext();' >
											<img   id='ontos_navigation_button_back' src='".$currentPath."/img/btn_up.png'  style='width:auto;height:18px;padding:0px;margin:0px;' ></img>
										</button>
								</div>
							</div>
							
							
						    

						<!--	
							<img src='".$currentPath."/img/btn_up.png'  style='width:83%;height:25px;float:left;cursor:pointer;' onclick='(new UTILS.Images()).moveToNext();'></img> 
						    <img   id='ontos_navigation_button_back' onclick='window.navigationWidget.renderPreviousEntities();' src='".$currentPath."/img/btn_prev.png'  style='width:27px;height:25px;vertical-align:middle;text-align:left;padding:0px;margin:0px;cursor:pointer;' ></img>
						-->
						
						</div>
						
						
						<div id=\"ontos_navigation_widget\" style=\"position:relative; margin:0px; margin-left:5px; margin-right:5px;visibility:visible;height: 500px;  overflow: hidden;\">
						   
						</div>
						<div id='bottom_controls' style='position:relative;padding:0px;width:100%;height:25px;'>
						
							<div style='position:absolute;width:100%;height:20px;left:0px;padding:0px;margin:0px;'>

								<div style='position:absolute;right:0px;left:0px;'>
										<button id='ota_button_down' type='button' style='width:100%;border:0px;cursor:pointer;' onclick='(new UTILS.Images()).moveToPrevious();' >
											<img  style='width:auto;height:18px;padding:0px;margin:0px;cursor:pointer;' src='".$currentPath."/img/btn_down.png' ></img> 
										</button>
								</div>
							</div>
							
							
						</div>
						</fieldset></div>";
		return $content;
	}


}
?>