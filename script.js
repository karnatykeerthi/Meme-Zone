const imgfile = document.querySelector("#imgfile");
const toptext = document.querySelector("#toptext");
const bottomtext = document.querySelector("#bottomtext");
const canvas = document.querySelector("#meme");


let image;

imgfile.addEventListener("change", (e) => {
    const imageDataUrl = URL.createObjectURL(e.target.files[0]);

    image = new Image();
    image.src = imageDataUrl;

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image, toptext.value, bottomtext.value);
    }, { once: true });
});
toptext.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, toptext.value, bottomtext.value);
  });
  
  bottomtext.addEventListener("change", () => {
    updateMemeCanvas(canvas, image, toptext.value, bottomtext.value);
  });
  


function updateMemeCanvas(canvas, image, toptext, bottomtext){
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;
    const fontSize = Math.floor(width / 10);
    const yOffset = height / 25;


    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);

    ctx.strokeStyle = "black";
    ctx.lineWidth = Math.floor(fontSize / 4);
    ctx.fillStyle = "white";
    ctx.textAlign = "center" ;
    ctx.lineJoin = "round";
    ctx.font= `${fontSize}px sans-serif`;

    
    ctx.textBaseline = "top";
    ctx.strokeText(toptext, width / 2, yOffset);
    ctx.fillText(toptext, width / 2, yOffset);

    ctx.textBaseline = "bottom";
    ctx.strokeText(bottomtext, width / 2, height - yOffset);
    ctx.fillText(bottomtext, width / 2, height - yOffset);
}


var ctx = canvas.getContext("2d");
resize();

// resize canvas when window is resized
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

// initialize position as 0,0
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function draw(e) {
  if (e.buttons !== 1) return; // if mouse is not clicked, do not go further

  var color = document.getElementById("hex").value;

  ctx.beginPath(); // begin the drawing path

  ctx.lineWidth = 20; // width of line
  ctx.lineCap = "round"; // rounded end cap
  ctx.strokeStyle = color; // hex color of line

  ctx.moveTo(pos.x, pos.y); // from position
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to position

  ctx.stroke(); // draw it!
}


// add window event listener to trigger when window is resized
window.addEventListener("resize", resize);

// add event listeners to trigger on different mouse events
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
