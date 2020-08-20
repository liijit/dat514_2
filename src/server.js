const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

//initialise express in order to use it throughout our application
const app = express();

// Configuration
const port = process.env.PORT;
const uri = process.env.MONGOCOMPASS_URI || process.env.MONGOATLAS_URI;

app.use(cors());
app.use(express.json());

const register = require('./routes/register')
const login = require('./routes/login');

// const globalFuncs = require('./routes/globalFuncs')
// const userRouter = require('./routes/user')
// const plantsRouter = require('./routes/plants')

app.use('/register', register)
app.use('/login', login)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Listening @ ${port}`);
})


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            throw err.message
            process.exit(1);
        }
        console.log("MongoDB database connection established successfully");
    }
);