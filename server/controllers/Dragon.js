const models = require('../models');
const { DragonSchema } = require('../models/Dragon');

const { Dragon } = models;

//maker page
const makerPage = (req, res) => {
    Dragon.DragonModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error occured.'});
        }

        return res.render('app', {csrfToken: req.csrfToken(), dragons: docs});
    });
};

//make dragon
const makeDragon = (req, res) => {
    //check that have required info
    if(!req.body.name || !req.body.bodyColor || !req.body.hornType || !req.body.hornColor || !req.body.eyeType){
        return res.status(400).json({error: "All fields are required to create a dragon."});
    }

    //check that user is premium if trying to use premium options
    if(true /*!user is premium*/){
        if(Dragon.DragonModel.isOptionPremium("bodyColor", req.body.bodyColor) ||
            Dragon.DragonModel.isOptionPremium("hornType", req.body.hornType) ||
            Dragon.DragonModel.isOptionPremium("hornColor", req.body.hornColor) ||
            Dragon.DragonModel.isOptionPremium("eyeType", req.body.eyeType)
        ){
            return res.status(400).json({error: "You are attempting to use premium options that you do not have access to."});
        }
    }

    //okay if we get here we're good to make the dragon
    //data for our new dragon
    const dragonData = {
        name: req.body.name,
        bodyColor: req.body.bodyColor,
        hornType: req.body.hornType,
        hornColor: req.body.hornColor,
        eyeType: req.body.eyeType,
        owner: req.session.account._id,
    };

    //make our new dragon
    const newDragon = new Dragon.DragonModel(dragonData);

    //set up the promise and the appropriate functions
    const dragonPromise = newDragon.save();

    dragonPromise.then(() => res.json({ redirect: '/maker'}))
        .catch((err) => {
            console.log(err);
            if(err.code === 11000) {
                return res.status(400).json({error: 'Dragon already exists.'});
            }
            return res.status(400).json({error: 'An error occured.'});
        });

    //aaaaaand return!
    return dragonPromise;
};

//get a user's dragons, ccalled getDragons
const getDragons = (request, response) => {
    const req = request;
    const res = response;

    return Dragon.DragonModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error occurred.'});
        }

        //later want to alter this for image links or whatever
        docs.forEach((item, index) => {
            docs[index].description = Dragon.DragonModel.getDescription(item);
        });

        return res.json({dragons: docs});
    });
}

//export all that
module.exports.makerPage = makerPage;
module.exports.makeDragon = makeDragon;
module.exports.getDragons = getDragons;