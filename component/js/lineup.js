function say(message) {
    $('#chatwrap')
        .append('<div class="talk-say" ><span class="a11y">The Bot Said </span>' + message + '</div>');
        scrollToBottm();
}
function scrollToBottm() {
    $("#chatwrap").animate({ scrollTop: $('#chatwrap').prop("scrollHeight")}, 100);
}