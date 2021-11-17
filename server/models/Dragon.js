const mongoose = require('mongoose');
//okay so this model stores the dragons and the 'traits' of each
//not sure what i'll do for hooking all that up to the appropriate images and displaying but hey that's a problem for future me!
//in the meantime, just get it all working.
//for traits- I'm thinking each trait needs a color value, though idk yet  how I wanna do that
//honestly predefined values probably going to be easier to make look good than rgb or whatever so we'll go with that
//and then for the traits- thinking horns for one, body shape, legs, wings? Maybe spine type?
//these'll all be like. Enums or numbers corresponding to specific things.
//ALSO! they'll all need, like, id of their user, and created data.
//and that's it I think.
//OH AND A NAME!
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

    //various dragon properties later

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