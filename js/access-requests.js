/*
Custom Javascript
 */

var token;
var endPoint = "//api.property.jacklogic.com/api";
var email = "ben2@jacklogic.com";
var password = "test1234";

$(document).ready(function () {
    authenticate();
    $(".request-button").click(function () {
        registerUser();
    });
});

function authenticate() {
    var form = $('.access-requests');
    var jsonData = {};
    jsonData["email"] = email;
    jsonData["password"] = password;
    ajaxCallRequest("post", endPoint + "/login", jsonData, '', 'setToken');
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
    registerUser();
}

function request(data) {
    console.log(data);
    //$(".address").text(data.data[0].address_description);
    data.data.forEach(function (element) {
        console.log(element);
        $(".results tbody").append('<tr><th scope="row" class="address">' + element.address_description + '</th> <td class="text-center">1</td><td class="dots">...</td></tr>');

    });
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
