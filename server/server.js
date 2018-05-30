const express = require('express')
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));

// add static files later...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server listening on port:', PORT));