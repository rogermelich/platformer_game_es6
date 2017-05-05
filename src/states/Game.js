/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        this.game.load.spritesheet('player', './assets/player.png', 28, 22)
        this.game.load.image('ground', './assets/ground.png')
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.player = this.game.add.sprite(250, 50, 'player')

        this.game.add.sprite(760 / 2 - 160, 400 / 2, 'ground')

        game.physics.arcade.enable(this.player)
        this.player.body.gravity.y = 600

        this.player.body.setSize(20, 20, 0, 0);

        this.player.animations.add('idle', [3, 4, 5, 4], 5, true)
        this.player.animations.play('idle')
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.ground)
    }

    render() {
        if (__DEV__) {
            // this.game.debug.spriteInfo(this.mushroom, 32, 32)
        }
    }
}
