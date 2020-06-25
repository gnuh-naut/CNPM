let dataArrButtonColor = [];
let dataArrButtonAnimal = [];
let arrButton = [];
let question;
let zone1;
let zone2;
const constButtonColorX = 250;
const constButtonColorY = 500;
const constButtonAnimalX = 730;
const constButtonAnimalY = 500;


class loadGame extends  Phaser.Scene {

    constructor(){

        super('loadGame');
    }

    preload() {
        // them file .json
        this.load.pack('pack1', "packs/packImages.json");
    }

    create() {

        this.background = this.add.image(0, 0, "background").setOrigin(0, 0);

        // bat dau man choi 
        this.startState();

        
        // this.add.image(650, 100, 'blackcat').setOrigin(0, 0);
        // this.yellow = this.add.image(250, 500, 'yellow').setOrigin(0, 0);
        // this.purple = this.add.image(410, 500, 'purple').setOrigin(0, 0);
        // this.blue = this.add.image(570, 500, 'green').setOrigin(0, 0);
        // this.dragon = this.add.image(730, 500, 'dragon').setOrigin(0, 0);
        // this.cat = this.add.image(890, 500, 'cat').setOrigin(0, 0);
        // this.tiger = this.add.image(1050, 500, 'tiger').setOrigin(0, 0);
    }

    // xuat hien khi moi game
    startState(){
        this.startSheet = this.add.image(270, 60, 'startSheet').setOrigin(0, 0);

        this.startButton1 = this.add.image(600, 220, 'startButton1').setOrigin(0, 0);
        this.startButton1.setInteractive().on('pointerover', () => {
            this.startButton1.destroy();

            this.startButton2 = this.add.image(565, 200, 'startButton2').setOrigin(0, 0).setInteractive();

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
            })
        })

    }

    // khoi tao man chinh
    mainState() {
         this.createQuestion();
        this.createArrButton();
        this.ramdonButton();
        this.buttonColor();
        this.buttonAnimal();
    }

    // them danh sach cac nut vao day
    createArrButton() {
        arrButton[0] = this.add.image(0, 0, 'black').setOrigin(0, 0);
        arrButton[0].visible = false;
        arrButton[1] = this.add.image(0, 0, 'green').setOrigin(0, 0);
        arrButton[1].visible = false;
        arrButton[2] = this.add.image(0, 0, 'purple').setOrigin(0, 0);
        arrButton[2].visible = false;
        arrButton[3] = this.add.image(0, 0, 'yellow').setOrigin(0, 0);
        arrButton[3].visible = false;
        arrButton[4] = this.add.image(0, 0, 'cat').setOrigin(0, 0);
        arrButton[4].visible = false;
        arrButton[5] = this.add.image(0, 0, 'dog').setOrigin(0, 0);
        arrButton[5].visible = false;
        arrButton[6] = this.add.image(0, 0, 'dragon').setOrigin(0, 0);
        arrButton[6].visible = false;
        arrButton[7] = this.add.image(0, 0, 'tiger').setOrigin(0, 0);
        arrButton[7].visible = false;
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
              console.log(index);

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
            dataArrButtonColor[i].visible = true;
            dataArrButtonColor[i].x = constButtonColorX + i * 160;
            dataArrButtonColor[i].y = constButtonColorY;
            
            console.log(dataArrButtonColor[i].x, dataArrButtonColor[i].y);
        }
    }

    // hien thi day dong vat
    buttonAnimal() {
        console.log('Button Animal');
        var len = dataArrButtonAnimal.length;

        for (var i = 0; i < len; i++){
            dataArrButtonAnimal[i].visible = true;
            dataArrButtonAnimal[i].x = constButtonAnimalX + i * 160;
            dataArrButtonAnimal[i].y = constButtonAnimalY;
            
            console.log(dataArrButtonAnimal[i].x, dataArrButtonAnimal[i].y);
        }
    }

    // khoi tao cau hoi
    createQuestion() {
        question = this.add.text(400, 400, "This is a                        .", {

            font: "50px Arial", 
            fill: "black"

        }).setOrigin(0, 0);

        zone1 = this.add.image(600, 400, 'zone1').setOrigin(0, 0);
        zone2 = this.add.image(755, 400, 'zone2').setOrigin(0, 0);

    }

    update() {


    }
}