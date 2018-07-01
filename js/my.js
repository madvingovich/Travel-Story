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
                setTimeout(function () {
                    $(".onload_window").remove();
                },200);
                $(".logo").css({"transform":"translate(0,0)"});
                $(".story").css({"opacity":"1", "transform":"translate(0,0)"});
                setTimeout(function () {
                    $("#story_img1").animate({right: 0, opacity: 1}, 900);
                    $(".story1_left").animate({top: 0, opacity: 1}, 1500);
                },100);
                setTimeout(function () {
                    $("#story_img2").animate({left: 0,opacity: 1}, 900);
                },600);
            };
            this.screenPercent = $(window).height() / 100 * 15;

            this.verticalShowItem = function (elem) {
                if($(document).scrollTop() + $(window).height() + this.screenPercent > $(elem).offset().top) {
                    $(elem).css({"opacity":"1", "transform":"translate(0,0)"});
                }
            };
            this.horizontalShowItem = function (elem) {
                if($(document).scrollTop() + $(window).height() > $(elem).offset().top ) {
                    $(elem).css({"opacity":"1", "transform":"translate(0,0)"});
                }
            };
            this.scaleShow = function (elem) {
                if($(document).scrollTop() + $(window).height() + this.screenPercent > $(elem).offset().top) {
                    $(elem).css({"transform":"scale(1)"});
                }
            };
            this.opacityShow = function (elem) {
                if($(document).scrollTop() + $(window).height() + this.screenPercent > $(elem).offset().top ) {
                    $(elem).css({"opacity": "1"});
                }
            };
            this.applyShowAnimations = function () {
                this.verticalShowItem($(".main_second_story_caption"));
                this.verticalShowItem($(".main_second_story .story_img"));
                this.horizontalShowItem($(".paragraph3"));
                this.horizontalShowItem($(".paragraph4"));
                this.opacityShow($("#slider"));
                this.opacityShow($(".gallery_block"));
                this.opacityShow($("#video"));
                this.horizontalShowItem($(".quote_img"));
                this.horizontalShowItem($(".quote_info"));
                this.opacityShow($(".quote_content"));
                this.verticalShowItem($(".subscribe_block"));
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
                            },100);
                        });
                    }
                }
            };
            this.mobileSliderShow = function () {
                if($(window).width() < 1100) {
                    setTimeout(function () {
                        showItems.opacityShow($("#slider"));
                    },600)
                }
            }
        };

        var showItems = new showItems();

        showItems.removeOnloadWindow();

        showItems.mobileSliderShow();

        $(document).on({
            click:function (e) {
                showItems.galleryItems(e)
            },
            scroll:function () {
                showItems.applyShowAnimations();
            }
        });

        setTimeout(function () {
            showItems.animateTopItems();
        },600);
    }
});










