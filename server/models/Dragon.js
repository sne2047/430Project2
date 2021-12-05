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
    //update min and max as add more stuffffff
    bodyColor:{
        type: Number,
        required: true,
        min: 0,
        max: 3
    },

    hornType:{
        type: Number,
        required: true,
        min: 0,
        max: 2
    },

    hornColor:{
        type: Number,
        required: true,
        min: 0,
        max: 2
    },

    eyeType: {
        type: Number,
        required: true,
        min: 0,
        max: 2
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
        link: "assets/img/dragonImages/redDragonBase.png",
        premium: false
    },
    1:{
        name:"Green",
        link: "assets/img/dragonImages/greenDragonBase.png",
        premium: false
    },
    2:{
        name:"Blue",
        link: "assets/img/dragonImages/blueDragonBase.png",
        premium: false
    },
    3:{
        name:"Purple",
        link: "assets/img/dragonImages/purpleDragonBase.png",
        premium: true
    }
};

const hornTypes = {
    0:{
        name: "Straight",
        link: "StraightHorns.png",
        premium: false
    },
    1:{
        name: "Swooped back",
        link: "SwoopedBackHorns.png",
        premium: false
    },
    2:{
        name: "Coiled",
        link: "CoiledHorns.png",
        premium: true
    }
};

const hornColors = {
    0:{
        name: "Tan",
        link: "assets/img/dragonImages/tan",
        premium: false
    },
    1:{
        name:"Dark",
        link: "assets/img/dragonImages/dark",
        premium: false
    },
    2:{
        name:"Gold",
        link: "assets/img/dragonImages/gold",
        premium: true
    }
};

const eyeTypes = {
    0:{
        name: "Standard",
        link: "assets/img/dragonImages/standardEyes.png",
        premium: false
    },
    1:{
        name: "Cute",
        link: "assets/img/dragonImages/cuteEyes.png",
        premium: false
    },
    2:{
        name: "Multiple",
        link: "assets/img/dragonImages/multipleEyes.png",
        premium: true
    }
};

//and some static lookup functions
DragonSchema.statics.isOptionPremium = (type, value) => {
    if(type == 0 || type == "bodyColor"){
        return bodyColors[value].premium;
    }
    else if(type == 1 || type == "hornType"){
        return hornTypes[value].premium;
    }
    else if(type == 2 || type == "hornColor"){
        return hornColors[value].premium;
    }
    else if(type == 3 || type == "eyeType"){
        return eyeTypes[value].premium;
    }
    else{
        return false;
    }
}

//one to get a dragon's description
DragonSchema.statics.getDescription = (doc) => (
    `This dragon is named ${doc.name}. It is ${bodyColors[doc.bodyColor].name} and has ${hornColors[doc.hornColor].name} ${hornTypes[doc.hornType].name} horns. 
    It has ${eyeTypes[doc.eyeType].name} eyes.`);


//one later, to get a dragon's imgs
DragonSchema.statics.getImageLinks = (doc) => {
    let imgLinks = {
        body: bodyColors[doc.bodyColor].link,
        horns: `${hornColors[doc.hornColor].link}${hornTypes[doc.hornType].link}`,
        eyes: eyeTypes[doc.eyeType].link
    };
    return imgLinks;
}


//General statics

DragonSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    //add all the other properties once I decide on them and add to schema
    bodyColor: bodyColors[doc.bodyColor].name,
    hornColor: hornColors[doc.hornColor].name,
    hornType: hornType[doc.hornType].name,
    eyeType: eyeTypes[doc.eyeType].name,
});

DragonSchema.statics.findByOwner = (ownerId, callback) => {
    const search = {
        owner: convertId(ownerId),
    };

    return DragonModel.find(search).select('name bodyColor hornColor hornType eyeType').lean().exec(callback);
};

DragonModel = mongoose.model('Dragon', DragonSchema);

module.exports.DragonModel = DragonModel;
module.exports.DragonSchema = DragonSchema;