/* 
 * Copyright (C) 2012 Guto Maia <guto@guto.net>
 */

function is_garoa_open(status){
    var data = JSON.parse(status);
    console.log(data.status);
    return data.status == "open for public";
}