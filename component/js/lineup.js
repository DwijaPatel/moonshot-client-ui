var index = 0;
var list;
function say(message) {
    $('#chatwrap')
        .append('<div class="talk-say"  tabindex="0"><span class="a11y">The Bot Said </span>' + message + '</div>');
        scrollToBottm();
}
function say(message, link) {
    if(link == 'nothing') {
        $('#chatwrap')
        .append('<div class="talk-say" ><span class="a11y">The Bot Said </span>' + message + '</div>');
        scrollToBottm();
    } else {
        var clickHandler = 'handleUrl(\'' + link + '\')';
        $('#chatwrap')
        .append('<div class="talk-say" onclick="'+ clickHandler + '" tabindex="0"><span class="a11y">The Bot Said </span>' + message + '</div>');
        scrollToBottm();
    }
}

function handleUrl(url) {
    if(url != 'undefined') {
        window.open(url, '_blank');
    } else {
        startThinking(); 
        index = index+5;
        setTimeout(function() {
            displayCards(list, index);
        },1000);
    }
}

function scrollToBottm() {
    $("#chatwrap").animate({ scrollTop: $('#chatwrap').prop("scrollHeight")}, 100);
}

function reply(message) {
    $('#chatwrap')
    .append('<div class="talk-reply" tabindex="0"><span class="a11y">You Said </span>' + message + '</div>');
    scrollToBottm();
}

function searchCards(search_for, selectedLanguage) {
    startThinking();  
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    const url = "http://moonshotmasterapi-env.h8pwparqej.us-east-1.elasticbeanstalk.com/post";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: search_for,
            language: selectedLanguage.substring(0,2)
        })
    })

    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        list = response;
        setTimeout(function() {
            displayCards(response, index);
        },1000);
        return response;
    })
}
function startThinking() {
    $('#chatwrap')
    .append('<div>' + '<img id="thinking" src="./component/images/dotss.gif" style="width:50px" alt="loading"></img>' + '</div>');
}

function stopThinking() {
    if($('#thinking')) {
        $('#chatwrap').children().last().remove();
    }
}
function getPureValue(viewers) {
    if(!viewers) {
        return 1    ;
    }
    return viewers;
}

function displayCards(cards, index) {
    var time = 0;
    for (var i = index; i < index+5 && i < cards.length; i++) {
        displayCard(cards[i], time * 1000);
        time++;
        if(i == index+4 || i == cards.length-1){
            setTimeout(function() {
                stopThinking();
                if(i == cards.length){
                    say("Can I help you with anything else?")
                } else {
                    say('Do you want<a href="#"> more</a>?')
                    say("Can I help you with anything else?")
                } 
            }, 6000);  
        }
    }  

    function displayCard(cardItem, duration) {
        setTimeout(function(){
            stopThinking();
            say(getCard(cardItem), cardItem.url);
            startThinking();
        }, duration);
    }
    
    function getCard(cardItem) {
        return '<div class="row" role="link">' +
                    '<div class="left">' +
                        '<span style="width:100%" id="title"><strong>' + cardItem.title + '</strong></span>' +
                        '<span class="row" id="timestamp" style="font-size: 12px;"><i>Published: ' + displayTime(cardItem.updatedAt) + '</i></span>' +
                        '<span class="row" id="views" style="font-size: 12px;"> Viewers: ' + getPureValue(cardItem.numViewers) + '</span>' +
                    '</div>' +
                    '<div class="right">' +
                        '<img id="cardImage" src="' + cardItem.image + '" style="width:100%" alt="">' +
                    '</div>' +
                '</div>';
    }

    function displayTime(publishedAt){
        var today = new Date();
      
        var difference = today.getTime() - publishedAt;
        var daysDifference = Math.floor(difference/1000/60/60/24);
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24
        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
        var secondsDifference = Math.floor(difference/1000);
    
        var str = "";
        if(daysDifference != 0){
            str += daysDifference;
            if(daysDifference > 1){
                str += " days ";
            } else {
                str += " day ";
            }
        }
        
        if(hoursDifference != 0){
            str += hoursDifference;
            if(hoursDifference > 1){
                str += " hours ";
            } else {
                str += " hour ";
            }
        }
        if(minutesDifference != 0){
            str += minutesDifference;
            if(minutesDifference > 1){
                str += " minutes ";
            } else {
                str += " minute ";
            }
        }
        if(str != null){
            str += "ago";
        }
        
       return str;
    }
    
}
