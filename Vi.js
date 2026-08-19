const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = './img/Vi.jpg';

let gap = 2;
let size = 1;
let pointArray = [];
let isStarted = false;
let fireWorkBreak = false;
let isTypingStarted = false;
const imageInput = document.getElementById("image-input");
const uploadOverlay = document.getElementById("upload-overlay");


// Cấu hình pháo hoa xuất phát từ phía bên trái
class fireWork {
    constructor(y, r, g, b, a) {
        let v = 2;
        this.x = canvas.width/2; // Bay lên từ vùng bên trái
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.v = v;
        this.history = [];
    }

    draw() {
        ctx.save();
        for (let i = 0; i < this.history.length; i++) {
            let point = this.history[i];
            let alpha = (i / this.history.length) * 0.5; 
            ctx.beginPath();
            ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, 1)`;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update() {
        if (this.y > canvas.height / 2) {
            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > 15) {
                this.history.shift();
            }
            this.v -= 0.005;
            this.y -= this.v;
        } else {
            setTimeout(() => {
                fireWorkBreak = true;
            }, 100);
        }
    }
}

const fireWork1 = new fireWork(canvas.height, 0, 240, 255, 1);

class point {
    constructor(x, y, r, g, b, a, targetX, targetY) {
        // Hạt pháo hoa nổ từ vùng tâm ảnh bên trái
        this.x = (canvas.width /2) + (Math.random() * 300 - 150);     
        this.y = (canvas.height / 2) + (Math.random() * 300 - 150);
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.X = targetX;              
        this.Y = targetY;
        
        let alpha = Math.random() * Math.PI * 2;
        let v0 = Math.random() * 15 + 10;
        this.vx = Math.cos(alpha) * v0;
        this.vy = Math.sin(alpha) * v0;
        
        this.lerpSpeed = Math.random() * 0.02 + 0.02; 
        this.isSettling = false;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (!this.isSettling) {
            let ax = 0.2;      
            let ay = 0.4;    

            this.vx += ax;
            this.vy += ay;

            this.x += this.vx;
            this.y += this.vy;

            let currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (this.y > canvas.height * 0.85 || currentSpeed < 1.5) {
                this.isSettling = true;
            }
        } else {
            let dx = this.X - this.x;
            let dy = this.Y - this.y;
            
            this.x += dx * this.lerpSpeed;
            this.y += dy * this.lerpSpeed;

            if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
                this.x = this.X;
                this.y = this.Y;
            }
        }
    }
}

// Lấy dữ liệu ảnh và đặt vị trí ở 1/4 bên trái canvas
image.addEventListener("load", () => {
    let hRatio = (canvas.width * 0.45) / image.width;
    let vRatio = canvas.height / image.height;
    let ratio = Math.min(hRatio, vRatio) * 0.75;
    
    let imgWidth = image.width * ratio;
    let imgHeight = image.height * ratio;

    // Căn ảnh nằm ở bên trái
    let offsetX = (canvas.width * 0.45 - imgWidth) / 2 + 30;
    let offsetY = (canvas.height - imgHeight) / 2;

    ctx.drawImage(image, offsetX, offsetY, imgWidth, imgHeight);
    const dataImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
            const index = (y * canvas.width + x) * 4;
            const r = dataImage.data[index];
            const g = dataImage.data[index + 1];
            const b = dataImage.data[index + 2];
            const a = dataImage.data[index + 3];
            
            if (a > 128) {
                const pointImage = new point(x, y, r, g, b, a, x, y);
                pointArray.push(pointImage);
            }
        }
    }
});

// Hàm gõ chữ tự động
// Hàm gõ chữ tự động và hiện nút bấm
function startTypingEffect() {
    const text = "Happy Birthday Phạm Thùy Vy! ✨\nchúc Vi thối tuổi mới luôn xinh đẹp,hạnh phúc, thành công và mạnh mẽ hơn,không còn phải khóc nữa nhossss";
    const targetElement = document.getElementById("typing-text");
    const surpriseBtn = document.getElementById("submit");
    let index = 0;

    function typeChar() {
        if (index < text.length) {
            let char = text.charAt(index);
            if (char === "\n") {
                targetElement.innerHTML += "<br>";
            } else {
                targetElement.innerHTML += char;
            }
            index++;
            setTimeout(typeChar, 70); // Tốc độ gõ 100ms / 1 ký tự
        } else {
            // Sau khi gõ xong chữ, hiện nút bấm bên dưới
            surpriseBtn.classList.add("show-btn");
        }
    }
    
    typeChar();

    // Sự kiện khi click vào nút bấm mới
    surpriseBtn.addEventListener("click", () => {
        window.location.href="test.html";
    });
}
const cakeContainer = document.getElementById("cake-container");

cakeContainer.addEventListener("click", () => {
    if (isStarted) return;
    isStarted = true;

    cakeContainer.classList.add("hidden");

    function animation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!fireWorkBreak) {
            fireWork1.update();
            fireWork1.draw();
        } else {
            // Khi pháo hoa bắt đầu nổ thì kích hoạt hiệu ứng gõ chữ
            if (!isTypingStarted) {
                isTypingStarted = true;
                setTimeout(()=>{startTypingEffect();},5000);
                
            }

            for (let i = 0; i < pointArray.length; i++) {
                pointArray[i].update();
                pointArray[i].draw();
            }
        }
        requestAnimationFrame(animation);
    }
    
    animation();
});