import Player from './Player';

class WaterPoloField {
    constructor() {
        this.male_width = 30;
        this.female_width = 25;
        this.height = 20;
    }

    getWidth = (gender) => {
        return gender === 'female' ? this.female_width : this.male_width;
    }

    getHeight = () => {
        return this.height;
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
        this.playersLinks = [];
    }

    getPoolHeight = () => {
        return this.height;
    }
    getPoolWidth = () => {
        return this.width;
    }
    getWaterpoloPoolHeight = () => {
        return this.waterPoloField.getHeight();
    }
    getWaterpoloPoolWidth = (gender) => {
        return this.waterPoloField.getWidth(gender);
    }
    addPlayer(player) {
        this.players.push(player);
    }
  
    removePlayer(tag) {
        this.players = this.players.filter(player => player.tag !== tag);
    }

    movePlayerOrAdd(tag, x, y, z, precision, instant_speed) {
        x += this.origine_coord_x;
        y += this.origine_coord_y;
        let player = this.players.find(player => player.tag === tag);
        if (!player) {
            let newplayer = new Player(tag, x, y, z, precision, instant_speed);
            this.addPlayer(newplayer);
        }
        if (player) {
            player.time = time;
            player.x = x;
            player.y = y;
            player.z = z;
            player.precision = precision;
            player.speed = instant_speed;
        }
    }
}
export default Pool;