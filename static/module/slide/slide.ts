///<<reference path="@types/jquery"/>

class Slide {
    el: any;
    config: any;
    private props: {
        init: boolean;
        time: number;
    };
    private on: {};
    private data: {
        index: number;
        next: number;
        prev: number;
        play: null | void;
        isPagination: any;
    };
    private move: null;
    constructor(el: any, config: any) {
        this.el = $(el);
        //传入数据
        this.props = {
            init: config.init || true,
            time: config.time || 3000
        };
        //事件
        this.on = {
            slideChangeStart: config.on && config.on.slideChangeStart || '',
            slideChangeEnd:  config.on && config.on.slideChangeEnd || ''
        };
        //内部数据
        this.data = {
            index: 0,
            next: 0,
            prev: 0,
            play: null,
            isPagination: this.el.find('.slide-pagination').length
        };
        //内部方法
        this.move = null;
        // 初始化
        this.initData();
    };
    initData (){
        const that = this;
        console.log(this);
        try {
            this.el.find('.slide-item').hide();
            this.el.find('.slide-item').eq(0).stop(true,false).show();

            //初始化按钮数量
            if(this.data.isPagination){
                for(let i = 0; i < that.el.find('.slide-item').length; i++){
                    that.el.find('.slide-pagination').append('<span class="slide-pagination-bullet" data-index="'+i+'"></span>');
                }
                that.el.find('.slide-pagination-bullet').eq(0).addClass('active');
            }

            if(this.props.init){
                // this.autoPlayer();
            }
        } catch (e) {
            console.log(e);
        }
    };
    initEvent (){
        const that = this;
        this.el.delegate('.slide-pagination-bullet', 'click', function(event:any) {
            // @ts-ignore
            that.slideChage.call(this, that);
        });
    };
    slideChage (that:any){
        const _this = $(this);
        const index = _this.attr('data-index');
        if(index === that.data.index){
            return;
        }

        if(that.on.slideChangeStart){
            that.on.slideChangeStart({index: +that.data.index + 1});
        }

        that.el.find('.slide-item').eq(that.data.index).stop(true,false).fadeOut();
        that.el.find('.slide-item').eq(index).stop(true,false).fadeIn();

        if(that.data.isPagination){
            that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');
            that.el.find('.slide-pagination-bullet').eq(index).addClass('active');
        }
        // @ts-ignore
        that.data.index = that.data.next = +index;

        if(that.on.slideChangeEnd){
            // @ts-ignore
            that.on.slideChangeEnd({index: +index + 1});
        }
    }
}

const test = new Slide('.box',{
    init: true
});