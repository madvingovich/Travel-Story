
$(document).ready(function () {
    function videoControls(controls) {
        this.video = $("video")[0];
        this.videoEvent = $("video");
        this.playBtn = $(".playBtn");
        this.volume = $(".volume");
        this.timer = $(".timer")[0];
        this.timeLength = $(".timeline").width();
        this.leftMargin = $(".timeline").offset().left;
        this.check = {move:false,click:1,sound:0};

        this.timeBtnPosition = function (e) {
            var timeBtnPosition = parseInt($(".time_btn").css("left"));
            var result = +((timeBtnPosition)/this.timeLength * 100).toFixed(2);
            return result;
        };

        this.percentFromTime = function (e) {
            if (this.check.move) {
                var time = +(this.video.duration / 100 * this.timeBtnPosition()).toFixed(2);
                this.video.currentTime = time;
                console.log(this.video.currentTime);
                // this.videoEvent.currentTime = 15;
            }
        };

        this.timeBtnChange = function () {
            var currentTimeToPercent = +(this.video.currentTime / this.video.duration * 100);
            var btnLeft = +(this.timeLength / 100 * currentTimeToPercent);
            $(".time_btn").css({"left":btnLeft});
            // console.log(this.video.currentTime)
        };

        this.timeMarker = function (e) {
            $(".time_marker").width($(".time_btn").css("left"));
        };

        this.playPause = function (e) {
            if(e.target.closest("video") || e.target.closest(".playBtn")) {
                if(this.video.paused) {
                    this.video.play();
                } else {
                    this.video.pause();
                }
            }
        };

        this.onVideoPlay = function () {
            $(".playBtn")[0].innerHTML = "<i class='fa fa-pause-circle'></i>";
            $(".controls").animate({"opacity":"1"},500);
        };

        this.onVideoPause = function () {
            $(".playBtn")[0].innerHTML = "<i class='fa fa-play-circle'></i>";
            this.playBtnShow();
        };

        this.innerTime = function () {
            var currentTime = parseInt(this.video.currentTime);
            if(currentTime < 10) {
                this.timer.innerHTML = "00:0" + currentTime;
            } else {this.timer.innerHTML = "00:" + currentTime;}
        };

        this.volumeChange = function () {
            var range = this.volume.val();
            this.video.volume = range;
        };

        this.timeMove = function (e) {

            if(this.check.move){
                $(".time_btn").css({"left":e.clientX - this.leftMargin});
                if(e.clientX > this.timeLength + this.leftMargin) {
                    $(".time_btn").css({"left":"100%"});
                };
                if (e.clientX < this.leftMargin) {
                    $(".time_btn").css({"left":"0"});
                };
            };
        };

        this.timePrompt = function (e) {
            if(e.target.closest(".timeline")) {
                $(".time_prompt").css({"left":e.clientX - this.leftMargin});
            };
        };

        this.mouseActive = function (e) {
            if(e.target.closest(".time_btn") || e.target.closest(".timeline")) {
                this.check.move = true;
            };
            if(e.target.closest(".timeline")) {
                // console.log(e.clientX - this.leftMargin)
                $(".time_btn").css({"left":e.clientX - this.leftMargin});
            };
        };

        this.onHover = function (e) {
            if(!this.video.paused || this.video.currentTime !== 0) {
                $(".controls").animate({"opacity":"1"},300);
            };
        };

        this.onUnhover = function (e) {
            $(".controls").animate({"opacity":"0"},300);
        };

        this.playBtnHide = function () {
            $(".playBtn").css({"opacity":"0"});
        };

        this.playBtnShow = function () {
            $(".playBtn").css({"opacity":"1"});
        };

        this.timePromptShow = function (e) {
            if(e.target.closest(".timeline")) {
                $(".time_prompt").css({"display":"inline-block"});
            };
        };

        this.timePromptHide = function (e) {
            if(e.target.closest(".timeline")) {
                $(".time_prompt").css({"display": "none"});
            };
        };

        this.getUndermouseTime = function (e) {
            if(e.target.closest(".timeline")) {
                var mouse = (e.clientX - this.leftMargin )/ this.timeLength * 100;
                var mouseTimePercent = parseInt(this.video.duration / 100 * mouse);
                if(mouseTimePercent < 10) {
                    $(".prompt_timer")[0].innerHTML = "00:0" + mouseTimePercent;
                } else {$(".prompt_timer")[0].innerHTML = "00:" + mouseTimePercent;}
            };
        };

        this.muteClick = function (e) {
            if(e.target.closest(".volume_btn")) {
                if(this.check.click == 1) {
                    $(".volume_btn")[0].innerHTML = "<i class='fa fa-volume-off'></i>"
                    console.log();
                    this.check.sound = this.video.volume;
                    this.video.volume = 0;
                    this.volume.val(0);
                    $(".volume_btn").css({"padding-right":"11px"})
                    this.check.click = 2;
                } else {
                    $(".volume_btn")[0].innerHTML = "<i class='fa fa-volume-up'></i>";
                    this.video.volume = this.check.sound;
                    this.volume.val(this.check.sound)
                    $(".volume_btn").css({"padding-right":"0"})
                    this.check.click = 1;
                }
            }
        }
    };

    videoControls = new videoControls($(".controls"));

    $(document).on({
        click:function (e) {
            videoControls.playPause(e);
            videoControls.muteClick(e);
        },
        mousedown:function (e) {
            videoControls.mouseActive(e);
            videoControls.percentFromTime(e);
            videoControls.timeMarker(e);
        },
        mouseup:function (e) {
            videoControls.check.move = false;
        },
        mousemove:function (e) {
            videoControls.timeMove(e);
            videoControls.percentFromTime(e);
            videoControls.timeMarker(e);
            videoControls.innerTime();
            videoControls.timePrompt(e);
            videoControls.getUndermouseTime(e);
        }
    });

    videoControls.videoEvent.on({
        timeupdate:function () {
            videoControls.innerTime();
            videoControls.timeBtnChange();
            videoControls.timeMarker();
            videoControls.playBtnHide();
        },
        play:function () {
            videoControls.onVideoPlay();
        },
        pause:function () {
            videoControls.onVideoPause();
        }
    });

    $(".video").hover(function () {
        videoControls.onHover();
    },function () {
        videoControls.onUnhover();
    });

    $(".timeline").hover(function (e) {
        videoControls.timePromptShow(e);
    },function (e) {
        videoControls.timePromptHide(e);
    });

    videoControls.volume.on("input",function () {
        videoControls.volumeChange();
    });

    videoControls.video.volume = videoControls.volume.val();
});