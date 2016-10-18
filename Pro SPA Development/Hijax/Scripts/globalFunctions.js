/// <reference path="jquery.js" />
(function () {
    $(document).ready(function () {
        $('#userDetails').submit(function (evt) {
            evt.preventDefault();
            
            $.ajax({
                url: 'api/hijax',
                data: $(this).serialize(),
                type: 'JSON',
                method: 'POST',
                success: function (data) {
                    $('<div>').text("You inserted user name: " + data.Username + ' and password: ' + data.Password).appendTo('#response');                           
                }
            });
        });
    });
}());