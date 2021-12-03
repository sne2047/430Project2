//so this is the app bundle for getting the user control page set up
//critical functions: if logged in, allow user to activate premiun and change password
//password change stuff first!
const handlePasswordChange = e => {
  e.preventDefault();
  clearError();

  if ($("#newPass1").val() == '' || $("#newPass2").val() == '') {
    //then one of the new passwords is blank
    handleError("All fields are required.");
  }

  if ($("#newPass1").val() != $("#newPass2").val()) {
    //if the new passwords dont match
    handleError("New passwords do not match.");
  }

  sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);
  return false;
};

const PasswordChangeForm = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "passwordChangeForm",
    name: "passwordChangeForm",
    onSubmit: handlePasswordChange,
    action: "/user" //redirect to this same page
    ,
    method: "POST",
    className: "mainForm" //may need changing, shared w stuff in client.js

  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "currentPassword"
  }, "Current Password:"), /*#__PURE__*/React.createElement("input", {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "Current Password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPass1"
  }, "New Password:"), /*#__PURE__*/React.createElement("input", {
    id: "newPass1",
    type: "password",
    name: "newPass1",
    placeholder: "New Password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPass2"
  }, "Retype New Password:"), /*#__PURE__*/React.createElement("input", {
    id: "newPass2",
    type: "password",
    name: "newPass2",
    placeholder: "Retype New Password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  }));
}; //add premium stuff


const handleGivePremium = e => {
  e.preventDefault();
  clearError(); //add stuff when ready to do so
};

const GivePremiumForm = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "givePremiumForm",
    name: "givePremiumForm",
    onSubmit: handleGivePremium,
    action: "/givePremium" //make that go back to /user!
    ,
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "GET PREMIUM!"
  }));
}; //and the final proper setup


const setup = csrf => {
  //Nav stuff or something idk??
  //may need to do some stuff to be able to call password change and premium
  ReactDOM.render( /*#__PURE__*/React.createElement(PasswordChangeForm, {
    csrf: csrf
  }), document.querySelector("#passwordChange"));
  ReactDOM.render( /*#__PURE__*/React.createElement(GivePremiumForm, {
    csrf: csrf
  }), document.querySelector("#givePremium"));
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, result => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
const handleError = message => {
  $("#errorMessage").text(message);
  $("#errorDiv").animate({
    width: 'toggle'
  }, 350);
};

const clearError = () => {
  $("#errorMessage").text("");
  $("#errorDiv").animate({
    width: 'hide'
  }, 350);
};

const redirect = response => {
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
    error: function (xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
