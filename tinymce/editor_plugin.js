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

(function() {

	tinymce.create('tinymce.plugins.Ontosminer', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has
		 * been created. This call is done before the editor instance has
		 * finished it's initialization so use the onInit event of the editor
		 * instance to intercept that event.
		 * 
		 * @param {tinymce.Editor}
		 *            ed Editor instance that the plugin is initialized in.
		 * @param {string}
		 *            url Absolute URL to where the plugin is located.
		 */

		// callback that returns the HTML content of the editor to the miner processing JS
		getContent : getContent = function() {
			// var content =
			// currentEditor.contentDocument.documentElement.textContent;
			var content = currentEditor.getContent( {
				format : 'html'
			});

			return content;
		},

		init : function(ed, url) {
			var current_Editor;
			var buttonId = 'OTA_getTagsButton';
			var buttonIdDOM = 'content_' + buttonId;
			var ota_miner = new OTA_MINER(ota_full_path, ota_full_path_img, ota_miner_path, ota_ontology, buttonIdDOM, current_Editor);

			currentEditor = ed;

			currentEditor.onInit.add(function(ed) {
				jQuery("#" + buttonIdDOM).attr("style", "width:auto;");
				jQuery("#" + buttonIdDOM + " > img").attr("style", "width:auto;");
				
				// bind annotation highlighting
				ed.onInit.add(function(ed) {
					// must be set in this onInit handler, otherwise the editor lacks all relevant properties/methods	
					ota_miner.setEditor(ed); 
					ota_tinymce_addCSS(ed);
				});
			});

			ota_miner.setEditor(this);
			
		ed.addCommand('getTags', function() {
			ota_miner.login(ota_miner_login, ota_miner_password);
		});

		
		ed.addButton(buttonId, {
			title : 'Retrive semantically relevant Topics from the Ontos Web service',
			cmd : 'getTags',
			'class' : 'getTagsButton',
			image : ota_full_path_img + '/' + ota_miner.getTagsButtonName

		});

		// select the button 
		ed.onNodeChange.add(function(ed, cm, n) {
			cm.setActive(buttonId, n.nodeName == 'IMG');
		});
	},

	/**
	 * Creates control instances based in the incomming name. This method is
	 * normally not needed since the addButton method of the tinymce.Editor
	 * class is a more easy way of adding buttons but you sometimes need to
	 * create more complex controls like listboxes, split buttons etc then this
	 * method can be used to create those.
	 * 
	 * @param {String}
	 *            n Name of the control to create.
	 * @param {tinymce.ControlManager}
	 *            cm Control manager to use inorder to create new control.
	 * @return {tinymce.ui.Control} New control instance or null if no control
	 *         was created.
	 */
	createControl : function(n, cm) {
		return null;
	},

	/**
	 * Returns information about the plugin as a name/value array. The current
	 * keys are longname, author, authorurl, infourl and version.
	 * 
	 * @return {Object} Name/value array containing information about the
	 *         plugin.
	 */
	getInfo : function() {
		return {
			longname : 'Ontos Feeder Plugin',
			author : 'Ontos AG',
			authorurl : 'http://www.ontos.com',
			infourl : 'http://www.ontos.com/o_eng/index.php?cs=2-2#feeder',
			version : "1.0"
		};
	}
	});

	// Register plugin
	tinymce.PluginManager.add('OTA_getTagsButton', tinymce.plugins.Ontosminer);
})();
