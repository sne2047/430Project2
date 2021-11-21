const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    //route stuff here, app.post and app.get things

    //first basic account stuff
    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

    //dragons stuff later
    app.get('/maker', mid.requiresLogin, controllers.Dragon.makerPage);
    app.post('/maker', mid.requiresLogin, controllers.Dragon.makeDragon);
    app.get('/getDragons', mid.requiresLogin, controllers.Dragon.getDragons);
};

module.exports = router;