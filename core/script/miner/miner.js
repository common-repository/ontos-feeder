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
 
var OTA_MINER = function(full_path, full_path_img, miner_path, ontology, buttonId) {
	var ota_full_path = full_path;
	var ota_full_path_img = full_path_img;
	var ota_miner_path = miner_path;
	var ota_ontology = ontology;
	var buttonId = buttonId;
	
	// the Editor must provide "getContent" CallBack method
	var wysiwygEditor;
	var self = this;
	this.getTagsButtonName = "get-tags-button.jpg";
	this.getTagsButtonBusyName = "get-tags-button-busy.gif";
	
	this.setEditor = function(editor){
		wysiwygEditor = editor;
	};
	
	function asyncGET(path, dataType, data, onSuccess, onError) {
		jQuery.ajax( {
			url : path,
			dataType : dataType,
			data : data,
			
			success : function(data) {
				if (data) {
					if (data.result) {
						if (data.success)
							onSuccess(data);
						else
							onError(data.result);
					} else
						onSuccess(data);
				} else {
					onError(data);
				}
			},
			error : function(data) {
				onError(data);
			}
		});
	}
	;
	
	function asyncPOST(path, dataType, adata, onSuccess, onError) {
		jQuery.ajax( {
			url : ota_full_path+"/proxy_curl.php?",
			type : "POST",
			data: adata,
			contentType: "application/x-www-form-urlencoded",
			dataType: "json",

			success : function(data) {
				if (data) {
					if (data.result) {
						if (data.success)
							onSuccess(data);
						else
							onError(data.result);
					} else
						onSuccess(data);
				} else {
					onError(data);
				}
			},
			error : function(data) {
				onError(data);
			}
		});
	}
	;

	function minerLogin(data, onSuccess, onError) {
		var path = ota_miner_path + "/token?";
		asyncGET(path, 'jsonp', data, onSuccess, onError);
	}

	function minerProcessViaProxy(data, onSuccess, onError) {
		var path = ota_full_path + "/proxy_curl.php?";
		asyncPOST(path, 'json', data, onSuccess, onError);
	}

	this.login = function(login, password) {
		jQuery("#" + buttonId)[0].childNodes[0].src = ota_full_path_img + "/"+self.getTagsButtonBusyName;
		var data = "j_username=" + login + "&j_password=" + password;
		minerLogin(data, login_success, login_error);
	};

	function login_success(token) {
		window.token = token;

		var content = wysiwygEditor.getContent();
		
		content = OTA_HIGHLIGHTING.workerInstance.removeHighlightings(content);
		
		var path = ota_miner_path + '/api/miner;jsessionid=' + token + '?';
		var data = JSON.stringify( {
			get : 'process',
			ontology : ota_ontology,
			format : 'NTRIPLES',
			text : content
		}, function(key, value) {
			return value;
		});

		path = "target=" + encodeURIComponent(path);
		data = encodeURIComponent(data);
		data = "query=" + data;
		data = path + "&" + data;

		LOGGER.debug("Query: " + data);

		minerProcessViaProxy(data, miner_success, miner_error);
	}

	function login_error(data) {
		jQuery("#" + buttonId)[0].childNodes[0].src = ota_full_path_img + "/"+self.getTagsButtonName;
		alert("error:" + data);
	};

	function miner_success(tags) {
		jQuery("#" + buttonId)[0].childNodes[0].src = ota_full_path_img + "/"+self.getTagsButtonName;
		window.tags = JSON.stringify(tags, function(key, value) {
			return value;
		});
		// navigation_widget.js needs to be loaded to see this function
		renderNavigationWidget();
		// start highglighting
		ota_tinymce_waitForNavigationWidget(wysiwygEditor);
	};

	function miner_error(data) {
		jQuery("#" + buttonId)[0].childNodes[0].src = ota_full_path_img + "/"+self.getTagsButtonName;
		alert("miner error:" + data);
	};

};