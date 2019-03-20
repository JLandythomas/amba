/*
Custom Javascript
 */

var token;
var endPoint = "//api.property.jacklogic.com/api";
var email = "ben2@jacklogic.com";
var password = "test1234";
var name;
var dob;

$(document).ready(function () {
    authenticate();
});

function authenticate() {
    var form = $('.listed');
    var jsonData = {};
    jsonData["email"] = email;
    jsonData["password"] = password;
    ajaxCallRequest("post", endPoint + "/login", jsonData, '', 'authenticated');
}

function authenticated(data) {
    setToken(data);
    registerUser();
    getUser();
}

function getUser() {
    var jsonData = {};
    ajaxCallRequest("get", endPoint + "/user", jsonData, {
        "Authorization": 'Bearer ' + token
    }, 'setUser');
}


function setUser(data) {
    name = data.data.user.name;
    dob = data.data.user.user_profile.dob;
    id = data.data.user.id;
    $(".name").text(name);
    $(".dob").text(dob);


}

function registerUser() {
    var jsonData = {};
    //jsonData["id"] = $("input[name='id']").val();
    //jsonData["created_at"] = $("input[name='created-at']").val();
    //jsonData["updated_at"] = $("input[name='updated-at']").val();
    //jsonData["userId"] = $("input[name='user-id']").val();
    //jsonData["addressSource"] = $("input[name='addressSource']").val();
    //jsonData["addressReference"] = $("input[name='addressReference']").val();
    //jsonData["status"] = $("input[name='status']").val();
    ajaxCallRequest("get", endPoint + "/property/request", jsonData, {
        "Authorization": 'Bearer ' + token
    }, 'request');

}

function setToken(data) {
    token = data.token;
}

function request(data) {
    console.log(data);
    //$(".address").text(data.data[0].address_description);
    data.data.forEach(function (element) {
        if (element.status === "wishlist") {
            $(".results ul.wishlist").append('<li>' + element.address_description + '</li>');
        } else {
            $(".results ul.requests").append('<li>' + element.address_description + '</li>');
        }

    });
    $(".number-of-results").text(data.data.length);

}



function ajaxCallRequest(f_method, f_url, f_data, f_headers, callbackMethod) {
    var f_contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    $.ajax({
        url: f_url,
        type: f_method,
        contentType: f_contentType,
        dataType: 'json',
        data: f_data,
        headers: f_headers,
        success: function (data) {
            window[callbackMethod](data);
        }
    });
}
