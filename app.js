class App {
    constructor() {
        this.x = [6, 7, 8, 9];
        this.sum = [11, 12, 13, 14];
        this.firstItemContainer = document.getElementById('js-first-item-container');
        this.secondItemContainer = document.getElementById('js-second-item-container');
        this.sumInput = document.getElementById('js-sum-container');

        this.imageCanvas = document.getElementById('js-canvas-image');
        this.imageCtx = this.imageCanvas.getContext('2d');
        this.imageCanvas.width = 875;
        this.imageCanvas.height = 150;

        this.arcCanvas = document.getElementById('js-canvas-arc');
        this.arcCtx = this.arcCanvas.getContext('2d');
        this.arcCanvas.width = 875;
        this.arcCanvas.height = 150;
        this.arcCanvas.lineJoin = 'round';

        this.canvasStyle = "#B70000";
        this.canvasLineWidth = 2;

        this.drawParams = {
            endpoints: [
                {
                    "number": 6,
                    "endpointX": 269,
                    "endpointY": 86,
                }, {
                    "number": 7,
                    "endpointX": 308,
                    "endpointY": 86,
                }, {
                    "number": 8,
                    "endpointX": 348,
                    "endpointY": 86,
                }, {
                    "number": 9,
                    "endpointX": 386,
                    "endpointY": 86,
                },
            ],
            sum: [
                {
                    "number": 11,
                    "endpointX": 464,
                    "endpointY": 86,
                },
                {
                    "number": 12,
                    "endpointX": 504,
                    "endpointY": 86,
                },
                {
                    "number": 13,
                    "endpointX": 542,
                    "endpointY": 86,
                },
                {
                    "number": 14,
                    "endpointX": 582,
                    "endpointY": 86,
                },
            ]
        }

        this.firstInput = document.getElementById('js-first-input');
        this.secondInput = document.getElementById('js-second-input');
    }

    getRandomElementFromArray(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

    getFirstArrayItem(array) {
        return array[0];
    }

    getLastArrayItem(array) {
        let newArray = array.reverse();
        return newArray[0];
    }

    defineTermsOfEquation(x, sum) {
        const randomX = this.getRandomElementFromArray(x);
        const randomSum = this.getRandomElementFromArray(sum);
        const randomY = randomSum - randomX;
        return [randomX, randomY, randomSum]
    }

    postTermsOfEquation(itemsOfTheSum) {
        this.firstItemContainer.innerHTML = itemsOfTheSum[0];
        this.secondItemContainer.innerHTML = itemsOfTheSum[1];
        this.sumInput.setAttribute('data-sum', itemsOfTheSum[2]);
    }

    drawImage(width = 400, height = 200) {
        const image = new Image();
        const offset = this.imageCanvas.height - height;
        image.onload = () => this.imageCtx.drawImage(image, 0, offset, width, height);
        image.src = 'sprite.png'
    }

    drawArc(startpointX, startpointY, cpx, cpy, x, y) {
        this.arcCtx.beginPath();
        this.arcCtx.moveTo(startpointX, startpointY);
        this.arcCtx.quadraticCurveTo(cpx, cpy, x, y);
        this.arcCtx.lineWidth = this.canvasLineWidth;
        this.arcCtx.strokeStyle = this.canvasStyle;
        this.arcCtx.stroke();
        this.arcCtx.closePath();

        // const ang = this.findAngle(cpx, cpy, x, y);
        // this.drawArrowHead(x, y, ang, 12, 10)
    }

    // findAngle(sx, sy, ex, ey) {
    //     return Math.atan2((ey - sy), (ex - sx));
    // }

    // drawArrowHead(locx, locy, angle, sizex, sizey) {
    //     var hx = sizex / 2;
    //     var hy = sizey / 2;
    //     this.arcCtx.translate((locx ), (locy));
    //     this.arcCtx.rotate(angle);
    //     this.arcCtx.translate(-hx,-hy);
    
    //     this.arcCtx.beginPath();
    //     this.arcCtx.moveTo(0,0);
    //     this.arcCtx.lineTo(0,1*sizey);    
    //     this.arcCtx.lineTo(1*sizex,1*hy);
    //     this.arcCtx.closePath();
    //     this.arcCtx.fillStyle = this.canvasStyle;
    //     this.arcCtx.fill();
    
    //     this.arcCtx.translate(hx,hy);
    //     this.arcCtx.rotate(-angle);
    //     this.arcCtx.translate(-locx,-locy);
    // }

    setInputPosition(step, left) {
        let offsetInput = left - 16;
        if (step === 1) {
            this.firstInput.style.left = `${offsetInput}px`;
        } else if (step === 2) {
            this.secondInput.style.display = 'block';
            this.secondInput.style.left = `${offsetInput}px`;
            this.secondInput.style.bottom = '130px';
        }
    }

    validateInputValue(input, value) {
        if (parseInt(input.value) !== value || input.value.length < 1) {
            if (input.getAttribute('data-target') !== null) {
                document.getElementById(input.getAttribute('data-target')).classList.add('error');
            }
            input.classList.add('error');
            return false;
        } else {
            if (input.getAttribute('data-target') !== null) {
                document.getElementById(input.getAttribute('data-target')).classList.remove('error');
            }
            input.classList.remove('error');
            input.classList.add('input--readonly');
            input.setAttribute('readonly', true);
            return true;
        }
    }

    start() {
        this.drawImage(875, 83);
        const itemsOfTheSum = this.defineTermsOfEquation(this.x, this.sum);
        this.postTermsOfEquation(itemsOfTheSum);
        const firstItemOfTheSum = this.getFirstArrayItem(itemsOfTheSum);
        const firstArcParams = this.getFirstArrayItem(this.drawParams.endpoints.filter(item => item.number === firstItemOfTheSum));
        this.drawArc(
            35,
            87,
            (firstArcParams.endpointX + 40 ) / 2,
            -50,
            firstArcParams.endpointX,
            firstArcParams.endpointY
        );
        this.setInputPosition(1, (firstArcParams.endpointX + 40) / 2);

        this.firstInput.oninput = (event) => {
            event = event || window.event;
            let target = event.target;
            const validationResult = this.validateInputValue(target, firstItemOfTheSum);
            if (validationResult) {
                const sum = this.getLastArrayItem(itemsOfTheSum);
                const secondArcParams = this.getFirstArrayItem(this.drawParams.sum.filter(item => item.number === sum));

                this.setInputPosition(2, firstArcParams.endpointX + ((secondArcParams.endpointX - firstArcParams.endpointX) / 2));

                this.drawArc(
                    firstArcParams.endpointX,
                    firstArcParams.endpointY,
                    firstArcParams.endpointX + ((secondArcParams.endpointX - firstArcParams.endpointX) / 2),
                    0,
                    secondArcParams.endpointX,
                    secondArcParams.endpointY
                );
            }
        };
        this.secondInput.oninput = (event) => {
            event = event || window.event;
            let target = event.target;
            const validationResult = this.validateInputValue(target, itemsOfTheSum[1]);
            if (validationResult) {
                this.sumInput.removeAttribute('readonly');
                this.sumInput.classList.remove('input--readonly');
                this.sumInput.focus();
                this.sumInput.value = '';
                this.sumInput.style.width = '40px';
            }
        }

        this.sumInput.oninput = (event) => {
            event = event || window.event;
            let target = event.target;
            const validationResult = this.validateInputValue(target, this.getLastArrayItem(itemsOfTheSum));
        }
    }
}

let app = new App();
app.start();