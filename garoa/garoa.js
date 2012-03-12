/* 
 * Copyright (C) 2012 Guto Maia <guto@guto.net>
 */

 
function is_garoa_open(status){
	//returnStatus
	//0 - Closed - Unknown
	//1 - Closed
	//2 - Open - Unknown
	//3 - Open
	var returnStatus = 0;
	
    var data = JSON.parse(status);

    var strStatus = "closed";
	var strUnknown = " (Unknown)";
    if(data.open){
		returnStatus = 2;
        strStatus="open";
    }
	
	//Print Date
	var dateLastchange = new Date(data.lastchange*1000); //need to *1000 to convert from unix time
	console.log("Last Update: " + dateLastchange);
	
	//Check lastchange Date
	var decayTime= 86400000; //24h
	if( (new Date().getTime() - (data.lastchange *1000) ) < decayTime ){
		returnStatus++;
		strUnknown="";
	}

    console.log("Garoa open is " + strStatus + strUnknown);
    return returnStatus;
}