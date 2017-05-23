/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
    init() {
    }

    preload() {
        this.game.load.spritesheet('player', './assets/player.png', 28, 22);
        this.game.load.image('ground', './assets/ground.png');
        this.game.load.image('wall', './assets/wall.png');
        this.game.load.image('coin', './assets/coin.png');
        this.game.load.image('enemy','./assets/enemy.png');
        this.game.load.image('coin', 'assets/coin.png');
        this.game.load.image('dust', 'assets/dust.png');
        this.game.load.image('exp', 'assets/exp.png');

        this.game.load.audio('jump', ['./assets/jump.mp3', './assets/jump.wav']);
        this.game.load.audio('dust', ['assets/dust.wav', 'assets/dust.mp3']);
        this.game.load.audio('dead', ['assets/dead.wav', 'assets/dead.mp3']);
        this.game.load.audio('coin', ['assets/coin.wav', 'assets/coin.mp3']);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)

        this.player = this.game.add.sprite(360, 100, 'player')
        this.loadLevel()

        this.jumpSound = this.game.add.audio('jump', 0.1)

        game.physics.arcade.enable(this.player)
        game.physics.arcade.enable(this.ground)
        game.physics.arcade.enable(this.wall1)
        game.physics.arcade.enable(this.wall2)
        this.player.body.gravity.y = 600

        this.player.body.setSize(20, 20, 0, 0);

        this.ground.body.immovable = true
        this.wall1.body.immovable = true
        this.wall2.body.immovable = true

        this.player.animations.add('idle', [3, 4, 5, 4], 5, true)
        this.player.animations.play('idle')

        this.cursor = game.input.keyboard.createCursorKeys()

        this.hasJumped = false
    }

    update() {
        this.game.physics.arcade.collide(this.player, this.ground)
        this.game.physics.arcade.collide(this.player, this.wall1)
        this.game.physics.arcade.collide(this.player, this.wall2)

        this.inputs()

        if (this.player.body.touching.down) {
            this.hasJumped = false
        }
    }

    loadLevel() {
        this.level = this.game.add.group()
        this.level.enableBody = true

        this.ground = this.game.add.sprite(760/2-160, 400/2-80, 0, 'wall', this.level)
        this.ground = this.game.add.sprite(760/2+140, 400/2-80, 0, 'wall', this.level)
        this.ground = this.game.add.sprite(760/2-160, 400/2, 0, 'ground', this.level)

    }

    putCoinsOnLevel() {
        this.coins = this.game.add.group();
        this.level.enableBody = true;

        this.ground = game.add.sprite(760/2-160,400/2,'ground',0, this.level);
        this.wall1 = game.add.sprite(760/2-160,500/2-80,'wall',0, this.level);
        this.wall2 = game.add.sprite(760/2+140,400/2-80,'wall',0, this.level);

        this.level.setAll('body.immovable', true);
    }

    inputs() {
      if (this.player.body) {
        if (this.cursor.left.isDown) {
          this.player.body.velocity.x = -200
          this.player.frame = 2
        } else if (this.cursor.right.isDown) {
          this.player.body.velocity.x = +200
          this.player.frame = 1
        } else {
          this.player.body.velocity.x = 0
      }
  }

  if (this.cursor.up.isDown) {
    this.jumpPlayer();
  }
    }

    jumpPlayer() {
        this.player.body.velocity.y = -220

        if (!this.hasJumped) {
            this.jumpSound.play()
            this.hasJumped = true
        }
    }

    render() {
        if (__DEV__) {
            // this.game.debug.spriteInfo(this.mushroom, 32, 32)
        }
    }
}
