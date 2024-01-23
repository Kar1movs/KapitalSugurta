var swiper = new Swiper(".header-intro-swiper", {
    effect: "cards",
    grabCursor: true,
    loop: false,
    // autoplay: {
    //     delay: 6500,
    //     disableOnInteraction: false,
    // },
    cardsEffect: {
        perSlideOffset: 20, // Space between cards in px
        perSlideRotate: 1, // Rotation of cards in degrees
        centeredSlides: true,
    },
});

swiper.slideTo(2, false, false);