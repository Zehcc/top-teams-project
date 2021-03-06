const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(   
    {
        name: { type: String, required: true, trim: true },
        age: { type: Number, required: false, trim: true },
        nationality: { type: String, required: true, trim: true },
        img: { type: String, required: false, trim: true }
    },
    {
        timestamps: true
    }
);

const Player = mongoose.model('players', playerSchema);

module.exports = Player;