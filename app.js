const inp = document.querySelector("#img-inp");

const canvas = document.querySelector("#img-box");

let ctx = canvas.getContext("2d");

let file = null;
let image = null;


// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;

const dpr = window.devicePixelRatio || 1;

canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;

let newWidth = null; let x = null;
let newHeight = null; let y = null;

let imgGot = false;
// ctx.scale(dpr, dpr);

let placeholderText = document.querySelector(".placeholder");

canvas.style.display = "none";

// inp.addEventListener("click", () => {
// location.reload();
// })

let firstUpload = false;

inp.addEventListener("change", (event) => {

    
    // console.log("image input held");
    canvas.style.display = "flex";
    placeholderText.style.display = "none";

    file = event.target.files[0];
    imgGot = true;
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        newWidth = img.width * scale;
        newHeight = img.height * scale;

        x = (canvas.width - newWidth) / 2;
        y = (canvas.height - newHeight) / 2;

        ctx.drawImage(img, x, y, newWidth, newHeight);
    }

});

let brightValue = 100; let contrastValue = 100; let saturateValue = 100; let hueRotateValue = 0;
let blurValue = 0; let grayscaleValue = 0; let sepiaValue = 0; let opacityValue = 100; let invertValue = 0;

let isInBright = false; let isInContra = false; let isInSaturate = false; let isInHue = false; let isInBlur = false;
let isInGray = false; isInSepia = false; let isInOpacity = false; let isInInvert = false;

let brightText = document.getElementById("bright-text");
let contrastText = document.getElementById("contrast-text");
let saturateText = document.getElementById("saturate-text");
let hueText = document.getElementById("hue-text");
let blurText = document.getElementById("blur-text");
let grayText = document.getElementById("gray-text");
let sepiaText = document.getElementById("sepia-text");
let opacityText = document.getElementById("opacity-text");
let invertText = document.getElementById("invert-text");
// Apply filter on slider movement


let tic_color = document.querySelector(".tic-btn svg");

let allInp = document.querySelectorAll(".right input");

let inputArray = Array.from(allInp);


for (let btn of allInp) {
    btn.addEventListener("input", (event) => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (imgGot) {
            tic_color.style.fill = "white";
            isSliderMove = true;
            if (event.target.name == "brightness") {
                brightValue = event.target.value;
                brightText.innerText = `200/${brightValue}`;
                isInBright = true;
            }
            if (event.target.name == "contrast") {
                contrastValue = event.target.value;
                contrastText.innerText = `200/${contrastValue}`;
                isInContra = true;
            }
            if (event.target.name == "saturation") {
                saturateValue = event.target.value;
                saturateText.innerText = `200/${saturateValue}`;
                isInSaturate = true;
            }
            if (event.target.name == "hueRotation") {
                hueRotateValue = event.target.value;
                hueText.innerText = `360/${hueRotateValue}`;
                isInHue = true;
            }
            if (event.target.name == "blur") {
                blurValue = event.target.value;
                blurText.innerText = `20/${blurValue}`;
                isInBlur = true;
            }
            if (event.target.name == "grayscale") {
                grayscaleValue = event.target.value;
                grayText.innerText = `100/${grayscaleValue}`;
                isInGray = true;
            }
            if (event.target.name == "sepia") {
                sepiaValue = event.target.value;
                sepiaText.innerText = `100/${sepiaValue}`;
                isInSepia = true;
            }
            if (event.target.name == "opacity") {
                opacityValue = event.target.value;
                opacityText.innerText = `100/${opacityValue}`;
                isInOpacity = true;
            }
            if (event.target.name == "invert") {
                invertValue = event.target.value;
                invertText.innerText = `100/${invertValue}`;
                isInInvert = true;
            }

            ctx.filter = `
            brightness(${brightValue}%)
            contrast(${contrastValue}%)
            saturate(${saturateValue}%)
            hue-rotate(${hueRotateValue}deg)
            blur(${blurValue}px)
            grayscale(${grayscaleValue}%)
            sepia(${sepiaValue}%)
            opacity(${opacityValue}%)
            invert(${invertValue}%)
            `;

            ctx.drawImage(image, x, y, newWidth, newHeight);
        }

    });
}



let applyFilter = (name, value, unit) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = `${name}(${value}${unit})`;

    ctx.drawImage(image, x, y, newWidth, newHeight);
}


//  Remove filter


let resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", () => {
    // console.log("reset");

    for (let btn of allInp) {
        if (imgGot) {
            if (btn.name == "brightness") {
                btn.value = 100;
                applyFilter("brightness", 100, "%");
                brightText.innerText = "200/100";
                brightValue = 100;
            }
            if (btn.name == "contrast") {
                btn.value = 100;
                applyFilter("contrast", 100, "%");
                contrastText.innerText = "200/100";
                contrastValue = 100;
            }
            if (btn.name == "saturation") {
                btn.value = 100;
                applyFilter("saturate", 100, "%");
                saturateText.innerText = "200/100";
                saturateValue = 100;
            }
            if (btn.name == "hueRotation") {
                btn.value = 0;
                applyFilter("hue-rotate", 0, "deg");
                hueText.innerText = "360/0";
                hueRotateValue = 0;
            }
            if (btn.name == "blur") {
                btn.value = 0;
                applyFilter("blur", 0, "px");
                blurText.innerText = "20/0";
                blurValue = 0;
            }
            if (btn.name == "grayscale") {
                btn.value = 0;
                applyFilter("grayscale", 0, "%");
                grayText.innerText = "100/0";
                grayscaleValue = 0;
            }
            if (btn.name == "sepia") {
                btn.value = 0;
                applyFilter("sepia", 0, "%");
                sepiaText.innerText = "100/0";
                sepiaValue = 0;
            }
            if (btn.name == "opacity") {
                btn.value = 100;
                applyFilter("opacity", 100, "%");
                opacityText.innerText = "100/100";
                opacityValue = 100;
            }
            if (btn.name == "invert") {
                btn.value = 0;
                applyFilter("invert", 0, "%");
                opacityText.innerText = "100/0";
                invertValue = 0;
            }
        }
    }
});


//  Download Image

let downloadBtn = document.querySelector("#download-btn");

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "edited-image.jpg";
    link.href = canvas.toDataURL();
    link.click();
});


// buttons for small screen

// let brightBtn = document.querySelector("#bright");

let isSliderMove = false;
let tic_untic_container = document.querySelector(".tic-untic");

let ticBtn = document.querySelector(".tic-btn");
let unticBtn = document.querySelector(".untic-btn");

ticBtn.addEventListener("click", () => {
    if (isSliderMove) {
        removeFilterInputs();
        btnContainer.style.display = "flex";
        tic_untic_container.style.display = "none";
    }
});

unticBtn.addEventListener("click", () => {
    removeFilterInputs();
    btnContainer.style.display = "flex";
    tic_untic_container.style.display = "none";
    if (isInBright) {
        applyFilter("brightness", 100, "%");
        brightText.innerText = "200/100";
        inputArray[9].value = 100;
        isInBright = false;
        brightValue = 100;
    }
    if (isInContra) {
        applyFilter("contrast", 100, "%");
        contrastText.innerText = "200/100";
        inputArray[10].value = 100;
        isInContra = false;
        contrastValue = 100;
    }
    if (isInSaturate) {
        applyFilter("saturate", 100, "%");
        saturateText.innerText = "200/100";
        inputArray[11].value = 100;
        isInSaturate = false;
        saturateValue = 100;
    }
    if (isInHue) {
        applyFilter("hue-rotate", 0, "deg");
        hueText.innerText = "360/0";
        inputArray[12].value = 0;
        isInHue = false;
        hueRotateValue = 0;
    }
    if (isInBlur) {
        applyFilter("blur", 0, "px");
        blurText.innerText = "20/0";
        inputArray[13].value = 0;
        isInBlur = false;
        blurValue = 0;
    }
    if (isInGray) {
        applyFilter("grayscale", 0, "%");
        grayText.innerText = "100/0";
        inputArray[14].value = 0;
        isInGray = false;
        grayscaleValue = 0;
    }
    if (isInSepia) {
        applyFilter("sepia", 0, "%");
        sepiaText.innerText = "100/0";
        inputArray[15].value = 0;
        isInSepia = false;
        sepiaValue = 0;
    }
    if (isInOpacity) {
        applyFilter("opacity", 100, "%");
        opacityText.innerText = "100/100";
        inputArray[16].value = 100;
        isInOpacity = false;
        opacityValue = 100;
    }
    if (isInInvert) {
        applyFilter("invert", 0, "%");
        opacityText.innerText = "100/0";
        inputArray[17].value = 0;
        isInInvert = false;
        invertValue = 0;
    }
});

let inputContainer = document.querySelector(".filter-box");

let filterContainer = document.querySelectorAll(".filter-sm-box");

let filterArray = Array.from(filterContainer);

let removeFilterInputs = () => {
    for (let inp of filterArray) {
        inp.style.display = "none";
    }
}

removeFilterInputs();


let btnContainer = document.querySelector(".btn-container");
let allBtn = document.querySelectorAll(".btn-container .filter-btn");

for (let btn of allBtn) {
    btn.addEventListener("click", () => {

        for (let BTN of allBtn) {
            BTN.style.boxShadow = "0px 0px 0px slateblue";
        }
        btn.style.boxShadow = "0px 0px 16px dodgerblue";

        let id = btn.getAttribute("id");

        setTimeout(() => {
            btnContainer.style.display = "none";
            tic_untic_container.style.display = "flex";
            tic_color.style.fill = "gray";
        }, 250);

        if (id == "brightness") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[0].style.display = "flex";

            }, 250);

        } else if (id == "contrast") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[1].style.display = "flex";
            }, 250);

        } else if (id == "saturation") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[2].style.display = "flex";
            }, 250);
        } else if (id == "hueRotation") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[3].style.display = "flex";
            }, 250);
        } else if (id == "blur") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[4].style.display = "flex";
            }, 250);
        } else if (id == "grayscale") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[5].style.display = "flex";
            }, 250);
        } else if (id == "sepia") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[6].style.display = "flex";
            }, 250);
        } else if (id == "opacity") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[7].style.display = "flex";
            }, 250);
        } else if (id == "invert") {
            setTimeout(() => {
                removeFilterInputs();
                filterArray[8].style.display = "flex";
            }, 250);
        }
    });
}
