$(document).ready(function () {

    function myPlayer(element) {
        this.video = element.find("video")[0];
        this.videoEvent = element.find("video");
        this.currentTimeBlock = element.find(".current_time");
        this.remainingTimeBlock = element.find(".remaining_time");
        this.controls = element.find(".video_controls");
        this.vol = element.find(".vol");
        this.timelines = element.find(".timelines");
        this.topTimeline = element.find(".top_timeline");
        this.bottomTimeline = element.find(".bottom_timeline");
        this.videoStartBtn = element.find(".video_start");
        this.timeLength = function () {return element.find(".timelines").width();};
        this.timeLeftMargin = function () {return element.find(".timelines").offset().left;};
        this.check = {timeline:false, move:false, modalOpened:false, mouseTimer:0, sound: 1,playBtn:1, full:1};
        this.modalTop = 0;
        this.modalLeft = 0;
        this.modalRight = 0;
        this.modalBot = 0;
        this.currentVol = 0;

        this.videoStartBtnHover = function () {
            $(".video_start_icon").stop().animate({
                bottom:15 + "px",
                opacity:0
            },200);
            $(".video_start p").stop().animate({
                opacity:1,
                top:-50 + "px"
            },200);
        };

        this.videoStartBtnUnhover = function () {
            $(".video_start p").stop().animate({
                opacity:0,
                top:35 + "px"
            },200);
            $(".video_start_icon").stop().animate({
                bottom:-35 + "px",
                opacity:1
            },200);
        };

        this.showVideoModal = function (e) {
            if(e.target.closest(".video_start")) {
                this.check.modalOpened = true;
                this.modalTop = e.clientY / $(window).height() * 100;
                this.modalLeft = e.clientX / $(window).width() * 100;
                this.modalRight = 100 - this.modalLeft;
                this.modalBot = 99 - this.modalTop;
                $(".video_start").css({"transform":"translate(-50%,-50%) scale(0)"});
                $(".video_modal").css({"left":this.modalLeft + "%","right":this.modalRight + "%","top":this.modalTop + "%", "bottom":this.modalBot + "%"});
                $(".video_modal").css({"z-index":"100"});
                $(".video_modal").animate({
                    left:0,
                    right:0,
                    opacity:1
                },300);
                setTimeout(function () {
                    $(".video_modal").animate({
                        top:0,
                        bottom:0
                    },500);
                },300);
                setTimeout(function () {
                    $(".hide_all").animate({
                        opacity:0
                    },500);
                    $("body").css({"overflow":"hidden"})
                },800);
                setTimeout(function () {
                    $(".hide_all").css({"z-index":"-100"})
                    videoPlayer.video.play();
                },1300)
            }
        };

        this.hideVideoModal = function (e) {
            if(e.target.closest(".close_modal") || e.target.closest(".hide_all")) {
                this.check.modalOpened = false;
                this.video.pause();
                $(".hide_all").css({"z-index":"100"})
                $(".hide_all").animate({
                    opacity:1
                },300);
                setTimeout(function () {
                    $(".video_modal").animate({
                        left:49.8 + "%",
                        right:49.8 + "%"
                    },500);
                    $("body").css({"overflow":"auto"});
                },300);
                setTimeout(function () {
                    $(".video_modal").animate({
                        top:videoPlayer.modalTop + 1 + "%",
                        bottom:videoPlayer.modalBot + "%"
                    },200);
                    $(".video_start").css({"transform":"translate(-50%,-50%) scale(1)"});
                },800);
                console.log(videoPlayer.modalTop + videoPlayer.modalBot)
            }
        };

        this.playPause = function (e) {
            if(e.target.closest("video") || e.target.closest(".play-pause")) {
                if(this.video.paused) {
                    this.video.play();
                } else {
                    this.video.pause();
                }
            }
        };

        this.spacePlayPause = function (e) {
            if(this.check.modalOpened) {
                if(e.which === 32) {
                    if(this.video.paused) {
                        this.video.play();
                    } else {
                        this.video.pause();
                    }
                }
            }
        };

        this.onPlay = function () {
            $("#pp_block1").css({"transform":"translateX(50%) scale(0)"});
            setTimeout(function () {
                $("#pp_block2").css({"transform":"translateX(-50%) scale(1)"});
            },100);
            this.check.playBtn = 2;
        };

        this.onPause = function () {
            $("#pp_block2").css({"transform":"translateX(-50%) scale(0)"});
            setTimeout(function () {
                $("#pp_block1").css({"transform":"translateX(50%) scale(1)"});
            },100);
            this.check.playBtn = 1;
        };

        this.innerTime = function () {
            var currentTime = parseInt(this.video.currentTime);
            var remainingTime = parseInt(this.video.duration - currentTime);

            if(currentTime > 59) {
                var minute = parseInt(currentTime / 60);
                var seconds = currentTime - 60 * minute;
                if(seconds < 10 && minute < 10) {
                    this.currentTimeBlock[0].innerHTML = "0" + minute + ":0" + seconds;
                } else if(seconds > 9 && minute > 9) {
                    this.currentTimeBlock[0].innerHTML = "" + minute + ":" + seconds;
                } else if (seconds < 10 && minute > 9) {
                    this.currentTimeBlock[0].innerHTML = "" + minute + ":0" + seconds;
                } else if (seconds > 9 && minute < 10) {
                    this.currentTimeBlock[0].innerHTML = "0" + minute + ":" + seconds;
                }
            } else {
                if (currentTime < 10) {
                    this.currentTimeBlock[0].innerHTML = "00:0" + currentTime;
                } else {
                    this.currentTimeBlock[0].innerHTML = "00:" + currentTime;
                }
            }

            if(remainingTime > 59) {
                var minute = parseInt(remainingTime / 60);
                var secs = remainingTime - 60 * minute;
                if(minute < 10 && secs < 10) {
                    this.remainingTimeBlock[0].innerHTML = "-0" + minute + ":0" + secs;
                } else if (minute > 9 && secs > 9) {
                    this.remainingTimeBlock[0].innerHTML = "-" + minute + ":" + secs;
                } else if (minute < 10 && secs > 9) {
                    this.remainingTimeBlock[0].innerHTML = "-0" + minute + ":" + secs;
                } else if (minute > 9 && secs < 10) {
                    this.remainingTimeBlock[0].innerHTML = "-" + minute + ":0" + secs;
                }
            } else {
                if(remainingTime < 10) {
                    this.remainingTimeBlock[0].innerHTML = "-00:0"  + remainingTime;
                } else {
                    this.remainingTimeBlock[0].innerHTML = "-00:"  + remainingTime;
                }
            }
        };

        this.hideControls = function (e) {
            if(!e.target.closest(".video_controls") && !this.video.paused) {
                this.controls.css({"opacity":"0"});
                $(".close_modal").css({"opacity":"0"});
                $("body").css({"cursor":"none"});
            }
        };

        this.showControls = function (e) {
            if($(".video_modal").length) {
                this.controls.css({"opacity":"1"});
                $(".close_modal").css({"opacity":".3"});
                $("body").css({"cursor":"default"});
            }
        };

        this.controlsVisibility = function (e) {
            if($(".video_modal").length) {
                clearTimeout(this.check.mouseTimer);
                this.check.mouseTimer = setTimeout(function () {
                    videoPlayer.hideControls(e);
                },2500);
            }
        };

        this.volumeHover = function (e) {
            var index = $(e.target).index();
            if(index == 0) {
                $(videoPlayer.vol[1]).css({"height":"13px"});
            } else if (index == this.vol.length - 1) {
                $(videoPlayer.vol[index - 1]).css({"height":"13px"});
            } else {
                $(videoPlayer.vol[index + 1]).css({"height":"13px"});
                $(videoPlayer.vol[index - 1]).css({"height":"13px"});
            }
        };

        this.vulumeUnhover = function () {
            videoPlayer.vol.css({"height":"5px"});
        };

        this.setVolume = function () {
            var volIndex = this.video.volume * 20;
            for (volIndex; volIndex <= videoPlayer.vol.length; volIndex++) {
                $(videoPlayer.vol[volIndex]).css({"background":"#505050"});
            }
        };

        this.volumeRegulate = function (e) {
            if(e.target.closest(".vol")) {
                var index = $(e.target).index();
                var index2 = $(e.target).index();
                var timer = 100;
                this.video.volume = index / 20;
                for (index; index >= 0; index--) {
                    $(videoPlayer.vol[index]).css({"background":"#fff"});
                }
                for(index2; index2 <= videoPlayer.vol.length; index2++) {
                    $(videoPlayer.vol[index2 + 1]).css({"background":"#505050"});
                }
                $(".vol-btn")[0].innerHTML = "<i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i>"
            }
        };

        this.volumeToggle = function (e) {
            if(e.target.closest(".vol-btn") && this.check.sound == 1) {
                this.currentVol = this.video.volume;
                this.video.volume = 0;
                $(".vol-btn")[0].innerHTML = "<i class=\"fa fa-volume-off\" aria-hidden=\"true\"></i>"
                for (var i = 0; i < $(".vol").length; i++) {
                    $(videoPlayer.vol[i]).css({"background":"#505050"});
                }
                this.check.sound = 2;
            } else if (e.target.closest(".vol-btn") && this.check.sound !== 1) {
                this.video.volume = this.currentVol;
                $(".vol-btn")[0].innerHTML = "<i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i>"
                for (var i = 0; i < this.video.volume * 20; i++) {
                    $(videoPlayer.vol[i]).css({"background":"#fff"});
                }
                this.check.sound = 1;
            }
        };

        this.timelineChange = function () {
                if(!this.video.paused) {
                    var currentTimeToPercent = this.video.currentTime / this.video.duration * 100;
                    this.topTimeline.width(this.timeLength() / 100 * currentTimeToPercent);
                    this.bottomTimeline.width(this.timeLength() / 100 * (100 - currentTimeToPercent));
                }
        };

        this.timeControl = function (e) {
            if(e.target.closest(".timelines")) {
                $(".big_play-pause").css({"color":"transparent"});
                this.video.pause();
                this.topTimeline.width(e.clientX - this.timeLeftMargin());
                this.bottomTimeline.width(this.timeLength() - (e.clientX - this.timeLeftMargin()));
                setTimeout(function ()   {
                    var topTimelinePercent = videoPlayer.topTimeline.width() / videoPlayer.timeLength() * 100;
                    videoPlayer.video.currentTime = videoPlayer.video.duration / 100 * topTimelinePercent;
                    videoPlayer.video.play();
                },270);
            }
        };

        this.fullScreen = function (e) {
            if(e.target.closest(".full_screen") && this.check.full == 1) {
                $(".full_screen")[0].innerHTML = '<i class="fa fa-compress" aria-hidden="true"></i>';
                $(".video_container").css({"height":"100%","width":"100%"});
                this.check.full = 2;
            } else if (e.target.closest(".full_screen") && this.check.full !== 1) {
                $(".full_screen")[0].innerHTML = '<i class="fa fa-expand" aria-hidden="true"></i>';
                $(".video_container").css({"width":"80%","height":"70%"});
                this.check.full = 1;
            }
        };

        this.undermouseTime = function (e) {
            if(e.target.closest(".video_controls")) {
                var rightMaxPos = $(".remaining_time").width() + $(".mouse_time").width() / 2;
                var leftMaxPos = $(".current_time").width() + $(".mouse_time").width() / 2;
                $(".mouse_time").css({"left":e.clientX - this.timeLeftMargin()})
                if(parseInt($(".mouse_time").css("left")) > this.timeLength() - rightMaxPos - 5) {
                    $(".mouse_time").css({"left":this.timeLength() - rightMaxPos - 5})
                } else if (parseInt($(".mouse_time").css("left")) + this.timeLeftMargin() < this.timeLeftMargin() + leftMaxPos + 5) {
                    $(".mouse_time").css({"left":leftMaxPos + 5})
                }
            }
        };

        this.innerUndermouseTime = function (e) {
            if(e.target.closest(".time")) {
                var percent = (e.clientX - this.timeLeftMargin()) / this.timeLength() * 100;
                var time = parseInt(this.video.duration / 100 * percent);
                if(time > 59) {
                    var minute = parseInt(time / 60);
                    var seconds = time - 60 * minute;
                    if(seconds < 10 && minute < 10) {
                        $(".mouse_time")[0].innerHTML = "0" + minute + ":0" + seconds;
                    } else if(seconds > 9 && minute > 9) {
                        $(".mouse_time")[0].innerHTML = "" + minute + ":" + seconds;
                    } else if (seconds < 10 && minute > 9) {
                        $(".mouse_time")[0].innerHTML = "" + minute + ":0" + seconds;
                    } else if (seconds > 9 && minute < 10) {
                        $(".mouse_time")[0].innerHTML = "0" + minute + ":" + seconds;
                    }
                } else {
                    if (time < 10) {
                        $(".mouse_time")[0].innerHTML = "00:0" + time;
                    } else {
                        $(".mouse_time")[0].innerHTML = "00:" + time;
                    }
                }
            }
        };
    };

    var videoPlayer = new myPlayer($(".video_container"));
    videoPlayer.video.volume = 0.6;
    videoPlayer.setVolume();
    videoPlayer.innerTime();

    $(document).on({
        click:function (e) {
            videoPlayer.showVideoModal(e);
            videoPlayer.playPause(e);
            videoPlayer.volumeRegulate(e);
            videoPlayer.volumeToggle(e);
            videoPlayer.showControls(e);
            videoPlayer.timeControl(e);
            videoPlayer.fullScreen(e);
            videoPlayer.hideVideoModal(e);
        },
        mousemove:function (e) {
            videoPlayer.showControls(e);
            videoPlayer.controlsVisibility(e);
            videoPlayer.undermouseTime(e);
            videoPlayer.innerUndermouseTime(e);
        },
        keydown:function (e) {
            videoPlayer.spacePlayPause(e);
        }
    });

    videoPlayer.videoEvent.on({
        timeupdate:function () {
            videoPlayer.innerTime();
            videoPlayer.timelineChange()
        },
        play:function () {
            videoPlayer.onPlay();
        },
        pause:function () {
            videoPlayer.onPause();
        }
    });

    videoPlayer.vol.hover(function (e) {
        videoPlayer.volumeHover(e);
    },function () {
        videoPlayer.vulumeUnhover();
    });

    videoPlayer.videoStartBtn.hover(function () {
        videoPlayer.videoStartBtnHover();
    },function () {
        videoPlayer.videoStartBtnUnhover();
    });


});