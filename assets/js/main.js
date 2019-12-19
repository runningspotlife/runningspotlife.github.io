$(document).ready(function () {
    //Инициализируем счетчик даты
    initTimer();

    $('.kmacb-btn').click(function () {
        showPopup();
    });

    $(".ever-popup__close").click(function () {
        $('.ever-popup').fadeOut(300);
    });

    $(document).mouseup(function (e){
        var div = $(".ever-popup__inner");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.ever-popup').fadeOut(300);
        }
    });

    var flag = true;

    $(window).mouseout(function(e){
        if(e.pageY - $(window).scrollTop() < 1 && flag == true){
            showPopup();
            flag = false;
        }
    })

    window.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            $('.ever-popup').fadeOut(300);
        }
    });
});



function showPopup() {
    $('.ever-popup').fadeIn(300);
    var margin_left = $('.ever-popup__inner').outerWidth() / -2 ;
    var margin_top = $('.ever-popup__inner').outerHeight() / -2 ;
    $('.ever-popup__inner').css({"margin-left":margin_left,"margin-top":margin_top})
}

function initTimer() {

    var h = document.querySelector('.hours'),
        m = document.querySelector('.minutes'),
        s = document.querySelector('.seconds');

    if (h && m && s) {
        initializeTimer();
    }
}

function initializeTimer() {

    if (!localStorage.getItem("time")) {
        var time = {hours: 0, minutes: 30, seconds: 0}, different = false;

        time = time.hours * 3600 + time.minutes * 60 + time.seconds;
        localStorage.setItem("time", time);
        localStorage.setItem("different", different);
    }

    timerSettings();
}

function timerSettings() {
    var time = localStorage.getItem('time'),
        different = localStorage.getItem('different') === "true",
        hours = parseInt(time / 3600, 10),
        minutes = parseInt((time - hours * 3600 ) / 60, 10),
        seconds = parseInt(time % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    //Уменьшаем время на 1 секунду
    time = time - 1;
    localStorage.setItem("time", time);


    if (time < 0) {
        localStorage.removeItem("time");
        initializeTimer();
        return 0;
    }


    if (different) {
        var hoursHTML = document.getElementsByClassName("hours");
        var minutesHTML = document.getElementsByClassName("minutes");
        var secondsHTML = document.getElementsByClassName("seconds");

        seconds = seconds.split("");
        minutes = minutes.split("");
        hours = hours.split("");

        doubleFilling(hoursHTML, hours);
        doubleFilling(minutesHTML, minutes);
        doubleFilling(secondsHTML, seconds);

    } else {
        $('.hours').html(hours);
        $('.minutes').html(minutes);
        $('.seconds').html(seconds);
    }


    setTimeout(timerSettings, 1000);
}

function doubleFilling(obj, value) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].innerHTML = value[i % 2];
    }
}