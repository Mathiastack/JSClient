$(document).ready(() => {
    const debug = false;

    const fields = ['newFirstName', 'newLastName', 'newEmail', 'newPassword', 'newPasswordVerify'];

    $("#registerButton").click(() => {
        let details = [
            {
                newEmail: $("#newEmail").val(),
                newFirstName: $("#newFirstName").val(),
                newLastName: $("#newLastName").val(),
                newPassword: $("#newPassword").val(),
                newPasswordVerify: $("#newPasswordVerify").val(),
            },
        ];
        //used in validateDetails below
        function isEmpty(str) {
            return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
        }

        function validateDetails(array, keys) {
            let errors = 0;
            debug && console.log("array i validateDetails: ", array);
            debug && console.log("keys i validateDetails: ", keys);
            keys.forEach(function (k) {
                if (k in array[0]) {
                    if (isEmpty(array[0][k])) {
                        console.log(k, "is empty");
                        errors += 1;
                    }
                } else {
                    console.log(k, "doesn't exist");
                }
            });
            return errors <= 0;
        }

        debug && console.log("validateDetails result: ", validateDetails(details, fields));

        if (!validateDetails(details, fields)) {
            document.getElementById("emptyError").innerHTML = "Information missing";
        } else {
            if (details[0].newPassword.valueOf() !== details[0].newPasswordVerify.valueOf()) {
                $("#newPassword").val('');
                $("#newPasswordVerify").val('');
                document.getElementById("emptyError").innerHTML = "Passwords don't match";
                return;
            }
            SDK.Student.register(details[0].newFirstName, details[0].newLastName, details[0].newEmail, details[0].newPassword, details[0].newPasswordVerify, (err, data) => {
                if (err && err.xhr.status === 400) {
                    $(".form-group").addClass("Client fail");
                } else if (err) {
                    console.log("Error");
                } else {
                    window.alert(details[0].newFirstName + " has been registered successfully");
                    window.location.href = "login.html"
                }
            });
        }
    });
    $("#goBackButton").click(() => {
        window.location.href = "login.html";
    });
});