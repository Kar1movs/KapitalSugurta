let imgNoneMode = localStorage.getItem("img-none");
const imgNoneModeToggle = document.querySelector(".img-none-mode-theme-js");
let imgNoneSvg = document.querySelectorAll(".svg-none");
let slash = document.querySelector('.bx-none-image');
// let labelDarkLightMode = document.querySelector(".label-dark-light-mode");
// let labelDarkLightModeAfter = window.getComputedStyle(labelDarkLightMode, '::after');
// let content = labelDarkLightModeAfter.content;
// console.log(content);
let imgNoneBxSvg = document.getElementById('bx-svg-img-none-js');
let imgNonebxChangeIcon = document.querySelector('.bx-change-img-none-icon-js');
let imgNoneSaveToggle = document.querySelector(".img-none-mode-parent input[type='checkbox']");
const imgNoneWrapper = document.querySelector(":root");
let allImgsTag = document.querySelectorAll("img");
let homepageAboutText = document.querySelector(".homepage-about-col");
let dNoneTimeOneJs = document.querySelector(".d-none-time-one-js")
let dNoneTimeTwoJs = document.querySelector(".d-none-time-two-js")
let dNoneTimeThreeJs = document.querySelector(".d-none-time-three-js")



// allImgsTag.forEach(img => {
//     // Example: Add a new attribute 'data-info' with a value
//     img.setAttribute('data-img', 'false');
    
//     // You can add more attributes as needed
//   });

dNoneTimeOneJs.classList.add("d-none");
dNoneTimeTwoJs.classList.add("d-none");
dNoneTimeThreeJs.classList.add("d-none");

const enableImgNoneMode = () => { 
    document.documentElement.classList.add("img-none");
    document.documentElement.classList.remove("img-have");
    imgNoneWrapper.setAttribute("data-img", "true");
    imgNoneModeToggle.classList.add("active");

    dNoneTimeOneJs.classList.add("d-block");
    dNoneTimeOneJs.classList.remove("d-none");
    dNoneTimeTwoJs.classList.add("d-block");
    dNoneTimeTwoJs.classList.remove("d-none");
    dNoneTimeThreeJs.classList.add("d-block");
    dNoneTimeThreeJs.classList.remove("d-none");

    homepageAboutText.classList.add("col-xxl-12");
    homepageAboutText.classList.add("col-xl-12");
    homepageAboutText.classList.remove("col-xxl-8");
    homepageAboutText.classList.remove("col-xl-8");
    imgNoneSaveToggle.setAttribute("checked", "true");

    for (let i = 0; i < imgNoneSvg.length; i++) {
        const element = imgNoneSvg[i];
        element.style.display = "none";
    }

    allImgsTag.forEach(img => {
        // Example: Add a new attribute 'data-info' with a value
        img.setAttribute('data-img', 'true');
        
        // You can add more attributes as needed
      });

    localStorage.setItem("img-none", "enabled");
};

const disableImgNoneMode = () => {
    document.documentElement.classList.add("img-have");
    document.documentElement.classList.remove("img-none");
    wrapper.setAttribute("data-img", "false");
    imgNoneModeToggle.classList.remove("active");

    dNoneTimeOneJs.classList.remove("d-block");
    dNoneTimeOneJs.classList.add("d-none");
    dNoneTimeTwoJs.classList.remove("d-block");
    dNoneTimeTwoJs.classList.add("d-none");
    dNoneTimeThreeJs.classList.remove("d-block");
    dNoneTimeThreeJs.classList.add("d-none");

    homepageAboutText.classList.remove("col-xxl-12");
    homepageAboutText.classList.remove("col-xl-12");
    homepageAboutText.classList.add("col-xxl-8");
    homepageAboutText.classList.add("col-xl-8");
    imgNoneSaveToggle.setAttribute("checked", "false");
    for (let i = 0; i < imgNoneSvg.length; i++) {
        const element = imgNoneSvg[i];
        element.style.display = "block";
    }
    allImgsTag.forEach(img => {
        // Example: Add a new attribute 'data-info' with a value
        img.setAttribute('data-img', 'false');
        
        // You can add more attributes as needed
      });

    localStorage.setItem("img-none", null);
};

if (imgNoneMode === 'enabled') {
    enableImgNoneMode();
    // imgNonebxChangeIcon.classList.add('bx-image-alt');
    // imgNonebxChangeIcon.classList.remove('bx-image-alt');
    imgNonebxChangeIcon.classList.remove('bx-none-image');

}

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function () {
    };
}

imgNoneModeToggle.addEventListener("click", () => {
    imgNoneMode = localStorage.getItem("img-none");

    if (imgNoneMode !== 'enabled') {
        enableImgNoneMode();
        // imgNonebxChangeIcon.classList.add('bx-image-alt');
        // imgNonebxChangeIcon.classList.remove('bx-image-alt');
        imgNonebxChangeIcon.classList.remove('bx-none-image');
        setTimeout(function () {
            imgNoneBxSvg.classList.add('scale-mode');
        }, 50);
        imgNoneBxSvg.classList.remove('scale-mode');
        $.notify({
            // options
            icon: 'bx bx-image-alt bx-none-image bx-sm position-relative',
            title: 'Rasmiz rejim ishga tushdi',
            message: 'Rasmlar sahifda o\'chirib qo\'yildi rejim yoqildi',
            // url: 'https://github.com/mouse0270/bootstrap-notify',
            // target: '_blank'
        }, {
            // settings
            element: 'body',
            // position: null,
            type: "info",
            // allow_dismiss: true,
            // newest_on_top: false,
            showProgressbar: true,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 9999,
            delay: 3500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown shadow border-white  bg-primary-mode text-white',
                exit: 'animated fadeOutRight'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            // template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            //     '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            //     '<span data-notify="icon"></span> ' +
            //     '<span data-notify="title">{1}</span> ' +
            //     '<span data-notify="message">{2}</span>' +
            //     '<div class="progress" data-notify="progressbar">' +
            //     '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            //     '</div>' +
            //     '<a href="{3}" target="{4}" data-notify="url"></a>' +
            //     '</div>'
        });
        /*disableScroll();*/
    } else {
        disableImgNoneMode();
        // imgNonebxChangeIcon.classList.add('bx-image-alt');
        // imgNonebxChangeIcon.classList.remove('bx-image-alt');
        imgNonebxChangeIcon.classList.add('bx-none-image');
        setTimeout(function () {
            imgNoneBxSvg.classList.add('scale-mode');
        }, 50);
        imgNoneBxSvg.classList.remove('scale-mode');
        $.notify({
            // options
            icon: 'bx bx-image-alt bx-sm',
            title: 'Rasmli rejim ishga tushdi',
            message: 'Rasmlar sahifda joylab qo\'yildi',
            // url: 'https://github.com/mouse0270/bootstrap-notify',
            // target: '_blank'
        }, {
            // settings
            element: 'body',
            // position: null,
            type: "info",
            // allow_dismiss: true,
            // newest_on_top: false,
            showProgressbar: true,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 9999,
            delay: 3500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown shadow border-white bg-primary-mode text-white',
                exit: 'animated fadeOutRight'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            icon_type: 'class',
            // template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            //     '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            //     '<span data-notify="icon"></span> ' +
            //     '<span data-notify="title">{1}</span> ' +
            //     '<span data-notify="message">{2}</span>' +
            //     '<div class="progress" data-notify="progressbar">' +
            //     '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            //     '</div>' +
            //     '<a href="{3}" target="{4}" data-notify="url"></a>' +
            //     '</div>'
        });
    }
});
/* ************************************************************ */