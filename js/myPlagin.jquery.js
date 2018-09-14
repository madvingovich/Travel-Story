$(function () {
    $.fn.mySlider = function (settings) {
        let def = {
            dots: true,
            autoplay: 4000,
            arrows: true
        };

        $.extend(def, settings);

        let slider = $(this);
        let itemsBlock = slider.find('.slider-items');
        let sliderItems = slider.find('.item');
        let imgWidth;
        let isRun = false;
        let timer;
        let activeDotIndex = 0;



        function setImagesWidth () {
            imgWidth = slider.width();
            sliderItems.width(imgWidth);
        }

        function changeActiveDot (val) {      // val = + or - depending on were we wont to move the dot
            let activeDot = slider.find('.dot.active');
            let dots = slider.find('.dot');
            let index = activeDot.index();
            activeDot.removeClass('active');
            if(val === '+') {
                index = index >= sliderItems.length - 1 ? 0 : index + 1;
                $(dots[index]).addClass('active');
            } else if(val === '-') {
                index = index <= 0 ? sliderItems.length - 1 : index - 1;
                $(dots[index]).addClass('active');
            }
        }

        setImagesWidth();

        function changeSlide (slide) {   // slide = number of slide || prev || next;
            if(isRun) return;
            isRun = true;

            if (slide === 'undefined') return;

            if(typeof slide === 'number') {
                slide *= -imgWidth;
                itemsBlock.css({'transform' : 'translateX('+ slide +'px)'});
            } else
            if(typeof slide === 'string') {
                let x = -itemsBlock.css('transform').split(',')[4];
                let slidesWidth = sliderItems.width() * sliderItems.length;
                let newX;
                if (slide === 'next') {
                    newX = x + sliderItems.width() >= slidesWidth ? 0 : x + sliderItems.width();
                    itemsBlock.css({'transform' : 'translateX('+ -newX +'px)'});
                    if(def.dots) {
                        changeActiveDot('+');
                        activeDotIndex = $('.dot.active').index();
                    }
                } else if(slide === 'prev') {
                    newX = x - sliderItems.width() < 0 ? slidesWidth - sliderItems.width() : x - sliderItems.width();
                    itemsBlock.css({'transform' : 'translateX('+ -newX +'px)'});
                    if(def.dots) {
                        changeActiveDot('-');
                        activeDotIndex = $('.dot.active').index();
                    }
                }
            }
            setTimeout(function () {
                isRun = false;
            },1100)
        }

        if(def.dots) {
            let dots = $('<div>').addClass('dots');
            for (let i = 0; i < sliderItems.length; i++) {
                let dot = $('<div>').addClass('dot');
                dots.append(dot)
            }
            slider.append(dots);
            let dot = $('.dot');
            dot.first().addClass('active');
            dot.on('click', function () {
                if(isRun) return;
                $('.dot.active').removeClass('active');
                $(this).addClass('active');
                activeDotIndex = $(this).index();
                changeSlide(activeDotIndex);
            });
        }
        
        if(def.arrows) {
            slider.append($('<div>').addClass('prev control').html('<'));
            slider.append($('<div>').addClass('next control').html('>'));
            $('.prev').on('click', function () {
                changeSlide('prev');
            });
            $('.next').on('click', function () {
                changeSlide('next');
            });
        }

        if(def.autoplay) {
            timer = setInterval(function () {
                changeSlide('next');
            },def.autoplay);
        }

        $(window).on('resize', function () {
            setImagesWidth();
            itemsBlock.css({'transform' : 'translateX('+ -activeDotIndex * slider.width() +'px)'});
        });

        return this;
    };
});