const notes = require('express').Router();
const fs = require('fs');
const util = require('util');

notes.get('/', (req, res) =>
    util.promisify(fs.readFile)('./db/db.json').then((whatever) =>
    res.json(JSON.parse(whatever))
    )
);

notes.post('/', (req, res) =>{
    const {title, text} = req.body;
    if(req.body){
        const newNote = {title, text};
    }
    
});

module.exports = notes;