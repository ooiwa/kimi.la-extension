$(document).ready(function(){    
    var checkInterval = 4000;

    var extPlayer = {
        hasPlayer: false,
        now: null,
        checkNowPlaying: function(){
            if(!this.hasPlayer){
                if ($('#player').length === 0){ return false; }
                else{ this.hasPlayer = true }
            }
            var title = $('title').text();
            if (title !== this.now){
                this.setNewSong(title);
                var $info = $('#player-info'), $player = $('#player');
                var song = $info.find('strong:first').text(), artist = $info.find('i:first').text();
                var tburl = getImageUrl($player);
                notify(song, artist, tburl);
            }
        },
        setNewSong: function(title){
            this.now = title;
        },
    };

    var getImageUrl = function($object){
        var data = $object.attr('data');
        var videoId = data.match(/\/\w+\?/)[0].match(/\w+/)
        return "http://img.youtube.com/vi/" + videoId + "/1.jpg"
    }
    
    var timer = setInterval(function(){
        extPlayer.checkNowPlaying()
    }, checkInterval);
    

    var notify = function(song, artist, tburl){
        chrome.extension.sendRequest({song: song, artist:artist, tburl:tburl}, function(response){

        });
    }
});

