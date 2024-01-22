"use strict";
/*=============== Loader | Omonjon ===============*/
document.addEventListener('DOMContentLoaded', function (eventObject) {
    $('.load').fadeIn("slow");
})
window.addEventListener("load", function (eventObject) {
    $('.load').fadeOut("slow");
});

//   + --------- +
//  / tool tips /
// + --------- + 

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$('[rel="tooltip"]').on('click', function () {
    $(this).tooltip('hide')
})

//   + ------ +
//  / swiper /
// + ------ + 
const swiper = new Swiper('.header-intro-swiper', {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    // Optional parameters
    loop: false,

    autoplay: {
        delay: 6500,
        disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    on: {
        afterInit: function () {
            $('video').each(function () {
                if ($(this).parents('.swiper-slide').hasClass('swiper-slide-active')) {
                    // $(this)[0].play();
                } else {
                    $(this)[0].pause();
                }
            })
        },
        slideChange: function () {
            $('video').each(function () {

                if ($(this).parents('.swiper-slide').hasClass('swiper-slide-active')) {
                    $(this)[0].pause();
                } else {
                    $(this)[0].play();
                }
            })
        },
    },
});

// ***************************** tabs ******************************* //
const tabsContainer = document.querySelector("[role=tablist]");
const tabButtons = tabsContainer.querySelectorAll("[role=tab]");
const tabPanels = document.querySelectorAll("[role=tabpanel]");

tabsContainer.addEventListener("mouseover", (e) => {
    const clickedTab = e.target.closest("button");
    const currentTab = tabsContainer.querySelector('[aria-selected="true"]');
    if (clickedTab === currentTab) {
        switchTab(clickedTab);
    }
    if (!clickedTab || clickedTab === currentTab) return;

    switchTab(clickedTab);
});

tabsContainer.addEventListener("mouseenter", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "Home":
            e.preventDefault();
            switchTab(tabButtons[0]);
            break;
        case "End":
            e.preventDefault();
            switchTab(tabButtons[tabButtons.length - 1]);
            break;
    }
});

function moveLeft() {
    const currentTab = document.activeElement;

    if (!currentTab.previousElementSibling) {
        tabButtons.item(tabButtons.length - 1).focus();
    } else {
        currentTab.previousElementSibling.focus();
    }
}

function moveRight() {
    const currentTab = document.activeElement;
    if (!currentTab.nextElementSibling) {
        tabButtons.item(0).focus();
    } else {
        currentTab.nextElementSibling.focus();
    }
}

function switchTab(newTab) {
    const oldTab = tabsContainer.querySelector('[aria-selected="true"]');
    const activePanelId = newTab.getAttribute("aria-controls");
    const activePanel = tabsContainer.nextElementSibling.querySelector(
        "#" + CSS.escape(activePanelId)
    );

    $(document).on('mouseleave', '[data-bs-toggle-hover="active"]', function closeTab() {

        activePanel.setAttribute("hidden", false);
    });

    tabButtons.forEach((button) => {
        button.setAttribute("aria-selected", false);
        button.setAttribute("tabindex", "-1");

    });

    tabPanels.forEach((panel) => {
        panel.setAttribute("hidden", true);
    });

    activePanel.removeAttribute("hidden", false);

    newTab.setAttribute("aria-selected", true);
    newTab.setAttribute("tabindex", "0");
    newTab.focus();

    moveIndicator(oldTab, newTab);
}

// move underline indicator
function moveIndicator(oldTab, newTab) {
    const newTabPosition = oldTab.compareDocumentPosition(newTab);
    const newTabWidth = newTab.offsetWidth / tabsContainer.offsetWidth;
    let transitionWidth;

    // if the new tab is to the right
    if (newTabPosition === 4) {
        transitionWidth =
            newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
    } else {
        // if the tab is to the left
        transitionWidth =
            oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
        tabsContainer.style.setProperty("--_left", newTab.offsetLeft + "px");
    }

    tabsContainer.style.setProperty(
        "--_width",
        transitionWidth / tabsContainer.offsetWidth
    );

    setTimeout(() => {
        tabsContainer.style.setProperty("--_left", newTab.offsetLeft + "px");
        tabsContainer.style.setProperty("--_width", newTabWidth);
    }, 220);
}
// bootstrap tab panel rechange 
// const triggerTabList = document.querySelectorAll('#myTab button')
// triggerTabList.forEach(triggerEl => {
//     const tabTrigger = new bootstrap.Tab(triggerEl)

//     triggerEl.addEventListener('mouseover', event => {
//         event.preventDefault()
//         tabTrigger.show()
//     })
// })
// search 
$(document).ready(function () {
    $(document).on('click', '#search-modal', function () {
        var interval = 500;
        setTimeout(() => {
            $('#searchInpOpen').focus();
        }, interval);
    })
});


// *************************** counter ********************** // 
if ($('.counter').length > 0) {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    // $('.counter').addClass('animated fadeInDownBig');
    // $('h3').addClass('animated fadeIn');
}


function noDigits(event) {
    if ("1234567890".indexOf(event.key) != -1)
        event.preventDefault();
}

$('document').ready(function () {
    $('#button-sumbit').on('click', function () {
        $('.form_box .rfield').each(function () {
            if ($(this).val() != '') {
                // Если поле не пустое удаляем класс-указание
                $(this).removeClass('empty_field');
            } else {
                // Если поле пустое добавляем класс-указание
                $(this).addClass('empty_field');
            }
        });
    });
});

$('.form_box').on('input', 'input[type="text"][maxlength]', function () {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
});

$('.form_box').on('input', 'input[type="number"][maxlength]', function () {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
});

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header')

    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');

    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)