/* 
 * Copyright (C) 2012 Guto Maia <guto@guto.net>
 */

var req;

var garoa_api_url = "https://garoahc.appspot.com/";

function main() {
    req = new XMLHttpRequest();
    req.onload = handleResponse;
    req.onerror = handleError;
    req.open("GET", garoa_api_url, true);
    req.send(null);
}

function handleError() {
    console.log('Error!!!');
}

function handleResponse() {
    is_open = is_garoa_open(req.response);
    was_open = localStorage.garoa_open == "true";
    console.log('was_open ' + was_open);
    console.log('is_open '+ is_open);
    if (is_open && !was_open){
        console.log('changed status to OPEN');
        notify(true);
        change_icon(true);
    }else if (was_open && (!is_open)){
        console.log('changed status to CLOSED');
        notify(false);
        change_icon(false);
    } else {
        console.log('do nothing');
    }
    localStorage.garoa_open = is_open;
}

function change_icon(is_open){
    if (chrome){
        var icon = {}
        if(is_open){
            icon.path = "icon_open.png";
        } else {
            icon.path = "icon_closed.png";
        };
        chrome.browserAction.setIcon(icon);
    }
}


function notify(is_open){
    var header = "Garoa Hacker Club"
    var msg;
    var icon;
    if (is_open){
        icon = "icon_open.png";
        msg = "is open!" ;
    } else {
        icon = "icon_closed.png";
        msg = "is closed!";
    }
    var notification = webkitNotifications.createNotification(
        icon,
        header,
        msg
    );
    notification.onclick = function () { 
        chrome.tabs.create({url: "https://garoa.net.br"}); 
        notification.cancel();
    };
    notification.ondisplay = function () {
        setTimeout(function () { notification.cancel() }, 4000);
    };
    notification.show();
}

if (!localStorage.isInitialized) {
    localStorage.garoa_open = false;
}
localStorage.garoa_open = false;

if (webkitNotifications) {
    var interval = 1000; 
    main();
    setInterval(
        function() {
            main();
        }, 60000
    );
} else {
    chrome.tabs.create({url: 'error.html'});
}
