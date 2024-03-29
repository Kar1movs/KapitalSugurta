if ($(".header-intro-swiper").length) {
    const swiperOptions = {
        effect: 'cards',
        lazyLoading: true,
        limitRotation: false,
        slideShadows: false,
        translate: 0,
        grabCursor: true,
        loop: false,
        cardsEffect: {
            perSlideOffset: 15, // Space between cards in px
            perSlideRotate: 1, // Rotation of cards in degrees
            centeredSlides: true,
        },

        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },


        // on: {
        //     slideChangeTransitionStart: function () {
        //       if (this.isBeginning) {
        //         swiper.params.autoplay.direction = 'normal'; // Forward autoplay
        //       } else if (this.isEnd) {
        //         swiper.params.autoplay.direction = 'reverse'; // Reverse autoplay
        //       }
        //     },
        //   },

        // on: {
        //     slideChangeTransitionStart: function () {
        //         if (this.isBeginning) {
        //             swiper.autoplay.start(); // Start autoplay with normal direction
        //         } else if (this.isEnd) {
        //             swiper.autoplay.stop(); // Stop autoplay
        //             //swiper.autoplay.params.delay = 3000; // Reset autoplay delay
        //             swiper.params.autoplay.direction = 'reverse'; // Set autoplay direction to reverse
        //             swiper.autoplay.start(); // Start autoplay with reverse direction
        //         }
        //     },
        // },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            disabledClass: 'invisible',  //opacity-0
        },
        // custom pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (i, className) {
                return `
                    <button class="${className}">
                        <svg class="swiper-progress" width="48" height="48">
                           
                            <circle class="circle-origin" r="22" cx="24" cy="24"></circle>
                        </svg>
                        <span class="d-flex align-content-center justify-content-center">
                            <img class="d-flex align-content-center justify-content-center allways-have" src="./assets/img/swiper-img/dot.svg" alt="">
                        </span>
                    </button>`;
            }
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                cardsEffect: {
                    perSlideOffset: 10, // Space between cards in px
                    perSlideRotate: 1, // Rotation of cards in degrees
                    centeredSlides: true,
                },
                effect: "cards",
            },
            // when window width is >= 320px
            767: {
                cardsEffect: {
                    perSlideOffset: 10, // Space between cards in px
                    perSlideRotate: 1, // Rotation of cards in degrees
                    centeredSlides: true,
                },
                effect: "cards",
            },
            // when window width is >= 320px
            768: {
                cardsEffect: {
                    perSlideOffset: 10, // Space between cards in px
                    perSlideRotate: 1, // Rotation of cards in degrees
                    centeredSlides: true,
                },
                effect: "cards",
            },
            992: {

            },
            1200: {

            },
        }

    }

    const swiper = new Swiper(".header-intro-swiper", swiperOptions);
    swiper.slideTo(2, false, false);
};
