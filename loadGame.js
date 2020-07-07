let dataArrButtonColor = [];
let dataArrButtonAnimal = [];
let arrButton = [];
let check = 0;
let checkNext = 0;
let playAgain = 0;
let process = 1;
let again;
let question;
let dotmark;
let next;
let zone1;
let zone2;
let object;
let timer;
let nameColor;
let nameAnimal;
let nameAudio = null;
let audio;
let sound;
let backgroundAudio = null;
let tingAudio;
let audioConfig = {
    mute: false,
    volume: 2,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
};
let mute;
let unmute;
let textProcess;
const numberState = 7;
const constButtonColorX = 250;
const constButtonColorY = 500;
const constButtonAnimalX = 730;
const constButtonAnimalY = 500;

class loadGame extends  Phaser.Scene {

    constructor(){
        super('loadGame');
    }

    preload() {
        var progress = this.add.graphics();
        var text = this.add.text(500, 200, 'Loading game...', {
            font: '50px Arial',
            fill: 'white'
        });

        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 270, 1400 * value, 60);
            text.setText('Loading game...' + Math.floor(value * 100) + '%');
        });
        
        this.load.on('complete', function () {
            progress.destroy();
        });

        // them file .json
        this.load.pack('pack1', "packs/packImages.json");
        this.load.pack('pack2', "packs/packAudio.json");
    }

    create() {
        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
        // bat dau man choi 
        this.startState();
    }

    // xuat hien khi moi game
    startState(){
        this.startSheet = this.add.image(270, 30, 'startSheet').setOrigin(0, 0);

        this.startButton1 = this.add.image(600, 190, 'startButton1').setOrigin(0, 0);
        this.startButton1.setInteractive().on('pointerover', () => {
            this.startButton1.destroy();

            this.startButton2 = this.add.image(565, 170, 'startButton2').setOrigin(0, 0).setInteractive();

            this.startButton2.on('pointerout', () =>{
                this.startSheet.destroy();
                this.startButton2.destroy();
                this.startState();
            })
            // vao man chinh
            this.startButton2.on('pointerup', () => {
                this.startSheet.destroy();
                this.startButton2.destroy();
                this.mainState();
                this.proceed();
                this.createAudio();
            })
        })

    }

    proceed() {
        textProcess = this.add.text(580, 620, 'Process: ' + process + '/' + numberState, {
            font: '40px Arial',
            fill: 'black'
        });
    }

    // khoi tao man chinh
    mainState() {
        this.createQuestion();
        this.createArrButton();
        this.ramdonButton();
        this.buttonColor();
        this.buttonAnimal();

        this.input.on('gameobjectover', function(pointer, gameObject) {
            if(gameObject.name != null){
                gameObject.setTint(0xFF0000);
            }
        });

        this.input.on('gameobjectout', function(pointer, gameObject) {
            gameObject.clearTint();
        });

        this.input.on('gameobjectdown', function(pointer, gameObject){
            if(gameObject.name != null){
                nameAudio = gameObject.name + 'Audio';
                console.log(nameAudio);
            }
        })
        
        this.dragAndDrop();
    }

    // chuyen man choi
    nextState() {
        this.destroyObject();
        this.mainState();
        textProcess.setText('Process: ' + process + '/' + numberState);
    }

    //ket thuc game
    endState() {
        this.destroyObject();
        textProcess.destroy();
        backgroundAudio.destroy();
        mute.destroy();
        unmute.destroy();
        sound = this.sound.add('clapSound');
        sound.play(audioConfig);
        again = this.add.image(700, 500, 'playAgain').setOrigin(0.5, 0.5);
        again.name = null;
        again.setInteractive().on('pointerdown', function() {
            playAgain = 1;
            sound.destroy();
        });

        again.on('pointerover', function() {
            again.setScale(1.25);
        });

        again.on('pointerout', function() {
            again.setScale(1);
        });

        this.congra = this.add.image(350, 50, 'congratulation').setOrigin(0, 0);
    }
     // bat dau mot game moi
     newGame() {
        dataArrButtonColor = [];
        dataArrButtonAnimal = [];
        arrButton = [];
        check = 0;
        checkNext = 0;
        playAgain = 0;
        process = 1;
        nameAudio = null;
        audioConfig = {
            mute: false,
            volume: 2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        this.scene.start('loadGame');
    }
    // them danh sach cac nut vao day
    createArrButton() {
        var button = null;
        for(var i = 0; i < 8; i++){
            switch(i){
                case 0: button = 'black'; break;
                case 1: button = 'green'; break;
                case 2: button = 'purple'; break;
                case 3: button = 'yellow'; break;
                case 4: button = 'cat'; break;
                case 5: button = 'dog'; break;
                case 6: button = 'dragon'; break;
                case 7: button = 'tiger'; break;
            }
            arrButton[i] = this.add.image(0, 0, button).setOrigin(0, 0);
            arrButton[i].visible = false;
            arrButton[i].setName(button);
            console.log(arrButton[i].name);
        }
    }

    // tao cac day ngau nhien
    ramdonButton() {  
        while(dataArrButtonAnimal.length < 3){
            // day con vat
            let index = Phaser.Math.Between(4,7);
            let dataAnimal = arrButton[index];

            if(dataArrButtonAnimal.length === 0){
                dataArrButtonAnimal.push(dataAnimal);
            }
            else{
                if(dataArrButtonAnimal.indexOf(dataAnimal) === -1){
                    dataArrButtonAnimal.push(dataAnimal);
                }
            }
        } 
        
        while(dataArrButtonColor.length < 3){
              // day mau
              let index = Phaser.Math.Between(0,3)
              let dataColor = arrButton[index];

              if(dataArrButtonColor.length === 0){
                  dataArrButtonColor.push(dataColor);
              }
              else{
                  if(dataArrButtonColor.indexOf(dataColor) === -1){
                      dataArrButtonColor.push(dataColor);
                  }
              }
        }
    }

    // hien thi day mau
    buttonColor() {
        console.log('Button color');
        var len = dataArrButtonColor.length;

        for (var i = 0; i < len; i++){
            dataArrButtonColor[i].setInteractive();
            dataArrButtonColor[i].visible = true;
            dataArrButtonColor[i].x = constButtonColorX + i * 160;
            dataArrButtonColor[i].y = constButtonColorY;
            this.input.setDraggable(dataArrButtonColor[i]);
        }
    }

    // hien thi day dong vat
    buttonAnimal() {
        console.log('Button Animal');
        var len = dataArrButtonAnimal.length;

        for (var i = 0; i < len; i++){
            dataArrButtonAnimal[i].setInteractive();
            dataArrButtonAnimal[i].visible = true;
            dataArrButtonAnimal[i].x = constButtonAnimalX + i * 160;
            dataArrButtonAnimal[i].y = constButtonAnimalY;
            this.input.setDraggable(dataArrButtonAnimal[i]);
        }
    }

    // khoi tao cau hoi
    createQuestion() {
        question = this.add.text(400, 400, "This is a                        .", {
            font: "50px Arial", 
            fill: "black"
        }).setOrigin(0, 0);

        this.tutorial = this.sound.add('tutorial');
        this.tutorial.play(audioConfig);

        dotmark = this.add.image(600, 70, 'dotmark').setOrigin(0, 0);

        zone1 = this.add.image(600, 400, 'zone1').setOrigin(0, 0).setInteractive();
        zone1.setName('color');
        zone2 = this.add.image(755, 400, 'zone2').setOrigin(0, 0).setInteractive();
        zone2.setName('animal');

    }
    //keo tha
    dragAndDrop() {

        // bat dau keo
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

            // xet vung tha 
            var name = gameObject.name;
            if(name === 'black' || name === 'green' || name == 'yellow' || name === 'purple'){
                zone1.input.dropZone = true;     
            } else {
                if(name === 'cat' || name == 'dog' || name === 'dragon' || name === 'tiger'){
                    zone2.input.dropZone = true;    
                }
            }
        });

        // tha
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y; 

            var name = gameObject.name;

            // khi tha dung vi tri
            if(dropZone.name === 'color'){
                nameColor = name;
                console.log(nameColor);

            } else {
                if(dropZone.name === 'animal'){
                    nameAnimal = name;
                    console.log(nameAnimal);
                }
            }
            if(nameAnimal != null && nameColor != null){
                check = 1;
                console.log(check);
            }
            tingAudio.play(audioConfig);
            dropZone.visible = false;
            gameObject.input.enabled = false;

        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped){
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }

            var name = gameObject.name;
            if(name === 'black' || name === 'green' || name == 'yellow' || name === 'purple'){
                zone1.input.dropZone = false;
            } else {
                if(name === 'cat' || name == 'dog' || name === 'dragon' || name === 'tiger'){
                    zone2.input.dropZone = false;
                }
            }
        });
    }
    // khoi tao audio nen
    createAudio(){
        let config = {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        };
        tingAudio = this.sound.add('tingAudio');
        backgroundAudio = this.sound.add('backgroundAudio');
        backgroundAudio.play(config);
        // bat am
        mute = this.add.image(110, 80, 'mute').setOrigin(0.5, 0.5);
        mute.name = null;
        mute.visible = false;   
        mute.setInteractive().on('pointerdown', function(){
            if(backgroundAudio.mute){
                backgroundAudio.mute = false;
            }
            mute.visible = false;
            unmute.visible = true;
        });
        mute.on('pointerover', function() {
            mute.setScale(1.2);
        });
        mute.on('pointerout', function() {
            mute.setScale(1);
        })
        // tat am
        unmute = this.add.image(110, 80, 'unmute').setOrigin(0.5, 0.5);
        unmute.name = null;   
        unmute.visible = true;
        unmute.setInteractive().on('pointerdown', function(){
            if(!backgroundAudio.mute){
                backgroundAudio.mute = true;
            }
            unmute.visible = false;
            mute.visible = true;
        });
        unmute.on('pointerover', function() {
            unmute.setScale(1.2);
        });
        unmute.on('pointerout', function() {
            unmute.setScale(1);
        })
    }
    // hien thi ket qua
    createImage(nameColor, nameAnimal) {
        dotmark.destroy();
        var name = nameColor + nameAnimal;

        sound = this.sound.add(nameAnimal + 'Sound');
        sound.play(audioConfig);

        console.log(name);
        object = this.add.image(600, 70, name).setOrigin(0, 0);
        next = this.add.image(1000, 70, 'next').setOrigin(0.5, 0.5);
        
        next.name = null;
    
        next.setInteractive().on('pointerup', function(){
            checkNext = 1;
            process++;
            next.destroy();
        });
    
        next.on('pointerover', function(){
            next.setScale(1.25);
        });
    
        next.on('pointerout', function(){
            next.setScale(1);
        });    
    }
    // huy cac doi tuong
    destroyObject() {
        zone1.destroy();
        zone2.destroy();
        question.destroy();
        dotmark.destroy();
        object.destroy();
        // next.destroy();
        nameColor = null;
        nameAnimal = null;
       
        for(var i = 0; i < dataArrButtonColor.length; i++){
            dataArrButtonColor[i].destroy();
        }
        
        for(var i = 0; i < dataArrButtonAnimal.length; i++){
            dataArrButtonAnimal[i].destroy();
        }

        dataArrButtonColor = [];
        dataArrButtonAnimal = [];
        arrButton = [];
        
    }    

    update() {
        if(check){
            check = 0;
            timer = this.time.delayedCall(700, function(){
                this.createImage(nameColor, nameAnimal);
            }, [], this);
        }

        if(nameAudio != null){
            audio = this.sound.add(nameAudio);
            audio.play(audioConfig);
            nameAudio = null;
        }

        if(checkNext){
            checkNext = 0;
            audio = this.sound.add(nameColor + nameAnimal + 'Audio');
            audio.play(audioConfig);
            timer = this.time.delayedCall(2000, function(){
                if(process <= numberState){
                    this.nextState();
                } else {
                    this.endState();
                }
                
            }, [], this);
        }

        if(playAgain){
            playAgain = 0;
            timer = this.time.delayedCall(500, function(){
                this.newGame();
            }, [], this);
        }
    }
}