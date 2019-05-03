window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };

  function startGame() {
    Driving.init('carCanvas')
    // Driving.drawRoadLine()
    Driving.loadImage('../starter_code/images/car.png')
  }
};

const Driving = {

  version: '1.0',
  name: 'controlApp element',
  description: `Create element for game`,
  author: 'Noah',
  canvasDom: undefined,
  winW: undefined,
  winH: undefined,
  cont: undefined,
  car: undefined,
  donaldTrump: [],
  timer: 0,
  init: function (id) {
    this.canvasDom = document.getElementById(id)
    this.cont = this.canvasDom.getContext('2d')
    this.setArea()
    this.drawFill()
    this.eventListener()
  },

  setArea: function () {
    this.canvasDom.setAttribute('width', 710)
    this.canvasDom.setAttribute('height', 730)
    this.winH = 730
    this.winW = 710
  },

  drawFill: function () {
    this.cont.fillStyle = 'green'
    this.cont.fillRect(0, 0, this.winW, this.winH)
    this.cont.fillStyle = 'grey'
    this.cont.fillRect(40, 0, this.winW - 80, this.winH)
    this.cont.fillStyle = 'white'
    this.cont.fillRect(60, 0, this.winW - 120, this.winH)
    this.cont.fillStyle = 'grey'
    this.cont.fillRect(80, 0, this.winW - 160, this.winH)
  },

  drawRoadLine: function () {

    this.cont.strokeStyle = 'white'
    this.cont.setLineDash([60, 20])
    this.cont.beginPath()
    this.cont.lineDashOffset = this.velRoad;
    this.cont.moveTo(this.winW / 2, 0) // x / y  linea que empieza
    this.cont.lineWidth = 5
    this.cont.lineTo(this.winW / 2, this.winH) // x / y linea que acaba
    this.cont.stroke()
    
    this.velRoad -= 2

  },
  loadImage: function (url) {
    this.car = new Car(this.cont, url, this.winW, this.winH)
    this.obstacles = new Obstacles(this.cont, this.winW, this.winH)
    this.velRoad = 0;
    setInterval(() => {
      this.clear()
      this.drawFill()
      this.drawRoadLine()
      this.car.carDraw()
      
       if(this.timer > 100){
        this.donaldTrump.push( this.obstacles = new Obstacles(this.cont, this.winW, this.winH))
        console.log(this.donaldTrump)
        this.timer = 0
       }
       this.donaldTrump.forEach(obs => {
        obs.update()
       })
       this.timer++
    }, 1000 / 60)

  },

  clear: function () {
    this.cont.clearRect(0, 0, this.winW, this.winH)
  },

  eventListener: function () {
    document.onkeyup = e => {
      if (e.keyCode === 37) this.car.moveL()
      if (e.keyCode === 39) this.car.moveR()

    }
  }
}
// Car setting 
class Car {

  constructor(cont, url, winW, winH) {
    this.cont = cont
    this.winW = winW
    this.winH = winH

    this.posX = 80
    this.vel = 10
    this.carWidth = 60

    this.img = new Image()
    this.img.src = url
  }

  carDraw() {
    this.cont.drawImage(this.img, this.posX, this.winH-100, this.carWidth, 100)
  }
  moveL() {
    if (this.posX > 80) this.posX -= this.vel
  }

  moveR() {
    if (this.posX < this.winW -80 - this.carWidth) this.posX += this.vel
  }
}

//Obstacles
class Obstacles {
  constructor(cont,winW, winH) {
    this.winW = this.randomNum(100,400)
    this.winH = 30
    this.cont = cont

    this.posX = this.randomNum(80,230)
    this.posY = 0
    this.veloc = 5
  }

  update() {
    this.cont.fillStyle = 'red';
    this.cont.fillRect(this.posX, this.posY, this.winW, this.winH);
    this.posY+= this.veloc
    
  }
  randomNum (min,max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min
    
  }
}
