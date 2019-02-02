function say(message) {
    $('#chatwrap')
        .append('<div class="talk-say"  tabindex="0"><span class="a11y">The Bot Said </span>' + message + '</div>');
        scrollToBottm();
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