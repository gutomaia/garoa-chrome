/* 
 * Copyright (C) 2012 Guto Maia <guto@guto.net>
 */

var req;

var garoa_api_url = "https://garoahc.appspot.com/status";

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
    status = is_garoa_open(req.response);
    last_status = localStorage.garoa_open;

    console.log('status ' + status);
    console.log('last_status '+ last_status);

    if(status != last_status){
        notify(status);
        console.log('changed status to ' + status);
    }else{
        console.log('do nothing');
    }

    change_icon(status);
    localStorage.garoa_open = status;
}

function change_icon(status){
    if (chrome){
        var icon = {};

        status=parseInt(status, 10);
        switch(status){
            case 0:
                icon.path = "icon_closed_y.png";
                break;
            case 1:
                icon.path = "icon_closed.png";
                break;
            case 2:
                icon.path = "icon_open_y.png";
                break;
            case 3:
                icon.path = "icon_open.png";
                break;
            default:
                icon.path = "icon_closed_y.png";
        }
        chrome.browserAction.setIcon(icon);
    }
}


function notify(status){
    var header = "Garoa Hacker Club";
    var msg;
    var icon;

    status=parseInt(status, 10);
    switch(status){
        case 0:
            icon = "icon_closed_y.png";
            msg = "is closed! (Unknown)";
            break;
        case 1:
            icon = "icon_closed.png";
            msg = "is closed!";
            break;
        case 2:
            icon = "icon_open_y.png";
            msg = "is open! (Unknown)" ;
            break;
        case 3:
            icon = "icon_open.png";
            msg = "is open!" ;
            break;
        default:
            icon = "icon_closed_y.png";
            msg = "is closed! (Unknown)";
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
        setTimeout(function () { notification.cancel(); }, 4000);
    };
    notification.show();
}

if (!localStorage.isInitialized) {
    localStorage.garoa_open = 0;
}

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