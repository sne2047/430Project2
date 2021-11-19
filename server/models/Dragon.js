const mongoose = require('mongoose');
//okay so this model stores the dragons and the 'traits' of each
//not sure what i'll do for hooking all that up to the appropriate images and displaying but hey that's a problem for future me!
//in the meantime, just get it all working.
//Plus some means of finding them too, similar to the prev proj

mongoose.Promise = global.Promise;
const _ = require('underscore');

let DragonModel = {};

//mongoose.types.objectid is a function which
//converts a string ID to a real mongo id
//useful for later!
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DragonSchema = new mongoose.Schema({
    //incomplete for now till I get the specifics hammered out a lil better
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },

    //various dragon properties
    bodyColor:{
        type: Number,
        required: true,
        min: 0,
        max: 3
    },

    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },

    createdData: {
        type: Date,
        default: Date.now,
    },
});

//HERE COMES THE DRAGON PROPERTIES

const bodyColors = {
    0:{
        name: "Red",
        //add an img link
        premium: false
    },
    1:{
        name:"Green",
        //add an img link
        premium: false
    },
    2:{
        name:"Blue",
        //add an img link
        premium: false
    },
    3:{
        name:"Purple",
        //add an img link
        premium: true
    }
};

const hornTypes = {
    0:{
        name: "Straight",
        //add part of a link, needs combine with horn color
        premium: false
    },
    1:{
        name: "Swooped back",
        //partial link
        premium: false
    },
    2:{
        name: "Coiled",
        //partial link
        premium: true
    }
};

const hornColors = {
    0:{
        name: "Tan",
        //partial link
        premium: false
    },
    1:{
        name:"Dark",
        //partial link
        premium: false
    },
    2:{
        name:"Gold",
        //partial link
        premium: true
    }
};

const eyeTypes = {
    0:{
        name: "Standard",
        //img link
        premium: false
    },
    1:{
        name: "Cute",
        //img link
        premium: false
    },
    2:{
        name: "Multi-eye",
        //img link
        premium: true
    }
};

//and some static lookup functions

//one to get a dragon's description

//one later, to get a dragon's imgs

//one to get just a name by index






//General statics

DragonSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    //add all the other properties once I decide on them and add to schema
});

DragonSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return DragonModel.find(search).select('name'/*add other properties*/).lean().exec(callback);
};

DragonModel = mongoose.model('Dragon', DragonSchema);

module.exports.DragonModel = DragonModel;
module.exports.DragonSchema = DragonSchema;