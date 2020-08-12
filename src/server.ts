import express, { Application, Request, Response, NextFunction } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// App Variables
const app: Application = express();

// Configuration
app.use(cors());
app.use(express.json());
const port: number = parseInt(process.env.PORT as string, 10);
const uri: string = process.env.MONGOCOMPASS_URI || process.env.MONGOATLAS_URI as string;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
    	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log(`Listening @ ${port}`);
})

connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            throw err.message
            process.exit(1);
        }
        console.log("MongoDB database connection established successfully");
    }
);