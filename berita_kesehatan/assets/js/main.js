(function($){
    'use strict';
    //Отдельном выносим языки, для более простой локализации
    var Lang = {
      gr: {
            months: [ 'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
            monthsRp: ['ιανουάριο', 'φεβρουάριο', 'μάρτιο', 'απρίλιο', 'μάιο', 'ιούνιο', 'ιούλιο', 'αύγουστο', 'σεπτέμβριο', 'οκτώβριο', 'νοέμβριο', 'δεκέμβριο'],
            monthsPp: ['ιανουάριο', 'φεβρουάριο', 'μάρτιο', 'απρίλιο', 'μάιο', 'ιούνιο', 'ιούλιο', 'αύγουστο', 'σεπτέμβριο', 'οκτώβριο', 'νοέμβριο', 'δεκέμβριο'],
            maxPurchase: 'Ο μεγαλύτερος αριθμός παραγγελιών (_COUNT_) δόθηκε σε _DATE_ _MONTH_ .',
            stockInfoTitle: 'Περισσότερς από 100 000 πωλήσεις τον',
            stockInfoTime: 'Η περίοδος εκπτώσεων ξεκινά _STARTDATE_ _STARTMONTH_ και τελειώνει _ENDDATE_ _ENDMONTH_'
        }
    };
    //Объявляем класс нашего лендинга
    var Landing = function () {
        this.nowDate = new Date();
         
        //Параметры загрузки лендинга
        this.params = {
            lang: 'gr', //локализация
            maxPurchase: 2419, //Максимальное кол-во покупок
            maxPurchaseDate: 2, //Количество дней назад
            startStockDate: 29, //Дней назад началась акция
            endStockDate: 1, //Дней через которые акция закончится
            lastPackTime: 15, //Секунд, через которое уменьшится количество оставшихся на складе упаковок
            countDownDiff: Math.ceil((24*60*60)-(this.nowDate.getHours() * 60 * 60 + this.nowDate.getMinutes() * 60 + this.nowDate.getSeconds())), //Количество секунд до конца таймера
            selectors: {
                countDown: '.landing__countdown', //Таймер
                maxPurcahesDate: '.landing__maxpurcashe', //Максимальное кол-во покупок
                stockInfo: '.landing__stockinfo',
                stockInfoTitle: '.landing__stockinfo_title',
                lastPack: '.landing__lastpack'
            }
        };
        //Стартуем таймер
        this.initCountDown();
        //Заполняем обман
        //Максимальное количество покупок
        this.initMaxPurcasheDate();
        //Даты проведения акции
        this.initStockInfo();
        //Уменьшаем количество lastpack
        this.initLastPack();
        this.initEvents();
    };
    //Список ивентов лендинга
    Landing.prototype.initEvents = function() {
    };
    //Уменьшаем количество last-pack
    Landing.prototype.initLastPack = function() {
        var _this = this;
        var lastPackTimer = setTimeout(function() {
            $(_this.params.selectors.lastPack).each(function (index, elem){
                var val = parseFloat($(elem).text(), 10);
                $(elem).html((val-1));
            });
        }, this.params.lastPackTime * 1000);
    };
    //Информация о дате проведения лендингов
    Landing.prototype.initStockInfo = function() {
        var lang = Lang[this.params.lang];
        var stockTitle = lang.stockInfoTitle + lang.monthsPp[this.nowDate.getUTCMonth()];
 
        var endStockDate = new Date(this.nowDate.getTime() + (this.params.endStockDate*24*60*60*1000));
        var startStockDate = new Date(this.nowDate.getTime() - (this.params.startStockDate*24*60*60*1000));
        var stockInfo = lang.stockInfoTime;
            stockInfo = stockInfo.replace('_STARTDATE_', startStockDate.getUTCDate());
            stockInfo = stockInfo.replace('_ENDDATE_', endStockDate.getUTCDate());
            stockInfo = stockInfo.replace('_STARTMONTH_', lang.monthsRp[startStockDate.getMonth()]);
            stockInfo = stockInfo.replace('_ENDMONTH_', lang.monthsRp[endStockDate.getMonth()]);
         
        $(this.params.selectors.stockInfoTitle).html(stockTitle);
        $(this.params.selectors.stockInfo).html(stockInfo);
    };
     
    //Максимальное количество покупок
    Landing.prototype.initMaxPurcasheDate = function() {
        var maxPurchaseDate = new Date(this.nowDate.getTime() - (this.params.maxPurchaseDate*24*60*60*1000));
        var htmlString = Lang[this.params.lang].maxPurchase;
            htmlString = htmlString.replace('_COUNT_', this.params.maxPurchase);
            htmlString = htmlString.replace('_DATE_', maxPurchaseDate.getUTCDate());
            htmlString = htmlString.replace('_MONTH_', Lang[this.params.lang].monthsRp[maxPurchaseDate.getUTCMonth()]);
        $(this.params.selectors.maxPurcahesDate).html(htmlString);
    };
    //Таймер countdown
    Landing.prototype.initCountDown = function() {
        var _this = this,
            endDate = new Date(this.nowDate.getTime() + this.params.countDownDiff * 1000);
        var countDownTimer = setInterval( function () {
            var diffDate = new Date(endDate.getTime() - Date.now()),
                h = (diffDate.getHours() > 9) ? diffDate.getHours() : '0'+diffDate.getHours(),
                m = (diffDate.getMinutes() > 9) ? diffDate.getMinutes() : '0'+diffDate.getMinutes(),
                s = (diffDate.getSeconds() > 9) ? diffDate.getSeconds() : '0'+diffDate.getSeconds();
            var htmlTime = '<span class="hours">'+ h +'</span>'+ 
                           '<span class="minutes">'+ m +'</span>'+ 
                           '<span class="seconds">'+ s +'</span>';
            $(_this.params.selectors.countDown).html(htmlTime);
        }, 1000);
    };
    $(function() {
        window.landing = new Landing();
    });
})(jQuery);