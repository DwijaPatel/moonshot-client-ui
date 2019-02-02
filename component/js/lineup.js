function say(message) {
    $('#chatwrap')
        .append('<div class="talk-say" ><span class="a11y">The Bot Said </span>' + message + '</div>');
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