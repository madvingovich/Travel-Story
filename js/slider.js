$(window).on({
    load:function () {
        function mySlider(e) {

            this.currentSlide = 0;
            this.slideLength = $(".slide").length;
            this.timer = 0;

            this.mostLittle = function (e) {
                var images = $(e.find("img"));
                var height = $(images[0]).height();
                for(var i = 0; i < images.length - 1; i++) {
                    if($(images[i + 1]).height() < height) {
                        height = $(images[i + 1]).height();
                    }
                }
                $(".slide img").css({"max-height":height+"px"})
            };

            this.sliderWidth = function () {
                $("#slider").width($(e).parent().width());
                $(".slide").width($(e).parent().width());
                $(".slide").height($(".slide img").height());

            };

            this.addDots = function (e) {
                var dots = $(e).find(".dots");
                for(var i = 0; i < this.slideLength; i++) {
                    dots.append("<div class='dot'></div>");
                }
            };

            this.activeSlide = function (e) {
                $(e).find(".dot").eq(this.currentSlide).addClass("active_dot");
            };

            this.next = function () {
                mySlider.currentSlide++;
                if(mySlider.currentSlide > mySlider.slideLength - 1 ){
                    mySlider.currentSlide = 0;
                };
                var slideWidth = $(".slide").width();
                $(".dot.active_dot").removeClass("active_dot");
                $(".dot").eq(mySlider.currentSlide).addClass("active_dot");
                $(".slider-items").css({"left":- slideWidth * mySlider.currentSlide});
            };

            this.nextSlide = function (e) {
                if(e.target.closest(".next")) {
                    clearInterval(this.timer);
                    this.next();
                };
            };

            this.prevSlide = function (e) {
                if(e.target.closest(".prev")) {
                    clearInterval(this.timer);
                    this.currentSlide--;
                    if(this.currentSlide < 0 ) {
                        this.currentSlide = this.slideLength - 1;
                    };
                    var slideWidth = $(".slide").width();
                    $(".dot.active_dot").removeClass("active_dot");
                    $(".dot").eq(this.currentSlide).addClass("active_dot");
                    $(".slider-items").css({"left":- slideWidth * this.currentSlide});
                };
            };

            this.dotClick = function (e) {
                if(e.target.closest(".dot")) {
                    console.log("bbb");
                    var index = $(e.target).index();
                    var slideWidth = $(".slide").width();
                    $(".slider-items").css({"left":-slideWidth * index});
                    $(".dot.active_dot").removeClass("active_dot");
                    $(e.target).closest(".dot").addClass("active_dot");
                    this.currentSlide = index;
                };
            };

            this.sliderAutoplay = function () {
                this.timer = setInterval(function () {
                    mySlider.next();
                },3000);
            };

        };

        var mySlider = new mySlider($("#slider"));

        mySlider.sliderWidth();
        mySlider.addDots($("#slider"));
        mySlider.activeSlide($("#slider"));
        mySlider.mostLittle($("#slider"));
        mySlider.sliderWidth();
        mySlider.sliderAutoplay();

        $(document).on({
            click: function (e) {
                mySlider.dotClick(e);
                mySlider.nextSlide(e);
                mySlider.prevSlide(e);
            }
        });
        $(window).resize(function () {
            mySlider.sliderWidth();
        });







    }
})