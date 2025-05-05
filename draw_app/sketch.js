let img;
let canvas;

let colorPicker;
let sizePicker;
let submitButton;

let brushColor;
let brushSize = 2;

function setup(){
    canvas = createCanvas(500, 500);
    canvas.parent("drawing_canvas");
    
    colorPicker = document.getElementById("brush_color");
    
    brushColor = colorPicker.value;
    
    colorPicker.addEventListener('input', function() { 
        console.log("Input value changed:", colorPicker.value);
        brushColor = colorPicker.value;
    }); 
    
    sizePicker = document.getElementById("brush_size");
    
    brushsize = sizePicker.value;
    
    sizePicker.addEventListener('input', function() { 
        console.log("Input value changed:", sizePicker.value); 
        brushSize = sizePicker.value;
    });
}

function draw(){
    stroke(brushColor);
    
    strokeWeight(brushSize*4);
    
    if (mouseIsPressed === true) {
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}