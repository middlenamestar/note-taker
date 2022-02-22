const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// WRITE FILE.
const writeFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.log(`\n☆data written to ${destination}☆`)
    );

// reads from db.json
const readAndWrite = (content, file) =>{
    fs.readFile(file, 'utf8', (err, data) =>{
        if (err){
            console.error(err);
        } else{
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeFile(file, parsedData);
        };
    });
};

// API/NOTES GET
notes.get('/', (req, res) =>
    util.promisify(fs.readFile)('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
    )
);

// POST
notes.post('/', (req, res) =>{
    // console.log(req.body);
    const {title, text} = req.body;
    if(req.body){
        const newNote = {title, text, id: uuidv4()};
        readAndWrite(newNote, './db/db.json');
        res.json('note added successfully.');
    } else{
        res.error('ERROR adding note.');
    };
});

// DELETE
notes.delete('/:id', (req, res) =>{
    const noteID = req.params.id;
    util.promisify(fs.readFile)('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) =>{
        // filters out the selected id and creates new array.
        const result = json.filter((note) => note.id !== noteID);
        // writes the RESULT array(array w.o the selected, deleted id) to db.
        writeFile('./db/db.json', result);
        res.json(`note with id of ${noteID} has been deleted.`);
    });
});

module.exports = notes;