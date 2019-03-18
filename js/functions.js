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
});

function calculate() {
    var jsonData = {};
    jsonData["assetValue"] = $("input[name='purchasePrice']").val();
    jsonData["depositAmount"] = $("input[name='depositAmount']").val();
    jsonData["productType"] = $("input[name='productType']").val();
    jsonData["earlyRepaymentPeriod"] = $("input[name='earlyRepaymentPeriod']").val();
    jsonData["term"] = parseInt($("select[name='term']").find(":selected").text()) * 12;
    //console.log(parseInt($("select[name='term']").find(":selected").text()));
    ajaxCallRequest("get", endPoint + "/loan/find", jsonData, {
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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }

    }
    return (false);
}


$(document).ready(function () {
    $(".register-name").text(getQueryVariable("name").replace('+', ' '));
    $(".dob").text(getQueryVariable("dob"));
});
