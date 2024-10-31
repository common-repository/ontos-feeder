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
 
TASKS.FreebaseCompanyStockMarketNameTask = function(aEntityName){
	var myself = this;
	this.setMapping(TASKS.MAPPINGS.FREEBASE_ORGANISATION_STOCK_MARKETS_TASK);
	this.entityName = aEntityName;

	this.setTaskPointer(this);
	
	this.run = function() {
		myself.miner.getCompanyStockMarketNameByName(myself.entityName,myself.valueReceived, myself.valueError);
	};
	
	this.valueReceived = function(data) {
		if (myself.isValueOK(data)) {
			myself.notifyStatusObservers(SUCCESS_CONSTANT,data);
			
			$('#'+myself.domImageName)[0].src ="";
			$('#'+myself.domImageName).toggleClass("invisibleEntry", true);
			$('#'+myself.domElementName)[0].innerHTML ="";
			
			jQuery.each(data, function(index,value) { 
				// freebase icon fuer alle values setzen
				$('#'+myself.domElementName)[0].innerHTML += "<img id='ontosminer_popup_stockMarket_name_img_"+value["stock_exchange"]+"' style='width:12px;float:left;vertical-align:middle;' src='"+ontosminer_full_path+ONTOSMINER_FREEBASE_SYMBOL_PATH+"'/>";
				
				// link oder label fuer alle values setzen
				if (
					("NASDAQ"==value["stock_exchange"]) ||
					("NYSE"==value["stock_exchange"])
					)
					{
					
					$('#'+myself.domElementName)[0].innerHTML += "<span id='ontosminer_popup_stockMarket_name_"+value["stock_exchange"]+"' style='font-size:12px;font-family:\"Times New Roman\",Times,serif;'><a target='_blank' href='http://www.nasdaq.com/aspx/nasdaqlastsale.aspx?symbol="+value["ticker_symbol"]+"&selected="+value["ticker_symbol"]+"'>"+value["stock_exchange"]+": "+value["ticker_symbol"]+"</a></span>"; 

				} else  {
					$('#'+myself.domElementName)[0].innerHTML += "<span id='ontosminer_popup_stockMarket_name_"+value["stock_exchange"]+"' style='font-size:12px;font-family:\"Times New Roman\",Times,serif;'>"+value["stock_exchange"]+": "+value["ticker_symbol"]+"</span>"; 
				}
			});}
		else 
			myself.valueError(data);
	};
};
TASKS.FreebaseCompanyStockMarketNameTask.prototype = new TASKS.FreebaseTask();
TASKS.FreebaseCompanyStockMarketNameTask.prototype.constructor = TASKS.FreebaseCompanyStockMarketNameTask;
