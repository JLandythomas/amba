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
        calculate();
    });
    $(".reset").click(function () {});
});

function calculate() {
    var jsonData = {};
    jsonData["name"] = $("input[name='name']").val();
    //console.log(parseInt($("select[name='term']").find(":selected").text()));
    ajaxCallRequest("get", "select_option.html", jsonData, {
        "Authorization": 'Bearer ' + token
    }, 'mortgageCalculator');
}

function authenticate() {
    var form = $('.register');
    var jsonData = {};
    jsonData["email"] = email;
    jsonData["password"] = password;
    ajaxCallRequest("post", endPoint + "/login", jsonData, '', 'setToken');
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

    function setToken(data) {
        token = data.token;
    }
}
