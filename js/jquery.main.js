$(function(){

    $('.swiper-container').each(function () {
        Slider($(this));
    });
    $.each($('.tabs'), function () {
        new Tabs( $( this ) );
    });
    $('.btn-up').on({
        'click':function(){
            $('html, body').animate({scrollTop: 0}, 600);
        }

    });

    $(".applications__item fieldset>div .checkbox-select").click(function(event){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find("input").attr('checked',false);
        }else{
            $(this).addClass('active');
            $(this).find("input").attr('checked',true);
        }
        event.stopPropagation();
        event.cancelBubble = true;

        return false;
    });

    $(".applications__item fieldset>div .radio-select").click(function(event){

        $(".applications__item fieldset>div .radio-select").find("input").attr('checked',false);
        $(".applications__item fieldset>div .radio-select").removeClass('active');

        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).find("input").attr('checked',false);
        }else{
            $(this).addClass('active');
            $(this).find("input").attr('checked',true);
        }
        event.stopPropagation();
        event.cancelBubble = true;

        return false;
    });

    $(".applications__item fieldset>div .checkbox-select-label").click(function(event){
        if($(this).prev().hasClass('active')){
            $(this).prev().removeClass('active');
            $(this).prev().find("input").attr('checked',false);
        }else{
            $(this).prev().addClass('active');
            $(this).prev().find("input").attr('checked',true);
        }
        event.stopPropagation();
        event.cancelBubble = true;

        return false;
    });

    $('select').each(function () {
        NiceSelect($(this));
    });

    $.each($('.map'), function () {

    var myMap;

    function init () {
        myMap = new ymaps.Map('map', {
            center: $('.map__item').eq(0).attr('data-coord').split(', '),
            zoom: 12
        });
        myMap.controls
            .add('zoomControl', { left: 5, bottom: 5 })
            .add('typeSelector')
            .add('searchControl', { top: 5, right: 100 })
            .add('mapTools', { left: 35, bottom: 5 });

        $.each($('.map__item'), function(i){
            var curElem = $(this);

            if (curElem.attr('data-coord')) {
                var coord = curElem.attr('data-coord').split(', ');

                myMap.geoObjects.add(new ymaps.Placemark(
                    [coord[0], coord[1]],
                    {   hintContent: "Описание",
                        balloonContentBody: curElem.find('a').text() }, {
                    }
                ));
            }
        });
    }
    ymaps.ready(init);

    });

});


var NiceSelect = function (obj) {
    //private properties
    var _self = this,
        _obj = obj;

    //private methods
    var _addEvents = function () {
            _obj.selectmenu()
                .selectmenu( "menuWidget" )
                .addClass( "overflow" );
        },
        _init = function () {
            _addEvents();
        };

    //public properties

    //public methods


    _init();
};

var Slider = function (obj) {

    //private properties
    var _self = this,
        _paginator = obj.find($('.slider__icon')),
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };
    if (_obj.hasClass('slider__wrap')) {
        var _swiperPromo = new Swiper(_obj, {
            slidesPerView: 1,
            autoplay: 15000,
            pagination: _paginator,
            nextButton: '.slider__next',
            prevButton: '.slider__prev',
            loop: true,
            paginationClickable: true
        });
    }

    if (_obj.hasClass('reviews__wrap')) {
        var _slider1 = new Swiper(_obj, {
            nextButton: '.reviews__next',
            prevButton: '.reviews__prev',
            autoplay: 10000,
            loop: true,
            paginationClickable: true

        });

    }

    //public properties

    //public methods

    _init();
};

var Tabs = function (obj) {

    var _obj = obj,
        _window = $(window),
        _body = $("body"),
        _tabBtn = _obj.find('.tabs__controls-wrap > div'),
        _tabBtnInner = _tabBtn.find('> span'),
        _tabContent = _obj.find('.tabs__wrapper'),
        _controls = _obj.find('.tabs__controls-wrap'),
        _tabContentItem = _tabContent.find('> div');

    var _addEvents = function () {

            _window.on({
                'load': function(){
                    _showContentWhenLoading();
                }
            });

            _tabBtnInner.on({
                mousedown: function(){
                    _tabContent.css({
                        'height': _tabContent.innerHeight()
                    }, 300);
                },
                mouseup: function(){
                    var curItem = $(this),
                        parent = curItem.parent(),
                        index = parent.index();
                    var activeContent = _tabContentItem.eq(index),
                        activeContentHeight = activeContent.innerHeight();
                    _tabContent.animate({
                        'height': activeContentHeight
                    }, 300);
                    setTimeout(function(){
                        _tabContent.css({
                            "height": ""
                        });
                    },400)
                },
                click: function(){
                    var curItem = $(this),
                        parent = curItem.parent(),
                        index = parent.index();
                    _tabBtn.removeClass("active");
                    _tabBtn.eq(index).addClass("active");
                    _showContent(index);
                    _controls.removeClass("active");
                }
            });

            _body.on({
                click: function(){
                    _controls.removeClass("active");
                }
            });

        },
        _showContentWhenLoading = function(){
            var index = _tabBtn.filter('.active').index();
            if ( index == "-1" ){
                index = 0;
                _tabBtn.eq(index).addClass("active");
            }
            _showContent(index);
        },
        _showContent = function(i){
            var activeContent = _tabContentItem.eq(i);
            _tabContentItem.css({
                "display": "none"
            });
            activeContent.css({
                "display": "block"
            });
        },
        _init = function () {
            _addEvents();
        };

    _init();
};


