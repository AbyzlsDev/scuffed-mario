'use strict'
const Game = new Phaser.Game(1920, 960, Phaser.AUTO, 'game-canvas', { preload, create, update, render })

let player, cursors, ground, NPC, layer1,background, playerCreated = false

let map1, map2, loadmsd

let stage = 0

let Keys, key1, key2, collectedKeys = 0, keyOrder = 1, keyCount = 0

let LuckyBlocks, luckyblock, luckyBlockHit = false

let Pillars, pillar

let Coins, coin, coinCount, coinsCreated = false, collectedCoins = 0

const speed = 2

let endLuckyBlockGroup, endLuckyBlock, endLuckyBlockHits = 1, LuckyBlockScale = 0.5

let TrophyGroup, Trophy

let text, textSent = 0, text1, text2

let BGMusic, coinSound, winSound, deathSound, jump, up, jumpUsed = false

let MushroomGroup, mushroom, collectedMushrooms = 0, mushRoomScaleTrue = false, playerScale = 0.4





function preload() {
    
    Game.load.spritesheet('player','./assets/spritesheets/super_mario.png', 291 / 3, 572 / 4)
    Game.load.spritesheet('enemy','./assets/spritesheets/enemies.png', 360 / 5, 144 / 2)
    Game.load.image('tileset', './tilemaps/32x32_tileset_mario.png')
    Game.load.image('coin', './assets/collectables/coin.png')
    Game.load.image('luckyblock', './assets/collectables/luckyblock.png')
    Game.load.image('pillar', './assets/terrain/pillar.png')
    Game.load.spritesheet('key1', './assets/collectables/key1.png')
    Game.load.spritesheet('key2', './assets/collectables/key2.png')
    Game.load.image('trophy', './assets/collectables/trophy.png')
    Game.load.audio('BG_Music', './assets/audio/Theme_Song.mp3');
    Game.load.audio('coin', './assets/audio/Coin_Sound.mp3');
    Game.load.audio('win', './assets/audio/Stage_Win.mp3');
    Game.load.audio('death', './assets/audio/Mario_Death.mp3');
    Game.load.audio('up', './assets/audio/Super Mario Power Up Sound Effect.mp3');
    Game.load.audio('jump', './assets/audio/Mario_Jump.mp3');
    Game.load.image('mushroom', './assets/collectables/Classic_Mushroom.png')
    Game.load.tilemap('level1', './levels/level1.json', null, Phaser.Tilemap.TILED_JSON)
    Game.load.tilemap('end', './levels/end.json', null, Phaser.Tilemap.TILED_JSON)
    Game.load.image('background', './assets/backgrounds/level1.png')
    Game.load.image('background2', './assets/backgrounds/end.png')
   
    
   
    
}


function create() {
  


    Game.physics.startSystem(Phaser.Physics.ARCADE)
    
    Game.time.advancedTiming = true;

    Coins = Game.add.group()
  Coins.enableBody = true

  LuckyBlocks = Game.add.group()
  LuckyBlocks.enableBody = true
 

  Pillars = Game.add.group()
  Pillars.enableBody = true

  Keys = Game.add.group()
 Keys.enableBody = true

 endLuckyBlockGroup = Game.add.group()
 endLuckyBlockGroup.enableBody = true

 TrophyGroup = Game.add.group()
 TrophyGroup.enableBody = true

 MushroomGroup = Game.add.group()
 MushroomGroup.enableBody = true

   

   BGMusic = Game.add.audio('BG_Music')
   BGMusic.play();

   coinSound = Game.add.audio('coin')

   winSound = Game.add.audio('win')

   deathSound = Game.add.audio('death')

   jump = Game.add.audio('jump')

   up = Game.add.audio('up')
  
   

   

   

    cursors = Game.input.keyboard.createCursorKeys()

    
    stage1()

   
    
}

function stage1(){
 
    stage = 1
    background =  Game.add.image(0,0,'background')

    map1 = Game.add.tilemap('level1')

    map1.addTilesetImage('32x32_tileset_mario','tileset')

    map1.setCollisionByExclusion([])

    
   
    ground = map1.createLayer(0)
    


    layer1 = map1.createLayer(1)
  

    map1.setTileIndexCallback(403, NPCkill);


    pillar = Pillars.create(Game.width / 2 + 900, Game.height / 2 + 280,'pillar')
  pillar.anchor.setTo(0.5)
  pillar.body.immovable = true

  player = Game.add.sprite(200, 800, 'player')
    player.anchor.setTo(0.5)
    player.scale.setTo(playerScale)
    player.animations.add('fly', [0,1,2], 10, true)
    Game.physics.enable(player)
  player.body.collideWorldBounds = true
  player.body.gravity.y = 600;
  playerCreated = true 

  CreateCoins()
  LuckyBlockGenerator()

  Game.world.bringToTop(Coins)
  Game.world.bringToTop(LuckyBlocks)
  Game.world.bringToTop(Pillars)
  Game.world.bringToTop(Keys)
  Game.world.bringToTop(MushroomGroup)

    
}

function end(){

  stage = 2
  background =  Game.add.image(0,0,'background2')
  background.width = 1920
  background.height = 960
    map2 = Game.add.tilemap('end')

    map2.addTilesetImage('32x32_tileset_mario','tileset')

    map2.setCollisionByExclusion([])

    
   
    ground = map2.createLayer(0)
    
player.x = 0 
player.y = Game.height / 2 + 200

    endLuckyBlockGenerate()
    Game.world.bringToTop(endLuckyBlockGroup)
    Game.world.bringToTop(player)
    Game.world.bringToTop(TrophyGroup)


}
  

  

   
   function CreateCoins(){
       switch(stage){
case 1:
       switch(coinsCreated){

    case false:

    

    for(let i = 0, incr = 0; i < 5; i++){
      coin = Coins.create((Game.width / 2 + 550) - incr, Game.height / 2 + 50, 'coin')
      incr += 50
        coin.scale.setTo(0.07)
        coin.anchor.setTo(0.5)
        coin.body.immovable = true
        coinCount++
        coinsCreated = true
       

    }

    for(let i = 0, incr = 0; i < 2; i++){
        coin = Coins.create((Game.width / 2 - 700) - incr, Game.height / 2 + 150, 'coin')
            incr += 50
          coin.scale.setTo(0.07)
          coin.anchor.setTo(0.5)
          coin.body.immovable = true
          coinCount++
          coinsCreated = true
          
      }
    
      break
      

      case true:

        for(let i = 0,incr = 0; i < 4; i++){
            coin = Coins.create((Game.width / 2 + 200) - incr, Game.height / 2 + 150, 'coin')
            incr += 50
              coin.scale.setTo(0.07)
              coin.anchor.setTo(0.5)
              coin.body.immovable = true
              coinCount++
              
      
          }

    }
       
 break




 case 2:

   break
      
    }
 }

 function LuckyBlockGenerator(){

        switch(stage){

            case 1:
            
        luckyblock = LuckyBlocks.create(Game.width / 2 + 400, Game.height / 2 + 200,'luckyblock')
        luckyblock.anchor.setTo(0.5)
        luckyblock.scale.setTo(0.2)
        luckyblock.body.immovable = true
        luckyblock.id = 1

        luckyblock = LuckyBlocks.create(Game.width / 2 + 400, Game.height / 2 - 10,'luckyblock')
        luckyblock.anchor.setTo(0.5)
        luckyblock.scale.setTo(0.2)
        luckyblock.body.immovable = true
        luckyblock.id = 2

        luckyblock = LuckyBlocks.create(Game.width / 2 + 700, Game.height / 2 - 300,'luckyblock')
        luckyblock.anchor.setTo(0.5)
        luckyblock.scale.setTo(0.2)
        luckyblock.body.immovable = true
        luckyblock.id = 4

        luckyblock = LuckyBlocks.create(Game.width / 2, Game.height / 2 - 200,'luckyblock')
        luckyblock.anchor.setTo(0.5)
        luckyblock.scale.setTo(0.2)
        luckyblock.body.immovable = true
        luckyblock.id = 5


        for(let i = 0,incr = 0; i < 3; i++){
            luckyblock = LuckyBlocks.create((Game.width / 2 + 100) - incr, Game.height / 2 + 150, 'luckyblock')
            incr += 300
              luckyblock.scale.setTo(0.2)
              luckyblock.anchor.setTo(0.5)
              luckyblock.immovable = true
              luckyblock.id = 3

        }
        break
          
        }
      


 }

function LuckyBlock(player, luckyblock) {

switch(luckyblock.id){

    case 1:

    luckyBlockHit = true 
    luckyblock.kill()
    CreateCoins()
    

break

case 2:

    luckyblock.kill()
    KeySummon()

    break
    


case 3:

    luckyblock.kill()

    break
    
case 4:

  luckyblock.kill()
 mushroom = MushroomGroup.create(Game.width / 2 + 700, Game.height / 2 - 350, 'mushroom')
 mushroom.anchor.setTo(0.5)
 mushroom.scale.setTo(0.09)
 mushroom.body.collideWorldBounds = true
 mushroom.body.gravity.y = 600;

break

    

    case 5:

  luckyblock.kill()
 KeySummon()

break

}
    
}
function toLevel2(){
    
    if(collectedCoins == 11 && collectedKeys == 2 && collectedMushrooms == 1){

       
       ground.kill()
       layer1.kill()
       pillar.kill()
      LuckyBlocks.kill()
      background.kill()
       end()
       

    }
    
      
    
   
      }

      function endLuckyBlockGenerate() {

        endLuckyBlock = endLuckyBlockGroup.create(Game.width / 2, Game.height / 2 + 200, 'luckyblock')
        endLuckyBlock.anchor.setTo(0.5)
        endLuckyBlock.scale.setTo(LuckyBlockScale)
        endLuckyBlock.body.immovable = true
        endLuckyBlock.id = 5

      }

      function TrophyGenerate (){

        Trophy = TrophyGroup.create(Game.width / 2, Game.height / 2 - 10,'trophy')
        Trophy.anchor.setTo(0.5)
        Trophy.body.collideWorldBounds = true
        Trophy.body.gravity.y = 600;

      }

      function KeySummon(){
          switch(keyOrder){
case 1:

  key1 = Keys.create(Game.width / 2 + 400, Game.height / 2 - 60, 'key1')
  key1.anchor.setTo(0.5)
  key1.body.collideWorldBounds = true
  key1.body.gravity.y = 600;

  keyOrder++
  
  
break

case 2:

  key1 = Keys.create(Game.width / 2 - 100, Game.height / 2 - 60, 'key2')
  key1.anchor.setTo(0.5)
  key1.body.collideWorldBounds = true
  key1.body.gravity.y = 600;
  

break


          }


      }
      
    

function update() {

  

    switch(stage){
      
case 1:
      switch(textSent){

        case 0:
        text = Game.add.text(0,0, `Coins to collect: ${11 - collectedCoins}`, {
        font: "30px Arial",
        fill: "#fff",
        align: "center"
});

text1 = Game.add.text(0,50, `Keys to collect: ${2 - collectedKeys}`, {
  font: "30px Arial",
  fill: "#fff",
  align: "center"
});

text2 = Game.add.text(0,100, `Mushrooms to collect: ${1 - collectedMushrooms}`, {
  font: "30px Arial",
  fill: "#fff",
  align: "center"
});
        textSent++
        break

        case 1:
          text.destroy()
          text1.destroy()
          text2.destroy()
          text = Game.add.text(0,0, `Coins to collect: ${11 - collectedCoins}`, {
          font: "30px Arial",
          fill: "#fff",
          align: "center"
  });
  text1 = Game.add.text(0,50, `Keys to collect: ${2 - collectedKeys}`, {
    font: "30px Arial",
    fill: "#fff",
    align: "center"
});

text2 = Game.add.text(0,100, `Mushrooms to collect: ${1 - collectedMushrooms}`, {
  font: "30px Arial",
  fill: "#fff",
  align: "center"
});
          textSent++
          break

          case 2:
          text.destroy()
          text1.destroy()
          text2.destroy()
          text = Game.add.text(0,0, `Coins to collect: ${11- collectedCoins}`, {
          font: "30px Arial",
          fill: "#fff",
          align: "center"
  });

  text1 = Game.add.text(0,50, `Keys to collect: ${2 - collectedKeys}`, {
    font: "30px Arial",
    fill: "#fff",
    align: "center"
});
text2 = Game.add.text(0,100, `Mushrooms to collect: ${1 - collectedMushrooms}`, {
  font: "30px Arial",
  fill: "#fff",
  align: "center"
});

          textSent--
          break

      }
break

case 2:

  text.destroy()
  text1.destroy()
  text2.destroy()

if(LuckyBlockScale == 0) {

  text = Game.add.text(Game.width / 2, Game.height / 2, `You win!`, {
    font: "60px Impact",
    fill: "#fff",
    align: "center"
});
text.anchor.setTo(0.5)

}

break

    }
 
    if(mushRoomScaleTrue == true){

      playerScale = 0.6

    }

    Game.physics.arcade.collide(player, ground)

    Game.physics.arcade.collide(Keys, ground)

    Game.physics.arcade.collide(TrophyGroup, ground)

    Game.physics.arcade.collide(MushroomGroup, ground)

    Game.physics.arcade.collide(player, Keys, KeysCollect)

    Game.physics.arcade.collide(player, Coins, CoinCollect)

    Game.physics.arcade.collide(player, MushroomGroup, mushroomEat)

    Game.physics.arcade.collide(player, LuckyBlocks, LuckyBlock)

    Game.physics.arcade.collide(player, Pillars, toLevel2)
    
    Game.physics.arcade.collide(player, endLuckyBlock, EndLuckyBlock)

    



     if (cursors.up.isDown) {

      
        
        player.y -= 8
        
        
} 
    if(cursors.right.isDown) {

        player.body.velocity.x += speed;
        player.animations.play('fly')
        player.scale.setTo(playerScale)
       
        
      
    }

   else if(cursors.left.isDown) {

    player.body.velocity.x -= speed;
       player.animations.play('fly')
       player.scale.setTo(-playerScale, playerScale)
       
      
      
    } else {
        player.body.velocity.x = 0;
        player.frame = 0
        
        
    }
} 


  

function NPCkill(){

    
  
  player.body.velocity.x = 0
  player.body.velocity.y = 0
    BGMusic.stop()
    deathSound.play()
    player.kill()
    
    setTimeout(function reload(){location.reload()}, 3000)
    

       

    

}

function mushroomEat(player, mushroom){
  
      
  mushroom.kill()
  collectedMushrooms++
  up.play()
  mushRoomScaleTrue = true
  

 
  
 

}

function CoinCollect(player, coin){

    coin.kill()
    collectedCoins++
    coinSound.play()


}

function KeysCollect(player, Keys){

  

  

  
  key1.kill()
  collectedKeys++


 

  
}




function EndLuckyBlock(player, endLuckyBlockGroup){
  endLuckyBlock.kill()


  switch(endLuckyBlockHits){
    case 1:
      endLuckyBlockHits++
      LuckyBlockScale = 0.4
      
      break
  
      case 2:

        endLuckyBlockHits++
        LuckyBlockScale = 0.3

      break

      case 3:

        endLuckyBlockHits++
        LuckyBlockScale = 0.2

      break

      case 4:

        endLuckyBlockHits++
        LuckyBlockScale = 0.1

      break

      case 5:

       
        LuckyBlockScale = 0.0
        endLuckyBlockGroup.enableBody = false
      break


  
  }

if(LuckyBlockScale > 0){

    endLuckyBlockGenerate()

}

else {
 

    TrophyGenerate()

    BGMusic.stop()

    winSound.play()

    setTimeout(function reload(){BGMusic.play()}, 6000) 

}


}

   function render() {


    Game.debug.text(Game.time.fps, 2, 14, "#00ff00");
   }

    




    



