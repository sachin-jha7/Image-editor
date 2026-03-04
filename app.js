let inpBtn = document.querySelector("#img-inp");
let img = document.querySelector(".image-panel img");
let placeholderText = document.querySelector(".image-panel p");

let allFilterBtn = document.querySelectorAll(".filter-btns button");

let filterName = document.querySelector(".slider-info .name");
let filterValue = document.querySelector(".slider-info .value");

let filterSlider = document.querySelector("#filter");

let brightVal = 100, contraVal = 100, saturateVal = 100, hueVal = 0, blurVal = 0, grayVal = 0,
    sepiaVal = 0, opacityVal = 100, invertVal = 0;


// Take input from slider

filterSlider.addEventListener("input", () => {
    // console.log(filterSlider.value);
    let selectedFilter = document.querySelector(".filter-btns .active");
    if (selectedFilter.id == "Brightness") {
        brightVal = filterSlider.value;
        filterValue.innerText = `${brightVal}%`;
    } else if (selectedFilter.id == "Contrast") {
        contraVal = filterSlider.value;
        filterValue.innerText = `${contraVal}%`;
    } else if (selectedFilter.id == "Saturation") {
        saturateVal = filterSlider.value;
        filterValue.innerText = `${saturateVal}%`;
    } else if (selectedFilter.id == "hueRotation") {
        hueVal = filterSlider.value;
        filterValue.innerText = `${hueVal}deg`;
    } else if (selectedFilter.id == "Blur") {
        blurVal = filterSlider.value;
        filterValue.innerText = `${blurVal}px`;
    } else if (selectedFilter.id == "Grayscale") {
        grayVal = filterSlider.value;
        filterValue.innerText = `${grayVal}%`;
    } else if (selectedFilter.id == "Sepia") {
        sepiaVal = filterSlider.value;
        filterValue.innerText = `${sepiaVal}%`;
    } else if (selectedFilter.id == "Opacity") {
        opacityVal = filterSlider.value;
        filterValue.innerText = `${opacityVal}%`;
    } else if (selectedFilter.id == "Invert") {
        invertVal = filterSlider.value;
        filterValue.innerText = `${invertVal}%`;
    }
    applyFilter();
});


// Changing filterSlider value & filter input element's value

allFilterBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        let btnId = btn.getAttribute("id");
        for (let BTN of allFilterBtn) {
            BTN.classList.remove("active");
        }
        filterName.innerText = btn.id;
        if (btnId == "Brightness") {
            filterSlider.value = brightVal;
            filterValue.innerText = `${brightVal}%`;
            filterSlider.max = 200;
            btn.classList.add("active");
        } else if (btnId == "Contrast") {
            filterSlider.value = contraVal;
            filterValue.innerText = `${contraVal}%`;
            filterSlider.max = 200;
            btn.classList.add("active");
        } else if (btnId == "Saturation") {
            filterSlider.value = saturateVal;
            filterValue.innerText = `${saturateVal}%`;
            filterSlider.max = 200;
            btn.classList.add("active");
        } else if (btnId == "hueRotation") {
            filterSlider.value = hueVal;
            filterValue.innerText = `${hueVal}deg`;
            filterSlider.max = 360;
            btn.classList.add("active");
        } else if (btnId == "Blur") {
            filterSlider.value = blurVal;
            filterValue.innerText = `${blurVal}px`;
            filterSlider.max = 20;
            btn.classList.add("active");
        } else if (btnId == "Grayscale") {
            filterSlider.value = grayVal;
            filterValue.innerText = `${grayVal}%`;
            filterSlider.max = 100;
            btn.classList.add("active");
        } else if (btnId == "Sepia") {
            filterSlider.value = sepiaVal;
            filterValue.innerText = `${sepiaVal}%`;
            filterSlider.max = 100;
            btn.classList.add("active");
        } else if (btnId == "Opacity") {
            filterSlider.value = opacityVal;
            filterValue.innerText = `${opacityVal}%`;
            filterSlider.max = 100;
            btn.classList.add("active");
        } else if (btnId == "Invert") {
            filterSlider.value = invertVal;
            filterValue.innerText = `${invertVal}%`;
            filterSlider.max = 100;
            btn.classList.add("active");
        }
    });
});


// taking image input

let imageName, file = null;
inpBtn.addEventListener("change", (event) => {

    file = event.target.files[0];
    // console.log(file);
    imageName = file.name;
    placeholderText.style.display = "none";

    img.classList.add("img-height");

    img.src = URL.createObjectURL(file);
});

let applyFilter = () => {
    // console.log(image);
    img.style.filter = `brightness(${brightVal}%)
    contrast(${contraVal}%)
    saturate(${saturateVal}%)
    hue-rotate(${hueVal}deg)
    blur(${blurVal}px)
    grayscale(${grayVal}%)
    sepia(${sepiaVal}%)
    opacity(${opacityVal}%)
    invert(${invertVal}%)
    `;
}


// Reset Filters

let resetBtn = document.querySelector("#reset");

resetBtn.addEventListener("click", () => {
    brightVal = 100, contraVal = 100, saturateVal = 100, hueVal = 0, blurVal = 0, grayVal = 0,
        sepiaVal = 0, opacityVal = 100, invertVal = 0;
    applyFilter();
    allFilterBtn[0].click();
    filterSlider.value = 100;
});


// Download Image

let downloadBtn = document.querySelector("#download");
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

downloadBtn.addEventListener("click", () => {

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = `brightness(${brightVal}%)
    contrast(${contraVal}%)
    saturate(${saturateVal}%)
    hue-rotate(${hueVal}deg)
    blur(${blurVal}px)
    grayscale(${grayVal}%)
    sepia(${sepiaVal}%)
    opacity(${opacityVal}%)
    invert(${invertVal}%)
    `;

    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.download = imageName;
    link.href = canvas.toDataURL();
    link.click();
});


// Some presets for filter buttons

let presetBtns = document.querySelectorAll(".preset-btns button");

for (let btn of presetBtns) {

    btn.addEventListener("click", () => {
        for (let BTN of presetBtns) {
            BTN.classList.remove("active-preset");
        }
        if (btn.id == "normal") {
            btn.classList.add("active-preset");
            resetBtn.click();
        } else if (btn.id == "soft-glow") {
            btn.classList.add("active-preset");
            brightVal = 120;
            contraVal = 90;
            saturateVal = 110;
            hueVal = 0;
            blurVal = 1;
            grayVal = 0;
            sepiaVal = 10;
            opacityVal = 100;
            invertVal = 0;
        } else if (btn.id == "old-school") {
            btn.classList.add("active-preset");
            brightVal = 95;
            contraVal = 120;
            saturateVal = 60;
            hueVal = 0;
            blurVal = 0;
            grayVal = 50;
            sepiaVal = 30;
            opacityVal = 100;
            invertVal = 0;
        } else if (btn.id == "noir") {
            btn.classList.add("active-preset");
            brightVal = 80;
            contraVal = 130;
            saturateVal = 0;
            hueVal = 0;
            blurVal = 0;
            grayVal = 100;
            sepiaVal = 10;
            opacityVal = 100;
            invertVal = 0;
        } else if (btn.id == "drama") {
            btn.classList.add("active-preset");
            brightVal = 110;
            contraVal = 130;
            saturateVal = 120;
            hueVal = 0;
            blurVal = 0;
            grayVal = 10;
            sepiaVal = 0;
            opacityVal = 100;
            invertVal = 0;
        } else if (btn.id == "vintage") {
            btn.classList.add("active-preset");
            brightVal = 90;
            contraVal = 110;
            saturateVal = 80;
            hueVal = 15;
            blurVal = 0;
            grayVal = 20;
            sepiaVal = 40;
            opacityVal = 100;
            invertVal = 0;
        } else if (btn.id == "pop") {
            btn.classList.add("active-preset");
            brightVal = 105;
            contraVal = 130;
            saturateVal = 150;
            hueVal = 0;
            blurVal = 0;
            grayVal = 0;
            sepiaVal = 0;
            opacityVal = 100;
            invertVal = 0;
        }
        applyFilter();
    });
};

// Cropper Js

let cropElement = false;
let cropper;

let cropBtn = document.querySelector("#crop-btn");

cropBtn.addEventListener("click", () => {
    if (!img.src) return;

    cropBtn.style.background = "limegreen";
    cropBtn.style.border = "2px solid limegreen";
    cropBtn.style.borderRadius = "3px";
    cropBtn.style.color = "#fff";

    if (cropBtn.innerText == "Crop") {
        cropBtn.innerText = "Done";
        console.log(cropBtn.id)
        cropper = new Cropper(img, {
            aspectRatio: NaN,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
            background: false,
        });
    } else if (cropBtn.innerText == "Done") {
        const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
        img.src = croppedDataUrl;
        cropper.destroy();
        cropBtn.style = null;
        cropBtn.innerText = "Crop";
    }
});


// For small screen

if (window.innerWidth <= 430) {

    for (let btn of allFilterBtn) {
        btn.classList.add("btn-circle");

        if (btn.id == "Brightness") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9m1 10h-2v3h2zm0-17h-2v3h2zM2 11h3v2H2zm17 0h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zm-12.02.7L6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zm8.48 11.32 1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path>
</svg>`;
        } if (btn.id == "Contrast") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-1.41 2L4 18.59V4zM5.41 20 20 5.41V20z"></path><path d="M7 11h2V9h2V7H9V5H7v2H5v2h2zm6 4h6v2h-6z"></path>
</svg>`;
        } if (btn.id == "Saturation") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M13.4 2.1c-3.16-.43-6.24.6-8.47 2.83S1.67 10.25 2.1 13.4c.53 3.89 3.46 7.21 7.29 8.25.86.23 1.74.35 2.62.35h.14c1.03-.02 1.97-.55 2.52-1.43.54-.88.6-1.95.15-2.88l-.2-.42c-.45-.94-.1-1.8.39-2.28s1.34-.84 2.28-.39l.41.2c.93.45 2 .39 2.88-.15a3 3 0 0 0 1.43-2.52c.01-.92-.1-1.85-.35-2.76-1.04-3.83-4.35-6.75-8.25-7.29Zm6.12 10.86c-.3.18-.65.2-.96.05l-.41-.2a3.96 3.96 0 0 0-4.56.78 3.96 3.96 0 0 0-.78 4.56l.2.42c.15.31.13.66-.05.96-.19.3-.49.47-.84.48-.74.02-1.48-.08-2.21-.28-3.06-.83-5.4-3.48-5.83-6.59-.34-2.53.48-5 2.27-6.79a7.96 7.96 0 0 1 5.66-2.34c.37 0 .75.03 1.13.08 3.11.42 5.75 2.76 6.59 5.83.2.73.29 1.47.28 2.21 0 .35-.18.66-.48.84Z"></path><path d="M7.33 12.76a1 1 0 1 0 0 2 1 1 0 1 0 0-2m.07-3.83a1.12 1.12 0 1 0 0 2.24 1.12 1.12 0 1 0 0-2.24m2.81-2.87a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5m4.06.11a1.38 1.38 0 1 0 0 2.76 1.38 1.38 0 1 0 0-2.76"></path>
</svg>`;
        } if (btn.id == "hueRotation") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M18.98 8.68C18.81 4.97 15.75 2 12 2S5.19 4.97 5.02 8.68C2.65 9.8 1 12.21 1 15c0 3.86 3.14 7 7 7 1.49 0 2.86-.47 4-1.26 1.14.79 2.51 1.26 4 1.26 3.86 0 7-3.14 7-7 0-2.79-1.65-5.2-4.02-6.32m-4.23 4.49c-.25-.91-.67-1.75-1.24-2.48.74-.43 1.58-.69 2.49-.69.3 0 .59.04.87.09a5.02 5.02 0 0 1-2.12 3.08M12 17.97a5.1 5.1 0 0 1-.91-2.03c.3.04.6.07.91.07s.61-.03.91-.07c-.14.75-.46 1.44-.91 2.03m-4.87-7.88c.28-.05.57-.09.87-.09.91 0 1.76.26 2.49.69-.57.73-.99 1.56-1.24 2.48a4.98 4.98 0 0 1-2.12-3.08M12 14c-.3 0-.59-.04-.87-.09.16-.69.46-1.33.87-1.88.41.55.72 1.19.87 1.88-.28.05-.57.09-.87.09m0-10c2.44 0 4.47 1.75 4.91 4.07-.3-.04-.6-.07-.91-.07-1.49 0-2.86.47-4 1.26A7 7 0 0 0 8 8c-.31 0-.61.03-.91.07C7.53 5.76 9.56 4 12 4M3 15c0-1.74.9-3.27 2.25-4.17a7 7 0 0 0 3.77 4.49c.07 1.5.61 2.88 1.48 3.98-.74.43-1.58.69-2.49.69-2.76 0-5-2.24-5-5Zm13 5c-.91 0-1.76-.26-2.49-.69a7 7 0 0 0 1.48-3.98c1.83-.87 3.22-2.5 3.77-4.49 1.35.9 2.25 2.43 2.25 4.17 0 2.76-2.24 5-5 5Z"></path>
</svg>`;
        } if (btn.id == "Blur") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M12 10a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m0 10a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m5-5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m-10 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3M12 2a1 1 0 1 0 0 2 1 1 0 1 0 0-2m0 18a1 1 0 1 0 0 2 1 1 0 1 0 0-2m9-9a1 1 0 1 0 0 2 1 1 0 1 0 0-2M3 11a1 1 0 1 0 0 2 1 1 0 1 0 0-2m13-4c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m-9 9a1 1 0 1 0 0 2 1 1 0 1 0 0-2m10 0a1 1 0 1 0 0 2 1 1 0 1 0 0-2M7 6a1 1 0 1 0 0 2 1 1 0 1 0 0-2m.5-3a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m-4 4a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m17 0a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m-4-4a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m0 17a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m4-4a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m-17 0a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1m4 4a.5.5 0 1 0 0 1 .5.5 0 1 0 0-1"></path>
</svg>`;
        } if (btn.id == "Grayscale") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M16 12c0-2.17-1.83-4-4-4v2c1.07 0 2 .93 2 2s-.93 2-2 2v2c2.17 0 4-1.83 4-4"></path><path d="M20 5h-2.59L14.7 2.29a1 1 0 0 0-.71-.29h-4c-.27 0-.52.11-.71.29L6.57 5H3.98c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2Zm0 13h-8v-2c-2.17 0-4-1.83-4-4s1.83-4 4-4V4h1.59l2.71 2.71c.19.19.44.29.71.29h3v11Z"></path><path d="M10 12c0 1.07.93 2 2 2v-4c-1.07 0-2 .93-2 2"></path>
</svg>`;

        } if (btn.id == "Sepia") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M7 3.34C2.23 6.1.58 12.22 3.34 17c1.85 3.2 5.22 5 8.68 5 1.69 0 3.41-.43 4.98-1.34 4.77-2.76 6.42-8.89 3.66-13.66C17.9 2.22 11.78.58 7 3.34m9 15.59c-3.82 2.21-8.72.89-10.93-2.93S4.18 7.28 8 5.07c1.23-.71 2.6-1.08 3.99-1.08.69 0 1.39.09 2.08.28 2.06.55 3.79 1.88 4.86 3.73 2.21 3.82.89 8.72-2.93 10.93"></path><path d="M12 6a1 1 0 1 0 0 2 1 1 0 1 0 0-2m3.5 1.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2M17 11a1 1 0 1 0 0 2 1 1 0 1 0 0-2m-5 5a1 1 0 1 0 0 2 1 1 0 1 0 0-2m-3.5-1.5a1 1 0 1 0 0 2 1 1 0 1 0 0-2m7 0a1 1 0 1 0 0 2 1 1 0 1 0 0-2m-7-7a1 1 0 1 0 0 2 1 1 0 1 0 0-2M7 11a1 1 0 1 0 0 2 1 1 0 1 0 0-2"></path>
</svg>`
        } if (btn.id == "Opacity") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-2 16v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5v-2h2v-2H5V9h2V7H5V5h2v2h2V5h2v2h2V5h2v2h2V5h2v14z"></path><path d="M7 9h2v2H7zm2-2h2v2H9zm2 2h2v2h-2zm2-2h2v2h-2zm4 0h2v2h-2zm-2 2h2v2h-2zm-8 4h2v2H7zm2-2h2v2H9zm2 2h2v2h-2zm2-2h2v2h-2zm4 0h2v2h-2zm-2 2h2v2h-2zm-6 2h2v2H9zm4 0h2v2h-2zm4 0h2v2h-2z"></path>
</svg>`
        } if (btn.id == "Invert") {
            btn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" width="36" height="36"  
fill="currentColor" viewBox="0 0 24 24" >
<!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 2-4.17 4.17A4 4 0 0 1 16 12c0 2.21-1.79 4-4 4-1.1 0-2.1-.45-2.83-1.17L5 19V5z"></path><path d="M9.17 9.17a4.01 4.01 0 0 0 0 5.66l5.66-5.66a4.01 4.01 0 0 0-5.66 0"></path>
</svg>`
        }
    }
}

let filterContainer = document.querySelector(".preset-btns");
let filterBoxBtn = document.querySelector("#filter-box-btn");

filterBoxBtn.addEventListener("click", () => {
    filterContainer.style.bottom = "2%";
    if (filterBoxBtn.innerText == "Filters") {
        filterBoxBtn.style.background = "limegreen";
        filterBoxBtn.innerText = "Done";
        filterBoxBtn.style.color = "#fff";
        filterBoxBtn.style.border = "2px solid limegreen";
        filterBoxBtn.style.borderRadius = "3px";
    } else if (filterBoxBtn.innerText == "Done") {
        filterBoxBtn.innerText = "Filters";
        filterBoxBtn.style = "none";
        filterContainer.style.bottom = "-100%";
    }

});
