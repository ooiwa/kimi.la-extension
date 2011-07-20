(function(){

    var notifyTime = 4000;
    
    var notifySong = function(info, tab){
        var notification = webkitNotifications.createNotification(
            info.tburl,
            info.song, 
            "by " + info.artist
        );
        notification.onclick = function(){
            chrome.tabs.update(tab.id, {selected:true});
        };
        notification.show();
        setTimeout(function(){
            notification.cancel();
        }, notifyTime);//4 second
    };
    

    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            notifySong(request,  sender.tab);
            sendResponse({farewell: "goodbye"});
        }
    );

})();