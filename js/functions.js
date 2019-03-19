/*
Custom Javascript
 */

var token;
var endPoint = "//api.property.jacklogic.com/api";
var email = "ben@jacklogic.com";
var password = "test1234";

$(document).ready(function () {
    authenticate();
    $(".register-button").click(function () {
        registerUser();
    });
});

function authenticate() {
    var form = $('.register');
    var jsonData = {};
    jsonData["email"] = email;
    jsonData["password"] = password;
    ajaxCallRequest("post", endPoint + "/login", jsonData, '', 'setToken');
}

function registerUser() {
    var jsonData = {};
    jsonData["name"] = $("input[name='name']").val();
    jsonData["dob"] = $("input[name='dob']").val();
    jsonData["email"] = $("input[name='email']").val();
    jsonData["address1"] = $("input[name='address1']").val();
    jsonData["postcode"] = $("input[name='postcode']").val();
    jsonData["password"] = $("input[name='password']").val();
    jsonData["password-confirmation"] = $("input[name='password-confirmation']").val();
    ajaxCallRequest("post", endPoint + "/register", jsonData, {
        "Authorization": 'Bearer ' + token
    }, 'register');

}

function setToken(data) {
    token = data.token;
}

function register(data) {
    console.log(data);
    $(".test").text(name);
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
