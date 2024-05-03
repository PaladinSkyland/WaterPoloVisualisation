import Player from './Player';

class Pool {
    constructor() {
        this.sex = 'male';
        this.width = (this.sex === 'male') ? 30 : 25; // Largeur du bassin en mètres
        this.height = 20;

        this.players = [];
    }
  
    addPlayer(player) {
        this.players.push(player);
    }
  
    removePlayer(tag) {
        this.players = this.players.filter(player => player.tag !== tag);
    }

    movePlayerOrAdd(tag, x, y, z, precision) {
        let player = this.players.find(player => player.tag === tag);
        if (!player) {
            let newplayer = new Player(tag, x, y, z, precision);
            this.addPlayer(newplayer);
        }
        if (player) {
            player.x = x;
            player.y = y;
            player.z = z;
            player.precision = precision;
        }
    }
}
export default Pool;