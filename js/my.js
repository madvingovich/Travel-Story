$(window).on({
    load:function () {

        function showItems(e) {

            this.removeOnloadWindow = function () {
                $(".onload_window").animate({
                    top:49.8 + "%",
                    bottom:49.8 + "%"
                },400);
                $(".circles").animate({opacity:0});
                setTimeout(function () {
                    $(".onload_window").animate({
                        left:49.8 + "%",
                        right:49.8 + "%"
                    },400);
                },400);
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
                if($(document).scrollTop() + $(window).height() > $(elem).offset().top + this.screenPercent) {
                    $(elem).animate({right: 0, opacity: 1}, 800);
                };
            };
            this.opacityShow = function (elem) {
                if($(document).scrollTop() + $(window).height() > $(elem).offset().top + this.screenPercent) {
                    $(elem).animate({opacity: 1}, 1500);
                };
            }

            this.applyShowAnimations = function () {
                this.showToTop($(".main_second_story_caption"));
                this.scaleShow($(".main_second_story .story_img"));
                this.showToRight($(".paragraph3"));
                this.showToLeft($(".paragraph4"));
                this.opacityShow($("#slider"));
                this.scaleShow($(".gallery_block"));
                this.opacityShow($("#video"));
                this.showToRight($(".quote_img"));
                this.showToLeft($(".quote_info"));
                this.showToLeft($(".quote_content"));
                this.showToTop($(".subscribe_block"));
            };

            this.galleryItems = function (e) {
                if(e.target.closest(".gallery_item")) {
                    var src = $(e.target).attr("src");

                    if(!($(e.target).attr("src") === $(".gallery_head_img img").attr("src"))) {

                        $(".gallery_item.active_item").removeClass("active_item");
                        $(e.target).closest(".gallery_item").addClass("active_item")
                        $(".gallery_head_img img").animate({
                            opacity:0
                        },100,function () {
                            setTimeout(function () {
                                $(".gallery_head_img img").attr("src", src);
                                $(".gallery_head_img img").animate({opacity:1},100)
                            },100)
                        });
                    };
                };
            };
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










