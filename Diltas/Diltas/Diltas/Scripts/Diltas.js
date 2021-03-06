﻿
$(document).ready(function () {
    pageManager.init();
    menuOpenManager.init();
    leftExtendedMenu.init();

    haberPopupManager.init();
    dpManager.init();

    pageGlidTransManager.init();

    vListManager.init();

    pageScrollTransManager.init();
    diagonalSlider.init();

    menuVertAlignManager.init();

    gazPageTransaction.init();
});

var menuVertAlignManager = {
    rMenu: '.js-right-menu',
    $rMenu: '',
    menuMinHeight: '635px',
    init: function () {
        menuVertAlignManager.$rMenu = $(menuVertAlignManager.rMenu);
        menuVertAlignManager.setYPosition();
    },
    setYPosition: function () {
        if (!pageManager.isMobileMode) {
            if (parseInt($(window).height()) > parseInt(menuVertAlignManager.menuMinHeight)) {
                var delta = parseInt($(window).height()) - parseInt(menuVertAlignManager.menuMinHeight);
                delta = delta / 2;
                menuVertAlignManager.$rMenu.css('margin-top', delta + 'px');
            }
        }
    }
}

var diagonalSlider = {
    slidesWrp: '.js-d-slides',
    $slidesWrp: '',
    $activeSlide: '',
    $lineWrp: '',
    $uplBtn: '',
    folderWithPdfFiles: 'Files/',
    beforePrev: 'before-prev-slide',
    prev: 'prev-slide',
    active: 'active-slide',
    next: 'next-slide',
    afterNext: 'after-next-slide',
    beforePrevCss: '{"top": "54px", "right": "25px", "width": "45px", "height": "32px"}',
    prevCss: '{ "top": "96px",  "right": "41px", "width": "78px", "height": "59px"}',
    activeCss: '{ "top": "166px","right": "73px", "width": "101px",  "height": "66px"}',
    nextCss: '{ "top": "247px", "right": "125px", "width": "78px", "height": "59px"}',
    afterNextCss: '{ "top": "318px",  "right": "178px", "width": "45px", "height": "32px"}',
    slideType1: 'slide-1-type.png',
    slideType1Active: 'slide-1-type-blue.png',
    slideType2: 'slide-2-type.png',
    slideType2Active: 'slide-2-type-blue.png',
    slideType3: 'slide-3-type.png',
    slideType3Active: 'slide-3-type-blue.png',
    duration: 500,
    durationPart: 200,
    durLineSlow: 50,
    durLineFast: 25,
    isActive: false,
    init: function () {
        diagonalSlider.$slidesWrp = $(diagonalSlider.slidesWrp);
        if (diagonalSlider.$slidesWrp.length != 0) {
            diagonalSlider.$lineWrp = $('.js-line');
            diagonalSlider.$uplBtn = $('.js-pdf-down-wrp');
            diagonalSlider.refreshActive(diagonalSlider.$slidesWrp.children('div[data-state="' + diagonalSlider.active + '"]'));

            diagonalSlider.lazyLoadBgs();
            diagonalSlider.setStartStyle();


            diagonalSlider.$slidesWrp.children('div').bind('click', function () {
                if (!diagonalSlider.isActive) {
                    diagonalSlider.isActive = true;
                    switch ($(this).data('state')) {
                        case diagonalSlider.beforePrev:
                        case diagonalSlider.prev: {
                            diagonalSlider.moveDown($(this));
                        } break;
                        case diagonalSlider.next:
                        case diagonalSlider.afterNext: {
                            diagonalSlider.moveUp($(this))
                        }
                            break;
                        case diagonalSlider.active:{
                            diagonalSlider.isActive = false;
                        }break
                    }
                }
            });
            diagonalSlider.drawLine(diagonalSlider.durLineSlow);
            $(window).resize(function () {
                diagonalSlider.drawLine(diagonalSlider.durLineFast);
            })
        }
    },
    lazyLoadBgs: function () {
        $('body').append('<div class="hidden"> <img src="Content/Images/slide-3-type-blue.png"/>' +
            '<img src="Content/Images/slide-3-type.png" d />' +
             '<img src="Content/Images/slide-2-type-blue.png" />' +
              '<img src="Content/Images/slide-2-type.png" />' +
             '<img src="Content/Images/slide-1-type-blue.png" />' +
              '<img src="Content/Images/slide-1-type.png" />')
    },
    setStartStyle: function () {
        diagonalSlider.$slidesWrp.children('div[data-state="' + diagonalSlider.beforePrev + '"]').css({ "top": "54px", "right": "25px", "width": "45px", "height": "32px" });
        diagonalSlider.$slidesWrp.children('div[data-state="' + diagonalSlider.prev + '"]').css({ "top": "96px", "right": "41px", "width": "78px", "height": "59px" });
        diagonalSlider.$slidesWrp.children('div[data-state="' + diagonalSlider.active + '"]').css({ "top": "166px", "right": "73px", "width": "101px", "height": "76px" });
        diagonalSlider.$slidesWrp.children('div[data-state="' + diagonalSlider.next + '"]').css({ "top": "247px", "right": "125px", "width": "78px", "height": "59px" });
        diagonalSlider.$slidesWrp.children('div[data-state="' + diagonalSlider.afterNext + '"]').css({ "top": "318px", "right": "178px", "width": "45px", "height": "32px" });
    },
    drawLine: function (boxCenterYOffset) {
        var boxCenterXOffset = 50;
        var x1 = diagonalSlider.$uplBtn.offset().left + boxCenterXOffset;
        var x2 = $(".active-slide").offset().left + boxCenterXOffset;
        var y1 = diagonalSlider.$uplBtn.offset().top + boxCenterYOffset;
        var y2 = $(".active-slide").offset().top + boxCenterYOffset;

        var hypotenuse = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        if (angle >= 90 && angle < 180) {
            y1 = y1 - (y1 - y2);
        }
        if (angle > 0 && angle < 90) {
            x1 = x1 - (x1 - x2);
            y1 = y1 - (y1 - y2);
        }
        if (angle <= 0 && angle > -90) {
            x1 = x1 - (x1 - x2);
        }

        diagonalSlider.$lineWrp.children("#line").queue(function () {
            $(this).offset({ top: y1, left: x1 });
            $(this).dequeue();
        }).queue(function () {
            $(this).width(hypotenuse);
            $(this).dequeue();
        }).queue(function () {
            $(this).rotate(angle);
            $(this).dequeue();
        });

    },
    animateLine: function () {
        var isFinished = false;
        diagonalSlider.$lineWrp.children('#line').animate({ 'opacity': 0 }, diagonalSlider.durationPart);
        setTimeout(function () {
            var lineDrInterval = setInterval(function () {
                if (isFinished) {
                    clearInterval(lineDrInterval);
                }
                else {
                    diagonalSlider.drawLine(diagonalSlider.durLineFast);
                }
            }, 1);
        }, diagonalSlider.duration / 2);

        setTimeout(function () {
            isFinished = true;
            diagonalSlider.$lineWrp.children('#line').animate({ 'opacity': 1 }, diagonalSlider.durationPart);
        }, diagonalSlider.duration)
    },
    moveDown: function ($clickedSlide) {
        diagonalSlider.refreshActive($clickedSlide);

        diagonalSlider.animateLine();

        if ($clickedSlide.prev().length != 0 && $clickedSlide.prev().prev().length != 0) {
            var $newBeforePrev = $clickedSlide.prev().prev();
            $newBeforePrev.animate({ "top": "54px", "right": "25px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newBeforePrev.attr('data-state', diagonalSlider.beforePrev);
            $newBeforePrev.find('span').animate({ 'font-size': '8px', 'line-height': '32px' }, diagonalSlider.duration);
        }
        if ($clickedSlide.prev().length != 0) {
            var $newPrev = $clickedSlide.prev();
            $newPrev.animate({ "top": "96px", "right": "41px", "width": "78px", "height": "59px" }, diagonalSlider.duration);
            $newPrev.attr('data-state', diagonalSlider.prev);
            $newPrev.find('span').animate({ 'font-size': '11.62px', 'line-height': '59px' }, diagonalSlider.duration);
        }

        // $newActive
        $clickedSlide.animate({ "top": "166px", "right": "73px", "width": "101px", "height": "76px" }, diagonalSlider.duration);
        $clickedSlide.attr('data-state', diagonalSlider.active);
        $clickedSlide.find('span').animate({ 'font-size': '16px', 'line-height': '72px' }, diagonalSlider.duration, function () {
            diagonalSlider.isActive = false;
        });

        var $newNext = $clickedSlide.next();
        $newNext.animate({ "top": "247px", "right": "125px", "width": "78px", "height": "59px" }, diagonalSlider.duration);
        $newNext.attr('data-state', diagonalSlider.next);
        $newNext.find('span').animate({ 'font-size': '11.62px', 'line-height': '59px' }, diagonalSlider.duration);

        if ($newNext.next().length != 0) {
            var $newAfterNext = $newNext.next();
            $newAfterNext.animate({ "top": "318px", "right": "178px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newAfterNext.attr('data-state', diagonalSlider.afterNext);
            $newAfterNext.find('span').animate({ 'font-size': '8px', 'line-height': '32px' }, diagonalSlider.duration);
        }
        if ($newNext.next().length != 0 && $newNext.next().next().length != 0) {
            var $newOutAfterNext = $newNext.next().next();
            $newOutAfterNext.animate({ "top": "450px", "right": "272px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newOutAfterNext.find('span').animate({ 'font-size': '8px', 'line-height': '32px' }, diagonalSlider.duration);
            $newOutAfterNext.attr('data-state', '');
        }
        if ($newNext.next().length != 0 && $newNext.next().next().length != 0 && $newNext.next().next().next().length != 0) {
            var $newOutAfterNext = $newNext.next().next().next();
            $newOutAfterNext.animate({ "top": "450px", "right": "272px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newOutAfterNext.find('span').animate({ 'font-size': '8px', 'line-height': '32px' }, diagonalSlider.duration);
            $newOutAfterNext.attr('data-state', '');
        }
    },
    moveUp: function ($clickedSlide) {
        diagonalSlider.refreshActive($clickedSlide);

        diagonalSlider.animateLine();
        //new after next
        if ($clickedSlide.next().length != 0 && $clickedSlide.next().next().length != 0) {
            var $newAfterNext = $clickedSlide.next().next();
            $newAfterNext.animate({ "top": "318px", "right": "178px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newAfterNext.attr('data-state', diagonalSlider.afterNext);
            $newAfterNext.find('span').animate({ 'font-size': '8px', 'line-height': '32px' }, diagonalSlider.duration);
        }
        //new next
        if ($clickedSlide.next().length != 0) {
            var $newNext = $clickedSlide.next();
            $newNext.animate({ "top": "247px", "right": "125px", "width": "78px", "height": "59px" }, diagonalSlider.duration);
            $newNext.attr('data-state', diagonalSlider.next);
            $newNext.find('span').animate({ 'font-size': '11.62px', 'line-height': '59px' }, diagonalSlider.duration);
        }
        //new active
        $clickedSlide.animate({ "top": "166px", "right": "73px", "width": "101px", "height": "76px" }, diagonalSlider.duration);
        $clickedSlide.attr('data-state', diagonalSlider.active);
        $clickedSlide.find('span').animate({ 'font-size': '16px', 'line-height': '72px' }, diagonalSlider.duration, function () {
            diagonalSlider.isActive = false;
        });

        // $newPrev
        $clickedSlide.prev().animate({ "top": "96px", "right": "41px", "width": "78px", "height": "59px" }, diagonalSlider.duration);
        $clickedSlide.prev().attr('data-state', diagonalSlider.prev);
        $clickedSlide.prev().find('span').animate({ 'font-size': '11.62px', 'line-height': '59px' }, diagonalSlider.duration);

        // $new before Prev
        if ($clickedSlide.prev().prev().length != 0) {
            var $newBeforePrev = $clickedSlide.prev().prev();
            $newBeforePrev.animate({ "top": "54px", "right": "25px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newBeforePrev.attr('data-state', diagonalSlider.beforePrev);
            $newBeforePrev.find('span').animate({ 'font-size': '8px', 'line-height': '32px' }, diagonalSlider.duration);
        }
        // $new out before Prev
        if ($clickedSlide.prev().prev().length != 0 && $clickedSlide.prev().prev().prev().length != 0) {
            var $newOutBefore = $clickedSlide.prev().prev().prev();
            $newOutBefore.animate({ "top": "-45px", "right": "-40px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newOutBefore.attr('data-state', '');
        }
        // $new out before Prev
        if ($clickedSlide.prev().prev().length != 0 && $clickedSlide.prev().prev().prev().length != 0 && $clickedSlide.prev().prev().prev().prev().length != 0) {
            var $newOutBefore = $clickedSlide.prev().prev().prev().prev();
            $newOutBefore.animate({ "top": "-45px", "right": "-40px", "width": "45px", "height": "32px" }, diagonalSlider.duration);
            $newOutBefore.attr('data-state', '');
        }
    },
    refreshActive: function ($clickedSlide) {
        if (diagonalSlider.$activeSlide.length != 0) {
            diagonalSlider.unmarkActive(diagonalSlider.$activeSlide);
        }
        diagonalSlider.$activeSlide = $clickedSlide;
        diagonalSlider.markActive(diagonalSlider.$activeSlide);
    },
    markActive: function ($newActive) {
        diagonalSlider.$uplBtn.children('a').attr('href', diagonalSlider.folderWithPdfFiles + $newActive.data('pdf'));
        switch ($newActive.attr('data-slide-type')) {
            case '1': {
                $newActive.find('img').attr('src', $newActive.find('img').attr('src').replace(diagonalSlider.slideType1, diagonalSlider.slideType1Active))
            } break;
            case '2': {
                $newActive.find('img').attr('src', $newActive.find('img').attr('src').replace(diagonalSlider.slideType2, diagonalSlider.slideType2Active))
            } break;
            case '3': {
                $newActive.find('img').attr('src', $newActive.find('img').attr('src').replace(diagonalSlider.slideType3, diagonalSlider.slideType3Active))
            } break;
        }
        $newActive.addClass(diagonalSlider.active);
    },
    unmarkActive: function ($currActive) {
        switch ($currActive.attr('data-slide-type')) {
            case '1': {
                $currActive.find('img').attr('src', $currActive.find('img').attr('src').replace(diagonalSlider.slideType1Active, diagonalSlider.slideType1))
            } break;
            case '2': {
                $currActive.find('img').attr('src', $currActive.find('img').attr('src').replace(diagonalSlider.slideType2Active, diagonalSlider.slideType2))
            } break;
            case '3': {
                $currActive.find('img').attr('src', $currActive.find('img').attr('src').replace(diagonalSlider.slideType3Active, diagonalSlider.slideType3))
            } break;
        }
        $currActive.removeClass(diagonalSlider.active);
    }
}

var vListManager = {
    showBtn: '.js-show-v-list-item',
    $showBtn: '',
    listWrp: '.js-v-list',
    $listWrp: '',
    countFirstShow: 4,
    showedItem: 'js-showed-v-item',
    heightOfList: 48,//start height of list
    duration: 500,
    isActive: false,
    init: function () {
        if ($(vListManager.listWrp).length != 0) {
            vListManager.$listWrp = $(vListManager.listWrp);
            vListManager.$showBtn = $(vListManager.showBtn);
            vListManager.showFirstItems(vListManager.$listWrp.children('li').slice(0, vListManager.countFirstShow));


            vListManager.showEvent();
        }
    },
    showFirstItems: function ($elements) {
        $elements.each(function () {
            vListManager.heightOfList += $(this).outerHeight(true);
            $(this).addClass(vListManager.showedItem)
            $(this).children('div').children().css('opacity', 1);
        });
        vListManager.isActive = true;
        vListManager.$listWrp.animate({ height: vListManager.heightOfList + 'px', 'opacity': 1 }, vListManager.duration, function () {
            vListManager.isActive = false;
        });
    },
    showEvent: function () {
        vListManager.$showBtn.bind('click', function () {
            if (!vListManager.isActive) {
                vListManager.isActive = true;
                var $nextItem = vListManager.$listWrp.children('li.' + vListManager.showedItem).last().next();
                if ($nextItem.length != 0) {
                    vListManager.heightOfList += $nextItem.outerHeight(true);
                    $nextItem.addClass(vListManager.showedItem).children('div').children().animate({ 'opacity': 1 }, vListManager.duration);
                    console.log(1);
                    vListManager.$listWrp.animate({ height: vListManager.heightOfList + 'px' }, vListManager.duration);
                    $('html,body').stop().animate({
                        scrollTop: $(document).height()
                    }, 500, function () {
                        vListManager.isActive = false;
                    });
                    if ($nextItem.next().length == 0) {
                        vListManager.$showBtn.unbind('click').css('cursor', 'default').animate({ 'opacity': '0' }, vListManager.duration);
                    }
                }
            }
        });
    }
}

var pageManager = {
    maxMobScreenWidth: 950,
    deskHeight: 700,/*min height for which used vertical alignment*/
    leftMenu: '.js-left-menu',
    $leftMenu: '',
    pageContent: '.js-body-content',
    $pageContent: '',
    isMobileMode: false,
    init: function () {
        pageManager.$leftMenu = $(pageManager.leftMenu);
        pageManager.$pageContent = $(pageManager.pageContent);

        //set current mode: mobile or desktop
        pageManager.isMobileMode = pageManager.getViewportSize().width <= pageManager.maxMobScreenWidth
        $(window).resize(function () {
            pageManager.resetCurrentMode();
        });
    },
    resetCurrentMode: function () {
        if (pageManager.getViewportSize().width <= pageManager.maxMobScreenWidth) {
            if (!pageManager.isMobileMode) {
                if (menuOpenManager.getCurrentLevel() == 2 || menuOpenManager.getCurrentLevel() == 3) {
                    location.reload();
                }
            }
        }
        else {
            if (pageManager.isMobileMode) {
                location.reload();
            }
        }
    },
    getViewportSize: function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    },
    setMarginForPageWithPopup: function () {
        if (pageManager.getViewportSize().width != $('body').width()) {
            var marginLeftInPx = pageManager.getViewportSize().width - $('body').width();
            var marginLeftInParcent = marginLeftInPx * 100 / $('body').width();

            $(pageManager.bodyContWrp).css('margin-left', -marginLeftInParcent + '%');
        }
    },
    resetMarginForPageWithPopup: function () {
        $(pageManager.bodyContWrp).css('margin-left', '0px');
    }

}
/*datepicker manager*/
var dpManager = {
    activeLocale: 'tr', //for English version of site need switch to 'en' 
    currDate: moment(),
    viewedMonthDate: moment(new Date()),
    viewedMonth: moment().format('M'),
    viewedYear: moment().format('YYYY'),
    pMonthShift: -1,
    cMonthShift: 0,
    nMonthShift: 1,
    dpWrpClass: '.js-dp-popup-body',
    titlerWrp: 'js-month-title',
    $titlerWrp: '',
    daysWrp: 'js-days-wrp',
    $daysWrp: '',
    $dp: '',
    prevBtnClass: 'js-prev-month',
    $prevBtn: '',
    nextBtnClass: 'js-next-month',
    $nextBtn: '',
    currMonthClass: 'js-curr-m-title',
    $openPopupBtn: '',
    init: function () {
        if ($("#datepickerPopup").length != 0) {

            localeSetting.loadTurkishLocale();
            dpManager.setPageConfiguration();
            dpManager.$dp = $(dpManager.dpWrpClass);


            //extended operation for open/hide event
            $("#datepickerPopup").on("shown.bs.modal", function () {
                $("body").removeClass("modal-open");
                dpManager.viewedMonthDate = moment(new Date());
                dpManager.viewedMonth = dpManager.viewedMonthDate.format('M');
                dpManager.viewedYear = dpManager.viewedMonthDate.format('YYYY');
                dpManager.generateHeaderText();
                dpManager.$daysWrp.html(dpManager.generateDaysView(dpManager.viewedYear, dpManager.viewedMonth));
                dpManager.markToday();
                dpManager.dayClick();
                dpManager.nextPrevMonth();

            }).on("hidden.bs.modal", function () {
                $("body").removeClass("modal-open");

            });

            if (dpManager.$dp.length != 0) {//init dp for first init event
                dpManager.$dp.html(dpManager.generateMonthView(dpManager.viewedYear, dpManager.viewedMonth));
                dpManager.initObjectsAndEvents();
            }
        }
    },
    getDaysInMonth: function (year, month) {
        return new Date(year, month, 0).getDate();
    },
    getMonthName: function (monthDelta) {//1)prev month 'monthDelta'='-1', 2)current month 'monthDelta'='0',2)next month 'monthDelta'='1'  
        var cViewedData = moment(dpManager.viewedMonthDate);
        if (monthDelta != 0) {

            return cViewedData.locale(dpManager.activeLocale).add(monthDelta, 'months').format('MMMM');
        }
        else {
            return cViewedData.locale(dpManager.activeLocale).format('MMMM');
        }
    },
    calculateDayinRow: function (numberOfDay) {
        var maxDayInRow = 10;
        if (numberOfDay == 31) //for months wich have 31 days
        {
            maxDayInRow = 11;
        }
        return maxDayInRow;
    },
    generateMonthView: function (year, month) {
        var htmlOfMonth = '';
        //header of calendar
        htmlOfMonth += '<div class="month-header ">' +
            '<div><button class="' + dpManager.prevBtnClass + '" ><span></span></button></div>' +
            '<div><span class="' + dpManager.currMonthClass + '"></span></div>' +
            '<div><button class="' + dpManager.nextBtnClass + '"><span></span></button></div></div>';
        //body of calendar
        htmlOfMonth += '<div class="days-wrp ' + dpManager.daysWrp + ' clearfix">';//open days block

        htmlOfMonth += dpManager.generateDaysView(year, month);
        htmlOfMonth += '</div>';//close days block
        return htmlOfMonth;
    },
    generateHeaderText: function () {
        dpManager.$prevBtn.find('span').html(dpManager.getMonthName(dpManager.pMonthShift));
        dpManager.$currMonth.html(dpManager.getMonthName(dpManager.cMonthShift) + ' ' + dpManager.viewedYear);
        dpManager.$nextBtn.find('span').html(dpManager.getMonthName(dpManager.nMonthShift));

    },
    generateDaysView: function (year, month) {
        var numberOfDay = parseInt(dpManager.getDaysInMonth(year, month));
        var daysInRow = dpManager.calculateDayinRow(numberOfDay);
        var widthOfDay = 100 / daysInRow;
        var day = 1;
        var htmlOfDays = '';
        var vievedMonthNumber = dpManager.viewedMonth;
        for (var rowNumber = 1; rowNumber <= 3 ; rowNumber++) {
            if (rowNumber == 1 || rowNumber == 2) {

                htmlOfDays += '<div class="d-row clearfix">';//open new row

                for (var d = 1; d <= 10; d++)//first and second row always containt 10 days
                {
                    htmlOfDays += '<div style="width:' + widthOfDay + '%"><span data-date=' + dpManager.viewedYear + '-' + dpManager.viewedMonth + '-' + day + '>' + day + '</span></div>';
                    day++;
                }
                if (daysInRow == 11) {//add empty cell for rows first and second rows
                    htmlOfDays += '<div style="width:' + widthOfDay + '%"></div>';
                }

                htmlOfDays += '</div>';//close new row
            }
            else {
                htmlOfDays += '<div class="d-row clearfix">';//open new row
                var daysInLastRow = numberOfDay - (day - 1);//minus '-1' because day val already incremented above 
                for (var d = 1; d <= daysInLastRow ; d++) {
                    htmlOfDays += '<div style="width:' + widthOfDay + '%"><span data-date=' + dpManager.viewedYear + '-' + dpManager.viewedMonth + '-' + day + '>' + day + '</span></div>';
                    day++;
                }
                if (daysInLastRow < daysInRow) {//add empty cell for last rows
                    for (var d = 1; d <= daysInRow - daysInLastRow ; d++) {
                        htmlOfDays += '<div style="width:' + widthOfDay + '%"></div>';
                    }
                }
                htmlOfDays += '</div>';//close new row
            }
        }
        return htmlOfDays;
    },
    initObjectsAndEvents: function () {
        dpManager.$prevBtn = dpManager.$dp.find('.' + dpManager.prevBtnClass);
        dpManager.$currMonth = dpManager.$dp.find('.' + dpManager.currMonthClass);
        dpManager.$nextBtn = dpManager.$dp.find('.' + dpManager.nextBtnClass);
        dpManager.$daysWrp = dpManager.$dp.find('.' + dpManager.daysWrp);
        dpManager.$titlerWrp = dpManager.$dp.find('.' + dpManager.titlerWrp);

    },
    nextPrevMonth: function () {
        dpManager.$prevBtn.unbind('click').bind('click', function () {
            dpManager.viewedMonthDate = dpManager.viewedMonthDate.add(-1, 'months');
            dpManager.viewedMonth = dpManager.viewedMonthDate.format('M');
            dpManager.viewedYear = dpManager.viewedMonthDate.format('YYYY');
            dpManager.generateHeaderText();
            dpManager.$daysWrp.html(dpManager.generateDaysView(dpManager.viewedYear, dpManager.viewedMonth));
            dpManager.markToday();
            dpManager.dayClick();
        });

        dpManager.$nextBtn.unbind('click').bind('click', function () {
            dpManager.viewedMonthDate = dpManager.viewedMonthDate.add(1, 'months');
            dpManager.viewedMonth = dpManager.viewedMonthDate.format('M');
            dpManager.viewedYear = dpManager.viewedMonthDate.format('YYYY');
            dpManager.generateHeaderText();
            dpManager.$daysWrp.html(dpManager.generateDaysView(dpManager.viewedYear, dpManager.viewedMonth));
            dpManager.markToday();
            dpManager.dayClick();
        });
    },
    markToday: function () {
        //check if need mark today
        if (dpManager.currDate.format('YYYY') == dpManager.viewedYear && dpManager.currDate.format('M') == dpManager.viewedMonth) {
            dpManager.$daysWrp.find('span[data-date="' + dpManager.currDate.format('YYYY') + '-' + dpManager.currDate.format('M') + '-' + dpManager.currDate.format('D') + '"]').addClass('c-day');
        }
    },
    dayClick: function () {//for day click event
        dpManager.$daysWrp.find('span').unbind('click').bind('click', function () {
            //clicked day: - $(this).attr('data-date') 
            //day of clicked day: moment($(this).attr('data-date')).format('D')
            //month of clicked day: moment($(this).attr('data-date')).format('M')
            //year of clicked day: moment($(this).attr('data-date')).format('YYYY')

            //get current gate: $(this).attr('data-date')
        });
    },
    setPageConfiguration: function () {
        $('body').addClass('dp-bg');
    }
}

var haberPopupManager = {
    popupContentCssClass: '.js-haber-popup-content',
    $popupContent: '',
    haberItemWrpCssClass: '.js-haber-item',
    init: function () {
        if ($(haberPopupManager.popupContentCssClass).length != 0) {

            haberPopupManager.$popupContent = $(haberPopupManager.popupContentCssClass);
            haberPopupManager.openEvent();
        }
    },
    openEvent: function () {
        $(haberPopupManager.haberItemWrpCssClass).find('a').on('click', function () {
            var $haberItemWrp = $(this).parent(haberPopupManager.haberItemWrpCssClass);
            var newHtmlOfPopup = '<h1>' + $haberItemWrp.find('a').html() + '</h1>';
            newHtmlOfPopup += '<span>' + $haberItemWrp.find('span').html() + '</span>';
            newHtmlOfPopup += '<div><p>' + $haberItemWrp.find('p').html() + '</p></div>';

            haberPopupManager.$popupContent.html(newHtmlOfPopup);
        });

        $("#haberItemPopup").on("shown.bs.modal", function () {
            pageManager.setMarginForPageWithPopup();
        }).on("hidden.bs.modal", function () {
            pageManager.resetMarginForPageWithPopup();
        });
    }
}

var leftExtendedMenu = {
    exMenuParent: '.js-extend-menu-wrp',
    $exMarkedLinks: '',
    exMenuWrp: '.js-extened-menu',
    $exMenuWrp: '',
    openedMode: 'js-opened-ex-menu',
    $markedlinks: '',
    init: function () {
        leftExtendedMenu.$exMenuParent = $(leftExtendedMenu.exMenuParent);
        leftExtendedMenu.$exMenuWrp = $(leftExtendedMenu.exMenuWrp);
        leftExtendedMenu.$exMarkedLinks = leftExtendedMenu.$exMenuWrp.find('a');

        leftExtendedMenu.$exMenuParent.on('click', function () {
            if (pageManager.isMobileMode) {
                document.location = $(this).children('a').attr('data-mob-url');
            }
            else {
                if ($(this).hasClass(leftExtendedMenu.openedMode)) {
                    $(this).removeClass(leftExtendedMenu.openedMode);
                    var $openBtn = $(this).children('a');

                    leftExtendedMenu.$exMenuWrp.find('a:nth-child(2)').animate({ 'left': '0px' }, 500, function () {
                        $openBtn.css('border-right-width', '1px');
                    });
                    leftExtendedMenu.$exMenuWrp.find('a:first-child').animate({ 'left': '0px' }, 300);
                }
                else {
                    $(this).addClass(leftExtendedMenu.openedMode);
                    $(this).children('a').css('border-right-width', '0px');
                    leftExtendedMenu.$exMenuWrp.find('a:nth-child(2)').animate({ 'left': '278px' }, 400);
                    leftExtendedMenu.$exMenuWrp.find('a:first-child').animate({ 'left': '139px' }, 300);
                }
            }
        });
    }
}

var pageScrollTransManager = {
    switchBtn: '.js-switch-page-section-btn',
    $switchBtn: '',
    showedSection: 'js-showed-section',
    showedSectionCssClass: 'showed-section',
    isActive: false,
    init: function () {
        pageScrollTransManager.$switchBtn = $(pageScrollTransManager.switchBtn);
        if (pageScrollTransManager.$switchBtn.length != 0) {
            pageScrollTransManager.$switchBtn.bind('click', function () {
                if (!pageScrollTransManager.isActive) {
                    pageScrollTransManager.isActive = true;
                    var $shSection = $('.' + pageScrollTransManager.showedSection);

                    var oneHeight = $shSection.outerHeight(true);
                    var twoHeight = oneHeight * 2;


                    $shSection.animate({ 'margin-top': -oneHeight, 'opacity': '0', height: twoHeight }, 1500);


                    $shSection.next().css({ 'position': 'fixed', 'display': 'block', 'margin-top': oneHeight })
                    $shSection.next().animate({ 'margin-top': -oneHeight, 'opacity': '1' }, 1500, function () {
                        $shSection.css({ height: oneHeight });

                        var nextHeight = $shSection.next().outerHeight(true);
                        if (oneHeight <= nextHeight) {
                            oneHeight = nextHeight;
                        }

                        $shSection.next().css({ height: oneHeight, 'position': 'relative', 'margin-top': '' });



                        $shSection.removeClass(pageScrollTransManager.showedSection).removeClass(pageScrollTransManager.showedSectionCssClass);
                        $shSection.next().addClass(pageScrollTransManager.showedSection).addClass(pageScrollTransManager.showedSectionCssClass);
                        pageScrollTransManager.isActive = false;
                    });


                    if ($shSection.next().next().length == 0) {
                        pageScrollTransManager.$switchBtn.unbind('click').css('cursor', 'default').animate({ 'opacity': '0' }, 300);
                    }
                }
            });
        }
    }
}

var gazPageTransaction = {
    pageMark: '.js-gaz-bg-anim',
    init: function () {
        if ($(gazPageTransaction.pageMark).length != 0) {
            pageGlidTransManager.$imgWrp = $(pageGlidTransManager.imgWrp);
            pageGlidTransManager.showImg();
        }
    }
}

var pageGlidTransManager = {
    duration: 1000,
    glidTransactionContent: '.js-page-glid-trans',
    nextBtn: '.js-glid-trans-next',
    imgWrp: '.js-bg-img-wrp',
    $imgWrp: '',
    topImg: 'top',
    rightImg: 'right',
    bottomImg: 'bottom',
    leftImg: 'left',
    init: function () {
        if ($(pageGlidTransManager.glidTransactionContent).length != 0) {

            $(pageGlidTransManager.glidTransactionContent).animsition({
                inClass: 'fade-in-up-sm',
                outClass: 'fade-out-down-sm',
                inDuration: 1500,
                outDuration: 800,
                linkElement: '.animsition-link',
                touchSupport: true,
                loading: true,
                loadingParentElement: '.js-body-content', //animsition wrapper element
                loadingClass: 'animsition-loading',
                unSupportCss: ['animation-duration',
                  '-webkit-animation-duration',
                '-o-animation-duration'
                ],
                overlay: false,
            }).one('animsition.start', function () {
                pageGlidTransManager.$imgWrp = $(pageGlidTransManager.imgWrp);
                pageGlidTransManager.showImg();
                pageGlidTransManager.getNextPageEvent();
            });


        }
    },
    getNextPageEvent: function () {
        $(pageGlidTransManager.nextBtn).bind('click', function () {
            pageGlidTransManager.hideImg();
        });
    },
    hideImg: function () {
        pageGlidTransManager.$imgWrp.children('img').each(function () {
            pageGlidTransManager.$imgWrp.children('img').each(function () {
                switch ($(this).attr('data-show-mode')) {
                    case pageGlidTransManager.topImg: {
                        $(this).animate({ 'top': $(this).data('top'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break;
                    case 'right-specific':
                    case pageGlidTransManager.rightImg: {
                        $(this).animate({ 'right': $(this).data('right'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break;
                    case pageGlidTransManager.bottomImg: {
                        $(this).animate({ 'bottom': $(this).data('bottom'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break;
                    case pageGlidTransManager.leftImg: {
                        $(this).animate({ 'left': $(this).data('left'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break;
                    case 'top-right': {
                        $(this).animate({ 'top': $(this).data('top'), 'right': $(this).data('right'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break
                    case 'top-right': {
                        $(this).animate({ 'top': $(this).data('top'), 'right': $(this).data('right'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break
                    case 'bottom-left': {
                        $(this).animate({ 'bottom': $(this).data('bottom'), 'left': $(this).data('left'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break;
                    case 'bottom-right': {
                        $(this).animate({ 'bottom': $(this).data('bottom'), 'right': $(this).data('right'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break;
                    case 'top-specific': {
                        $(this).animate({ 'top': $(this).attr('data-top'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    }
                        break
                    case 'top-right-specific': {
                        $(this).animate({ 'top': '-108px', 'right': '-108px', 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    } break
                    case 'top-left': {
                        $(this).animate({ 'top': $(this).attr('data-top'), 'right': $(this).attr('data-right'), 'opacity': 0 }, pageGlidTransManager.duration, function () {
                            $(this).addClass('hidden');
                        });
                    } break

                }
            });
        });
    },
    showImg: function () {
        if (pageManager.isMobileMode) {
            pageGlidTransManager.m_showImg();
        }
        else {
            pageGlidTransManager.d_showImg();
        }
    },
    d_showImg: function () {
        pageGlidTransManager.$imgWrp.children('img:not(.desk-hidden)').each(function () {
            switch ($(this).attr('data-show-mode')) {
                case pageGlidTransManager.topImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'top': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case pageGlidTransManager.rightImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'right': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case pageGlidTransManager.bottomImg: {

                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case pageGlidTransManager.leftImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'left': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case 'top-right': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'left': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break
                case 'bottom-left': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'left': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break
                case 'bottom-right': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'right': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                } break
                case 'top-specific': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'top': $(this).attr('data-top-spec'), 'opacity': 1 }, pageGlidTransManager.duration);
                } break
                case 'right-specific': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'right': $(this).attr('data-right-spec'), 'right': $(this).attr('data-right-spec'), 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break
                case 'top-right-specific': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'top': $(this).attr('data-top-spec'), 'right': $(this).attr('data-right-spec'), 'opacity': 1 }, pageGlidTransManager.duration);
                } break
                case 'top-left-percent': {
                    var topVal = parseInt($(this).css('top')) - 100;
                    var leftVal = parseInt($(this).css('left')) - 200;
                    $(this).css({ 'top': topVal + 'px', 'left': leftVal + 'px', 'opacity': 0 });
                    $(this).animate({ 'top': $(this).attr('data-top'), 'left': $(this).attr('data-left'), 'opacity': 1 }, pageGlidTransManager.duration);
                } break
                case 'bottom-left-percent': {
                    var topVal = parseInt($(this).css('bottom')) + 100;
                    var leftVal = parseInt($(this).css('left')) + 200;
                    $(this).css({ 'top': topVal + 'px', 'left': leftVal + 'px', 'opacity': 0 });
                    $(this).animate({ 'top': $(this).attr('data-top'), 'left': $(this).attr('data-left'), 'opacity': 1 }, pageGlidTransManager.duration);
                } break
            }
        });
    },
    m_showImg: function () {
        pageGlidTransManager.$imgWrp.children('img:not(.mob-hidden)').each(function () {
            switch ($(this).attr('data-show-mode')) {
                case pageGlidTransManager.topImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'top': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case pageGlidTransManager.rightImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'right': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case pageGlidTransManager.bottomImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case pageGlidTransManager.leftImg: {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'left': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break;
                case 'bottom-left': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'left': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break
                case 'bottom-right': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'bottom': '0px', 'right': '0px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break
                case 'top-left': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'left': '0px', 'top': '99px', 'opacity': 1 }, pageGlidTransManager.duration);
                }

                case 'top-right': {
                    $(this).css({ 'opacity': 0 }).removeClass('hidden');
                    $(this).animate({ 'right': '0px', 'top': '99px', 'opacity': 1 }, pageGlidTransManager.duration);
                }
                    break
            }
        });
    }
}



var menuOpenManager = {
    menuOpenCssMarker: 'js-l-r-m-opened',
    menuOpenCssClass: 'l-r-m-opened',
    $leftMenuOpenBtn: '',
    $rightMenuOpenBtn: $(),
    $rightMenuWrp: '',
    _activLevel: 0,//1, 2, or 3
    _activeItemMarker: 'js-active-item',
    _cssActiveItemMarker: 'active-menu-item',
    $firstLevelActiveItem: '',//tag a
    $secondLevelActiveItem: '',//tag a
    $firstLevelShowedMenu: $(''), //tag ul
    $secondLevelShowedMenu: $(''),//tag ul
    $thirdLevelShowedMemu: $(''),//tag ul 
    bodyWidth: '',
    openBtnWidth: 99,
    fLevCollapsedWidth: '99px',
    sLevCollapsedWidth: '37px',
    sLevCollapsedWidth_1: '37',
    fLevDesktopdWidth: '109px',
    firstLevelWidth: '',
    secondLevelWidth: '',
    thirdLevelWidth: '',
    $firstLevelLinks: '',//tags <a>
    $secondLevelLinks: '',//tags <a>
    init: function () {
        menuOpenManager.$leftMenuOpenBtn = $('.js-lm-toggle');
        menuOpenManager.$rightMenuOpenBtn = $('.js-rm-toggle');

        menuOpenManager.setCurrentLevel(1);
        menuOpenManager.$firstLevelShowedMenu = $('.js-first-level');

        menuOpenManager.$rightMenuWrp = menuOpenManager.$firstLevelShowedMenu.parent();


        //initialize events
        menuOpenManager.openCloseEvents();
        menuOpenManager.firstLevelClick();
        menuOpenManager.secondLevelClick();

        menuOpenManager.mouseHovereInOutEvents();

        //resize 
        menuOpenManager.calculateMenuLevelsWidth();
        menuOpenManager.reinitLevelWidth();
        $(window).resize(function () {
            menuOpenManager.calculateMenuLevelsWidth();
            menuOpenManager.reinitLevelWidth();
            menuVertAlignManager.setYPosition();
        });
    },
    calculateMenuLevelsWidth: function () {
        menuOpenManager.bodyWidth = $('body').width();
        if (menuOpenManager.bodyWidth <= pageManager.maxMobScreenWidth) {
            menuOpenManager.firstLevelWidth = (menuOpenManager.bodyWidth * 56.52) / 100; // .animate({ 'width': '0px' }
            menuOpenManager.secondLevelWidth = menuOpenManager.bodyWidth - menuOpenManager.openBtnWidth;
            menuOpenManager.thirdLevelWidth = menuOpenManager.secondLevelWidth - 37;
        }
        else {
            menuOpenManager.firstLevelWidth = menuOpenManager.fLevDesktopdWidth; // .animate({ 'width': '0px' }
            menuOpenManager.secondLevelWidth = '93px';
            menuOpenManager.thirdLevelWidth = '92px';
        }
    },
    setCurrentLevel: function (level) {
        menuOpenManager._activLevel = level;
    },
    getCurrentLevel: function () {
        return menuOpenManager._activLevel;
    },
    isActive: function ($link) {
        return $link.hasClass(menuOpenManager._activeItemMarker);
    },
    markActiveLink: function ($link) {
        $link.before('<span class="js-menu-triangle menu-triangle"></span>');
        var $currrTriangle = $link.prev('span.js-menu-triangle');
        $currrTriangle.css({
            'border-right-width': '0px',
            'border-right-color': $link.parent('li').css('background-color'),
            'display': 'block',
            'left': '20px'
        });
        $currrTriangle.animate({ 'border-right-width': '26px', 'left': '-25px' }, 300);

        menuOpenManager.triangleClickEvent($currrTriangle);


        $link.addClass(menuOpenManager._activeItemMarker).addClass(menuOpenManager._cssActiveItemMarker).css('color', '');
    },
    unmarkActiveLink: function ($link) {
        $link.prev('span.js-menu-triangle').animate({ 'border-right-width': '0px', 'left': '20px', 'opacity': '0' }, 200, function () {
            $(this).fadeOut(550).remove();
            $link.removeClass(menuOpenManager._activeItemMarker).removeClass(menuOpenManager._cssActiveItemMarker).removeClass('hover-menu-item');
        });
    },
    hideLevelLinksText: function ($level) {
        $level.children('li').children('a').css('color', '').addClass('trans-link');
    },
    showLevelLinksText: function ($level) {
        $level.children('li').children('a').removeClass('trans-link');
    },
    setFixedPositionForIcons: function () {
        menuOpenManager.$firstLevelShowedMenu.children('li').children('a').children('span').css('position', 'fixed');
        menuOpenManager.$rightMenuWrp.children('a.js-home-link').css('position', 'fixed');
        menuOpenManager.$rightMenuWrp.children('div.js-lang-switch').css('position', 'fixed');
    },
    setAbsolutePositionForIcons: function () {
        menuOpenManager.$firstLevelShowedMenu.children('li').children('a').children('span').css('position', 'absolute');
        menuOpenManager.$rightMenuWrp.children('a.js-home-link').css('position', 'absolute');
        menuOpenManager.$rightMenuWrp.children('div.js-lang-switch').css('position', 'absolute');
    },
    openCloseEvents: function () {
        menuOpenManager.$leftMenuOpenBtn.on('click', function () {
            $('.js-left-menu').css('width', $('body').width());
            $('.js-left-menu').stop().slideToggle(500, function () {

            });
            //close right menu
            if (menuOpenManager.$rightMenuOpenBtn.hasClass(menuOpenManager.menuOpenCssMarker)) {
                menuOpenManager.$rightMenuOpenBtn.click();
            }
            //mark current menu BTN
            if ($(this).hasClass(menuOpenManager.menuOpenCssMarker)) {
                $(this).removeClass(menuOpenManager.menuOpenCssMarker);
                $(this).removeClass(menuOpenManager.menuOpenCssClass);
            }
            else {
                $(this).addClass(menuOpenManager.menuOpenCssMarker);
                $(this).addClass(menuOpenManager.menuOpenCssClass);
            }
        });
        menuOpenManager.$rightMenuOpenBtn.on('click', function () {
            //close left menu
            if (menuOpenManager.$leftMenuOpenBtn.hasClass(menuOpenManager.menuOpenCssMarker)) {
                menuOpenManager.$leftMenuOpenBtn.click();
            }


            //mark current menu BTN
            if ($(this).hasClass(menuOpenManager.menuOpenCssMarker)) {
                $(this).removeClass(menuOpenManager.menuOpenCssClass).removeClass(menuOpenManager.menuOpenCssMarker);

            }
            else {
                $(this).addClass(menuOpenManager.menuOpenCssClass).addClass(menuOpenManager.menuOpenCssMarker);

            }
        });

    },
    firstLevelClick: function () {
        menuOpenManager.$firstLevelLinks = menuOpenManager.$firstLevelShowedMenu.children('li').children('a');
        menuOpenManager.$firstLevelLinks.on('click', function () {
            switch (menuOpenManager.getCurrentLevel()) {
                case 1://open second level
                    menuOpenManager.$firstLevelActiveItem = $(this);
                    menuOpenManager.$secondLevelShowedMenu = menuOpenManager.$firstLevelActiveItem.next('ul');

                    if (menuOpenManager.$secondLevelShowedMenu.length != 0) {
                        menuOpenManager.$secondLevelLinks = menuOpenManager.$secondLevelShowedMenu.children('li').children('a');

                        //make smaller first Level 
                        if (pageManager.isMobileMode) {
                            menuOpenManager.m_collapseFirstLevel();
                        }
                        else {
                            menuOpenManager.d_showSecondLevel();
                        }
                    }
                    else {//not has ne level item

                    }
                    break;
                case 2:
                    if (pageManager.isMobileMode) {
                        if (menuOpenManager.isActive($(this))) {
                            menuOpenManager.m_hideSecondLevel(null);
                        }
                        else {
                            menuOpenManager.m_hideSecondLevel($(this));
                        }
                    }
                    else {
                        //desktop
                        if (menuOpenManager.isActive($(this))) {
                            menuOpenManager.d_hideSecondLevel(null);
                        }
                        else {
                            menuOpenManager.d_hideSecondLevel($(this));

                        }
                    }
                    break;
                case 3:
                    if (pageManager.isMobileMode) {
                        menuOpenManager.m_hideThirdLevel(null, menuOpenManager.m_showFirstLevel)
                    }
                    else {
                        menuOpenManager.d_hideThirdLevel($(this), 1);
                    }
                    break;
            }
        });
    },
    secondLevelClick: function () {//open third level      
        menuOpenManager.$secondLevelLinks = $('.js-right-menu .js-second-level > li >a');
        menuOpenManager.$secondLevelLinks.on('click', function () {
            switch (menuOpenManager.getCurrentLevel()) {
                case 2:
                    {
                        if (!menuOpenManager.isActive($(this))) {
                            if (pageManager.isMobileMode) {
                                menuOpenManager.m_collapseSecondLevel($(this), menuOpenManager.m_showThirdLevel);
                            }
                            else {
                                menuOpenManager.d_showThirdLevel($(this));

                            }
                        }
                    }
                    break;
                case 3:
                    {
                        if (pageManager.isMobileMode) {
                            if (menuOpenManager.isActive($(this))) {
                                menuOpenManager.m_hideThirdLevel(null, menuOpenManager.m_showSecondLevel)

                            }
                            else {
                                menuOpenManager.m_hideThirdLevel($(this), menuOpenManager.m_showThirdLevel);
                            }
                        }
                        else {
                            menuOpenManager.d_hideThirdLevel($(this), 2);
                        }
                    }
                    break;
            }
        });
    },
    d_hideThirdLevel: function ($newLevelActiveItem, newActLev) {
        menuOpenManager.$thirdLevelShowedMemu.animate({ 'width': '0px' }, 300, function () {
            $(this).hide();
            menuOpenManager.unmarkActiveLink(menuOpenManager.$secondLevelActiveItem);
            if (newActLev == 1) {
                menuOpenManager.d_hideSecondLevel($newLevelActiveItem);
            }
            else if (newActLev == 2) {
                menuOpenManager.d_showThirdLevel($newLevelActiveItem);
            }
        });
    },
    d_showThirdLevel: function ($newSecondLevelActiveItem) {
        menuOpenManager.$secondLevelActiveItem = $newSecondLevelActiveItem;
        menuOpenManager.$thirdLevelShowedMemu = menuOpenManager.$secondLevelActiveItem.next('ul');
        menuOpenManager.$thirdLevelShowedMemu.css({
            width: '0px',
            display: 'block',

        });
        menuOpenManager.markActiveLink(menuOpenManager.$secondLevelActiveItem);
        menuOpenManager.$thirdLevelShowedMemu.animate({ 'width': menuOpenManager.thirdLevelWidth }, 300);

        menuOpenManager.setCurrentLevel(3);
    },
    d_hideSecondLevel: function ($newFirstLevelActiveItem) {
        menuOpenManager.$secondLevelShowedMenu.animate({ 'width': '0px' }, 300, function () {
            menuOpenManager.$secondLevelShowedMenu.hide();

            menuOpenManager.unmarkActiveLink(menuOpenManager.$firstLevelActiveItem);
            menuOpenManager.hideLevelLinksText(menuOpenManager.$secondLevelShowedMenu);
            if ($newFirstLevelActiveItem != null) {
                menuOpenManager.$firstLevelActiveItem = $newFirstLevelActiveItem;
                menuOpenManager.$secondLevelShowedMenu = menuOpenManager.$firstLevelActiveItem.next('ul');
                menuOpenManager.d_showSecondLevel();
            }
            else {
                menuOpenManager.setCurrentLevel(1);
            }
        });
    },
    d_showSecondLevel: function () {
        if (menuOpenManager.$secondLevelShowedMenu.length != 0) {
            menuOpenManager.$secondLevelShowedMenu.css({
                right: menuOpenManager.fLevDesktopdWidth,
                width: '0px',
                display: 'block',

            });
            menuOpenManager.showLevelLinksText(menuOpenManager.$secondLevelShowedMenu);

            menuOpenManager.$secondLevelShowedMenu.animate({ 'width': menuOpenManager.secondLevelWidth }, 300);

            menuOpenManager.markActiveLink(menuOpenManager.$firstLevelActiveItem);
            menuOpenManager.setCurrentLevel(2);
        }
        else {

        }
    },
    m_showSecondLevel: function () {
        menuOpenManager.unmarkActiveLink(menuOpenManager.$firstLevelActiveItem);
        menuOpenManager.markActiveLink(menuOpenManager.$firstLevelActiveItem);
        menuOpenManager.$secondLevelLinks.animate({ 'padding-right': '45px' }, 300);
        menuOpenManager.$secondLevelShowedMenu.animate({ 'width': menuOpenManager.secondLevelWidth }, 300, function () {
            menuOpenManager.setCurrentLevel(2);
        });
    },
    m_hideSecondLevel: function ($newFirstLevelActiveItem, closeRightMenu) {
        menuOpenManager.$secondLevelShowedMenu.animate({ 'width': '0px' }, 300, function () {
            if ($newFirstLevelActiveItem != null) {
                menuOpenManager.unmarkActiveLink(menuOpenManager.$firstLevelActiveItem);

                menuOpenManager.$firstLevelActiveItem = $newFirstLevelActiveItem;
                menuOpenManager.$secondLevelShowedMenu.hide();

                menuOpenManager.hideLevelLinksText(menuOpenManager.$secondLevelShowedMenu);

                menuOpenManager.$secondLevelShowedMenu = menuOpenManager.$firstLevelActiveItem.next('ul');

                menuOpenManager.m_showSecondLevel();
            }
            else {

                menuOpenManager.m_showFirstLevel(closeRightMenu);
            }

        });
    },
    m_collapseFirstLevel: function ($newActiveSecondLevel, callback) {
        //additional text animation for first level's text
        menuOpenManager.$firstLevelLinks.animate({ 'padding-right': '50px' }, 300);
        menuOpenManager.$firstLevelShowedMenu.animate({ 'width': menuOpenManager.fLevCollapsedWidth }, 300, function () {
            //  menuOpenManager.$firstLevelLinks.css({ 'padding-right': '99px' });
            menuOpenManager.hideLevelLinksText(menuOpenManager.$firstLevelShowedMenu);
            //open second Level
            menuOpenManager.m_showSecondLevel();
        });
    },
    m_collapseSecondLevel: function ($newActiveSecondLevel, callback) {
        menuOpenManager.$secondLevelLinks.animate({ 'padding-right': '28px' }, 300);
        menuOpenManager.$secondLevelShowedMenu.animate({ 'width': menuOpenManager.sLevCollapsedWidth }, 300,
            function () {
                menuOpenManager.hideLevelLinksText(menuOpenManager.$secondLevelShowedMenu);

                menuOpenManager.setDefaultCssFor3Level($newActiveSecondLevel);
                if (callback != null) {
                    callback();
                }
            });
    },
    m_showThirdLevel: function () {
        menuOpenManager.unmarkActiveLink(menuOpenManager.$secondLevelActiveItem);
        menuOpenManager.markActiveLink(menuOpenManager.$secondLevelActiveItem);
        menuOpenManager.$thirdLevelShowedMemu.animate({ 'width': menuOpenManager.thirdLevelWidth }, 300, function () {

            menuOpenManager.setCurrentLevel(3);
        });
    },
    /*$newActiveSecondLevel - new second level active LINK; callback - show second menu item */
    m_hideThirdLevel: function ($newActiveSecondLevel, callback) {
        menuOpenManager.unmarkActiveLink(menuOpenManager.$secondLevelActiveItem);

        menuOpenManager.$thirdLevelShowedMemu.animate({ 'width': '0px' }, 300, function () {
            $(this).hide();
            menuOpenManager.setCurrentLevel(2);

            if ($newActiveSecondLevel != null) {

                menuOpenManager.setDefaultCssFor3Level($newActiveSecondLevel);
            }
            //menuOpenManager.m_showSecondLevel
            if (callback != null) {
                callback();
            }

        });
    },
    setDefaultCssFor3Level: function ($newActiveSecondLevel) {
        menuOpenManager.$secondLevelActiveItem = $newActiveSecondLevel;
        menuOpenManager.$thirdLevelShowedMemu = menuOpenManager.$secondLevelActiveItem.next('ul');
        menuOpenManager.$secondLevelLinks = menuOpenManager.$secondLevelActiveItem.parents('.js-second-level').children('li').children('a');

        menuOpenManager.$thirdLevelShowedMemu.css({
            width: '0px',
            display: 'block'
        });
    },
    m_showFirstLevel: function (closeRightMenu) {
        menuOpenManager.unmarkActiveLink(menuOpenManager.$firstLevelActiveItem);
        menuOpenManager.$secondLevelShowedMenu.hide();

        menuOpenManager.showLevelLinksText(menuOpenManager.$firstLevelShowedMenu);
        //additional text animation for first level's text
        menuOpenManager.$firstLevelLinks.animate({ 'padding-right': '105px' }, 300);
        menuOpenManager.$firstLevelShowedMenu.animate({ 'width': menuOpenManager.firstLevelWidth }, 300);

        menuOpenManager.unmarkActiveLink(menuOpenManager.$firstLevelActiveItem);
        menuOpenManager.setCurrentLevel(1);
        if (closeRightMenu != null) {
            closeRightMenu();
        }
    },
    m_showSecondLevel: function () {
        if (menuOpenManager.$secondLevelShowedMenu.length != 0) {
            menuOpenManager.showLevelLinksText(menuOpenManager.$secondLevelShowedMenu);

            menuOpenManager.$secondLevelShowedMenu.css({
                width: '0px',
                display: 'block'
            });

            menuOpenManager.$secondLevelShowedMenu.animate({ 'width': menuOpenManager.secondLevelWidth }, 300);

            menuOpenManager.unmarkActiveLink(menuOpenManager.$firstLevelActiveItem);
            menuOpenManager.markActiveLink(menuOpenManager.$firstLevelActiveItem);

            menuOpenManager.setCurrentLevel(2);//AL : 2
        }
        else {
            menuOpenManager.m_showFirstLevel();
        }
    },
    reinitLevelWidth: function () {
        if (!pageManager.isMobileMode) {
            menuOpenManager.$rightMenuWrp.css('width', menuOpenManager.firstLevelWidth);
            menuOpenManager.$firstLevelShowedMenu.css('width', menuOpenManager.firstLevelWidth);
            menuOpenManager.$secondLevelShowedMenu.css('width', menuOpenManager.secondLevelWidth);
            menuOpenManager.$thirdLevelShowedMemu.css('width', menuOpenManager.thirdLevelWidth);
        }
        else {
            switch (menuOpenManager.getCurrentLevel()) {
                case 1:
                    menuOpenManager.$rightMenuWrp.css('width', menuOpenManager.firstLevelWidth);
                    menuOpenManager.$firstLevelShowedMenu.css('width', menuOpenManager.firstLevelWidth);
                    break;
                case 2:
                    menuOpenManager.$secondLevelShowedMenu.css('width', menuOpenManager.secondLevelWidth);
                    break;
                case 3:
                    menuOpenManager.$thirdLevelShowedMemu.css('width', menuOpenManager.thirdLevelWidth);
                    break;
            }
        }
    },
    mouseHovereInOutEvents: function () {
        $('.js-right-menu .js-first-level a:not(.trans-link)').mouseover(function () {
            if (!$(this).hasClass('trans-link') && !$(this).hasClass(menuOpenManager._cssActiveItemMarker)) {
                //$(this).css('color', '#fff');

                $(this).addClass('hover-menu-item');
            }
        }).mouseout(function () {
            if (!$(this).hasClass('trans-link') && !$(this).hasClass(menuOpenManager._cssActiveItemMarker)) {
                //$(this).css('color', '#9dcbff');
                $(this).removeClass('hover-menu-item');
            }
        });
    },
    triangleClickEvent: function ($triangle) {
        $triangle.bind('click', function () {
            $(this).next('a').click();
        });
    }
}


var localeSetting = {
    loadTurkishLocale: function () {
        moment.locale('tr', {
            months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
            monthsShort: 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
            weekdays: 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
            weekdaysShort: 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
            weekdaysMin: 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD.MM.YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd, D MMMM YYYY HH:mm'
            },
            calendar: {
                sameDay: '[bugün saat] LT',
                nextDay: '[yarın saat] LT',
                nextWeek: '[haftaya] dddd [saat] LT',
                lastDay: '[dün] LT',
                lastWeek: '[geçen hafta] dddd [saat] LT',
                sameElse: 'L'
            },
            relativeTime: {
                future: '%s sonra',
                past: '%s önce',
                s: 'birkaç saniye',
                m: 'bir dakika',
                mm: '%d dakika',
                h: 'bir saat',
                hh: '%d saat',
                d: 'bir gün',
                dd: '%d gün',
                M: 'bir ay',
                MM: '%d ay',
                y: 'bir yıl',
                yy: '%d yıl'
            },
            ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
            ordinal: function (number) {
                if (number === 0) {  // special case for zero
                    return number + '\'ıncı';
                }
                var a = number % 10,
                    b = number % 100 - a,
                    c = number >= 100 ? 100 : null;
                return number + (tr__suffixes[a] || tr__suffixes[b] || tr__suffixes[c]);
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 7  // The week that contains Jan 1st is the first week of the year.
            }
        });
    }
}