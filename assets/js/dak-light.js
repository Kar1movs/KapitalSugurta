let darkMode = localStorage.getItem("dark-mode");
const darkModeToggle = document.querySelector(".mode-theme-js");
let svgNone = document.querySelectorAll(".svg-none");
// let labelDarkLightMode = document.querySelector(".label-dark-light-mode");
// let labelDarkLightModeAfter = window.getComputedStyle(labelDarkLightMode, '::after');
// let content = labelDarkLightModeAfter.content;
// console.log(content);
let bxSvg = document.getElementById('bx-svg-dark-light-js');
let bxChangeIcon = document.querySelector('.bx-change-dark-light-icon');
let saveToggle = document.querySelector(".dark-mode input[type='checkbox']");
const wrapper = document.querySelector(":root");

const enableDarkMode = () => {
    document.documentElement.classList.add("dark-mode");
    document.documentElement.classList.remove("light-mode");
    wrapper.setAttribute("data-theme", "dark");
    darkModeToggle.classList.add("active");

    saveToggle.setAttribute("checked", "true");

    for (let i = 0; i < svgNone.length; i++) {
        const element = svgNone[i];
        element.style.display = "none";
    }

    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    document.documentElement.classList.add("light-mode");
    document.documentElement.classList.remove("dark-mode");
    wrapper.setAttribute("data-theme", "light");
    darkModeToggle.classList.remove("active");
    saveToggle.setAttribute("checked", "false");
    for (let i = 0; i < svgNone.length; i++) {
        const element = svgNone[i];
        element.style.display = "block";
    }

    localStorage.setItem("dark-mode", null);
};

if (darkMode === 'enabled') {
    enableDarkMode();
    bxChangeIcon.classList.add('bx-sun');
        bxChangeIcon.classList.remove('bx-moon');
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

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");

    if (darkMode !== 'enabled') {
        enableDarkMode();
        bxChangeIcon.classList.add('bx-sun');
        bxChangeIcon.classList.remove('bx-moon');
        setTimeout(function () {

            bxSvg.classList.add('scale-mode');
        }, 50);
        bxSvg.classList.remove('scale-mode');
        $.notify({
            // options
            icon: 'bx bx-moon bx-sm',
            title: 'Tungi rejim yoqildi',
            message: 'Sayda tungi rejim ishga tushdi !',
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
        disableDarkMode();
        bxChangeIcon.classList.add('bx-moon');
        bxChangeIcon.classList.remove('bx-sun');
        setTimeout(function () {
            bxSvg.classList.add('scale-mode');
        }, 50);
        bxSvg.classList.remove('scale-mode');
        $.notify({
            // options
            icon: 'bx bx-sun bx-sm',
            title: 'Kunduzgi rejim yoqildi',
            message: 'Sayda kunduzgi rejim ishga tushdi !',
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