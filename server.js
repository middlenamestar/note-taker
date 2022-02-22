const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

// MIDDLEWARE. PARSE JSON AND URLENCODED FORM DATA.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// takes everything back to landing page.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`ayy http://localhost:${PORT} 🚀`)
);