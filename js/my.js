$(window).on({
    load:function () {

        function showItems(e) {
            this.check = 1;
            this.nightModeToggle = function (e) {
                if (e.target.closest(".night_mode")) {
                    $(".night_mode_toggle").toggleClass("active");
                    $(".night_mode").toggleClass("active_mode_box");
                    $("body").toggleClass("night");
                    if(this.check == 1) {
                        $(".night_mode_block p")[0].innerHTML = "Night Mode : ON ";
                        $("video").attr("poster", "img/video_night_poster.jpg");
                        this.check = 2;
                    } else {
                        $(".night_mode_block p")[0].innerHTML = "Night Mode : OFF";
                        $("video").attr("poster", "img/video_poster.jpg");
                        this.check = 1;
                    }
                };
            };

            this.removeOnloadWindow = function () {
                $(".onload_window").css({
                    "left":"100%",
                    "top":"-100%",
                    "bottom":"100%",
                    "right":"-100%",
                    "transform":"skew(-74deg) scale(0)"
                });
                $("body").css({"overflow":"auto"});
            };

            this.animateTopItems = function () {
                $(".onload_window").remove();
                $(".logo").animate({top: 0}, 500);
                $(".story").animate({opacity:1, bottom:0},1000);
                $(".night_mode_block").animate({opacity:1},500);
                setTimeout(function () {
                    $("#story_img1").animate({right: 0, opacity: 1}, 900);
                    $(".story1_left").animate({top: 0, opacity: 1}, 1500);
                },300);
                setTimeout(function () {
                    $("#story_img2").animate({left: 0,opacity: 1}, 900);
                },800);
            };

            this.screenPercent = $(window).height() / 100 * 15;

            this.showToTop = function (elem) {
                if($(document).scrollTop() + $(window).height() + 100 > $(elem).offset().top) {
                    $(elem).animate({top: 0, opacity: 1}, 700);
                };
            };
            this.scaleShow = function (elem) {
                if($(document).scrollTop() + $(window).height() + 100 > $(elem).offset().top) {
                    $(elem).css({"transform":"scale(1)"});
                };
            };
            this.showToRight = function (elem) {
                if($(document).scrollTop() + $(window).height() > $(elem).offset().top + this.screenPercent) {
                    $(elem).animate({left: 0, opacity: 1}, 800);
                };
            };

            this.showToLeft = function (elem) {
                if($(document).scrollTop() + $(window).height() > $(elem).offset().top ) {
                    $(elem).animate({right: 0, opacity: 1}, 800);
                };
            };

            this.showButtons = function (elem) {
                for(var i = 0; i < $(elem).length; i++) {
                    if($(document).scrollTop() + $(window).height() > $(elem[i]).offset().top ) {
                        $(elem[i]).css({"opacity":"1","top":"0"});
                    };
                };
            };
            this.applyShowAnimations = function () {
                this.showButtons($(".story_link"));
                this.showToTop($(".main_second_story_caption"));
                this.scaleShow($(".main_second_story .story_img"));
                this.showToRight($(".paragraph3"));
                this.showToLeft($(".paragraph4"));
                this.showToRight($(".quote_img"));
                this.showToLeft($(".quote_info"));
                this.showToLeft($(".quote_content"));
                this.showToTop($(".subscribe_block"));
            };

            this.galleryItems = function (e) {
                var src = $(e.target).attr("src");
                console.log(($(e.target).attr("src") === $(".gallery_head_img img").attr("src")))
                if(!(($(e.target).attr("src") === $(".gallery_head_img img").attr("src")))) {
                    $(".gallery_item.active_item").removeClass("active_item");
                    $(e.target).closest(".gallery_item").addClass("active_item");
                    $(".gallery_head_img img").animate({opacity:0},100,function () {
                        setTimeout(function () {
                            $(".gallery_head_img img").attr("src", src);
                            $(".gallery_head_img img").animate({opacity:1},100)
                        },100)
                    });
                }
            }
        };


        var showItems = new showItems();

        showItems.removeOnloadWindow();

        // showItems.applyShowAnimations();

        $(document).on({
            click:function (e) {
                showItems.nightModeToggle(e);
                showItems.galleryItems(e)
            },
            scroll:function () {
                showItems.applyShowAnimations();
            }
        });

        setTimeout(function () {
            showItems.animateTopItems();
        },800);
    }
});










