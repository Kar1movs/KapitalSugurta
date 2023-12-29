"use strict";

// swiper 
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




const tabsContainer = document.querySelector("[role=tablist]");
const tabButtons = tabsContainer.querySelectorAll("[role=tab]");
const tabPanels = document.querySelectorAll("[role=tabpanel]");

tabsContainer.addEventListener("mouseover", (e) => {
    const clickedTab = e.target.closest("button");
    const currentTab = tabsContainer.querySelector('[aria-selected="true"]');

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
    // console.log(tabPanels);

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

    $(document).on('mouseenter', activePanel, function () {
        console.log('inside');

        // newTab.setAttribute("aria-selected", true);
        // newTab.setAttribute("tabindex", "0");
        // newTab.focus();
    });

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


// $(document).on('mouseenter', '[data-bs-toggle="pill"]', function () {
//     $(this).tab('show');
// });


// $(document).on('mouseleave', '[data-bs-toggle-hover="active"]', function () {


//     let childActive = $('.nav-item button.nav-link.active');

//     if (childActive.hasClass('active')) {
//         childActive.removeClass('active');
//         $('.nav-tabs li.active').removeClass('active');
//         $('.tab-content div.active').removeClass('active');
//     }
//     closeTab()
// });


$(document).ready(function () {
    $(document).on('click', '#search-modal', function () {
        var interval = 500;
        setTimeout(() => {
            $('#searchInpOpen').focus();
        }, interval);
    })
});


// counter 
if ($('.counter').length > 0) {
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    $('.counter').addClass('animated fadeInDownBig');
    $('h3').addClass('animated fadeIn');
}

// scroll up
let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}