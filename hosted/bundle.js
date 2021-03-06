const handleDragon = e => {
  e.preventDefault();
  clearError();

  if ($("#dragonName").val() == '') {
    //possibly if any of the others are at -1?
    handleError("A name is needed to create a dragon.");
    return false;
  }

  sendAjax('POST', $("#dragonForm").attr("action"), $("#dragonForm").serialize(), function () {
    loadDragonsFromServer();
  });
  return false;
};

const DragonForm = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "dragonForm",
    onSubmit: handleDragon,
    name: "dragonForm",
    action: "/maker",
    method: "POST",
    className: "dragonForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name:"), /*#__PURE__*/React.createElement("input", {
    id: "dragonName",
    type: "text",
    name: "name",
    placeholder: "Dragon Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "bodyColor"
  }, "Body Color:"), /*#__PURE__*/React.createElement("select", {
    id: "dragonBodyColor",
    name: "bodyColor"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Red"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Green"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Blue"), /*#__PURE__*/React.createElement("option", {
    value: "3"
  }, "Purple")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "hornType"
  }, "Horn Type:"), /*#__PURE__*/React.createElement("select", {
    id: "dragonHornType",
    name: "hornType"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Straight"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Swooped Back"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Coiled")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "hornColor"
  }, "Horn Color:"), /*#__PURE__*/React.createElement("select", {
    id: "dragonHornColor",
    name: "hornColor"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Tan"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Dark"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Gold")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "eyeType"
  }, "Eye Type:"), /*#__PURE__*/React.createElement("select", {
    id: "dragonEyeType",
    name: "eyeType"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "Standard"), /*#__PURE__*/React.createElement("option", {
    value: "1"
  }, "Cute"), /*#__PURE__*/React.createElement("option", {
    value: "2"
  }, "Multi-eye")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDragonSubmit",
    type: "submit",
    value: "Make Dragon"
  }));
};

const DragonList = function (props) {
  if (props.dragons.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "dragonList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDragon"
    }, "No Dragons yet"));
  }

  const dragonNodes = props.dragons.map(function (dragon) {
    return (
      /*#__PURE__*/
      //redo the div to display images

      /*
      <div key={dragon._id} className="dragon">
          <h3 className="dragonDescription">
              Name: {dragon.name}
          </h3>
          <p>
              {dragon.description}
          </p>
      </div>
      */
      React.createElement("div", {
        key: dragon._id,
        className: "dragon"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "dragonName"
      }, "Name: ", dragon.name), /*#__PURE__*/React.createElement("div", {
        className: "dragonImageBox"
      }, /*#__PURE__*/React.createElement("img", {
        src: dragon.imageLinks.body,
        alt: dragon.descripion
      }), /*#__PURE__*/React.createElement("img", {
        className: "dragonPart",
        src: dragon.imageLinks.horns,
        alt: ""
      }), /*#__PURE__*/React.createElement("img", {
        className: "dragonPart",
        src: dragon.imageLinks.eyes,
        alt: ""
      })))
    );
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "dragonList"
  }, dragonNodes);
};

const loadDragonsFromServer = () => {
  sendAjax('GET', '/getDragons', null, data => {
    ReactDOM.render( /*#__PURE__*/React.createElement(DragonList, {
      dragons: data.dragons
    }), document.querySelector("#Dragons"));
  });
};

const setup = csrf => {
  ReactDOM.render( /*#__PURE__*/React.createElement(DragonForm, {
    csrf: csrf
  }), document.querySelector("#makeDragon"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DragonList, {
    dragons: []
  }), document.querySelector("#Dragons"));
  loadDragonsFromServer();
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
