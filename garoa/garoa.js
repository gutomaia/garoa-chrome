/* 
 * Copyright (C) 2012 Guto Maia <guto@guto.net>
 */

function is_garoa_open(status){
    var data = JSON.parse(status);

    var strStatus = "closed";
    if(data.open){
        strStatus="open";
    }
    console.log("Garoa open is " + strStatus);
    return data.open;
}
