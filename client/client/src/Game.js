class Game {
    players;
    game;
    constructor(){
        this.players = [];
        this.game;
    }

    getPlayers(){
        return this.players;
    }

    addPlayer(player){
        this.players.push(player);
    }
}
