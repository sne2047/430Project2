const handleError = (message) => {
    $("#errorMessage").text(message);
};

const clearError = () => {
    $("#errorMessage").text("");
}

const redirect = (response) => {
    clearError();
    window.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error : function(xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};