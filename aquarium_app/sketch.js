let img;
let fish = [];
let bubbles = [];

function setup() {
    createCanvas(1000, 1000);
  
    frameRate(60);
}

function draw() {
    clear();
    
    background(color(41, 210, 240));
  
    //UPDATE FISH
    for(i = 0; i < fish.length; i++){
        fish[i].move();
        fish[i].display();
    }
  
    //UPDATE PARTICLES
    for(var i = 0; i < bubbles.length; i++){
        bubbles[i].run();
        
        if(bubbles[i].isDead()){
            bubbles.splice(i, 1);
        }
    }
  
    //SPAWN NEW FISH    
    if(loaded_images.length > 0){
        console.log("aye");
        for(i = 0; i < loaded_images.length; i++){
            console.log(source_images[loaded_images[i]]);

            fish.push(new Fish(source_images[loaded_images[i]]));

            loaded_images.splice(i, 1);
            
            for(var i = 0; i < 100; i++){
                bubbles.push(new Particle(createVector(fish[fish.length-1].x+100, fish[fish.length-1].y+100)));
            }
        }
    }
}

class Fish {
    constructor(fish_source) {
        this.size = 200;
        this.x = random(width-this.size);
        this.y = random(height-this.size);

        console.log(fish_source);
        this.img = loadImage(fish_source);
        this.seed = random(10);
        
        if(random(100) < 50){
          this.speed = 1;
        }else{
          this.speed = -1;
        }
    }

    move() {
        //MOVE FISH
        if(this.x <= 0){
          this.speed = 1;
        }
        
        if(this.x+this.size >= width){
          this.speed = -1;
        }
    
        this.x += this.speed;
      }

    display() {
        push();
        
        //ANIMATE FISH
        if(this.speed == 1){
          applyMatrix(1, sin(frameCount*0.2+this.seed)*0.1, 0, 1, this.x+this.size, this.y);
          
          scale(-1, 1);
        
          image(this.img, 0, 0, this.size, this.size);
        }else{
          applyMatrix(1, sin(frameCount*0.2+this.seed)*0.1, 0, 1, this.x, this.y);
          
          image(this.img, 0, 0, this.size, this.size);
        }
    
        pop();
    }
}
class Particle {
    constructor(position) {
        this.acceleration = createVector(0, -0.08);
        this.velocity = createVector(random(-2, 2), random(-1, 3));
        this.position = position.copy();
        this.lifespan = random(50, 150);
        this.size = random(20, 60);
    }

    run() {
        this.update();
        this.display();
    }

    // Method to update position
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
    }

    // Method to display
    display() {
        stroke(255);
        strokeWeight(2);
        fill(255, 100);
        ellipse(this.position.x, this.position.y, this.size, this.size);
    }

    // Is the particle still useful?
    isDead() {
        if (this.lifespan < 0.0) {
            return true;
        } else {
            return false;
        }
    }
}