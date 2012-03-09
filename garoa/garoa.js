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
	var dateLastchange = new Date(data.lastchange);
	console.log("Last Change: " + dateLastchange);
	console.log("A: " + data.lastchange);
	console.log("B: " + new Date().getTime());
	console.log("C: " + (new Date().getTime() - data.lastchange));
	console.log("D: " + new Date(new Date().getTime() - data.lastchange));
	
	//Check lastchange Date
	var decayTime= 86400000; //24h
	if( (new Date().getTime() - data.lastchange) < decayTime ){
		strStatus++;
		strUnknown="";
	}

    console.log("Garoa open is " + strStatus + strUnknown);
    return returnStatus;
}