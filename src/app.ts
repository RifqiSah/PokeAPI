import express from "express";
import { Application } from 'express';
import bodyParser from "body-parser";
import cors from "cors";

import { MONGO_URL } from './constants/pokeApi.constants';
import mongoose from "mongoose";

import { Controller } from './controllers/main.controller';

class App {
    public app: Application;
    public pokeController: Controller;

    constructor() {
        this.app = express();                        
        this.setConfig();
        this.setMongoConfig();

        this.pokeController = new Controller(this.app);
    }
    
    private setConfig() {
        this.app.use(bodyParser.json({ limit: "50mb" })); // Allows us to receive requests with data in json format
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(cors()); // Enables cors
    }

    private setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    }
}

export default new App().app;