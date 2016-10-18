$(document).ready(function () {
    var txtDisplayName = $('#txtDisplayName'),
        txtMessage = $('#txtMessage'),
        dlChat = $('#chat'),
        chat = $.connection.chatHub;

    chat.client.broadcastMessage = function (name, message) {        
        dlChat.append($('<dt />').text(name)).
            append($('<dd />').text(message));
    };   
    
    $.connection.hub.start().done(function () {
        $('#btnSend').click(function () {            
            chat.server.send(txtDisplayName.val(), txtMessage.val());            
            txtMessage.val('').focus();
        });
    });

    $("#dialog").dialog({
        autoOpen: true,
        modal: true,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            }
        }
    });
});