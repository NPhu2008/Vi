const canvas = document.getElementById("canvas1");
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const image = new Image();
        image.src = './img/tuat.jpg'; // Ảnh chân dung bạn của sếp

        let gap = 2;
        let size = 1;
        let pointArray = [];
        let isStarted = false;

        class point {
            constructor(x, y, r, g, b, a, targetX, targetY) {
                this.x = (canvas.width / 2) + (Math.random() * 300 - 150);     
                this.y = (canvas.height / 2) + (Math.random() * 300 - 150);
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.X = targetX;              
                this.Y = targetY;
                
                let alpha = Math.random() * Math.PI * 2;
                let v0 = Math.random() * 35 + 10;
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

        // Đọc ảnh và chuẩn bị sẵn dữ liệu pixel khi trang vừa load
        image.addEventListener("load", () => {
            let hRatio = canvas.width / image.width;
            let vRatio = canvas.height / image.height;
            let ratio = Math.min(hRatio, vRatio) * 0.8;
            
            let imgWidth = image.width * ratio;
            let imgHeight = image.height * ratio;
            let imgX = (canvas.width - imgWidth) / 2;
            let imgY = (canvas.height - imgHeight) / 2;

            ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
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

        // Xử lý sự kiện khi click vào chiếc bánh sinh nhật
        const cakeContainer = document.getElementById("cake-container");
        cakeContainer.addEventListener("click", () => {
            if (isStarted) return;
            isStarted = true;

            // Làm mờ và ẩn chiếc bánh đi
            cakeContainer.classList.add("hidden");

            // Bắt đầu chạy vòng lặp animation pháo hoa nổ thành ảnh
            function animation() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < pointArray.length; i++) {
                    pointArray[i].update();
                    pointArray[i].draw();
                }
                requestAnimationFrame(animation);
            }
            
            animation();
        }); 