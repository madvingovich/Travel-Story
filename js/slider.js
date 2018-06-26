$(window).on({
    load:function () {
        function mySlider(e) {

            this.mostLittle = function (e) {
                var images = $(e.find("img"));
                var height = $(images[0]).height();

                for(var i = 0; i < images.length - 1; i++) {
                    console.log($(images[i]).height());
                    if($(images[i + 1]).height() < height) {
                        height = $(images[i + 1]).height();
                    }
                };
                console.log(height);
                $(".slider_block img").css({"max-height":height+"px"})
            };

            this.applySizes = function () {
                $(".slider_block:last-child").prependTo(".slides");
                $("#slider").width($(e.parent()).width());
                $(".slides").css({"margin-left": -$(e.parent()).width()});
                $(".slider_block").width($(e.parent()).width());
            };

            this.step = function () {
                return $(".slider_block").width();
            };

            this.nextSlide = function (e) {
                if(e.target.closest(".next")) {
                    clearTimeout(this.timer);
                    $(".slides").animate({
                        left:- this.step()
                    }, 800, function () {
                        $(".slider_block:first-child").appendTo(".slides");
                        $(".slides").css({"left":"0"});
                    });
                };
            };

            this.prevSlide = function (e) {
                if(e.target.closest(".prev")) {
                    clearTimeout(this.timer);
                    $(".slides").animate({
                        left:this.step()
                    }, 800, function () {
                        $(".slider_block:last-child").prependTo(".slides");
                        $(".slides").css({"left":"0"});
                    });
                };
            };

            this.timer = false;

            this.pushSlider = function () {
                $(".slides").animate({
                    left:- mySlider.step()
                }, 800, function () {
                    $(".slider_block:first-child").appendTo(".slides");
                    $(".slides").css({"left":"0"});
                });
                this.sliderAutoPlay();
            };

            this.sliderAutoPlay = function () {
                this.timer = setTimeout(function () {
                    mySlider.pushSlider();
                },4000);
            }
        };

        var mySlider = new mySlider($("#slider"));

        mySlider.applySizes();
        mySlider.mostLittle($("#slider"));
        mySlider.sliderAutoPlay();

        $(document).on({
            click: function (e) {
                mySlider.nextSlide(e);
                mySlider.prevSlide(e);
            }
        });
    }
});