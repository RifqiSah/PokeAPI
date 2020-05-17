import { Request, Response } from "express";
import { WELCOME_MESSAGE } from '../constants/pokeApi.constants';

import { Pokemon } from '../models/pokemon.model';
import { MongooseDocument } from "mongoose";

export class PokeService {
    public welcomeMessage(req: Request, res: Response) {
        return res.status(200).send(WELCOME_MESSAGE);
    }
    
    // Get all data
    public getAllPokemon(req: Request, res: Response) {
        Pokemon.find({}, (e: Error, pokemon: MongooseDocument) => {
            if (e) res.send(e);
            res.json(pokemon);
        });
    }

    // Add data
    public addPokemon(req: Request, res: Response) {
        const poke = new Pokemon(req.body);
        poke.save((e: Error, pokemon: MongooseDocument) => {
            if (e) res.send(e);
            res.json(pokemon);
        });
    }

    // Delete data
    public deletePokemon(req: Request, res: Response) {
        const pokemonID = req.params.id;
        Pokemon.findByIdAndDelete(pokemonID, (e: Error, deleted: any) => {
            if (e) res.send(e);

            const msg = deleted ? "Deleted Successfully!" : "Pokemon not found!";
            res.json(msg);
        });
    }

    // Update data
    public updatePokemon(req: Request, res: Response) {
        const pokemonID = req.params.id;
        Pokemon.findByIdAndUpdate(pokemonID, req.body, (e: Error, pokemon: any) => {
            if (e) res.send(e);

            const msg = pokemon ? "Pokemon updated!" : "Pokemon not found!";
            res.json(msg);
        });
    }
}