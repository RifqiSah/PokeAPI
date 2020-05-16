import { Application } from 'express';
import { PokeService } from '../services/pokeApi.service';

export class Controller {
    private pokeService: PokeService;

    constructor(private app: Application) {
        this.pokeService = new PokeService();
        this.routes();
    }

    public routes() {
        this.app.route("/").get(this.pokeService.welcomeMessage);
    }
}