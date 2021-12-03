//so this is the app bundle for getting the user control page set up
//critical functions: if logged in, allow user to activate premiun and change password

//password change stuff first!
const handlePasswordChange = (e) => {
    e.preventDefault();

    clearError();

    if($("#newPass1").val() == '' || $("#newPass2").val() == ''){
        //then one of the new passwords is blank
        handleError("All fields are required.");
    }

    if($("#newPass1").val() != $("#newPass2").val()){
        //if the new passwords dont match
        handleError("New passwords do not match.");
    }
    
    sendAjax('POST', $("#passwordChangeForm").attr("action"), $("#passwordChangeForm").serialize(), redirect);

    return false;
};

const PasswordChangeForm = (props) => {
    return(
        <form id="passwordChangeForm" name="passwordChangeForm"
                onSubmit={handlePasswordChange}
                action="/user"//redirect to this same page
                method="POST"
                className="mainForm"//may need changing, shared w stuff in client.js
            >
            <label htmlFor="currentPassword">Current Password:</label>
            <input id="password" type="password" name="password" placeholder="Current Password" />
            <label htmlFor="newPass1">New Password:</label>
            <input id="newPass1" type="password" name="newPass1" placeholder="New Password" />
            <label htmlFor="newPass2">Retype New Password:</label>
            <input id="newPass2" type="password" name="newPass2" placeholder="Retype New Password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
}


//add premium stuff

const handleGivePremium = (e) => {
    e.preventDefault();

    clearError();

    //add stuff when ready to do so
}

const GivePremiumForm = (props) => {
    return(
        <form id="givePremiumForm" name="givePremiumForm"
                onSubmit={handleGivePremium}
                action="/givePremium" //make that go back to /user!
                method="POST"
                className="mainForm"
            >
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="GET PREMIUM!" />
        </form>
    );
}



//and the final proper setup

const setup = (csrf) => {
    //Nav stuff or something idk??
    //may need to do some stuff to be able to call password change and premium

    ReactDOM.render(
        <PasswordChangeForm csrf={csrf} />, document.querySelector("#passwordChange")
    );

    ReactDOM.render(
        <GivePremiumForm csrf={csrf} />, document.querySelector("#givePremium")
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) =>{
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
