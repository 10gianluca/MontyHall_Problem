class Statistics {
    constructor() {
        this.gamesWithSameDoorWon = [];
        this.gamesWithSameDoorLost = [];
        this.gamesWithDoorChangeWon = [];
        this.gamesWithDoorChangeLost = [];
    }
}
class Door {
    constructor(number, isCar) {
        this.number = number;
        this.isCar = isCar;
        this.opened = false;
    }
}    
class Game {
    constructor() {
        this.doors = [];
        this.doorPicked;
        this.openedGoatDoor;
        this.finalPick;
        this.randomChoice
        this.won;
    }
    setDoors(){
        let door1 = new Door(1, false, false);
        let door2 = new Door(2, false, false);
        let door3 = new Door(3, false, false);     
        this.doors = [door1, door2, door3];

        let carDoor = Math.floor(Math.random()*this.doors.length);
        this.doors[carDoor].isCar = true;
    }
    pickDoor1(){
        this.doorPicked = this.doors[Math.floor(Math.random()*this.doors.length)];
        return this.doorPicked;
    }
    pickDoor2(){
        for (let i = 0 ; i < this.doors.length ; i++){
            this.openedGoatDoor = this.doors[i];
            if (this.openedGoatDoor !== this.doorPicked && this.openedGoatDoor.isCar !== true){
                this.openedGoatDoor.opened = true;
                return this.openedGoatDoor
            }
        }
    }
    pickFinalDoor(){  
        for (let i = 0 ; i < this.doors.length ; i++){
            this.finalPick = this.doors[i];
            if (this.finalPick !== this.doorPicked && this.finalPick !== this.openedGoatDoor){
                return this.finalPick;
            }
        }
    }
    randomize(){
        let doorOption = [this.doorPicked, this.finalPick]
        this.randomChoice = doorOption[Math.floor(Math.random()*doorOption.length)];
        if (this.randomChoice.isCar === true){
            this.won = true;
        }else{
            this.won = false;
        }
    }
    runGame(){
        this.setDoors()
        this.pickDoor1()
        this.pickDoor2()
        this.pickFinalDoor()
        this.randomize()
    }    
}
const numberOfGames = 100000
stat = new Statistics()
for (let i = 0; i < numberOfGames; i++){
    game = new Game();
    game.runGame()
    if (game.randomChoice === game.doorPicked && game.won === true){
       stat.gamesWithSameDoorWon.push(1)
    }else if (game.randomChoice !== game.doorPicked && game.won === true){
        stat.gamesWithDoorChangeWon.push(1)
    }else if (game.randomChoice === game.doorPicked && game.won !== true){
        stat.gamesWithSameDoorLost.push(1)
    }else{
        stat.gamesWithDoorChangeLost.push(1)
    }
}
lengthSameWon = stat.gamesWithSameDoorWon.length
lengthSameLost = stat.gamesWithSameDoorLost.length
lengthChangeWon = stat.gamesWithDoorChangeWon.length
lengthChangeLost = stat.gamesWithDoorChangeLost.length
percentWonSame = (parseInt((parseFloat(lengthSameWon)/(parseFloat(lengthSameWon)+parseFloat(lengthSameLost)))*100))
percentWonChange = (parseInt((parseFloat(lengthChangeWon)/(parseFloat(lengthChangeWon)+parseFloat(lengthChangeLost)))*100))
console.log((percentWonSame)+ "% of games were won when not switching door")
console.log((percentWonChange)+ "% of games were won when switching door")