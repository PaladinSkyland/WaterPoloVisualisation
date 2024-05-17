import Player from './Player';

class WaterPoloField {
    constructor() {
        this.sex = 'male';
        this.width = (this.sex === 'male') ? 30 : 25; // Largeur du bassin en mètres
        this.height = 20;
    }
}

class Pool {
    constructor() {
        this.waterPoloField = new WaterPoloField();
        
        this.width = 50; // Largeur du bassin en mètres
        this.height = 25; // Hauteur du bassin en mètres
        this.depth = 2; // Profondeur du bassin en mètres

        this.origine_coord_x = 25;
        this.origine_coord_y = -0.5;

        this.players = [];
    }

    getPoolHeight = () => {
        return this.height;
    }
    getPoolWidth = () => {
        return this.width;
    }
    getWaterpoloPoolHeight = () => {
        return this.waterPoloField.height;
    }
    getWaterpoloPoolWidth = () => {
        return this.waterPoloField.width;
    }
    addPlayer(player) {
        this.players.push(player);
    }
  
    removePlayer(tag) {
        this.players = this.players.filter(player => player.tag !== tag);
    }

    movePlayerOrAdd(tag, x, y, z, precision) {
        x += this.origine_coord_x;
        y += this.origine_coord_y;
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