const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
    res.render('login', {csrfToken: req.csrfToken() });
}; //remember to do the react thing to put login & signup on the same page

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

const userPage = (req, res) => {
    //this is to be the page w/ password change form and ability to get premium
    //okay so it's probably gonna need to call something from the client stuff like login page
    //and then have the ability to change password and enable premium from there
    //probably going to need seperate functions for that. I think?
}

const login = (request, response) => {
    const req = request;
    const res = response;

    //forcecast to strings to cover some security flaws.
    //is this data sanatizing? idk.
    const username = `${req.body.username}`;
    const password = `${req.body.pass}`;

    if(!username || !password) {
        return res.status(400).json({ error: "All fields are required."});
    }

    return Account.AccountModel.authenticate(username, password, (err, account) => {
        if(err || !account) {
            return res.status(401).json({error:'Wrong username or password.'});
        }

        req.session.account = Account.AccountModel.toAPI(account);

        return res.json({ redirect: '/maker'});
    });
};

const signup = (request, response) => {
    const req = request;
    const res = response;

    //cast to string to cover some security flaws
    req.body.username = `${req.body.username}`;
    req.body.pass = `${req.body.pass}`;
    req.body.pass2 = `${req.body.pass2}`;

    if(!req.body.username || !req.body.pass || !req.body.pass2){
        return res.status(400).json({error: 'All fields are required.'});
    }

    if(req.body.pass !== req.body.pass2) {
        return res.status(400).json({error: 'The passwords do not match.'});
    }

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) =>{
        const accountData = {
            username: req.body.username,
            salt,
            password: hash,
        };

        const newAccount = new Account.AccountModel(accountData);

        const savePromise = newAccount.save();

        savePromise.then(() => {
            req.session.account = Account.AccountModel.toAPI(newAccount);
            res.json({redirect: '/maker'});
        });

        savePromise.catch((err) => {
            console.log(err);

            if(err.code === 11000) {
                return res.status(400).json({error: 'Username already in use. '});
            }

            return res.status(400).json({error: 'An error occured.'});
        });
    });
};

const getToken = (request, response) => {
    const req = request;
    const res = response;

    const csrfJSON = {
        csrfToken: req.csrfToken(),
    };

    res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;