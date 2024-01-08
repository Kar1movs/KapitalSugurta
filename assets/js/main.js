let csrfParam = $('meta[name="csrf-param"]').attr("content");
let csrfToken = $('meta[name="csrf-token"]').attr("content");
let lang = $('html').attr('lang')
let overlay = jQuery('.overlay');

// SCROLL HEADER
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() > 50) {
            $(".main-header").addClass("main-header--fixed");
        } else {
            $(".main-header").removeClass("main-header--fixed");
        }
    });
});

// menu navigation
$(".main-header__nav-item.megamenu-parent").mouseover(function () {
    $(this).addClass("active");
    index = $(this).index();
    $(".main-header__nav__megamenu").eq(index).addClass("megamenu-active");
    $(".main-header__nav__overlay").addClass("active");
});
$(".main-header__nav-item.megamenu-parent").mouseleave(function () {
    $(this).removeClass("active");
    index = $(this).index();
    $(".main-header__nav__overlay").removeClass("active");
    $(".main-header__nav__megamenu").removeClass("megamenu-active");
});

// HEADER SEARCH
var ifSet = false;
/*$(".header-search-dialog").preventDefault();*/
$(".header-search > .header-search--input-wrapper").on("click", function () {
    if (ifSet == false) {
        $(this).addClass("active");

        $(".header-search-dialog").addClass("active");
        $(".header-search-overlay").addClass("active");
        ifSet = true;
        $(".header-search-overlay").on("click", function () {
            $(".header-search--input-wrapper").removeClass("active");
            $(".header-search-dialog").removeClass("active");
            $(".header-search-overlay").removeClass("active");
            ifSet = false;
        });


    } else {
        $(this).removeClass("active");
        $(".header-search-dialog").removeClass("active");
        $(".header-search-overlay").removeClass("active");
        ifSet = false;
    }

});
// MENU BURGER ICON AND ASIDE SHOW OR HIDE
var ifSetB = false;
var iconTimes = "<i aria-hidden=\"true\" class=\"v-icon notranslate mdi mdi-close theme--light\" style=\"font-size: 30px;\"></i>";
var iconBar = "<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" role=\"img\" width=\"30\" height=\"30\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\" class=\"iconify iconify--tabler\"><g fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"icon-tabler\"><path d=\"M4 6h16\"></path> <path d=\"M4 12h16\"></path> <path d=\"M4 18h16\"></path></g></svg>";
$(".v-overlay").addClass("d-none");
$(".show-nav-drawer-btn").on("click", function () {

    if (!ifSetB) {

        $(".v-btn__default").html(iconTimes);
        $(".v-overlay").removeClass("d-none");
        $(".main-header__navigation-drawer").css({"transform": " translateX(0%)", "visibility": "visible"});
        $(".v-menu").addClass("d-block");
        ifSetB = true;
    } else {

        $(".v-btn__default").html(iconBar);
        $(".v-overlay").addClass("d-none");
        $(".main-header__navigation-drawer").css({"transform": " translateX(100%)", "visibility": "hidden"});
        $(".v-menu").removeClass("d-block");
        ifSetB = false;
    }

});

$(".v-btn__default").on("click", function () {
    $(".v-btn__default").html(iconBar);
    $(".v-overlay").addClass("d-none");
    $(".main-header__navigation-drawer").css({"transform": " translateX(100%)", "visibility": "hidden"});
    $(".v-menu").removeClass("d-block");

    $(".v-list-group").removeClass("active");
    $(".v-icon-custom").removeClass("active");
    $(".menu_dropdown").slideUp();
    ifSetB = false;
});
$(".v-overlay").on("click", function () {
    $(".v-btn__default").html(iconBar);
    $(".v-overlay").addClass("d-none");
    $(".main-header__navigation-drawer").css({"transform": " translateX(100%)", "visibility": "hidden"});
    $(".v-menu").removeClass("d-block");

    $(".v-list-group").removeClass("active");
    $(".v-icon-custom").removeClass("active");
    $(".menu_dropdown").slideUp();
    ifSetB = false;
});

// MENULIST ITEM ANIMATION DROPDOWN

$(".menu_dropdown").hide();
$(document).ready(function () {
    $(".v-list-group").click(function () {
        $(this).toggleClass("active");
        index = $(this).index();
        $(".menu_dropdown").eq(index).slideToggle("fast");
        $(".menu_dropdown").siblings('active').slideUp();
        $(".v-icon-custom").eq(index).toggleClass("active");
    });
});

function fnBrowserDetect() {
    let userAgent = navigator.userAgent;
    let browserName;
}

/*=============== SHOW SCROLL UP ===============*/


function scrollUp() {
    const scrollUp = document.getElementById('scroll-up'); // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class

    if (this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll', scrollUp);


$(function () {
    $('.mask-card-number').mask('0000 0000 0000 0000');
    $('.mask-card-expire').mask('00/00');
    $('.mask-phone').mask('+000 (00) 000-00-00');
    $('.mask-birthday').mask('00.00.0000');
    $('.mask-date').mask('00.00.0000');
    $('.mask-tin').mask('000 000 000');
    $('.mask-money').mask("# ##0", {reverse: true});
    $(document).on('change', 'body', function () {
        $('.mask-phone').mask('+000 (00) 000-00-00');
        $('.mask-birthday').mask('00.00.0000');
        $('.mask-date').mask('00.00.0000');
        $('.mask-tin').mask('000 000 000');
        $('.mask-money').mask("# ##0", {reverse: true});
    })

    jQuery(document).on('pjax:complete', '#pjax_policy_travel_calc', function () {
        $('.mask-birthday').mask('00.00.0000');
        $('.mask-date').mask('00.00.0000');
    });

    jQuery(document).on('click', '.modal__exit', function (event) {
        $('.modal').modal('hide');
    });

    jQuery(document).on('click', '.hamburger', function (event) {
        $('.wrapper').toggleClass('wrapper--menu-open')
    });

    jQuery(document).on('focus', 'input', function (event) {
        var val = $(this).val();
        $(this).val('');
        $(this).val(val);
    });

});


var response = false;

function myCheckTransAjaxCall(url, hash) {
    $.ajax({
        url: url,
        type: 'post',
        data: {
            h: hash,
            csrfParam: csrfToken
        }
    }).done(function (data) {
        response = data;
    });
    console.log(response);
    return response;
}

/* Only Alphabet Or Number Allowed validation Regex */
$('.latin_letters').on('keypress', function (event) {
    var englishAlphabetAndWhiteSpace = /^[-@./#&+\w\s]*$/;
    var key = String.fromCharCode(event.which);
    if (event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39 || englishAlphabetAndWhiteSpace.test(key)) {
        return true;
    }
    return false;
});
$(function () {
    $(document).on('keypress', '.latin_letters_no_number', function (event) {
        console.log("Worked");
        var englishAlphabetAndWhiteSpace = /^[a-zA-Z\s]+$/;
        var key = String.fromCharCode(event.which);
        if (event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39 || englishAlphabetAndWhiteSpace.test(key)) {
            return true;
        }
        return false;
    });
    $(document).on('keypress', '.only_number', function (event) {
        console.log("Worked");
        var onlyNumbers = /^[0-9]+$/;
        var key = String.fromCharCode(event.which);
        if (event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39 || onlyNumbers.test(key)) {
            return true;
        }
        return false;
    });

    $(document).on('keypress', '.latin_letters_and_number', function (event) {
        var englishAlphabetAndNumber = /^[a-zA-Z0-9]+$/;
        var key = String.fromCharCode(event.which);
        if (event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39 || englishAlphabetAndNumber.test(key)) {
            return true;
        }
        return false;
    });

});
$('.no_number').on('keypress', function (event) {
    var englishAlphabetAndWhiteSpace = /[^0-9]$/;
    var key = String.fromCharCode(event.which);
    if (event.keyCode === 8 || event.keyCode === 37 || event.keyCode === 39 || englishAlphabetAndWhiteSpace.test(key)) {
        return true;
    }
    return false;
});

/* Voice on mode *********************************************** */

/* Modal okna zvukovoy effect uchun */
let Voicemode = localStorage.getItem("Voicemode");
var voiceTop = document.querySelector(".voiceOn");
var timeCloseModalAlert = 1000;
let voiceOn = false;
let voiceCheck = true;
var voiceModeControl = document.querySelector(".voiceModeControl");
const voiceModeToggle = document.querySelector(".mode__voice");
let voiceSaveToggle = document.querySelector(".voicemode input[type='checkbox']");

/* |Barcha matnlarni ovozlar orqali ijro etuvchi funksiyalar shuni ichida */

function ifActiveVoice() {
    if (!voiceOn) {
        // Malum secundan keyin sahifa yangilanadi
        setInterval(() => {
            location.reload();
        }, timeCloseModalAlert);
    } else if (voiceOn) {
        // A simple IIFE function.
        // Простая функция IIFE.
        // Oddiy IIFE funktsiyasi.
        (function () {
            "use strict"; // For the sake of practice.
            // Ради практики.
            // Amaliyot uchun.

            if (typeof speechSynthesis === 'undefined') return; // Some config stuffs...
            // Некоторые конфиги...
            // Ba'zi konfiguratsiyalar ...

            var voiceSelect = document.getElementById("voiceSelect");
            var myPhrase = ' ';
            var voices = []; // This is essentially similar to jQuery's $.ready.
            // По сути, это похоже на $.ready в jQuery.
            // Bu mohiyatan jQuery $.ready dasturiga o'xshaydi.

            var ready = function (callback) {
                var d = document,
                    s = d.readyState; // DOMContentLoaded was fired
                // DOMContentLoaded был запущен
                // DOMContentLoaded ishdan bo'shatildi

                if (s === "complete" || s === "loaded" || s === "interactive") {
                    callback();
                } else {
                    if (d.addEventListener) {
                        d.addEventListener("DOMContentLoaded", callback, false);
                    } else {
                        d.attachEvent("onDOMContentLoaded", callback);
                    }
                }
            }; // This is a function to display all possible voice options.
            // Это функция для отображения всех возможных вариантов голоса.
            // Bu barcha mumkin bo'lgan ovozli variantlarni ko'rsatish funksiyasi.


            function populateVoiceList() {
                voices = speechSynthesis.getVoices();

                for (var i = 0; i < voices.length; i++) {
                    var option = document.createElement('option');
                    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
                    option.textContent += voices[i].default ? ' -- DEFAULT' : '';
                    option.setAttribute('data-lang', voices[i].lang);
                    option.setAttribute('data-name', voices[i].name);
                    document.getElementById("voiceSelect").appendChild(option);
                }
            } // This is the handler for when the select tag is changed.
            // Это обработчик изменения тега select.
            // Bu tanlangan teg o'zgartirilganda ishlov beruvchidir.


            function handler() {
                var utterThis = new SpeechSynthesisUtterance(myPhrase);
                var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

                for (var i = 0; i < voices.length; i++) {
                    if (voices[i].name === selectedOption) {
                        utterThis.voice = voices[i];
                    }
                }

                speechSynthesis.speak(utterThis);
            };

            function buildBtn(e) {
                let button = document.getElementById("voice");
                if (!getSelectionText()) {
                    button.style.display = "none";
                } else if (getSelectionText()) {
                    let x = e.pageX;
                    let y = e.pageY;
                    let justBitPlus = -20;
                    let justBitMinus = -5;
                    button.style.display = "block";
                    button.style.position = "absolute";
                    button.style.left = justBitPlus + x + "px";
                    button.style.top = justBitPlus + y + "px";
                    /*button.style.left = justBitMinus + x + "px";
                     button.style.top = justBitMinus + y + "px";*/

                    /*
                    let coor = "Coordinates: (" + x + "," + y + ")";
                    button.innerHTML = coor;
                    button.style.left = justBit + x + "px";
                    button.style.top = justBit + y + "px";
                    */
                }

            }

            function fnBrowserDetect() {
                let userAgent = navigator.userAgent;
                let browserName;
                var button = document.querySelector(".btn-voice");
                var detectBrowser = document.querySelector(".detect");

                if (userAgent.match(/chrome|chromium|crios/i)) {
                    button.addEventListener("click", () => {
                        setTimeout(function () {
                            speechSynthesis.cancel();
                            myPhrase = getSelectionText();
                            handler();
                        }, 1);
                    });
                    console.log("chrome work");
                } else if (userAgent.match(/firefox|fxios/i)) {
                    setTimeout(function () {
                        speechSynthesis.cancel();
                        myPhrase = getSelectionText();
                        handler();
                    }, 1);
                } else if (userAgent.match(/safari/i)) {
                    setTimeout(function () {
                        speechSynthesis.cancel();
                        myPhrase = getSelectionText();
                        handler();
                    }, 1);
                } else if (userAgent.match(/opr\//i)) {
                    button.addEventListener("click", () => {
                        setTimeout(function () {
                            speechSynthesis.cancel();
                            myPhrase = getSelectionText();
                            handler();
                        }, 1);
                    });
                } else if (userAgent.match(/edg/i)) {
                    button.addEventListener("click", () => {
                        setTimeout(function () {
                            speechSynthesis.cancel();
                            myPhrase = getSelectionText();
                            handler();
                        }, 1);
                    });
                } else {
                    button.addEventListener("click", () => {
                        setTimeout(function () {
                            speechSynthesis.cancel();
                            myPhrase = getSelectionText();
                            handler();
                        }, 1);
                    });
                }
            } // This is your code to get the selected text.
            // Это ваш код для получения выделенного текста.
            // Bu tanlangan matnni olish uchun sizning kodingiz.


            function getSelectionText() {
                var text = "";

                if (window.getSelection) {
                    text = window.getSelection().toString().trim(); // for Internet Explorer 8 and below. For Blogger, you should use &amp;&amp; instead of &&.
                    // для Internet Explorer 8 и ниже. Для Blogger следует использовать &amp;&amp; вместо &&.
                    // Internet Explorer 8 va undan past versiyalar uchun. Blogger uchun siz &amp;&amp;amp;amp;amp; ning o'rniga &&.
                } else if (document.selection && document.selection.type !== "Control") {
                    text = document.selection.createRange().text;
                }

                return text;
            } // This is the on mouse up event, no need for jQuery to do this.
            // Это событие при наведении мыши, для этого не требуется jQuery.
            // Bu sichqonchani yuqoriga ko'tarish hodisasi, buni amalga oshirish uchun jQuery kerak emas.


            document.onmouseup = function (e) {
                fnBrowserDetect();
                buildBtn(e);
            }; // Some place for the application to start.
            // Некоторое место для запуска приложения.
            // Ilovani boshlash uchun ba'zi joy.


            function start() {
                populateVoiceList();
                if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = populateVoiceList;
                voiceSelect.onchange = handler;
                setTimeout(handler, 75);
            } // Run the start function.
            // Запускаем функцию запуска.
            // Boshlash funksiyasini ishga tushiring.

            ready(start);


        })();
    }
}

/*if(voiceModeControl.classList.contains('active')) {
    console.log("now this is worked")
}
else {
    console.log("now must disabled");
}*/
const enableVoiceMode = () => {
    voiceTop.classList.add("active");
    voiceModeControl.classList.add("active");
    voiceModeToggle.classList.add("active");
    voiceSaveToggle.setAttribute("checked", "true");
    voiceOn = true;
    voiceCheck = true;
    ifActiveVoice();
    localStorage.setItem("Voicemode", "enabled");
};
const DisableAllSound = () => {
    voiceModeControl.innerHTML = "";
    document.getElementById("voice").classList.add("disableBtn");
    /*document.getElementById("voice").innerHTML = "";*/
}
const EnableAllSound = () => {
    document.getElementById("voice").classList.remove("disableBtn");
}
const disableVoiceMode = () => {
    voiceTop.classList.remove("active");
    voiceModeControl.classList.remove("active");
    voiceModeToggle.classList.remove("active");
    voiceSaveToggle.setAttribute("checked", "false");
    voiceOn = false;
    voiceCheck = false;
    localStorage.setItem("Voicemode", null);
};
if (Voicemode === 'enabled') {
    enableVoiceMode();
}
voiceTop.addEventListener("click", () => {
    if (!voiceOn) {
        enableVoiceMode();
        EnableAllSound();
    } else {
        disableVoiceMode();
        DisableAllSound();

    }

    /*ifActiveVoice();*/
});
/* **************************************************************************** */

/* Bu funcsiyada fontSize razmerlari ozgartiriladi **************************** */

$(document).ready(function () {
    let plus5Max = '22px';
    let minus5Min = '16px';
    let decrease = document.querySelector(".decremet");
    let increase = document.querySelector(".increment");
    let currentSize = document.getElementById("currentSize");
    var curFontSize = localStorage["FontSize"];
    if (curFontSize) {
        //set to previously saved fontsize if available
        $('.dataFont').css('font-size', curFontSize);
        currentSize.innerText = curFontSize;
        if (curFontSize === '22px') {
            increase.classList.add('active-last');
            increase.classList.add('visibile-hide');
            decrease.classList.remove('active-last');
            decrease.classList.add('visibile');

        } else if (curFontSize === '16px') {
            decrease.classList.remove('active-last');
            decrease.classList.remove('visibile');
        } else {
            decrease.classList.add('active-last');
            decrease.classList.add('visibile');
        }

    }
    $(".increaseFont,.decreaseFont,.resetFont").click(function () {
        var type = $(this).val();
        curFontSize = $('.dataFont').css('font-size');
        if (type === 'increase') {
            decrease.classList.remove('active-last');
            decrease.classList.add('visibile');
            if (curFontSize !== plus5Max) {
                $('.dataFont').css('font-size', parseInt(curFontSize) + 1 + "px");
                curFontSize = parseInt(curFontSize) + 1 + "px";
            } else {
                increase.classList.add('active-last');
                increase.classList.add('visibile-hide');
            }
        } else if (type === 'decrease') {
            increase.classList.remove('active-last');
            increase.classList.remove('visibile-hide');
            if (curFontSize !== minus5Min) {
                $('.dataFont').css('font-size', parseInt(curFontSize) - 1 + "px");
                curFontSize = parseInt(curFontSize) - 1 + "px";
            } else {
                decrease.classList.add('active-last');
                decrease.classList.remove('visibile');
            }
        } else if (type === 'resetFont') {
            decrease.classList.remove('active-last');
            decrease.classList.remove('visibile');
            increase.classList.remove('active-last');
            increase.classList.remove('visibile-hide');
            $('.dataFont').css('font-size', "16px");
            curFontSize = "16px";
        }
        currentSize.innerText = curFontSize;
        localStorage.setItem('FontSize', curFontSize);
    });
});
/* ***************************************************************************** */

/* dark light mode bilan ulanishlar ****************************** */

let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector(".mode__theme");
let svgNone = document.querySelectorAll(".svg-none");
let saveToggle = document.querySelector(".darkmode input[type='checkbox']");

const enableDarkMode = () => {
    document.documentElement.classList.add("blind");
    darkModeToggle.classList.add("active");
    saveToggle.setAttribute("checked", "true");

    for (let i = 0; i < svgNone.length; i++) {
        const element = svgNone[i];
        element.style.display = "none";
    }

    localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
    document.documentElement.classList.remove("blind");
    darkModeToggle.classList.remove("active");
    saveToggle.setAttribute("checked", "false");
    for (let i = 0; i < svgNone.length; i++) {
        const element = svgNone[i];
        element.style.display = "block";
    }

    localStorage.setItem("darkMode", null);
};

if (darkMode === 'enabled') {
    enableDarkMode();
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
    darkMode = localStorage.getItem("darkMode");

    if (darkMode !== 'enabled') {
        enableDarkMode();
        /*disableScroll();*/
    } else {
        disableDarkMode();
    }
});
/* ************************************************************ */

$(document).ready(function () {

    $(".shadow-hover").hover(
        function () {
            $(this).addClass('shadow');
        }, function () {
            $(this).removeClass('shadow');
        }
    );
// document ready
});

/*for clone elems*/
// var parentOnUl = document.querySelector('.v-navigation-drawer__content');
// var phoneForClone = document.querySelector('#phoneForClone');
// var santaForClone = document.querySelector('#santaForClone');
// var filialForClone = document.querySelector('#FillialForClone');
// var specialForClone = document.querySelector('#SpecialForClone');
// var europrotocolForClone  = document.querySelector('#EuroprotocolForClone');

// var vNavigationDrawerBorder = document.querySelector('.v-list.main-navigation-drawer-list.pt-0.v-sheet.theme--light');

// var clonedPhone = phoneForClone.cloneNode(true);
// var clonedSanta = santaForClone.cloneNode(true);
// var clonedFilial = filialForClone.cloneNode(true);
// var clonedSpecial = specialForClone.cloneNode(true);
// var clonedEuroprotocol = europrotocolForClone.cloneNode(true);
// var options = [
//     arrayLi = [clonedPhone, clonedSanta, clonedFilial, clonedSpecial, clonedEuroprotocol],
//     arrayLi = ['First Option','Second Option','Third Option'],
// ];
// var optionsLi = [clonedPhone, clonedSanta, clonedFilial, clonedSpecial, clonedEuroprotocol];
// function makeUL(array) {
//     // Create the list element:
//     var listUl = document.createElement('ul');
//     listUl.classList.add('navbar','py-3');
//
//     for (var i = 0; i < array.length; i++) {
//         // Create the list item:
//         // var item = document.createElement('li');
//         var item = array[i];
//         item.classList.add('py-1');
//         // Set its contents:
//         //item.appendChild(document.createTextNode(array[i]+'me'));
//
//     // Add it to the list:
//         listUl.appendChild(item);
// }
//
// // Finally, return the constructed list:
// return listUl;
// }
// parentOnUl.appendChild(makeUL(optionsLi));
/*vNavigationDrawerBorder.after(clonedEuroprotocol);
vNavigationDrawerBorder.after(clonedPhone);
vNavigationDrawerBorder.after(clonedSanta);
vNavigationDrawerBorder.after(clonedFilial);
vNavigationDrawerBorder.after(clonedSpecial);*/

/*listUl.appendChild(clonedPhone);
parentOnUl.appendChild(listUl);*/

/*var widthWindowCurrentSize = $(window).width();*/

$(window).resize(function () {
    var widthWindowCurrentSize = $(window).width();
    console.log(widthWindowCurrentSize);
});

function Tested() {
    var widthWindowCurrentSize = $(window).width();
    if (widthWindowCurrentSize < 768) {
        var europrotocolForClone = document.querySelector('#EuroprotocolForClone');
        var vNavigationDrawerBorder = document.querySelector('.v-list.main-navigation-drawer-list.pt-0.v-sheet.theme--light');
        var clonedEuroprotocol = europrotocolForClone.cloneNode(true);
        clonedEuroprotocol.classList.add('d-block', 'w-50', 'mx-auto', 'mt-2');
        vNavigationDrawerBorder.after(clonedEuroprotocol);
    }
}

Tested();

if (window.innerWidth < 768) {
    console.log('log')
}

function ceil_custom(val, ceil=1000) {
    return Math.ceil(val/ceil)*ceil;
}
