(function ($) {
    $(document).ready(function () {
        let sliderAutoplaySpeed = parseInt(sliderData['slider_autoplay_speed']) * 1000;

        if ($('.section-best-collection').length > 0) {
            let swiper = new Swiper('.section-best-collection .swiper-slider', {
                breakpoints: {
                    480: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 3
                    },
                    989: {
                        slidesPerView: 4
                    }
                },

                autoHeight: true,
                loop: true,
                spaceBetween: '15px',

                autoplay: {
                    delay: sliderAutoplaySpeed,
                    pauseOnMouseEnter: true
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    });
}(jQuery));