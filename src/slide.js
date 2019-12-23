!function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object"){
    module.exports = factory(
        // 传入 jquery ，支持使用 npm 方式或者自己定义jquery的路径
        require('jquery')
    );
  }else{
    factory(root.jQuery);
  }
}(typeof window !== 'undefined' ? window : this, function ($) {
  // 验证是否引用jquery
  if (!$ || !$.fn || !$.fn.jquery) {
    alert('在引用slide.js之前，先引用jQuery，否则无法使用 Slide');
    return;
  }

  /**
   * [Slide 轮播图插件]
   * author lichenglong
   * @param       {string} el     [容器]
   * @param       {{init: boolean, on: {slideChangeStart: on.slideChangeStart, slideChangeEnd: on.slideChangeEnd}}} config [配置项]
   * @constructor
   */
  function Slide(el,config){
    this.el = $(el);
    //传入数据
    this.props = {};
    this.props.init = config.init || true;
    this.props.time = config.time || 3000;        //默认轮播时间
    this.on = {};
    this.on.slideChangeStart = config.on.slideChangeStart || '';
    this.on.slideChangeEnd = config.on.slideChangeEnd || '';

    //内部数据
    this.data = {};
    this.data.index = 0;                          //当前图片序号
    this.data.next = 0;                           //上一张图片序号
    this.data.prev = 0;                           //下一张图片序号
    this.data.play = null;                        //
    this.data.isPagination = this.el.find('.slide-pagination').length;

    //内部方法
    this.move = null;

    this.initData();
  }
  Slide.prototype = {
    initData: function(){
      const that = this;
      try {
        this.el.find('.slide-item').hide();
        this.el.find('.slide-item').eq(0).stop(true,false).show();

        //初始化按钮数量
        if(this.data.isPagination){
          for(var i = 0; i < that.el.find('.slide-item').length; i++){
            that.el.find('.slide-pagination').append('<span class="slide-pagination-bullet" data-index="'+i+'"></span>');
          }
          that.el.find('.slide-pagination-bullet').eq(0).addClass('active');
        }

        if(this.props.init){
          this.autoPlayer();
        }

        this.initEvent();
      } catch (e) {

      }
    },
    initEvent: function(){
      const that = this;
      this.el.delegate('.slide-pagination-bullet', 'click', function(event) {
        that.slideChage.call(this, that);
      });
      this.el.on('mouseenter', function(event) {
        if(that.data.play){
          clearInterval(that.data.play);
          that.data.play = '';
          console.log('enter');
        }
      });
      this.el.on('mouseleave', function(event) {
        if(that.data.play){
          return;
        }
        that.data.play = setInterval(that.move,that.props.time);
        console.log('leave');
      });
    },
    autoPlayer: function(){
      const that = this;
      this.move = function(){
        if(that.on.slideChangeStart){
          that.on.slideChangeStart({index: that.data.index + 1});
        }

        that.data.next++;
        if(that.data.next >= that.el.find('.slide-item').length){
          that.data.next = 0;
        }
        that.el.find('.slide-item').eq(that.data.index).stop(true,false).fadeOut();
        that.el.find('.slide-item').eq(that.data.next).stop(true,false).fadeIn();

        if(that.data.isPagination){
          that.el.find('.slide-pagination-bullet').eq(that.data.index).removeClass('active');
          that.el.find('.slide-pagination-bullet').eq(that.data.next).addClass('active');
        }
        that.data.index = that.data.next;

        if(that.on.slideChangeEnd){
          that.on.slideChangeEnd({index: that.data.index + 1});
        }
      };
      clearInterval(that.data.play);       //创建定时器前先清除掉上一个定时器
      that.data.play = setInterval(that.move,that.props.time);
    },
    slideChage: function(that){
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

      that.data.index = that.data.next = +index;

      if(that.on.slideChangeEnd){
        that.on.slideChangeEnd({index: +index + 1});
      }
    }
  };

  window.Slide = Slide;
  return window.Slide;
});