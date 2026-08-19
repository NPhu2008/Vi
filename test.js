
const scene = new THREE.Scene();
/** @type {typeof import('three')} */
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1000);
camera.lookAt(0,10,50);
camera.position.set(0,10,50);
const render=new THREE.WebGLRenderer();
render.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(render.domElement);
const controls=new THREE.OrbitControls(camera,render.domElement);

const geometry=new THREE.BufferGeometry();

const pointCount=99999;
const position= new Float32Array(pointCount*3);
const positionBegin= new Float32Array(pointCount*3)
const Begin=new Float32Array(pointCount*3);
const color=new Float32Array(pointCount*3);
for(let i=0;i/3<pointCount;i+=3){
    Begin[i]=0;
    Begin[i+1]=10;
    Begin[i+2]=10;
    const radius2=300;
    if(i/3<pointCount*1/10){
        const radius=15;
        
        const height=Math.random()*10;
        const angle=Math.random()*Math.PI*2;
        const angleBegin=Math.random()*Math.PI*2;
        positionBegin[i]=300*(Math.random()-0.5);
        positionBegin[i+1]=500*(Math.random()-0.1);
        positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);
        color[i]=255/255;
        color[i+1]=105/255;
        color[i+2]=180/255;
    }
    if(i/3>pointCount*2/10&&i/3<pointCount*3/10){
        color[i]=147/255;
    color[i+1]=112/255;
    color[i+2]=219/255;
    const angleBegin=Math.random()*Math.PI*2;
    const radius=10;
    const height=10+Math.random()*6;
    const angle=Math.random()*Math.PI*2;
    positionBegin[i]=300*(Math.random()-0.5);
    positionBegin[i+1]=500*(Math.random()-0.1);
    positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);

    }
    if(i/3<pointCount*2/10&&i/3>pointCount*1/10){
        const radius=15*Math.random();
        const height=10;
        const angle=Math.random()*Math.PI*2;
        const angleBegin=Math.random()*Math.PI*2;
        positionBegin[i]=300*(Math.random()-0.5);
        positionBegin[i+1]=500*(Math.random()-0.1);
        positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);
        color[i]=255/255;
        color[i+1]=105/255;
        color[i+2]=180/255;
    }
    if(i/3>pointCount*3/10&&i/3<pointCount*4/10){
        const radius=10*Math.random();
        const height=16;
        const angle=Math.random()*Math.PI*2;
        const angleBegin=Math.random()*Math.PI*2;
        positionBegin[i]=300*(Math.random()-0.5);
        positionBegin[i+1]=500*(Math.random()-0.1);
        positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);
        color[i]=147/255;
        color[i+1]=112/255;
        color[i+2]=219/255;
    }
    if(i/3>pointCount*4/10&&i/3<pointCount*5/10){
        const radius=1*Math.random();
        const height=16+Math.random()*7;
        const angle=Math.random()*Math.PI*2;
        const angleBegin=Math.random()*Math.PI*2;
        positionBegin[i]=300*(Math.random()-0.5);
        positionBegin[i+1]=500*(Math.random()-0.1);
        positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);
        color[i]=1;
        color[i+1]=1;
        color[i+2]=1;
    }
    if(i/3>pointCount*5/10&&i/3<pointCount*6/10){
        const radius=15*Math.random();
        const height=0
        const angle=Math.random()*Math.PI*2;
        const angleBegin=Math.random()*Math.PI*2;
        positionBegin[i]=300*(Math.random()-0.5);
        positionBegin[i+1]=500*(Math.random()-0.1);
        positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);
        color[i]=1;
        color[i+1]=1;
        color[i+2]=1;
    }
    if(i/3>pointCount*6/10){
        color[i]=255/255;
        color[i+1]=105/255;
        color[i+2]=180/255;
        const radius=100*Math.random();
        const height=300*(Math.random()-0.1);
        const angle=Math.random()*Math.PI*2;
        const angleBegin=Math.random()*Math.PI*2;
        positionBegin[i]=300*(Math.random()-0.5);
        positionBegin[i+1]=500*(Math.random()-0.1);
        positionBegin[i+2]=radius2*Math.sin(angleBegin);
        position[i]=radius*Math.cos(angle);
        position[i+1]=height;
        position[i+2]=radius*Math.sin(angle);
    }

    
}
geometry.setAttribute("position",new THREE.BufferAttribute(Begin,3));
geometry.setAttribute("color",new THREE.BufferAttribute(color,3));
function Texture(){
    const canvas=document.createElement('canvas');
    canvas.width=32;
    canvas.height=32;
    const ctx = canvas.getContext('2d');
    const gradient= ctx.createRadialGradient(16,16,0,16,16,16);
    gradient.addColorStop(0,"rgba(255,255,255,1)");
    gradient.addColorStop(0.5,"rgba(255,255,255,0.8)");
    gradient.addColorStop(1,"rgba(255,255,255,0)");
    ctx.fillStyle=gradient;
    ctx.beginPath();
    ctx.arc(32,32,32,0,Math.PI*2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
}
const material =new THREE.PointsMaterial({
    size:0.3,
    vertexColors:true,
    transparent:true,
    opacity:1,
    blending: THREE.AdditiveBlending,
    depthWrite:false,
    map:Texture()
});

let step=-1;
let count=0;

const cake=new THREE.Points(geometry,material);
scene.add(cake);
const clock = new THREE.Clock();
const elapsedTime = clock.getElapsedTime();
let vx=0,vy=0,vz=0; 
function animation(){
    count++
    const positionNow = geometry.attributes.position.array;
    for(let i=0;i/3<pointCount;i+=3){
        if(count<1500 && count>500){
            step=1;
        }
        if(count>=1500){
            step=0;
        }
        if(step==1){
            
            vx=(positionBegin[i]-Begin[i])*0.005;
            vy=(positionBegin[i+1]-Begin[i+1])*0.005;
            vz=(positionBegin[i+2]-Begin[i+2])*0.005;
        }
        if(step==0){
            vx=(position[i]-Begin[i])*0.01;
            vy=(position[i+1]-Begin[i+1])*0.01;
            vz=(position[i+2]-Begin[i+2])*0.01;
        }
        if(step==-1){
         
        }
        Begin[i]+=vx;
        Begin[i+1]+=vy;
        Begin[i+2]+=vz;
        
    }
    if(step==0){
        cake.rotation.y+=0.001;
    }
    geometry.attributes.position.needsUpdate = true;
    render.render(scene,camera);
    requestAnimationFrame(animation);
}
animation();