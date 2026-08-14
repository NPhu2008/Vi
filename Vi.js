/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width=800;
canvas.height=450;

const image= new Image();

image.src='tuat.jpg';
let x=0;
let y=0;

let gap=1;
let size=1;

class point {
        constructor(x,y,r,g,b,a){
            this.v=0.08;
            this.v2=5;
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.r=r;
            this.g=g;
            this.b=b;
            this.a=a;
            this.X=x;
            this.Y=y;
            let alpha=Math.random()*Math.PI*2;
            this.vx=Math.cos(alpha);
            this.vy=Math.sin(alpha);
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle=`rgba(${this.r},${this.g},${this.b},${this.a})`;
            ctx.arc(this.x,this.y,size,0,Math.PI*2);
            ctx.fill();
            ctx.closePath();
        }
        update(){
            let ax=(this.X-this.x)*0.05;
            let ay=(this.Y-this.y)*0.85;
            this.vx=this.vx+ax;
            this.vy=this.vy+ay;
            this.x+=this.vx;
            this.y+=this.vy;
            if(Math.abs(this.X-this.x) < 0.5){
                this.x=this.X;
            }
            if(Math.abs(this.Y-this.y)<0.5){
                this.y=this.Y;
            }
        }
        updateBreak(){

            this.vx=(this.cos-this.x)/this.v2;
            this.vy=(this.sin-this.y)/this.v2;
            this.x+=this.vx;
            this.y+=this.vy;
        }
}
let pointArray=[];
image.addEventListener("load",()=>{
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    const dataImage=ctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(dataImage);
    for(y=0;y<canvas.height;y+=gap){
        for(x=0;x<canvas.width;x+=gap){

            const index=(y*canvas.width+x)*4;
            const r=dataImage.data[index];
            const g=dataImage.data[index+1];
            const b=dataImage.data[index+2];
            const a=dataImage.data[index+3];
            const pointImage =new point(x,y,r,g,b,a);
            pointArray.push(pointImage);
        }

    }
    function animation(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i=0;i<pointArray.length;i++){
            pointArray[i].update();
            pointArray[i].draw();
        }
        requestAnimationFrame(animation);
    }
    animation();
});

