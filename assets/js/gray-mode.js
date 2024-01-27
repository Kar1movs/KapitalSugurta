let grayLightMode = localStorage.getItem("gray-light-mode");
const grayLightModeToggle = document.querySelector(".gray-light-mode-theme-js");
let grayLightSvg = document.querySelectorAll(".svg-none");
let graylightslash = document.querySelector('.bx-none-gray-light');
// let labelDarkLightMode = document.querySelector(".label-dark-light-mode");
// let labelDarkLightModeAfter = window.getComputedStyle(labelDarkLightMode, '::after');
// let content = labelDarkLightModeAfter.content;
// console.log(content);
let grayLightBxSvg = document.getElementById('#bx-svg-gray-light-js');
let grayLightbxChangeIcon = document.querySelector('.bx-change-gray-light-icon-js');
let grayLightSaveToggle = document.querySelector(".gray-light-mode-parent input[type='checkbox']");
const grayLightWrapper = document.querySelector(":root");

const enablegrayLightMode = () => { 
    document.documentElement.classList.add("gray-light-mode");
    document.documentElement.classList.remove("gray-light-have");
    grayLightWrapper.setAttribute("data-colorless", "true");
    grayLightModeToggle.classList.add("active");

    grayLightSaveToggle.setAttribute("checked", "true");

    for (let i = 0; i < grayLightSvg.length; i++) {
        const element = grayLightSvg[i];
        element.style.display = "none";
    }

    localStorage.setItem("gray-light-mode", "enabled");
};

const disablegrayLightMode = () => {
    document.documentElement.classList.add("gray-light-have");
    document.documentElement.classList.remove("gray-light-mode");
    wrapper.setAttribute("data-colorless", "false");
    grayLightModeToggle.classList.remove("active");
    grayLightSaveToggle.setAttribute("checked", "false");
    for (let i = 0; i < grayLightSvg.length; i++) {
        const element = grayLightSvg[i];
        element.style.display = "block";
    }

    localStorage.setItem("gray-light-mode", null);
};

if (grayLightMode === 'enabled') {
    enablegrayLightMode();
    // grayLightbxChangeIcon.classList.add('bx-image-alt');
    // grayLightbxChangeIcon.classList.remove('bx-image-alt');
    grayLightbxChangeIcon.classList.remove('bx-none-gray-light');

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

grayLightModeToggle.addEventListener("click", () => {
    grayLightMode = localStorage.getItem("gray-light-mode");

    if (grayLightMode !== 'enabled') {
        enablegrayLightMode();
        // grayLightbxChangeIcon.classList.add('bx-palette');
        // grayLightbxChangeIcon.classList.remove('bx-palette');
        grayLightbxChangeIcon.classList.remove('bx-none-gray-light');
        setTimeout(function () {
            grayLightBxSvg.classList.add('scale-mode');
        }, 50);
        grayLightBxSvg.classList.remove('scale-mode');
        $.notify({
            // options
            icon: 'bx bx-palette bx-none-gray-light bx-sm position-relative',
            title: 'Rangsiz rejim ishga tushdi',
            message: 'Ranglar sahifda o\'chirib qo\'yildi rejim yoqildi',
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
        disablegrayLightMode();
        // grayLightbxChangeIcon.classList.add('bx-image-alt');
        // grayLightbxChangeIcon.classList.remove('bx-image-alt');
        grayLightbxChangeIcon.classList.add('bx-none-gray-light');
        setTimeout(function () {
            grayLightBxSvg.classList.add('scale-mode');
        }, 50);
        grayLightBxSvg.classList.remove('scale-mode');
        $.notify({
            // options
            icon: 'bx bx-palette bx-sm',
            title: 'Rangli rejim ishga tushdi',
            message: 'Ranglar sahifda joylab qo\'yildi',
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