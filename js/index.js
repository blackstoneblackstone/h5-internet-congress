/**
 * Created by lihongbin on 2017/11/26.
 */
$(function () {
  $('.scene').parallax();
// 加载
  var p1 = {
    show: function () {
      $(".bottom-yun").show();
      $(".top-yun").show();
      this.hide(function () {
        p2.show();
      });
    },
    hide: function (next) {
      TweenMax.to("#loadT", 0.3, {
        opacity: 0,
        onComplete: function () {
          $("#loadT").remove();
        }
      });
      TweenMax.to("#loadLine", 0.6, {
        zoom: 0,
        opacity: 0,
        onComplete: function () {
          $("#loadLine").remove();
        }
      });
      next();
    }
  };
  var p2 = {
    show: function () {
      $(".p2").fadeIn();
      touch.on('#p2S', 'tap', function (ev) {
        p2.hide(function () {
          p3.show();
        })
      });
    },
    hide: function (next) {
      $(".p2 > img").each(function (e) {
        const c = $(this);
        const cs = c[0].classList;
        for (var i = 0; i < cs.length; i++) {
          if (cs[i] == "magictime" || cs[i] == "animated") {
            if (!cs.contains("logo")) {
              var css = cs[i + 1];
              c.removeClass(css);
              c.addClass("an-reserve");
              setTimeout(function () {
                c.addClass(css);
              }, 100)
              setTimeout(function () {
                c.addClass("hidden");
                $("#p1in").addClass("no-animation");
              }, 1100)
            } else {
              c.addClass("p3-logo");
            }
          }
        }
      });
      setTimeout(function () {
        next();
      }, 1000);
    }
  };
  var p3 = {
    show: function () {
      $(".p3").fadeIn();
      $("#mid").addClass("p3-mid");
      $(".loading").css("z-index", 10);
      var angle = 0;
      touch.on('#mid', 'touchstart', function (ev) {
        ev.startRotate();
        ev.preventDefault();
      });
      touch.on('#mid', 'rotate', function (ev) {
        var totalAngle = angle + ev.rotation;
        if (ev.fingerStatus === 'end') {
          angle = angle + ev.rotation;
        }
        $("#mid").css('transform', 'scale(0.5) rotate(' + totalAngle + 'deg)');
        if (angle > 10) {
          p3.hide(function () {
            p4.show()
          })
        }
      });
    },
    hide: function (next) {
      $(".p3").fadeOut()
      next()
    }
  };
  var p4 = {
    show: function () {
      $(".p4").fadeIn();
      $("#logo").removeClass("p3-logo")
      var angle = 0;
      touch.on('#mid', 'rotate', function (ev) {
        var totalAngle = angle + ev.rotation;
        if (ev.fingerStatus === 'end') {
          angle = angle + ev.rotation;
        }
        $("#mid").css('transform', 'scale(0.5) rotate(' + totalAngle + 'deg)');
        if (angle > 10) {
          p4.hide(function () {
            p5.show();
          })
        }
      });
    },
    hide: function (next) {
      $(".p4-hide").addClass("fadeOutLeft")
      next()
    }
  };
  var p5 = {
    show: function () {
      $(".p5").fadeIn();
      TweenMax.to("#p4t3", 0.6, {
        top: "70px",
        height: "70px",
        left: "80px"
      });
      var angle = 0;
      touch.on('#mid', 'rotate', function (ev) {
        var totalAngle = angle + ev.rotation;
        if (ev.fingerStatus === 'end') {
          angle = angle + ev.rotation;
        }
        $("#mid").css('transform', 'scale(0.5) rotate(' + totalAngle + 'deg)');
        if (angle > 10) {
          p4.hide(function () {
            p5.show()
          })
        }
      });
    },
    hide: function (next) {
      $(".p5").fadeOut()
      next()
    }
  };


  var imgs = document.getElementsByClassName("img");
  var count = 0;
  for (var i = 0; i < imgs.length; i++) {
    var img = new Image();
    img.src = imgs[i].dataset.src;
    img.onerror = img.onload = function () {
      count++;
      $("#loadText").text(Math.ceil((count / imgs.length) * 100) + "%");
      if (count == imgs.length) {
        onComplete();
      }
    }
  }
  function onComplete() {
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = imgs[i].dataset.src;
    }
    setTimeout(function () {
      p1.show();
    }, 500);
  }
})