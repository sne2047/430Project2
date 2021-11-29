//so this is the app bundle for getting the user control page set up
//critical functions: if logged in, allow user to activate premiun and change password

//password change stuff first!
const handlePasswordChange = (e) => {
    e.preventDefault();

    //the rest of this function waits to be filled out till the stuff it's calling exists
};

const passwordChangeForm = (e) => {
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
