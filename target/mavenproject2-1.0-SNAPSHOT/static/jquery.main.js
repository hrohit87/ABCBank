// page init
jQuery(function(){

    $('input, textarea').livequery(function(){
        $('input, textarea').placeholder({
            color:'#000000'
        });
    })
    
    initTabs();
    initCarousel();
    initLightbox();
    initAccordion();
    $('[title]').livequery(function(){
      
           
            jQuery(this).hoverTooltip({
                positionTypeX: 'center',
                positionTypeY: 'bottom',
                attribute:'title',
                extraOffsetX: 0,
                extraOffsetY: 33
            });
       
    }) 

     
    
    initExpandTextarea();
    initPopups();
    initNavFix();
    initBtnTop();
    initDropNav();
    initEditForm();
});
jQuery(window).load(function() {
    //initMasonry();
   //  jcf.customForms.replaceAll();
})

// init masinry
function initMasonry(){
    $('.columns-block').livequery(function(){
        refresh()
    })
    function refresh(){
        jQuery('.columns-block').each(function(){
            jQuery(this).masonry({
                itemSelector: '.col',
                isAnimated: true,
                isFitWidth: true,
                columnWidth : 1
            });
        });
    };
    refresh();
    if(jQuery(window).width() > 767){
        refresh();
    }
    jQuery(window).live('resize', function(){
        if(jQuery(window).width() > 767){
            refresh();
        }else {
            jQuery('.columns-block').each(function(){
                if(jQuery(this).hasClass('masonry')){
                    jQuery(this).masonry('destroy');
                    jQuery(this).removeAttr('style');
                }
            });
        }
    });
    
   /* jQuery('.columns-block').each(function(i, obj){
        var $container = jQuery(obj);
        $container.infinitescroll({
            navSelector  : '#page-nav',    // selector for the paged navigation
            nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
            itemSelector : '.col',     // selector for all items you'll retrieve
            loading: {
                finishedMsg: 'No more pages to load.',
                img: './images/loader.gif'
            },
            errorCallback: function(){

            }
        },
        // trigger Masonry as a callback
        function( newElements ) {
            // hide new items while they are loading
            var $newElems = $( newElements ).css({
                opacity: 0
            });
            // ensure that images load before adding to masonry layout
            $newElems.imagesLoaded(function(){
                // show elems now they're ready
                $newElems.animate({
                    opacity: 1
                });
                if(jQuery(window).width() > 767){
                    $container.masonry( 'appended', $newElems, true );
                }
                else {
                    $container.append($newElems);;
                }

            });
        }
        );
    }); */
    
    
}


// init edit form
function initEditForm(){
    $('.settings-form .row').livequery(function(){
        var editBlocks = jQuery('.settings-form .row');
        var editClass = 'editable';
        editBlocks.each(function(){
            var editBlock =jQuery(this);
            var editLink = editBlock.find('a.btn-edit');
            var cancelLink = editBlock.find('a.btn-cancel');
            var editText = editBlock.find('.edit-text');
            var editField = editBlock.find('.edit-field');
            var defVal = editField.find('input').attr('placeholder');

            editLink.bind('click', function(){
                editBlock.addClass(editClass);
            });
            cancelLink.bind('click', function(){
                editBlock.removeClass(editClass);
            });
        });
    })
    
}

//initDropNav
function initDropNav(){
    $('#nav').livequery(function(){
        var activeClass = 'active';
        var navs = jQuery('#nav');
        navs.each(function(){
            var nav = jQuery(this);
            var items = nav.find('>li:has(.drop)');
            items.each(function(){
                var item = jQuery(this);
                var drop = item.find('.drop');
                var btnOpen = item.find('>a');
                btnOpen.click(function(){
                    if(!item.hasClass(activeClass)){
                        items.removeClass(activeClass);
                        item.addClass(activeClass);
                    }
                    else{
                        item.removeClass(activeClass);
                    }
                    return false;
                });
            });
            jQuery('body').click(function(e){
                if(!jQuery(e.target).hasClass('.drop') || !jQuery(e.target).parents('.drop')) items.removeClass(activeClass);
            });
        });
    })
    
}

// button scroll top init
function initBtnTop() {
    var offset = 220;
    var win = jQuery(window);
    var fadeSpeed = 350;
    var slideSpeed = 1000;
    var slide = jQuery.browser.opera ? jQuery('html') : jQuery('html, body');
    $('a.btn-top').livequery(function(){
        jQuery('a.btn-top').each(function() {
            var btn = jQuery(this);
            function toggle() {
                if(win.scrollTop() >= offset) {
                    btn.fadeIn(fadeSpeed)
                }
                else {
                    btn.fadeOut(fadeSpeed)
                }
            }
            btn.click(function(e) {
                var block = jQuery(btn.attr('href'));
                if(block.length) {
                    slide.stop().animate({
                        scrollTop: block.offset().top
                    }, slideSpeed)
                    e.preventDefault();
                }
            })
            toggle();
            win.scroll(toggle);
        })
    })
    
}

// tabs init
function initTabs() {
    $('.tabset').livequery(function()
    {
        
        jQuery(this).contentTabs({
            effect: 'none'
        });
    });
}

// accordion init
function initAccordion() {
    
    $('.comments-box').livequery(function(){
        
        $('div#paginated-results').slideAccordion({
            activeClass:'expanded',
            opener:'.comments-box > a.opener',
            slider:'.comments-box > div.slide-box',
            animSpeed: 350
        });
    })
    
}

// expandable textarea init
function initExpandTextarea() {
    var holderActiveClass = 'parent-active';
    var textActiveClass = 'text-active';
    $('form.add-form div.area').livequery(function(){
        jQuery('form.add-form div.area').each(function() {
            var holder = jQuery(this);
            var textarea = holder.find('textarea');
            textarea.focus(function() {
                holder.addClass(holderActiveClass);
                textarea.addClass(textActiveClass);
            })
            jQuery('body').click(function(e) {
                var target = jQuery(e.target);
                if(!target.hasClass(holderActiveClass) && !target.parents('.' + holderActiveClass).length) {
                    holder.removeClass(holderActiveClass);
                    textarea.removeClass(textActiveClass);
                }
            })
        })
    })
    
}
 
// scroll gallery init
function initCarousel() {
    $('div.gallery').livequery(function(){
       
        jQuery('div.gallery').scrollGallery({
            mask: 'div.holder',
            slider: '>ul',
            slides: '>li',
            btnPrev: 'a.link-prev',
            btnNext: 'a.link-next',
            disableWhileAnimating: true,
            handleTouch: true
        });
    })
    $('ul#grabbed_images li').livequery(function(){

        jQuery('div.gallery').scrollGallery({
            mask: 'div.holder',
            slider: '>ul',
            slides: '>li',
            btnPrev: 'a.link-prev',
            btnNext: 'a.link-next',
            disableWhileAnimating: true,
            handleTouch: true
        });
    })
    $('div.item-gallery').livequery(function(){
        jQuery(this).gallery({
            duration: 700,
            slideElement:1,
            autoRotation: false,
            effect: false,
            listOfSlides: '.frame > ul > li',
            switcher: false,
            autoSwitcher: false,
            disableBtn: false,
            nextBtn: 'a.link-next',
            prevBtn: 'a.link-prev',
            circle: true,
            direction: false,
            event: 'click'
        });
    })
    $('div.img-gallery').livequery(function(){
        jQuery(this).scrollGallery({
            mask: 'div.img-gallery-mask',
            slider: '>ul',
            slides: '>li',
            activeClass:'active',
            currentNumber: '.current-num',
            totalNumber: '.total-num',
            autorotationActiveClass: 'autorotation-active',
            autorotationDisabledClass: 'autorotation-disabled',
            circularRotation: true,
            disableWhileAnimating: false,
            autoRotation: false,
            pauseOnHover: isTouchDevice ? false : true,
            maskAutoSize: false,
            switchTime: 4000,
            animSpeed: 600,
            event:'click'
        });
    })
    
}

// lightbox init
function initLightbox() {
    /*jQuery('a[data-rel*="lightbox"], a.btn-lightbox').each(function(){
		var link = jQuery(this);
		if(link.data('rel')) link.attr('rel', link.data('rel'));
		link.fancybox({
			padding: 0,
			overlayShow: true,
			showCloseButton:false,
			overlayOpacity: 0.35,
			overlayColor: '#000',
			onComplete: function(box) {
				if(link.attr('href').indexOf('#') === 0) {
					jQuery('#fancybox-content').find('a.close').unbind('click.fb').bind('click.fb', function(e){
						jQuery.fancybox.close();
						e.preventDefault();
					});
				}
			}
		});
	}); */

    // gallery in lightbox
    $("a[rel^='prettyPhoto']").livequery(function(){
        jQuery("a[rel^='prettyPhoto']").prettyPhoto({
            show_title: false,
            theme: 'pp_default',
            deeplinking: false
        });
    })
    
}

// circle gallery plugin
jQuery.fn.gallery = function(options) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    this.each(function(){
        if(this.galControl && typeof options === 'string') {
            if(typeof this.galControl[options] === 'function') {
                this.galControl[options].apply(this.galControl, args);
            }
        }
        else {
            this.galControl = new Gallery(this, options);
        }
    });
    return this;
};
function Gallery(context, options) { 
    this.init(context, options);
};
Gallery.prototype = {
    options:{},
    init: function (context, options){
        this.options = $.extend({
            duration: 700,
            slideElement:1,
            autoRotation: false,
            effect: false,
            listOfSlides: '.list > li',
            switcher: false,
            autoSwitcher: false,
            disableBtn: false,
            nextBtn: 'a.link-next, a.btn-next, a.next',
            prevBtn: 'a.link-prev, a.btn-prev, a.prev',
            circle: true,
            clone: false,
            direction: false,
            event: 'click'
        }, options || {});
        var self = this;
        this.context = $(context);
        this.els = this.context.find(this.options.listOfSlides);
        this.list = this.els.parent();
        this.count = this.els.length;
        this.autoRotation = this.options.autoRotation;
        this.direction = this.options.direction;
        this.duration = this.options.duration;
        if (this.options.clone) {
            this.list.append(this.els.clone());
            this.list.prepend(this.els.clone());
            this.els = this.context.find(this.options.listOfSlides);
        }
        this.wrap = this.list.parent();
        if (this.options.nextBtn) this.nextBtn = this.context.find(this.options.nextBtn);
        if (this.options.prevBtn) this.prevBtn = this.context.find(this.options.prevBtn);
        this.calcParams(this);
        if (this.options.autoSwitcher) {
            this.switcherHolder = this.context.find(this.options.switcher).empty();
            this.switchPattern = $('<ul class="'+ (this.options.autoSwitcher == true ? '' : this.options.autoSwitcher) +'"></ul>');
            for (var i=0;i<this.max+1;i++){
                $('<li><a href="#">'+i+'</a></li>').appendTo(this.switchPattern);
            }
            this.switchPattern.appendTo(this.switcherHolder);
            this.switcher = this.context.find(this.options.switcher).find('li');
            this.active = 0;
        }
        else {
            if (this.options.switcher) {
                this.switcher = this.context.find(this.options.switcher);
                this.active = this.switcher.index(this.switcher.filter('.active:eq(0)'));
            }
            else this.active = this.els.index(this.els.filter('.active:eq(0)'));
        }
        if (this.active < 0) this.active = 0;
        this.last = this.active;
        if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
        if (this.options.clone) this.active += this.count;
        if (this.options.effect) this.els.css({
            opacity: 0
        }).removeClass('active').eq(this.active).addClass('active').css({
            opacity: 1
        }).css('opacity', 'auto');
        else {
            if (this.direction) this.list.css({
                marginTop: -(this.mas[this.active])
            });
            else this.list.css({
                marginLeft: -(this.mas[this.active])
            });
        }
        if (this.options.nextBtn) this.initEvent(this, this.nextBtn,true);
        if (this.options.prevBtn) this.initEvent(this, this.prevBtn,false);
        this.initWindow(this,$(window));
        if (this.autoRotation) this.runTimer(this);
        if (this.options.switcher) this.initEventSwitcher(this, this.switcher);
        if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
    },
    calcParams: function(self){
        this.mas = [];
        this.sum = 0;
        this.max = this.count-1;
        this.width = 0;
        if (!this.options.effect) {
            this.els.each(function(){
                self.mas.push(self.width);self.width += self.direction?$(this).outerHeight(true):$(this).outerWidth(true);self.sum+=self.direction?$(this).outerHeight(true):$(this).outerWidth(true);
            });
            this.finish = this.direction?this.sum-this.wrap.outerHeight():this.sum-this.wrap.outerWidth();
            for (var i=0;i<this.count;i++){
                if (this.mas[i]>=this.finish) {
                    this.max = i;
                    break;
                }
            }
        }
    },
    changeSettings: function(set,val){
        this[set] = val;
    },
    fadeElement: function(){
        this.els.eq(this.last).animate({
            opacity:0
        }, {
            queue:false,
            duration: this.duration
        });
        this.els.removeClass('active').eq(this.active).addClass('active').animate({
            opacity:1
        }, {
            queue:false,
            duration: this.duration,
            complete: function(){
                $(this).css('opacity','auto');
            }
        });
        if (this.options.switcher) this.switcher.removeClass('active').eq(this.active).addClass('active');
        this.last = this.active;
    },
    scrollElement: function(f){
        if (this.direction) this.list.animate({
            marginTop: f ? -this.finish : -(this.mas[this.active])
        }, {
            queue:false,
            duration: this.duration
        });
        else this.list.animate({
            marginLeft: f ? -this.finish : -(this.mas[this.active])
        }, {
            queue:false,
            duration: this.duration
        });
        if (this.options.switcher) this.switcher.removeClass('active').eq(this.options.clone ? this.active < this.count ? this.active/this.options.slideElement : this.active >= this.count*2 ? (this.active - this.count*2)/this.options.slideElement : (this.active - this.count)/this.options.slideElement : this.active/this.options.slideElement).addClass('active');
    },
    runTimer: function($this){
        if($this._t) clearTimeout($this._t);
        $this._t = setInterval(function(){
            $this.nextStep();
        }, this.autoRotation);
    },
    initEventSwitcher: function($this, el){
        el.bind($this.options.event, function(){
            if (!$(this).hasClass('active')){
                $this.active = $this.switcher.index($(this)) * $this.options.slideElement;
                if ($this.options.clone) $this.active += $this.count;
                $this.initMove();
            }
            return false;
        });
    },
    initEvent: function($this, addEventEl, dir){
        addEventEl.bind($this.options.event, function(){
            if (dir) $this.nextStep();
            else $this.prevStep();
            if($this._t) clearTimeout($this._t);
            if ($this.autoRotation) $this.runTimer($this);
            return false;
        });
    },
    disableControls: function(){
        this.prevBtn.removeClass(this.options.disableBtn);
        this.nextBtn.removeClass(this.options.disableBtn);
        if (this.active>=this.max) this.nextBtn.addClass(this.options.disableBtn);
        if (this.active<=0) this.prevBtn.addClass(this.options.disableBtn);
    },
    initMove: function(){
        var f = false;
        if (this.active >= this.max && !this.options.clone) {
            f = true;
            this.active = this.max;
        }
        if(this._t) clearTimeout(this._t);
        if (!this.options.effect) this.scrollElement(f);
        else this.fadeElement();
        if (this.autoRotation) this.runTimer(this);
        if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
    },
    nextStep:function(){
        var f = false;
        this.active = this.active + this.options.slideElement;
        if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
        if (this.options.clone){
            if (this.active > this.count*2) {
                if (this.direction) this.list.css({
                    marginTop:-this.mas[this.count]
                });
                else this.list.css({
                    marginLeft:-this.mas[this.count]
                });
                this.active = this.count+this.options.slideElement;
            }
        }
        else {
            if (this.active >= this.max) {
                if (this.options.circle) {
                    if (this.active > this.max) this.active = 0;
                    else {
                        this.active = this.max;
                        f = true
                    }
                }
                else {
                    this.active = this.max;
                    f = true;
                }
            }
        }
        if (!this.options.effect) this.scrollElement(f);
        else this.fadeElement();
    },
    prevStep: function(){
        var f = false;
        this.active = this.active - this.options.slideElement;
        if (this.options.disableBtn && !this.options.circle && !this.options.clone) this.disableControls();
        if (this.options.clone){
            if (this.active < 0) {
                if (this.direction) this.list.css({
                    marginTop:-this.mas[this.count]
                });
                else this.list.css({
                    marginLeft:-this.mas[this.count]
                });
                this.active = this.count-1;
            }
        }
        else {
            if (this.active < 0) {
                if (this.options.circle) {
                    this.active = this.max;
                    f = true;
                }
                else this.active = 0;
            }
        }
        if (!this.options.effect) this.scrollElement(f);
        else this.fadeElement();
    },
    initWindow: function($this,$window){
        $window.focus($.proxy(this.play,this));
        $window.blur($.proxy(this.stop,this));
    },
    stop: function(){
        if (this._t) clearTimeout(this._t);
    },
    play: function(){
        if (this._t) clearTimeout(this._t);
        if (this.autoRotation) this.runTimer(this);
    }
}




/*! http://mths.be/placeholder v2.0.6 by @mathias */
;(function(window, document, $) {

    var isInputSupported = 'placeholder' in document.createElement('input'),
    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
    prototype = $.fn,
    valHooks = $.valHooks,
    hooks,
    placeholder;
    if(navigator.userAgent.indexOf('Opera/') != -1) {
        isInputSupported = isTextareaSupported = false;
    }
    if (isInputSupported && isTextareaSupported) {

        placeholder = prototype.placeholder = function() {
            return this;
        };

        placeholder.input = placeholder.textarea = true;

    } else {

        placeholder = prototype.placeholder = function() {
            var $this = this;
            $this
            .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
            .not('.placeholder')
            .bind({
                'focus.placeholder': clearPlaceholder,
                'blur.placeholder': setPlaceholder
            })
            .data('placeholder-enabled', true)
            .trigger('blur.placeholder');
            return $this;
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {
                var $element = $(element);
                return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
            },
            'set': function(element, value) {
                var $element = $(element);
                if (!$element.data('placeholder-enabled')) {
                    return element.value = value;
                }
                if (value == '') {
                    element.value = value;
                    // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                    if (element != document.activeElement) {
                        // We can’t use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }
                } else if ($element.hasClass('placeholder')) {
                    clearPlaceholder.call(element, true, value) || (element.value = value);
                } else {
                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        isInputSupported || (valHooks.input = hooks);
        isTextareaSupported || (valHooks.textarea = hooks);

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                // Clear the placeholder values so they don’t get submitted
                //		var $inputs = $('.placeholder', this).each(clearPlaceholder);
                //			setTimeout(function() {
                //					$inputs.each(setPlaceholder);
                //		}, 10);
                });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.placeholder').each(function() {
                this.value = '';
            });
        });

    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {},
        rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        var input = this,
        $input = $(input),
        hadFocus;
        if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
            hadFocus = input == document.activeElement;
                        
            if ($input.data('placeholder-password')) {
                $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    return $input[0].value = value;
                }
                $input.focus();
            } else {
                input.value = '';
                $input.removeClass('placeholder');
                $input.css('color','black')
                                
            }
            hadFocus && input.select();
        }
               
        $(event.target).css('color','#000000');
    }

    function setPlaceholder() {
           
        var $replacement,
        input = this,
        $input = $(input),
        $origInput = $input,
        id = this.id;
        if (input.value == '') {
            if (input.type == 'password') {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({
                            'type': 'text'
                        });
                    } catch(e) {
                        $replacement = $('<input>').attr($.extend(args(this), {
                            'type': 'text'
                        }));
                    }
                    $replacement
                    .removeAttr('name')
                    .data({
                        'placeholder-password': true,
                        'placeholder-id': id
                    })
                    .bind('focus.placeholder', clearPlaceholder);
                    $input
                    .data({
                        'placeholder-textinput': $replacement,
                        'placeholder-id': id
                    })
                    .before($replacement);
                }
                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
            // Note: `$input[0] != input` now!
            }
            $input.addClass('placeholder');
            $input[0].value = $input.attr('placeholder');
        } else {
            $input.removeClass('placeholder');
        }
    }

}(this, document, jQuery));



/*
 * jQuery Tooltip plugin
 */
;(function($){
    $.fn.hoverTooltip = function(o) {
        var options = $.extend({
            tooltipStructure: '<div class="hover-tooltip"><div class="tooltip-text"></div></div>',
            tooltipSelector: '.tooltip-text',
            positionTypeX: 'right',
            positionTypeY: 'top',
            attribute:'title',
            extraOffsetX: 10,
            extraOffsetY: 10,
            showOnTouchDevice: true
        },o);
		
        // create tooltip
        var tooltip = $('<div>').html(options.tooltipStructure).children().css({
            position:'absolute'
        });
        var tooltipTextBox = tooltip.find(options.tooltipSelector);
        var tooltipWidth, tooltipHeight;
		
		
        // tooltip logic
        function initTooltip(item) {
            var tooltipText = item.attr(options.attribute);
          
            item.removeAttr(options.attribute);
            if(isTouchDevice) {
                item.bind('touchstart', function(e) {
                    showTooltip(item, tooltipText, getEvent(e));
                    jQuery(document).one('touchend', hideTooltip);
                });
            } else {
                item.bind('mouseenter', function(e) {
                    showTooltip(item, tooltipText, e);
                }).bind('mouseleave', hideTooltip).bind('mousedown', hideTooltip).bind('mousemove', moveTooltip);
            }
        }
        function showTooltip(item, text, e) {
            tooltipTextBox.html(text);
              $('.hover-tooltip').remove();
            tooltip.appendTo(document.body).show();
            tooltipWidth = tooltip.outerWidth(true);
            tooltipHeight = tooltip.outerHeight(true);
            moveTooltip(e, item);
        }
        function hideTooltip() {
            tooltip.remove();
        }
        function moveTooltip(e) {
            ;
            var top, left, x = e.pageX, y = e.pageY;

            switch(options.positionTypeY) {
                case 'top':
                    top = y - tooltipHeight - options.extraOffsetY;
                    break;
                case 'center':
                    top = y - tooltipHeight / 2;
                    break;
                case 'bottom':
                    top = y + options.extraOffsetY;
                    break;
            }

            switch(options.positionTypeX) {
                case 'left':
                    left = x - tooltipWidth - options.extraOffsetX;
                    break;
                case 'center':
                    left = x - tooltipWidth / 2;
                    break;
                case 'right':
                    left = x + options.extraOffsetX;
                    break;
            }
			
            tooltip.css({
                top: top,
                left: left
            });
        }
		
        // add handlers
        return this.each(function(){
            initTooltip($(this));
        });
    }
	
    // parse event
    function getEvent(e) {
        return e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
    }
	
    // detect device type
    var isTouchDevice = (function() {
        try {
            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        } catch (e) {
            return false;
        }
    }());
	
}(jQuery));
// detect device type
var isTouchDevice = (function() {
    try {
        return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    } catch (e) {
        return false;
    }
}());

/*
 * jQuery Tabs plugin
 */
(function($){
    $.fn.contentTabs = function(o){
        // default options
        var options = $.extend({
            activeClass:'active',
            addToParent:false,
            autoHeight:false,
            autoRotate:false,
            animSpeed:400,
            switchTime:3000,
            effect: 'none', // "fade", "slide"
            tabLinks:'a',
            event:'click'
        },o);

        return this.each(function(){
            var tabset = $(this);
            var tabLinks = tabset.find(options.tabLinks);
            var tabLinksParents = tabLinks.parent();
            var prevActiveLink = tabLinks.eq(0), currentTab, animating;
            var tabHolder;
			
            // init tabLinks
            tabLinks.each(function(){
                var link = $(this);
                var href = link.attr('href');
                var parent = link.parent();
                href = href.substr(href.lastIndexOf('#'));
				
                // get elements
                var tab = $(href);
                link.data('cparent', parent);
                link.data('ctab', tab);
				
                // find tab holder
                if(!tabHolder && tab.length) {
                    tabHolder = tab.parent();
                }
				
                // show only active tab
                if((options.addToParent ? parent : link).hasClass(options.activeClass)) {
                    prevActiveLink = link; currentTab = tab;
                    contentTabsEffect[options.effect].show({
                        tab:tab,
                        fast:true
                    });
                } else {
                    contentTabsEffect[options.effect].hide({
                        tab:tab,
                        fast:true
                    });
                }
				
                // event handler
                link.bind(options.event, function(e){
                    if(link != prevActiveLink && !animating) {
                        switchTab(prevActiveLink, link);
                        prevActiveLink = link;
                    }
                    e.preventDefault();
                });
                if(options.event !== 'click') {
                    link.bind('click', function(e){
                        e.preventDefault();
                    });
                }
            });
			
            // tab switch function
            function switchTab(oldLink, newLink) {
                animating = true;
                var oldTab = oldLink.data('ctab');
                var newTab = newLink.data('ctab');
                currentTab = newTab;
				
                // refresh pagination links
                (options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
                (options.addToParent ? newLink.data('cparent') : newLink).addClass(options.activeClass);
				
                // hide old tab
                resizeHolder(oldTab, true);
                contentTabsEffect[options.effect].hide({
                    speed: options.animSpeed,
                    tab:oldTab,
                    complete: function() {
                        // show current tab
                        resizeHolder(newTab);
                        contentTabsEffect[options.effect].show({
                            speed: options.animSpeed,
                            tab:newTab,
                            complete: function() {
                                animating = false;
                                resizeHolder(newTab, false);
                                autoRotate();
                            }
                        });
                    }
                });
            }
			
            // holder auto height
            function resizeHolder(block, state) {
                var curBlock = block && block.length ? block : currentTab;
                if(options.autoHeight && curBlock) {
                    tabHolder.stop();
                    if(state === false) {
                        tabHolder.css({
                            height:''
                        });
                    } else {
                        var origStyles = curBlock.attr('style');
                        curBlock.show().css({
                            width:curBlock.width()
                        });
                        var tabHeight = curBlock.outerHeight(true);
                        if(!origStyles) curBlock.removeAttr('style'); else curBlock.attr('style', origStyles);
                        if(state === true) {
                            tabHolder.css({
                                height: tabHeight
                            });
                        } else {
                            tabHolder.animate({
                                height: tabHeight
                            }, {
                                duration: options.animSpeed
                            });
                        }
                    }
                }
            }
            if(options.autoHeight) {
                $(window).bind('resize orientationchange', function(){
                    resizeHolder(currentTab, false);
                });
            }
			
            // autorotation handling
            var rotationTimer;
            function nextTab() {
                var activeItem = (options.addToParent ? tabLinksParents : tabLinks).filter('.' + options.activeClass);
                var activeIndex = (options.addToParent ? tabLinksParents : tabLinks).index(activeItem);
                var newLink = tabLinks.eq(activeIndex < tabLinks.length - 1 ? activeIndex + 1 : 0);
                prevActiveLink = tabLinks.eq(activeIndex);
                switchTab(prevActiveLink, newLink);
            }
            function autoRotate() {
                if(options.autoRotate && tabLinks.length > 1) {
                    clearTimeout(rotationTimer);
                    rotationTimer = setTimeout(nextTab, options.switchTime);
                }
            }
            autoRotate();
        });
    }
	
    // tab switch effects
    var contentTabsEffect = {
        none: {
            show: function(o) {
                o.tab.css({
                    display:'block'
                });
                if(o.complete) o.complete();
            },
            hide: function(o) {
                o.tab.css({
                    display:'none'
                });
                if(o.complete) o.complete();
            }
        },
        fade: {
            show: function(o) {
                if(o.fast) o.speed = 1;
                o.tab.fadeIn(o.speed);
                if(o.complete) setTimeout(o.complete, o.speed);
            },
            hide: function(o) {
                if(o.fast) o.speed = 1;
                o.tab.fadeOut(o.speed);
                if(o.complete) setTimeout(o.complete, o.speed);
            }
        },
        slide: {
            show: function(o) {
                var tabHeight = o.tab.show().css({
                    width:o.tab.width()
                }).outerHeight(true);
                var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
                tmpWrap.css({
                    width:'100%',
                    overflow:'hidden',
                    position:'relative'
                }); o.tab.css({
                    marginTop:-tabHeight,
                    display:'block'
                });
                if(o.fast) o.speed = 1;
                o.tab.animate({
                    marginTop: 0
                }, {
                    duration: o.speed,
                    complete: function(){
                        o.tab.css({
                            marginTop: '',
                            width: ''
                        }).insertBefore(tmpWrap);
                        tmpWrap.remove();
                        if(o.complete) o.complete();
                    }
                });
            },
            hide: function(o) {
                var tabHeight = o.tab.show().css({
                    width:o.tab.width()
                }).outerHeight(true);
                var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
                tmpWrap.css({
                    width:'100%',
                    overflow:'hidden',
                    position:'relative'
                });
				
                if(o.fast) o.speed = 1;
                o.tab.animate({
                    marginTop: -tabHeight
                }, {
                    duration: o.speed,
                    complete: function(){
                        o.tab.css({
                            display:'none',
                            marginTop:'',
                            width:''
                        }).insertBefore(tmpWrap);
                        tmpWrap.remove();
                        if(o.complete) o.complete();
                    }
                });
            }
        }
    }
}(jQuery));

function initGallery()
{
    /*
 * jQuery Carousel plugin
 */
    ;(function($){
        function ScrollGallery(options) {
            this.options = $.extend({
                mask: 'div.mask',
                slider: '>*',
                slides: '>*',
                activeClass:'active',
                disabledClass:'disabled',
                btnPrev: 'a.btn-prev',
                btnNext: 'a.btn-next',
                generatePagination: false,
                pagerList: '<ul>',
                pagerListItem: '<li><a href="#"></a></li>',
                pagerListItemText: 'a',
                pagerLinks: '.pagination li',
                currentNumber: 'span.current-num',
                totalNumber: 'span.total-num',
                btnPlay: '.btn-play',
                btnPause: '.btn-pause',
                btnPlayPause: '.btn-play-pause',
                autorotationActiveClass: 'autorotation-active',
                autorotationDisabledClass: 'autorotation-disabled',
                circularRotation: true,
                disableWhileAnimating: false,
                autoRotation: false,
                pauseOnHover: isTouchDevice ? false : true,
                maskAutoSize: false,
                switchTime: 4000,
                animSpeed: 600,
                event:'click',
                swipeGap: false,
                swipeThreshold: 50,
                handleTouch: true,
                vertical: false,
                useTranslate3D: false,
                step: false
            }, options);
            this.init();
        }
        ScrollGallery.prototype = {
            init: function() {
                if(this.options.holder) {
                    this.findElements();
                    this.attachEvents();
                    this.refreshPosition();
                    this.refreshState(true);
                    this.resumeRotation();
                    this.makeCallback('onInit', this);
                }
            },
            findElements: function() {
                // define dimensions proporties
                this.fullSizeFunction = this.options.vertical ? 'outerHeight' : 'outerWidth';
                this.innerSizeFunction = this.options.vertical ? 'height' : 'width';
                this.slideSizeFunction = 'outerHeight';
                this.maskSizeProperty = 'height';
                this.animProperty = this.options.vertical ? 'marginTop' : 'marginLeft';
                this.swipeProperties = this.options.vertical ? ['up', 'down'] : ['left', 'right'];
			
                // control elements
                this.gallery = $(this.options.holder);
                this.mask = this.gallery.find(this.options.mask);
                this.slider = this.mask.find(this.options.slider);
                this.slides = this.slider.find(this.options.slides);
                this.btnPrev = this.gallery.find(this.options.btnPrev);
                this.btnNext = this.gallery.find(this.options.btnNext);
                this.currentStep = 0; this.stepsCount = 0;
			
                // get start index
                if(this.options.step === false) {
                    var activeSlide = this.slides.filter('.'+this.options.activeClass);
                    if(activeSlide.length) {
                        this.currentStep = this.slides.index(activeSlide);
                    }
                }
			
                // calculate offsets
                this.calculateOffsets();
                $(window).bind('resize orientationchange', $.proxy(this.onWindowResize, this));
			
                // create gallery pagination
                if(typeof this.options.generatePagination === 'string') {
                    this.pagerLinks = $();
                    this.buildPagination();
                } else {
                    this.pagerLinks = this.gallery.find(this.options.pagerLinks);
                    this.attachPaginationEvents();
                }
			
                // autorotation control buttons
                this.btnPlay = this.gallery.find(this.options.btnPlay);
                this.btnPause = this.gallery.find(this.options.btnPause);
                this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);
			
                // misc elements
                this.curNum = this.gallery.find(this.options.currentNumber);
                this.allNum = this.gallery.find(this.options.totalNumber);
            },
            attachEvents: function() {
                this.btnPrev.bind(this.options.event, this.bindScope(function(e){
                    this.prevSlide();
                    e.preventDefault();
                }));
                this.btnNext.bind(this.options.event, this.bindScope(function(e){
                    this.nextSlide();
                    e.preventDefault();
                }));
			
                // pause on hover handling
                if(this.options.pauseOnHover) {
                    this.gallery.hover(this.bindScope(function(){
                        if(this.options.autoRotation) {
                            this.galleryHover = true;
                            this.pauseRotation();
                        }
                    }), this.bindScope(function(){
                        if(this.options.autoRotation) {
                            this.galleryHover = false;
                            this.resumeRotation();
                        }
                    }));
                }
			
                // autorotation buttons handler
                this.btnPlay.bind(this.options.event, this.bindScope(this.startRotation));
                this.btnPause.bind(this.options.event, this.bindScope(this.stopRotation));
                this.btnPlayPause.bind(this.options.event, this.bindScope(function(){
                    if(!this.gallery.hasClass(this.options.autorotationActiveClass)) {
                        this.startRotation();
                    } else {
                        this.stopRotation();
                    }
                }));
			
                // swipe event handling
                if(isTouchDevice) {
                    // enable hardware acceleration
                    if(this.options.useTranslate3D) {
                        this.slider.css({
                            '-webkit-transform': 'translate3d(0px, 0px, 0px)'
                        });
                    }
				
                    // swipe gestures
                    if(this.options.handleTouch && $.fn.swipe) {
                        this.mask.swipe({
                            threshold: this.options.swipeThreshold,
                            allowPageScroll: 'vertical',
                            swipeStatus: $.proxy(function(e, phase, direction, distance) {
                                if(phase === 'start') {
                                    this.originalOffset = parseInt(this.slider.stop(true, false).css(this.animProperty));
                                } else if(phase === 'move') {
                                    if(direction === this.swipeProperties[0] || direction === this.swipeProperties[1]) {
                                        var tmpOffset = this.originalOffset + distance * (direction === this.swipeProperties[0] ? -1 : 1);
                                        if(!this.options.swipeGap) {
                                            tmpOffset = Math.max(Math.min(0, tmpOffset), this.maxOffset);
                                        }
                                        this.tmpProps = {};
                                        this.tmpProps[this.animProperty] = tmpOffset;
                                        this.slider.css(this.tmpProps);
                                        e.preventDefault();
                                    }
                                } else if(phase === 'cancel') {
                                    // return to previous position
                                    this.switchSlide();
                                }
                            },this),
                            swipe: $.proxy(function(event, direction) {
                                if(direction === this.swipeProperties[0]) {
                                    if(this.currentStep === this.stepsCount - 1) this.switchSlide();
                                    else this.nextSlide();
                                } else if(direction === this.swipeProperties[1]) {
                                    if(this.currentStep === 0) this.switchSlide();
                                    else this.prevSlide();
                                }
                            },this)
                        });
                    }
                }
            },
            onWindowResize: function() {
                if(!this.galleryAnimating) {
                    this.calculateOffsets();
                    this.refreshPosition();
                    this.buildPagination();
                    this.refreshState();
                    this.resizeQueue = false;
                } else {
                    this.resizeQueue = true;
                }
            },
            refreshPosition: function() {
                this.currentStep = Math.min(this.currentStep, this.stepsCount - 1);
                this.tmpProps = {};
                this.tmpProps[this.animProperty] = this.getStepOffset();
                this.slider.stop().css(this.tmpProps);
            },
            calculateOffsets: function() {
                this.maskSize = this.mask[this.innerSizeFunction]();
                this.sumSize = this.getSumSize();
                this.maxOffset = this.maskSize - this.sumSize;
			
                // vertical gallery with single size step custom behavior
                if(this.options.vertical && this.options.maskAutoSize) {
                    this.options.step = 1;
                    this.stepsCount = this.slides.length;
                    this.stepOffsets = [0];
                    var tmpOffset = 0;
                    for(var i = 0; i < this.slides.length; i++) {
                        tmpOffset -= $(this.slides[i])[this.fullSizeFunction](true);
                        this.stepOffsets.push(tmpOffset);
                    }
                    this.maxOffset = tmpOffset;
                    return;
                }
			
                // scroll by slide size
                if(typeof this.options.step === 'number' && this.options.step > 0) {
                    this.slideDimensions = [];
                    this.slides.each($.proxy(function(ind, obj){
                        this.slideDimensions.push( $(obj)[this.fullSizeFunction](true) );
                    },this));
				
                    // calculate steps count
                    this.stepOffsets = [0];
                    this.stepsCount = 1;
                    var tmpOffset = 0, tmpStep = 0;
                    while(tmpOffset > this.maxOffset) {
                        tmpOffset -= this.getSlideSize(tmpStep, tmpStep + this.options.step);
                        tmpStep += this.options.step;
                        this.stepOffsets.push(Math.max(tmpOffset, this.maxOffset));
                        this.stepsCount++;
                    }
                }
                // scroll by mask size
                else {
                    // define step size
                    this.stepSize = this.maskSize;
				
                    // calculate steps count
                    this.stepsCount = 1;
                    var tmpOffset = 0;
                    while(tmpOffset > this.maxOffset) {
                        tmpOffset -= this.stepSize;
                        this.stepsCount++;
                    }
                }
            },
            getSumSize: function() {
                var sum = 0;
                this.slides.each($.proxy(function(ind, obj){
                    sum += $(obj)[this.fullSizeFunction](true);
                },this));
                this.slider.css(this.innerSizeFunction, sum);
                return sum;
            },
            getStepOffset: function(step) {
                step = step || this.currentStep;
                if(typeof this.options.step === 'number') {
                    return this.stepOffsets[this.currentStep];
                } else {
                    return Math.max(-this.currentStep * this.stepSize, this.maxOffset);
                }
            },
            getSlideSize: function(i1, i2) {
                var sum = 0;
                for(var i = i1; i < Math.min(i2, this.slideDimensions.length); i++) {
                    sum += this.slideDimensions[i];
                }
                return sum;
            },
            buildPagination: function() {
                if(typeof this.options.generatePagination === 'string') {
                    this.pagerHolder = this.gallery.find(this.options.generatePagination);
                    if(this.pagerHolder.length) {
                        this.pagerHolder.empty();
                        this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
                        for(var i = 0; i < this.stepsCount; i++) {
                            $(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
                        }
                        this.pagerLinks = this.pagerList.children();
                        this.attachPaginationEvents();
                    }
                }
            },
            attachPaginationEvents: function() {
                this.pagerLinks.each(this.bindScope(function(ind, obj){
                    $(obj).bind(this.options.event, this.bindScope(function(){
                        this.numSlide(ind);
                        return false;
                    }));
                }));
            },
            prevSlide: function() {
                if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                    if(this.currentStep > 0) {
                        this.currentStep--;
                        this.switchSlide();
                    } else if(this.options.circularRotation) {
                        this.currentStep = this.stepsCount - 1;
                        this.switchSlide();
                    }
                }
            },
            nextSlide: function(fromAutoRotation) {
                if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
                    if(this.currentStep < this.stepsCount - 1) {
                        this.currentStep++;
                        this.switchSlide();
                    } else if(this.options.circularRotation || fromAutoRotation === true) {
                        this.currentStep = 0;
                        this.switchSlide();
                    }
                }
            },
            numSlide: function(c) {
                if(this.currentStep != c) {
                    this.currentStep = c;
                    this.switchSlide();
                }
            },
            switchSlide: function() {
                this.galleryAnimating = true;
                this.tmpProps = {}
                this.tmpProps[this.animProperty] = this.getStepOffset();
                this.slider.stop().animate(this.tmpProps,{
                    duration: this.options.animSpeed,
                    complete: this.bindScope(function(){
                        // animation complete
                        this.galleryAnimating = false;
                        if(this.resizeQueue) {
                            this.onWindowResize();
                        }
				
                        // onchange callback
                        this.makeCallback('onChange', this);
                        this.autoRotate();
                    })
                });
                this.refreshState();
			
                // onchange callback
                this.makeCallback('onBeforeChange', this);
            },
            refreshState: function(initial) {
                if(this.options.step === 1 || this.stepsCount === this.slides.length) {
                    this.slides.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
                }
                this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentStep).addClass(this.options.activeClass);
                this.curNum.html(this.currentStep+1);
                this.allNum.html(this.stepsCount);
			
                // initial refresh
                if(this.options.maskAutoSize && typeof this.options.step === 'number') {
                    this.tmpProps = {};
                    this.tmpProps[this.maskSizeProperty] = this.slides.eq(Math.min(this.currentStep,this.slides.length-1))[this.slideSizeFunction](true);
                    this.mask.stop()[initial ? 'css' : 'animate'](this.tmpProps);
                }
			
                // disabled state
                if(!this.options.circularRotation) {
                    this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
                    if(this.currentStep === 0) this.btnPrev.addClass(this.options.disabledClass);
                    if(this.currentStep === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
                }
            },
            startRotation: function() {
                this.options.autoRotation = true;
                this.galleryHover = false;
                this.autoRotationStopped = false;
                this.resumeRotation();
            },
            stopRotation: function() {
                this.galleryHover = true;
                this.autoRotationStopped = true;
                this.pauseRotation();
            },
            pauseRotation: function() {
                this.gallery.addClass(this.options.autorotationDisabledClass);
                this.gallery.removeClass(this.options.autorotationActiveClass);
                clearTimeout(this.timer);
            },
            resumeRotation: function() {
                if(!this.autoRotationStopped) {
                    this.gallery.addClass(this.options.autorotationActiveClass);
                    this.gallery.removeClass(this.options.autorotationDisabledClass);
                    this.autoRotate();
                }
            },
            autoRotate: function() {
                clearTimeout(this.timer);
                if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
                    this.timer = setTimeout(this.bindScope(function(){
                        this.nextSlide(true);
                    }), this.options.switchTime);
                } else {
                    this.pauseRotation();
                }
            },
            bindScope: function(func, scope) {
                return $.proxy(func, scope || this);
            },
            makeCallback: function(name) {
                if(typeof this.options[name] === 'function') {
                    var args = Array.prototype.slice.call(arguments);
                    args.shift();
                    this.options[name].apply(this, args);
                }
            }
        }
	
        // detect device type
        var isTouchDevice = (function() {
            try {
                return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
            } catch (e) {
                return false;
            }
        }());
	
        // jquery plugin
        $.fn.scrollGallery = function(opt){
            return this.each(function(){
                $(this).data('ScrollGallery', new ScrollGallery($.extend(opt,{
                    holder:this
                })));
            });
        }
    }(jQuery));

}

initGallery();

/*
 * touchSwipe - jQuery Plugin
 * http://plugins.jquery.com/project/touchSwipe
 * http://labs.skinkers.com/touchSwipe/
 *
 * Copyright (c) 2010 Matt Bryson (www.skinkers.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * $version: 1.2.5
 */
;(function(a){
    a.fn.swipe=function(c){
        if(!this){
            return false
        }var k={
            fingers:1,
            threshold:75,
            swipe:null,
            swipeLeft:null,
            swipeRight:null,
            swipeUp:null,
            swipeDown:null,
            swipeStatus:null,
            click:null,
            triggerOnTouchEnd:true,
            allowPageScroll:"auto"
        };var m="left";var l="right";var d="up";var s="down";var j="none";var u="horizontal";var q="vertical";var o="auto";var f="start";var i="move";var h="end";var n="cancel";var t="ontouchstart" in window,b=t?"touchstart":"mousedown",p=t?"touchmove":"mousemove",g=t?"touchend":"mouseup",r="touchcancel";var e="start";if(c.allowPageScroll==undefined&&(c.swipe!=undefined||c.swipeStatus!=undefined)){
            c.allowPageScroll=j
        }if(c){
            a.extend(k,c)
        }return this.each(function(){
            var D=this;var H=a(this);var E=null;var I=0;var x={
                x:0,
                y:0
            };var A={
                x:0,
                y:0
            };var K={
                x:0,
                y:0
            };function z(N){
                var M=t?N.touches[0]:N;e=f;if(t){
                    I=N.touches.length
                }distance=0;direction=null;if(I==k.fingers||!t){
                    x.x=A.x=M.pageX;x.y=A.y=M.pageY;if(k.swipeStatus){
                        y(N,e)
                    }
                }else{
                    C(N)
                }D.addEventListener(p,J,false);D.addEventListener(g,L,false)
            }function J(N){
                if(e==h||e==n){
                    return
                }var M=t?N.touches[0]:N;A.x=M.pageX;A.y=M.pageY;direction=v();if(t){
                    I=N.touches.length
                }e=i;G(N,direction);if(I==k.fingers||!t){
                    distance=B();if(k.swipeStatus){
                        y(N,e,direction,distance)
                    }if(!k.triggerOnTouchEnd){
                        if(distance>=k.threshold){
                            e=h;y(N,e);C(N)
                        }
                    }
                }else{
                    e=n;y(N,e);C(N)
                }
            }function L(M){
                M.preventDefault();distance=B();direction=v();if(k.triggerOnTouchEnd){
                    e=h;if((I==k.fingers||!t)&&A.x!=0){
                        if(distance>=k.threshold){
                            y(M,e);C(M)
                        }else{
                            e=n;y(M,e);C(M)
                        }
                    }else{
                        e=n;y(M,e);C(M)
                    }
                }else{
                    if(e==i){
                        e=n;y(M,e);C(M)
                    }
                }D.removeEventListener(p,J,false);D.removeEventListener(g,L,false)
            }function C(M){
                I=0;x.x=0;x.y=0;A.x=0;A.y=0;K.x=0;K.y=0
            }function y(N,M){
                if(k.swipeStatus){
                    k.swipeStatus.call(H,N,M,direction||null,distance||0)
                }if(M==n){
                    if(k.click&&(I==1||!t)&&(isNaN(distance)||distance==0)){
                        k.click.call(H,N,N.target)
                    }
                }if(M==h){
                    if(k.swipe){
                        k.swipe.call(H,N,direction,distance)
                    }switch(direction){
                        case m:if(k.swipeLeft){
                            k.swipeLeft.call(H,N,direction,distance)
                        }break;case l:if(k.swipeRight){
                            k.swipeRight.call(H,N,direction,distance)
                        }break;case d:if(k.swipeUp){
                            k.swipeUp.call(H,N,direction,distance)
                        }break;case s:if(k.swipeDown){
                            k.swipeDown.call(H,N,direction,distance)
                        }break
                    }
                }
            }function G(M,N){
                if(k.allowPageScroll==j){
                    M.preventDefault()
                }else{
                    var O=k.allowPageScroll==o;switch(N){
                        case m:if((k.swipeLeft&&O)||(!O&&k.allowPageScroll!=u)){
                            M.preventDefault()
                        }break;case l:if((k.swipeRight&&O)||(!O&&k.allowPageScroll!=u)){
                            M.preventDefault()
                        }break;case d:if((k.swipeUp&&O)||(!O&&k.allowPageScroll!=q)){
                            M.preventDefault()
                        }break;case s:if((k.swipeDown&&O)||(!O&&k.allowPageScroll!=q)){
                            M.preventDefault()
                        }break
                    }
                }
            }function B(){
                return Math.round(Math.sqrt(Math.pow(A.x-x.x,2)+Math.pow(A.y-x.y,2)))
            }function w(){
                var P=x.x-A.x;var O=A.y-x.y;var M=Math.atan2(O,P);var N=Math.round(M*180/Math.PI);if(N<0){
                    N=360-Math.abs(N)
                }return N
            }function v(){
                var M=w();if((M<=45)&&(M>=0)){
                    return m
                }else{
                    if((M<=360)&&(M>=315)){
                        return m
                    }else{
                        if((M>=135)&&(M<=225)){
                            return l
                        }else{
                            if((M>45)&&(M<135)){
                                return s
                            }else{
                                return d
                            }
                        }
                    }
                }
            }try{
                this.addEventListener(b,z,false);this.addEventListener(r,C)
            }catch(F){}
        })
    }
})(jQuery);

/* Fancybox overlay fix */
jQuery(function(){
    // detect device type
    var isTouchDevice = (function() {
        try {
            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        } catch (e) {
            return false;
        }
    }());

    // fix options
    var supportPositionFixed = !( ($.browser.msie && $.browser.version < 9) || isTouchDevice );
    var overlaySelector = '#fancybox-overlay';
	
    if(supportPositionFixed) {
        // create <style> rules
        var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        rules = document.createTextNode(overlaySelector+'{'+
            'position:fixed;'+
            'top:0;'+
            'left:0;'+
            '}');

        // append style element
        style.type = 'text/css';
        if(style.styleSheet) {
            style.styleSheet.cssText = rules.nodeValue;
        } else {
            style.appendChild(rules);
        }
        head.appendChild(style);
    }
});

/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function(B){
    var L,T,Q,M,d,m,J,A,O,z,C=0,H={},j=[],e=0,G={},y=[],f=null,o=new Image(),i=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,k=/[^\.]\.(swf)\s*$/i,p,N=1,h=0,t="",b,c,P=false,s=B.extend(B("<div/>")[0],{
        prop:0
    }),S=B.browser.msie&&B.browser.version<7&&!window.XMLHttpRequest,r=function(){
        T.hide();o.onerror=o.onload=null;if(f){
            f.abort()
        }L.empty()
    },x=function(){
        if(false===H.onError(j,C,H)){
            T.hide();P=false;return
        }H.titleShow=false;H.width="auto";H.height="auto";L.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');n()
    },w=function(){
        var Z=j[C],W,Y,ab,aa,V,X;r();H=B.extend({},B.fn.fancybox.defaults,(typeof B(Z).data("fancybox")=="undefined"?H:B(Z).data("fancybox")));X=H.onStart(j,C,H);if(X===false){
            P=false;return
        }else{
            if(typeof X=="object"){
                H=B.extend(H,X)
            }
        }ab=H.title||(Z.nodeName?B(Z).attr("title"):Z.title)||"";if(Z.nodeName&&!H.orig){
            H.orig=B(Z).children("img:first").length?B(Z).children("img:first"):B(Z)
        }if(ab===""&&H.orig&&H.titleFromAlt){
            ab=H.orig.attr("alt")
        }W=H.href||(Z.nodeName?B(Z).attr("href"):Z.href)||null;if((/^(?:javascript)/i).test(W)||W=="#"){
            W=null
        }if(H.type){
            Y=H.type;if(!W){
                W=H.content
            }
        }else{
            if(H.content){
                Y="html"
            }else{
                if(W){
                    if(W.match(i)){
                        Y="image"
                    }else{
                        if(W.match(k)){
                            Y="swf"
                        }else{
                            if(B(Z).hasClass("iframe")){
                                Y="iframe"
                            }else{
                                if(W.indexOf("#")===0){
                                    Y="inline"
                                }else{
                                    Y="ajax"
                                }
                            }
                        }
                    }
                }
            }
        }if(!Y){
            x();return
        }if(Y=="inline"){
            Z=W.substr(W.indexOf("#"));Y=B(Z).length>0?"inline":"ajax"
        }H.type=Y;H.href=W;H.title=ab;if(H.autoDimensions){
            if(H.type=="html"||H.type=="inline"||H.type=="ajax"){
                H.width="auto";H.height="auto"
            }else{
                H.autoDimensions=false
            }
        }if(H.modal){
            H.overlayShow=true;H.hideOnOverlayClick=false;H.hideOnContentClick=false;H.enableEscapeButton=false;H.showCloseButton=false
        }H.padding=parseInt(H.padding,10);H.margin=parseInt(H.margin,10);L.css("padding",(H.padding+H.margin));B(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
            B(this).replaceWith(m.children())
        });switch(Y){
            case"html":L.html(H.content);n();break;case"inline":if(B(Z).parent().is("#fancybox-content")===true){
                P=false;return
            }B('<div class="fancybox-inline-tmp" />').hide().insertBefore(B(Z)).bind("fancybox-cleanup",function(){
                B(this).replaceWith(m.children())
            }).bind("fancybox-cancel",function(){
                B(this).replaceWith(L.children())
            });B(Z).appendTo(L);n();break;case"image":P=false;B.fancybox.showActivity();o=new Image();o.onerror=function(){
                x()
            };o.onload=function(){
                P=true;o.onerror=o.onload=null;F()
            };o.src=W;break;case"swf":H.scrolling="no";aa='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+H.width+'" height="'+H.height+'"><param name="movie" value="'+W+'"></param>';V="";B.each(H.swf,function(ac,ad){
                aa+='<param name="'+ac+'" value="'+ad+'"></param>';V+=" "+ac+'="'+ad+'"'
            });aa+='<embed src="'+W+'" type="application/x-shockwave-flash" width="'+H.width+'" height="'+H.height+'"'+V+"></embed></object>";L.html(aa);n();break;case"ajax":P=false;B.fancybox.showActivity();H.ajax.win=H.ajax.success;f=B.ajax(B.extend({},H.ajax,{
                url:W,
                data:H.ajax.data||{},
                dataType:"text",
                error:function(ac,ae,ad){
                    if(ac.status>0){
                        x()
                    }
                },
                success:function(ad,af,ac){
                    var ae=typeof ac=="object"?ac:f;if(ae.status==200||ae.status===0){
                        if(typeof H.ajax.win=="function"){
                            X=H.ajax.win(W,ad,af,ac);if(X===false){
                                T.hide();return
                            }else{
                                if(typeof X=="string"||typeof X=="object"){
                                    ad=X
                                }
                            }
                        }L.html(ad);n()
                    }
                }
            }));break;case"iframe":E();break
        }
    },n=function(){
        var V=H.width,W=H.height;if(V.toString().indexOf("%")>-1){
            V=parseInt((B(window).width()-(H.margin*2))*parseFloat(V)/100,10)+"px"
        }else{
            V=V=="auto"?"auto":V+"px"
        }if(W.toString().indexOf("%")>-1){
            W=parseInt((B(window).height()-(H.margin*2))*parseFloat(W)/100,10)+"px"
        }else{
            W=W=="auto"?"auto":W+"px"
        }L.wrapInner('<div style="width:'+V+";height:"+W+";overflow: "+(H.scrolling=="auto"?"auto":(H.scrolling=="yes"?"scroll":"hidden"))+';position:relative;"></div>');H.width=L.width();H.height=L.height();E()
    },F=function(){
        H.width=o.width;H.height=o.height;B("<img />").attr({
            id:"fancybox-img",
            src:o.src,
            alt:H.title
        }).appendTo(L);E()
    },E=function(){
        var W,V;T.hide();if(M.is(":visible")&&false===G.onCleanup(y,e,G)){
            B.event.trigger("fancybox-cancel");P=false;return
        }P=true;B(m.add(Q)).unbind();B(window).unbind("resize.fb scroll.fb");B(document).unbind("keydown.fb");if(M.is(":visible")&&G.titlePosition!=="outside"){
            M.css("height",M.height())
        }y=j;e=C;G=H;if(G.overlayShow){
            Q.css({
                "background-color":G.overlayColor,
                opacity:G.overlayOpacity,
                cursor:G.hideOnOverlayClick?"pointer":"auto",
                height:B(document).height()
            });if(!Q.is(":visible")){
                if(S){
                    B("select:not(#fancybox-tmp select)").filter(function(){
                        return this.style.visibility!=="hidden"
                    }).css({
                        visibility:"hidden"
                    }).one("fancybox-cleanup",function(){
                        this.style.visibility="inherit"
                    })
                }Q.show()
            }
        }else{
            Q.hide()
        }c=R();l();if(M.is(":visible")){
            B(J.add(O).add(z)).hide();W=M.position(),b={
                top:W.top,
                left:W.left,
                width:M.width(),
                height:M.height()
            };V=(b.width==c.width&&b.height==c.height);m.fadeTo(G.changeFade,0.3,function(){
                var X=function(){
                    m.html(L.contents()).fadeTo(G.changeFade,1,v)
                };B.event.trigger("fancybox-change");m.empty().removeAttr("filter").css({
                    "border-width":G.padding,
                    width:c.width-G.padding*2,
                    height:H.autoDimensions?"auto":c.height-h-G.padding*2
                });if(V){
                    X()
                }else{
                    s.prop=0;B(s).animate({
                        prop:1
                    },{
                        duration:G.changeSpeed,
                        easing:G.easingChange,
                        step:U,
                        complete:X
                    })
                }
            });return
        }M.removeAttr("style");m.css("border-width",G.padding);if(G.transitionIn=="elastic"){
            b=I();m.html(L.contents());M.show();if(G.opacity){
                c.opacity=0
            }s.prop=0;B(s).animate({
                prop:1
            },{
                duration:G.speedIn,
                easing:G.easingIn,
                step:U,
                complete:v
            });return
        }if(G.titlePosition=="inside"&&h>0){
            A.show()
        }m.css({
            width:c.width-G.padding*2,
            height:H.autoDimensions?"auto":c.height-h-G.padding*2
        }).html(L.contents());M.css(c).fadeIn(G.transitionIn=="none"?0:G.speedIn,v)
    },D=function(V){
        if(V&&V.length){
            if(G.titlePosition=="float"){
                return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+V+'</td><td id="fancybox-title-float-right"></td></tr></table>'
            }return'<div id="fancybox-title-'+G.titlePosition+'">'+V+"</div>"
        }return false
    },l=function(){
        t=G.title||"";h=0;A.empty().removeAttr("style").removeClass();if(G.titleShow===false){
            A.hide();return
        }t=B.isFunction(G.titleFormat)?G.titleFormat(t,y,e,G):D(t);if(!t||t===""){
            A.hide();return
        }A.addClass("fancybox-title-"+G.titlePosition).html(t).appendTo("body").show();switch(G.titlePosition){
            case"inside":A.css({
                width:c.width-(G.padding*2),
                marginLeft:G.padding,
                marginRight:G.padding
            });h=A.outerHeight(true);A.appendTo(d);c.height+=h;break;case"over":A.css({
                marginLeft:G.padding,
                width:c.width-(G.padding*2),
                bottom:G.padding
            }).appendTo(d);break;case"float":A.css("left",parseInt((A.width()-c.width-40)/2,10)*-1).appendTo(M);break;default:A.css({
                width:c.width-(G.padding*2),
                paddingLeft:G.padding,
                paddingRight:G.padding
            }).appendTo(M);break
        }A.hide()
    },g=function(){
        if(G.enableEscapeButton||G.enableKeyboardNav){
            B(document).bind("keydown.fb",function(V){
                if(V.keyCode==27&&G.enableEscapeButton){
                    V.preventDefault();B.fancybox.close()
                }else{
                    if((V.keyCode==37||V.keyCode==39)&&G.enableKeyboardNav&&V.target.tagName!=="INPUT"&&V.target.tagName!=="TEXTAREA"&&V.target.tagName!=="SELECT"){
                        V.preventDefault();B.fancybox[V.keyCode==37?"prev":"next"]()
                    }
                }
            })
        }if(!G.showNavArrows){
            O.hide();z.hide();return
        }if((G.cyclic&&y.length>1)||e!==0){
            O.show()
        }if((G.cyclic&&y.length>1)||e!=(y.length-1)){
            z.show()
        }
    },v=function(){
        if(!B.support.opacity){
            m.get(0).style.removeAttribute("filter");M.get(0).style.removeAttribute("filter")
        }if(H.autoDimensions){
            m.css("height","auto")
        }M.css("height","auto");if(t&&t.length){
            A.show()
        }if(G.showCloseButton){
            J.show()
        }g();if(G.hideOnContentClick){
            m.bind("click",B.fancybox.close)
        }if(G.hideOnOverlayClick){
            Q.bind("click",B.fancybox.close)
        }B(window).bind("resize.fb",B.fancybox.resize);if(G.centerOnScroll){
            B(window).bind("scroll.fb",B.fancybox.center)
        }if(G.type=="iframe"){
            B('<iframe id="fancybox-frame" name="fancybox-frame'+new Date().getTime()+'" frameborder="0" hspace="0" '+(B.browser.msie?'allowtransparency="true""':"")+' scrolling="'+H.scrolling+'" src="'+G.href+'"></iframe>').appendTo(m)
        }M.show();P=false;B.fancybox.center();G.onComplete(y,e,G);K()
    },K=function(){
        var V,W;if((y.length-1)>e){
            V=y[e+1].href;if(typeof V!=="undefined"&&V.match(i)){
                W=new Image();W.src=V
            }
        }if(e>0){
            V=y[e-1].href;if(typeof V!=="undefined"&&V.match(i)){
                W=new Image();W.src=V
            }
        }
    },U=function(W){
        var V={
            width:parseInt(b.width+(c.width-b.width)*W,10),
            height:parseInt(b.height+(c.height-b.height)*W,10),
            top:parseInt(b.top+(c.top-b.top)*W,10),
            left:parseInt(b.left+(c.left-b.left)*W,10)
        };if(typeof c.opacity!=="undefined"){
            V.opacity=W<0.5?0.5:W
        }M.css(V);m.css({
            width:V.width-G.padding*2,
            height:V.height-(h*W)-G.padding*2
        })
    },u=function(){
        return[B(window).width()-(G.margin*2),B(window).height()-(G.margin*2),B(document).scrollLeft()+G.margin,B(document).scrollTop()+G.margin]
    },R=function(){
        var V=u(),Z={},W=G.autoScale,X=G.padding*2,Y;if(G.width.toString().indexOf("%")>-1){
            Z.width=parseInt((V[0]*parseFloat(G.width))/100,10)
        }else{
            Z.width=G.width+X
        }if(G.height.toString().indexOf("%")>-1){
            Z.height=parseInt((V[1]*parseFloat(G.height))/100,10)
        }else{
            Z.height=G.height+X
        }if(W&&(Z.width>V[0]||Z.height>V[1])){
            if(H.type=="image"||H.type=="swf"){
                Y=(G.width)/(G.height);if((Z.width)>V[0]){
                    Z.width=V[0];Z.height=parseInt(((Z.width-X)/Y)+X,10)
                }if((Z.height)>V[1]){
                    Z.height=V[1];Z.width=parseInt(((Z.height-X)*Y)+X,10)
                }
            }else{
                Z.width=Math.min(Z.width,V[0]);Z.height=Math.min(Z.height,V[1])
            }
        }Z.top=parseInt(Math.max(V[3]-20,V[3]+((V[1]-Z.height-40)*0.5)),10);Z.left=parseInt(Math.max(V[2]-20,V[2]+((V[0]-Z.width-40)*0.5)),10);return Z
    },q=function(V){
        var W=V.offset();W.top+=parseInt(V.css("paddingTop"),10)||0;W.left+=parseInt(V.css("paddingLeft"),10)||0;W.top+=parseInt(V.css("border-top-width"),10)||0;W.left+=parseInt(V.css("border-left-width"),10)||0;W.width=V.width();W.height=V.height();return W
    },I=function(){
        var Y=H.orig?B(H.orig):false,X={},W,V;if(Y&&Y.length){
            W=q(Y);X={
                width:W.width+(G.padding*2),
                height:W.height+(G.padding*2),
                top:W.top-G.padding-20,
                left:W.left-G.padding-20
            }
        }else{
            V=u();X={
                width:G.padding*2,
                height:G.padding*2,
                top:parseInt(V[3]+V[1]*0.5,10),
                left:parseInt(V[2]+V[0]*0.5,10)
            }
        }return X
    },a=function(){
        if(!T.is(":visible")){
            clearInterval(p);return
        }B("div",T).css("top",(N*-40)+"px");N=(N+1)%12
    };B.fn.fancybox=function(V){
        if(!B(this).length){
            return this
        }B(this).data("fancybox",B.extend({},V,(B.metadata?B(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(X){
            X.preventDefault();if(P){
                return
            }P=true;B(this).blur();j=[];C=0;var W=B(this).attr("rel")||"";if(!W||W==""||W==="nofollow"){
                j.push(this)
            }else{
                j=B('a[rel="'+W+'"], area[rel="'+W+'"]');C=j.index(this)
            }w();return
        });return this
    };B.fancybox=function(Y){
        var X;if(P){
            return
        }P=true;X=typeof arguments[1]!=="undefined"?arguments[1]:{};j=[];C=parseInt(X.index,10)||0;if(B.isArray(Y)){
            for(var W=0,V=Y.length;W<V;W++){
                if(typeof Y[W]=="object"){
                    B(Y[W]).data("fancybox",B.extend({},X,Y[W]))
                }else{
                    Y[W]=B({}).data("fancybox",B.extend({
                        content:Y[W]
                    },X))
                }
            }j=jQuery.merge(j,Y)
        }else{
            if(typeof Y=="object"){
                B(Y).data("fancybox",B.extend({},X,Y))
            }else{
                Y=B({}).data("fancybox",B.extend({
                    content:Y
                },X))
            }j.push(Y)
        }if(C>j.length||C<0){
            C=0
        }w()
    };B.fancybox.showActivity=function(){
        clearInterval(p);T.show();p=setInterval(a,66)
    };B.fancybox.hideActivity=function(){
        T.hide()
    };B.fancybox.next=function(){
        return B.fancybox.pos(e+1)
    };B.fancybox.prev=function(){
        return B.fancybox.pos(e-1)
    };B.fancybox.pos=function(V){
        if(P){
            return
        }V=parseInt(V);j=y;if(V>-1&&V<y.length){
            C=V;w()
        }else{
            if(G.cyclic&&y.length>1){
                C=V>=y.length?0:y.length-1;w()
            }
        }return
    };B.fancybox.cancel=function(){
        if(P){
            return
        }P=true;B.event.trigger("fancybox-cancel");r();H.onCancel(j,C,H);P=false
    };B.fancybox.close=function(){
        if(P||M.is(":hidden")){
            return
        }P=true;if(G&&false===G.onCleanup(y,e,G)){
            P=false;return
        }r();B(J.add(O).add(z)).hide();B(m.add(Q)).unbind();B(window).unbind("resize.fb scroll.fb");B(document).unbind("keydown.fb");if(G.type==="iframe"){
            m.find("iframe").attr("src",S&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")
        }if(G.titlePosition!=="inside"){
            A.empty()
        }M.stop();function V(){
            Q.fadeOut("fast");A.empty().hide();M.hide();B.event.trigger("fancybox-cleanup");m.empty();G.onClosed(y,e,G);y=H=[];e=C=0;G=H={};P=false
        }if(G.transitionOut=="elastic"){
            b=I();var W=M.position();c={
                top:W.top,
                left:W.left,
                width:M.width(),
                height:M.height()
            };if(G.opacity){
                c.opacity=1
            }A.empty().hide();s.prop=1;B(s).animate({
                prop:0
            },{
                duration:G.speedOut,
                easing:G.easingOut,
                step:U,
                complete:V
            })
        }else{
            M.fadeOut(G.transitionOut=="none"?0:G.speedOut,V)
        }
    };B.fancybox.resize=function(){
        if(Q.is(":visible")){
            Q.css("height",B(document).height())
        }B.fancybox.center(true)
    };B.fancybox.center=function(){
        var V,W;if(P){
            return
        }W=arguments[0]===true?1:0;V=u();if(!W&&(M.width()>V[0]||M.height()>V[1])){
            return
        }M.stop().animate({
            top:parseInt(Math.max(V[3]-20,V[3]+((V[1]-m.height()-40)*0.5)-G.padding)),
            left:parseInt(Math.max(V[2]-20,V[2]+((V[0]-m.width()-40)*0.5)-G.padding))
        },typeof arguments[0]=="number"?arguments[0]:200)
    };B.fancybox.init=function(){
        if(B("#fancybox-wrap").length){
            return
        }B("body").append(L=B('<div id="fancybox-tmp"></div>'),T=B('<div id="fancybox-loading"><div></div></div>'),Q=B('<div id="fancybox-overlay"></div>'),M=B('<div id="fancybox-wrap"></div>'));d=B('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(M);d.append(m=B('<div id="fancybox-content"></div>'),J=B('<a id="fancybox-close"></a>'),A=B('<div id="fancybox-title"></div>'),O=B('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),z=B('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));J.click(B.fancybox.close);T.click(B.fancybox.cancel);O.click(function(V){
            V.preventDefault();B.fancybox.prev()
        });z.click(function(V){
            V.preventDefault();B.fancybox.next()
        });if(B.fn.mousewheel){
            M.bind("mousewheel.fb",function(V,W){
                if(P){
                    V.preventDefault()
                }else{
                    if(B(V.target).get(0).clientHeight==0||B(V.target).get(0).scrollHeight===B(V.target).get(0).clientHeight){
                        V.preventDefault();B.fancybox[W>0?"prev":"next"]()
                    }
                }
            })
        }if(!B.support.opacity){
            M.addClass("fancybox-ie")
        }if(S){
            T.addClass("fancybox-ie6");M.addClass("fancybox-ie6");B('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(d)
        }
    };B.fn.fancybox.defaults={
        padding:10,
        margin:40,
        opacity:false,
        modal:false,
        cyclic:false,
        scrolling:"auto",
        width:560,
        height:340,
        autoScale:true,
        autoDimensions:true,
        centerOnScroll:false,
        ajax:{},
        swf:{
            wmode:"transparent"
        },
        hideOnOverlayClick:true,
        hideOnContentClick:false,
        overlayShow:true,
        overlayOpacity:0.7,
        overlayColor:"#777",
        titleShow:true,
        titlePosition:"float",
        titleFormat:null,
        titleFromAlt:false,
        transitionIn:"fade",
        transitionOut:"fade",
        speedIn:300,
        speedOut:300,
        changeSpeed:300,
        changeFade:"fast",
        easingIn:"swing",
        easingOut:"swing",
        showCloseButton:true,
        showNavArrows:true,
        enableEscapeButton:true,
        enableKeyboardNav:true,
        onStart:function(){},
        onCancel:function(){},
        onComplete:function(){},
        onCleanup:function(){},
        onClosed:function(){},
        onError:function(){}
    };B(document).ready(function(){
        B.fancybox.init()
    })
})(jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright � 2008 George McGinley Smith
 * All rights reserved.
 * 
 */
;jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{
    def:"easeOutQuad",
    swing:function(e,f,a,h,g){
        return jQuery.easing[jQuery.easing.def](e,f,a,h,g)
    },
    easeInQuad:function(e,f,a,h,g){
        return h*(f/=g)*f+a
    },
    easeOutQuad:function(e,f,a,h,g){
        return -h*(f/=g)*(f-2)+a
    },
    easeInOutQuad:function(e,f,a,h,g){
        if((f/=g/2)<1){
            return h/2*f*f+a
        }return -h/2*((--f)*(f-2)-1)+a
    },
    easeInCubic:function(e,f,a,h,g){
        return h*(f/=g)*f*f+a
    },
    easeOutCubic:function(e,f,a,h,g){
        return h*((f=f/g-1)*f*f+1)+a
    },
    easeInOutCubic:function(e,f,a,h,g){
        if((f/=g/2)<1){
            return h/2*f*f*f+a
        }return h/2*((f-=2)*f*f+2)+a
    },
    easeInQuart:function(e,f,a,h,g){
        return h*(f/=g)*f*f*f+a
    },
    easeOutQuart:function(e,f,a,h,g){
        return -h*((f=f/g-1)*f*f*f-1)+a
    },
    easeInOutQuart:function(e,f,a,h,g){
        if((f/=g/2)<1){
            return h/2*f*f*f*f+a
        }return -h/2*((f-=2)*f*f*f-2)+a
    },
    easeInQuint:function(e,f,a,h,g){
        return h*(f/=g)*f*f*f*f+a
    },
    easeOutQuint:function(e,f,a,h,g){
        return h*((f=f/g-1)*f*f*f*f+1)+a
    },
    easeInOutQuint:function(e,f,a,h,g){
        if((f/=g/2)<1){
            return h/2*f*f*f*f*f+a
        }return h/2*((f-=2)*f*f*f*f+2)+a
    },
    easeInSine:function(e,f,a,h,g){
        return -h*Math.cos(f/g*(Math.PI/2))+h+a
    },
    easeOutSine:function(e,f,a,h,g){
        return h*Math.sin(f/g*(Math.PI/2))+a
    },
    easeInOutSine:function(e,f,a,h,g){
        return -h/2*(Math.cos(Math.PI*f/g)-1)+a
    },
    easeInExpo:function(e,f,a,h,g){
        return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a
    },
    easeOutExpo:function(e,f,a,h,g){
        return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a
    },
    easeInOutExpo:function(e,f,a,h,g){
        if(f==0){
            return a
        }if(f==g){
            return a+h
        }if((f/=g/2)<1){
            return h/2*Math.pow(2,10*(f-1))+a
        }return h/2*(-Math.pow(2,-10*--f)+2)+a
    },
    easeInCirc:function(e,f,a,h,g){
        return -h*(Math.sqrt(1-(f/=g)*f)-1)+a
    },
    easeOutCirc:function(e,f,a,h,g){
        return h*Math.sqrt(1-(f=f/g-1)*f)+a
    },
    easeInOutCirc:function(e,f,a,h,g){
        if((f/=g/2)<1){
            return -h/2*(Math.sqrt(1-f*f)-1)+a
        }return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a
    },
    easeInElastic:function(f,h,e,l,k){
        var i=1.70158;var j=0;var g=l;if(h==0){
            return e
        }if((h/=k)==1){
            return e+l
        }if(!j){
            j=k*0.3
        }if(g<Math.abs(l)){
            g=l;var i=j/4
        }else{
            var i=j/(2*Math.PI)*Math.asin(l/g)
        }return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e
    },
    easeOutElastic:function(f,h,e,l,k){
        var i=1.70158;var j=0;var g=l;if(h==0){
            return e
        }if((h/=k)==1){
            return e+l
        }if(!j){
            j=k*0.3
        }if(g<Math.abs(l)){
            g=l;var i=j/4
        }else{
            var i=j/(2*Math.PI)*Math.asin(l/g)
        }return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e
    },
    easeInOutElastic:function(f,h,e,l,k){
        var i=1.70158;var j=0;var g=l;if(h==0){
            return e
        }if((h/=k/2)==2){
            return e+l
        }if(!j){
            j=k*(0.3*1.5)
        }if(g<Math.abs(l)){
            g=l;var i=j/4
        }else{
            var i=j/(2*Math.PI)*Math.asin(l/g)
        }if(h<1){
            return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e
        }return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e
    },
    easeInBack:function(e,f,a,i,h,g){
        if(g==undefined){
            g=1.70158
        }return i*(f/=h)*f*((g+1)*f-g)+a
    },
    easeOutBack:function(e,f,a,i,h,g){
        if(g==undefined){
            g=1.70158
        }return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a
    },
    easeInOutBack:function(e,f,a,i,h,g){
        if(g==undefined){
            g=1.70158
        }if((f/=h/2)<1){
            return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a
        }return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a
    },
    easeInBounce:function(e,f,a,h,g){
        return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a
    },
    easeOutBounce:function(e,f,a,h,g){
        if((f/=g)<(1/2.75)){
            return h*(7.5625*f*f)+a
        }else{
            if(f<(2/2.75)){
                return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a
            }else{
                if(f<(2.5/2.75)){
                    return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a
                }else{
                    return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a
                }
            }
        }
    },
    easeInOutBounce:function(e,f,a,h,g){
        if(f<g/2){
            return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a
        }return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a
    }
});

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
;(function(a){
    function d(b){
        var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)
    }var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={
        setup:function(){
            if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d
        },
        teardown:function(){
            if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null
        }
    },a.fn.extend({
        mousewheel:function(a){
            return a?this.bind("mousewheel",a):this.trigger("mousewheel")
        },
        unmousewheel:function(a){
            return this.unbind("mousewheel",a)
        }
    })
})(jQuery)

/*
 * jQuery Accordion plugin
 */
;(function($){
    $.fn.slideAccordion = function(o){
        // default options
        var options = $.extend({
            addClassBeforeAnimation: false,
            activeClass:'active',
            opener:'.opener',
            slider:'.slide',
            animSpeed: 300,
            collapsible:true,
            event:'click'
        },o);

        return this.each(function(){
            // options
            var accordion = $(this);
            var items = accordion.find(':has('+options.slider+')');

            items.each(function(){
                var item = $(this);
                var opener = item.find(options.opener);
                var slider = item.find(options.slider);
                opener.bind(options.event, function(){
                    if(!slider.is(':animated')) {
                        if(item.hasClass(options.activeClass)) {
                            if(options.collapsible) {
                                slider.slideUp(options.animSpeed, function(){
                                    item.removeClass(options.activeClass);
                                });
                            }
                        } else {
                            var _levelItems = item.siblings('.'+options.activeClass);
                            item.addClass(options.activeClass);
            
                            var clickedElement = $(opener);
                            if($(clickedElement).parent().find('.slide-box').html()=='')
                            {
                                $.ajax({
                                    url:"/loadcomments",
                                    type : 'POST',
                                    data:{
                                        'sid':$(clickedElement).attr('alt')
                                    },
                                    success:function(data){
                                        $(clickedElement).parent().find('.slide-box').html(data);
                                    },
                                    error:function(data)
                                    {

                                    }
                                })
                            }
                            slider.slideDown(options.animSpeed);
						
                            // collapse others
                            _levelItems.find(options.slider).slideUp(options.animSpeed, function(){
                                _levelItems.removeClass(options.activeClass);
                            })
                        }
                    }
                    return false;
                });
                if(item.hasClass(options.activeClass)) slider.show(); else slider.hide();
            });
        });
    }
}(jQuery));

function customPrbForms()
{
  
    /*
 * JavaScript Custom Forms 1.4.1
 */
    jcf = {
        // global options
        modules: {},
        plugins: {},
        baseOptions: {
            useNativeDropOnMobileDevices: true,
            unselectableClass:'jcf-unselectable',
            labelActiveClass:'jcf-label-active',
            labelDisabledClass:'jcf-label-disabled',
            classPrefix: 'jcf-class-',
            hiddenClass:'jcf-hidden',
            focusClass:'jcf-focus',
            wrapperTag: 'div'
        },
        // replacer function
        customForms: {
            setOptions: function(obj) {
                for(var p in obj) {
                    if(obj.hasOwnProperty(p) && typeof obj[p] === 'object') {
                        jcf.lib.extend(jcf.modules[p].prototype.defaultOptions, obj[p]);
                    }
                }
            },
            replaceAll: function() {
                for(var k in jcf.modules) {
                    var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
                    for(var i = 0; i<els.length; i++) {
                        if(els[i].jcf) {
                            // refresh form element state
                            els[i].jcf.refreshState();
                        } else {
                            // replace form element
                            if(!jcf.lib.hasClass(els[i], 'default') && jcf.modules[k].prototype.checkElement(els[i])) {
                                new jcf.modules[k]({
                                    replaces:els[i]
                                });
                            }
                        }
                    }
                }
            },
            refreshAll: function() {
                for(var k in jcf.modules) {
                    var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
                    for(var i = 0; i<els.length; i++) {
                        if(els[i].jcf) {
                            // refresh form element state
                            els[i].jcf.refreshState();
                        }
                    }
                }
            },
            refreshElement: function(obj) {
                if(obj && obj.jcf) {
                    obj.jcf.refreshState();
                }
            },
            destroyAll: function() {
                for(var k in jcf.modules) {
                    var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
                    for(var i = 0; i<els.length; i++) {
                        if(els[i].jcf) {
                            els[i].jcf.destroy();
                        }
                    }
                }
            }
        },
        // detect device type
        isTouchDevice: (function() {
            try {
                return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
            } catch (e) {
                return false;
            }
        }()),
        // define base module
        setBaseModule: function(obj) {
            jcf.customControl = function(opt){
                this.options = jcf.lib.extend({}, jcf.baseOptions, this.defaultOptions, opt);
                this.init();
            }
            for(var p in obj) {
                jcf.customControl.prototype[p] = obj[p];
            }
        },
        // add module to jcf.modules
        addModule: function(obj) {
            if(obj.name){
                // create new module proto class
                jcf.modules[obj.name] = function(){
                    jcf.modules[obj.name].superclass.constructor.apply(this, arguments);
                }
                jcf.lib.inherit(jcf.modules[obj.name], jcf.customControl);
                for(var p in obj) {
                    jcf.modules[obj.name].prototype[p] = obj[p]
                }
                // on create module
                jcf.modules[obj.name].prototype.onCreateModule();
                // make callback for exciting modules
                for(var mod in jcf.modules) {
                    if(jcf.modules[mod] != jcf.modules[obj.name]) {
                        jcf.modules[mod].prototype.onModuleAdded(jcf.modules[obj.name]);
                    }
                }
            }
        },
        // add plugin to jcf.plugins
        addPlugin: function(obj) {
            if(obj && obj.name) {
                jcf.plugins[obj.name] = function() {
                    this.init.apply(this, arguments);
                }
                for(var p in obj) {
                    jcf.plugins[obj.name].prototype[p] = obj[p];
                }
            }
        },
        // miscellaneous init
        init: function(){
            this.eventPress = this.isTouchDevice ? 'touchstart' : 'mousedown';
            this.eventMove = this.isTouchDevice ? 'touchmove' : 'mousemove';
            this.eventRelease = this.isTouchDevice ? 'touchend' : 'mouseup';
            return this;
        },
        initStyles: function() {
            // create <style> element and rules
            var head = document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            rules = document.createTextNode('.'+jcf.baseOptions.unselectableClass+'{'+
                '-moz-user-select:none;'+
                '-webkit-tap-highlight-color:rgba(255,255,255,0);'+
                '-webkit-user-select:none;'+
                'user-select:none;'+
                '}');

            // append style element
            style.type = 'text/css';
            if(style.styleSheet) {
                style.styleSheet.cssText = rules.nodeValue;
            } else {
                style.appendChild(rules);
            }
            head.appendChild(style);
        }
    }.init(
        );
 
    /*
 * Custom Form Control prototype
 */
    jcf.setBaseModule({
        init: function(){
            if(this.options.replaces) {
                this.realElement = this.options.replaces;
                this.realElement.jcf = this;
                this.replaceObject();
            }
        },
        defaultOptions: {
        // default module options (will be merged with base options)
        },
        checkElement: function(el){
            return true; // additional check for correct form element
        },
        replaceObject: function(){
            this.createWrapper();
            this.attachEvents();
            this.fixStyles();
            this.setupWrapper();
        },
        createWrapper: function(){
            this.fakeElement = jcf.lib.createElement(this.options.wrapperTag);
            this.labelFor = jcf.lib.getLabelFor(this.realElement);
            jcf.lib.disableTextSelection(this.fakeElement);
            jcf.lib.addClass(this.fakeElement, jcf.lib.getAllClasses(this.realElement.className, this.options.classPrefix));
            jcf.lib.addClass(this.realElement, jcf.baseOptions.hiddenClass);
        },
        attachEvents: function(){
            jcf.lib.event.add(this.realElement, 'focus', this.onFocusHandler, this);
            jcf.lib.event.add(this.realElement, 'blur', this.onBlurHandler, this);
            jcf.lib.event.add(this.fakeElement, 'click', this.onFakeClick, this);
            jcf.lib.event.add(this.fakeElement, jcf.eventPress, this.onFakePressed, this);
            jcf.lib.event.add(this.fakeElement, jcf.eventRelease, this.onFakeReleased, this);

            if(this.labelFor) {
                this.labelFor.jcf = this;
                jcf.lib.event.add(this.labelFor, 'click', this.onFakeClick, this);
                jcf.lib.event.add(this.labelFor, jcf.eventPress, this.onFakePressed, this);
                jcf.lib.event.add(this.labelFor, jcf.eventRelease, this.onFakeReleased, this);
            }
        },
        fixStyles: function() {
            // hide mobile webkit tap effect
            if(jcf.isTouchDevice) {
                var tapStyle = 'rgba(255,255,255,0)';
                this.realElement.style.webkitTapHighlightColor = tapStyle;
                this.fakeElement.style.webkitTapHighlightColor = tapStyle;
                if(this.labelFor) {
                    this.labelFor.style.webkitTapHighlightColor = tapStyle;
                }
            }
        },
        setupWrapper: function(){
        // implement in subclass
        },
        refreshState: function(){
        // implement in subclass
        },
        destroy: function() {
            if(this.fakeElement && this.fakeElement.parentNode) {
                this.fakeElement.parentNode.removeChild(this.fakeElement);
            }
            jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
            this.realElement.jcf = null;
        },
        onFocus: function(){
            // emulated focus event
            jcf.lib.addClass(this.fakeElement,this.options.focusClass);
        },
        onBlur: function(cb){
            // emulated blur event
            jcf.lib.removeClass(this.fakeElement,this.options.focusClass);
        },
        onFocusHandler: function() {
            // handle focus loses
            if(this.focused) return;
            this.focused = true;

            // handle touch devices also
            if(jcf.isTouchDevice) {
                if(jcf.focusedInstance && jcf.focusedInstance.realElement != this.realElement) {
                    jcf.focusedInstance.onBlur();
                    jcf.focusedInstance.realElement.blur();
                }
                jcf.focusedInstance = this;
            }
            this.onFocus.apply(this, arguments);
        },
        onBlurHandler: function() {
            // handle focus loses
            if(!this.pressedFlag) {
                this.focused = false;
                this.onBlur.apply(this, arguments);
            }
        },
        onFakeClick: function(){
            if(jcf.isTouchDevice) {
                this.onFocus();
            } else if(!this.realElement.disabled) {
                this.realElement.focus();
            }
        },
        onFakePressed: function(e){
            this.pressedFlag = true;
        },
        onFakeReleased: function(){
            this.pressedFlag = false;
        },
        onCreateModule: function(){
        // implement in subclass
        },
        onModuleAdded: function(module) {
        // implement in subclass
        },
        onControlReady: function() {
        // implement in subclass
        }
    });

    /*
 * JCF Utility Library
 */
    jcf.lib = {
        bind: function(func, scope){
            return function() {
                return func.apply(scope, arguments);
            }
        },
        browser: (function() {
            var ua = navigator.userAgent.toLowerCase(), res = {},
            match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
            res[match[1]] = true;
            res.version = match[2] || "0";
            res.safariMac = ua.indexOf('mac') != -1 && ua.indexOf('safari') != -1;
            return res;
        })(),
        getOffset: function (obj) {
            if (obj.getBoundingClientRect) {
                var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
                var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
                return {
                    top:Math.round(obj.getBoundingClientRect().top + scrollTop - clientTop),
                    left:Math.round(obj.getBoundingClientRect().left + scrollLeft - clientLeft)
                }
            } else {
                var posLeft = 0, posTop = 0;
                while (obj.offsetParent) {
                    posLeft += obj.offsetLeft; posTop += obj.offsetTop; obj = obj.offsetParent;
                }
                return {
                    top:posTop,
                    left:posLeft
                };
            }
        },
        getScrollTop: function() {
            return window.pageYOffset || document.documentElement.scrollTop;
        },
        getScrollLeft: function() {
            return window.pageXOffset || document.documentElement.scrollLeft;
        },
        getWindowWidth: function(){
            return document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth;
        },
        getWindowHeight: function(){
            return document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
        },
        getStyle: function(el, prop) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                return document.defaultView.getComputedStyle(el, null)[prop];
            } else if (el.currentStyle) {
                return el.currentStyle[prop];
            } else {
                return el.style[prop];
            }
        },
        getParent: function(obj, selector) {
            while(obj.parentNode && obj.parentNode != document.body) {
                if(obj.parentNode.tagName.toLowerCase() == selector.toLowerCase()) {
                    return obj.parentNode;
                }
                obj = obj.parentNode;
            }
            return false;
        },
        isParent: function(child, parent) {
            while(child.parentNode) {
                if(child.parentNode === parent) {
                    return true;
                }
                child = child.parentNode;
            }
            return false;
        },
        getLabelFor: function(object) {
            if(jcf.lib.getParent(object,'label')) {
                return object.parentNode;
            } else if(object.id) {
                return jcf.lib.queryBySelector('label[for="' + object.id + '"]')[0];
            }
        },
        disableTextSelection: function(el){
            if (typeof el.onselectstart !== 'undefined') {
                el.onselectstart = function() {
                    return false
                };
            } else if(window.opera) {
                el.setAttribute('unselectable', 'on');
            } else {
                jcf.lib.addClass(el, jcf.baseOptions.unselectableClass);
            }
        },
        enableTextSelection: function(el) {
            if (typeof el.onselectstart !== 'undefined') {
                el.onselectstart = null;
            } else if(window.opera) {
                el.removeAttribute('unselectable');
            } else {
                jcf.lib.removeClass(el, jcf.baseOptions.unselectableClass);
            }
        },
        queryBySelector: function(selector, scope){
            return this.getElementsBySelector(selector, scope);
        },
        prevSibling: function(node) {
            while(node = node.previousSibling) if(node.nodeType == 1) break;
            return node;
        },
        nextSibling: function(node) {
            while(node = node.nextSibling) if(node.nodeType == 1) break;
            return node;
        },
        fireEvent: function(element,event) {
            if (document.createEventObject){
                var evt = document.createEventObject();
                return element.fireEvent('on'+event,evt)
            }
            else{
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent(event, true, true );
                return !element.dispatchEvent(evt);
            }
        },
        isParent: function(p, c) {
            while(c.parentNode) {
                if(p == c) {
                    return true;
                }
                c = c.parentNode;
            }
            return false;
        },
        inherit: function(Child, Parent) {
            var F = function() { }
            F.prototype = Parent.prototype
            Child.prototype = new F()
            Child.prototype.constructor = Child
            Child.superclass = Parent.prototype
        },
        extend: function(obj) {
            for(var i = 1; i < arguments.length; i++) {
                for(var p in arguments[i]) {
                    if(arguments[i].hasOwnProperty(p)) {
                        obj[p] = arguments[i][p];
                    }
                }
            }
            return obj;
        },
        hasClass: function (obj,cname) {
            return (obj.className ? obj.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')) : false);
        },
        addClass: function (obj,cname) {
            if (!this.hasClass(obj,cname)) obj.className += (!obj.className.length || obj.className.charAt(obj.className.length - 1) === ' ' ? '' : ' ') + cname;
        },
        removeClass: function (obj,cname) {
            if (this.hasClass(obj,cname)) obj.className=obj.className.replace(new RegExp('(\\s|^)'+cname+'(\\s|$)'),' ').replace(/\s+$/, '');
        },
        toggleClass: function(obj, cname, condition) {
            if(condition) this.addClass(obj, cname); else this.removeClass(obj, cname);
        },
        createElement: function(tagName, options) {
            var el = document.createElement(tagName);
            for(var p in options) {
                if(options.hasOwnProperty(p)) {
                    switch (p) {
                        case 'class': el.className = options[p]; break;
                        case 'html': el.innerHTML = options[p]; break;
                        case 'style': this.setStyles(el, options[p]); break;
                        default: el.setAttribute(p, options[p]);
                    }
                }
            }
            return el;
        },
        setStyles: function(el, styles) {
            for(var p in styles) {
                if(styles.hasOwnProperty(p)) {
                    switch (p) {
                        case 'float': el.style.cssFloat = styles[p]; break;
                        case 'opacity': el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+styles[p]*100+')'; el.style.opacity = styles[p]; break;
                        default: el.style[p] = (typeof styles[p] === 'undefined' ? 0 : styles[p]) + (typeof styles[p] === 'number' ? 'px' : '');
                    }
                }
            }
            return el;
        },
        getInnerWidth: function(el) {
            return el.offsetWidth - (parseInt(this.getStyle(el,'paddingLeft')) || 0) - (parseInt(this.getStyle(el,'paddingRight')) || 0);
        },
        getInnerHeight: function(el) {
            return el.offsetHeight - (parseInt(this.getStyle(el,'paddingTop')) || 0) - (parseInt(this.getStyle(el,'paddingBottom')) || 0);
        },
        getAllClasses: function(cname, prefix, skip) {
            if(!skip) skip = '';
            if(!prefix) prefix = '';
            return cname ? cname.replace(new RegExp('(\\s|^)'+skip+'(\\s|$)'),' ').replace(/[\s]*([\S]+)+[\s]*/gi,prefix+"$1 ") : '';
        },
        getElementsBySelector: function(selector, scope) {
            if(typeof document.querySelectorAll === 'function') {
                return (scope || document).querySelectorAll(selector);
            }
            var selectors = selector.split(',');
            var resultList = [];
            for(var s = 0; s < selectors.length; s++) {
                var currentContext = [scope || document];
                var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
                for (var i = 0; i < tokens.length; i++) {
                    token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
                    if (token.indexOf('#') > -1) {
                        var bits = token.split('#'), tagName = bits[0], id = bits[1];
                        var element = document.getElementById(id);
                        if (tagName && element.nodeName.toLowerCase() != tagName) {
                            return [];
                        }
                        currentContext = [element];
                        continue;
                    }
                    if (token.indexOf('.') > -1) {
                        var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
                        for (var h = 0; h < currentContext.length; h++) {
                            var elements;
                            if (tagName == '*') {
                                elements = currentContext[h].getElementsByTagName('*');
                            } else {
                                elements = currentContext[h].getElementsByTagName(tagName);
                            }
                            for (var j = 0; j < elements.length; j++) {
                                found[foundCount++] = elements[j];
                            }
                        }
                        currentContext = [];
                        var currentContextIndex = 0;
                        for (var k = 0; k < found.length; k++) {
                            if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
                                currentContext[currentContextIndex++] = found[k];
                            }
                        }
                        continue;
                    }
                    if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
                        var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
                        if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
                            attrName = 'htmlFor';
                        }
                        var found = [], foundCount = 0;
                        for (var h = 0; h < currentContext.length; h++) {
                            var elements;
                            if (tagName == '*') {
                                elements = currentContext[h].getElementsByTagName('*');
                            } else {
                                elements = currentContext[h].getElementsByTagName(tagName);
                            }
                            for (var j = 0; elements[j]; j++) {
                                found[foundCount++] = elements[j];
                            }
                        }
                        currentContext = [];
                        var currentContextIndex = 0, checkFunction;
                        switch (attrOperator) {
                            case '=': checkFunction = function(e) {
                                return (e.getAttribute(attrName) == attrValue)
                            }; break;
                            case '~': checkFunction = function(e) {
                                return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)')))
                            }; break;
                            case '|': checkFunction = function(e) {
                                return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?')))
                            }; break;
                            case '^': checkFunction = function(e) {
                                return (e.getAttribute(attrName).indexOf(attrValue) == 0)
                            }; break;
                            case '$': checkFunction = function(e) {
                                return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length)
                            }; break;
                            case '*': checkFunction = function(e) {
                                return (e.getAttribute(attrName).indexOf(attrValue) > -1)
                            }; break;
                            default : checkFunction = function(e) {
                                return e.getAttribute(attrName)
                            };
                        }
                        currentContext = [];
                        var currentContextIndex = 0;
                        for (var k = 0; k < found.length; k++) {
                            if (checkFunction(found[k])) {
                                currentContext[currentContextIndex++] = found[k];
                            }
                        }
                        continue;
                    }
                    tagName = token;
                    var found = [], foundCount = 0;
                    for (var h = 0; h < currentContext.length; h++) {
                        var elements = currentContext[h].getElementsByTagName(tagName);
                        for (var j = 0; j < elements.length; j++) {
                            found[foundCount++] = elements[j];
                        }
                    }
                    currentContext = found;
                }
                resultList = [].concat(resultList,currentContext);
            }
            return resultList;
        },
        scrollSize: (function(){
            var content, hold, sizeBefore, sizeAfter;
            function buildSizer(){
                if(hold) removeSizer();
                content = document.createElement('div');
                hold = document.createElement('div');
                hold.style.cssText = 'position:absolute;overflow:hidden;width:100px;height:100px';
                hold.appendChild(content);
                document.body.appendChild(hold);
            }
            function removeSizer(){
                document.body.removeChild(hold);
                hold = null;
            }
            function calcSize(vertical) {
                buildSizer();
                content.style.cssText = 'height:'+(vertical ? '100%' : '200px');
                sizeBefore = (vertical ? content.offsetHeight : content.offsetWidth);
                hold.style.overflow = 'scroll'; content.innerHTML = 1;
                sizeAfter = (vertical ? content.offsetHeight : content.offsetWidth);
                if(vertical && hold.clientHeight) sizeAfter = hold.clientHeight;
                removeSizer();
                return sizeBefore - sizeAfter;
            }
            return {
                getWidth:function(){
                    return calcSize(false);
                },
                getHeight:function(){
                    return calcSize(true)
                }
            }
        }()),
        domReady: function (handler){
            var called = false
            function ready() {
                if (called) return;
                called = true;
                handler();
            }
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
            } else if (document.attachEvent) {
                if (document.documentElement.doScroll && window == window.top) {
                    function tryScroll(){
                        if (called) return
                        if (!document.body) return
                        try {
                            document.documentElement.doScroll("left")
                            ready()
                        } catch(e) {
                            setTimeout(tryScroll, 0)
                        }
                    }
                    tryScroll()
                }
                document.attachEvent("onreadystatechange", function(){
                    if (document.readyState === "complete") {
                        ready()
                    }
                })
            }
            if (window.addEventListener) window.addEventListener('load', ready, false)
            else if (window.attachEvent) window.attachEvent('onload', ready)
        },
        event: (function(){
            var guid = 0;
            function fixEvent(e) {
                e = e || window.event;
                if (e.isFixed) {
                    return e;
                }
                e.isFixed = true;
                e.preventDefault = e.preventDefault || function(){
                    this.returnValue = false
                }
                e.stopPropagation = e.stopPropagaton || function(){
                    this.cancelBubble = true
                }
                if (!e.target) {
                    e.target = e.srcElement
                }
                if (!e.relatedTarget && e.fromElement) {
                    e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement;
                }
                if (e.pageX == null && e.clientX != null) {
                    var html = document.documentElement, body = document.body;
                    e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
                    e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
                }
                if (!e.which && e.button) {
                    e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
                }
                if(e.type === "DOMMouseScroll" || e.type === 'mousewheel') {
                    e.mWheelDelta = 0;
                    if (e.wheelDelta) {
                        e.mWheelDelta = e.wheelDelta/120;
                    } else if (e.detail) {
                        e.mWheelDelta = -e.detail/3;
                    }
                }
                return e;
            }
            function commonHandle(event, customScope) {
                event = fixEvent(event);
                var handlers = this.events[event.type];
                for (var g in handlers) {
                    var handler = handlers[g];
                    var ret = handler.call(customScope || this, event);
                    if (ret === false) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                }
            }
            var publicAPI = {
                add: function(elem, type, handler, forcedScope) {
                    if (elem.setInterval && (elem != window && !elem.frameElement)) {
                        elem = window;
                    }
                    if (!handler.guid) {
                        handler.guid = ++guid;
                    }
                    if (!elem.events) {
                        elem.events = {};
                        elem.handle = function(event) {
                            return commonHandle.call(elem, event);
                        }
                    }
                    if (!elem.events[type]) {
                        elem.events[type] = {};
                        if (elem.addEventListener) elem.addEventListener(type, elem.handle, false);
                        else if (elem.attachEvent) elem.attachEvent("on" + type, elem.handle);
                        if(type === 'mousewheel') {
                            publicAPI.add(elem, 'DOMMouseScroll', handler, forcedScope);
                        }
                    }
                    var fakeHandler = jcf.lib.bind(handler, forcedScope);
                    fakeHandler.guid = handler.guid;
                    elem.events[type][handler.guid] = forcedScope ? fakeHandler : handler;
                },
                remove: function(elem, type, handler) {
                    var handlers = elem.events && elem.events[type];
                    if (!handlers) return;
                    delete handlers[handler.guid];
                    for(var any in handlers) return;
                    if (elem.removeEventListener) elem.removeEventListener(type, elem.handle, false);
                    else if (elem.detachEvent) elem.detachEvent("on" + type, elem.handle);
                    delete elem.events[type];
                    for (var any in elem.events) return;
                    try {
                        delete elem.handle;
                        delete elem.events;
                    } catch(e) {
                        if(elem.removeAttribute) {
                            elem.removeAttribute("handle");
                            elem.removeAttribute("events");
                        }
                    }
                    if(type === 'mousewheel') {
                        publicAPI.remove(elem, 'DOMMouseScroll', handler);
                    }
                }
            }
            return publicAPI;
        }())
    }

    // init jcf styles
    jcf.lib.domReady(function(){
        jcf.initStyles();
    });
    // custom checkbox module
    jcf.addModule({
        name:'checkbox',
        selector:'input[type="checkbox"]',
        defaultOptions: {
            wrapperClass:'chk-area',
            focusClass:'chk-focus',
            checkedClass:'chk-checked',
            labelActiveClass:'chk-label-active',
            uncheckedClass:'chk-unchecked',
            disabledClass:'chk-disabled',
            chkStructure:'<span></span>'
        },
        setupWrapper: function(){
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
            this.fakeElement.innerHTML = this.options.chkStructure;
            this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
            jcf.lib.event.add(this.realElement, 'click', this.onRealClick, this);
            this.refreshState();
        },
        onFakePressed: function() {
            jcf.modules[this.name].superclass.onFakePressed.apply(this, arguments);
            if(!this.realElement.disabled) {
                this.realElement.focus();
            }
        },
        onFakeClick: function(e) {
            jcf.modules[this.name].superclass.onFakeClick.apply(this, arguments);
            this.tmpTimer = setTimeout(jcf.lib.bind(function(){
                this.toggle();
            },this),10);
            return false;
        },
        onRealClick: function(e) {
            setTimeout(jcf.lib.bind(function(){
                this.refreshState();
            },this),10);
            e.stopPropagation();
        },
        toggle: function(e){
            if(!this.realElement.disabled) {
                if(this.realElement.checked) {
                    this.realElement.checked = false;
                } else {
                    this.realElement.checked = true;
                }
            }
            this.refreshState();
            return false;
        },
        refreshState: function(){
            if(this.realElement.checked) {
                jcf.lib.addClass(this.fakeElement, this.options.checkedClass);
                jcf.lib.removeClass(this.fakeElement, this.options.uncheckedClass);
                if(this.labelFor) {
                    jcf.lib.addClass(this.labelFor, this.options.labelActiveClass);
                }
            } else {
                jcf.lib.removeClass(this.fakeElement, this.options.checkedClass);
                jcf.lib.addClass(this.fakeElement, this.options.uncheckedClass);
                if(this.labelFor) {
                    jcf.lib.removeClass(this.labelFor, this.options.labelActiveClass);
                }
            }
            if(this.realElement.disabled) {
                jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
                if(this.labelFor) {
                    jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
                }
            } else {
                jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
                if(this.labelFor) {
                    jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
                }
            }
        }
    });
    // custom select module
    jcf.addModule({
        name:'select',
        selector:'select',
        defaultOptions: {
            hideDropOnScroll: true,
            showNativeDrop: false,
            handleDropPosition: true,
            selectDropPosition: 'bottom', // or 'top'
            wrapperClass:'select-area',
            focusClass:'select-focus',
            dropActiveClass:'select-active',
            selectedClass:'item-selected',
            currentSelectedClass:'current-selected',
            disabledClass:'select-disabled',
            valueSelector:'span.center',
            optGroupClass:'optgroup',
            openerSelector:'a.select-opener',
            selectStructure:'<span class="left"></span><span class="center"></span><a class="select-opener"></a>',
            classPrefix:'select-',
            dropMaxHeight: '500',
            dropFlippedClass: 'select-options-flipped',
            dropHiddenClass:'options-hidden',
            dropScrollableClass:'options-overflow',
            dropClass:'select-options',
            dropClassPrefix:'drop-',
            dropStructure:'<div class="drop-holder"><div class="drop-list"></div></div>',
            dropSelector:'div.drop-list'
        },
        checkElement: function(el){
            return (!el.size && !el.multiple);
        },
        setupWrapper: function(){
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
            this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
            this.fakeElement.innerHTML = this.options.selectStructure;
            this.fakeElement.style.width = (this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + 'px' : 'auto');

            // show native drop if specified in options
            if(jcf.isTouchDevice && jcf.baseOptions.useNativeDropOnMobileDevices) {
                this.options.showNativeDrop = true;
            }
            if(this.options.showNativeDrop) {
                this.fakeElement.appendChild(this.realElement);
                jcf.lib.removeClass(this.realElement, this.options.hiddenClass);
                jcf.lib.setStyles(this.realElement, {
                    top:0,
                    left:0,
                    margin:0,
                    padding:0,
                    opacity:0,
                    border:'none',
                    position:'absolute',
                    width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
                    height: jcf.lib.getInnerHeight(this.fakeElement) - 1
                });
            }

            // create select body
            this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0];
            this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0];
            jcf.lib.disableTextSelection(this.valueText);
            this.opener.jcf = this;

            if(!this.options.showNativeDrop) {
                this.createDropdown();
                this.refreshState();
                this.onControlReady(this);
                this.hideDropdown(true);
            } else {
                this.refreshState();
            }
            this.addEvents();
        },
        addEvents: function(){
            if(this.options.showNativeDrop) {
                jcf.lib.event.add(this.realElement, 'click', this.onChange, this);
            } else {
                jcf.lib.event.add(this.fakeElement, 'click', this.toggleDropdown, this);
            }
            jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
        },
        onFakeClick: function() {
        // do nothing (drop toggles by toggleDropdown method)
        },
        onFocus: function(){
            jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
            if(!this.options.showNativeDrop) {
                // Mac Safari Fix
                if(jcf.lib.browser.safariMac) {
                    this.realElement.setAttribute('size','2');
                }
                jcf.lib.event.add(this.realElement, 'keydown', this.onKeyDown, this);
                if(jcf.activeControl && jcf.activeControl != this) {
                    jcf.activeControl.hideDropdown();
                    jcf.activeControl = this;
                }
            }
        },
        onBlur: function(){
            if(!this.options.showNativeDrop) {
                // Mac Safari Fix
                if(jcf.lib.browser.safariMac) {
                    this.realElement.removeAttribute('size');
                }
                if(!this.isActiveDrop() || !this.isOverDrop()) {
                    jcf.modules[this.name].superclass.onBlur.apply(this);
                    if(jcf.activeControl === this) jcf.activeControl = null;
                    if(!jcf.isTouchDevice) {
                        this.hideDropdown();
                    }
                }
                jcf.lib.event.remove(this.realElement, 'keydown', this.onKeyDown);
            } else {
                jcf.modules[this.name].superclass.onBlur.apply(this);
            }
        },
        onChange: function() {
            this.refreshState();
        },
        onKeyDown: function(e){
            jcf.tmpFlag = true;
            setTimeout(function(){
                jcf.tmpFlag = false
            },100);
            var context = this;
             
            context.keyboardFix = true;
            setTimeout(function(){
                context.refreshState();
            },10);
            if(e.keyCode == 13) {
                context.toggleDropdown.apply(context);
                return false;
            }
        },
        onResizeWindow: function(e){
            if(this.isActiveDrop()) {
                this.hideDropdown();
            }
        },
        onScrollWindow: function(e){
            if(this.options.hideDropOnScroll) {
                this.hideDropdown();
            } else if(this.isActiveDrop()) {
                this.positionDropdown();
            }
        },
        onOptionClick: function(e){
            var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
            if(opener) {
                this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
                if(jcf.isTouchDevice) {
                    this.onFocus();
                } else {
                    this.realElement.focus();
                }
                this.refreshState();
                this.hideDropdown();
                jcf.lib.fireEvent(this.realElement, 'change');
            }
            return false;
        },
        onClickOutside: function(e){
            if(jcf.tmpFlag) {
                jcf.tmpFlag = false;
                return;
            }
            if(!jcf.lib.isParent(this.fakeElement, e.target) && !jcf.lib.isParent(this.selectDrop, e.target)) {
                this.hideDropdown();
            }
        },
        onDropHover: function(e){
            if(!this.keyboardFix) {
                this.hoverFlag = true;
                var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
                if(opener) {
                    this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
                    this.refreshSelectedClass(parseInt(opener.getAttribute('rel')));
                }
            } else {
                this.keyboardFix = false;
            }
        },
        onDropLeave: function(){
            this.hoverFlag = false;
        },
        isActiveDrop: function(){
            return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass);
        },
        isOverDrop: function(){
            return this.hoverFlag;
        },
        createDropdown: function(){
            // remove old dropdown if exists
            if(this.selectDrop) {
                this.selectDrop.parentNode.removeChild(this.selectDrop);
            }

            // create dropdown holder
            this.selectDrop = document.createElement('div');
            this.selectDrop.className = this.options.dropClass;
            this.selectDrop.innerHTML = this.options.dropStructure;
            jcf.lib.setStyles(this.selectDrop, {
                position:'absolute'
                
            });
            // $(this.selectDrop).css('height','500px')
            // $(this.selectDrop).find('.drop-holder').css('height','150px');
            
            this.selectList = jcf.lib.queryBySelector(this.options.dropSelector,this.selectDrop)[0];
            jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
            document.body.appendChild(this.selectDrop);
            this.selectDrop.jcf = this;
            jcf.lib.event.add(this.selectDrop, 'click', this.onOptionClick, this);
            jcf.lib.event.add(this.selectDrop, 'mouseover', this.onDropHover, this);
            jcf.lib.event.add(this.selectDrop, 'mouseout', this.onDropLeave, this);
            this.buildDropdown();
        /*$(this.selectDrop).find('.drop-list').slimScroll({
                height: '500px',
                railVisible: true,
                alwaysVisible: true
            });*/
        },
        buildDropdown: function() {
            // build select options / optgroups
            this.buildDropdownOptions();

            // position and resize dropdown
            this.positionDropdown();

            // cut dropdown if height exceedes
            this.buildDropdownScroll();
        },
        buildDropdownOptions: function() {
            this.resStructure = '';
            this.optNum = 0;
            for(var i = 0; i < this.realElement.children.length; i++) {
                this.resStructure += this.buildElement(this.realElement.children[i]) +'\n';
            }
            this.selectList.innerHTML = this.resStructure;
        },
        buildDropdownScroll: function() {
            if(this.options.dropMaxHeight) {
                if(this.selectDrop.offsetHeight > this.options.dropMaxHeight) {
                    this.selectList.style.height = this.options.dropMaxHeight+'px';
                    this.selectList.style.overflow = 'auto';
                    this.selectList.style.overflowX = 'hidden';
                    jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass);
                }
            }
            jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass));
        },
        parseOptionTitle: function(optTitle) {
            return (typeof optTitle === 'string' && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(optTitle)) ? optTitle : '';
        },
        buildElement: function(obj){
            // build option
            var res = '', optImage;
            if(obj.tagName.toLowerCase() == 'option') {
                if(!jcf.lib.prevSibling(obj) || jcf.lib.prevSibling(obj).tagName.toLowerCase() != 'option') {
                    res += '<ul>';
                }

                optImage = this.parseOptionTitle(obj.title);
                res += '<li rel="'+(this.optNum++)+'" class="'+(obj.className? obj.className + ' ' : '')+'jcfcalc"><a href="#">'+(optImage ? '<img src="'+optImage+'" alt="" />' : '')+'<span>' + obj.innerHTML + '</span></a></li>';
                if(!jcf.lib.nextSibling(obj) || jcf.lib.nextSibling(obj).tagName.toLowerCase() != 'option') {
                    res += '</ul>';
                }
                return res;
            }
            // build option group with options
            else if(obj.tagName.toLowerCase() == 'optgroup' && obj.label) {
                res += '<div class="'+this.options.optGroupClass+'">';
                res += '<strong class="jcfcalc"><em>'+(obj.label)+'</em></strong>';
                for(var i = 0; i < obj.children.length; i++) {
                    res += this.buildElement(obj.children[i]);
                }
                res += '</div>';
                return res;
            }
        },
        positionDropdown: function(){
            var ofs = jcf.lib.getOffset(this.fakeElement), selectAreaHeight = this.fakeElement.offsetHeight, selectDropHeight = this.selectDrop.offsetHeight;
            var fitInTop = ofs.top - selectDropHeight >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < ofs.top + selectAreaHeight + selectDropHeight;


            if((this.options.handleDropPosition && fitInTop) || this.options.selectDropPosition === 'top') {
                this.selectDrop.style.top = (ofs.top - selectDropHeight)+'px';
                jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass);
            } else {
                this.selectDrop.style.top = (ofs.top + selectAreaHeight)+'px';
                jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass);
            }
            this.selectDrop.style.left = ofs.left+'px';
            this.selectDrop.style.width = this.fakeElement.offsetWidth+'px';
        },
        showDropdown: function(){
            document.body.appendChild(this.selectDrop);
            jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass);
            jcf.lib.addClass(this.fakeElement,this.options.dropActiveClass);
            this.positionDropdown();

            // highlight current active item
            var activeItem = this.getFakeActiveOption();
            this.removeClassFromItems(this.options.currentSelectedClass);
            jcf.lib.addClass(activeItem, this.options.currentSelectedClass);

            // show current dropdown
            jcf.lib.event.add(window, 'resize', this.onResizeWindow, this);
            jcf.lib.event.add(window, 'scroll', this.onScrollWindow, this);
            jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this);
            this.positionDropdown();
        },
        hideDropdown: function(partial){
            if(this.selectDrop.parentNode) {
                if(this.selectDrop.offsetWidth) {
                    this.selectDrop.parentNode.removeChild(this.selectDrop);
                }
                if(partial) {
                    return;
                }
            }
            if(typeof this.origSelectedIndex === 'number') {
                this.realElement.selectedIndex = this.origSelectedIndex;
            }
            jcf.lib.removeClass(this.fakeElement,this.options.dropActiveClass);
            jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
            jcf.lib.event.remove(window, 'resize', this.onResizeWindow);
            jcf.lib.event.remove(window, 'scroll', this.onScrollWindow);
            jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside);
            if(jcf.isTouchDevice) {
                this.onBlur();
            }
        },
        toggleDropdown: function(){
            if(!this.realElement.disabled) {
                if(jcf.isTouchDevice) {
                    this.onFocus();
                } else {
                    this.realElement.focus();
                }
                this.dropOpened = true;
                if(this.isActiveDrop()) {
                    this.hideDropdown();
                } else {
                    this.showDropdown();
                }
                this.refreshState();
            }
        },
        scrollToItem: function(){
            if(this.isActiveDrop()) {
                var dropHeight = this.selectList.offsetHeight;
                var offsetTop = this.calcOptionOffset(this.getFakeActiveOption());
                var sTop = this.selectList.scrollTop;
                var oHeight = this.getFakeActiveOption().offsetHeight;
                //offsetTop+=sTop;

                if(offsetTop >= sTop + dropHeight) {
                  
                    this.selectList.scrollTop = offsetTop - dropHeight + oHeight;

                       
                  
                } else if(offsetTop < sTop) {
                  
                    this.selectList.scrollTop = offsetTop;
                
                  
                }
            /*  $(this.selectDrop).find('.drop-list').slimScroll({
               scroll:this.realElement.selectedIndex,
                railVisible: true,
                alwaysVisible: true

            });*/

                
            }
        },
        getFakeActiveOption: function(c) {
            return jcf.lib.queryBySelector('li[rel="'+(typeof c === 'number' ? c : this.realElement.selectedIndex) +'"]',this.selectList)[0];
        },
        calcOptionOffset: function(fake) {
            var h = 0;
            var els = jcf.lib.queryBySelector('.jcfcalc',this.selectList);
            for(var i = 0; i < els.length; i++) {
                if(els[i] == fake) break;
                h+=els[i].offsetHeight;
            }
            return h;
        },
        childrenHasItem: function(hold,item) {
            var items = hold.getElementsByTagName('*');
            for(i = 0; i < items.length; i++) {
                if(items[i] == item) return true;
            }
            return false;
        },
        removeClassFromItems: function(className){
            var children = jcf.lib.queryBySelector('li',this.selectList);
            for(var i = children.length - 1; i >= 0; i--) {
                jcf.lib.removeClass(children[i], className);
            }
        },
        setSelectedClass: function(c){
            jcf.lib.addClass(this.getFakeActiveOption(c), this.options.selectedClass);
        },
        refreshSelectedClass: function(c){
            if(!this.options.showNativeDrop) {
                this.removeClassFromItems(this.options.selectedClass);
                this.setSelectedClass(c);
            }
            if(this.realElement.disabled) {
                jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
                if(this.labelFor) {
                    jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
                }
            } else {
                jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
                if(this.labelFor) {
                    jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
                }
            }
        },
        refreshSelectedText: function() {
            if(!this.dropOpened && this.realElement.title) {
                this.valueText.innerHTML = this.realElement.title;
            } else {
                if(this.realElement.options[this.realElement.selectedIndex].title) {
                    var optImage = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].title);
                    this.valueText.innerHTML = (optImage ? '<img src="'+optImage+'" alt="" />' : '') + this.realElement.options[this.realElement.selectedIndex].innerHTML;
                } else {
                    this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML;
                }
            }
        },
        refreshState: function(){
            this.origSelectedIndex = this.realElement.selectedIndex;
            this.refreshSelectedClass();
            
            this.refreshSelectedText();
            if(!this.options.showNativeDrop) {
                this.positionDropdown();
                if(this.selectDrop.offsetWidth) {
                    this.scrollToItem();
                }
            }
        }
    });
    // custom upload field module
    jcf.addModule({
        name: 'file',
        selector: 'input[type=file]',
        defaultOptions: {
            buttonWidth: 30,
            bigFontSize: 200,
            buttonText:'Choose File',
            wrapperClass:'file-area',
            focusClass:'file-focus',
            disabledClass:'file-disabled',
            opacityClass:'file-input-opacity',
            noFileClass:'no-file',
            extPrefixClass:'extension-',
            uploadStructure:'<div class="jcf-input-wrapper"><div class="jcf-wrap"></div><label class="jcf-fake-input"><span><em></em></span></label><a class="jcf-upload-button"><span></span></a></div>',
            uploadFileNameSelector:'label.jcf-fake-input span em',
            uploadButtonSelector:'a.jcf-upload-button span',
            inputWrapper: 'div.jcf-wrap'
        },
        setupWrapper: function(){
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
            this.fakeElement.innerHTML = this.options.uploadStructure;
            this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
            this.fileNameInput = jcf.lib.queryBySelector(this.options.uploadFileNameSelector ,this.fakeElement)[0];
            this.uploadButton = jcf.lib.queryBySelector(this.options.uploadButtonSelector ,this.fakeElement)[0];
            this.inputWrapper = jcf.lib.queryBySelector(this.options.inputWrapper ,this.fakeElement)[0];

            this.uploadButton.innerHTML = this.realElement.title || this.options.buttonText;
            this.realElement.removeAttribute('title');
            this.fakeElement.style.position = 'relative';
            this.realElement.style.position = 'absolute';
            this.realElement.style.zIndex = 100;
            this.inputWrapper.appendChild(this.realElement);
            this.oTop = this.oLeft = this.oWidth = this.oHeight = 0;

            jcf.lib.addClass(this.realElement, this.options.opacityClass);
            jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
            this.inputWrapper.style.width = this.inputWrapper.parentNode.offsetWidth+'px';

            this.shakeInput();
            this.refreshState();
            this.addEvents();
        },
        addEvents: function(){
            jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
            if(!jcf.isTouchDevice) {
                jcf.lib.event.add(this.fakeElement, 'mousemove', this.onMouseMove, this);
                jcf.lib.event.add(this.fakeElement, 'mouseover', this.recalcDimensions, this);
            }
        },
        onMouseMove: function(e){
            this.realElement.style.top = Math.round(e.pageY - this.oTop - this.oHeight/2) + 'px';
            this.realElement.style.left = (e.pageX - this.oLeft - this.oWidth + this.options.buttonWidth) + 'px';
        },
        onChange: function(){
            this.refreshState();
        },
        getFileName: function(){
            return this.realElement.value.replace(/^[\s\S]*(?:\\|\/)([\s\S^\\\/]*)$/g, "$1");
        },
        getFileExtension: function(){
            return this.realElement.value.lastIndexOf('.') < 0 ? false : this.realElement.value.substring(this.realElement.value.lastIndexOf('.')+1).toLowerCase();
        },
        updateExtensionClass: function(){
            var currentExtension = this.getFileExtension();
            if(currentExtension) {
                this.fakeElement.className = this.fakeElement.className.replace(new RegExp('(\\s|^)'+this.options.extPrefixClass+'[^ ]+','gi'),'')
                jcf.lib.addClass(this.fakeElement, this.options.extPrefixClass+currentExtension)
            }
        },
        shakeInput: function() {
            // make input bigger
            jcf.lib.setStyles(this.realElement, {
                fontSize: this.options.bigFontSize,
                lineHeight: this.options.bigFontSize,
                heigth: 'auto',
                top: 0,
                left: this.inputWrapper.offsetWidth - this.realElement.offsetWidth
            });
            // IE styling fix
            if((/(MSIE)/gi).test(navigator.userAgent)) {
                this.tmpElement = document.createElement('span');
                this.inputWrapper.insertBefore(this.tmpElement,this.realElement);
                this.inputWrapper.insertBefore(this.realElement,this.tmpElement);
                this.inputWrapper.removeChild(this.tmpElement);
            }
        },
        recalcDimensions: function() {
            var o = jcf.lib.getOffset(this.fakeElement);
            this.oTop = o.top;
            this.oLeft = o.left;
            this.oWidth = this.realElement.offsetWidth;
            this.oHeight = this.realElement.offsetHeight;
        },
        refreshState: function(){
            jcf.lib.setStyles(this.realElement, {
                opacity: 0
            });
            this.fileNameInput.innerHTML = this.getFileName();
            if(this.realElement.disabled) {
                jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
            } else {
                jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
            }
            if(this.realElement.value.length) {
                jcf.lib.removeClass(this.fakeElement, this.options.noFileClass);
            } else {
                jcf.lib.addClass(this.fakeElement, this.options.noFileClass);
            }
            this.updateExtensionClass();
        }
    });
    // custom radio module
    jcf.addModule({
        name:'radio',
        selector: 'input[type="radio"]',
        defaultOptions: {
            wrapperClass:'rad-area',
            focusClass:'rad-focus',
            checkedClass:'rad-checked',
            uncheckedClass:'rad-unchecked',
            disabledClass:'rad-disabled',
            radStructure:'<span></span>'
        },
        getRadioGroup: function(item){
            var name = item.getAttribute('name');
            if(name) {
                return jcf.lib.queryBySelector('input[name="'+name+'"]', jcf.lib.getParent('form'));
            } else {
                return [item];
            }
        },
        setupWrapper: function(){
            jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
            this.fakeElement.innerHTML = this.options.radStructure;
            this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
            this.refreshState();
            this.addEvents();
        },
        addEvents: function(){
            jcf.lib.event.add(this.fakeElement, 'click', this.toggleRadio, this);
            if(this.labelFor) {
                jcf.lib.event.add(this.labelFor, 'click', this.toggleRadio, this);
            }
        },
        onFocus: function(e) {
            jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
            setTimeout(jcf.lib.bind(function(){
                this.refreshState();
            },this),10);
        },
        toggleRadio: function(){
            if(!this.realElement.disabled) {
                this.realElement.checked = true;
            }
            this.refreshState();
        },
        refreshState: function(){
            var els = this.getRadioGroup(this.realElement);
            for(var i = 0; i < els.length; i++) {
                var curEl = els[i].jcf;
                if(curEl) {
                    if(curEl.realElement.checked) {
                        jcf.lib.addClass(curEl.fakeElement, curEl.options.checkedClass);
                        jcf.lib.removeClass(curEl.fakeElement, curEl.options.uncheckedClass);
                        if(curEl.labelFor) {
                            jcf.lib.addClass(curEl.labelFor, curEl.options.labelActiveClass);
                        }
                    } else {
                        jcf.lib.removeClass(curEl.fakeElement, curEl.options.checkedClass);
                        jcf.lib.addClass(curEl.fakeElement, curEl.options.uncheckedClass);
                        if(curEl.labelFor) {
                            jcf.lib.removeClass(curEl.labelFor, curEl.options.labelActiveClass);
                        }
                    }
                    if(curEl.realElement.disabled) {
                        jcf.lib.addClass(curEl.fakeElement, curEl.options.disabledClass);
                        if(curEl.labelFor) {
                            jcf.lib.addClass(curEl.labelFor, curEl.options.labelDisabledClass);
                        }
                    } else {
                        jcf.lib.removeClass(curEl.fakeElement, curEl.options.disabledClass);
                        if(curEl.labelFor) {
                            jcf.lib.removeClass(curEl.labelFor, curEl.options.labelDisabledClass);
                        }
                    }
                }
            }
        }
    });
    jcf.customForms.replaceAll();
}


customPrbForms();

// page init
function initNavFix() {
    new touchNav({
        navBlock: 'nav'
    });
    new touchNav({
        //navBlock: 'add-nav'
        });
    new touchNav({
        navBlock: 'links'
    });
}

//Popups
function initPopups() {
    // add button drop
    /*	jQuery('.panel-t').initPopup({
		openClass : 'popup-active',
		opener : 'a.open',
		dropBlock: '.add-block',
		event: 'click',
		bodyClick: true
	}); */
    $('#links > li').livequery(function(){
        jQuery('#links > li').initPopup({
            openClass : 'popup-active',
            opener : '>a',
            dropBlock: '> ul',
            event: 'click',
            bodyClick: true
        });
    })
    
    //add nav login
    $('.add-nav li.initPopup').livequery(function(){
        jQuery('.add-nav li.initPopup').initPopup({
            openClass : 'popup-active',
            opener : 'a.open',
            dropBlock: '.popup',
            event: 'click',
            bodyClick: true
        });
    })
   
    $('a.activity-link').livequery(function(){
        jQuery('.add-nav li').initPopup({
            openClass : 'hover',
            opener : 'a.activity-link',
            dropBlock: '.activity-drop',
            event: 'click',
            bodyClick: true
        });
    })
	
    $('.username').livequery(function(){
        jQuery('.add-nav2 li').initPopup({
            openClass : 'hover',
            opener : '.username',
            dropBlock: '.user-drop',
            event: 'click',
            bodyClick: true
        });
    })

    $('.about-drop').livequery(function(){
        jQuery('.add-nav li').initPopup({
            openClass : 'hover',
            opener : '.name',
            dropBlock: '.about-drop',
            event: 'click',
            bodyClick: true
        });
    })


    
    
}

// navigation accesibility module
function touchNav(opt) {
    this.options = {
        hoverClass: 'hover',
        menuItems: 'li',
        menuOpener: 'a',
        menuDrop: 'div',
        navBlock: null
    }
    for(var p in opt) {
        if(opt.hasOwnProperty(p)) {
            this.options[p] = opt[p];
        }
    }
    this.init();
}
touchNav.prototype = {
    init: function() {
        if(typeof this.options.navBlock === 'string') {
            this.menu = document.getElementById(this.options.navBlock);
        } else if(typeof this.options.navBlock === 'object') {
            this.menu = this.options.navBlock;
        }
        if(this.menu) {
            this.getElements();
            this.addEvents();
        }
    },
    getElements: function() {
        this.menuItems = this.menu.getElementsByTagName(this.options.menuItems);
    },
    getOpener: function(obj) {
        for(var i = 0; i < obj.childNodes.length; i++) {
            if(obj.childNodes[i].tagName && obj.childNodes[i].tagName.toLowerCase() == this.options.menuOpener.toLowerCase()) {
                return obj.childNodes[i];
            }
        }
        return false;
    },
    getDrop: function(obj) {
        for(var i = 0; i < obj.childNodes.length; i++) {
            if(obj.childNodes[i].tagName && obj.childNodes[i].tagName.toLowerCase() == this.options.menuDrop.toLowerCase()) {
                return obj.childNodes[i];
            }
        }
        return false;
    },
    addEvents: function() {
        // attach event handlers
        this.preventCurrentClick = true;
        for(var i = 0; i < this.menuItems.length; i++) {
            this.bind(function(i){
                var item = this.menuItems[i];
                // only for touch input devices
                if(this.isTouchDevice && this.getDrop(item)) {
                    this.addHandler(this.getOpener(item), 'click', this.bind(this.clickHandler));
                    this.addHandler(this.getOpener(item), 'touchstart', this.bind(function(){
                        this.currentItem = item;
                        this.currentLink = this.getOpener(item);
                        this.pressHandler.apply(this, arguments);
                    }));
                }
                // for desktop computers and touch devices
                this.addHandler(item, 'mouseover', this.bind(function(){
                    this.currentItem = item;
                    this.mouseoverHandler();
                }));
                this.addHandler(item, 'mouseout', this.bind(function(){
                    this.currentItem = item;
                    this.mouseoutHandler();
                }));
            })(i);
        }
        // hide dropdowns when clicking outside navigation
        if(this.isTouchDevice) {
            this.addHandler(document, 'touchstart', this.bind(this.clickOutsideHandler));
        }
    },
    mouseoverHandler: function() {
        this.addClass(this.currentItem, this.options.hoverClass);
    },
    mouseoutHandler: function() {
        this.removeClass(this.currentItem, this.options.hoverClass);
    },
    hideActiveDropdown: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.removeClass(this.menuItems[i], this.options.hoverClass);
        }
        this.activeParent = null;
    },
    pressHandler: function(e) {
        // hide previous drop (if active)
        if(this.currentItem != this.activeParent && !this.isParent(this.activeParent, this.currentLink)) {
            this.hideActiveDropdown();
        }
        // handle current drop
        this.activeParent = this.currentItem;
        if(this.hasClass(this.currentItem, this.options.hoverClass)) {
            this.preventCurrentClick = false;
        } else {
            this.preventEvent(e);
            this.preventCurrentClick = true;
            this.addClass(this.currentItem, this.options.hoverClass);
        }
    },
    clickHandler: function(e) {
        // prevent first click on link
        if(this.preventCurrentClick) {
            this.preventEvent(e);
        }
    },
    clickOutsideHandler: function(event) {
        var e = event.changedTouches ? event.changedTouches[0] : event;
        if(this.activeParent && !this.isParent(this.menu, e.target)) {
            this.hideActiveDropdown();
        }
    },
    preventEvent: function(e) {
        if(!e) e = window.event;
        if(e.preventDefault) e.preventDefault();
        e.returnValue = false;
    },
    isParent: function(parent, child) {
        while(child.parentNode) {
            if(child.parentNode == parent) {
                return true;
            }
            child = child.parentNode;
        }
        return false;
    },
    isTouchDevice: (function() {
        try {
            return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) || navigator.userAgent.indexOf('IEMobile') != -1;
        } catch (e) {
            return false;
        }
    }()),
    addHandler: function(object, event, handler) {
        if (object.addEventListener) object.addEventListener(event, handler, false);
        else if (object.attachEvent) object.attachEvent('on' + event, handler);
    },
    removeHandler: function(object, event, handler) {
        if (object.removeEventListener) object.removeEventListener(event, handler, false);
        else if (object.detachEvent) object.detachEvent('on' + event, handler);
    },
    hasClass: function(obj,cname) {
        return (obj.className ? obj.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')) : false);
    },
    addClass: function(obj,cname) {
        if (!this.hasClass(obj,cname)) obj.className += " "+cname;
    },
    removeClass: function(obj,cname) {
        if (this.hasClass(obj,cname)) obj.className=obj.className.replace(new RegExp('(\\s|^)'+cname+'(\\s|$)'),' ');
    },
    bind: function(func, scope){
        var newScope = scope || this;
        return function() {
            return func.apply(newScope, arguments);
        }
    }
}
//popup

jQuery.fn.initPopup = function(opt) {
    var options = jQuery.extend({
        openClass : 'popup-active',
        opener : 'a.open',
        dropBlock: '.add-block',
        event: 'click',
        bodyClick: false
    },opt);
    return this.each(function(){
        var holder = jQuery(this);
        var opener = holder.find(options.opener);
        var drop = holder.find(options.dropBlock);
        var openClass = options.openClass;
		
        opener.bind('click', function(){
            if(holder.hasClass(openClass)){
                holder.removeClass(openClass);
            }
            else{
                holder.addClass(openClass);
            }
            return false;
        });
		
        if(options.bodyClick){
            jQuery('body').click(function(e){
                var flag = false;
                jQuery(e.target).parents().each(function(){
                    if(this === holder[0]) {
                    //   flag = true;
                    }
                    else if($(this).parents('.ui-autocomplete').length>0)
                    {
                        flag = true;
                    }
                    else if($(this).parents('.add-block').length>0)
                    {
                        flag=true;
                    }
                });
                if(!flag) {
                    holder.removeClass(openClass);
                }
            });
        }
    });
}

// mobile browsers detect
browserPlatform = {
    platforms: [
    {
        uaString:'iemobile',
        cssFile:'iemobile.css',
        miscHead:'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
    }, // IE Mobile 6+

    {
        uaString:'Android',
        cssFile:'android.css',
        miscHead:'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
    }, // Android

    {
        uaString:['BlackBerry','/6.0','mobi'],
        cssFile:'blackberry6.css',
        miscHead:'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
    },	// Blackberry 6

    {
        uaString:['BlackBerry','/7.0','mobi'],
        cssFile:'blackberry7.css',
        miscHead:'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
    },	// Blackberry 7+

    {
        uaString:'ipad',
        cssFile:'ipad.css',
        miscHead:'<meta name="viewport" content="width=960" />'
    }, // iPad

    {
        uaString:['safari','mobi'],
        cssFile:'safari.css',
        miscHead:'<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
    } // iPhone and other webkit browsers
    ],
    options: {
        cssPath:'css/',
        mobileCSS:'allmobile.css'
    },
    init:function(){
        this.checkMobile();
        this.parsePlatforms();
        return this;
    },
    checkMobile: function() {
        if(this.uaMatch('mobi') || this.uaMatch('midp') || this.uaMatch('ppc') || this.uaMatch('webos')) {
            this.attachStyles({
                cssFile:this.options.mobileCSS
            });
        }
    },
    parsePlatforms: function() {
        for(var i = 0; i < this.platforms.length; i++) {
            if(typeof this.platforms[i].uaString === 'string') {
                if(this.uaMatch(this.platforms[i].uaString)) {
                    this.attachStyles(this.platforms[i]);
                    break;
                }
            } else {
                for(var j = 0, allMatch = true; j < this.platforms[i].uaString.length; j++) {
                    if(!this.uaMatch(this.platforms[i].uaString[j])) {
                        allMatch = false;
                    }
                }
                if(allMatch) {
                    this.attachStyles(this.platforms[i]);
                    break;
                }
            }
        }
    },
    attachStyles: function(platform) {
        var head = document.getElementsByTagName('head')[0], fragment;
        var cssText = '<link rel="stylesheet" href="' + this.options.cssPath + platform.cssFile + '" type="text/css"/>';
        var miscText = platform.miscHead;
        if(platform.cssFile) {
            if(document.body) {
                fragment = document.createElement('div');
                fragment.innerHTML = cssText;
                head.appendChild(fragment.childNodes[0]);
            } else {
                document.write(cssText);
            }
        }
        if(platform.miscHead) {
            if(document.body) {
                fragment = document.createElement('div');
                fragment.innerHTML = miscText;
                head.appendChild(fragment.childNodes[0]);
            } else {
                document.write(miscText);
            }
        }
    },
    uaMatch:function(str) {
        if(!this.ua) {
            this.ua = navigator.userAgent.toLowerCase();
        }
        return this.ua.indexOf(str.toLowerCase()) != -1;
    }
}.init();

/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.4
------------------------------------------------------------------------- */

;(function($){
    $.prettyPhoto={
        version:'3.1.4'
    };$.fn.prettyPhoto=function(pp_settings){
        pp_settings=jQuery.extend({
            hook:'rel',
            animation_speed:'fast',
            ajaxcallback:function(){},
            slideshow:5000,
            autoplay_slideshow:false,
            opacity:0.80,
            show_title:true,
            allow_resize:true,
            allow_expand:true,
            default_width:500,
            default_height:344,
            counter_separator_label:'/',
            theme:'pp_default',
            horizontal_padding:20,
            hideflash:false,
            wmode:'opaque',
            autoplay:true,
            modal:false,
            deeplinking:true,
            overlay_gallery:true,
            overlay_gallery_max:30,
            keyboard_shortcuts:true,
            changepicturecallback:function(){},
            callback:function(){},
            ie6_fallback:true,
            markup:'<div class="pp_pic_holder"> \
      <div class="ppt">&nbsp;</div> \
      <div class="pp_top"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
      <div class="pp_content_container"> \
       <div class="pp_left"> \
       <div class="pp_right"> \
        <div class="pp_content"> \
         <div class="pp_loaderIcon"></div> \
         <div class="pp_fade"> \
          <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
          <div class="pp_hoverContainer"> \
           <a class="pp_next" href="#">next</a> \
           <a class="pp_previous" href="#">previous</a> \
          </div> \
          <div id="pp_full_res"></div> \
          <div class="pp_details"> \
           <div class="pp_nav"> \
            <a href="#" class="pp_arrow_previous">Previous</a> \
            <p class="currentTextHolder">0/0</p> \
            <a href="#" class="pp_arrow_next">Next</a> \
           </div> \
           <p class="pp_description"></p> \
           <div class="pp_social">{pp_social}</div> \
           <a class="pp_close" href="#">Close</a> \
          </div> \
         </div> \
        </div> \
       </div> \
       </div> \
      </div> \
      <div class="pp_bottom"> \
       <div class="pp_left"></div> \
       <div class="pp_middle"></div> \
       <div class="pp_right"></div> \
      </div> \
     </div> \
     <div class="pp_overlay"></div>',
            gallery_markup:'<div class="pp_gallery"> \
        <a href="#" class="pp_arrow_previous">Previous</a> \
        <div> \
         <ul> \
          {gallery} \
         </ul> \
        </div> \
        <a href="#" class="pp_arrow_next">Next</a> \
       </div>',
            image_markup:'<img id="fullResImage" src="{path}" />',
            flash_markup:'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
            quicktime_markup:'<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
            iframe_markup:'<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
            inline_markup:'<div class="pp_inline">{content}</div>',
            custom_markup:'',
            social_tools:'<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
        },pp_settings);var matchedObjects=this,percentBased=false,pp_dimensions,pp_open,pp_contentHeight,pp_contentWidth,pp_containerHeight,pp_containerWidth,windowHeight=$(window).height(),windowWidth=$(window).width(),pp_slideshow;doresize=true,scroll_pos=_get_scroll();$(window).unbind('resize.prettyphoto').bind('resize.prettyphoto',function(){
            _center_overlay();_resize_overlay();
        });if(pp_settings.keyboard_shortcuts){
            $(document).unbind('keydown.prettyphoto').bind('keydown.prettyphoto',function(e){
                if(typeof $pp_pic_holder!='undefined'){
                    if($pp_pic_holder.is(':visible')){
                        switch(e.keyCode){
                            case 37:$.prettyPhoto.changePage('previous');e.preventDefault();break;case 39:$.prettyPhoto.changePage('next');e.preventDefault();break;case 27:if(!settings.modal)
                                $.prettyPhoto.close();e.preventDefault();break;
                        };
                    };
                };
            });
        };$.prettyPhoto.initialize=function(){
            settings=pp_settings;if(settings.theme=='pp_default')settings.horizontal_padding=16;if(settings.ie6_fallback&&$.browser.msie&&parseInt($.browser.version)==6)settings.theme="light_square";theRel=$(this).attr(settings.hook);galleryRegExp=/\[(?:.*)\]/;isSet=(galleryRegExp.exec(theRel))?true:false;pp_images=(isSet)?jQuery.map(matchedObjects,function(n,i){
                if($(n).attr(settings.hook).indexOf(theRel)!=-1)return $(n).attr('href');
            }):$.makeArray($(this).attr('href'));pp_titles=(isSet)?jQuery.map(matchedObjects,function(n,i){
                if($(n).attr(settings.hook).indexOf(theRel)!=-1)return($(n).find('img').attr('alt'))?$(n).find('img').attr('alt'):"";
            }):$.makeArray($(this).find('img').attr('alt'));pp_descriptions=(isSet)?jQuery.map(matchedObjects,function(n,i){
                if($(n).attr(settings.hook).indexOf(theRel)!=-1)return($(n).attr('title'))?$(n).attr('title'):"";
            }):$.makeArray($(this).attr('title'));if(pp_images.length>settings.overlay_gallery_max)settings.overlay_gallery=false;set_position=jQuery.inArray($(this).attr('href'),pp_images);rel_index=(isSet)?set_position:$("a["+settings.hook+"^='"+theRel+"']").index($(this));_build_overlay(this);if(settings.allow_resize)
                $(window).bind('scroll.prettyphoto',function(){
                    _center_overlay();
                });$.prettyPhoto.open();return false;
        }
        $.prettyPhoto.open=function(event){
            if(typeof settings=="undefined"){
                settings=pp_settings;if($.browser.msie&&$.browser.version==6)settings.theme="light_square";pp_images=$.makeArray(arguments[0]);pp_titles=(arguments[1])?$.makeArray(arguments[1]):$.makeArray("");pp_descriptions=(arguments[2])?$.makeArray(arguments[2]):$.makeArray("");isSet=(pp_images.length>1)?true:false;set_position=(arguments[3])?arguments[3]:0;_build_overlay(event.target);
            }
            if($.browser.msie&&$.browser.version==6)$('select').css('visibility','hidden');if(settings.hideflash)$('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','hidden');_checkPosition($(pp_images).size());$('.pp_loaderIcon').show();if(settings.deeplinking)
                setHashtag();if(settings.social_tools){
                facebook_like_link=settings.social_tools.replace('{location_href}',encodeURIComponent(location.href));$pp_pic_holder.find('.pp_social').html(facebook_like_link);
            }
            if($ppt.is(':hidden'))$ppt.css('opacity',0).show();$pp_overlay.show().fadeTo(settings.animation_speed,settings.opacity);$pp_pic_holder.find('.currentTextHolder').text((set_position+1)+settings.counter_separator_label+$(pp_images).size());if(typeof pp_descriptions[set_position]!='undefined'&&pp_descriptions[set_position]!=""){
                $pp_pic_holder.find('.pp_description').show().html(unescape(pp_descriptions[set_position]));
            }else{
                $pp_pic_holder.find('.pp_description').hide();
            }
            movie_width=(parseFloat(getParam('width',pp_images[set_position])))?getParam('width',pp_images[set_position]):settings.default_width.toString();movie_height=(parseFloat(getParam('height',pp_images[set_position])))?getParam('height',pp_images[set_position]):settings.default_height.toString();percentBased=false;if(movie_height.indexOf('%')!=-1){
                movie_height=parseFloat(($(window).height()*parseFloat(movie_height)/100)-150);percentBased=true;
            }
            if(movie_width.indexOf('%')!=-1){
                movie_width=parseFloat(($(window).width()*parseFloat(movie_width)/100)-150);percentBased=true;
            }
            $pp_pic_holder.fadeIn(function(){
                (settings.show_title&&pp_titles[set_position]!=""&&typeof pp_titles[set_position]!="undefined")?$ppt.html(unescape(pp_titles[set_position])):$ppt.html('&nbsp;');imgPreloader="";skipInjection=false;switch(_getFileType(pp_images[set_position])){
                    case'image':imgPreloader=new Image();nextImage=new Image();if(isSet&&set_position<$(pp_images).size()-1)nextImage.src=pp_images[set_position+1];prevImage=new Image();if(isSet&&pp_images[set_position-1])prevImage.src=pp_images[set_position-1];$pp_pic_holder.find('#pp_full_res')[0].innerHTML=settings.image_markup.replace(/{path}/g,pp_images[set_position]);imgPreloader.onload=function(){
                        pp_dimensions=_fitToViewport(imgPreloader.width,imgPreloader.height);_showContent();
                    };imgPreloader.onerror=function(){
                        alert('Image cannot be loaded. Make sure the path is correct and image exist.');$.prettyPhoto.close();
                    };imgPreloader.src=pp_images[set_position];break;case'youtube':pp_dimensions=_fitToViewport(movie_width,movie_height);movie_id=getParam('v',pp_images[set_position]);if(movie_id==""){
                        movie_id=pp_images[set_position].split('youtu.be/');movie_id=movie_id[1];if(movie_id.indexOf('?')>0)
                            movie_id=movie_id.substr(0,movie_id.indexOf('?'));if(movie_id.indexOf('&')>0)
                            movie_id=movie_id.substr(0,movie_id.indexOf('&'));
                    }
                    movie='http://www.youtube.com/embed/'+movie_id;(getParam('rel',pp_images[set_position]))?movie+="?rel="+getParam('rel',pp_images[set_position]):movie+="?rel=1";if(settings.autoplay)movie+="&autoplay=1";toInject=settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,movie);break;case'vimeo':pp_dimensions=_fitToViewport(movie_width,movie_height);movie_id=pp_images[set_position];var regExp=/http:\/\/(www\.)?vimeo.com\/(\d+)/;var match=movie_id.match(regExp);movie='http://player.vimeo.com/video/'+match[2]+'?title=0&amp;byline=0&amp;portrait=0';if(settings.autoplay)movie+="&autoplay=1;";vimeo_width=pp_dimensions['width']+'/embed/?moog_width='+pp_dimensions['width'];toInject=settings.iframe_markup.replace(/{width}/g,vimeo_width).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,movie);break;case'quicktime':pp_dimensions=_fitToViewport(movie_width,movie_height);pp_dimensions['height']+=15;pp_dimensions['contentHeight']+=15;pp_dimensions['containerHeight']+=15;toInject=settings.quicktime_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,pp_images[set_position]).replace(/{autoplay}/g,settings.autoplay);break;case'flash':pp_dimensions=_fitToViewport(movie_width,movie_height);flash_vars=pp_images[set_position];flash_vars=flash_vars.substring(pp_images[set_position].indexOf('flashvars')+10,pp_images[set_position].length);filename=pp_images[set_position];filename=filename.substring(0,filename.indexOf('?'));toInject=settings.flash_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{wmode}/g,settings.wmode).replace(/{path}/g,filename+'?'+flash_vars);break;case'iframe':pp_dimensions=_fitToViewport(movie_width,movie_height);frame_url=pp_images[set_position];frame_url=frame_url.substr(0,frame_url.indexOf('iframe')-1);toInject=settings.iframe_markup.replace(/{width}/g,pp_dimensions['width']).replace(/{height}/g,pp_dimensions['height']).replace(/{path}/g,frame_url);break;case'ajax':doresize=false;pp_dimensions=_fitToViewport(movie_width,movie_height);doresize=true;skipInjection=true;$.get(pp_images[set_position],function(responseHTML){
                        toInject=settings.inline_markup.replace(/{content}/g,responseHTML);$pp_pic_holder.find('#pp_full_res')[0].innerHTML=toInject;_showContent();
                    });break;case'custom':pp_dimensions=_fitToViewport(movie_width,movie_height);toInject=settings.custom_markup;break;case'inline':myClone=$(pp_images[set_position]).clone().append('<br clear="all" />').css({
                        'width':settings.default_width
                    }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo($('body')).show();doresize=false;pp_dimensions=_fitToViewport($(myClone).width(),$(myClone).height());doresize=true;$(myClone).remove();toInject=settings.inline_markup.replace(/{content}/g,$(pp_images[set_position]).html());break;
                };if(!imgPreloader&&!skipInjection){
                    $pp_pic_holder.find('#pp_full_res')[0].innerHTML=toInject;_showContent();
                };
            });return false;
        };$.prettyPhoto.changePage=function(direction){
            currentGalleryPage=0;if(direction=='previous'){
                set_position--;if(set_position<0)set_position=$(pp_images).size()-1;
            }else if(direction=='next'){
                set_position++;if(set_position>$(pp_images).size()-1)set_position=0;
            }else{
                set_position=direction;
            };rel_index=set_position;if(!doresize)doresize=true;if(settings.allow_expand){
                $('.pp_contract').removeClass('pp_contract').addClass('pp_expand');
            }
            _hideContent(function(){
                $.prettyPhoto.open();
            });
        };$.prettyPhoto.changeGalleryPage=function(direction){
            if(direction=='next'){
                currentGalleryPage++;if(currentGalleryPage>totalPage)currentGalleryPage=0;
            }else if(direction=='previous'){
                currentGalleryPage--;if(currentGalleryPage<0)currentGalleryPage=totalPage;
            }else{
                currentGalleryPage=direction;
            };slide_speed=(direction=='next'||direction=='previous')?settings.animation_speed:0;slide_to=currentGalleryPage*(itemsPerPage*itemWidth);$pp_gallery.find('ul').animate({
                left:-slide_to
            },slide_speed);
        };$.prettyPhoto.startSlideshow=function(){
            if(typeof pp_slideshow=='undefined'){
                $pp_pic_holder.find('.pp_play').unbind('click').removeClass('pp_play').addClass('pp_pause').click(function(){
                    $.prettyPhoto.stopSlideshow();return false;
                });pp_slideshow=setInterval($.prettyPhoto.startSlideshow,settings.slideshow);
            }else{
                $.prettyPhoto.changePage('next');
            };
        }
        $.prettyPhoto.stopSlideshow=function(){
            $pp_pic_holder.find('.pp_pause').unbind('click').removeClass('pp_pause').addClass('pp_play').click(function(){
                $.prettyPhoto.startSlideshow();return false;
            });clearInterval(pp_slideshow);pp_slideshow=undefined;
        }
        $.prettyPhoto.close=function(){
            if($pp_overlay.is(":animated"))return;$.prettyPhoto.stopSlideshow();$pp_pic_holder.stop().find('object,embed').css('visibility','hidden');$('div.pp_pic_holder,div.ppt,.pp_fade').fadeOut(settings.animation_speed,function(){
                $(this).remove();
            });$pp_overlay.fadeOut(settings.animation_speed,function(){
                if($.browser.msie&&$.browser.version==6)$('select').css('visibility','visible');if(settings.hideflash)$('object,embed,iframe[src*=youtube],iframe[src*=vimeo]').css('visibility','visible');$(this).remove();$(window).unbind('scroll.prettyphoto');clearHashtag();settings.callback();doresize=true;pp_open=false;delete settings;
            });
        };function _showContent(){
            $('.pp_loaderIcon').hide();projectedTop=scroll_pos['scrollTop']+((windowHeight/2)-(pp_dimensions['containerHeight']/2));if(projectedTop<0)projectedTop=0;$ppt.fadeTo(settings.animation_speed,1);$pp_pic_holder.find('.pp_content').animate({
                height:pp_dimensions['contentHeight'],
                width:pp_dimensions['contentWidth']
            },settings.animation_speed);$pp_pic_holder.animate({
                'top':projectedTop,
                'left':((windowWidth/2)-(pp_dimensions['containerWidth']/2)<0)?0:(windowWidth/2)-(pp_dimensions['containerWidth']/2),
                width:pp_dimensions['containerWidth']
            },settings.animation_speed,function(){
                $pp_pic_holder.find('.pp_hoverContainer,#fullResImage').height(pp_dimensions['height']).width(pp_dimensions['width']);$pp_pic_holder.find('.pp_fade').fadeIn(settings.animation_speed);if(isSet&&_getFileType(pp_images[set_position])=="image"){
                    $pp_pic_holder.find('.pp_hoverContainer').show();
                }else{
                    $pp_pic_holder.find('.pp_hoverContainer').hide();
                }
                if(settings.allow_expand){
                    if(pp_dimensions['resized']){
                        $('a.pp_expand,a.pp_contract').show();
                    }else{
                        $('a.pp_expand').hide();
                    }
                }
                if(settings.autoplay_slideshow&&!pp_slideshow&&!pp_open)$.prettyPhoto.startSlideshow();settings.changepicturecallback();pp_open=true;
            });_insert_gallery();pp_settings.ajaxcallback();
        };function _hideContent(callback){
            $pp_pic_holder.find('#pp_full_res object,#pp_full_res embed').css('visibility','hidden');$pp_pic_holder.find('.pp_fade').fadeOut(settings.animation_speed,function(){
                $('.pp_loaderIcon').show();callback();
            });
        };function _checkPosition(setCount){
            (setCount>1)?$('.pp_nav').show():$('.pp_nav').hide();
        };function _fitToViewport(width,height){
            resized=false;_getDimensions(width,height);imageWidth=width,imageHeight=height;if(((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight))&&doresize&&settings.allow_resize&&!percentBased){
                resized=true,fitting=false;while(!fitting){
                    if((pp_containerWidth>windowWidth)){
                        imageWidth=(windowWidth-200);imageHeight=(height/width)*imageWidth;
                    }else if((pp_containerHeight>windowHeight)){
                        imageHeight=(windowHeight-200);imageWidth=(width/height)*imageHeight;
                    }else{
                        fitting=true;
                    };pp_containerHeight=imageHeight,pp_containerWidth=imageWidth;
                };_getDimensions(imageWidth,imageHeight);if((pp_containerWidth>windowWidth)||(pp_containerHeight>windowHeight)){
                    _fitToViewport(pp_containerWidth,pp_containerHeight)
                };
            };return{
                width:Math.floor(imageWidth),
                height:Math.floor(imageHeight),
                containerHeight:Math.floor(pp_containerHeight),
                containerWidth:Math.floor(pp_containerWidth)+(settings.horizontal_padding*2),
                contentHeight:Math.floor(pp_contentHeight),
                contentWidth:Math.floor(pp_contentWidth),
                resized:resized
            };
        };function _getDimensions(width,height){
            width=parseFloat(width);height=parseFloat(height);$pp_details=$pp_pic_holder.find('.pp_details');$pp_details.width(width);detailsHeight=parseFloat($pp_details.css('marginTop'))+parseFloat($pp_details.css('marginBottom'));$pp_details=$pp_details.clone().addClass(settings.theme).width(width).appendTo($('body')).css({
                'position':'absolute',
                'top':-10000
            });detailsHeight+=$pp_details.height();detailsHeight=(detailsHeight<=34)?36:detailsHeight;if($.browser.msie&&$.browser.version==7)detailsHeight+=8;$pp_details.remove();$pp_title=$pp_pic_holder.find('.ppt');$pp_title.width(width);titleHeight=parseFloat($pp_title.css('marginTop'))+parseFloat($pp_title.css('marginBottom'));$pp_title=$pp_title.clone().appendTo($('body')).css({
                'position':'absolute',
                'top':-10000
            });titleHeight+=$pp_title.height();$pp_title.remove();pp_contentHeight=height+detailsHeight;pp_contentWidth=width;pp_containerHeight=pp_contentHeight+titleHeight+$pp_pic_holder.find('.pp_top').height()+$pp_pic_holder.find('.pp_bottom').height();pp_containerWidth=width;
        }
        function _getFileType(itemSrc){
            if(itemSrc.match(/youtube\.com\/watch/i)||itemSrc.match(/youtu\.be/i)){
                return'youtube';
            }else if(itemSrc.match(/vimeo\.com/i)){
                return'vimeo';
            }else if(itemSrc.match(/\b.mov\b/i)){
                return'quicktime';
            }else if(itemSrc.match(/\b.swf\b/i)){
                return'flash';
            }else if(itemSrc.match(/\biframe=true\b/i)){
                return'iframe';
            }else if(itemSrc.match(/\bajax=true\b/i)){
                return'ajax';
            }else if(itemSrc.match(/\bcustom=true\b/i)){
                return'custom';
            }else if(itemSrc.substr(0,1)=='#'){
                return'inline';
            }else{
                return'image';
            };
        };function _center_overlay(){
            if(doresize&&typeof $pp_pic_holder!='undefined'){
                scroll_pos=_get_scroll();contentHeight=$pp_pic_holder.height(),contentwidth=$pp_pic_holder.width();projectedTop=(windowHeight/2)+scroll_pos['scrollTop']-(contentHeight/2);if(projectedTop<0)projectedTop=0;if(contentHeight>windowHeight)
                    return;$pp_pic_holder.css({
                    'top':projectedTop,
                    'left':(windowWidth/2)+scroll_pos['scrollLeft']-(contentwidth/2)
                });
            };
        };function _get_scroll(){
            if(self.pageYOffset){
                return{
                    scrollTop:self.pageYOffset,
                    scrollLeft:self.pageXOffset
                };
            }else if(document.documentElement&&document.documentElement.scrollTop){
                return{
                    scrollTop:document.documentElement.scrollTop,
                    scrollLeft:document.documentElement.scrollLeft
                };
            }else if(document.body){
                return{
                    scrollTop:document.body.scrollTop,
                    scrollLeft:document.body.scrollLeft
                };
            };
        };function _resize_overlay(){
            windowHeight=$(window).height(),windowWidth=$(window).width();if(typeof $pp_overlay!="undefined")$pp_overlay.height($(document).height()).width(windowWidth);
        };function _insert_gallery(){
            if(isSet&&settings.overlay_gallery&&_getFileType(pp_images[set_position])=="image"&&(settings.ie6_fallback&&!($.browser.msie&&parseInt($.browser.version)==6))){
                itemWidth=52+5;navWidth=(settings.theme=="facebook"||settings.theme=="pp_default")?50:30;itemsPerPage=Math.floor((pp_dimensions['containerWidth']-100-navWidth)/itemWidth);itemsPerPage=(itemsPerPage<pp_images.length)?itemsPerPage:pp_images.length;totalPage=Math.ceil(pp_images.length/itemsPerPage)-1;if(totalPage==0){
                    navWidth=0;$pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').hide();
                }else{
                    $pp_gallery.find('.pp_arrow_next,.pp_arrow_previous').show();
                };galleryWidth=itemsPerPage*itemWidth;fullGalleryWidth=pp_images.length*itemWidth;$pp_gallery.css('margin-left',-((galleryWidth/2)+(navWidth/2))).find('div:first').width(galleryWidth+5).find('ul').width(fullGalleryWidth).find('li.selected').removeClass('selected');goToPage=(Math.floor(set_position/itemsPerPage)<totalPage)?Math.floor(set_position/itemsPerPage):totalPage;$.prettyPhoto.changeGalleryPage(goToPage);$pp_gallery_li.filter(':eq('+set_position+')').addClass('selected');
            }else{
                $pp_pic_holder.find('.pp_content').unbind('mouseenter mouseleave');
            }
        }
        function _build_overlay(caller){
            if(settings.social_tools)
                facebook_like_link=settings.social_tools.replace('{location_href}',encodeURIComponent(location.href));settings.markup=settings.markup.replace('{pp_social}','');$('body').append(settings.markup);$pp_pic_holder=$('.pp_pic_holder'),$ppt=$('.ppt'),$pp_overlay=$('div.pp_overlay');if(isSet&&settings.overlay_gallery){
                currentGalleryPage=0;toInject="";for(var i=0;i<pp_images.length;i++){
                    if(!pp_images[i].match(/\b(jpg|jpeg|png|gif)\b/gi)){
                        classname='default';img_src='';
                    }else{
                        classname='';img_src=pp_images[i];
                    }
                    toInject+="<li class='"+classname+"'><a href='#'><img src='"+img_src+"' width='50' alt='' /></a></li>";
                };toInject=settings.gallery_markup.replace(/{gallery}/g,toInject);$pp_pic_holder.find('#pp_full_res').after(toInject);$pp_gallery=$('.pp_pic_holder .pp_gallery'),$pp_gallery_li=$pp_gallery.find('li');$pp_gallery.find('.pp_arrow_next').click(function(){
                    $.prettyPhoto.changeGalleryPage('next');$.prettyPhoto.stopSlideshow();return false;
                });$pp_gallery.find('.pp_arrow_previous').click(function(){
                    $.prettyPhoto.changeGalleryPage('previous');$.prettyPhoto.stopSlideshow();return false;
                });$pp_pic_holder.find('.pp_content').hover(function(){
                    $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeIn();
                },function(){
                    $pp_pic_holder.find('.pp_gallery:not(.disabled)').fadeOut();
                });itemWidth=52+5;$pp_gallery_li.each(function(i){
                    $(this).find('a').click(function(){
                        $.prettyPhoto.changePage(i);$.prettyPhoto.stopSlideshow();return false;
                    });
                });
            };if(settings.slideshow){
                $pp_pic_holder.find('.pp_nav').prepend('<a href="#" class="pp_play">Play</a>')
                $pp_pic_holder.find('.pp_nav .pp_play').click(function(){
                    $.prettyPhoto.startSlideshow();return false;
                });
            }
            $pp_pic_holder.attr('class','pp_pic_holder '+settings.theme);$pp_overlay.css({
                'opacity':0,
                'height':$(document).height(),
                'width':$(window).width()
            }).bind('click',function(){
                if(!settings.modal)$.prettyPhoto.close();
            });$('a.pp_close').bind('click',function(){
                $.prettyPhoto.close();return false;
            });if(settings.allow_expand){
                $('a.pp_expand').bind('click',function(e){
                    if($(this).hasClass('pp_expand')){
                        $(this).removeClass('pp_expand').addClass('pp_contract');doresize=false;
                    }else{
                        $(this).removeClass('pp_contract').addClass('pp_expand');doresize=true;
                    };_hideContent(function(){
                        $.prettyPhoto.open();
                    });return false;
                });
            }
            $pp_pic_holder.find('.pp_previous, .pp_nav .pp_arrow_previous').bind('click',function(){
                $.prettyPhoto.changePage('previous');$.prettyPhoto.stopSlideshow();return false;
            });$pp_pic_holder.find('.pp_next, .pp_nav .pp_arrow_next').bind('click',function(){
                $.prettyPhoto.changePage('next');$.prettyPhoto.stopSlideshow();return false;
            });_center_overlay();
        };if(!pp_alreadyInitialized&&getHashtag()){
            pp_alreadyInitialized=true;hashIndex=getHashtag();hashRel=hashIndex;hashIndex=hashIndex.substring(hashIndex.indexOf('/')+1,hashIndex.length-1);hashRel=hashRel.substring(0,hashRel.indexOf('/'));setTimeout(function(){
                $("a["+pp_settings.hook+"^='"+hashRel+"']:eq("+hashIndex+")").trigger('click');
            },50);
        }
        return this.unbind('click.prettyphoto').bind('click.prettyphoto',$.prettyPhoto.initialize);
    };function getHashtag(){
        url=location.href;hashtag=(url.indexOf('#prettyPhoto')!==-1)?decodeURI(url.substring(url.indexOf('#prettyPhoto')+1,url.length)):false;return hashtag;
    };function setHashtag(){
        if(typeof theRel=='undefined')return;location.hash=theRel+'/'+rel_index+'/';
    };function clearHashtag(){
        if(location.href.indexOf('#prettyPhoto')!==-1)location.hash="prettyPhoto";
    }
    function getParam(name,url){
        name=name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");var regexS="[\\?&]"+name+"=([^&#]*)";var regex=new RegExp(regexS);var results=regex.exec(url);return(results==null)?"":results[1];
    }
})(jQuery);var pp_alreadyInitialized=false;


// masonry
/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
;(function(a,b,c){
    "use strict";var d=b.event,e;d.special.smartresize={
        setup:function(){
            b(this).bind("resize",d.special.smartresize.handler)
        },
        teardown:function(){
            b(this).unbind("resize",d.special.smartresize.handler)
        },
        handler:function(a,c){
            var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){
                b.event.handle.apply(d,f)
            },c==="execAsap"?0:100)
        }
    },b.fn.smartresize=function(a){
        return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])
    },b.Mason=function(a,c){
        this.element=b(c),this._create(a),this._init()
    },b.Mason.settings={
        isResizable:!0,
        isAnimated:!1,
        animationOptions:{
            queue:!1,
            duration:500
        },
        gutterWidth:0,
        isRTL:!1,
        isFitWidth:!1,
        containerStyle:{
            position:"relative"
        }
    },b.Mason.prototype={
        _filterFindBricks:function(a){
            var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a
        },
        _getBricks:function(a){
            var b=this._filterFindBricks(a).css({
                position:"absolute"
            }).addClass("masonry-brick");return b
        },
        _create:function(c){
            this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={
                height:d.height||""
            };var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={
                x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),
                y:parseInt(this.element.css("padding-top"),10)
            },this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){
                g.element.addClass("masonry")
            },0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){
                g.resize()
            }),this.reloadItems()
        },
        _init:function(a){
            this._getColumns(),this._reLayout(a)
        },
        option:function(a,c){
            b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))
        },
        layout:function(a,b){
            for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){
                var f=0;c=this.cols;while(--c){
                    if(this.colYs[c]!==0)break;f++
                }e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth
            }this.styleQueue.push({
                $el:this.element,
                style:e
            });var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0
        },
        _getColumns:function(){
            var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)
        },
        _placeBrick:function(a){
            var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{
                e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)
            }var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){
                j=k;break
            }var m={
                top:i+this.offset.y
            };m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({
                $el:c,
                style:m
            });var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n
        },
        resize:function(){
            var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()
        },
        _reLayout:function(a){
            var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)
        },
        reloadItems:function(){
            this.$bricks=this._getBricks(this.element.children())
        },
        reload:function(a){
            this.reloadItems(),this._init(a)
        },
        appended:function(a,b,c){
            if(b){
                this._filterFindBricks(a).css({
                    top:this.element.height()
                });var d=this;setTimeout(function(){
                    d._appended(a,c)
                },1)
            }else this._appended(a,c)
        },
        _appended:function(a,b){
            var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)
        },
        remove:function(a){
            this.$bricks=this.$bricks.not(a),a.remove()
        },
        destroy:function(){
            this.$bricks.removeClass("masonry-brick").each(function(){
                this.style.position="",this.style.top="",this.style.left=""
            });var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")
        }
    },b.fn.imagesLoaded=function(a){
        function h(){
            a.call(c,d)
        }function i(a){
            var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))
        }var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){
            var a=this.src;this.src=f,this.src=a
        }),c
    };var f=function(b){
        a.console&&a.console.error(b)
    };b.fn.masonry=function(a){
        if(typeof a=="string"){
            var c=Array.prototype.slice.call(arguments,1);this.each(function(){
                var d=b.data(this,"masonry");if(!d){
                    f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return
                }if(!b.isFunction(d[a])||a.charAt(0)==="_"){
                    f("no such method '"+a+"' for masonry instance");return
                }d[a].apply(d,c)
            })
        }else this.each(function(){
            var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))
        });return this
    }
})(window,jQuery);

/*
	--------------------------------
	Infinite Scroll
	--------------------------------
	+ https://github.com/paulirish/infinitescroll
	+ version 2.0b2.110713
	+ Copyright 2011 Paul Irish & Luke Shumard
	+ Licensed under the MIT license
	
	+ Documentation: http://infinite-scroll.com/
	
*/

(function(window,$,undefined){
    $.infinitescroll=function infscr(options,callback,element){
        this.element=$(element);this._create(options,callback);
    };$.infinitescroll.defaults={
        loading:{
            finished:undefined,
            finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",
            img:"http://www.infinite-scroll.com/loading.gif",
            msg:null,
            msgText:"<em>Loading the next set of posts...</em>",
            selector:null,
            speed:'fast',
            start:undefined
        },
        state:{
            isDuringAjax:false,
            isInvalidPage:false,
            isDestroyed:false,
            isDone:false,
            isPaused:false,
            currPage:1
        },
        callback:undefined,
        debug:false,
        behavior:undefined,
        binder:$(window),
        nextSelector:"div.navigation a:first",
        navSelector:"div.navigation",
        contentSelector:null,
        extraScrollPx:150,
        itemSelector:"div.post",
        animate:false,
        pathParse:undefined,
        dataType:'html',
        appendCallback:true,
        bufferPx:40,
        errorCallback:function(){},
        infid:0,
        pixelsFromNavToBottom:undefined,
        path:undefined
    };$.infinitescroll.prototype={
        _binding:function infscr_binding(binding){
            var instance=this,opts=instance.options;if(!!opts.behavior&&this['_binding_'+opts.behavior]!==undefined){
                this['_binding_'+opts.behavior].call(this);return;
            }
            if(binding!=='bind'&&binding!=='unbind'){
                this._debug('Binding value  '+binding+' not valid')
                return false;
            }
            if(binding=='unbind'){
                (this.options.binder).unbind('smartscroll.infscr.'+instance.options.infid);
            }else{
                (this.options.binder)[binding]('smartscroll.infscr.'+instance.options.infid,function(){
                    instance.scroll();
                });
            };this._debug('Binding',binding);
        },
        _create:function infscr_create(options,callback){
            if(!this._validate(options)){
                return false;
            }
            var opts=this.options=$.extend(true,{},$.infinitescroll.defaults,options),relurl=/(.*?\/\/).*?(\/.*)/,path=$(opts.nextSelector).attr('href');opts.contentSelector=opts.contentSelector||this.element;opts.loading.selector=opts.loading.selector||opts.contentSelector;if(!path){
                this._debug('Navigation selector not found');return;
            }
            opts.path=this._determinepath(path);opts.loading.msg=$('<div id="infscr-loading"><img alt="Loading..." src="'+opts.loading.img+'" /><div>'+opts.loading.msgText+'</div></div>');(new Image()).src=opts.loading.img;opts.pixelsFromNavToBottom=$(document).height()-$(opts.navSelector).offset().top;opts.loading.start=opts.loading.start||function(){
                $(opts.navSelector).hide();opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed,function(){
                    beginAjax(opts);
                });
            };opts.loading.finished=opts.loading.finished||function(){
                opts.loading.msg.fadeOut('normal');
            };opts.callback=function(instance,data){
                if(!!opts.behavior&&instance['_callback_'+opts.behavior]!==undefined){
                    instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0],data);
                }
                if(callback){
                    callback.call($(opts.contentSelector)[0],data);
                }
            };this._setup();
        },
        _debug:function infscr_debug(){
            if(this.options.debug){
                return window.console&&console.log.call(console,arguments);
            }
        },
        _determinepath:function infscr_determinepath(path){
            var opts=this.options;if(!!opts.behavior&&this['_determinepath_'+opts.behavior]!==undefined){
                this['_determinepath_'+opts.behavior].call(this,path);return;
            }
            if(!!opts.pathParse){
                this._debug('pathParse manual');return opts.pathParse;
            }else if(path.match(/^(.*?)\b2\b(.*?$)/)){
                path=path.match(/^(.*?)\b2\b(.*?$)/).slice(1);
            }else if(path.match(/^(.*?)2(.*?$)/)){
                if(path.match(/^(.*?page=)2(\/.*|$)/)){
                    path=path.match(/^(.*?page=)2(\/.*|$)/).slice(1);return path;
                }
                path=path.match(/^(.*?)2(.*?$)/).slice(1);
            }else{
                if(path.match(/^(.*?page=)1(\/.*|$)/)){
                    path=path.match(/^(.*?page=)1(\/.*|$)/).slice(1);return path;
                }else{
                    this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');opts.state.isInvalidPage=true;
                }
            }
            this._debug('determinePath',path);return path;
        },
        _error:function infscr_error(xhr){
            var opts=this.options;if(!!opts.behavior&&this['_error_'+opts.behavior]!==undefined){
                this['_error_'+opts.behavior].call(this,xhr);return;
            }
            if(xhr!=='destroy'&&xhr!=='end'){
                xhr='unknown';
            }
            this._debug('Error',xhr);if(xhr=='end'){
                this._showdonemsg();
            }
            opts.state.isDone=true;opts.state.currPage=1;opts.state.isPaused=false;this._binding('unbind');
        },
        _loadcallback:function infscr_loadcallback(box,data){
            var opts=this.options,callback=this.options.callback,result=(opts.state.isDone)?'done':(!opts.appendCallback)?'no-append':'append',frag;if(!!opts.behavior&&this['_loadcallback_'+opts.behavior]!==undefined){
                this['_loadcallback_'+opts.behavior].call(this,box,data);return;
            }
            switch(result){
                case'done':this._showdonemsg();return false;break;case'no-append':if(opts.dataType=='html'){
                    data='<div>'+data+'</div>';data=$(data).find(opts.itemSelector);
                };break;case'append':var children=box.children();if(children.length==0){
                    return this._error('end');
                }
                frag=document.createDocumentFragment();while(box[0].firstChild){
                    frag.appendChild(box[0].firstChild);
                }
                this._debug('contentSelector',$(opts.contentSelector)[0])
                    $(opts.contentSelector)[0].appendChild(frag);data=children.get();break;
            }
            opts.loading.finished.call($(opts.contentSelector)[0],opts)
            if(opts.animate){
                var scrollTo=$(window).scrollTop()+$('#infscr-loading').height()+opts.extraScrollPx+'px';$('html,body').animate({
                    scrollTop:scrollTo
                },800,function(){
                    opts.state.isDuringAjax=false;
                });
            }
            if(!opts.animate)opts.state.isDuringAjax=false;callback(this,data);
        },
        _nearbottom:function infscr_nearbottom(){
            var opts=this.options,pixelsFromWindowBottomToBottom=0+$(document).height()-(opts.binder.scrollTop())-$(window).height();if(!!opts.behavior&&this['_nearbottom_'+opts.behavior]!==undefined){
                this['_nearbottom_'+opts.behavior].call(this);return;
            }
            this._debug('math:',pixelsFromWindowBottomToBottom,opts.pixelsFromNavToBottom);return(pixelsFromWindowBottomToBottom-opts.bufferPx<opts.pixelsFromNavToBottom);
        },
        _pausing:function infscr_pausing(pause){
            var opts=this.options;if(!!opts.behavior&&this['_pausing_'+opts.behavior]!==undefined){
                this['_pausing_'+opts.behavior].call(this,pause);return;
            }
            if(pause!=='pause'&&pause!=='resume'&&pause!==null){
                this._debug('Invalid argument. Toggling pause value instead');
            };pause=(pause&&(pause=='pause'||pause=='resume'))?pause:'toggle';switch(pause){
                case'pause':opts.state.isPaused=true;break;case'resume':opts.state.isPaused=false;break;case'toggle':opts.state.isPaused=!opts.state.isPaused;break;
            }
            this._debug('Paused',opts.state.isPaused);return false;
        },
        _setup:function infscr_setup(){
            var opts=this.options;if(!!opts.behavior&&this['_setup_'+opts.behavior]!==undefined){
                this['_setup_'+opts.behavior].call(this);return;
            }
            this._binding('bind');return false;
        },
        _showdonemsg:function infscr_showdonemsg(){
            var opts=this.options;if(!!opts.behavior&&this['_showdonemsg_'+opts.behavior]!==undefined){
                this['_showdonemsg_'+opts.behavior].call(this);return;
            }
            opts.loading.msg.find('img').hide().parent().find('div').html(opts.loading.finishedMsg).animate({
                opacity:1
            },2000,function(){
                $(this).parent().fadeOut('normal');
            });opts.errorCallback.call($(opts.contentSelector)[0],'done');
        },
        _validate:function infscr_validate(opts){
            for(var key in opts){
                if(key.indexOf&&key.indexOf('Selector')>-1&&$(opts[key]).length===0){
                    this._debug('Your '+key+' found no elements.');return false;
                }
                return true;
            }
        },
        bind:function infscr_bind(){
            this._binding('bind');
        },
        destroy:function infscr_destroy(){
            this.options.state.isDestroyed=true;return this._error('destroy');
        },
        pause:function infscr_pause(){
            this._pausing('pause');
        },
        resume:function infscr_resume(){
            this._pausing('resume');
        },
        retrieve:function infscr_retrieve(pageNum){
            var instance=this,opts=instance.options,path=opts.path,box,frag,desturl,method,condition,pageNum=pageNum||null,getPage=(!!pageNum)?pageNum:opts.state.currPage;beginAjax=function infscr_ajax(opts){
                opts.state.currPage++;instance._debug('heading into ajax',path);box=$(opts.contentSelector).is('table')?$('<tbody/>'):$('<div/>');desturl=path.join(opts.state.currPage);method=(opts.dataType=='html'||opts.dataType=='json')?opts.dataType:'html+callback';if(opts.appendCallback&&opts.dataType=='html')method+='+callback'
                switch(method){
                    case'html+callback':instance._debug('Using HTML via .load() method');box.load(desturl+' '+opts.itemSelector,null,function infscr_ajax_callback(responseText){
                        instance._loadcallback(box,responseText);
                    });break;case'html':case'json':instance._debug('Using '+(method.toUpperCase())+' via $.ajax() method');$.ajax({
                        url:desturl,
                        dataType:opts.dataType,
                        complete:function infscr_ajax_callback(jqXHR,textStatus){
                            condition=(typeof(jqXHR.isResolved)!=='undefined')?(jqXHR.isResolved()):(textStatus==="success"||textStatus==="notmodified");(condition)?instance._loadcallback(box,jqXHR.responseText):instance._error('end');
                        }
                    });break;
                }
            };if(!!opts.behavior&&this['retrieve_'+opts.behavior]!==undefined){
                this['retrieve_'+opts.behavior].call(this,pageNum);return;
            }
            if(opts.state.isDestroyed){
                this._debug('Instance is destroyed');return false;
            };opts.state.isDuringAjax=true;opts.loading.start.call($(opts.contentSelector)[0],opts);
        },
        scroll:function infscr_scroll(){
            var opts=this.options,state=opts.state;if(!!opts.behavior&&this['scroll_'+opts.behavior]!==undefined){
                this['scroll_'+opts.behavior].call(this);return;
            }
            if(state.isDuringAjax||state.isInvalidPage||state.isDone||state.isDestroyed||state.isPaused)return;if(!this._nearbottom())return;this.retrieve();
        },
        toggle:function infscr_toggle(){
            this._pausing();
        },
        unbind:function infscr_unbind(){
            this._binding('unbind');
        },
        update:function infscr_options(key){
            if($.isPlainObject(key)){
                this.options=$.extend(true,this.options,key);
            }
        }
    }
    $.fn.infinitescroll=function infscr_init(options,callback){
        var thisCall=typeof options;switch(thisCall){
            case'string':var args=Array.prototype.slice.call(arguments,1);this.each(function(){
                var instance=$.data(this,'infinitescroll');if(!instance){
                    return false;
                }
                if(!$.isFunction(instance[options])||options.charAt(0)==="_"){
                    return false;
                }
                instance[options].apply(instance,args);
            });break;case'object':this.each(function(){
                var instance=$.data(this,'infinitescroll');if(instance){
                    instance.update(options);
                }else{
                    $.data(this,'infinitescroll',new $.infinitescroll(options,callback,this));
                }
            });break;
        }
        return this;
    };var event=$.event,scrollTimeout;event.special.smartscroll={
        setup:function(){
            $(this).bind("scroll",event.special.smartscroll.handler);
        },
        teardown:function(){
            $(this).unbind("scroll",event.special.smartscroll.handler);
        },
        handler:function(event,execAsap){
            var context=this,args=arguments;event.type="smartscroll";if(scrollTimeout){
                clearTimeout(scrollTimeout);
            }
            scrollTimeout=setTimeout(function(){
                $.event.handle.apply(context,args);
            },execAsap==="execAsap"?0:100);
        }
    };$.fn.smartscroll=function(fn){
        return fn?this.bind("smartscroll",fn):this.trigger("smartscroll",["execAsap"]);
    };
})(window,jQuery);