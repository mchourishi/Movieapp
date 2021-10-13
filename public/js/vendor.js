/*!
 * AdminLTE v3.0.5 (https://adminlte.io)
 * Copyright 2014-2020 Colorlib <http://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.adminlte = {}));
}(this, (function (exports) { 'use strict';

  /**
   * --------------------------------------------
   * AdminLTE ControlSidebar.js
   * License MIT
   * --------------------------------------------
   */
  var ControlSidebar = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'ControlSidebar';
    var DATA_KEY = 'lte.controlsidebar';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      COLLAPSED: "collapsed" + EVENT_KEY,
      EXPANDED: "expanded" + EVENT_KEY
    };
    var Selector = {
      CONTROL_SIDEBAR: '.control-sidebar',
      CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
      DATA_TOGGLE: '[data-widget="control-sidebar"]',
      CONTENT: '.content-wrapper',
      HEADER: '.main-header',
      FOOTER: '.main-footer'
    };
    var ClassName = {
      CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',
      CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
      CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',
      LAYOUT_FIXED: 'layout-fixed',
      NAVBAR_FIXED: 'layout-navbar-fixed',
      NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',
      NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',
      NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',
      NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',
      FOOTER_FIXED: 'layout-footer-fixed',
      FOOTER_SM_FIXED: 'layout-sm-footer-fixed',
      FOOTER_MD_FIXED: 'layout-md-footer-fixed',
      FOOTER_LG_FIXED: 'layout-lg-footer-fixed',
      FOOTER_XL_FIXED: 'layout-xl-footer-fixed'
    };
    var Default = {
      controlsidebarSlide: true,
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'l'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var ControlSidebar = /*#__PURE__*/function () {
      function ControlSidebar(element, config) {
        this._element = element;
        this._config = config;

        this._init();
      } // Public


      var _proto = ControlSidebar.prototype;

      _proto.collapse = function collapse() {
        // Show the control sidebar
        if (this._config.controlsidebarSlide) {
          $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
            $(Selector.CONTROL_SIDEBAR).hide();
            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
            $(this).dequeue();
          });
        } else {
          $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      };

      _proto.show = function show() {
        // Collapse the control sidebar
        if (this._config.controlsidebarSlide) {
          $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
          $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function () {
            $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function () {
              $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE);
              $(this).dequeue();
            });
            $(this).dequeue();
          });
        } else {
          $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
        }

        var expandedEvent = $.Event(Event.EXPANDED);
        $(this._element).trigger(expandedEvent);
      };

      _proto.toggle = function toggle() {
        var shouldClose = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE);

        if (shouldClose) {
          // Close the control sidebar
          this.collapse();
        } else {
          // Open the control sidebar
          this.show();
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        this._fixHeight();

        this._fixScrollHeight();

        $(window).resize(function () {
          _this._fixHeight();

          _this._fixScrollHeight();
        });
        $(window).scroll(function () {
          if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {
            _this._fixScrollHeight();
          }
        });
      };

      _proto._fixScrollHeight = function _fixScrollHeight() {
        var heights = {
          scroll: $(document).height(),
          window: $(window).height(),
          header: $(Selector.HEADER).outerHeight(),
          footer: $(Selector.FOOTER).outerHeight()
        };
        var positions = {
          bottom: Math.abs(heights.window + $(window).scrollTop() - heights.scroll),
          top: $(window).scrollTop()
        };
        var navbarFixed = false;
        var footerFixed = false;

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          if ($('body').hasClass(ClassName.NAVBAR_FIXED) || $('body').hasClass(ClassName.NAVBAR_SM_FIXED) || $('body').hasClass(ClassName.NAVBAR_MD_FIXED) || $('body').hasClass(ClassName.NAVBAR_LG_FIXED) || $('body').hasClass(ClassName.NAVBAR_XL_FIXED)) {
            if ($(Selector.HEADER).css("position") === "fixed") {
              navbarFixed = true;
            }
          }

          if ($('body').hasClass(ClassName.FOOTER_FIXED) || $('body').hasClass(ClassName.FOOTER_SM_FIXED) || $('body').hasClass(ClassName.FOOTER_MD_FIXED) || $('body').hasClass(ClassName.FOOTER_LG_FIXED) || $('body').hasClass(ClassName.FOOTER_XL_FIXED)) {
            if ($(Selector.FOOTER).css("position") === "fixed") {
              footerFixed = true;
            }
          }

          if (positions.top === 0 && positions.bottom === 0) {
            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header + heights.footer));
          } else if (positions.bottom <= heights.footer) {
            if (footerFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer - positions.bottom);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.footer - positions.bottom));
            } else {
              $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);
            }
          } else if (positions.top <= heights.header) {
            if (navbarFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header - positions.top);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header - positions.top));
            } else {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            }
          } else {
            if (navbarFixed === false) {
              $(Selector.CONTROL_SIDEBAR).css('top', 0);
              $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window);
            } else {
              $(Selector.CONTROL_SIDEBAR).css('top', heights.header);
            }
          }
        }
      };

      _proto._fixHeight = function _fixHeight() {
        var heights = {
          window: $(window).height(),
          header: $(Selector.HEADER).outerHeight(),
          footer: $(Selector.FOOTER).outerHeight()
        };

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          var sidebarHeight = heights.window - heights.header;

          if ($('body').hasClass(ClassName.FOOTER_FIXED) || $('body').hasClass(ClassName.FOOTER_SM_FIXED) || $('body').hasClass(ClassName.FOOTER_MD_FIXED) || $('body').hasClass(ClassName.FOOTER_LG_FIXED) || $('body').hasClass(ClassName.FOOTER_XL_FIXED)) {
            if ($(Selector.FOOTER).css("position") === "fixed") {
              sidebarHeight = heights.window - heights.header - heights.footer;
            }
          }

          $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', sidebarHeight);

          if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).overlayScrollbars({
              className: this._config.scrollbarTheme,
              sizeAutoCapable: true,
              scrollbars: {
                autoHide: this._config.scrollbarAutoHide,
                clickScrolling: true
              }
            });
          }
        }
      } // Static
      ;

      ControlSidebar._jQueryInterface = function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new ControlSidebar(this, _options);
            $(this).data(DATA_KEY, data);
          }

          if (data[operation] === 'undefined') {
            throw new Error(operation + " is not a function");
          }

          data[operation]();
        });
      };

      return ControlSidebar;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      ControlSidebar._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = ControlSidebar._jQueryInterface;
    $.fn[NAME].Constructor = ControlSidebar;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return ControlSidebar._jQueryInterface;
    };

    return ControlSidebar;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Layout.js
   * License MIT
   * --------------------------------------------
   */
  var Layout = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Layout';
    var DATA_KEY = 'lte.layout';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      HEADER: '.main-header',
      MAIN_SIDEBAR: '.main-sidebar',
      SIDEBAR: '.main-sidebar .sidebar',
      CONTENT: '.content-wrapper',
      BRAND: '.brand-link',
      CONTENT_HEADER: '.content-header',
      WRAPPER: '.wrapper',
      CONTROL_SIDEBAR: '.control-sidebar',
      CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',
      CONTROL_SIDEBAR_BTN: '[data-widget="control-sidebar"]',
      LAYOUT_FIXED: '.layout-fixed',
      FOOTER: '.main-footer',
      PUSHMENU_BTN: '[data-widget="pushmenu"]',
      LOGIN_BOX: '.login-box',
      REGISTER_BOX: '.register-box'
    };
    var ClassName = {
      HOLD: 'hold-transition',
      SIDEBAR: 'main-sidebar',
      CONTENT_FIXED: 'content-fixed',
      SIDEBAR_FOCUSED: 'sidebar-focused',
      LAYOUT_FIXED: 'layout-fixed',
      NAVBAR_FIXED: 'layout-navbar-fixed',
      FOOTER_FIXED: 'layout-footer-fixed',
      LOGIN_PAGE: 'login-page',
      REGISTER_PAGE: 'register-page',
      CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',
      CONTROL_SIDEBAR_OPEN: 'control-sidebar-open'
    };
    var Default = {
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'l',
      panelAutoHeight: true,
      loginRegisterAutoHeight: true
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Layout = /*#__PURE__*/function () {
      function Layout(element, config) {
        this._config = config;
        this._element = element;

        this._init();
      } // Public


      var _proto = Layout.prototype;

      _proto.fixLayoutHeight = function fixLayoutHeight(extra) {
        if (extra === void 0) {
          extra = null;
        }

        var control_sidebar = 0;

        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {
          control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height();
        }

        var heights = {
          window: $(window).height(),
          header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,
          footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,
          sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,
          control_sidebar: control_sidebar
        };

        var max = this._max(heights);

        var offset = this._config.panelAutoHeight;

        if (offset === true) {
          offset = 0;
        }

        if (offset !== false) {
          if (max == heights.control_sidebar) {
            $(Selector.CONTENT).css('min-height', max + offset);
          } else if (max == heights.window) {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header - heights.footer);
          } else {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header);
          }

          if (this._isFooterFixed()) {
            $(Selector.CONTENT).css('min-height', parseFloat($(Selector.CONTENT).css('min-height')) + heights.footer);
          }
        }

        if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {
          if (offset !== false) {
            $(Selector.CONTENT).css('min-height', max + offset - heights.header - heights.footer);
          }

          if (typeof $.fn.overlayScrollbars !== 'undefined') {
            $(Selector.SIDEBAR).overlayScrollbars({
              className: this._config.scrollbarTheme,
              sizeAutoCapable: true,
              scrollbars: {
                autoHide: this._config.scrollbarAutoHide,
                clickScrolling: true
              }
            });
          }
        }
      };

      _proto.fixLoginRegisterHeight = function fixLoginRegisterHeight() {
        if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {
          $('body, html').css('height', 'auto');
        } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {
          var box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height();

          if ($('body').css('min-height') !== box_height) {
            $('body').css('min-height', box_height);
          }
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        // Activate layout height watcher
        this.fixLayoutHeight();

        if (this._config.loginRegisterAutoHeight === true) {
          this.fixLoginRegisterHeight();
        } else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {
          setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);
        }

        $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview', function () {
          _this.fixLayoutHeight();
        });
        $(Selector.PUSHMENU_BTN).on('collapsed.lte.pushmenu shown.lte.pushmenu', function () {
          _this.fixLayoutHeight();
        });
        $(Selector.CONTROL_SIDEBAR_BTN).on('collapsed.lte.controlsidebar', function () {
          _this.fixLayoutHeight();
        }).on('expanded.lte.controlsidebar', function () {
          _this.fixLayoutHeight('control_sidebar');
        });
        $(window).resize(function () {
          _this.fixLayoutHeight();
        });
        setTimeout(function () {
          $('body.hold-transition').removeClass('hold-transition');
        }, 50);
      };

      _proto._max = function _max(numbers) {
        // Calculate the maximum number in a list
        var max = 0;
        Object.keys(numbers).forEach(function (key) {
          if (numbers[key] > max) {
            max = numbers[key];
          }
        });
        return max;
      };

      _proto._isFooterFixed = function _isFooterFixed() {
        return $('.main-footer').css('position') === 'fixed';
      } // Static
      ;

      Layout._jQueryInterface = function _jQueryInterface(config) {
        if (config === void 0) {
          config = '';
        }

        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Layout($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init' || config === '') {
            data['_init']();
          } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {
            data[config]();
          }
        });
      };

      return Layout;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on('load', function () {
      Layout._jQueryInterface.call($('body'));
    });
    $(Selector.SIDEBAR + ' a').on('focusin', function () {
      $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);
    });
    $(Selector.SIDEBAR + ' a').on('focusout', function () {
      $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Layout._jQueryInterface;
    $.fn[NAME].Constructor = Layout;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Layout._jQueryInterface;
    };

    return Layout;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE PushMenu.js
   * License MIT
   * --------------------------------------------
   */
  var PushMenu = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'PushMenu';
    var DATA_KEY = 'lte.pushmenu';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      COLLAPSED: "collapsed" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY
    };
    var Default = {
      autoCollapseSize: 992,
      enableRemember: false,
      noTransitionAfterReload: true
    };
    var Selector = {
      TOGGLE_BUTTON: '[data-widget="pushmenu"]',
      SIDEBAR_MINI: '.sidebar-mini',
      SIDEBAR_COLLAPSED: '.sidebar-collapse',
      BODY: 'body',
      OVERLAY: '#sidebar-overlay',
      WRAPPER: '.wrapper'
    };
    var ClassName = {
      COLLAPSED: 'sidebar-collapse',
      OPEN: 'sidebar-open',
      CLOSED: 'sidebar-closed'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var PushMenu = /*#__PURE__*/function () {
      function PushMenu(element, options) {
        this._element = element;
        this._options = $.extend({}, Default, options);

        if (!$(Selector.OVERLAY).length) {
          this._addOverlay();
        }

        this._init();
      } // Public


      var _proto = PushMenu.prototype;

      _proto.expand = function expand() {
        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            $(Selector.BODY).addClass(ClassName.OPEN);
          }
        }

        $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED);

        if (this._options.enableRemember) {
          localStorage.setItem("remember" + EVENT_KEY, ClassName.OPEN);
        }

        var shownEvent = $.Event(Event.SHOWN);
        $(this._element).trigger(shownEvent);
      };

      _proto.collapse = function collapse() {
        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED);
          }
        }

        $(Selector.BODY).addClass(ClassName.COLLAPSED);

        if (this._options.enableRemember) {
          localStorage.setItem("remember" + EVENT_KEY, ClassName.COLLAPSED);
        }

        var collapsedEvent = $.Event(Event.COLLAPSED);
        $(this._element).trigger(collapsedEvent);
      };

      _proto.toggle = function toggle() {
        if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {
          this.collapse();
        } else {
          this.expand();
        }
      };

      _proto.autoCollapse = function autoCollapse(resize) {
        if (resize === void 0) {
          resize = false;
        }

        if (this._options.autoCollapseSize) {
          if ($(window).width() <= this._options.autoCollapseSize) {
            if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {
              this.collapse();
            }
          } else if (resize == true) {
            if ($(Selector.BODY).hasClass(ClassName.OPEN)) {
              $(Selector.BODY).removeClass(ClassName.OPEN);
            } else if ($(Selector.BODY).hasClass(ClassName.CLOSED)) {
              this.expand();
            }
          }
        }
      };

      _proto.remember = function remember() {
        if (this._options.enableRemember) {
          var toggleState = localStorage.getItem("remember" + EVENT_KEY);

          if (toggleState == ClassName.COLLAPSED) {
            if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function () {
                $(this).removeClass('hold-transition');
                $(this).dequeue();
              });
            } else {
              $("body").addClass(ClassName.COLLAPSED);
            }
          } else {
            if (this._options.noTransitionAfterReload) {
              $("body").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function () {
                $(this).removeClass('hold-transition');
                $(this).dequeue();
              });
            } else {
              $("body").removeClass(ClassName.COLLAPSED);
            }
          }
        }
      } // Private
      ;

      _proto._init = function _init() {
        var _this = this;

        this.remember();
        this.autoCollapse();
        $(window).resize(function () {
          _this.autoCollapse(true);
        });
      };

      _proto._addOverlay = function _addOverlay() {
        var _this2 = this;

        var overlay = $('<div />', {
          id: 'sidebar-overlay'
        });
        overlay.on('click', function () {
          _this2.collapse();
        });
        $(Selector.WRAPPER).append(overlay);
      } // Static
      ;

      PushMenu._jQueryInterface = function _jQueryInterface(operation) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new PushMenu(this, _options);
            $(this).data(DATA_KEY, data);
          }

          if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {
            data[operation]();
          }
        });
      };

      return PushMenu;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.TOGGLE_BUTTON, function (event) {
      event.preventDefault();
      var button = event.currentTarget;

      if ($(button).data('widget') !== 'pushmenu') {
        button = $(button).closest(Selector.TOGGLE_BUTTON);
      }

      PushMenu._jQueryInterface.call($(button), 'toggle');
    });
    $(window).on('load', function () {
      PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = PushMenu._jQueryInterface;
    $.fn[NAME].Constructor = PushMenu;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return PushMenu._jQueryInterface;
    };

    return PushMenu;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Treeview.js
   * License MIT
   * --------------------------------------------
   */
  var Treeview = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Treeview';
    var DATA_KEY = 'lte.treeview';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      SELECTED: "selected" + EVENT_KEY,
      EXPANDED: "expanded" + EVENT_KEY,
      COLLAPSED: "collapsed" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY
    };
    var Selector = {
      LI: '.nav-item',
      LINK: '.nav-link',
      TREEVIEW_MENU: '.nav-treeview',
      OPEN: '.menu-open',
      DATA_WIDGET: '[data-widget="treeview"]'
    };
    var ClassName = {
      LI: 'nav-item',
      LINK: 'nav-link',
      TREEVIEW_MENU: 'nav-treeview',
      OPEN: 'menu-open',
      SIDEBAR_COLLAPSED: 'sidebar-collapse'
    };
    var Default = {
      trigger: Selector.DATA_WIDGET + " " + Selector.LINK,
      animationSpeed: 300,
      accordion: true,
      expandSidebar: false,
      sidebarButtonSelector: '[data-widget="pushmenu"]'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Treeview = /*#__PURE__*/function () {
      function Treeview(element, config) {
        this._config = config;
        this._element = element;
      } // Public


      var _proto = Treeview.prototype;

      _proto.init = function init() {
        this._setupListeners();
      };

      _proto.expand = function expand(treeviewMenu, parentLi) {
        var _this = this;

        var expandedEvent = $.Event(Event.EXPANDED);

        if (this._config.accordion) {
          var openMenuLi = parentLi.siblings(Selector.OPEN).first();
          var openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
          this.collapse(openTreeview, openMenuLi);
        }

        treeviewMenu.stop().slideDown(this._config.animationSpeed, function () {
          parentLi.addClass(ClassName.OPEN);
          $(_this._element).trigger(expandedEvent);
        });

        if (this._config.expandSidebar) {
          this._expandSidebar();
        }
      };

      _proto.collapse = function collapse(treeviewMenu, parentLi) {
        var _this2 = this;

        var collapsedEvent = $.Event(Event.COLLAPSED);
        treeviewMenu.stop().slideUp(this._config.animationSpeed, function () {
          parentLi.removeClass(ClassName.OPEN);
          $(_this2._element).trigger(collapsedEvent);
          treeviewMenu.find(Selector.OPEN + " > " + Selector.TREEVIEW_MENU).slideUp();
          treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
        });
      };

      _proto.toggle = function toggle(event) {
        var $relativeTarget = $(event.currentTarget);
        var $parent = $relativeTarget.parent();
        var treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU);

        if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
          if (!$parent.is(Selector.LI)) {
            treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU);
          }

          if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
            return;
          }
        }

        event.preventDefault();
        var parentLi = $relativeTarget.parents(Selector.LI).first();
        var isOpen = parentLi.hasClass(ClassName.OPEN);

        if (isOpen) {
          this.collapse($(treeviewMenu), parentLi);
        } else {
          this.expand($(treeviewMenu), parentLi);
        }
      } // Private
      ;

      _proto._setupListeners = function _setupListeners() {
        var _this3 = this;

        $(document).on('click', this._config.trigger, function (event) {
          _this3.toggle(event);
        });
      };

      _proto._expandSidebar = function _expandSidebar() {
        if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {
          $(this._config.sidebarButtonSelector).PushMenu('expand');
        }
      } // Static
      ;

      Treeview._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Treeview($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      };

      return Treeview;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      $(Selector.DATA_WIDGET).each(function () {
        Treeview._jQueryInterface.call($(this), 'init');
      });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Treeview._jQueryInterface;
    $.fn[NAME].Constructor = Treeview;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Treeview._jQueryInterface;
    };

    return Treeview;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE DirectChat.js
   * License MIT
   * --------------------------------------------
   */
  var DirectChat = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'DirectChat';
    var DATA_KEY = 'lte.directchat';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      TOGGLED: "toggled{EVENT_KEY}"
    };
    var Selector = {
      DATA_TOGGLE: '[data-widget="chat-pane-toggle"]',
      DIRECT_CHAT: '.direct-chat'
    };
    var ClassName = {
      DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'
    };
    /**
     * Class Definition
     * ====================================================
     */

    var DirectChat = /*#__PURE__*/function () {
      function DirectChat(element, config) {
        this._element = element;
      }

      var _proto = DirectChat.prototype;

      _proto.toggle = function toggle() {
        $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);
        var toggledEvent = $.Event(Event.TOGGLED);
        $(this._element).trigger(toggledEvent);
      } // Static
      ;

      DirectChat._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new DirectChat($(this));
            $(this).data(DATA_KEY, data);
          }

          data[config]();
        });
      };

      return DirectChat;
    }();
    /**
     *
     * Data Api implementation
     * ====================================================
     */


    $(document).on('click', Selector.DATA_TOGGLE, function (event) {
      if (event) event.preventDefault();

      DirectChat._jQueryInterface.call($(this), 'toggle');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = DirectChat._jQueryInterface;
    $.fn[NAME].Constructor = DirectChat;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DirectChat._jQueryInterface;
    };

    return DirectChat;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE TodoList.js
   * License MIT
   * --------------------------------------------
   */
  var TodoList = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'TodoList';
    var DATA_KEY = 'lte.todolist';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      DATA_TOGGLE: '[data-widget="todo-list"]'
    };
    var ClassName = {
      TODO_LIST_DONE: 'done'
    };
    var Default = {
      onCheck: function onCheck(item) {
        return item;
      },
      onUnCheck: function onUnCheck(item) {
        return item;
      }
    };
    /**
     * Class Definition
     * ====================================================
     */

    var TodoList = /*#__PURE__*/function () {
      function TodoList(element, config) {
        this._config = config;
        this._element = element;

        this._init();
      } // Public


      var _proto = TodoList.prototype;

      _proto.toggle = function toggle(item) {
        item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);

        if (!$(item).prop('checked')) {
          this.unCheck($(item));
          return;
        }

        this.check(item);
      };

      _proto.check = function check(item) {
        this._config.onCheck.call(item);
      };

      _proto.unCheck = function unCheck(item) {
        this._config.onUnCheck.call(item);
      } // Private
      ;

      _proto._init = function _init() {
        var that = this;
        $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE);
        $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', function (event) {
          that.toggle($(event.target));
        });
      } // Static
      ;

      TodoList._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _options = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new TodoList($(this), _options);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'init') {
            data[config]();
          }
        });
      };

      return TodoList;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(window).on('load', function () {
      TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE));
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = TodoList._jQueryInterface;
    $.fn[NAME].Constructor = TodoList;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return TodoList._jQueryInterface;
    };

    return TodoList;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE CardWidget.js
   * License MIT
   * --------------------------------------------
   */
  var CardWidget = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardWidget';
    var DATA_KEY = 'lte.cardwidget';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      EXPANDED: "expanded" + EVENT_KEY,
      COLLAPSED: "collapsed" + EVENT_KEY,
      MAXIMIZED: "maximized" + EVENT_KEY,
      MINIMIZED: "minimized" + EVENT_KEY,
      REMOVED: "removed" + EVENT_KEY
    };
    var ClassName = {
      CARD: 'card',
      COLLAPSED: 'collapsed-card',
      COLLAPSING: 'collapsing-card',
      EXPANDING: 'expanding-card',
      WAS_COLLAPSED: 'was-collapsed',
      MAXIMIZED: 'maximized-card'
    };
    var Selector = {
      DATA_REMOVE: '[data-card-widget="remove"]',
      DATA_COLLAPSE: '[data-card-widget="collapse"]',
      DATA_MAXIMIZE: '[data-card-widget="maximize"]',
      CARD: "." + ClassName.CARD,
      CARD_HEADER: '.card-header',
      CARD_BODY: '.card-body',
      CARD_FOOTER: '.card-footer',
      COLLAPSED: "." + ClassName.COLLAPSED
    };
    var Default = {
      animationSpeed: 'normal',
      collapseTrigger: Selector.DATA_COLLAPSE,
      removeTrigger: Selector.DATA_REMOVE,
      maximizeTrigger: Selector.DATA_MAXIMIZE,
      collapseIcon: 'fa-minus',
      expandIcon: 'fa-plus',
      maximizeIcon: 'fa-expand',
      minimizeIcon: 'fa-compress'
    };

    var CardWidget = /*#__PURE__*/function () {
      function CardWidget(element, settings) {
        this._element = element;
        this._parent = element.parents(Selector.CARD).first();

        if (element.hasClass(ClassName.CARD)) {
          this._parent = element;
        }

        this._settings = $.extend({}, Default, settings);
      }

      var _proto = CardWidget.prototype;

      _proto.collapse = function collapse() {
        var _this = this;

        this._parent.addClass(ClassName.COLLAPSING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER).slideUp(this._settings.animationSpeed, function () {
          _this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING);
        });

        this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);

        var collapsed = $.Event(Event.COLLAPSED);

        this._element.trigger(collapsed, this._parent);
      };

      _proto.expand = function expand() {
        var _this2 = this;

        this._parent.addClass(ClassName.EXPANDING).children(Selector.CARD_BODY + ", " + Selector.CARD_FOOTER).slideDown(this._settings.animationSpeed, function () {
          _this2._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING);
        });

        this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);

        var expanded = $.Event(Event.EXPANDED);

        this._element.trigger(expanded, this._parent);
      };

      _proto.remove = function remove() {
        this._parent.slideUp();

        var removed = $.Event(Event.REMOVED);

        this._element.trigger(removed, this._parent);
      };

      _proto.toggle = function toggle() {
        if (this._parent.hasClass(ClassName.COLLAPSED)) {
          this.expand();
          return;
        }

        this.collapse();
      };

      _proto.maximize = function maximize() {
        this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon);

        this._parent.css({
          'height': this._parent.height(),
          'width': this._parent.width(),
          'transition': 'all .15s'
        }).delay(150).queue(function () {
          $(this).addClass(ClassName.MAXIMIZED);
          $('html').addClass(ClassName.MAXIMIZED);

          if ($(this).hasClass(ClassName.COLLAPSED)) {
            $(this).addClass(ClassName.WAS_COLLAPSED);
          }

          $(this).dequeue();
        });

        var maximized = $.Event(Event.MAXIMIZED);

        this._element.trigger(maximized, this._parent);
      };

      _proto.minimize = function minimize() {
        this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon);

        this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' + 'width:' + this._parent[0].style.width + ' !important; transition: all .15s;').delay(10).queue(function () {
          $(this).removeClass(ClassName.MAXIMIZED);
          $('html').removeClass(ClassName.MAXIMIZED);
          $(this).css({
            'height': 'inherit',
            'width': 'inherit'
          });

          if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {
            $(this).removeClass(ClassName.WAS_COLLAPSED);
          }

          $(this).dequeue();
        });

        var MINIMIZED = $.Event(Event.MINIMIZED);

        this._element.trigger(MINIMIZED, this._parent);
      };

      _proto.toggleMaximize = function toggleMaximize() {
        if (this._parent.hasClass(ClassName.MAXIMIZED)) {
          this.minimize();
          return;
        }

        this.maximize();
      } // Private
      ;

      _proto._init = function _init(card) {
        var _this3 = this;

        this._parent = card;
        $(this).find(this._settings.collapseTrigger).click(function () {
          _this3.toggle();
        });
        $(this).find(this._settings.maximizeTrigger).click(function () {
          _this3.toggleMaximize();
        });
        $(this).find(this._settings.removeTrigger).click(function () {
          _this3.remove();
        });
      } // Static
      ;

      CardWidget._jQueryInterface = function _jQueryInterface(config) {
        var data = $(this).data(DATA_KEY);

        var _options = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new CardWidget($(this), _options);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {
          data[config]();
        } else if (typeof config === 'object') {
          data._init($(this));
        }
      };

      return CardWidget;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'toggle');
    });
    $(document).on('click', Selector.DATA_REMOVE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'remove');
    });
    $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardWidget._jQueryInterface.call($(this), 'toggleMaximize');
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = CardWidget._jQueryInterface;
    $.fn[NAME].Constructor = CardWidget;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return CardWidget._jQueryInterface;
    };

    return CardWidget;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE CardRefresh.js
   * License MIT
   * --------------------------------------------
   */
  var CardRefresh = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'CardRefresh';
    var DATA_KEY = 'lte.cardrefresh';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      LOADED: "loaded" + EVENT_KEY,
      OVERLAY_ADDED: "overlay.added" + EVENT_KEY,
      OVERLAY_REMOVED: "overlay.removed" + EVENT_KEY
    };
    var ClassName = {
      CARD: 'card'
    };
    var Selector = {
      CARD: "." + ClassName.CARD,
      DATA_REFRESH: '[data-card-widget="card-refresh"]'
    };
    var Default = {
      source: '',
      sourceSelector: '',
      params: {},
      trigger: Selector.DATA_REFRESH,
      content: '.card-body',
      loadInContent: true,
      loadOnInit: true,
      responseType: '',
      overlayTemplate: '<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',
      onLoadStart: function onLoadStart() {},
      onLoadDone: function onLoadDone(response) {
        return response;
      }
    };

    var CardRefresh = /*#__PURE__*/function () {
      function CardRefresh(element, settings) {
        this._element = element;
        this._parent = element.parents(Selector.CARD).first();
        this._settings = $.extend({}, Default, settings);
        this._overlay = $(this._settings.overlayTemplate);

        if (element.hasClass(ClassName.CARD)) {
          this._parent = element;
        }

        if (this._settings.source === '') {
          throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');
        }
      }

      var _proto = CardRefresh.prototype;

      _proto.load = function load() {
        this._addOverlay();

        this._settings.onLoadStart.call($(this));

        $.get(this._settings.source, this._settings.params, function (response) {
          if (this._settings.loadInContent) {
            if (this._settings.sourceSelector != '') {
              response = $(response).find(this._settings.sourceSelector).html();
            }

            this._parent.find(this._settings.content).html(response);
          }

          this._settings.onLoadDone.call($(this), response);

          this._removeOverlay();
        }.bind(this), this._settings.responseType !== '' && this._settings.responseType);
        var loadedEvent = $.Event(Event.LOADED);
        $(this._element).trigger(loadedEvent);
      };

      _proto._addOverlay = function _addOverlay() {
        this._parent.append(this._overlay);

        var overlayAddedEvent = $.Event(Event.OVERLAY_ADDED);
        $(this._element).trigger(overlayAddedEvent);
      };

      _proto._removeOverlay = function _removeOverlay() {
        this._parent.find(this._overlay).remove();

        var overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED);
        $(this._element).trigger(overlayRemovedEvent);
      };

      // Private
      _proto._init = function _init(card) {
        var _this = this;

        $(this).find(this._settings.trigger).on('click', function () {
          _this.load();
        });

        if (this._settings.loadOnInit) {
          this.load();
        }
      } // Static
      ;

      CardRefresh._jQueryInterface = function _jQueryInterface(config) {
        var data = $(this).data(DATA_KEY);

        var _options = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new CardRefresh($(this), _options);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/load/)) {
          data[config]();
        } else {
          data._init($(this));
        }
      };

      return CardRefresh;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(document).on('click', Selector.DATA_REFRESH, function (event) {
      if (event) {
        event.preventDefault();
      }

      CardRefresh._jQueryInterface.call($(this), 'load');
    });
    $(document).ready(function () {
      $(Selector.DATA_REFRESH).each(function () {
        CardRefresh._jQueryInterface.call($(this));
      });
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = CardRefresh._jQueryInterface;
    $.fn[NAME].Constructor = CardRefresh;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return CardRefresh._jQueryInterface;
    };

    return CardRefresh;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Dropdown.js
   * License MIT
   * --------------------------------------------
   */
  var Dropdown = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Dropdown';
    var DATA_KEY = 'lte.dropdown';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Selector = {
      NAVBAR: '.navbar',
      DROPDOWN_MENU: '.dropdown-menu',
      DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',
      DROPDOWN_TOGGLE: '[data-toggle="dropdown"]'
    };
    var ClassName = {
      DROPDOWN_HOVER: 'dropdown-hover',
      DROPDOWN_RIGHT: 'dropdown-menu-right'
    };
    var Default = {};
    /**
     * Class Definition
     * ====================================================
     */

    var Dropdown = /*#__PURE__*/function () {
      function Dropdown(element, config) {
        this._config = config;
        this._element = element;
      } // Public


      var _proto = Dropdown.prototype;

      _proto.toggleSubmenu = function toggleSubmenu() {
        this._element.siblings().show().toggleClass("show");

        if (!this._element.next().hasClass('show')) {
          this._element.parents('.dropdown-menu').first().find('.show').removeClass("show").hide();
        }

        this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
          $('.dropdown-submenu .show').removeClass("show").hide();
        });
      };

      _proto.fixPosition = function fixPosition() {
        var elm = $(Selector.DROPDOWN_MENU_ACTIVE);

        if (elm.length !== 0) {
          if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {
            elm.css('left', 'inherit');
            elm.css('right', 0);
          } else {
            elm.css('left', 0);
            elm.css('right', 'inherit');
          }

          var offset = elm.offset();
          var width = elm.width();
          var windowWidth = $(window).width();
          var visiblePart = windowWidth - offset.left;

          if (offset.left < 0) {
            elm.css('left', 'inherit');
            elm.css('right', offset.left - 5);
          } else {
            if (visiblePart < width) {
              elm.css('left', 'inherit');
              elm.css('right', 0);
            }
          }
        }
      } // Static
      ;

      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          var _config = $.extend({}, Default, $(this).data());

          if (!data) {
            data = new Dropdown($(this), _config);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggleSubmenu' || config == 'fixPosition') {
            data[config]();
          }
        });
      };

      return Dropdown;
    }();
    /**
     * Data API
     * ====================================================
     */


    $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($(this), 'toggleSubmenu');
    });
    $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on("click", function (event) {
      event.preventDefault();
      setTimeout(function () {
        Dropdown._jQueryInterface.call($(this), 'fixPosition');
      }, 1);
    });
    /**
     * jQuery API
     * ====================================================
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }(jQuery);

  /**
   * --------------------------------------------
   * AdminLTE Toasts.js
   * License MIT
   * --------------------------------------------
   */
  var Toasts = function ($) {
    /**
     * Constants
     * ====================================================
     */
    var NAME = 'Toasts';
    var DATA_KEY = 'lte.toasts';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      INIT: "init" + EVENT_KEY,
      CREATED: "created" + EVENT_KEY,
      REMOVED: "removed" + EVENT_KEY
    };
    var Selector = {
      BODY: 'toast-body',
      CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',
      CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',
      CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',
      CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft'
    };
    var ClassName = {
      TOP_RIGHT: 'toasts-top-right',
      TOP_LEFT: 'toasts-top-left',
      BOTTOM_RIGHT: 'toasts-bottom-right',
      BOTTOM_LEFT: 'toasts-bottom-left',
      FADE: 'fade'
    };
    var Position = {
      TOP_RIGHT: 'topRight',
      TOP_LEFT: 'topLeft',
      BOTTOM_RIGHT: 'bottomRight',
      BOTTOM_LEFT: 'bottomLeft'
    };
    var Default = {
      position: Position.TOP_RIGHT,
      fixed: true,
      autohide: false,
      autoremove: true,
      delay: 1000,
      fade: true,
      icon: null,
      image: null,
      imageAlt: null,
      imageHeight: '25px',
      title: null,
      subtitle: null,
      close: true,
      body: null,
      class: null
    };
    /**
     * Class Definition
     * ====================================================
     */

    var Toasts = /*#__PURE__*/function () {
      function Toasts(element, config) {
        this._config = config;

        this._prepareContainer();

        var initEvent = $.Event(Event.INIT);
        $('body').trigger(initEvent);
      } // Public


      var _proto = Toasts.prototype;

      _proto.create = function create() {
        var toast = $('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');
        toast.data('autohide', this._config.autohide);
        toast.data('animation', this._config.fade);

        if (this._config.class) {
          toast.addClass(this._config.class);
        }

        if (this._config.delay && this._config.delay != 500) {
          toast.data('delay', this._config.delay);
        }

        var toast_header = $('<div class="toast-header">');

        if (this._config.image != null) {
          var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt);

          if (this._config.imageHeight != null) {
            toast_image.height(this._config.imageHeight).width('auto');
          }

          toast_header.append(toast_image);
        }

        if (this._config.icon != null) {
          toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon));
        }

        if (this._config.title != null) {
          toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title));
        }

        if (this._config.subtitle != null) {
          toast_header.append($('<small />').html(this._config.subtitle));
        }

        if (this._config.close == true) {
          var toast_close = $('<button data-dismiss="toast" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden="true">&times;</span>');

          if (this._config.title == null) {
            toast_close.toggleClass('ml-2 ml-auto');
          }

          toast_header.append(toast_close);
        }

        toast.append(toast_header);

        if (this._config.body != null) {
          toast.append($('<div class="toast-body" />').html(this._config.body));
        }

        $(this._getContainerId()).prepend(toast);
        var createdEvent = $.Event(Event.CREATED);
        $('body').trigger(createdEvent);
        toast.toast('show');

        if (this._config.autoremove) {
          toast.on('hidden.bs.toast', function () {
            $(this).delay(200).remove();
            var removedEvent = $.Event(Event.REMOVED);
            $('body').trigger(removedEvent);
          });
        }
      } // Static
      ;

      _proto._getContainerId = function _getContainerId() {
        if (this._config.position == Position.TOP_RIGHT) {
          return Selector.CONTAINER_TOP_RIGHT;
        } else if (this._config.position == Position.TOP_LEFT) {
          return Selector.CONTAINER_TOP_LEFT;
        } else if (this._config.position == Position.BOTTOM_RIGHT) {
          return Selector.CONTAINER_BOTTOM_RIGHT;
        } else if (this._config.position == Position.BOTTOM_LEFT) {
          return Selector.CONTAINER_BOTTOM_LEFT;
        }
      };

      _proto._prepareContainer = function _prepareContainer() {
        if ($(this._getContainerId()).length === 0) {
          var container = $('<div />').attr('id', this._getContainerId().replace('#', ''));

          if (this._config.position == Position.TOP_RIGHT) {
            container.addClass(ClassName.TOP_RIGHT);
          } else if (this._config.position == Position.TOP_LEFT) {
            container.addClass(ClassName.TOP_LEFT);
          } else if (this._config.position == Position.BOTTOM_RIGHT) {
            container.addClass(ClassName.BOTTOM_RIGHT);
          } else if (this._config.position == Position.BOTTOM_LEFT) {
            container.addClass(ClassName.BOTTOM_LEFT);
          }

          $('body').append(container);
        }

        if (this._config.fixed) {
          $(this._getContainerId()).addClass('fixed');
        } else {
          $(this._getContainerId()).removeClass('fixed');
        }
      } // Static
      ;

      Toasts._jQueryInterface = function _jQueryInterface(option, config) {
        return this.each(function () {
          var _options = $.extend({}, Default, config);

          var toast = new Toasts($(this), _options);

          if (option === 'create') {
            toast[option]();
          }
        });
      };

      return Toasts;
    }();
    /**
     * jQuery API
     * ====================================================
     */


    $.fn[NAME] = Toasts._jQueryInterface;
    $.fn[NAME].Constructor = Toasts;

    $.fn[NAME].noConflict = function () {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Toasts._jQueryInterface;
    };

    return Toasts;
  }(jQuery);

  exports.CardRefresh = CardRefresh;
  exports.CardWidget = CardWidget;
  exports.ControlSidebar = ControlSidebar;
  exports.DirectChat = DirectChat;
  exports.Dropdown = Dropdown;
  exports.Layout = Layout;
  exports.PushMenu = PushMenu;
  exports.Toasts = Toasts;
  exports.TodoList = TodoList;
  exports.Treeview = Treeview;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=adminlte.js.map

{"version":3,"file":"adminlte.js","sources":["../../build/js/ControlSidebar.js","../../build/js/Layout.js","../../build/js/PushMenu.js","../../build/js/Treeview.js","../../build/js/DirectChat.js","../../build/js/TodoList.js","../../build/js/CardWidget.js","../../build/js/CardRefresh.js","../../build/js/Dropdown.js","../../build/js/Toasts.js"],"sourcesContent":["/**\n * --------------------------------------------\n * AdminLTE ControlSidebar.js\n * License MIT\n * --------------------------------------------\n */\n\nconst ControlSidebar = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'ControlSidebar'\n  const DATA_KEY           = 'lte.controlsidebar'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n  const DATA_API_KEY       = '.data-api'\n\n  const Event = {\n    COLLAPSED: `collapsed${EVENT_KEY}`,\n    EXPANDED: `expanded${EVENT_KEY}`,\n  }\n\n  const Selector = {\n    CONTROL_SIDEBAR: '.control-sidebar',\n    CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',\n    DATA_TOGGLE: '[data-widget=\"control-sidebar\"]',\n    CONTENT: '.content-wrapper',\n    HEADER: '.main-header',\n    FOOTER: '.main-footer',\n  }\n\n  const ClassName = {\n    CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',\n    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',\n    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',\n    LAYOUT_FIXED: 'layout-fixed',\n    NAVBAR_FIXED: 'layout-navbar-fixed',\n    NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',\n    NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',\n    NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',\n    NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',\n    FOOTER_FIXED: 'layout-footer-fixed',\n    FOOTER_SM_FIXED: 'layout-sm-footer-fixed',\n    FOOTER_MD_FIXED: 'layout-md-footer-fixed',\n    FOOTER_LG_FIXED: 'layout-lg-footer-fixed',\n    FOOTER_XL_FIXED: 'layout-xl-footer-fixed',\n  }\n\n  const Default = {\n    controlsidebarSlide: true,\n    scrollbarTheme : 'os-theme-light',\n    scrollbarAutoHide: 'l',\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class ControlSidebar {\n    constructor(element, config) {\n      this._element = element\n      this._config  = config\n\n      this._init()\n    }\n\n    // Public\n\n    collapse() {\n      // Show the control sidebar\n      if (this._config.controlsidebarSlide) {\n        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){\n          $(Selector.CONTROL_SIDEBAR).hide()\n          $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n          $(this).dequeue()\n        })\n      } else {\n        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN)\n      }\n\n      const collapsedEvent = $.Event(Event.COLLAPSED)\n      $(this._element).trigger(collapsedEvent)\n    }\n\n    show() {\n      // Collapse the control sidebar\n      if (this._config.controlsidebarSlide) {\n        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n        $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function(){\n          $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){\n            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n            $(this).dequeue()\n          })\n          $(this).dequeue()\n        })\n      } else {\n        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN)\n      }\n\n      const expandedEvent = $.Event(Event.EXPANDED)\n      $(this._element).trigger(expandedEvent)\n    }\n\n    toggle() {\n      const shouldClose = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body')\n        .hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)\n      if (shouldClose) {\n        // Close the control sidebar\n        this.collapse()\n      } else {\n        // Open the control sidebar\n        this.show()\n      }\n    }\n\n    // Private\n\n    _init() {\n      this._fixHeight()\n      this._fixScrollHeight()\n\n      $(window).resize(() => {\n        this._fixHeight()\n        this._fixScrollHeight()\n      })\n\n      $(window).scroll(() => {\n        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {\n            this._fixScrollHeight()\n        }\n      })\n    }\n\n    _fixScrollHeight() {\n      const heights = {\n        scroll: $(document).height(),\n        window: $(window).height(),\n        header: $(Selector.HEADER).outerHeight(),\n        footer: $(Selector.FOOTER).outerHeight(),\n      }\n      const positions = {\n        bottom: Math.abs((heights.window + $(window).scrollTop()) - heights.scroll),\n        top: $(window).scrollTop(),\n      }\n\n      let navbarFixed = false;\n      let footerFixed = false;\n\n      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {\n        if (\n          $('body').hasClass(ClassName.NAVBAR_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_SM_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_MD_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_LG_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_XL_FIXED)\n        ) {\n          if ($(Selector.HEADER).css(\"position\") === \"fixed\") {\n            navbarFixed = true;\n          }\n        }\n        if (\n          $('body').hasClass(ClassName.FOOTER_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_SM_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_MD_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_LG_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_XL_FIXED)\n        ) {\n          if ($(Selector.FOOTER).css(\"position\") === \"fixed\") {\n            footerFixed = true;\n          }\n        }\n\n        if (positions.top === 0 && positions.bottom === 0) {\n          $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);\n          $(Selector.CONTROL_SIDEBAR).css('top', heights.header);\n          $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header + heights.footer))\n        } else if (positions.bottom <= heights.footer) {\n          if (footerFixed === false) {  \n            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer - positions.bottom);\n            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.footer - positions.bottom))\n          } else {\n            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);\n          }\n        } else if (positions.top <= heights.header) {\n          if (navbarFixed === false) {\n            $(Selector.CONTROL_SIDEBAR).css('top', heights.header - positions.top);\n            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header - positions.top))\n          } else {\n            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);\n          }\n        } else {\n          if (navbarFixed === false) {\n            $(Selector.CONTROL_SIDEBAR).css('top', 0);\n            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window)\n          } else {\n            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);\n          }\n        }\n      }\n    }\n\n    _fixHeight() {\n      const heights = {\n        window: $(window).height(),\n        header: $(Selector.HEADER).outerHeight(),\n        footer: $(Selector.FOOTER).outerHeight(),\n      }\n\n      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {\n        let sidebarHeight = heights.window - heights.header;\n\n        if (\n          $('body').hasClass(ClassName.FOOTER_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_SM_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_MD_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_LG_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_XL_FIXED)\n        ) {\n          if ($(Selector.FOOTER).css(\"position\") === \"fixed\") {\n            sidebarHeight = heights.window - heights.header - heights.footer;\n          }\n        }\n\n        $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', sidebarHeight)\n        \n        if (typeof $.fn.overlayScrollbars !== 'undefined') {\n          $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).overlayScrollbars({\n            className       : this._config.scrollbarTheme,\n            sizeAutoCapable : true,\n            scrollbars : {\n              autoHide: this._config.scrollbarAutoHide, \n              clickScrolling : true\n            }\n          })\n        }\n      }\n    }\n\n\n    // Static\n\n    static _jQueryInterface(operation) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new ControlSidebar(this, _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (data[operation] === 'undefined') {\n          throw new Error(`${operation} is not a function`)\n        }\n\n        data[operation]()\n      })\n    }\n  }\n\n  /**\n   *\n   * Data Api implementation\n   * ====================================================\n   */\n  $(document).on('click', Selector.DATA_TOGGLE, function (event) {\n    event.preventDefault()\n\n    ControlSidebar._jQueryInterface.call($(this), 'toggle')\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = ControlSidebar._jQueryInterface\n  $.fn[NAME].Constructor = ControlSidebar\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return ControlSidebar._jQueryInterface\n  }\n\n  return ControlSidebar\n})(jQuery)\n\nexport default ControlSidebar\n  \n","/**\r\n * --------------------------------------------\r\n * AdminLTE Layout.js\r\n * License MIT\r\n * --------------------------------------------\r\n */\r\n\r\nconst Layout = (($) => {\r\n  /**\r\n   * Constants\r\n   * ====================================================\r\n   */\r\n\r\n  const NAME               = 'Layout'\r\n  const DATA_KEY           = 'lte.layout'\r\n  const EVENT_KEY          = `.${DATA_KEY}`\r\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\r\n\r\n  const Event = {\r\n    SIDEBAR: 'sidebar'\r\n  }\r\n\r\n  const Selector = {\r\n    HEADER         : '.main-header',\r\n    MAIN_SIDEBAR   : '.main-sidebar',\r\n    SIDEBAR        : '.main-sidebar .sidebar',\r\n    CONTENT        : '.content-wrapper',\r\n    BRAND          : '.brand-link',\r\n    CONTENT_HEADER : '.content-header',\r\n    WRAPPER        : '.wrapper',\r\n    CONTROL_SIDEBAR: '.control-sidebar',\r\n    CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',\r\n    CONTROL_SIDEBAR_BTN: '[data-widget=\"control-sidebar\"]',\r\n    LAYOUT_FIXED   : '.layout-fixed',\r\n    FOOTER         : '.main-footer',\r\n    PUSHMENU_BTN   : '[data-widget=\"pushmenu\"]',\r\n    LOGIN_BOX      : '.login-box',\r\n    REGISTER_BOX   : '.register-box'\r\n  }\r\n\r\n  const ClassName = {\r\n    HOLD           : 'hold-transition',\r\n    SIDEBAR        : 'main-sidebar',\r\n    CONTENT_FIXED  : 'content-fixed',\r\n    SIDEBAR_FOCUSED: 'sidebar-focused',\r\n    LAYOUT_FIXED   : 'layout-fixed',\r\n    NAVBAR_FIXED   : 'layout-navbar-fixed',\r\n    FOOTER_FIXED   : 'layout-footer-fixed',\r\n    LOGIN_PAGE     : 'login-page',\r\n    REGISTER_PAGE  : 'register-page',\r\n    CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',\r\n    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',\r\n  }\r\n\r\n  const Default = {\r\n    scrollbarTheme : 'os-theme-light',\r\n    scrollbarAutoHide: 'l',\r\n    panelAutoHeight: true,\r\n    loginRegisterAutoHeight: true,\r\n  }\r\n\r\n  /**\r\n   * Class Definition\r\n   * ====================================================\r\n   */\r\n\r\n  class Layout {\r\n    constructor(element, config) {\r\n      this._config  = config\r\n      this._element = element\r\n\r\n      this._init()\r\n    }\r\n\r\n    // Public\r\n\r\n    fixLayoutHeight(extra = null) {\r\n      let control_sidebar = 0\r\n\r\n      if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {\r\n        control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height()\r\n      }\r\n\r\n      const heights = {\r\n        window: $(window).height(),\r\n        header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,\r\n        footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,\r\n        sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,\r\n        control_sidebar: control_sidebar,\r\n      }\r\n\r\n      const max = this._max(heights)\r\n      let offset = this._config.panelAutoHeight\r\n\r\n      if (offset === true) {\r\n        offset = 0;\r\n      }\r\n\r\n      if (offset !== false) {\r\n        if (max == heights.control_sidebar) {\r\n          $(Selector.CONTENT).css('min-height', (max + offset))\r\n        } else if (max == heights.window) {\r\n          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer)\r\n        } else {\r\n          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header)\r\n        }\r\n        if (this._isFooterFixed()) {\r\n          $(Selector.CONTENT).css('min-height', parseFloat($(Selector.CONTENT).css('min-height')) + heights.footer);\r\n        }\r\n      }\r\n\r\n      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {\r\n        if (offset !== false) {\r\n          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer)\r\n        }\r\n\r\n        if (typeof $.fn.overlayScrollbars !== 'undefined') {\r\n          $(Selector.SIDEBAR).overlayScrollbars({\r\n            className       : this._config.scrollbarTheme,\r\n            sizeAutoCapable : true,\r\n            scrollbars : {\r\n              autoHide: this._config.scrollbarAutoHide, \r\n              clickScrolling : true\r\n            }\r\n          })\r\n        }\r\n      }\r\n    }\r\n\r\n    fixLoginRegisterHeight() {\r\n      if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {\r\n        $('body, html').css('height', 'auto')\r\n      } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {\r\n        let box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height()\r\n\r\n        if ($('body').css('min-height') !== box_height) {\r\n          $('body').css('min-height', box_height)\r\n        }\r\n      }\r\n    }\r\n\r\n    // Private\r\n\r\n    _init() {\r\n      // Activate layout height watcher\r\n      this.fixLayoutHeight()\r\n\r\n      if (this._config.loginRegisterAutoHeight === true) {\r\n        this.fixLoginRegisterHeight()\r\n      } else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {\r\n        setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);\r\n      }\r\n\r\n      $(Selector.SIDEBAR)\r\n        .on('collapsed.lte.treeview expanded.lte.treeview', () => {\r\n          this.fixLayoutHeight()\r\n        })\r\n\r\n      $(Selector.PUSHMENU_BTN)\r\n        .on('collapsed.lte.pushmenu shown.lte.pushmenu', () => {\r\n          this.fixLayoutHeight()\r\n        })\r\n\r\n      $(Selector.CONTROL_SIDEBAR_BTN)\r\n        .on('collapsed.lte.controlsidebar', () => {\r\n          this.fixLayoutHeight()\r\n        })\r\n        .on('expanded.lte.controlsidebar', () => {\r\n          this.fixLayoutHeight('control_sidebar')\r\n        })\r\n\r\n      $(window).resize(() => {\r\n        this.fixLayoutHeight()\r\n      })\r\n\r\n      setTimeout(() => {\r\n        $('body.hold-transition').removeClass('hold-transition')\r\n\r\n      }, 50);\r\n    }\r\n\r\n    _max(numbers) {\r\n      // Calculate the maximum number in a list\r\n      let max = 0\r\n\r\n      Object.keys(numbers).forEach((key) => {\r\n        if (numbers[key] > max) {\r\n          max = numbers[key]\r\n        }\r\n      })\r\n\r\n      return max\r\n    }\r\n\r\n    _isFooterFixed() {\r\n      return $('.main-footer').css('position') === 'fixed';\r\n    }\r\n\r\n    // Static\r\n\r\n    static _jQueryInterface(config = '') {\r\n      return this.each(function () {\r\n        let data = $(this).data(DATA_KEY)\r\n        const _options = $.extend({}, Default, $(this).data())\r\n\r\n        if (!data) {\r\n          data = new Layout($(this), _options)\r\n          $(this).data(DATA_KEY, data)\r\n        }\r\n\r\n        if (config === 'init' || config === '') {\r\n          data['_init']()\r\n        } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {\r\n          data[config]()\r\n        }\r\n      })\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Data API\r\n   * ====================================================\r\n   */\r\n\r\n  $(window).on('load', () => {\r\n    Layout._jQueryInterface.call($('body'))\r\n  })\r\n\r\n  $(Selector.SIDEBAR + ' a').on('focusin', () => {\r\n    $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);\r\n  })\r\n\r\n  $(Selector.SIDEBAR + ' a').on('focusout', () => {\r\n    $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);\r\n  })\r\n\r\n  /**\r\n   * jQuery API\r\n   * ====================================================\r\n   */\r\n\r\n  $.fn[NAME] = Layout._jQueryInterface\r\n  $.fn[NAME].Constructor = Layout\r\n  $.fn[NAME].noConflict = function () {\r\n    $.fn[NAME] = JQUERY_NO_CONFLICT\r\n    return Layout._jQueryInterface\r\n  }\r\n\r\n  return Layout\r\n})(jQuery)\r\n\r\nexport default Layout\r\n","/**\n * --------------------------------------------\n * AdminLTE PushMenu.js\n * License MIT\n * --------------------------------------------\n */\n\nconst PushMenu = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'PushMenu'\n  const DATA_KEY           = 'lte.pushmenu'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    COLLAPSED: `collapsed${EVENT_KEY}`,\n    SHOWN: `shown${EVENT_KEY}`\n  }\n\n  const Default = {\n    autoCollapseSize: 992,\n    enableRemember: false,\n    noTransitionAfterReload: true\n  }\n\n  const Selector = {\n    TOGGLE_BUTTON: '[data-widget=\"pushmenu\"]',\n    SIDEBAR_MINI: '.sidebar-mini',\n    SIDEBAR_COLLAPSED: '.sidebar-collapse',\n    BODY: 'body',\n    OVERLAY: '#sidebar-overlay',\n    WRAPPER: '.wrapper'\n  }\n\n  const ClassName = {\n    COLLAPSED: 'sidebar-collapse',\n    OPEN: 'sidebar-open',\n    CLOSED: 'sidebar-closed'\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class PushMenu {\n    constructor(element, options) {\n      this._element = element\n      this._options = $.extend({}, Default, options)\n\n      if (!$(Selector.OVERLAY).length) {\n        this._addOverlay()\n      }\n\n      this._init()\n    }\n\n    // Public\n\n    expand() {\n      if (this._options.autoCollapseSize) {\n        if ($(window).width() <= this._options.autoCollapseSize) {\n          $(Selector.BODY).addClass(ClassName.OPEN)\n        }\n      }\n\n      $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED)\n\n      if(this._options.enableRemember) {\n        localStorage.setItem(`remember${EVENT_KEY}`, ClassName.OPEN)\n      }\n\n      const shownEvent = $.Event(Event.SHOWN)\n      $(this._element).trigger(shownEvent)\n    }\n\n    collapse() {\n      if (this._options.autoCollapseSize) {\n        if ($(window).width() <= this._options.autoCollapseSize) {\n          $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED)\n        }\n      }\n\n      $(Selector.BODY).addClass(ClassName.COLLAPSED)\n\n      if(this._options.enableRemember) {\n        localStorage.setItem(`remember${EVENT_KEY}`, ClassName.COLLAPSED)\n      }\n\n      const collapsedEvent = $.Event(Event.COLLAPSED)\n      $(this._element).trigger(collapsedEvent)\n    }\n\n    toggle() {\n      if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {\n        this.collapse()\n      } else {\n        this.expand()\n      }\n    }\n\n    autoCollapse(resize = false) {\n      if (this._options.autoCollapseSize) {\n        if ($(window).width() <= this._options.autoCollapseSize) {\n          if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {\n            this.collapse()\n          }\n        } else if (resize == true) {\n          if ($(Selector.BODY).hasClass(ClassName.OPEN)) {\n            $(Selector.BODY).removeClass(ClassName.OPEN)\n          } else if($(Selector.BODY).hasClass(ClassName.CLOSED)) {\n            this.expand()\n          }\n        }\n      }\n    }\n\n    remember() {\n      if(this._options.enableRemember) {\n        let toggleState = localStorage.getItem(`remember${EVENT_KEY}`)\n        if (toggleState == ClassName.COLLAPSED){\n          if (this._options.noTransitionAfterReload) {\n              $(\"body\").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function() {\n                $(this).removeClass('hold-transition')\n                $(this).dequeue()\n              })\n          } else {\n            $(\"body\").addClass(ClassName.COLLAPSED)\n          }\n        } else {\n          if (this._options.noTransitionAfterReload) {\n            $(\"body\").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function() {\n              $(this).removeClass('hold-transition')\n              $(this).dequeue()\n            })\n          } else {\n            $(\"body\").removeClass(ClassName.COLLAPSED)\n          }\n        }\n      }\n    }\n\n    // Private\n\n    _init() {\n      this.remember()\n      this.autoCollapse()\n\n      $(window).resize(() => {\n        this.autoCollapse(true)\n      })\n    }\n\n    _addOverlay() {\n      const overlay = $('<div />', {\n        id: 'sidebar-overlay'\n      })\n\n      overlay.on('click', () => {\n        this.collapse()\n      })\n\n      $(Selector.WRAPPER).append(overlay)\n    }\n\n    // Static\n\n    static _jQueryInterface(operation) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new PushMenu(this, _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {\n          data[operation]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.TOGGLE_BUTTON, (event) => {\n    event.preventDefault()\n\n    let button = event.currentTarget\n\n    if ($(button).data('widget') !== 'pushmenu') {\n      button = $(button).closest(Selector.TOGGLE_BUTTON)\n    }\n\n    PushMenu._jQueryInterface.call($(button), 'toggle')\n  })\n\n  $(window).on('load', () => {\n    PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON))\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = PushMenu._jQueryInterface\n  $.fn[NAME].Constructor = PushMenu\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return PushMenu._jQueryInterface\n  }\n\n  return PushMenu\n})(jQuery)\n\nexport default PushMenu\n","/**\n * --------------------------------------------\n * AdminLTE Treeview.js\n * License MIT\n * --------------------------------------------\n */\n\nconst Treeview = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'Treeview'\n  const DATA_KEY           = 'lte.treeview'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    SELECTED     : `selected${EVENT_KEY}`,\n    EXPANDED     : `expanded${EVENT_KEY}`,\n    COLLAPSED    : `collapsed${EVENT_KEY}`,\n    LOAD_DATA_API: `load${EVENT_KEY}`\n  }\n\n  const Selector = {\n    LI           : '.nav-item',\n    LINK         : '.nav-link',\n    TREEVIEW_MENU: '.nav-treeview',\n    OPEN         : '.menu-open',\n    DATA_WIDGET  : '[data-widget=\"treeview\"]'\n  }\n\n  const ClassName = {\n    LI               : 'nav-item',\n    LINK             : 'nav-link',\n    TREEVIEW_MENU    : 'nav-treeview',\n    OPEN             : 'menu-open',\n    SIDEBAR_COLLAPSED: 'sidebar-collapse'\n  }\n\n  const Default = {\n    trigger              : `${Selector.DATA_WIDGET} ${Selector.LINK}`,\n    animationSpeed       : 300,\n    accordion            : true,\n    expandSidebar        : false,\n    sidebarButtonSelector: '[data-widget=\"pushmenu\"]'\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n  class Treeview {\n    constructor(element, config) {\n      this._config  = config\n      this._element = element\n    }\n\n    // Public\n\n    init() {\n      this._setupListeners()\n    }\n\n    expand(treeviewMenu, parentLi) {\n      const expandedEvent = $.Event(Event.EXPANDED)\n\n      if (this._config.accordion) {\n        const openMenuLi   = parentLi.siblings(Selector.OPEN).first()\n        const openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first()\n        this.collapse(openTreeview, openMenuLi)\n      }\n\n      treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {\n        parentLi.addClass(ClassName.OPEN)\n        $(this._element).trigger(expandedEvent)\n      })\n\n      if (this._config.expandSidebar) {\n        this._expandSidebar()\n      }\n    }\n\n    collapse(treeviewMenu, parentLi) {\n      const collapsedEvent = $.Event(Event.COLLAPSED)\n\n      treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {\n        parentLi.removeClass(ClassName.OPEN)\n        $(this._element).trigger(collapsedEvent)\n        treeviewMenu.find(`${Selector.OPEN} > ${Selector.TREEVIEW_MENU}`).slideUp()\n        treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN)\n      })\n    }\n\n    toggle(event) {\n\n      const $relativeTarget = $(event.currentTarget)\n      const $parent = $relativeTarget.parent()\n\n      let treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU)\n\n      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {\n\n        if (!$parent.is(Selector.LI)) {\n          treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU)\n        }\n\n        if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {\n          return\n        }\n      }\n      \n      event.preventDefault()\n\n      const parentLi = $relativeTarget.parents(Selector.LI).first()\n      const isOpen   = parentLi.hasClass(ClassName.OPEN)\n\n      if (isOpen) {\n        this.collapse($(treeviewMenu), parentLi)\n      } else {\n        this.expand($(treeviewMenu), parentLi)\n      }\n    }\n\n    // Private\n\n    _setupListeners() {\n      $(document).on('click', this._config.trigger, (event) => {\n        this.toggle(event)\n      })\n    }\n\n    _expandSidebar() {\n      if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {\n        $(this._config.sidebarButtonSelector).PushMenu('expand')\n      }\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new Treeview($(this), _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (config === 'init') {\n          data[config]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(window).on(Event.LOAD_DATA_API, () => {\n    $(Selector.DATA_WIDGET).each(function () {\n      Treeview._jQueryInterface.call($(this), 'init')\n    })\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = Treeview._jQueryInterface\n  $.fn[NAME].Constructor = Treeview\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return Treeview._jQueryInterface\n  }\n\n  return Treeview\n})(jQuery)\n\nexport default Treeview\n","/**\n * --------------------------------------------\n * AdminLTE DirectChat.js\n * License MIT\n * --------------------------------------------\n */\n\nconst DirectChat = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'DirectChat'\n  const DATA_KEY           = 'lte.directchat'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n  const DATA_API_KEY       = '.data-api'\n\n  const Event = {\n    TOGGLED: `toggled{EVENT_KEY}`\n  }\n\n  const Selector = {\n    DATA_TOGGLE: '[data-widget=\"chat-pane-toggle\"]',\n    DIRECT_CHAT: '.direct-chat'\n  };\n\n  const ClassName = {\n    DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'\n  };\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class DirectChat {\n    constructor(element, config) {\n      this._element = element\n    }\n\n    toggle() {\n      $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);\n\n      const toggledEvent = $.Event(Event.TOGGLED)\n      $(this._element).trigger(toggledEvent)\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data      = $(this).data(DATA_KEY)\n\n        if (!data) {\n          data = new DirectChat($(this))\n          $(this).data(DATA_KEY, data)\n        }\n\n        data[config]()\n      })\n    }\n  }\n\n  /**\n   *\n   * Data Api implementation\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.DATA_TOGGLE, function (event) {\n    if (event) event.preventDefault();\n    DirectChat._jQueryInterface.call($(this), 'toggle');\n  });\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = DirectChat._jQueryInterface\n  $.fn[NAME].Constructor = DirectChat\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return DirectChat._jQueryInterface\n  }\n\n  return DirectChat\n})(jQuery)\n\nexport default DirectChat\n","/**\n * --------------------------------------------\n * AdminLTE TodoList.js\n * License MIT\n * --------------------------------------------\n */\n\nconst TodoList = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'TodoList'\n  const DATA_KEY           = 'lte.todolist'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Selector = {\n    DATA_TOGGLE: '[data-widget=\"todo-list\"]'\n  }\n\n  const ClassName = {\n    TODO_LIST_DONE: 'done'\n  }\n\n  const Default = {\n    onCheck: function (item) {\n      return item;\n    },\n    onUnCheck: function (item) {\n      return item;\n    }\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class TodoList {\n    constructor(element, config) {\n      this._config  = config\n      this._element = element\n\n      this._init()\n    }\n\n    // Public\n\n    toggle(item) {\n      item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);\n      if (! $(item).prop('checked')) {\n        this.unCheck($(item));\n        return;\n      }\n\n      this.check(item);\n    }\n\n    check (item) {\n      this._config.onCheck.call(item);\n    }\n\n    unCheck (item) {\n      this._config.onUnCheck.call(item);\n    }\n\n    // Private\n\n    _init() {\n      var that = this\n      $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE)\n      $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', (event) => {\n        that.toggle($(event.target))\n      })\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new TodoList($(this), _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (config === 'init') {\n          data[config]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(window).on('load', () => {\n    TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE))\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = TodoList._jQueryInterface\n  $.fn[NAME].Constructor = TodoList\n  $.fn[NAME].noConflict = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return TodoList._jQueryInterface\n  }\n\n  return TodoList\n})(jQuery)\n\nexport default TodoList\n","/**\n * --------------------------------------------\n * AdminLTE CardWidget.js\n * License MIT\n * --------------------------------------------\n */\n\nconst CardWidget = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'CardWidget'\n  const DATA_KEY           = 'lte.cardwidget'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    EXPANDED: `expanded${EVENT_KEY}`,\n    COLLAPSED: `collapsed${EVENT_KEY}`,\n    MAXIMIZED: `maximized${EVENT_KEY}`,\n    MINIMIZED: `minimized${EVENT_KEY}`,\n    REMOVED: `removed${EVENT_KEY}`\n  }\n\n  const ClassName = {\n    CARD: 'card',\n    COLLAPSED: 'collapsed-card',\n    COLLAPSING: 'collapsing-card',\n    EXPANDING: 'expanding-card',\n    WAS_COLLAPSED: 'was-collapsed',\n    MAXIMIZED: 'maximized-card',\n  }\n\n  const Selector = {\n    DATA_REMOVE: '[data-card-widget=\"remove\"]',\n    DATA_COLLAPSE: '[data-card-widget=\"collapse\"]',\n    DATA_MAXIMIZE: '[data-card-widget=\"maximize\"]',\n    CARD: `.${ClassName.CARD}`,\n    CARD_HEADER: '.card-header',\n    CARD_BODY: '.card-body',\n    CARD_FOOTER: '.card-footer',\n    COLLAPSED: `.${ClassName.COLLAPSED}`,\n  }\n\n  const Default = {\n    animationSpeed: 'normal',\n    collapseTrigger: Selector.DATA_COLLAPSE,\n    removeTrigger: Selector.DATA_REMOVE,\n    maximizeTrigger: Selector.DATA_MAXIMIZE,\n    collapseIcon: 'fa-minus',\n    expandIcon: 'fa-plus',\n    maximizeIcon: 'fa-expand',\n    minimizeIcon: 'fa-compress',\n  }\n\n  class CardWidget {\n    constructor(element, settings) {\n      this._element  = element\n      this._parent = element.parents(Selector.CARD).first()\n\n      if (element.hasClass(ClassName.CARD)) {\n        this._parent = element\n      }\n\n      this._settings = $.extend({}, Default, settings)\n    }\n\n    collapse() {\n      this._parent.addClass(ClassName.COLLAPSING).children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)\n        .slideUp(this._settings.animationSpeed, () => {\n          this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING)\n        })\n\n      this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon)\n        .addClass(this._settings.expandIcon)\n        .removeClass(this._settings.collapseIcon)\n\n      const collapsed = $.Event(Event.COLLAPSED)\n\n      this._element.trigger(collapsed, this._parent)\n    }\n\n    expand() {\n      this._parent.addClass(ClassName.EXPANDING).children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)\n        .slideDown(this._settings.animationSpeed, () => {\n          this._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING)\n        })\n\n      this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon)\n        .addClass(this._settings.collapseIcon)\n        .removeClass(this._settings.expandIcon)\n\n      const expanded = $.Event(Event.EXPANDED)\n\n      this._element.trigger(expanded, this._parent)\n    }\n\n    remove() {\n      this._parent.slideUp()\n\n      const removed = $.Event(Event.REMOVED)\n\n      this._element.trigger(removed, this._parent)\n    }\n\n    toggle() {\n      if (this._parent.hasClass(ClassName.COLLAPSED)) {\n        this.expand()\n        return\n      }\n\n      this.collapse()\n    }\n    \n    maximize() {\n      this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon)\n        .addClass(this._settings.minimizeIcon)\n        .removeClass(this._settings.maximizeIcon)\n      this._parent.css({\n        'height': this._parent.height(),\n        'width': this._parent.width(),\n        'transition': 'all .15s'\n      }).delay(150).queue(function(){\n        $(this).addClass(ClassName.MAXIMIZED)\n        $('html').addClass(ClassName.MAXIMIZED)\n        if ($(this).hasClass(ClassName.COLLAPSED)) {\n          $(this).addClass(ClassName.WAS_COLLAPSED)\n        }\n        $(this).dequeue()\n      })\n\n      const maximized = $.Event(Event.MAXIMIZED)\n\n      this._element.trigger(maximized, this._parent)\n    }\n\n    minimize() {\n      this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon)\n        .addClass(this._settings.maximizeIcon)\n        .removeClass(this._settings.minimizeIcon)\n      this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' +\n        'width:' + this._parent[0].style.width + ' !important; transition: all .15s;'\n      ).delay(10).queue(function(){\n        $(this).removeClass(ClassName.MAXIMIZED)\n        $('html').removeClass(ClassName.MAXIMIZED)\n        $(this).css({\n          'height': 'inherit',\n          'width': 'inherit'\n        })\n        if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {\n          $(this).removeClass(ClassName.WAS_COLLAPSED)\n        }\n        $(this).dequeue()\n      })\n\n      const MINIMIZED = $.Event(Event.MINIMIZED)\n\n      this._element.trigger(MINIMIZED, this._parent)\n    }\n\n    toggleMaximize() {\n      if (this._parent.hasClass(ClassName.MAXIMIZED)) {\n        this.minimize()\n        return\n      }\n\n      this.maximize()\n    }\n\n    // Private\n\n    _init(card) {\n      this._parent = card\n\n      $(this).find(this._settings.collapseTrigger).click(() => {\n        this.toggle()\n      })\n\n      $(this).find(this._settings.maximizeTrigger).click(() => {\n        this.toggleMaximize()\n      })\n\n      $(this).find(this._settings.removeTrigger).click(() => {\n        this.remove()\n      })\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      let data = $(this).data(DATA_KEY)\n      const _options = $.extend({}, Default, $(this).data())\n\n      if (!data) {\n        data = new CardWidget($(this), _options)\n        $(this).data(DATA_KEY, typeof config === 'string' ? data: config)\n      }\n\n      if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {\n        data[config]()\n      } else if (typeof config === 'object') {\n        data._init($(this))\n      }\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardWidget._jQueryInterface.call($(this), 'toggle')\n  })\n\n  $(document).on('click', Selector.DATA_REMOVE, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardWidget._jQueryInterface.call($(this), 'remove')\n  })\n\n  $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardWidget._jQueryInterface.call($(this), 'toggleMaximize')\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = CardWidget._jQueryInterface\n  $.fn[NAME].Constructor = CardWidget\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return CardWidget._jQueryInterface\n  }\n\n  return CardWidget\n})(jQuery)\n\nexport default CardWidget\n","/**\n * --------------------------------------------\n * AdminLTE CardRefresh.js\n * License MIT\n * --------------------------------------------\n */\n\nconst CardRefresh = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'CardRefresh'\n  const DATA_KEY           = 'lte.cardrefresh'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    LOADED: `loaded${EVENT_KEY}`,\n    OVERLAY_ADDED: `overlay.added${EVENT_KEY}`,\n    OVERLAY_REMOVED: `overlay.removed${EVENT_KEY}`,\n  }\n\n  const ClassName = {\n    CARD: 'card',\n  }\n\n  const Selector = {\n    CARD: `.${ClassName.CARD}`,\n    DATA_REFRESH: '[data-card-widget=\"card-refresh\"]',\n  }\n\n  const Default = {\n    source: '',\n    sourceSelector: '',\n    params: {},\n    trigger: Selector.DATA_REFRESH,\n    content: '.card-body',\n    loadInContent: true,\n    loadOnInit: true,\n    responseType: '',\n    overlayTemplate: '<div class=\"overlay\"><i class=\"fas fa-2x fa-sync-alt fa-spin\"></i></div>',\n    onLoadStart: function () {\n    },\n    onLoadDone: function (response) {\n      return response;\n    }\n  }\n\n  class CardRefresh {\n    constructor(element, settings) {\n      this._element  = element\n      this._parent = element.parents(Selector.CARD).first()\n      this._settings = $.extend({}, Default, settings)\n      this._overlay = $(this._settings.overlayTemplate)\n\n      if (element.hasClass(ClassName.CARD)) {\n        this._parent = element\n      }\n\n      if (this._settings.source === '') {\n        throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');\n      }\n    }\n\n    load() {\n      this._addOverlay()\n      this._settings.onLoadStart.call($(this))\n\n      $.get(this._settings.source, this._settings.params, function (response) {\n        if (this._settings.loadInContent) {\n          if (this._settings.sourceSelector != '') {\n            response = $(response).find(this._settings.sourceSelector).html()\n          }\n\n          this._parent.find(this._settings.content).html(response)\n        }\n\n        this._settings.onLoadDone.call($(this), response)\n        this._removeOverlay();\n      }.bind(this), this._settings.responseType !== '' && this._settings.responseType)\n\n      const loadedEvent = $.Event(Event.LOADED)\n      $(this._element).trigger(loadedEvent)\n    }\n\n    _addOverlay() {\n      this._parent.append(this._overlay)\n\n      const overlayAddedEvent = $.Event(Event.OVERLAY_ADDED)\n      $(this._element).trigger(overlayAddedEvent)\n    };\n\n    _removeOverlay() {\n      this._parent.find(this._overlay).remove()\n\n      const overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED)\n      $(this._element).trigger(overlayRemovedEvent)\n    };\n\n\n    // Private\n\n    _init(card) {\n      $(this).find(this._settings.trigger).on('click', () => {\n        this.load()\n      })\n\n      if (this._settings.loadOnInit) {\n        this.load()\n      }\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      let data = $(this).data(DATA_KEY)\n      const _options = $.extend({}, Default, $(this).data())\n\n      if (!data) {\n        data = new CardRefresh($(this), _options)\n        $(this).data(DATA_KEY, typeof config === 'string' ? data: config)\n      }\n\n      if (typeof config === 'string' && config.match(/load/)) {\n        data[config]()\n      } else {\n        data._init($(this))\n      }\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.DATA_REFRESH, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardRefresh._jQueryInterface.call($(this), 'load')\n  })\n\n  $(document).ready(function () {\n    $(Selector.DATA_REFRESH).each(function() {\n      CardRefresh._jQueryInterface.call($(this))\n    })\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = CardRefresh._jQueryInterface\n  $.fn[NAME].Constructor = CardRefresh\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return CardRefresh._jQueryInterface\n  }\n\n  return CardRefresh\n})(jQuery)\n\nexport default CardRefresh\n","/**\n * --------------------------------------------\n * AdminLTE Dropdown.js\n * License MIT\n * --------------------------------------------\n */\n\nconst Dropdown = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'Dropdown'\n  const DATA_KEY           = 'lte.dropdown'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Selector = {\n    NAVBAR: '.navbar',\n    DROPDOWN_MENU: '.dropdown-menu',\n    DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',\n    DROPDOWN_TOGGLE: '[data-toggle=\"dropdown\"]',\n  }\n\n  const ClassName = {\n    DROPDOWN_HOVER: 'dropdown-hover',\n    DROPDOWN_RIGHT: 'dropdown-menu-right'\n  }\n\n  const Default = {\n  }\n\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class Dropdown {\n    constructor(element, config) {\n      this._config  = config\n      this._element = element\n    }\n\n    // Public\n\n    toggleSubmenu() {\n      this._element.siblings().show().toggleClass(\"show\")\n\n      if (! this._element.next().hasClass('show')) {\n        this._element.parents('.dropdown-menu').first().find('.show').removeClass(\"show\").hide()\n      }\n\n      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {\n        $('.dropdown-submenu .show').removeClass(\"show\").hide()\n      })\n    }\n\n    fixPosition() {\n      let elm = $(Selector.DROPDOWN_MENU_ACTIVE)\n\n      if (elm.length !== 0) {\n        if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {\n          elm.css('left', 'inherit')\n          elm.css('right', 0)\n        } else {\n          elm.css('left', 0)\n          elm.css('right', 'inherit')\n        }\n\n        let offset = elm.offset()\n        let width = elm.width()\n        let windowWidth = $(window).width()\n        let visiblePart = windowWidth - offset.left\n\n        if (offset.left < 0) {\n          elm.css('left', 'inherit')\n          elm.css('right', (offset.left - 5))\n        } else {\n          if (visiblePart < width) {\n            elm.css('left', 'inherit')\n            elm.css('right', 0)\n          }\n        }\n      }  \n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data      = $(this).data(DATA_KEY)\n        const _config = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new Dropdown($(this), _config)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (config === 'toggleSubmenu' || config == 'fixPosition') {\n          data[config]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on(\"click\", function(event) {\n    event.preventDefault()\n    event.stopPropagation()\n\n    Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')\n  });\n\n  $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on(\"click\", function(event) {\n    event.preventDefault()\n\n    setTimeout(function() {\n      Dropdown._jQueryInterface.call($(this), 'fixPosition')\n    }, 1)\n  });\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = Dropdown._jQueryInterface\n  $.fn[NAME].Constructor = Dropdown\n  $.fn[NAME].noConflict = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return Dropdown._jQueryInterface\n  }\n\n  return Dropdown\n})(jQuery)\n\nexport default Dropdown\n","/**\n * --------------------------------------------\n * AdminLTE Toasts.js\n * License MIT\n * --------------------------------------------\n */\n\nconst Toasts = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'Toasts'\n  const DATA_KEY           = 'lte.toasts'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    INIT: `init${EVENT_KEY}`,\n    CREATED: `created${EVENT_KEY}`,\n    REMOVED: `removed${EVENT_KEY}`,\n  }\n\n  const Selector = {\n    BODY: 'toast-body',\n    CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',\n    CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',\n    CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',\n    CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft',\n  }\n\n  const ClassName = {\n    TOP_RIGHT: 'toasts-top-right',\n    TOP_LEFT: 'toasts-top-left',\n    BOTTOM_RIGHT: 'toasts-bottom-right',\n    BOTTOM_LEFT: 'toasts-bottom-left',\n    FADE: 'fade',\n  }\n\n  const Position = {\n    TOP_RIGHT: 'topRight',\n    TOP_LEFT: 'topLeft',\n    BOTTOM_RIGHT: 'bottomRight',\n    BOTTOM_LEFT: 'bottomLeft',\n  }\n\n  const Id = {\n    CONTAINER_TOP_RIGHT: 'toastsContainerTopRight',\n    CONTAINER_TOP_LEFT: 'toastsContainerTopLeft',\n    CONTAINER_BOTTOM_RIGHT: 'toastsContainerBottomRight',\n    CONTAINER_BOTTOM_LEFT: 'toastsContainerBottomLeft',\n  }\n\n  const Default = {\n    position: Position.TOP_RIGHT,\n    fixed: true,\n    autohide: false,\n    autoremove: true,\n    delay: 1000,\n    fade: true,\n    icon: null,\n    image: null,\n    imageAlt: null,\n    imageHeight: '25px',\n    title: null,\n    subtitle: null,\n    close: true,\n    body: null,\n    class: null,\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n  class Toasts {\n    constructor(element, config) {\n      this._config  = config\n\n      this._prepareContainer();\n\n      const initEvent = $.Event(Event.INIT)\n      $('body').trigger(initEvent)\n    }\n\n    // Public\n\n    create() {\n      var toast = $('<div class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"/>')\n\n      toast.data('autohide', this._config.autohide)\n      toast.data('animation', this._config.fade)\n      \n      if (this._config.class) {\n        toast.addClass(this._config.class)\n      }\n\n      if (this._config.delay && this._config.delay != 500) {\n        toast.data('delay', this._config.delay)\n      }\n\n      var toast_header = $('<div class=\"toast-header\">')\n\n      if (this._config.image != null) {\n        var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt)\n        \n        if (this._config.imageHeight != null) {\n          toast_image.height(this._config.imageHeight).width('auto')\n        }\n\n        toast_header.append(toast_image)\n      }\n\n      if (this._config.icon != null) {\n        toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon))\n      }\n\n      if (this._config.title != null) {\n        toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title))\n      }\n\n      if (this._config.subtitle != null) {\n        toast_header.append($('<small />').html(this._config.subtitle))\n      }\n\n      if (this._config.close == true) {\n        var toast_close = $('<button data-dismiss=\"toast\" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden=\"true\">&times;</span>')\n        \n        if (this._config.title == null) {\n          toast_close.toggleClass('ml-2 ml-auto')\n        }\n        \n        toast_header.append(toast_close)\n      }\n\n      toast.append(toast_header)\n\n      if (this._config.body != null) {\n        toast.append($('<div class=\"toast-body\" />').html(this._config.body))\n      }\n\n      $(this._getContainerId()).prepend(toast)\n\n      const createdEvent = $.Event(Event.CREATED)\n      $('body').trigger(createdEvent)\n\n      toast.toast('show')\n\n\n      if (this._config.autoremove) {\n        toast.on('hidden.bs.toast', function () {\n          $(this).delay(200).remove();\n\n          const removedEvent = $.Event(Event.REMOVED)\n          $('body').trigger(removedEvent)\n        })\n      }\n\n\n    }\n\n    // Static\n\n    _getContainerId() {\n      if (this._config.position == Position.TOP_RIGHT) {\n        return Selector.CONTAINER_TOP_RIGHT;\n      } else if (this._config.position == Position.TOP_LEFT) {\n        return Selector.CONTAINER_TOP_LEFT;\n      } else if (this._config.position == Position.BOTTOM_RIGHT) {\n        return Selector.CONTAINER_BOTTOM_RIGHT;\n      } else if (this._config.position == Position.BOTTOM_LEFT) {\n        return Selector.CONTAINER_BOTTOM_LEFT;\n      }\n    }\n\n    _prepareContainer() {\n      if ($(this._getContainerId()).length === 0) {\n        var container = $('<div />').attr('id', this._getContainerId().replace('#', ''))\n        if (this._config.position == Position.TOP_RIGHT) {\n          container.addClass(ClassName.TOP_RIGHT)\n        } else if (this._config.position == Position.TOP_LEFT) {\n          container.addClass(ClassName.TOP_LEFT)\n        } else if (this._config.position == Position.BOTTOM_RIGHT) {\n          container.addClass(ClassName.BOTTOM_RIGHT)\n        } else if (this._config.position == Position.BOTTOM_LEFT) {\n          container.addClass(ClassName.BOTTOM_LEFT)\n        }\n\n        $('body').append(container)\n      }\n\n      if (this._config.fixed) {\n        $(this._getContainerId()).addClass('fixed')\n      } else {\n        $(this._getContainerId()).removeClass('fixed')\n      }\n    }\n\n    // Static\n\n    static _jQueryInterface(option, config) {\n      return this.each(function () {\n        const _options = $.extend({}, Default, config)\n        var toast = new Toasts($(this), _options)\n\n        if (option === 'create') {\n          toast[option]()\n        }\n      })\n    }\n  }\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = Toasts._jQueryInterface\n  $.fn[NAME].Constructor = Toasts\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return Toasts._jQueryInterface\n  }\n\n  return Toasts\n})(jQuery)\n\nexport default Toasts\n"],"names":["ControlSidebar","$","NAME","DATA_KEY","EVENT_KEY","JQUERY_NO_CONFLICT","fn","Event","COLLAPSED","EXPANDED","Selector","CONTROL_SIDEBAR","CONTROL_SIDEBAR_CONTENT","DATA_TOGGLE","CONTENT","HEADER","FOOTER","ClassName","CONTROL_SIDEBAR_ANIMATE","CONTROL_SIDEBAR_OPEN","CONTROL_SIDEBAR_SLIDE","LAYOUT_FIXED","NAVBAR_FIXED","NAVBAR_SM_FIXED","NAVBAR_MD_FIXED","NAVBAR_LG_FIXED","NAVBAR_XL_FIXED","FOOTER_FIXED","FOOTER_SM_FIXED","FOOTER_MD_FIXED","FOOTER_LG_FIXED","FOOTER_XL_FIXED","Default","controlsidebarSlide","scrollbarTheme","scrollbarAutoHide","element","config","_element","_config","_init","collapse","addClass","removeClass","delay","queue","hide","dequeue","collapsedEvent","trigger","show","expandedEvent","toggle","shouldClose","hasClass","_fixHeight","_fixScrollHeight","window","resize","scroll","heights","document","height","header","outerHeight","footer","positions","bottom","Math","abs","scrollTop","top","navbarFixed","footerFixed","css","sidebarHeight","overlayScrollbars","className","sizeAutoCapable","scrollbars","autoHide","clickScrolling","_jQueryInterface","operation","each","data","_options","extend","Error","on","event","preventDefault","call","Constructor","noConflict","jQuery","Layout","MAIN_SIDEBAR","SIDEBAR","BRAND","CONTENT_HEADER","WRAPPER","CONTROL_SIDEBAR_BTN","PUSHMENU_BTN","LOGIN_BOX","REGISTER_BOX","HOLD","CONTENT_FIXED","SIDEBAR_FOCUSED","LOGIN_PAGE","REGISTER_PAGE","CONTROL_SIDEBAR_SLIDE_OPEN","panelAutoHeight","loginRegisterAutoHeight","fixLayoutHeight","extra","control_sidebar","length","sidebar","max","_max","offset","_isFooterFixed","parseFloat","fixLoginRegisterHeight","box_height","Number","isInteger","setInterval","setTimeout","numbers","Object","keys","forEach","key","PushMenu","SHOWN","autoCollapseSize","enableRemember","noTransitionAfterReload","TOGGLE_BUTTON","SIDEBAR_MINI","SIDEBAR_COLLAPSED","BODY","OVERLAY","OPEN","CLOSED","options","_addOverlay","expand","width","localStorage","setItem","shownEvent","autoCollapse","remember","toggleState","getItem","overlay","id","append","match","button","currentTarget","closest","Treeview","SELECTED","LOAD_DATA_API","LI","LINK","TREEVIEW_MENU","DATA_WIDGET","animationSpeed","accordion","expandSidebar","sidebarButtonSelector","init","_setupListeners","treeviewMenu","parentLi","openMenuLi","siblings","first","openTreeview","find","stop","slideDown","_expandSidebar","slideUp","$relativeTarget","$parent","parent","is","parents","isOpen","DirectChat","TOGGLED","DIRECT_CHAT","DIRECT_CHAT_OPEN","toggleClass","toggledEvent","TodoList","TODO_LIST_DONE","onCheck","item","onUnCheck","prop","unCheck","check","that","target","CardWidget","MAXIMIZED","MINIMIZED","REMOVED","CARD","COLLAPSING","EXPANDING","WAS_COLLAPSED","DATA_REMOVE","DATA_COLLAPSE","DATA_MAXIMIZE","CARD_HEADER","CARD_BODY","CARD_FOOTER","collapseTrigger","removeTrigger","maximizeTrigger","collapseIcon","expandIcon","maximizeIcon","minimizeIcon","settings","_parent","_settings","children","collapsed","expanded","remove","removed","maximize","maximized","minimize","style","toggleMaximize","card","click","CardRefresh","LOADED","OVERLAY_ADDED","OVERLAY_REMOVED","DATA_REFRESH","source","sourceSelector","params","content","loadInContent","loadOnInit","responseType","overlayTemplate","onLoadStart","onLoadDone","response","_overlay","load","get","html","_removeOverlay","bind","loadedEvent","overlayAddedEvent","overlayRemovedEvent","ready","Dropdown","NAVBAR","DROPDOWN_MENU","DROPDOWN_MENU_ACTIVE","DROPDOWN_TOGGLE","DROPDOWN_HOVER","DROPDOWN_RIGHT","toggleSubmenu","next","e","fixPosition","elm","windowWidth","visiblePart","left","stopPropagation","Toasts","INIT","CREATED","CONTAINER_TOP_RIGHT","CONTAINER_TOP_LEFT","CONTAINER_BOTTOM_RIGHT","CONTAINER_BOTTOM_LEFT","TOP_RIGHT","TOP_LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","FADE","Position","position","fixed","autohide","autoremove","fade","icon","image","imageAlt","imageHeight","title","subtitle","close","body","class","_prepareContainer","initEvent","create","toast","toast_header","toast_image","attr","toast_close","_getContainerId","prepend","createdEvent","removedEvent","container","replace","option"],"mappings":"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"}
/*!
 * AdminLTE v3.0.5 (https://adminlte.io)
 * Copyright 2014-2020 Colorlib <http://colorlib.com>
 * Licensed under MIT (https://github.com/ColorlibHQ/AdminLTE/blob/master/LICENSE)
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).adminlte={})}(this,(function(t){"use strict";var e=function(t){var e="ControlSidebar",i="lte.controlsidebar",n=t.fn[e],s={COLLAPSED:"collapsed.lte.controlsidebar",EXPANDED:"expanded.lte.controlsidebar"},o=".control-sidebar",a=".control-sidebar-content",r='[data-widget="control-sidebar"]',l=".main-header",c=".main-footer",d="control-sidebar-animate",h="control-sidebar-open",f="control-sidebar-slide-open",u="layout-fixed",g="layout-navbar-fixed",p="layout-sm-navbar-fixed",_="layout-md-navbar-fixed",m="layout-lg-navbar-fixed",v="layout-xl-navbar-fixed",C="layout-footer-fixed",y="layout-sm-footer-fixed",b="layout-md-footer-fixed",w="layout-lg-footer-fixed",x="layout-xl-footer-fixed",E={controlsidebarSlide:!0,scrollbarTheme:"os-theme-light",scrollbarAutoHide:"l"},A=function(){function e(t,e){this._element=t,this._config=e,this._init()}var n=e.prototype;return n.collapse=function(){this._config.controlsidebarSlide?(t("html").addClass(d),t("body").removeClass(f).delay(300).queue((function(){t(o).hide(),t("html").removeClass(d),t(this).dequeue()}))):t("body").removeClass(h);var e=t.Event(s.COLLAPSED);t(this._element).trigger(e)},n.show=function(){this._config.controlsidebarSlide?(t("html").addClass(d),t(o).show().delay(10).queue((function(){t("body").addClass(f).delay(300).queue((function(){t("html").removeClass(d),t(this).dequeue()})),t(this).dequeue()}))):t("body").addClass(h);var e=t.Event(s.EXPANDED);t(this._element).trigger(e)},n.toggle=function(){t("body").hasClass(h)||t("body").hasClass(f)?this.collapse():this.show()},n._init=function(){var e=this;this._fixHeight(),this._fixScrollHeight(),t(window).resize((function(){e._fixHeight(),e._fixScrollHeight()})),t(window).scroll((function(){(t("body").hasClass(h)||t("body").hasClass(f))&&e._fixScrollHeight()}))},n._fixScrollHeight=function(){var e={scroll:t(document).height(),window:t(window).height(),header:t(l).outerHeight(),footer:t(c).outerHeight()},i=Math.abs(e.window+t(window).scrollTop()-e.scroll),n=t(window).scrollTop(),s=!1,r=!1;t("body").hasClass(u)&&((t("body").hasClass(g)||t("body").hasClass(p)||t("body").hasClass(_)||t("body").hasClass(m)||t("body").hasClass(v))&&"fixed"===t(l).css("position")&&(s=!0),(t("body").hasClass(C)||t("body").hasClass(y)||t("body").hasClass(b)||t("body").hasClass(w)||t("body").hasClass(x))&&"fixed"===t(c).css("position")&&(r=!0),0===n&&0===i?(t(o).css("bottom",e.footer),t(o).css("top",e.header),t(o+", "+o+" "+a).css("height",e.window-(e.header+e.footer))):i<=e.footer?!1===r?(t(o).css("bottom",e.footer-i),t(o+", "+o+" "+a).css("height",e.window-(e.footer-i))):t(o).css("bottom",e.footer):n<=e.header?!1===s?(t(o).css("top",e.header-n),t(o+", "+o+" "+a).css("height",e.window-(e.header-n))):t(o).css("top",e.header):!1===s?(t(o).css("top",0),t(o+", "+o+" "+a).css("height",e.window)):t(o).css("top",e.header))},n._fixHeight=function(){var e=t(window).height(),i=t(l).outerHeight(),n=t(c).outerHeight();if(t("body").hasClass(u)){var s=e-i;(t("body").hasClass(C)||t("body").hasClass(y)||t("body").hasClass(b)||t("body").hasClass(w)||t("body").hasClass(x))&&"fixed"===t(c).css("position")&&(s=e-i-n),t(o+" "+a).css("height",s),"undefined"!=typeof t.fn.overlayScrollbars&&t(o+" "+a).overlayScrollbars({className:this._config.scrollbarTheme,sizeAutoCapable:!0,scrollbars:{autoHide:this._config.scrollbarAutoHide,clickScrolling:!0}})}},e._jQueryInterface=function(n){return this.each((function(){var s=t(this).data(i),o=t.extend({},E,t(this).data());if(s||(s=new e(this,o),t(this).data(i,s)),"undefined"===s[n])throw new Error(n+" is not a function");s[n]()}))},e}();return t(document).on("click",r,(function(e){e.preventDefault(),A._jQueryInterface.call(t(this),"toggle")})),t.fn[e]=A._jQueryInterface,t.fn[e].Constructor=A,t.fn[e].noConflict=function(){return t.fn[e]=n,A._jQueryInterface},A}(jQuery),i=function(t){var e="Layout",i=t.fn[e],n=".main-header",s=".main-sidebar",o=".main-sidebar .sidebar",a=".content-wrapper",r=".control-sidebar-content",l='[data-widget="control-sidebar"]',c=".main-footer",d='[data-widget="pushmenu"]',h=".login-box",f=".register-box",u="sidebar-focused",g="layout-fixed",p="control-sidebar-slide-open",_="control-sidebar-open",m={scrollbarTheme:"os-theme-light",scrollbarAutoHide:"l",panelAutoHeight:!0,loginRegisterAutoHeight:!0},v=function(){function e(t,e){this._config=e,this._element=t,this._init()}var i=e.prototype;return i.fixLayoutHeight=function(e){void 0===e&&(e=null);var i=0;(t("body").hasClass(p)||t("body").hasClass(_)||"control_sidebar"==e)&&(i=t(r).height());var s={window:t(window).height(),header:0!==t(n).length?t(n).outerHeight():0,footer:0!==t(c).length?t(c).outerHeight():0,sidebar:0!==t(o).length?t(o).height():0,control_sidebar:i},l=this._max(s),d=this._config.panelAutoHeight;!0===d&&(d=0),!1!==d&&(l==s.control_sidebar?t(a).css("min-height",l+d):l==s.window?t(a).css("min-height",l+d-s.header-s.footer):t(a).css("min-height",l+d-s.header),this._isFooterFixed()&&t(a).css("min-height",parseFloat(t(a).css("min-height"))+s.footer)),t("body").hasClass(g)&&(!1!==d&&t(a).css("min-height",l+d-s.header-s.footer),"undefined"!=typeof t.fn.overlayScrollbars&&t(o).overlayScrollbars({className:this._config.scrollbarTheme,sizeAutoCapable:!0,scrollbars:{autoHide:this._config.scrollbarAutoHide,clickScrolling:!0}}))},i.fixLoginRegisterHeight=function(){if(0===t(h+", "+f).length)t("body, html").css("height","auto");else if(0!==t(h+", "+f).length){var e=t(h+", "+f).height();t("body").css("min-height")!==e&&t("body").css("min-height",e)}},i._init=function(){var e=this;this.fixLayoutHeight(),!0===this._config.loginRegisterAutoHeight?this.fixLoginRegisterHeight():Number.isInteger(this._config.loginRegisterAutoHeight)&&setInterval(this.fixLoginRegisterHeight,this._config.loginRegisterAutoHeight),t(o).on("collapsed.lte.treeview expanded.lte.treeview",(function(){e.fixLayoutHeight()})),t(d).on("collapsed.lte.pushmenu shown.lte.pushmenu",(function(){e.fixLayoutHeight()})),t(l).on("collapsed.lte.controlsidebar",(function(){e.fixLayoutHeight()})).on("expanded.lte.controlsidebar",(function(){e.fixLayoutHeight("control_sidebar")})),t(window).resize((function(){e.fixLayoutHeight()})),setTimeout((function(){t("body.hold-transition").removeClass("hold-transition")}),50)},i._max=function(t){var e=0;return Object.keys(t).forEach((function(i){t[i]>e&&(e=t[i])})),e},i._isFooterFixed=function(){return"fixed"===t(".main-footer").css("position")},e._jQueryInterface=function(i){return void 0===i&&(i=""),this.each((function(){var n=t(this).data("lte.layout"),s=t.extend({},m,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.layout",n)),"init"===i||""===i?n._init():"fixLayoutHeight"!==i&&"fixLoginRegisterHeight"!==i||n[i]()}))},e}();return t(window).on("load",(function(){v._jQueryInterface.call(t("body"))})),t(o+" a").on("focusin",(function(){t(s).addClass(u)})),t(o+" a").on("focusout",(function(){t(s).removeClass(u)})),t.fn[e]=v._jQueryInterface,t.fn[e].Constructor=v,t.fn[e].noConflict=function(){return t.fn[e]=i,v._jQueryInterface},v}(jQuery),n=function(t){var e="PushMenu",i=".lte.pushmenu",n=t.fn[e],s={COLLAPSED:"collapsed"+i,SHOWN:"shown"+i},o={autoCollapseSize:992,enableRemember:!1,noTransitionAfterReload:!0},a='[data-widget="pushmenu"]',r="body",l="#sidebar-overlay",c=".wrapper",d="sidebar-collapse",h="sidebar-open",f="sidebar-closed",u=function(){function e(e,i){this._element=e,this._options=t.extend({},o,i),t(l).length||this._addOverlay(),this._init()}var n=e.prototype;return n.expand=function(){this._options.autoCollapseSize&&t(window).width()<=this._options.autoCollapseSize&&t(r).addClass(h),t(r).removeClass(d).removeClass(f),this._options.enableRemember&&localStorage.setItem("remember"+i,h);var e=t.Event(s.SHOWN);t(this._element).trigger(e)},n.collapse=function(){this._options.autoCollapseSize&&t(window).width()<=this._options.autoCollapseSize&&t(r).removeClass(h).addClass(f),t(r).addClass(d),this._options.enableRemember&&localStorage.setItem("remember"+i,d);var e=t.Event(s.COLLAPSED);t(this._element).trigger(e)},n.toggle=function(){t(r).hasClass(d)?this.expand():this.collapse()},n.autoCollapse=function(e){void 0===e&&(e=!1),this._options.autoCollapseSize&&(t(window).width()<=this._options.autoCollapseSize?t(r).hasClass(h)||this.collapse():1==e&&(t(r).hasClass(h)?t(r).removeClass(h):t(r).hasClass(f)&&this.expand()))},n.remember=function(){this._options.enableRemember&&(localStorage.getItem("remember"+i)==d?this._options.noTransitionAfterReload?t("body").addClass("hold-transition").addClass(d).delay(50).queue((function(){t(this).removeClass("hold-transition"),t(this).dequeue()})):t("body").addClass(d):this._options.noTransitionAfterReload?t("body").addClass("hold-transition").removeClass(d).delay(50).queue((function(){t(this).removeClass("hold-transition"),t(this).dequeue()})):t("body").removeClass(d))},n._init=function(){var e=this;this.remember(),this.autoCollapse(),t(window).resize((function(){e.autoCollapse(!0)}))},n._addOverlay=function(){var e=this,i=t("<div />",{id:"sidebar-overlay"});i.on("click",(function(){e.collapse()})),t(c).append(i)},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.pushmenu"),s=t.extend({},o,t(this).data());n||(n=new e(this,s),t(this).data("lte.pushmenu",n)),"string"==typeof i&&i.match(/collapse|expand|toggle/)&&n[i]()}))},e}();return t(document).on("click",a,(function(e){e.preventDefault();var i=e.currentTarget;"pushmenu"!==t(i).data("widget")&&(i=t(i).closest(a)),u._jQueryInterface.call(t(i),"toggle")})),t(window).on("load",(function(){u._jQueryInterface.call(t(a))})),t.fn[e]=u._jQueryInterface,t.fn[e].Constructor=u,t.fn[e].noConflict=function(){return t.fn[e]=n,u._jQueryInterface},u}(jQuery),s=function(t){var e="Treeview",i=t.fn[e],n={SELECTED:"selected.lte.treeview",EXPANDED:"expanded.lte.treeview",COLLAPSED:"collapsed.lte.treeview",LOAD_DATA_API:"load.lte.treeview"},s=".nav-item",o=".nav-treeview",a=".menu-open",r='[data-widget="treeview"]',l="menu-open",c="sidebar-collapse",d={trigger:r+" "+".nav-link",animationSpeed:300,accordion:!0,expandSidebar:!1,sidebarButtonSelector:'[data-widget="pushmenu"]'},h=function(){function e(t,e){this._config=e,this._element=t}var i=e.prototype;return i.init=function(){this._setupListeners()},i.expand=function(e,i){var s=this,r=t.Event(n.EXPANDED);if(this._config.accordion){var c=i.siblings(a).first(),d=c.find(o).first();this.collapse(d,c)}e.stop().slideDown(this._config.animationSpeed,(function(){i.addClass(l),t(s._element).trigger(r)})),this._config.expandSidebar&&this._expandSidebar()},i.collapse=function(e,i){var s=this,r=t.Event(n.COLLAPSED);e.stop().slideUp(this._config.animationSpeed,(function(){i.removeClass(l),t(s._element).trigger(r),e.find(a+" > "+o).slideUp(),e.find(a).removeClass(l)}))},i.toggle=function(e){var i=t(e.currentTarget),n=i.parent(),a=n.find("> "+o);if(a.is(o)||(n.is(s)||(a=n.parent().find("> "+o)),a.is(o))){e.preventDefault();var r=i.parents(s).first();r.hasClass(l)?this.collapse(t(a),r):this.expand(t(a),r)}},i._setupListeners=function(){var e=this;t(document).on("click",this._config.trigger,(function(t){e.toggle(t)}))},i._expandSidebar=function(){t("body").hasClass(c)&&t(this._config.sidebarButtonSelector).PushMenu("expand")},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.treeview"),s=t.extend({},d,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.treeview",n)),"init"===i&&n[i]()}))},e}();return t(window).on(n.LOAD_DATA_API,(function(){t(r).each((function(){h._jQueryInterface.call(t(this),"init")}))})),t.fn[e]=h._jQueryInterface,t.fn[e].Constructor=h,t.fn[e].noConflict=function(){return t.fn[e]=i,h._jQueryInterface},h}(jQuery),o=function(t){var e="DirectChat",i=t.fn[e],n="toggled{EVENT_KEY}",s='[data-widget="chat-pane-toggle"]',o=".direct-chat",a="direct-chat-contacts-open",r=function(){function e(t,e){this._element=t}return e.prototype.toggle=function(){t(this._element).parents(o).first().toggleClass(a);var e=t.Event(n);t(this._element).trigger(e)},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.directchat");n||(n=new e(t(this)),t(this).data("lte.directchat",n)),n[i]()}))},e}();return t(document).on("click",s,(function(e){e&&e.preventDefault(),r._jQueryInterface.call(t(this),"toggle")})),t.fn[e]=r._jQueryInterface,t.fn[e].Constructor=r,t.fn[e].noConflict=function(){return t.fn[e]=i,r._jQueryInterface},r}(jQuery),a=function(t){var e="TodoList",i=t.fn[e],n='[data-widget="todo-list"]',s="done",o={onCheck:function(t){return t},onUnCheck:function(t){return t}},a=function(){function e(t,e){this._config=e,this._element=t,this._init()}var i=e.prototype;return i.toggle=function(e){e.parents("li").toggleClass(s),t(e).prop("checked")?this.check(e):this.unCheck(t(e))},i.check=function(t){this._config.onCheck.call(t)},i.unCheck=function(t){this._config.onUnCheck.call(t)},i._init=function(){var e=this;t(n).find("input:checkbox:checked").parents("li").toggleClass(s),t(n).on("change","input:checkbox",(function(i){e.toggle(t(i.target))}))},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.todolist"),s=t.extend({},o,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.todolist",n)),"init"===i&&n[i]()}))},e}();return t(window).on("load",(function(){a._jQueryInterface.call(t(n))})),t.fn[e]=a._jQueryInterface,t.fn[e].Constructor=a,t.fn[e].noConflict=function(){return t.fn[e]=i,a._jQueryInterface},a}(jQuery),r=function(t){var e="CardWidget",i=".lte.cardwidget",n=t.fn[e],s={EXPANDED:"expanded"+i,COLLAPSED:"collapsed"+i,MAXIMIZED:"maximized"+i,MINIMIZED:"minimized"+i,REMOVED:"removed"+i},o="card",a="collapsed-card",r="collapsing-card",l="expanding-card",c="was-collapsed",d="maximized-card",h={DATA_REMOVE:'[data-card-widget="remove"]',DATA_COLLAPSE:'[data-card-widget="collapse"]',DATA_MAXIMIZE:'[data-card-widget="maximize"]',CARD:"."+o,CARD_HEADER:".card-header",CARD_BODY:".card-body",CARD_FOOTER:".card-footer",COLLAPSED:"."+a},f={animationSpeed:"normal",collapseTrigger:h.DATA_COLLAPSE,removeTrigger:h.DATA_REMOVE,maximizeTrigger:h.DATA_MAXIMIZE,collapseIcon:"fa-minus",expandIcon:"fa-plus",maximizeIcon:"fa-expand",minimizeIcon:"fa-compress"},u=function(){function e(e,i){this._element=e,this._parent=e.parents(h.CARD).first(),e.hasClass(o)&&(this._parent=e),this._settings=t.extend({},f,i)}var i=e.prototype;return i.collapse=function(){var e=this;this._parent.addClass(r).children(h.CARD_BODY+", "+h.CARD_FOOTER).slideUp(this._settings.animationSpeed,(function(){e._parent.addClass(a).removeClass(r)})),this._parent.find("> "+h.CARD_HEADER+" "+this._settings.collapseTrigger+" ."+this._settings.collapseIcon).addClass(this._settings.expandIcon).removeClass(this._settings.collapseIcon);var i=t.Event(s.COLLAPSED);this._element.trigger(i,this._parent)},i.expand=function(){var e=this;this._parent.addClass(l).children(h.CARD_BODY+", "+h.CARD_FOOTER).slideDown(this._settings.animationSpeed,(function(){e._parent.removeClass(a).removeClass(l)})),this._parent.find("> "+h.CARD_HEADER+" "+this._settings.collapseTrigger+" ."+this._settings.expandIcon).addClass(this._settings.collapseIcon).removeClass(this._settings.expandIcon);var i=t.Event(s.EXPANDED);this._element.trigger(i,this._parent)},i.remove=function(){this._parent.slideUp();var e=t.Event(s.REMOVED);this._element.trigger(e,this._parent)},i.toggle=function(){this._parent.hasClass(a)?this.expand():this.collapse()},i.maximize=function(){this._parent.find(this._settings.maximizeTrigger+" ."+this._settings.maximizeIcon).addClass(this._settings.minimizeIcon).removeClass(this._settings.maximizeIcon),this._parent.css({height:this._parent.height(),width:this._parent.width(),transition:"all .15s"}).delay(150).queue((function(){t(this).addClass(d),t("html").addClass(d),t(this).hasClass(a)&&t(this).addClass(c),t(this).dequeue()}));var e=t.Event(s.MAXIMIZED);this._element.trigger(e,this._parent)},i.minimize=function(){this._parent.find(this._settings.maximizeTrigger+" ."+this._settings.minimizeIcon).addClass(this._settings.maximizeIcon).removeClass(this._settings.minimizeIcon),this._parent.css("cssText","height:"+this._parent[0].style.height+" !important;width:"+this._parent[0].style.width+" !important; transition: all .15s;").delay(10).queue((function(){t(this).removeClass(d),t("html").removeClass(d),t(this).css({height:"inherit",width:"inherit"}),t(this).hasClass(c)&&t(this).removeClass(c),t(this).dequeue()}));var e=t.Event(s.MINIMIZED);this._element.trigger(e,this._parent)},i.toggleMaximize=function(){this._parent.hasClass(d)?this.minimize():this.maximize()},i._init=function(e){var i=this;this._parent=e,t(this).find(this._settings.collapseTrigger).click((function(){i.toggle()})),t(this).find(this._settings.maximizeTrigger).click((function(){i.toggleMaximize()})),t(this).find(this._settings.removeTrigger).click((function(){i.remove()}))},e._jQueryInterface=function(i){var n=t(this).data("lte.cardwidget"),s=t.extend({},f,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.cardwidget","string"==typeof i?n:i)),"string"==typeof i&&i.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)?n[i]():"object"==typeof i&&n._init(t(this))},e}();return t(document).on("click",h.DATA_COLLAPSE,(function(e){e&&e.preventDefault(),u._jQueryInterface.call(t(this),"toggle")})),t(document).on("click",h.DATA_REMOVE,(function(e){e&&e.preventDefault(),u._jQueryInterface.call(t(this),"remove")})),t(document).on("click",h.DATA_MAXIMIZE,(function(e){e&&e.preventDefault(),u._jQueryInterface.call(t(this),"toggleMaximize")})),t.fn[e]=u._jQueryInterface,t.fn[e].Constructor=u,t.fn[e].noConflict=function(){return t.fn[e]=n,u._jQueryInterface},u}(jQuery),l=function(t){var e="CardRefresh",i=t.fn[e],n={LOADED:"loaded.lte.cardrefresh",OVERLAY_ADDED:"overlay.added.lte.cardrefresh",OVERLAY_REMOVED:"overlay.removed.lte.cardrefresh"},s="card",o={CARD:"."+s,DATA_REFRESH:'[data-card-widget="card-refresh"]'},a={source:"",sourceSelector:"",params:{},trigger:o.DATA_REFRESH,content:".card-body",loadInContent:!0,loadOnInit:!0,responseType:"",overlayTemplate:'<div class="overlay"><i class="fas fa-2x fa-sync-alt fa-spin"></i></div>',onLoadStart:function(){},onLoadDone:function(t){return t}},r=function(){function e(e,i){if(this._element=e,this._parent=e.parents(o.CARD).first(),this._settings=t.extend({},a,i),this._overlay=t(this._settings.overlayTemplate),e.hasClass(s)&&(this._parent=e),""===this._settings.source)throw new Error("Source url was not defined. Please specify a url in your CardRefresh source option.")}var i=e.prototype;return i.load=function(){this._addOverlay(),this._settings.onLoadStart.call(t(this)),t.get(this._settings.source,this._settings.params,function(e){this._settings.loadInContent&&(""!=this._settings.sourceSelector&&(e=t(e).find(this._settings.sourceSelector).html()),this._parent.find(this._settings.content).html(e)),this._settings.onLoadDone.call(t(this),e),this._removeOverlay()}.bind(this),""!==this._settings.responseType&&this._settings.responseType);var e=t.Event(n.LOADED);t(this._element).trigger(e)},i._addOverlay=function(){this._parent.append(this._overlay);var e=t.Event(n.OVERLAY_ADDED);t(this._element).trigger(e)},i._removeOverlay=function(){this._parent.find(this._overlay).remove();var e=t.Event(n.OVERLAY_REMOVED);t(this._element).trigger(e)},i._init=function(e){var i=this;t(this).find(this._settings.trigger).on("click",(function(){i.load()})),this._settings.loadOnInit&&this.load()},e._jQueryInterface=function(i){var n=t(this).data("lte.cardrefresh"),s=t.extend({},a,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.cardrefresh","string"==typeof i?n:i)),"string"==typeof i&&i.match(/load/)?n[i]():n._init(t(this))},e}();return t(document).on("click",o.DATA_REFRESH,(function(e){e&&e.preventDefault(),r._jQueryInterface.call(t(this),"load")})),t(document).ready((function(){t(o.DATA_REFRESH).each((function(){r._jQueryInterface.call(t(this))}))})),t.fn[e]=r._jQueryInterface,t.fn[e].Constructor=r,t.fn[e].noConflict=function(){return t.fn[e]=i,r._jQueryInterface},r}(jQuery),c=function(t){var e="Dropdown",i=t.fn[e],n=".navbar",s=".dropdown-menu",o=".dropdown-menu.show",a='[data-toggle="dropdown"]',r="dropdown-menu-right",l={},c=function(){function e(t,e){this._config=e,this._element=t}var i=e.prototype;return i.toggleSubmenu=function(){this._element.siblings().show().toggleClass("show"),this._element.next().hasClass("show")||this._element.parents(".dropdown-menu").first().find(".show").removeClass("show").hide(),this._element.parents("li.nav-item.dropdown.show").on("hidden.bs.dropdown",(function(e){t(".dropdown-submenu .show").removeClass("show").hide()}))},i.fixPosition=function(){var e=t(o);if(0!==e.length){e.hasClass(r)?(e.css("left","inherit"),e.css("right",0)):(e.css("left",0),e.css("right","inherit"));var i=e.offset(),n=e.width(),s=t(window).width()-i.left;i.left<0?(e.css("left","inherit"),e.css("right",i.left-5)):s<n&&(e.css("left","inherit"),e.css("right",0))}},e._jQueryInterface=function(i){return this.each((function(){var n=t(this).data("lte.dropdown"),s=t.extend({},l,t(this).data());n||(n=new e(t(this),s),t(this).data("lte.dropdown",n)),"toggleSubmenu"!==i&&"fixPosition"!=i||n[i]()}))},e}();return t(s+" "+a).on("click",(function(e){e.preventDefault(),e.stopPropagation(),c._jQueryInterface.call(t(this),"toggleSubmenu")})),t(n+" "+a).on("click",(function(e){e.preventDefault(),setTimeout((function(){c._jQueryInterface.call(t(this),"fixPosition")}),1)})),t.fn[e]=c._jQueryInterface,t.fn[e].Constructor=c,t.fn[e].noConflict=function(){return t.fn[e]=i,c._jQueryInterface},c}(jQuery),d=function(t){var e="Toasts",i=t.fn[e],n={INIT:"init.lte.toasts",CREATED:"created.lte.toasts",REMOVED:"removed.lte.toasts"},s="#toastsContainerTopRight",o="#toastsContainerTopLeft",a="#toastsContainerBottomRight",r="#toastsContainerBottomLeft",l="toasts-top-right",c="toasts-top-left",d="toasts-bottom-right",h="toasts-bottom-left",f="topRight",u="topLeft",g="bottomRight",p="bottomLeft",_={position:f,fixed:!0,autohide:!1,autoremove:!0,delay:1e3,fade:!0,icon:null,image:null,imageAlt:null,imageHeight:"25px",title:null,subtitle:null,close:!0,body:null,class:null},m=function(){function e(e,i){this._config=i,this._prepareContainer();var s=t.Event(n.INIT);t("body").trigger(s)}var i=e.prototype;return i.create=function(){var e=t('<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"/>');e.data("autohide",this._config.autohide),e.data("animation",this._config.fade),this._config.class&&e.addClass(this._config.class),this._config.delay&&500!=this._config.delay&&e.data("delay",this._config.delay);var i=t('<div class="toast-header">');if(null!=this._config.image){var s=t("<img />").addClass("rounded mr-2").attr("src",this._config.image).attr("alt",this._config.imageAlt);null!=this._config.imageHeight&&s.height(this._config.imageHeight).width("auto"),i.append(s)}if(null!=this._config.icon&&i.append(t("<i />").addClass("mr-2").addClass(this._config.icon)),null!=this._config.title&&i.append(t("<strong />").addClass("mr-auto").html(this._config.title)),null!=this._config.subtitle&&i.append(t("<small />").html(this._config.subtitle)),1==this._config.close){var o=t('<button data-dismiss="toast" />').attr("type","button").addClass("ml-2 mb-1 close").attr("aria-label","Close").append('<span aria-hidden="true">&times;</span>');null==this._config.title&&o.toggleClass("ml-2 ml-auto"),i.append(o)}e.append(i),null!=this._config.body&&e.append(t('<div class="toast-body" />').html(this._config.body)),t(this._getContainerId()).prepend(e);var a=t.Event(n.CREATED);t("body").trigger(a),e.toast("show"),this._config.autoremove&&e.on("hidden.bs.toast",(function(){t(this).delay(200).remove();var e=t.Event(n.REMOVED);t("body").trigger(e)}))},i._getContainerId=function(){return this._config.position==f?s:this._config.position==u?o:this._config.position==g?a:this._config.position==p?r:void 0},i._prepareContainer=function(){if(0===t(this._getContainerId()).length){var e=t("<div />").attr("id",this._getContainerId().replace("#",""));this._config.position==f?e.addClass(l):this._config.position==u?e.addClass(c):this._config.position==g?e.addClass(d):this._config.position==p&&e.addClass(h),t("body").append(e)}this._config.fixed?t(this._getContainerId()).addClass("fixed"):t(this._getContainerId()).removeClass("fixed")},e._jQueryInterface=function(i,n){return this.each((function(){var s=t.extend({},_,n),o=new e(t(this),s);"create"===i&&o[i]()}))},e}();return t.fn[e]=m._jQueryInterface,t.fn[e].Constructor=m,t.fn[e].noConflict=function(){return t.fn[e]=i,m._jQueryInterface},m}(jQuery);t.CardRefresh=l,t.CardWidget=r,t.ControlSidebar=e,t.DirectChat=o,t.Dropdown=c,t.Layout=i,t.PushMenu=n,t.Toasts=d,t.TodoList=a,t.Treeview=s,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=adminlte.min.js.map
{"version":3,"sources":["../../build/js/ControlSidebar.js","../../build/js/Layout.js","../../build/js/PushMenu.js","../../build/js/Treeview.js","../../build/js/DirectChat.js","../../build/js/TodoList.js","../../build/js/CardWidget.js","../../build/js/CardRefresh.js","../../build/js/Dropdown.js","../../build/js/Toasts.js"],"names":["ControlSidebar","$","NAME","DATA_KEY","JQUERY_NO_CONFLICT","fn","Event","COLLAPSED","EXPANDED","Selector","ClassName","Default","controlsidebarSlide","scrollbarTheme","scrollbarAutoHide","element","config","this","_element","_config","_init","_proto","prototype","collapse","addClass","removeClass","delay","queue","hide","dequeue","collapsedEvent","trigger","show","expandedEvent","toggle","hasClass","_this","_fixHeight","_fixScrollHeight","window","resize","scroll","heights","document","height","header","outerHeight","footer","positions","Math","abs","scrollTop","navbarFixed","footerFixed","css","sidebarHeight","overlayScrollbars","className","sizeAutoCapable","scrollbars","autoHide","clickScrolling","_jQueryInterface","operation","each","data","_options","extend","Error","on","event","preventDefault","call","Constructor","noConflict","jQuery","Layout","panelAutoHeight","loginRegisterAutoHeight","fixLayoutHeight","extra","control_sidebar","length","sidebar","max","_max","offset","_isFooterFixed","parseFloat","fixLoginRegisterHeight","box_height","Number","isInteger","setInterval","setTimeout","numbers","Object","keys","forEach","key","PushMenu","EVENT_KEY","SHOWN","autoCollapseSize","enableRemember","noTransitionAfterReload","options","_addOverlay","expand","width","localStorage","setItem","shownEvent","autoCollapse","remember","getItem","_this2","overlay","id","append","match","button","currentTarget","closest","Treeview","SELECTED","LOAD_DATA_API","animationSpeed","accordion","expandSidebar","sidebarButtonSelector","init","_setupListeners","treeviewMenu","parentLi","openMenuLi","siblings","first","openTreeview","find","stop","slideDown","_expandSidebar","slideUp","$relativeTarget","$parent","parent","is","parents","_this3","DirectChat","toggleClass","toggledEvent","TodoList","onCheck","item","onUnCheck","prop","check","unCheck","that","target","CardWidget","MAXIMIZED","MINIMIZED","REMOVED","DATA_REMOVE","DATA_COLLAPSE","DATA_MAXIMIZE","CARD","CARD_HEADER","CARD_BODY","CARD_FOOTER","collapseTrigger","removeTrigger","maximizeTrigger","collapseIcon","expandIcon","maximizeIcon","minimizeIcon","settings","_parent","_settings","children","collapsed","expanded","remove","removed","maximize","transition","maximized","minimize","style","toggleMaximize","card","click","CardRefresh","LOADED","OVERLAY_ADDED","OVERLAY_REMOVED","DATA_REFRESH","source","sourceSelector","params","content","loadInContent","loadOnInit","responseType","overlayTemplate","onLoadStart","onLoadDone","response","_overlay","load","get","html","_removeOverlay","bind","loadedEvent","overlayAddedEvent","overlayRemovedEvent","ready","Dropdown","toggleSubmenu","next","e","fixPosition","elm","visiblePart","left","stopPropagation","Toasts","INIT","CREATED","Position","position","fixed","autohide","autoremove","fade","icon","image","imageAlt","imageHeight","title","subtitle","close","body","class","_prepareContainer","initEvent","create","toast","toast_header","toast_image","attr","toast_close","_getContainerId","prepend","createdEvent","removedEvent","container","replace","option"],"mappings":"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","sourcesContent":["/**\n * --------------------------------------------\n * AdminLTE ControlSidebar.js\n * License MIT\n * --------------------------------------------\n */\n\nconst ControlSidebar = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'ControlSidebar'\n  const DATA_KEY           = 'lte.controlsidebar'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n  const DATA_API_KEY       = '.data-api'\n\n  const Event = {\n    COLLAPSED: `collapsed${EVENT_KEY}`,\n    EXPANDED: `expanded${EVENT_KEY}`,\n  }\n\n  const Selector = {\n    CONTROL_SIDEBAR: '.control-sidebar',\n    CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',\n    DATA_TOGGLE: '[data-widget=\"control-sidebar\"]',\n    CONTENT: '.content-wrapper',\n    HEADER: '.main-header',\n    FOOTER: '.main-footer',\n  }\n\n  const ClassName = {\n    CONTROL_SIDEBAR_ANIMATE: 'control-sidebar-animate',\n    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',\n    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open',\n    LAYOUT_FIXED: 'layout-fixed',\n    NAVBAR_FIXED: 'layout-navbar-fixed',\n    NAVBAR_SM_FIXED: 'layout-sm-navbar-fixed',\n    NAVBAR_MD_FIXED: 'layout-md-navbar-fixed',\n    NAVBAR_LG_FIXED: 'layout-lg-navbar-fixed',\n    NAVBAR_XL_FIXED: 'layout-xl-navbar-fixed',\n    FOOTER_FIXED: 'layout-footer-fixed',\n    FOOTER_SM_FIXED: 'layout-sm-footer-fixed',\n    FOOTER_MD_FIXED: 'layout-md-footer-fixed',\n    FOOTER_LG_FIXED: 'layout-lg-footer-fixed',\n    FOOTER_XL_FIXED: 'layout-xl-footer-fixed',\n  }\n\n  const Default = {\n    controlsidebarSlide: true,\n    scrollbarTheme : 'os-theme-light',\n    scrollbarAutoHide: 'l',\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class ControlSidebar {\n    constructor(element, config) {\n      this._element = element\n      this._config  = config\n\n      this._init()\n    }\n\n    // Public\n\n    collapse() {\n      // Show the control sidebar\n      if (this._config.controlsidebarSlide) {\n        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){\n          $(Selector.CONTROL_SIDEBAR).hide()\n          $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n          $(this).dequeue()\n        })\n      } else {\n        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN)\n      }\n\n      const collapsedEvent = $.Event(Event.COLLAPSED)\n      $(this._element).trigger(collapsedEvent)\n    }\n\n    show() {\n      // Collapse the control sidebar\n      if (this._config.controlsidebarSlide) {\n        $('html').addClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n        $(Selector.CONTROL_SIDEBAR).show().delay(10).queue(function(){\n          $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE).delay(300).queue(function(){\n            $('html').removeClass(ClassName.CONTROL_SIDEBAR_ANIMATE)\n            $(this).dequeue()\n          })\n          $(this).dequeue()\n        })\n      } else {\n        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN)\n      }\n\n      const expandedEvent = $.Event(Event.EXPANDED)\n      $(this._element).trigger(expandedEvent)\n    }\n\n    toggle() {\n      const shouldClose = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body')\n        .hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)\n      if (shouldClose) {\n        // Close the control sidebar\n        this.collapse()\n      } else {\n        // Open the control sidebar\n        this.show()\n      }\n    }\n\n    // Private\n\n    _init() {\n      this._fixHeight()\n      this._fixScrollHeight()\n\n      $(window).resize(() => {\n        this._fixHeight()\n        this._fixScrollHeight()\n      })\n\n      $(window).scroll(() => {\n        if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE)) {\n            this._fixScrollHeight()\n        }\n      })\n    }\n\n    _fixScrollHeight() {\n      const heights = {\n        scroll: $(document).height(),\n        window: $(window).height(),\n        header: $(Selector.HEADER).outerHeight(),\n        footer: $(Selector.FOOTER).outerHeight(),\n      }\n      const positions = {\n        bottom: Math.abs((heights.window + $(window).scrollTop()) - heights.scroll),\n        top: $(window).scrollTop(),\n      }\n\n      let navbarFixed = false;\n      let footerFixed = false;\n\n      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {\n        if (\n          $('body').hasClass(ClassName.NAVBAR_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_SM_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_MD_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_LG_FIXED)\n          || $('body').hasClass(ClassName.NAVBAR_XL_FIXED)\n        ) {\n          if ($(Selector.HEADER).css(\"position\") === \"fixed\") {\n            navbarFixed = true;\n          }\n        }\n        if (\n          $('body').hasClass(ClassName.FOOTER_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_SM_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_MD_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_LG_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_XL_FIXED)\n        ) {\n          if ($(Selector.FOOTER).css(\"position\") === \"fixed\") {\n            footerFixed = true;\n          }\n        }\n\n        if (positions.top === 0 && positions.bottom === 0) {\n          $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);\n          $(Selector.CONTROL_SIDEBAR).css('top', heights.header);\n          $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header + heights.footer))\n        } else if (positions.bottom <= heights.footer) {\n          if (footerFixed === false) {  \n            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer - positions.bottom);\n            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.footer - positions.bottom))\n          } else {\n            $(Selector.CONTROL_SIDEBAR).css('bottom', heights.footer);\n          }\n        } else if (positions.top <= heights.header) {\n          if (navbarFixed === false) {\n            $(Selector.CONTROL_SIDEBAR).css('top', heights.header - positions.top);\n            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window - (heights.header - positions.top))\n          } else {\n            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);\n          }\n        } else {\n          if (navbarFixed === false) {\n            $(Selector.CONTROL_SIDEBAR).css('top', 0);\n            $(Selector.CONTROL_SIDEBAR + ', ' + Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', heights.window)\n          } else {\n            $(Selector.CONTROL_SIDEBAR).css('top', heights.header);\n          }\n        }\n      }\n    }\n\n    _fixHeight() {\n      const heights = {\n        window: $(window).height(),\n        header: $(Selector.HEADER).outerHeight(),\n        footer: $(Selector.FOOTER).outerHeight(),\n      }\n\n      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {\n        let sidebarHeight = heights.window - heights.header;\n\n        if (\n          $('body').hasClass(ClassName.FOOTER_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_SM_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_MD_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_LG_FIXED)\n          || $('body').hasClass(ClassName.FOOTER_XL_FIXED)\n        ) {\n          if ($(Selector.FOOTER).css(\"position\") === \"fixed\") {\n            sidebarHeight = heights.window - heights.header - heights.footer;\n          }\n        }\n\n        $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).css('height', sidebarHeight)\n        \n        if (typeof $.fn.overlayScrollbars !== 'undefined') {\n          $(Selector.CONTROL_SIDEBAR + ' ' + Selector.CONTROL_SIDEBAR_CONTENT).overlayScrollbars({\n            className       : this._config.scrollbarTheme,\n            sizeAutoCapable : true,\n            scrollbars : {\n              autoHide: this._config.scrollbarAutoHide, \n              clickScrolling : true\n            }\n          })\n        }\n      }\n    }\n\n\n    // Static\n\n    static _jQueryInterface(operation) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new ControlSidebar(this, _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (data[operation] === 'undefined') {\n          throw new Error(`${operation} is not a function`)\n        }\n\n        data[operation]()\n      })\n    }\n  }\n\n  /**\n   *\n   * Data Api implementation\n   * ====================================================\n   */\n  $(document).on('click', Selector.DATA_TOGGLE, function (event) {\n    event.preventDefault()\n\n    ControlSidebar._jQueryInterface.call($(this), 'toggle')\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = ControlSidebar._jQueryInterface\n  $.fn[NAME].Constructor = ControlSidebar\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return ControlSidebar._jQueryInterface\n  }\n\n  return ControlSidebar\n})(jQuery)\n\nexport default ControlSidebar\n  \n","/**\r\n * --------------------------------------------\r\n * AdminLTE Layout.js\r\n * License MIT\r\n * --------------------------------------------\r\n */\r\n\r\nconst Layout = (($) => {\r\n  /**\r\n   * Constants\r\n   * ====================================================\r\n   */\r\n\r\n  const NAME               = 'Layout'\r\n  const DATA_KEY           = 'lte.layout'\r\n  const EVENT_KEY          = `.${DATA_KEY}`\r\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\r\n\r\n  const Event = {\r\n    SIDEBAR: 'sidebar'\r\n  }\r\n\r\n  const Selector = {\r\n    HEADER         : '.main-header',\r\n    MAIN_SIDEBAR   : '.main-sidebar',\r\n    SIDEBAR        : '.main-sidebar .sidebar',\r\n    CONTENT        : '.content-wrapper',\r\n    BRAND          : '.brand-link',\r\n    CONTENT_HEADER : '.content-header',\r\n    WRAPPER        : '.wrapper',\r\n    CONTROL_SIDEBAR: '.control-sidebar',\r\n    CONTROL_SIDEBAR_CONTENT: '.control-sidebar-content',\r\n    CONTROL_SIDEBAR_BTN: '[data-widget=\"control-sidebar\"]',\r\n    LAYOUT_FIXED   : '.layout-fixed',\r\n    FOOTER         : '.main-footer',\r\n    PUSHMENU_BTN   : '[data-widget=\"pushmenu\"]',\r\n    LOGIN_BOX      : '.login-box',\r\n    REGISTER_BOX   : '.register-box'\r\n  }\r\n\r\n  const ClassName = {\r\n    HOLD           : 'hold-transition',\r\n    SIDEBAR        : 'main-sidebar',\r\n    CONTENT_FIXED  : 'content-fixed',\r\n    SIDEBAR_FOCUSED: 'sidebar-focused',\r\n    LAYOUT_FIXED   : 'layout-fixed',\r\n    NAVBAR_FIXED   : 'layout-navbar-fixed',\r\n    FOOTER_FIXED   : 'layout-footer-fixed',\r\n    LOGIN_PAGE     : 'login-page',\r\n    REGISTER_PAGE  : 'register-page',\r\n    CONTROL_SIDEBAR_SLIDE_OPEN: 'control-sidebar-slide-open',\r\n    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',\r\n  }\r\n\r\n  const Default = {\r\n    scrollbarTheme : 'os-theme-light',\r\n    scrollbarAutoHide: 'l',\r\n    panelAutoHeight: true,\r\n    loginRegisterAutoHeight: true,\r\n  }\r\n\r\n  /**\r\n   * Class Definition\r\n   * ====================================================\r\n   */\r\n\r\n  class Layout {\r\n    constructor(element, config) {\r\n      this._config  = config\r\n      this._element = element\r\n\r\n      this._init()\r\n    }\r\n\r\n    // Public\r\n\r\n    fixLayoutHeight(extra = null) {\r\n      let control_sidebar = 0\r\n\r\n      if ($('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || extra == 'control_sidebar') {\r\n        control_sidebar = $(Selector.CONTROL_SIDEBAR_CONTENT).height()\r\n      }\r\n\r\n      const heights = {\r\n        window: $(window).height(),\r\n        header: $(Selector.HEADER).length !== 0 ? $(Selector.HEADER).outerHeight() : 0,\r\n        footer: $(Selector.FOOTER).length !== 0 ? $(Selector.FOOTER).outerHeight() : 0,\r\n        sidebar: $(Selector.SIDEBAR).length !== 0 ? $(Selector.SIDEBAR).height() : 0,\r\n        control_sidebar: control_sidebar,\r\n      }\r\n\r\n      const max = this._max(heights)\r\n      let offset = this._config.panelAutoHeight\r\n\r\n      if (offset === true) {\r\n        offset = 0;\r\n      }\r\n\r\n      if (offset !== false) {\r\n        if (max == heights.control_sidebar) {\r\n          $(Selector.CONTENT).css('min-height', (max + offset))\r\n        } else if (max == heights.window) {\r\n          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer)\r\n        } else {\r\n          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header)\r\n        }\r\n        if (this._isFooterFixed()) {\r\n          $(Selector.CONTENT).css('min-height', parseFloat($(Selector.CONTENT).css('min-height')) + heights.footer);\r\n        }\r\n      }\r\n\r\n      if ($('body').hasClass(ClassName.LAYOUT_FIXED)) {\r\n        if (offset !== false) {\r\n          $(Selector.CONTENT).css('min-height', (max + offset) - heights.header - heights.footer)\r\n        }\r\n\r\n        if (typeof $.fn.overlayScrollbars !== 'undefined') {\r\n          $(Selector.SIDEBAR).overlayScrollbars({\r\n            className       : this._config.scrollbarTheme,\r\n            sizeAutoCapable : true,\r\n            scrollbars : {\r\n              autoHide: this._config.scrollbarAutoHide, \r\n              clickScrolling : true\r\n            }\r\n          })\r\n        }\r\n      }\r\n    }\r\n\r\n    fixLoginRegisterHeight() {\r\n      if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length === 0) {\r\n        $('body, html').css('height', 'auto')\r\n      } else if ($(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).length !== 0) {\r\n        let box_height = $(Selector.LOGIN_BOX + ', ' + Selector.REGISTER_BOX).height()\r\n\r\n        if ($('body').css('min-height') !== box_height) {\r\n          $('body').css('min-height', box_height)\r\n        }\r\n      }\r\n    }\r\n\r\n    // Private\r\n\r\n    _init() {\r\n      // Activate layout height watcher\r\n      this.fixLayoutHeight()\r\n\r\n      if (this._config.loginRegisterAutoHeight === true) {\r\n        this.fixLoginRegisterHeight()\r\n      } else if (Number.isInteger(this._config.loginRegisterAutoHeight)) {\r\n        setInterval(this.fixLoginRegisterHeight, this._config.loginRegisterAutoHeight);\r\n      }\r\n\r\n      $(Selector.SIDEBAR)\r\n        .on('collapsed.lte.treeview expanded.lte.treeview', () => {\r\n          this.fixLayoutHeight()\r\n        })\r\n\r\n      $(Selector.PUSHMENU_BTN)\r\n        .on('collapsed.lte.pushmenu shown.lte.pushmenu', () => {\r\n          this.fixLayoutHeight()\r\n        })\r\n\r\n      $(Selector.CONTROL_SIDEBAR_BTN)\r\n        .on('collapsed.lte.controlsidebar', () => {\r\n          this.fixLayoutHeight()\r\n        })\r\n        .on('expanded.lte.controlsidebar', () => {\r\n          this.fixLayoutHeight('control_sidebar')\r\n        })\r\n\r\n      $(window).resize(() => {\r\n        this.fixLayoutHeight()\r\n      })\r\n\r\n      setTimeout(() => {\r\n        $('body.hold-transition').removeClass('hold-transition')\r\n\r\n      }, 50);\r\n    }\r\n\r\n    _max(numbers) {\r\n      // Calculate the maximum number in a list\r\n      let max = 0\r\n\r\n      Object.keys(numbers).forEach((key) => {\r\n        if (numbers[key] > max) {\r\n          max = numbers[key]\r\n        }\r\n      })\r\n\r\n      return max\r\n    }\r\n\r\n    _isFooterFixed() {\r\n      return $('.main-footer').css('position') === 'fixed';\r\n    }\r\n\r\n    // Static\r\n\r\n    static _jQueryInterface(config = '') {\r\n      return this.each(function () {\r\n        let data = $(this).data(DATA_KEY)\r\n        const _options = $.extend({}, Default, $(this).data())\r\n\r\n        if (!data) {\r\n          data = new Layout($(this), _options)\r\n          $(this).data(DATA_KEY, data)\r\n        }\r\n\r\n        if (config === 'init' || config === '') {\r\n          data['_init']()\r\n        } else if (config === 'fixLayoutHeight' || config === 'fixLoginRegisterHeight') {\r\n          data[config]()\r\n        }\r\n      })\r\n    }\r\n  }\r\n\r\n  /**\r\n   * Data API\r\n   * ====================================================\r\n   */\r\n\r\n  $(window).on('load', () => {\r\n    Layout._jQueryInterface.call($('body'))\r\n  })\r\n\r\n  $(Selector.SIDEBAR + ' a').on('focusin', () => {\r\n    $(Selector.MAIN_SIDEBAR).addClass(ClassName.SIDEBAR_FOCUSED);\r\n  })\r\n\r\n  $(Selector.SIDEBAR + ' a').on('focusout', () => {\r\n    $(Selector.MAIN_SIDEBAR).removeClass(ClassName.SIDEBAR_FOCUSED);\r\n  })\r\n\r\n  /**\r\n   * jQuery API\r\n   * ====================================================\r\n   */\r\n\r\n  $.fn[NAME] = Layout._jQueryInterface\r\n  $.fn[NAME].Constructor = Layout\r\n  $.fn[NAME].noConflict = function () {\r\n    $.fn[NAME] = JQUERY_NO_CONFLICT\r\n    return Layout._jQueryInterface\r\n  }\r\n\r\n  return Layout\r\n})(jQuery)\r\n\r\nexport default Layout\r\n","/**\n * --------------------------------------------\n * AdminLTE PushMenu.js\n * License MIT\n * --------------------------------------------\n */\n\nconst PushMenu = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'PushMenu'\n  const DATA_KEY           = 'lte.pushmenu'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    COLLAPSED: `collapsed${EVENT_KEY}`,\n    SHOWN: `shown${EVENT_KEY}`\n  }\n\n  const Default = {\n    autoCollapseSize: 992,\n    enableRemember: false,\n    noTransitionAfterReload: true\n  }\n\n  const Selector = {\n    TOGGLE_BUTTON: '[data-widget=\"pushmenu\"]',\n    SIDEBAR_MINI: '.sidebar-mini',\n    SIDEBAR_COLLAPSED: '.sidebar-collapse',\n    BODY: 'body',\n    OVERLAY: '#sidebar-overlay',\n    WRAPPER: '.wrapper'\n  }\n\n  const ClassName = {\n    COLLAPSED: 'sidebar-collapse',\n    OPEN: 'sidebar-open',\n    CLOSED: 'sidebar-closed'\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class PushMenu {\n    constructor(element, options) {\n      this._element = element\n      this._options = $.extend({}, Default, options)\n\n      if (!$(Selector.OVERLAY).length) {\n        this._addOverlay()\n      }\n\n      this._init()\n    }\n\n    // Public\n\n    expand() {\n      if (this._options.autoCollapseSize) {\n        if ($(window).width() <= this._options.autoCollapseSize) {\n          $(Selector.BODY).addClass(ClassName.OPEN)\n        }\n      }\n\n      $(Selector.BODY).removeClass(ClassName.COLLAPSED).removeClass(ClassName.CLOSED)\n\n      if(this._options.enableRemember) {\n        localStorage.setItem(`remember${EVENT_KEY}`, ClassName.OPEN)\n      }\n\n      const shownEvent = $.Event(Event.SHOWN)\n      $(this._element).trigger(shownEvent)\n    }\n\n    collapse() {\n      if (this._options.autoCollapseSize) {\n        if ($(window).width() <= this._options.autoCollapseSize) {\n          $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.CLOSED)\n        }\n      }\n\n      $(Selector.BODY).addClass(ClassName.COLLAPSED)\n\n      if(this._options.enableRemember) {\n        localStorage.setItem(`remember${EVENT_KEY}`, ClassName.COLLAPSED)\n      }\n\n      const collapsedEvent = $.Event(Event.COLLAPSED)\n      $(this._element).trigger(collapsedEvent)\n    }\n\n    toggle() {\n      if (!$(Selector.BODY).hasClass(ClassName.COLLAPSED)) {\n        this.collapse()\n      } else {\n        this.expand()\n      }\n    }\n\n    autoCollapse(resize = false) {\n      if (this._options.autoCollapseSize) {\n        if ($(window).width() <= this._options.autoCollapseSize) {\n          if (!$(Selector.BODY).hasClass(ClassName.OPEN)) {\n            this.collapse()\n          }\n        } else if (resize == true) {\n          if ($(Selector.BODY).hasClass(ClassName.OPEN)) {\n            $(Selector.BODY).removeClass(ClassName.OPEN)\n          } else if($(Selector.BODY).hasClass(ClassName.CLOSED)) {\n            this.expand()\n          }\n        }\n      }\n    }\n\n    remember() {\n      if(this._options.enableRemember) {\n        let toggleState = localStorage.getItem(`remember${EVENT_KEY}`)\n        if (toggleState == ClassName.COLLAPSED){\n          if (this._options.noTransitionAfterReload) {\n              $(\"body\").addClass('hold-transition').addClass(ClassName.COLLAPSED).delay(50).queue(function() {\n                $(this).removeClass('hold-transition')\n                $(this).dequeue()\n              })\n          } else {\n            $(\"body\").addClass(ClassName.COLLAPSED)\n          }\n        } else {\n          if (this._options.noTransitionAfterReload) {\n            $(\"body\").addClass('hold-transition').removeClass(ClassName.COLLAPSED).delay(50).queue(function() {\n              $(this).removeClass('hold-transition')\n              $(this).dequeue()\n            })\n          } else {\n            $(\"body\").removeClass(ClassName.COLLAPSED)\n          }\n        }\n      }\n    }\n\n    // Private\n\n    _init() {\n      this.remember()\n      this.autoCollapse()\n\n      $(window).resize(() => {\n        this.autoCollapse(true)\n      })\n    }\n\n    _addOverlay() {\n      const overlay = $('<div />', {\n        id: 'sidebar-overlay'\n      })\n\n      overlay.on('click', () => {\n        this.collapse()\n      })\n\n      $(Selector.WRAPPER).append(overlay)\n    }\n\n    // Static\n\n    static _jQueryInterface(operation) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new PushMenu(this, _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (typeof operation === 'string' && operation.match(/collapse|expand|toggle/)) {\n          data[operation]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.TOGGLE_BUTTON, (event) => {\n    event.preventDefault()\n\n    let button = event.currentTarget\n\n    if ($(button).data('widget') !== 'pushmenu') {\n      button = $(button).closest(Selector.TOGGLE_BUTTON)\n    }\n\n    PushMenu._jQueryInterface.call($(button), 'toggle')\n  })\n\n  $(window).on('load', () => {\n    PushMenu._jQueryInterface.call($(Selector.TOGGLE_BUTTON))\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = PushMenu._jQueryInterface\n  $.fn[NAME].Constructor = PushMenu\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return PushMenu._jQueryInterface\n  }\n\n  return PushMenu\n})(jQuery)\n\nexport default PushMenu\n","/**\n * --------------------------------------------\n * AdminLTE Treeview.js\n * License MIT\n * --------------------------------------------\n */\n\nconst Treeview = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'Treeview'\n  const DATA_KEY           = 'lte.treeview'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    SELECTED     : `selected${EVENT_KEY}`,\n    EXPANDED     : `expanded${EVENT_KEY}`,\n    COLLAPSED    : `collapsed${EVENT_KEY}`,\n    LOAD_DATA_API: `load${EVENT_KEY}`\n  }\n\n  const Selector = {\n    LI           : '.nav-item',\n    LINK         : '.nav-link',\n    TREEVIEW_MENU: '.nav-treeview',\n    OPEN         : '.menu-open',\n    DATA_WIDGET  : '[data-widget=\"treeview\"]'\n  }\n\n  const ClassName = {\n    LI               : 'nav-item',\n    LINK             : 'nav-link',\n    TREEVIEW_MENU    : 'nav-treeview',\n    OPEN             : 'menu-open',\n    SIDEBAR_COLLAPSED: 'sidebar-collapse'\n  }\n\n  const Default = {\n    trigger              : `${Selector.DATA_WIDGET} ${Selector.LINK}`,\n    animationSpeed       : 300,\n    accordion            : true,\n    expandSidebar        : false,\n    sidebarButtonSelector: '[data-widget=\"pushmenu\"]'\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n  class Treeview {\n    constructor(element, config) {\n      this._config  = config\n      this._element = element\n    }\n\n    // Public\n\n    init() {\n      this._setupListeners()\n    }\n\n    expand(treeviewMenu, parentLi) {\n      const expandedEvent = $.Event(Event.EXPANDED)\n\n      if (this._config.accordion) {\n        const openMenuLi   = parentLi.siblings(Selector.OPEN).first()\n        const openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first()\n        this.collapse(openTreeview, openMenuLi)\n      }\n\n      treeviewMenu.stop().slideDown(this._config.animationSpeed, () => {\n        parentLi.addClass(ClassName.OPEN)\n        $(this._element).trigger(expandedEvent)\n      })\n\n      if (this._config.expandSidebar) {\n        this._expandSidebar()\n      }\n    }\n\n    collapse(treeviewMenu, parentLi) {\n      const collapsedEvent = $.Event(Event.COLLAPSED)\n\n      treeviewMenu.stop().slideUp(this._config.animationSpeed, () => {\n        parentLi.removeClass(ClassName.OPEN)\n        $(this._element).trigger(collapsedEvent)\n        treeviewMenu.find(`${Selector.OPEN} > ${Selector.TREEVIEW_MENU}`).slideUp()\n        treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN)\n      })\n    }\n\n    toggle(event) {\n\n      const $relativeTarget = $(event.currentTarget)\n      const $parent = $relativeTarget.parent()\n\n      let treeviewMenu = $parent.find('> ' + Selector.TREEVIEW_MENU)\n\n      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {\n\n        if (!$parent.is(Selector.LI)) {\n          treeviewMenu = $parent.parent().find('> ' + Selector.TREEVIEW_MENU)\n        }\n\n        if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {\n          return\n        }\n      }\n      \n      event.preventDefault()\n\n      const parentLi = $relativeTarget.parents(Selector.LI).first()\n      const isOpen   = parentLi.hasClass(ClassName.OPEN)\n\n      if (isOpen) {\n        this.collapse($(treeviewMenu), parentLi)\n      } else {\n        this.expand($(treeviewMenu), parentLi)\n      }\n    }\n\n    // Private\n\n    _setupListeners() {\n      $(document).on('click', this._config.trigger, (event) => {\n        this.toggle(event)\n      })\n    }\n\n    _expandSidebar() {\n      if ($('body').hasClass(ClassName.SIDEBAR_COLLAPSED)) {\n        $(this._config.sidebarButtonSelector).PushMenu('expand')\n      }\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new Treeview($(this), _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (config === 'init') {\n          data[config]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(window).on(Event.LOAD_DATA_API, () => {\n    $(Selector.DATA_WIDGET).each(function () {\n      Treeview._jQueryInterface.call($(this), 'init')\n    })\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = Treeview._jQueryInterface\n  $.fn[NAME].Constructor = Treeview\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return Treeview._jQueryInterface\n  }\n\n  return Treeview\n})(jQuery)\n\nexport default Treeview\n","/**\n * --------------------------------------------\n * AdminLTE DirectChat.js\n * License MIT\n * --------------------------------------------\n */\n\nconst DirectChat = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'DirectChat'\n  const DATA_KEY           = 'lte.directchat'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n  const DATA_API_KEY       = '.data-api'\n\n  const Event = {\n    TOGGLED: `toggled{EVENT_KEY}`\n  }\n\n  const Selector = {\n    DATA_TOGGLE: '[data-widget=\"chat-pane-toggle\"]',\n    DIRECT_CHAT: '.direct-chat'\n  };\n\n  const ClassName = {\n    DIRECT_CHAT_OPEN: 'direct-chat-contacts-open'\n  };\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class DirectChat {\n    constructor(element, config) {\n      this._element = element\n    }\n\n    toggle() {\n      $(this._element).parents(Selector.DIRECT_CHAT).first().toggleClass(ClassName.DIRECT_CHAT_OPEN);\n\n      const toggledEvent = $.Event(Event.TOGGLED)\n      $(this._element).trigger(toggledEvent)\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data      = $(this).data(DATA_KEY)\n\n        if (!data) {\n          data = new DirectChat($(this))\n          $(this).data(DATA_KEY, data)\n        }\n\n        data[config]()\n      })\n    }\n  }\n\n  /**\n   *\n   * Data Api implementation\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.DATA_TOGGLE, function (event) {\n    if (event) event.preventDefault();\n    DirectChat._jQueryInterface.call($(this), 'toggle');\n  });\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = DirectChat._jQueryInterface\n  $.fn[NAME].Constructor = DirectChat\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return DirectChat._jQueryInterface\n  }\n\n  return DirectChat\n})(jQuery)\n\nexport default DirectChat\n","/**\n * --------------------------------------------\n * AdminLTE TodoList.js\n * License MIT\n * --------------------------------------------\n */\n\nconst TodoList = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'TodoList'\n  const DATA_KEY           = 'lte.todolist'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Selector = {\n    DATA_TOGGLE: '[data-widget=\"todo-list\"]'\n  }\n\n  const ClassName = {\n    TODO_LIST_DONE: 'done'\n  }\n\n  const Default = {\n    onCheck: function (item) {\n      return item;\n    },\n    onUnCheck: function (item) {\n      return item;\n    }\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class TodoList {\n    constructor(element, config) {\n      this._config  = config\n      this._element = element\n\n      this._init()\n    }\n\n    // Public\n\n    toggle(item) {\n      item.parents('li').toggleClass(ClassName.TODO_LIST_DONE);\n      if (! $(item).prop('checked')) {\n        this.unCheck($(item));\n        return;\n      }\n\n      this.check(item);\n    }\n\n    check (item) {\n      this._config.onCheck.call(item);\n    }\n\n    unCheck (item) {\n      this._config.onUnCheck.call(item);\n    }\n\n    // Private\n\n    _init() {\n      var that = this\n      $(Selector.DATA_TOGGLE).find('input:checkbox:checked').parents('li').toggleClass(ClassName.TODO_LIST_DONE)\n      $(Selector.DATA_TOGGLE).on('change', 'input:checkbox', (event) => {\n        that.toggle($(event.target))\n      })\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data = $(this).data(DATA_KEY)\n        const _options = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new TodoList($(this), _options)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (config === 'init') {\n          data[config]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(window).on('load', () => {\n    TodoList._jQueryInterface.call($(Selector.DATA_TOGGLE))\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = TodoList._jQueryInterface\n  $.fn[NAME].Constructor = TodoList\n  $.fn[NAME].noConflict = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return TodoList._jQueryInterface\n  }\n\n  return TodoList\n})(jQuery)\n\nexport default TodoList\n","/**\n * --------------------------------------------\n * AdminLTE CardWidget.js\n * License MIT\n * --------------------------------------------\n */\n\nconst CardWidget = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'CardWidget'\n  const DATA_KEY           = 'lte.cardwidget'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    EXPANDED: `expanded${EVENT_KEY}`,\n    COLLAPSED: `collapsed${EVENT_KEY}`,\n    MAXIMIZED: `maximized${EVENT_KEY}`,\n    MINIMIZED: `minimized${EVENT_KEY}`,\n    REMOVED: `removed${EVENT_KEY}`\n  }\n\n  const ClassName = {\n    CARD: 'card',\n    COLLAPSED: 'collapsed-card',\n    COLLAPSING: 'collapsing-card',\n    EXPANDING: 'expanding-card',\n    WAS_COLLAPSED: 'was-collapsed',\n    MAXIMIZED: 'maximized-card',\n  }\n\n  const Selector = {\n    DATA_REMOVE: '[data-card-widget=\"remove\"]',\n    DATA_COLLAPSE: '[data-card-widget=\"collapse\"]',\n    DATA_MAXIMIZE: '[data-card-widget=\"maximize\"]',\n    CARD: `.${ClassName.CARD}`,\n    CARD_HEADER: '.card-header',\n    CARD_BODY: '.card-body',\n    CARD_FOOTER: '.card-footer',\n    COLLAPSED: `.${ClassName.COLLAPSED}`,\n  }\n\n  const Default = {\n    animationSpeed: 'normal',\n    collapseTrigger: Selector.DATA_COLLAPSE,\n    removeTrigger: Selector.DATA_REMOVE,\n    maximizeTrigger: Selector.DATA_MAXIMIZE,\n    collapseIcon: 'fa-minus',\n    expandIcon: 'fa-plus',\n    maximizeIcon: 'fa-expand',\n    minimizeIcon: 'fa-compress',\n  }\n\n  class CardWidget {\n    constructor(element, settings) {\n      this._element  = element\n      this._parent = element.parents(Selector.CARD).first()\n\n      if (element.hasClass(ClassName.CARD)) {\n        this._parent = element\n      }\n\n      this._settings = $.extend({}, Default, settings)\n    }\n\n    collapse() {\n      this._parent.addClass(ClassName.COLLAPSING).children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)\n        .slideUp(this._settings.animationSpeed, () => {\n          this._parent.addClass(ClassName.COLLAPSED).removeClass(ClassName.COLLAPSING)\n        })\n\n      this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.collapseIcon)\n        .addClass(this._settings.expandIcon)\n        .removeClass(this._settings.collapseIcon)\n\n      const collapsed = $.Event(Event.COLLAPSED)\n\n      this._element.trigger(collapsed, this._parent)\n    }\n\n    expand() {\n      this._parent.addClass(ClassName.EXPANDING).children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`)\n        .slideDown(this._settings.animationSpeed, () => {\n          this._parent.removeClass(ClassName.COLLAPSED).removeClass(ClassName.EXPANDING)\n        })\n\n      this._parent.find('> ' + Selector.CARD_HEADER + ' ' + this._settings.collapseTrigger + ' .' + this._settings.expandIcon)\n        .addClass(this._settings.collapseIcon)\n        .removeClass(this._settings.expandIcon)\n\n      const expanded = $.Event(Event.EXPANDED)\n\n      this._element.trigger(expanded, this._parent)\n    }\n\n    remove() {\n      this._parent.slideUp()\n\n      const removed = $.Event(Event.REMOVED)\n\n      this._element.trigger(removed, this._parent)\n    }\n\n    toggle() {\n      if (this._parent.hasClass(ClassName.COLLAPSED)) {\n        this.expand()\n        return\n      }\n\n      this.collapse()\n    }\n    \n    maximize() {\n      this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.maximizeIcon)\n        .addClass(this._settings.minimizeIcon)\n        .removeClass(this._settings.maximizeIcon)\n      this._parent.css({\n        'height': this._parent.height(),\n        'width': this._parent.width(),\n        'transition': 'all .15s'\n      }).delay(150).queue(function(){\n        $(this).addClass(ClassName.MAXIMIZED)\n        $('html').addClass(ClassName.MAXIMIZED)\n        if ($(this).hasClass(ClassName.COLLAPSED)) {\n          $(this).addClass(ClassName.WAS_COLLAPSED)\n        }\n        $(this).dequeue()\n      })\n\n      const maximized = $.Event(Event.MAXIMIZED)\n\n      this._element.trigger(maximized, this._parent)\n    }\n\n    minimize() {\n      this._parent.find(this._settings.maximizeTrigger + ' .' + this._settings.minimizeIcon)\n        .addClass(this._settings.maximizeIcon)\n        .removeClass(this._settings.minimizeIcon)\n      this._parent.css('cssText', 'height:' + this._parent[0].style.height + ' !important;' +\n        'width:' + this._parent[0].style.width + ' !important; transition: all .15s;'\n      ).delay(10).queue(function(){\n        $(this).removeClass(ClassName.MAXIMIZED)\n        $('html').removeClass(ClassName.MAXIMIZED)\n        $(this).css({\n          'height': 'inherit',\n          'width': 'inherit'\n        })\n        if ($(this).hasClass(ClassName.WAS_COLLAPSED)) {\n          $(this).removeClass(ClassName.WAS_COLLAPSED)\n        }\n        $(this).dequeue()\n      })\n\n      const MINIMIZED = $.Event(Event.MINIMIZED)\n\n      this._element.trigger(MINIMIZED, this._parent)\n    }\n\n    toggleMaximize() {\n      if (this._parent.hasClass(ClassName.MAXIMIZED)) {\n        this.minimize()\n        return\n      }\n\n      this.maximize()\n    }\n\n    // Private\n\n    _init(card) {\n      this._parent = card\n\n      $(this).find(this._settings.collapseTrigger).click(() => {\n        this.toggle()\n      })\n\n      $(this).find(this._settings.maximizeTrigger).click(() => {\n        this.toggleMaximize()\n      })\n\n      $(this).find(this._settings.removeTrigger).click(() => {\n        this.remove()\n      })\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      let data = $(this).data(DATA_KEY)\n      const _options = $.extend({}, Default, $(this).data())\n\n      if (!data) {\n        data = new CardWidget($(this), _options)\n        $(this).data(DATA_KEY, typeof config === 'string' ? data: config)\n      }\n\n      if (typeof config === 'string' && config.match(/collapse|expand|remove|toggle|maximize|minimize|toggleMaximize/)) {\n        data[config]()\n      } else if (typeof config === 'object') {\n        data._init($(this))\n      }\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardWidget._jQueryInterface.call($(this), 'toggle')\n  })\n\n  $(document).on('click', Selector.DATA_REMOVE, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardWidget._jQueryInterface.call($(this), 'remove')\n  })\n\n  $(document).on('click', Selector.DATA_MAXIMIZE, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardWidget._jQueryInterface.call($(this), 'toggleMaximize')\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = CardWidget._jQueryInterface\n  $.fn[NAME].Constructor = CardWidget\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return CardWidget._jQueryInterface\n  }\n\n  return CardWidget\n})(jQuery)\n\nexport default CardWidget\n","/**\n * --------------------------------------------\n * AdminLTE CardRefresh.js\n * License MIT\n * --------------------------------------------\n */\n\nconst CardRefresh = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'CardRefresh'\n  const DATA_KEY           = 'lte.cardrefresh'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    LOADED: `loaded${EVENT_KEY}`,\n    OVERLAY_ADDED: `overlay.added${EVENT_KEY}`,\n    OVERLAY_REMOVED: `overlay.removed${EVENT_KEY}`,\n  }\n\n  const ClassName = {\n    CARD: 'card',\n  }\n\n  const Selector = {\n    CARD: `.${ClassName.CARD}`,\n    DATA_REFRESH: '[data-card-widget=\"card-refresh\"]',\n  }\n\n  const Default = {\n    source: '',\n    sourceSelector: '',\n    params: {},\n    trigger: Selector.DATA_REFRESH,\n    content: '.card-body',\n    loadInContent: true,\n    loadOnInit: true,\n    responseType: '',\n    overlayTemplate: '<div class=\"overlay\"><i class=\"fas fa-2x fa-sync-alt fa-spin\"></i></div>',\n    onLoadStart: function () {\n    },\n    onLoadDone: function (response) {\n      return response;\n    }\n  }\n\n  class CardRefresh {\n    constructor(element, settings) {\n      this._element  = element\n      this._parent = element.parents(Selector.CARD).first()\n      this._settings = $.extend({}, Default, settings)\n      this._overlay = $(this._settings.overlayTemplate)\n\n      if (element.hasClass(ClassName.CARD)) {\n        this._parent = element\n      }\n\n      if (this._settings.source === '') {\n        throw new Error('Source url was not defined. Please specify a url in your CardRefresh source option.');\n      }\n    }\n\n    load() {\n      this._addOverlay()\n      this._settings.onLoadStart.call($(this))\n\n      $.get(this._settings.source, this._settings.params, function (response) {\n        if (this._settings.loadInContent) {\n          if (this._settings.sourceSelector != '') {\n            response = $(response).find(this._settings.sourceSelector).html()\n          }\n\n          this._parent.find(this._settings.content).html(response)\n        }\n\n        this._settings.onLoadDone.call($(this), response)\n        this._removeOverlay();\n      }.bind(this), this._settings.responseType !== '' && this._settings.responseType)\n\n      const loadedEvent = $.Event(Event.LOADED)\n      $(this._element).trigger(loadedEvent)\n    }\n\n    _addOverlay() {\n      this._parent.append(this._overlay)\n\n      const overlayAddedEvent = $.Event(Event.OVERLAY_ADDED)\n      $(this._element).trigger(overlayAddedEvent)\n    };\n\n    _removeOverlay() {\n      this._parent.find(this._overlay).remove()\n\n      const overlayRemovedEvent = $.Event(Event.OVERLAY_REMOVED)\n      $(this._element).trigger(overlayRemovedEvent)\n    };\n\n\n    // Private\n\n    _init(card) {\n      $(this).find(this._settings.trigger).on('click', () => {\n        this.load()\n      })\n\n      if (this._settings.loadOnInit) {\n        this.load()\n      }\n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      let data = $(this).data(DATA_KEY)\n      const _options = $.extend({}, Default, $(this).data())\n\n      if (!data) {\n        data = new CardRefresh($(this), _options)\n        $(this).data(DATA_KEY, typeof config === 'string' ? data: config)\n      }\n\n      if (typeof config === 'string' && config.match(/load/)) {\n        data[config]()\n      } else {\n        data._init($(this))\n      }\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(document).on('click', Selector.DATA_REFRESH, function (event) {\n    if (event) {\n      event.preventDefault()\n    }\n\n    CardRefresh._jQueryInterface.call($(this), 'load')\n  })\n\n  $(document).ready(function () {\n    $(Selector.DATA_REFRESH).each(function() {\n      CardRefresh._jQueryInterface.call($(this))\n    })\n  })\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = CardRefresh._jQueryInterface\n  $.fn[NAME].Constructor = CardRefresh\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return CardRefresh._jQueryInterface\n  }\n\n  return CardRefresh\n})(jQuery)\n\nexport default CardRefresh\n","/**\n * --------------------------------------------\n * AdminLTE Dropdown.js\n * License MIT\n * --------------------------------------------\n */\n\nconst Dropdown = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'Dropdown'\n  const DATA_KEY           = 'lte.dropdown'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Selector = {\n    NAVBAR: '.navbar',\n    DROPDOWN_MENU: '.dropdown-menu',\n    DROPDOWN_MENU_ACTIVE: '.dropdown-menu.show',\n    DROPDOWN_TOGGLE: '[data-toggle=\"dropdown\"]',\n  }\n\n  const ClassName = {\n    DROPDOWN_HOVER: 'dropdown-hover',\n    DROPDOWN_RIGHT: 'dropdown-menu-right'\n  }\n\n  const Default = {\n  }\n\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n\n  class Dropdown {\n    constructor(element, config) {\n      this._config  = config\n      this._element = element\n    }\n\n    // Public\n\n    toggleSubmenu() {\n      this._element.siblings().show().toggleClass(\"show\")\n\n      if (! this._element.next().hasClass('show')) {\n        this._element.parents('.dropdown-menu').first().find('.show').removeClass(\"show\").hide()\n      }\n\n      this._element.parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {\n        $('.dropdown-submenu .show').removeClass(\"show\").hide()\n      })\n    }\n\n    fixPosition() {\n      let elm = $(Selector.DROPDOWN_MENU_ACTIVE)\n\n      if (elm.length !== 0) {\n        if (elm.hasClass(ClassName.DROPDOWN_RIGHT)) {\n          elm.css('left', 'inherit')\n          elm.css('right', 0)\n        } else {\n          elm.css('left', 0)\n          elm.css('right', 'inherit')\n        }\n\n        let offset = elm.offset()\n        let width = elm.width()\n        let windowWidth = $(window).width()\n        let visiblePart = windowWidth - offset.left\n\n        if (offset.left < 0) {\n          elm.css('left', 'inherit')\n          elm.css('right', (offset.left - 5))\n        } else {\n          if (visiblePart < width) {\n            elm.css('left', 'inherit')\n            elm.css('right', 0)\n          }\n        }\n      }  \n    }\n\n    // Static\n\n    static _jQueryInterface(config) {\n      return this.each(function () {\n        let data      = $(this).data(DATA_KEY)\n        const _config = $.extend({}, Default, $(this).data())\n\n        if (!data) {\n          data = new Dropdown($(this), _config)\n          $(this).data(DATA_KEY, data)\n        }\n\n        if (config === 'toggleSubmenu' || config == 'fixPosition') {\n          data[config]()\n        }\n      })\n    }\n  }\n\n  /**\n   * Data API\n   * ====================================================\n   */\n\n  $(Selector.DROPDOWN_MENU + ' ' + Selector.DROPDOWN_TOGGLE).on(\"click\", function(event) {\n    event.preventDefault()\n    event.stopPropagation()\n\n    Dropdown._jQueryInterface.call($(this), 'toggleSubmenu')\n  });\n\n  $(Selector.NAVBAR + ' ' + Selector.DROPDOWN_TOGGLE).on(\"click\", function(event) {\n    event.preventDefault()\n\n    setTimeout(function() {\n      Dropdown._jQueryInterface.call($(this), 'fixPosition')\n    }, 1)\n  });\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = Dropdown._jQueryInterface\n  $.fn[NAME].Constructor = Dropdown\n  $.fn[NAME].noConflict = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return Dropdown._jQueryInterface\n  }\n\n  return Dropdown\n})(jQuery)\n\nexport default Dropdown\n","/**\n * --------------------------------------------\n * AdminLTE Toasts.js\n * License MIT\n * --------------------------------------------\n */\n\nconst Toasts = (($) => {\n  /**\n   * Constants\n   * ====================================================\n   */\n\n  const NAME               = 'Toasts'\n  const DATA_KEY           = 'lte.toasts'\n  const EVENT_KEY          = `.${DATA_KEY}`\n  const JQUERY_NO_CONFLICT = $.fn[NAME]\n\n  const Event = {\n    INIT: `init${EVENT_KEY}`,\n    CREATED: `created${EVENT_KEY}`,\n    REMOVED: `removed${EVENT_KEY}`,\n  }\n\n  const Selector = {\n    BODY: 'toast-body',\n    CONTAINER_TOP_RIGHT: '#toastsContainerTopRight',\n    CONTAINER_TOP_LEFT: '#toastsContainerTopLeft',\n    CONTAINER_BOTTOM_RIGHT: '#toastsContainerBottomRight',\n    CONTAINER_BOTTOM_LEFT: '#toastsContainerBottomLeft',\n  }\n\n  const ClassName = {\n    TOP_RIGHT: 'toasts-top-right',\n    TOP_LEFT: 'toasts-top-left',\n    BOTTOM_RIGHT: 'toasts-bottom-right',\n    BOTTOM_LEFT: 'toasts-bottom-left',\n    FADE: 'fade',\n  }\n\n  const Position = {\n    TOP_RIGHT: 'topRight',\n    TOP_LEFT: 'topLeft',\n    BOTTOM_RIGHT: 'bottomRight',\n    BOTTOM_LEFT: 'bottomLeft',\n  }\n\n  const Id = {\n    CONTAINER_TOP_RIGHT: 'toastsContainerTopRight',\n    CONTAINER_TOP_LEFT: 'toastsContainerTopLeft',\n    CONTAINER_BOTTOM_RIGHT: 'toastsContainerBottomRight',\n    CONTAINER_BOTTOM_LEFT: 'toastsContainerBottomLeft',\n  }\n\n  const Default = {\n    position: Position.TOP_RIGHT,\n    fixed: true,\n    autohide: false,\n    autoremove: true,\n    delay: 1000,\n    fade: true,\n    icon: null,\n    image: null,\n    imageAlt: null,\n    imageHeight: '25px',\n    title: null,\n    subtitle: null,\n    close: true,\n    body: null,\n    class: null,\n  }\n\n  /**\n   * Class Definition\n   * ====================================================\n   */\n  class Toasts {\n    constructor(element, config) {\n      this._config  = config\n\n      this._prepareContainer();\n\n      const initEvent = $.Event(Event.INIT)\n      $('body').trigger(initEvent)\n    }\n\n    // Public\n\n    create() {\n      var toast = $('<div class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"/>')\n\n      toast.data('autohide', this._config.autohide)\n      toast.data('animation', this._config.fade)\n      \n      if (this._config.class) {\n        toast.addClass(this._config.class)\n      }\n\n      if (this._config.delay && this._config.delay != 500) {\n        toast.data('delay', this._config.delay)\n      }\n\n      var toast_header = $('<div class=\"toast-header\">')\n\n      if (this._config.image != null) {\n        var toast_image = $('<img />').addClass('rounded mr-2').attr('src', this._config.image).attr('alt', this._config.imageAlt)\n        \n        if (this._config.imageHeight != null) {\n          toast_image.height(this._config.imageHeight).width('auto')\n        }\n\n        toast_header.append(toast_image)\n      }\n\n      if (this._config.icon != null) {\n        toast_header.append($('<i />').addClass('mr-2').addClass(this._config.icon))\n      }\n\n      if (this._config.title != null) {\n        toast_header.append($('<strong />').addClass('mr-auto').html(this._config.title))\n      }\n\n      if (this._config.subtitle != null) {\n        toast_header.append($('<small />').html(this._config.subtitle))\n      }\n\n      if (this._config.close == true) {\n        var toast_close = $('<button data-dismiss=\"toast\" />').attr('type', 'button').addClass('ml-2 mb-1 close').attr('aria-label', 'Close').append('<span aria-hidden=\"true\">&times;</span>')\n        \n        if (this._config.title == null) {\n          toast_close.toggleClass('ml-2 ml-auto')\n        }\n        \n        toast_header.append(toast_close)\n      }\n\n      toast.append(toast_header)\n\n      if (this._config.body != null) {\n        toast.append($('<div class=\"toast-body\" />').html(this._config.body))\n      }\n\n      $(this._getContainerId()).prepend(toast)\n\n      const createdEvent = $.Event(Event.CREATED)\n      $('body').trigger(createdEvent)\n\n      toast.toast('show')\n\n\n      if (this._config.autoremove) {\n        toast.on('hidden.bs.toast', function () {\n          $(this).delay(200).remove();\n\n          const removedEvent = $.Event(Event.REMOVED)\n          $('body').trigger(removedEvent)\n        })\n      }\n\n\n    }\n\n    // Static\n\n    _getContainerId() {\n      if (this._config.position == Position.TOP_RIGHT) {\n        return Selector.CONTAINER_TOP_RIGHT;\n      } else if (this._config.position == Position.TOP_LEFT) {\n        return Selector.CONTAINER_TOP_LEFT;\n      } else if (this._config.position == Position.BOTTOM_RIGHT) {\n        return Selector.CONTAINER_BOTTOM_RIGHT;\n      } else if (this._config.position == Position.BOTTOM_LEFT) {\n        return Selector.CONTAINER_BOTTOM_LEFT;\n      }\n    }\n\n    _prepareContainer() {\n      if ($(this._getContainerId()).length === 0) {\n        var container = $('<div />').attr('id', this._getContainerId().replace('#', ''))\n        if (this._config.position == Position.TOP_RIGHT) {\n          container.addClass(ClassName.TOP_RIGHT)\n        } else if (this._config.position == Position.TOP_LEFT) {\n          container.addClass(ClassName.TOP_LEFT)\n        } else if (this._config.position == Position.BOTTOM_RIGHT) {\n          container.addClass(ClassName.BOTTOM_RIGHT)\n        } else if (this._config.position == Position.BOTTOM_LEFT) {\n          container.addClass(ClassName.BOTTOM_LEFT)\n        }\n\n        $('body').append(container)\n      }\n\n      if (this._config.fixed) {\n        $(this._getContainerId()).addClass('fixed')\n      } else {\n        $(this._getContainerId()).removeClass('fixed')\n      }\n    }\n\n    // Static\n\n    static _jQueryInterface(option, config) {\n      return this.each(function () {\n        const _options = $.extend({}, Default, config)\n        var toast = new Toasts($(this), _options)\n\n        if (option === 'create') {\n          toast[option]()\n        }\n      })\n    }\n  }\n\n  /**\n   * jQuery API\n   * ====================================================\n   */\n\n  $.fn[NAME] = Toasts._jQueryInterface\n  $.fn[NAME].Constructor = Toasts\n  $.fn[NAME].noConflict  = function () {\n    $.fn[NAME] = JQUERY_NO_CONFLICT\n    return Toasts._jQueryInterface\n  }\n\n  return Toasts\n})(jQuery)\n\nexport default Toasts\n"]}
/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */
(function ($) {
  'use strict'

  var $sidebar   = $('.control-sidebar')
  var $container = $('<div />', {
    class: 'p-3 control-sidebar-content'
  })

  $sidebar.append($container)

  var navbar_dark_skins = [
    'navbar-primary',
    'navbar-secondary',
    'navbar-info',
    'navbar-success',
    'navbar-danger',
    'navbar-indigo',
    'navbar-purple',
    'navbar-pink',
    'navbar-navy',
    'navbar-lightblue',
    'navbar-teal',
    'navbar-cyan',
    'navbar-dark',
    'navbar-gray-dark',
    'navbar-gray',
  ]

  var navbar_light_skins = [
    'navbar-light',
    'navbar-warning',
    'navbar-white',
    'navbar-orange',
  ]

  $container.append(
    '<h5>Customize AdminLTE</h5><hr class="mb-2"/>'
  )

  var $no_border_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.main-header').hasClass('border-bottom-0'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('border-bottom-0')
    } else {
      $('.main-header').removeClass('border-bottom-0')
    }
  })
  var $no_border_container = $('<div />', {'class': 'mb-1'}).append($no_border_checkbox).append('<span>No Navbar border</span>')
  $container.append($no_border_container)

  var $text_sm_body_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('body').hasClass('text-sm'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('text-sm')
    } else {
      $('body').removeClass('text-sm')
    }
  })
  var $text_sm_body_container = $('<div />', {'class': 'mb-1'}).append($text_sm_body_checkbox).append('<span>Body small text</span>')
  $container.append($text_sm_body_container)

  var $text_sm_header_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.main-header').hasClass('text-sm'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('text-sm')
    } else {
      $('.main-header').removeClass('text-sm')
    }
  })
  var $text_sm_header_container = $('<div />', {'class': 'mb-1'}).append($text_sm_header_checkbox).append('<span>Navbar small text</span>')
  $container.append($text_sm_header_container)

  var $text_sm_sidebar_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.nav-sidebar').hasClass('text-sm'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('text-sm')
    } else {
      $('.nav-sidebar').removeClass('text-sm')
    }
  })
  var $text_sm_sidebar_container = $('<div />', {'class': 'mb-1'}).append($text_sm_sidebar_checkbox).append('<span>Sidebar nav small text</span>')
  $container.append($text_sm_sidebar_container)

  var $text_sm_footer_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.main-footer').hasClass('text-sm'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-footer').addClass('text-sm')
    } else {
      $('.main-footer').removeClass('text-sm')
    }
  })
  var $text_sm_footer_container = $('<div />', {'class': 'mb-1'}).append($text_sm_footer_checkbox).append('<span>Footer small text</span>')
  $container.append($text_sm_footer_container)

  var $flat_sidebar_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.nav-sidebar').hasClass('nav-flat'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-flat')
    } else {
      $('.nav-sidebar').removeClass('nav-flat')
    }
  })
  var $flat_sidebar_container = $('<div />', {'class': 'mb-1'}).append($flat_sidebar_checkbox).append('<span>Sidebar nav flat style</span>')
  $container.append($flat_sidebar_container)

  var $legacy_sidebar_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.nav-sidebar').hasClass('nav-legacy'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-legacy')
    } else {
      $('.nav-sidebar').removeClass('nav-legacy')
    }
  })
  var $legacy_sidebar_container = $('<div />', {'class': 'mb-1'}).append($legacy_sidebar_checkbox).append('<span>Sidebar nav legacy style</span>')
  $container.append($legacy_sidebar_container)

  var $compact_sidebar_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.nav-sidebar').hasClass('nav-compact'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-compact')
    } else {
      $('.nav-sidebar').removeClass('nav-compact')
    }
  })
  var $compact_sidebar_container = $('<div />', {'class': 'mb-1'}).append($compact_sidebar_checkbox).append('<span>Sidebar nav compact</span>')
  $container.append($compact_sidebar_container)

  var $child_indent_sidebar_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.nav-sidebar').hasClass('nav-child-indent'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-child-indent')
    } else {
      $('.nav-sidebar').removeClass('nav-child-indent')
    }
  })
  var $child_indent_sidebar_container = $('<div />', {'class': 'mb-1'}).append($child_indent_sidebar_checkbox).append('<span>Sidebar nav child indent</span>')
  $container.append($child_indent_sidebar_container)

  var $no_expand_sidebar_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.main-sidebar').hasClass('sidebar-no-expand'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-sidebar').addClass('sidebar-no-expand')
    } else {
      $('.main-sidebar').removeClass('sidebar-no-expand')
    }
  })
  var $no_expand_sidebar_container = $('<div />', {'class': 'mb-1'}).append($no_expand_sidebar_checkbox).append('<span>Main Sidebar disable hover/focus auto expand</span>')
  $container.append($no_expand_sidebar_container)

  var $text_sm_brand_checkbox = $('<input />', {
    type   : 'checkbox',
    value  : 1,
    checked: $('.brand-link').hasClass('text-sm'),
    'class': 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.brand-link').addClass('text-sm')
    } else {
      $('.brand-link').removeClass('text-sm')
    }
  })
  var $text_sm_brand_container = $('<div />', {'class': 'mb-4'}).append($text_sm_brand_checkbox).append('<span>Brand small text</span>')
  $container.append($text_sm_brand_container)

  $container.append('<h6>Navbar Variants</h6>')

  var $navbar_variants        = $('<div />', {
    'class': 'd-flex'
  })
  var navbar_all_colors       = navbar_dark_skins.concat(navbar_light_skins)
  var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function (e) {
    var color = $(this).data('color')
    var $main_header = $('.main-header')
    $main_header.removeClass('navbar-dark').removeClass('navbar-light')
    navbar_all_colors.map(function (color) {
      $main_header.removeClass(color)
    })

    if (navbar_dark_skins.indexOf(color) > -1) {
      $main_header.addClass('navbar-dark')
    } else {
      $main_header.addClass('navbar-light')
    }

    $main_header.addClass(color)
  })

  $navbar_variants.append($navbar_variants_colors)

  $container.append($navbar_variants)

  var sidebar_colors = [
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-indigo',
    'bg-lightblue',
    'bg-navy',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-maroon',
    'bg-orange',
    'bg-lime',
    'bg-teal',
    'bg-olive'
  ]

  var accent_colors = [
    'accent-primary',
    'accent-warning',
    'accent-info',
    'accent-danger',
    'accent-success',
    'accent-indigo',
    'accent-lightblue',
    'accent-navy',
    'accent-purple',
    'accent-fuchsia',
    'accent-pink',
    'accent-maroon',
    'accent-orange',
    'accent-lime',
    'accent-teal',
    'accent-olive'
  ]

  var sidebar_skins = [
    'sidebar-dark-primary',
    'sidebar-dark-warning',
    'sidebar-dark-info',
    'sidebar-dark-danger',
    'sidebar-dark-success',
    'sidebar-dark-indigo',
    'sidebar-dark-lightblue',
    'sidebar-dark-navy',
    'sidebar-dark-purple',
    'sidebar-dark-fuchsia',
    'sidebar-dark-pink',
    'sidebar-dark-maroon',
    'sidebar-dark-orange',
    'sidebar-dark-lime',
    'sidebar-dark-teal',
    'sidebar-dark-olive',
    'sidebar-light-primary',
    'sidebar-light-warning',
    'sidebar-light-info',
    'sidebar-light-danger',
    'sidebar-light-success',
    'sidebar-light-indigo',
    'sidebar-light-lightblue',
    'sidebar-light-navy',
    'sidebar-light-purple',
    'sidebar-light-fuchsia',
    'sidebar-light-pink',
    'sidebar-light-maroon',
    'sidebar-light-orange',
    'sidebar-light-lime',
    'sidebar-light-teal',
    'sidebar-light-olive'
  ]

  $container.append('<h6>Accent Color Variants</h6>')
  var $accent_variants = $('<div />', {
    'class': 'd-flex'
  })
  $container.append($accent_variants)
  $container.append(createSkinBlock(accent_colors, function () {
    var color         = $(this).data('color')
    var accent_class = color
    var $body      = $('body')
    accent_colors.map(function (skin) {
      $body.removeClass(skin)
    })

    $body.addClass(accent_class)
  }))

  $container.append('<h6>Dark Sidebar Variants</h6>')
  var $sidebar_variants_dark = $('<div />', {
    'class': 'd-flex'
  })
  $container.append($sidebar_variants_dark)
  $container.append(createSkinBlock(sidebar_colors, function () {
    var color         = $(this).data('color')
    var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
    var $sidebar      = $('.main-sidebar')
    sidebar_skins.map(function (skin) {
      $sidebar.removeClass(skin)
    })

    $sidebar.addClass(sidebar_class)
  }))

  $container.append('<h6>Light Sidebar Variants</h6>')
  var $sidebar_variants_light = $('<div />', {
    'class': 'd-flex'
  })
  $container.append($sidebar_variants_light)
  $container.append(createSkinBlock(sidebar_colors, function () {
    var color         = $(this).data('color')
    var sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
    var $sidebar      = $('.main-sidebar')
    sidebar_skins.map(function (skin) {
      $sidebar.removeClass(skin)
    })

    $sidebar.addClass(sidebar_class)
  }))

  var logo_skins = navbar_all_colors
  $container.append('<h6>Brand Logo Variants</h6>')
  var $logo_variants = $('<div />', {
    'class': 'd-flex'
  })
  $container.append($logo_variants)
  var $clear_btn = $('<a />', {
    href: 'javascript:void(0)'
  }).text('clear').on('click', function () {
    var $logo = $('.brand-link')
    logo_skins.map(function (skin) {
      $logo.removeClass(skin)
    })
  })
  $container.append(createSkinBlock(logo_skins, function () {
    var color = $(this).data('color')
    var $logo = $('.brand-link')
    logo_skins.map(function (skin) {
      $logo.removeClass(skin)
    })
    $logo.addClass(color)
  }).append($clear_btn))

  function createSkinBlock(colors, callback) {
    var $block = $('<div />', {
      'class': 'd-flex flex-wrap mb-3'
    })

    colors.map(function (color) {
      var $color = $('<div />', {
        'class': (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-') + ' elevation-2'
      })

      $block.append($color)

      $color.data('color', color)

      $color.css({
        width       : '40px',
        height      : '20px',
        borderRadius: '25px',
        marginRight : 10,
        marginBottom: 10,
        opacity     : 0.8,
        cursor      : 'pointer'
      })

      $color.hover(function () {
        $(this).css({ opacity: 1 }).removeClass('elevation-2').addClass('elevation-4')
      }, function () {
        $(this).css({ opacity: 0.8 }).removeClass('elevation-4').addClass('elevation-2')
      })

      if (callback) {
        $color.on('click', callback)
      }
    })

    return $block
  }

  $('.product-image-thumb').on('click', function() {
    const image_element = $(this).find('img');
    $('.product-image').prop('src', $(image_element).attr('src'))
    $('.product-image-thumb.active').removeClass('active');
    $(this).addClass('active');
  });
})(jQuery)

/*
 * Author: Abdullah A Almsaeed
 * Date: 4 Jan 2014
 * Description:
 *      This is a demo file used only for the main dashboard (index.html)
 **/

$(function () {

  'use strict'

  // Make the dashboard widgets sortable Using jquery UI
  $('.connectedSortable').sortable({
    placeholder         : 'sort-highlight',
    connectWith         : '.connectedSortable',
    handle              : '.card-header, .nav-tabs',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })
  $('.connectedSortable .card-header, .connectedSortable .nav-tabs-custom').css('cursor', 'move')

  // jQuery UI sortable for the todo list
  $('.todo-list').sortable({
    placeholder         : 'sort-highlight',
    handle              : '.handle',
    forcePlaceholderSize: true,
    zIndex              : 999999
  })

  // bootstrap WYSIHTML5 - text editor
  $('.textarea').summernote()

  $('.daterange').daterangepicker({
    ranges   : {
      'Today'       : [moment(), moment()],
      'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month'  : [moment().startOf('month'), moment().endOf('month')],
      'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
  }, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
  })

  /* jQueryKnob */
  $('.knob').knob()

  // jvectormap data
  var visitorsData = {
    'US': 398, //USA
    'SA': 400, //Saudi Arabia
    'CA': 1000, //Canada
    'DE': 500, //Germany
    'FR': 760, //France
    'CN': 300, //China
    'AU': 700, //Australia
    'BR': 600, //Brazil
    'IN': 800, //India
    'GB': 320, //Great Britain
    'RU': 3000 //Russia
  }
  // World map by jvectormap
  $('#world-map').vectorMap({
    map              : 'usa_en',
    backgroundColor  : 'transparent',
    regionStyle      : {
      initial: {
        fill            : 'rgba(255, 255, 255, 0.7)',
        'fill-opacity'  : 1,
        stroke          : 'rgba(0,0,0,.2)',
        'stroke-width'  : 1,
        'stroke-opacity': 1
      }
    },
    series           : {
      regions: [{
        values           : visitorsData,
        scale            : ['#ffffff', '#0154ad'],
        normalizeFunction: 'polynomial'
      }]
    },
    onRegionLabelShow: function (e, el, code) {
      if (typeof visitorsData[code] != 'undefined')
        el.html(el.html() + ': ' + visitorsData[code] + ' new visitors')
    }
  })

  // Sparkline charts
  var sparkline1 = new Sparkline($("#sparkline-1")[0], {width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9'});
  var sparkline2 = new Sparkline($("#sparkline-2")[0], {width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9'});
  var sparkline3 = new Sparkline($("#sparkline-3")[0], {width: 80, height: 50, lineColor: '#92c1dc', endColor: '#ebf4f9'});

  sparkline1.draw([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021]);
  sparkline2.draw([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921]);
  sparkline3.draw([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21]);

  // The Calender
  $('#calendar').datetimepicker({
    format: 'L',
    inline: true
  })

  // SLIMSCROLL FOR CHAT WIDGET
  $('#chat-box').overlayScrollbars({
    height: '250px'
  })

  /* Chart.js Charts */
  // Sales chart
  var salesChartCanvas = document.getElementById('revenue-chart-canvas').getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesChartData = {
    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label               : 'Digital Goods',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label               : 'Electronics',
        backgroundColor     : 'rgba(210, 214, 222, 1)',
        borderColor         : 'rgba(210, 214, 222, 1)',
        pointRadius         : false,
        pointColor          : 'rgba(210, 214, 222, 1)',
        pointStrokeColor    : '#c1c7d1',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data                : [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas, { 
      type: 'line', 
      data: salesChartData, 
      options: salesChartOptions
    }
  )

  // Donut Chart
  var pieChartCanvas = $('#sales-chart-canvas').get(0).getContext('2d')
  var pieData        = {
    labels: [
        'Instore Sales', 
        'Download Sales',
        'Mail-Order Sales', 
    ],
    datasets: [
      {
        data: [30,12,20],
        backgroundColor : ['#f56954', '#00a65a', '#f39c12'],
      }
    ]
  }
  var pieOptions = {
    legend: {
      display: false
    },
    maintainAspectRatio : false,
    responsive : true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var pieChart = new Chart(pieChartCanvas, {
    type: 'doughnut',
    data: pieData,
    options: pieOptions      
  });

  // Sales graph chart
  var salesGraphChartCanvas = $('#line-chart').get(0).getContext('2d');
  //$('#revenue-chart').get(0).getContext('2d');

  var salesGraphChartData = {
    labels  : ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2', '2012 Q3', '2012 Q4', '2013 Q1', '2013 Q2'],
    datasets: [
      {
        label               : 'Digital Goods',
        fill                : false,
        borderWidth         : 2,
        lineTension         : 0,
        spanGaps : true,
        borderColor         : '#efefef',
        pointRadius         : 3,
        pointHoverRadius    : 7,
        pointColor          : '#efefef',
        pointBackgroundColor: '#efefef',
        data                : [2666, 2778, 4912, 3767, 6810, 5670, 4820, 15073, 10687, 8432]
      }
    ]
  }

  var salesGraphChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        ticks : {
          fontColor: '#efefef',
        },
        gridLines : {
          display : false,
          color: '#efefef',
          drawBorder: false,
        }
      }],
      yAxes: [{
        ticks : {
          stepSize: 5000,
          fontColor: '#efefef',
        },
        gridLines : {
          display : true,
          color: '#efefef',
          drawBorder: false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesGraphChart = new Chart(salesGraphChartCanvas, { 
      type: 'line', 
      data: salesGraphChartData, 
      options: salesGraphChartOptions
    }
  )

})

$(function () {

  'use strict'

  /* ChartJS
   * -------
   * Here we will create a few charts using ChartJS
   */

  //-----------------------
  //- MONTHLY SALES CHART -
  //-----------------------

  // Get context with jQuery - using jQuery's .get() method.
  var salesChartCanvas = $('#salesChart').get(0).getContext('2d')

  var salesChartData = {
    labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label               : 'Digital Goods',
        backgroundColor     : 'rgba(60,141,188,0.9)',
        borderColor         : 'rgba(60,141,188,0.8)',
        pointRadius          : false,
        pointColor          : '#3b8bba',
        pointStrokeColor    : 'rgba(60,141,188,1)',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data                : [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label               : 'Electronics',
        backgroundColor     : 'rgba(210, 214, 222, 1)',
        borderColor         : 'rgba(210, 214, 222, 1)',
        pointRadius         : false,
        pointColor          : 'rgba(210, 214, 222, 1)',
        pointStrokeColor    : '#c1c7d1',
        pointHighlightFill  : '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data                : [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio : false,
    responsive : true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines : {
          display : false,
        }
      }],
      yAxes: [{
        gridLines : {
          display : false,
        }
      }]
    }
  }

  // This will get the first returned node in the jQuery collection.
  var salesChart = new Chart(salesChartCanvas, { 
      type: 'line', 
      data: salesChartData, 
      options: salesChartOptions
    }
  )

  //---------------------------
  //- END MONTHLY SALES CHART -
  //---------------------------

  //-------------
  //- PIE CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
    var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    var pieData        = {
      labels: [
          'Chrome', 
          'IE',
          'FireFox', 
          'Safari', 
          'Opera', 
          'Navigator', 
      ],
      datasets: [
        {
          data: [700,500,400,600,300,100],
          backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
        }
      ]
    }
    var pieOptions     = {
      legend: {
        display: false
      }
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    var pieChart = new Chart(pieChartCanvas, {
      type: 'doughnut',
      data: pieData,
      options: pieOptions      
    })

  //-----------------
  //- END PIE CHART -
  //-----------------

  /* jVector Maps
   * ------------
   * Create a world map with markers
   */
  $('#world-map-markers').mapael({
      map: {
        name : "usa_states",
        zoom: {
          enabled: true,
          maxLevel: 10
        },
      },
    }
  );

  // $('#world-map-markers').vectorMap({
  //   map              : 'world_en',
  //   normalizeFunction: 'polynomial',
  //   hoverOpacity     : 0.7,
  //   hoverColor       : false,
  //   backgroundColor  : 'transparent',
  //   regionStyle      : {
  //     initial      : {
  //       fill            : 'rgba(210, 214, 222, 1)',
  //       'fill-opacity'  : 1,
  //       stroke          : 'none',
  //       'stroke-width'  : 0,
  //       'stroke-opacity': 1
  //     },
  //     hover        : {
  //       'fill-opacity': 0.7,
  //       cursor        : 'pointer'
  //     },
  //     selected     : {
  //       fill: 'yellow'
  //     },
  //     selectedHover: {}
  //   },
  //   markerStyle      : {
  //     initial: {
  //       fill  : '#00a65a',
  //       stroke: '#111'
  //     }
  //   },
  //   markers          : [
  //     {
  //       latLng: [41.90, 12.45],
  //       name  : 'Vatican City'
  //     },
  //     {
  //       latLng: [43.73, 7.41],
  //       name  : 'Monaco'
  //     },
  //     {
  //       latLng: [-0.52, 166.93],
  //       name  : 'Nauru'
  //     },
  //     {
  //       latLng: [-8.51, 179.21],
  //       name  : 'Tuvalu'
  //     },
  //     {
  //       latLng: [43.93, 12.46],
  //       name  : 'San Marino'
  //     },
  //     {
  //       latLng: [47.14, 9.52],
  //       name  : 'Liechtenstein'
  //     },
  //     {
  //       latLng: [7.11, 171.06],
  //       name  : 'Marshall Islands'
  //     },
  //     {
  //       latLng: [17.3, -62.73],
  //       name  : 'Saint Kitts and Nevis'
  //     },
  //     {
  //       latLng: [3.2, 73.22],
  //       name  : 'Maldives'
  //     },
  //     {
  //       latLng: [35.88, 14.5],
  //       name  : 'Malta'
  //     },
  //     {
  //       latLng: [12.05, -61.75],
  //       name  : 'Grenada'
  //     },
  //     {
  //       latLng: [13.16, -61.23],
  //       name  : 'Saint Vincent and the Grenadines'
  //     },
  //     {
  //       latLng: [13.16, -59.55],
  //       name  : 'Barbados'
  //     },
  //     {
  //       latLng: [17.11, -61.85],
  //       name  : 'Antigua and Barbuda'
  //     },
  //     {
  //       latLng: [-4.61, 55.45],
  //       name  : 'Seychelles'
  //     },
  //     {
  //       latLng: [7.35, 134.46],
  //       name  : 'Palau'
  //     },
  //     {
  //       latLng: [42.5, 1.51],
  //       name  : 'Andorra'
  //     },
  //     {
  //       latLng: [14.01, -60.98],
  //       name  : 'Saint Lucia'
  //     },
  //     {
  //       latLng: [6.91, 158.18],
  //       name  : 'Federated States of Micronesia'
  //     },
  //     {
  //       latLng: [1.3, 103.8],
  //       name  : 'Singapore'
  //     },
  //     {
  //       latLng: [1.46, 173.03],
  //       name  : 'Kiribati'
  //     },
  //     {
  //       latLng: [-21.13, -175.2],
  //       name  : 'Tonga'
  //     },
  //     {
  //       latLng: [15.3, -61.38],
  //       name  : 'Dominica'
  //     },
  //     {
  //       latLng: [-20.2, 57.5],
  //       name  : 'Mauritius'
  //     },
  //     {
  //       latLng: [26.02, 50.55],
  //       name  : 'Bahrain'
  //     },
  //     {
  //       latLng: [0.33, 6.73],
  //       name  : 'São Tomé and Príncipe'
  //     }
  //   ]
  // })

})

$(function () {
  'use strict'

  var ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }

  var mode      = 'index'
  var intersect = true

  var $salesChart = $('#sales-chart')
  var salesChart  = new Chart($salesChart, {
    type   : 'bar',
    data   : {
      labels  : ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      datasets: [
        {
          backgroundColor: '#007bff',
          borderColor    : '#007bff',
          data           : [1000, 2000, 3000, 2500, 2700, 2500, 3000]
        },
        {
          backgroundColor: '#ced4da',
          borderColor    : '#ced4da',
          data           : [700, 1700, 2700, 2000, 1800, 1500, 2000]
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      tooltips           : {
        mode     : mode,
        intersect: intersect
      },
      hover              : {
        mode     : mode,
        intersect: intersect
      },
      legend             : {
        display: false
      },
      scales             : {
        yAxes: [{
          // display: false,
          gridLines: {
            display      : true,
            lineWidth    : '4px',
            color        : 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks    : $.extend({
            beginAtZero: true,

            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              if (value >= 1000) {
                value /= 1000
                value += 'k'
              }
              return '$' + value
            }
          }, ticksStyle)
        }],
        xAxes: [{
          display  : true,
          gridLines: {
            display: false
          },
          ticks    : ticksStyle
        }]
      }
    }
  })

  var $visitorsChart = $('#visitors-chart')
  var visitorsChart  = new Chart($visitorsChart, {
    data   : {
      labels  : ['18th', '20th', '22nd', '24th', '26th', '28th', '30th'],
      datasets: [{
        type                : 'line',
        data                : [100, 120, 170, 167, 180, 177, 160],
        backgroundColor     : 'transparent',
        borderColor         : '#007bff',
        pointBorderColor    : '#007bff',
        pointBackgroundColor: '#007bff',
        fill                : false
        // pointHoverBackgroundColor: '#007bff',
        // pointHoverBorderColor    : '#007bff'
      },
        {
          type                : 'line',
          data                : [60, 80, 70, 67, 80, 77, 100],
          backgroundColor     : 'tansparent',
          borderColor         : '#ced4da',
          pointBorderColor    : '#ced4da',
          pointBackgroundColor: '#ced4da',
          fill                : false
          // pointHoverBackgroundColor: '#ced4da',
          // pointHoverBorderColor    : '#ced4da'
        }]
    },
    options: {
      maintainAspectRatio: false,
      tooltips           : {
        mode     : mode,
        intersect: intersect
      },
      hover              : {
        mode     : mode,
        intersect: intersect
      },
      legend             : {
        display: false
      },
      scales             : {
        yAxes: [{
          // display: false,
          gridLines: {
            display      : true,
            lineWidth    : '4px',
            color        : 'rgba(0, 0, 0, .2)',
            zeroLineColor: 'transparent'
          },
          ticks    : $.extend({
            beginAtZero : true,
            suggestedMax: 200
          }, ticksStyle)
        }],
        xAxes: [{
          display  : true,
          gridLines: {
            display: false
          },
          ticks    : ticksStyle
        }]
      }
    }
  })
})

/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */
!function(t,r){"function"==typeof define&&define.amd?define(["jquery"],function(n){return r(t,t.document,undefined,n)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=r(t,t.document,undefined,require("jquery")):r(t,t.document,undefined,t.jQuery)}("undefined"!=typeof window?window:this,function(vi,di,hi,n){"use strict";var o,l,f,a,pi="object",bi="function",yi="array",mi="string",gi="boolean",wi="number",t="null",xi={c:"class",s:"style",i:"id",l:"length",p:"prototype",ti:"tabindex",oH:"offsetHeight",cH:"clientHeight",sH:"scrollHeight",oW:"offsetWidth",cW:"clientWidth",sW:"scrollWidth",hOP:"hasOwnProperty",bCR:"getBoundingClientRect"},_i=(o={},l={},{e:f=["-webkit-","-moz-","-o-","-ms-"],o:a=["WebKit","Moz","O","MS"],u:function(n){var t=l[n];if(l[xi.hOP](n))return t;for(var r,e,i,o=c(n),a=di.createElement("div")[xi.s],u=0;u<f.length;u++)for(i=f[u].replace(/-/g,""),r=[n,f[u]+n,i+o,c(i)+o],e=0;e<r[xi.l];e++)if(a[r[e]]!==hi){t=r[e];break}return l[n]=t},v:function(n,t,r){var e=n+" "+t,i=l[e];if(l[xi.hOP](e))return i;for(var o,a=di.createElement("div")[xi.s],u=t.split(" "),f=r||"",c=0,s=-1;c<u[xi.l];c++)for(;s<_i.e[xi.l];s++)if(o=s<0?u[c]:_i.e[s]+u[c],a.cssText=n+":"+o+f,a[xi.l]){i=o;break}return l[e]=i},d:function(n,t,r){var e=0,i=o[n];if(!o[xi.hOP](n)){for(i=vi[n];e<a[xi.l];e++)i=i||vi[(t?a[e]:a[e].toLowerCase())+c(n)];o[n]=i}return i||r}});function c(n){return n.charAt(0).toUpperCase()+n.slice(1)}var Si={wW:e(r,0,!0),wH:e(r,0),mO:e(_i.d,0,"MutationObserver",!0),rO:e(_i.d,0,"ResizeObserver",!0),rAF:e(_i.d,0,"requestAnimationFrame",!1,function(n){return vi.setTimeout(n,1e3/60)}),cAF:e(_i.d,0,"cancelAnimationFrame",!1,function(n){return vi.clearTimeout(n)}),now:function(){return Date.now&&Date.now()||(new Date).getTime()},stpP:function(n){n.stopPropagation?n.stopPropagation():n.cancelBubble=!0},prvD:function(n){n.preventDefault&&n.cancelable?n.preventDefault():n.returnValue=!1},page:function(n){var t=((n=n.originalEvent||n).target||n.srcElement||di).ownerDocument||di,r=t.documentElement,e=t.body;if(n.touches===hi)return!n.pageX&&n.clientX&&null!=n.clientX?{x:n.clientX+(r&&r.scrollLeft||e&&e.scrollLeft||0)-(r&&r.clientLeft||e&&e.clientLeft||0),y:n.clientY+(r&&r.scrollTop||e&&e.scrollTop||0)-(r&&r.clientTop||e&&e.clientTop||0)}:{x:n.pageX,y:n.pageY};var i=n.touches[0];return{x:i.pageX,y:i.pageY}},mBtn:function(n){var t=n.button;return n.which||t===hi?n.which:1&t?1:2&t?3:4&t?2:0},inA:function(n,t){for(var r=0;r<t[xi.l];r++)try{if(t[r]===n)return r}catch(e){}return-1},isA:function(n){var t=Array.isArray;return t?t(n):this.type(n)==yi},type:function(n){return n===hi||null===n?n+"":Object[xi.p].toString.call(n).replace(/^\[object (.+)\]$/,"$1").toLowerCase()},bind:e};function r(n){return n?vi.innerWidth||di.documentElement[xi.cW]||di.body[xi.cW]:vi.innerHeight||di.documentElement[xi.cH]||di.body[xi.cH]}function e(n,t){if(typeof n!=bi)throw"Can't bind function!";var r=xi.p,e=Array[r].slice.call(arguments,2),i=function(){},o=function(){return n.apply(this instanceof i?this:t,e.concat(Array[r].slice.call(arguments)))};return n[r]&&(i[r]=n[r]),o[r]=new i,o}var i,u,zi,s,v,L,N,d,h,p,b,y,m,g,Ti,Oi=Math,ki=n,Ci=(n.easing,n),Ai=(i=[],u="__overlayScrollbars__",function(n,t){var r=arguments[xi.l];if(r<1)return i;if(t)n[u]=t,i.push(n);else{var e=Si.inA(n,i);if(-1<e){if(!(1<r))return i[e][u];delete n[u],i.splice(e,1)}}}),w=(g=[],L=Si.type,y={className:["os-theme-dark",[t,mi]],resize:["none","n:none b:both h:horizontal v:vertical"],sizeAutoCapable:d=[!0,gi],clipAlways:d,normalizeRTL:d,paddingAbsolute:h=[!(N=[gi,wi,mi,yi,pi,bi,t]),gi],autoUpdate:[null,[t,gi]],autoUpdateInterval:[33,wi],updateOnLoad:[["img"],[mi,yi,t]],nativeScrollbarsOverlaid:{showNativeScrollbars:h,initialize:d},overflowBehavior:{x:["scroll",b="v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden"],y:["scroll",b]},scrollbars:{visibility:["auto","v:visible h:hidden a:auto"],autoHide:["never","n:never s:scroll l:leave m:move"],autoHideDelay:[800,wi],dragScrolling:d,clickScrolling:h,touchSupport:d,snapHandle:h},textarea:{dynWidth:h,dynHeight:h,inheritedAttrs:[["style","class"],[mi,yi,t]]},callbacks:{onInitialized:p=[null,[t,bi]],onInitializationWithdrawn:p,onDestroyed:p,onScrollStart:p,onScroll:p,onScrollStop:p,onOverflowChanged:p,onOverflowAmountChanged:p,onDirectionChanged:p,onContentSizeChanged:p,onHostSizeChanged:p,onUpdated:p}},Ti={m:(m=function(i){var o=function(n){var t,r,e;for(t in n)n[xi.hOP](t)&&(r=n[t],(e=L(r))==yi?n[t]=r[i?1:0]:e==pi&&(n[t]=o(r)));return n};return o(Ci.extend(!0,{},y))})(),g:m(!0),_:function(n,t,C,r){var e={},i={},o=Ci.extend(!0,{},n),A=Ci.inArray,H=Ci.isEmptyObject,R=function(n,t,r,e,i,o){for(var a in t)if(t[xi.hOP](a)&&n[xi.hOP](a)){var u,f,c,s,l,v,d,h,p=!1,b=!1,y=t[a],m=L(y),g=m==pi,w=Si.isA(y)?y:[y],x=r[a],_=n[a],S=L(_),z=o?o+".":"",T='The option "'+z+a+"\" wasn't set, because",O=[],k=[];if(x=x===hi?{}:x,g&&S==pi)e[a]={},i[a]={},R(_,y,x,e[a],i[a],z+a),Ci.each([n,e,i],function(n,t){H(t[a])&&delete t[a]});else if(!g){for(v=0;v<w[xi.l];v++)if(l=w[v],c=(m=L(l))==mi&&-1===A(l,N))for(O.push(mi),u=l.split(" "),k=k.concat(u),d=0;d<u[xi.l];d++){for(s=(f=u[d].split(":"))[0],h=0;h<f[xi.l];h++)if(_===f[h]){p=!0;break}if(p)break}else if(O.push(l),S===l){p=!0;break}p?((b=_!==x)&&(e[a]=_),(c?A(x,f)<0:b)&&(i[a]=c?s:_)):C&&console.warn(T+" it doesn't accept the type [ "+S.toUpperCase()+' ] with the value of "'+_+'".\r\nAccepted types are: [ '+O.join(", ").toUpperCase()+" ]."+(0<k[length]?"\r\nValid strings are: [ "+k.join(", ").split(":").join(", ")+" ].":"")),delete n[a]}}};return R(o,t,r||{},e,i),!H(o)&&C&&console.warn("The following options are discarded due to invalidity:\r\n"+vi.JSON.stringify(o,null,2)),{S:e,z:i}}},(zi=vi.OverlayScrollbars=function(n,r,e){if(0===arguments[xi.l])return this;var i,t,o=[],a=Ci.isPlainObject(r);return n?(n=n[xi.l]!=hi?n:[n[0]||n],x(),0<n[xi.l]&&(a?Ci.each(n,function(n,t){(i=t)!==hi&&o.push(z(i,r,e,s,v))}):Ci.each(n,function(n,t){i=Ai(t),("!"===r&&zi.valid(i)||Si.type(r)==bi&&r(t,i)||r===hi)&&o.push(i)}),t=1===o[xi.l]?o[0]:o),t):a||!r?t:o}).globals=function(){x();var n=Ci.extend(!0,{},s);return delete n.msie,n},zi.defaultOptions=function(n){x();var t=s.defaultOptions;if(n===hi)return Ci.extend(!0,{},t);s.defaultOptions=Ci.extend(!0,{},t,Ti._(n,Ti.g,!0,t).S)},zi.valid=function(n){return n instanceof zi&&!n.getState().destroyed},zi.extension=function(n,t,r){var e=Si.type(n)==mi,i=arguments[xi.l],o=0;if(i<1||!e)return Ci.extend(!0,{length:g[xi.l]},g);if(e)if(Si.type(t)==bi)g.push({name:n,extensionFactory:t,defaultOptions:r});else for(;o<g[xi.l];o++)if(g[o].name===n){if(!(1<i))return Ci.extend(!0,{},g[o]);g.splice(o,1)}},zi);function x(){s=s||new _(Ti.m),v=v||new S(s)}function _(n){var _=this,i="overflow",S=Ci("body"),z=Ci('<div id="os-dummy-scrollbar-size"><div></div></div>'),o=z[0],e=Ci(z.children("div").eq(0));S.append(z),z.hide().show();var t,r,a,u,f,c,s,l,v,d=T(o),h={x:0===d.x,y:0===d.y},p=(r=vi.navigator.userAgent,u="substring",f=r[a="indexOf"]("MSIE "),c=r[a]("Trident/"),s=r[a]("Edge/"),l=r[a]("rv:"),v=parseInt,0<f?t=v(r[u](f+5,r[a](".",f)),10):0<c?t=v(r[u](l+3,r[a](".",l)),10):0<s&&(t=v(r[u](s+5,r[a](".",s)),10)),t);function T(n){return{x:n[xi.oH]-n[xi.cH],y:n[xi.oW]-n[xi.cW]}}Ci.extend(_,{defaultOptions:n,msie:p,autoUpdateLoop:!1,autoUpdateRecommended:!Si.mO(),nativeScrollbarSize:d,nativeScrollbarIsOverlaid:h,nativeScrollbarStyling:function(){var n=!1;z.addClass("os-viewport-native-scrollbars-invisible");try{n="none"===z.css("scrollbar-width")&&(9<p||!p)||"none"===vi.getComputedStyle(o,"::-webkit-scrollbar").getPropertyValue("display")}catch(t){}return n}(),overlayScrollbarDummySize:{x:30,y:30},cssCalc:_i.v("width","calc","(1px)")||null,restrictedMeasuring:function(){z.css(i,"hidden");var n=o[xi.sW],t=o[xi.sH];z.css(i,"visible");var r=o[xi.sW],e=o[xi.sH];return n-r!=0||t-e!=0}(),rtlScrollBehavior:function(){z.css({"overflow-y":"hidden","overflow-x":"scroll",direction:"rtl"}).scrollLeft(0);var n=z.offset(),t=e.offset();z.scrollLeft(-999);var r=e.offset();return{i:n.left===t.left,n:t.left!==r.left}}(),supportTransform:!!_i.u("transform"),supportTransition:!!_i.u("transition"),supportPassiveEvents:function(){var n=!1;try{vi.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){n=!0}}))}catch(t){}return n}(),supportResizeObserver:!!Si.rO(),supportMutationObserver:!!Si.mO()}),z.removeAttr(xi.s).remove(),function(){if(!h.x||!h.y){var y=Oi.abs,m=Si.wW(),g=Si.wH(),w=x();Ci(vi).on("resize",function(){if(0<Ai().length){var n=Si.wW(),t=Si.wH(),r=n-m,e=t-g;if(0==r&&0==e)return;var i,o=Oi.round(n/(m/100)),a=Oi.round(t/(g/100)),u=y(r),f=y(e),c=y(o),s=y(a),l=x(),v=2<u&&2<f,d=!function b(n,t){var r=y(n),e=y(t);return r!==e&&r+1!==e&&r-1!==e}(c,s),h=v&&d&&(l!==w&&0<w),p=_.nativeScrollbarSize;h&&(S.append(z),i=_.nativeScrollbarSize=T(z[0]),z.remove(),p.x===i.x&&p.y===i.y||Ci.each(Ai(),function(){Ai(this)&&Ai(this).update("zoom")})),m=n,g=t,w=l}})}function x(){var n=vi.screen.deviceXDPI||0,t=vi.screen.logicalXDPI||1;return vi.devicePixelRatio||n/t}}()}function S(r){var c,e=Ci.inArray,s=Si.now,l="autoUpdate",v=xi.l,d=[],h=[],p=!1,b=33,y=s(),m=function(){if(0<d[v]&&p){c=Si.rAF()(function(){m()});var n,t,r,e,i,o,a=s(),u=a-y;if(b<u){y=a-u%b,n=33;for(var f=0;f<d[v];f++)(t=d[f])!==hi&&(e=(r=t.options())[l],i=Oi.max(1,r.autoUpdateInterval),o=s(),(!0===e||null===e)&&o-h[f]>i&&(t.update("auto"),h[f]=new Date(o+=i)),n=Oi.max(1,Oi.min(n,i)));b=n}}else b=33};this.add=function(n){-1===e(n,d)&&(d.push(n),h.push(s()),0<d[v]&&!p&&(p=!0,r.autoUpdateLoop=p,m()))},this.remove=function(n){var t=e(n,d);-1<t&&(h.splice(t,1),d.splice(t,1),0===d[v]&&p&&(p=!1,r.autoUpdateLoop=p,c!==hi&&(Si.cAF()(c),c=-1)))}}function z(r,n,t,xt,_t){var cn=Si.type,sn=Ci.inArray,d=Ci.each,St=new zi,e=Ci[xi.p];if(dt(r)){if(Ai(r)){var i=Ai(r);return i.options(n),i}var zt,Tt,Ot,kt,I,Ct,At,Ht,j,ln,g,A,h,Rt,Lt,Nt,Wt,w,p,Dt,Mt,Et,It,jt,Ft,Pt,Ut,Vt,$t,o,a,qt,Bt,Xt,u,F,c,P,Yt,Kt,Gt,Jt,Qt,Zt,nr,tr,rr,er,ir,f,s,l,v,b,y,x,H,or,ar,ur,R,fr,cr,sr,lr,vr,dr,hr,pr,br,yr,mr,gr,wr,xr,_r,L,Sr,zr,Tr,Or,kr,Cr,Ar,Hr,m,_,Rr,Lr,Nr,Wr,Dr,Mr,Er,Ir,jr,Fr,Pr,Ur,Vr,$r,S,z,T,O,qr,Br,k,C,Xr,Yr,Kr,Gr,Jr,U,V,Qr,Zr,ne,te,re={},vn={},dn={},ee={},ie={},N="-hidden",oe="margin-",ae="padding-",ue="border-",fe="top",ce="right",se="bottom",le="left",ve="min-",de="max-",he="width",pe="height",be="float",ye="",me="auto",hn="sync",ge="scroll",we="100%",pn="x",bn="y",W=".",xe=" ",D="scrollbar",M="-horizontal",E="-vertical",_e=ge+"Left",Se=ge+"Top",$="mousedown touchstart",q="mouseup touchend touchcancel",B="mousemove touchmove",X="mouseenter",Y="mouseleave",K="keydown",G="keyup",J="selectstart",Q="transitionend webkitTransitionEnd oTransitionEnd",Z="__overlayScrollbarsRO__",nn="os-",tn="os-html",rn="os-host",en=rn+"-foreign",on=rn+"-textarea",an=rn+"-"+D+M+N,un=rn+"-"+D+E+N,fn=rn+"-transition",ze=rn+"-rtl",Te=rn+"-resize-disabled",Oe=rn+"-scrolling",ke=rn+"-overflow",Ce=(ke=rn+"-overflow")+"-x",Ae=ke+"-y",yn="os-textarea",mn=yn+"-cover",gn="os-padding",wn="os-viewport",He=wn+"-native-scrollbars-invisible",xn=wn+"-native-scrollbars-overlaid",_n="os-content",Re="os-content-arrange",Le="os-content-glue",Ne="os-size-auto-observer",Sn="os-resize-observer",zn="os-resize-observer-item",Tn=zn+"-final",On="os-text-inherit",kn=nn+D,Cn=kn+"-track",An=Cn+"-off",Hn=kn+"-handle",Rn=Hn+"-off",Ln=kn+"-unusable",Nn=kn+"-"+me+N,Wn=kn+"-corner",We=Wn+"-resize",De=We+"-both",Me=We+M,Ee=We+E,Dn=kn+M,Mn=kn+E,En="os-dragging",Ie="os-theme-none",In=[He,xn,An,Rn,Ln,Nn,We,De,Me,Ee,En].join(xe),jn=[],Fn=[xi.ti],Pn={},je={},Fe=42,Un="load",Vn=[],$n={},qn=["wrap","cols","rows"],Bn=[xi.i,xi.c,xi.s,"open"].concat(Fn),Xn=[];return St.sleep=function(){$t=!0},St.update=function(n){var t,r,e,i,o;if(!Lt)return cn(n)==mi?n===me?(t=function a(){if(!$t&&!qr){var r,e,i,o=[],n=[{T:Kt,O:Bn.concat(":visible")},{T:Nt?Yt:hi,O:qn}];return d(n,function(n,t){(r=t.T)&&d(t.O,function(n,t){e=":"===t.charAt(0)?r.is(t):r.attr(t),i=$n[t],ui(e,i)&&o.push(t),$n[t]=e})}),it(o),0<o[xi.l]}}(),r=function f(){if($t)return!1;var n,t,r,e,i=oi(),o=Nt&&br&&!jr?Yt.val().length:0,a=!qr&&br&&!Nt,u={};return a&&(n=nr.css(be),u[be]=Vt?ce:le,u[he]=me,nr.css(u)),e={w:i[xi.sW]+o,h:i[xi.sH]+o},a&&(u[be]=n,u[he]=we,nr.css(u)),t=qe(),r=ui(e,m),m=e,r||t}(),(e=t||r)&&Xe({k:r,C:Rt?hi:qt})):n===hn?qr?(i=T(S.takeRecords()),o=O(z.takeRecords())):i=St.update(me):"zoom"===n&&Xe({A:!0,k:!0}):(n=$t||n,$t=!1,St.update(hn)&&!n||Xe({H:n})),Ye(),e||i||o},St.options=function(n,t){var r,e={};if(Ci.isEmptyObject(n)||!Ci.isPlainObject(n)){if(cn(n)!=mi)return a;if(!(1<arguments.length))return bt(a,n);!function f(n,t,r){for(var e=t.split(W),i=e.length,o=0,a={},u=a;o<i;o++)a=a[e[o]]=o+1<i?{}:r;Ci.extend(n,u,!0)}(e,n,t),r=ot(e)}else r=ot(n);Ci.isEmptyObject(r)||Xe({C:r})},St.destroy=function(){if(!Lt){for(var n in _t.remove(St),Ve(),Pe(Jt),Pe(Gt),Pn)St.removeExt(n);for(;0<Xn[xi.l];)Xn.pop()();$e(!0),rr&&mt(rr),tr&&mt(tr),Mt&&mt(Gt),ft(!0),st(!0),at(!0);for(var t=0;t<Vn[xi.l];t++)Ci(Vn[t]).off(Un,rt);Vn=hi,$t=Lt=!0,Ai(r,0),ti("onDestroyed")}},St.scroll=function(n,t,r,e){if(0===arguments.length||n===hi){var i=Mr&&Vt&&Ot.i,o=Mr&&Vt&&Ot.n,a=vn.R,u=vn.L,f=vn.N;return u=i?1-u:u,a=i?f-a:a,f*=o?-1:1,{position:{x:a*=o?-1:1,y:dn.R},ratio:{x:u,y:dn.L},max:{x:f,y:dn.N},handleOffset:{x:vn.W,y:dn.W},handleLength:{x:vn.D,y:dn.D},handleLengthRatio:{x:vn.M,y:dn.M},trackLength:{x:vn.I,y:dn.I},snappedHandleOffset:{x:vn.j,y:dn.j},isRTL:Vt,isRTLNormalized:Mr}}St.update(hn);var c,s,l,v,d,m,g,h,p,w=Mr,b=[pn,le,"l"],y=[bn,fe,"t"],x=["+=","-=","*=","/="],_=cn(t)==pi,S=_?t.complete:e,z={},T={},O="begin",k="nearest",C="never",A="ifneeded",H=xi.l,R=[pn,bn,"xy","yx"],L=[O,"end","center",k],N=["always",C,A],W=n[xi.hOP]("el"),D=W?n.el:n,M=!!(D instanceof Ci||ki)&&D instanceof ki,E=!M&&dt(D),I=function(){s&&Qe(!0),l&&Qe(!1)},j=cn(S)!=bi?hi:function(){I(),S()};function F(n,t){for(c=0;c<t[H];c++)if(n===t[c])return 1}function P(n,t){var r=n?b:y;if(t=cn(t)==mi||cn(t)==wi?[t,t]:t,Si.isA(t))return n?t[0]:t[1];if(cn(t)==pi)for(c=0;c<r[H];c++)if(r[c]in t)return t[r[c]]}function U(n,t){var r,e,i,o,a=cn(t)==mi,u=n?vn:dn,f=u.R,c=u.N,s=Vt&&n,l=s&&Ot.n&&!w,v="replace",d=eval;if((e=a?(2<t[H]&&(o=t.substr(0,2),-1<sn(o,x)&&(r=o)),t=(t=r?t.substr(2):t)[v](/min/g,0)[v](/</g,0)[v](/max/g,(l?"-":ye)+we)[v](/>/g,(l?"-":ye)+we)[v](/px/g,ye)[v](/%/g," * "+c*(s&&Ot.n?-1:1)/100)[v](/vw/g," * "+ee.w)[v](/vh/g," * "+ee.h),ii(isNaN(t)?ii(d(t),!0).toFixed():t)):t)!==hi&&!isNaN(e)&&cn(e)==wi){var h=w&&s,p=f*(h&&Ot.n?-1:1),b=h&&Ot.i,y=h&&Ot.n;switch(p=b?c-p:p,r){case"+=":i=p+e;break;case"-=":i=p-e;break;case"*=":i=p*e;break;case"/=":i=p/e;break;default:i=e}i=b?c-i:i,i*=y?-1:1,i=s&&Ot.n?Oi.min(0,Oi.max(c,i)):Oi.max(0,Oi.min(c,i))}return i===f?hi:i}function V(n,t,r,e){var i,o,a=[r,r],u=cn(n);if(u==t)n=[n,n];else if(u==yi){if(2<(i=n[H])||i<1)n=a;else for(1===i&&(n[1]=r),c=0;c<i;c++)if(o=n[c],cn(o)!=t||!F(o,e)){n=a;break}}else n=u==pi?[n[pn]||r,n[bn]||r]:a;return{x:n[0],y:n[1]}}function $(n){var t,r,e=[],i=[fe,ce,se,le];for(c=0;c<n[H]&&c!==i[H];c++)t=n[c],(r=cn(t))==gi?e.push(t?ii(p.css(oe+i[c])):0):e.push(r==wi?t:0);return e}if(M||E){var q,B=W?n.margin:0,X=W?n.axis:0,Y=W?n.scroll:0,K=W?n.block:0,G=[0,0,0,0],J=cn(B);if(0<(p=M?D:Ci(D))[H]){B=J==wi||J==gi?$([B,B,B,B]):J==yi?2===(q=B[H])?$([B[0],B[1],B[0],B[1]]):4<=q?$(B):G:J==pi?$([B[fe],B[ce],B[se],B[le]]):G,d=F(X,R)?X:"xy",m=V(Y,mi,"always",N),g=V(K,mi,O,L),h=B;var Q=vn.R,Z=dn.R,nn=Qt.offset(),tn=p.offset(),rn={x:m.x==C||d==bn,y:m.y==C||d==pn};tn[fe]-=h[0],tn[le]-=h[3];var en={x:Oi.round(tn[le]-nn[le]+Q),y:Oi.round(tn[fe]-nn[fe]+Z)};if(Vt&&(Ot.n||Ot.i||(en.x=Oi.round(nn[le]-tn[le]+Q)),Ot.n&&w&&(en.x*=-1),Ot.i&&w&&(en.x=Oi.round(nn[le]-tn[le]+(vn.N-Q)))),g.x!=O||g.y!=O||m.x==A||m.y==A||Vt){var on=p[0],an=ln?on[xi.bCR]():{width:on[xi.oW],height:on[xi.oH]},un={w:an[he]+h[3]+h[1],h:an[pe]+h[0]+h[2]},fn=function(n){var t=ni(n),r=t.F,e=t.P,i=t.U,o=g[i]==(n&&Vt?O:"end"),a="center"==g[i],u=g[i]==k,f=m[i]==C,c=m[i]==A,s=ee[r],l=nn[e],v=un[r],d=tn[e],h=a?2:1,p=d+v/2,b=l+s/2,y=v<=s&&l<=d&&d+v<=l+s;f?rn[i]=!0:rn[i]||((u||c)&&(rn[i]=c&&y,o=v<s?b<p:p<b),en[i]-=o||a?(s/h-v/h)*(n&&Vt&&w?-1:1):0)};fn(!0),fn(!1)}rn.y&&delete en.y,rn.x&&delete en.x,n=en}}z[_e]=U(!0,P(!0,n)),z[Se]=U(!1,P(!1,n)),s=z[_e]!==hi,l=z[Se]!==hi,(s||l)&&(0<t||_)?_?(t.complete=j,Zt.animate(z,t)):(v={duration:t,complete:j},Si.isA(r)||Ci.isPlainObject(r)?(T[_e]=r[0]||r.x,T[Se]=r[1]||r.y,v.specialEasing=T):v.easing=r,Zt.animate(z,v)):(s&&Zt[_e](z[_e]),l&&Zt[Se](z[Se]),I())},St.scrollStop=function(n,t,r){return Zt.stop(n,t,r),St},St.getElements=function(n){var t={target:or,host:ar,padding:fr,viewport:cr,content:sr,scrollbarHorizontal:{scrollbar:f[0],track:s[0],handle:l[0]},scrollbarVertical:{scrollbar:v[0],track:b[0],handle:y[0]},scrollbarCorner:ir[0]};return cn(n)==mi?bt(t,n):t},St.getState=function(n){function t(n){if(!Ci.isPlainObject(n))return n;var r=fi({},n),t=function(n,t){r[xi.hOP](n)&&(r[t]=r[n],delete r[n])};return t("w",he),t("h",pe),delete r.c,r}var r={destroyed:!!t(Lt),sleeping:!!t($t),autoUpdate:t(!qr),widthAuto:t(br),heightAuto:t(yr),padding:t(gr),overflowAmount:t(kr),hideOverflow:t(pr),hasOverflow:t(hr),contentScrollSize:t(vr),viewportSize:t(ee),hostSize:t(lr),documentMixed:t(w)};return cn(n)==mi?bt(r,n):r},St.ext=function(n){var t,r="added removed on contract".split(" "),e=0;if(cn(n)==mi){if(Pn[xi.hOP](n))for(t=fi({},Pn[n]);e<r.length;e++)delete t[r[e]]}else for(e in t={},Pn)t[e]=fi({},St.ext(e));return t},St.addExt=function(n,t){var r,e,i,o,a=zi.extension(n),u=!0;if(a){if(Pn[xi.hOP](n))return St.ext(n);if((r=a.extensionFactory.call(St,fi({},a.defaultOptions),Ci,Si))&&(i=r.contract,cn(i)==bi&&(o=i(vi),u=cn(o)==gi?o:u),u))return e=(Pn[n]=r).added,cn(e)==bi&&e(t),St.ext(n)}else console.warn('A extension with the name "'+n+"\" isn't registered.")},St.removeExt=function(n){var t,r=Pn[n];return!!r&&(delete Pn[n],t=r.removed,cn(t)==bi&&t(),!0)},zi.valid(function wt(n,t,r){var e,i;return o=xt.defaultOptions,Ct=xt.nativeScrollbarStyling,Ht=fi({},xt.nativeScrollbarSize),zt=fi({},xt.nativeScrollbarIsOverlaid),Tt=fi({},xt.overlayScrollbarDummySize),Ot=fi({},xt.rtlScrollBehavior),ot(fi({},o,t)),At=xt.cssCalc,I=xt.msie,kt=xt.autoUpdateRecommended,j=xt.supportTransition,ln=xt.supportTransform,g=xt.supportPassiveEvents,A=xt.supportResizeObserver,h=xt.supportMutationObserver,xt.restrictedMeasuring,F=Ci(n.ownerDocument),H=F[0],u=Ci(H.defaultView||H.parentWindow),x=u[0],c=gt(F,"html"),P=gt(c,"body"),Yt=Ci(n),or=Yt[0],Nt=Yt.is("textarea"),Wt=Yt.is("body"),w=H!==di,p=Nt?Yt.hasClass(yn)&&Yt.parent().hasClass(_n):Yt.hasClass(rn)&&Yt.children(W+gn)[xi.l],zt.x&&zt.y&&!qt.nativeScrollbarsOverlaid.initialize?(ti("onInitializationWithdrawn"),p&&(at(!0),ft(!0),st(!0)),$t=Lt=!0):(Wt&&((e={}).l=Oi.max(Yt[_e](),c[_e](),u[_e]()),e.t=Oi.max(Yt[Se](),c[Se](),u[Se]()),i=function(){Zt.removeAttr(xi.ti),Yn(Zt,$,i,!0,!0)}),at(),ft(),st(),ut(),ct(!0),ct(!1),function s(){var r,t=x.top!==x,e={},i={},o={};function a(n){if(f(n)){var t=c(n),r={};(ne||Zr)&&(r[he]=i.w+(t.x-e.x)*o.x),(te||Zr)&&(r[pe]=i.h+(t.y-e.y)*o.y),Kt.css(r),Si.stpP(n)}else u(n)}function u(n){var t=n!==hi;Yn(F,[J,B,q],[tt,a,u],!0),si(P,En),ir.releaseCapture&&ir.releaseCapture(),t&&(r&&Ue(),St.update(me)),r=!1}function f(n){var t=(n.originalEvent||n).touches!==hi;return!$t&&!Lt&&(1===Si.mBtn(n)||t)}function c(n){return I&&t?{x:n.screenX,y:n.screenY}:Si.page(n)}Kn(ir,$,function(n){f(n)&&!Qr&&(qr&&(r=!0,Ve()),e=c(n),i.w=ar[xi.oW]-(Dt?0:Et),i.h=ar[xi.oH]-(Dt?0:It),o=vt(),Yn(F,[J,B,q],[tt,a,u]),ci(P,En),ir.setCapture&&ir.setCapture(),Si.prvD(n),Si.stpP(n))})}(),Gn(),Pe(Jt,Jn),Wt&&(Zt[_e](e.l)[Se](e.t),di.activeElement==n&&cr.focus&&(Zt.attr(xi.ti,"-1"),cr.focus(),Yn(Zt,$,i,!1,!0))),St.update(me),Rt=!0,ti("onInitialized"),d(jn,function(n,t){ti(t.n,t.a)}),jn=[],cn(r)==mi&&(r=[r]),Si.isA(r)?d(r,function(n,t){St.addExt(t)}):Ci.isPlainObject(r)&&d(r,function(n,t){St.addExt(n,t)}),setTimeout(function(){j&&!Lt&&ci(Kt,fn)},333)),St}(r,n,t))&&Ai(r,St),St}function Yn(n,t,r,e,i){var o=Si.isA(t)&&Si.isA(r),a=e?"removeEventListener":"addEventListener",u=e?"off":"on",f=!o&&t.split(xe),c=0,s=Ci.isPlainObject(i),l=g&&(s?i.V:i)||!1,v=s&&(i.$||!1),d=g?{passive:l,capture:v}:v;if(o)for(;c<t[xi.l];c++)Yn(n,t[c],r[c],e,i);else for(;c<f[xi.l];c++)g?n[0][a](f[c],r,d):n[u](f[c],r)}function Kn(n,t,r,e){Yn(n,t,r,!1,e),Xn.push(Si.bind(Yn,0,n,t,r,!0,e))}function Pe(n,t){if(n){var r=Si.rO(),e="animationstart mozAnimationStart webkitAnimationStart MSAnimationStart",i="childNodes",o=3333333,a=function(){n[Se](o)[_e](Vt?Ot.n?-o:Ot.i?0:o:o),t()};if(t){if(A)((k=n.addClass("observed").append(ai(Sn)).contents()[0])[Z]=new r(a)).observe(k);else if(9<I||!kt){n.prepend(ai(Sn,ai({c:zn,dir:"ltr"},ai(zn,ai(Tn))+ai(zn,ai({c:Tn,style:"width: 200%; height: 200%"})))));var u,f,c,s,l=n[0][i][0][i][0],v=Ci(l[i][1]),d=Ci(l[i][0]),h=Ci(d[0][i][0]),p=l[xi.oW],b=l[xi.oH],y=xt.nativeScrollbarSize,m=function(){d[_e](o)[Se](o),v[_e](o)[Se](o)},g=function(){f=0,u&&(p=c,b=s,a())},w=function(n){return c=l[xi.oW],s=l[xi.oH],u=c!=p||s!=b,n&&u&&!f?(Si.cAF()(f),f=Si.rAF()(g)):n||g(),m(),n&&(Si.prvD(n),Si.stpP(n)),!1},x={},_={};ri(_,ye,[-2*(y.y+1),-2*y.x,-2*y.y,-2*(y.x+1)]),Ci(l).css(_),d.on(ge,w),v.on(ge,w),n.on(e,function(){w(!1)}),x[he]=o,x[pe]=o,h.css(x),m()}else{var S=H.attachEvent,z=I!==hi;if(S)n.prepend(ai(Sn)),gt(n,W+Sn)[0].attachEvent("onresize",a);else{var T=H.createElement(pi);T.setAttribute(xi.ti,"-1"),T.setAttribute(xi.c,Sn),T.onload=function(){var n=this.contentDocument.defaultView;n.addEventListener("resize",a),n.document.documentElement.style.display="none"},T.type="text/html",z&&n.prepend(T),T.data="about:blank",z||n.prepend(T),n.on(e,a)}}if(n[0]===R){var O=function(){var n=Kt.css("direction"),t={},r=0,e=!1;return n!==L&&(r="ltr"===n?(t[le]=0,t[ce]=me,o):(t[le]=me,t[ce]=0,Ot.n?-o:Ot.i?0:o),Jt.children().eq(0).css(t),Jt[_e](r)[Se](o),L=n,e=!0),e};O(),Kn(n,ge,function(n){return O()&&Xe(),Si.prvD(n),Si.stpP(n),!1})}}else if(A){var k,C=(k=n.contents()[0])[Z];C&&(C.disconnect(),delete k[Z])}else mt(n.children(W+Sn).eq(0))}}function Gn(){if(h){var o,a,u,f,c,s,r,e,i,l,n=Si.mO(),v=Si.now();O=function(n){var t=!1;return Rt&&!$t&&(d(n,function(){return!(t=function o(n){var t=n.attributeName,r=n.target,e=n.type,i="closest";if(r===sr)return null===t;if("attributes"===e&&(t===xi.c||t===xi.s)&&!Nt){if(t===xi.c&&Ci(r).hasClass(rn))return et(n.oldValue,r.className);if(typeof r[i]!=bi)return!0;if(null!==r[i](W+Sn)||null!==r[i](W+kn)||null!==r[i](W+Wn))return!1}return!0}(this))}),t&&(e=Si.now(),i=yr||br,l=function(){Lt||(v=e,Nt&&Be(),i?Xe():St.update(me))},clearTimeout(r),11<e-v||!i?l():r=setTimeout(l,11))),t},S=new n(T=function(n){var t,r=!1,e=!1,i=[];return Rt&&!$t&&(d(n,function(){o=(t=this).target,a=t.attributeName,u=a===xi.c,f=t.oldValue,c=o.className,p&&u&&!e&&-1<f.indexOf(en)&&c.indexOf(en)<0&&(s=lt(!0),ar.className=c.split(xe).concat(f.split(xe).filter(function(n){return n.match(s)})).join(xe),r=e=!0),r=r||(u?et(f,c):a!==xi.s||f!==o[xi.s].cssText),i.push(a)}),it(i),r&&St.update(e||me)),r}),z=new n(O)}}function Ue(){h&&!qr&&(S.observe(ar,{attributes:!0,attributeOldValue:!0,attributeFilter:Bn}),z.observe(Nt?or:sr,{attributes:!0,attributeOldValue:!0,subtree:!Nt,childList:!Nt,characterData:!Nt,attributeFilter:Nt?qn:Bn}),qr=!0)}function Ve(){h&&qr&&(S.disconnect(),z.disconnect(),qr=!1)}function Jn(){if(!$t){var n,t={w:R[xi.sW],h:R[xi.sH]};n=ui(t,_),_=t,n&&Xe({A:!0})}}function Qn(){Jr&&Ge(!0)}function Zn(){Jr&&!P.hasClass(En)&&Ge(!1)}function nt(){Gr&&(Ge(!0),clearTimeout(C),C=setTimeout(function(){Gr&&!Lt&&Ge(!1)},100))}function tt(n){return Si.prvD(n),!1}function rt(n){var r=Ci(n.target);yt(function(n,t){r.is(t)&&Xe({k:!0})})}function $e(n){n||$e(!0),Yn(Kt,B.split(xe)[0],nt,!Gr||n,!0),Yn(Kt,[X,Y],[Qn,Zn],!Jr||n,!0),Rt||n||Kt.one("mouseover",Qn)}function qe(){var n={};return Wt&&tr&&(n.w=ii(tr.css(ve+he)),n.h=ii(tr.css(ve+pe)),n.c=ui(n,$r),n.f=!0),!!($r=n).c}function et(n,t){var r,e,i=typeof t==mi?t.split(xe):[],o=function u(n,t){var r,e,i=[],o=[];for(r=0;r<n.length;r++)i[n[r]]=!0;for(r=0;r<t.length;r++)i[t[r]]?delete i[t[r]]:i[t[r]]=!0;for(e in i)o.push(e);return o}(typeof n==mi?n.split(xe):[],i),a=sn(Ie,o);if(-1<a&&o.splice(a,1),0<o[xi.l])for(e=lt(!0,!0),r=0;r<o.length;r++)if(!o[r].match(e))return!0;return!1}function it(n){d(n=n||Fn,function(n,t){if(-1<Si.inA(t,Fn)){var r=Yt.attr(t);cn(r)==mi?Zt.attr(t,r):Zt.removeAttr(t)}})}function Be(){if(!$t){var n,t,r,e,i=!jr,o=ee.w,a=ee.h,u={},f=br||i;return u[ve+he]=ye,u[ve+pe]=ye,u[he]=me,Yt.css(u),n=or[xi.oW],t=f?Oi.max(n,or[xi.sW]-1):1,u[he]=br?me:we,u[ve+he]=we,u[pe]=me,Yt.css(u),r=or[xi.oH],e=Oi.max(r,or[xi.sH]-1),u[he]=t,u[pe]=e,er.css(u),u[ve+he]=o,u[ve+pe]=a,Yt.css(u),{q:n,B:r,X:t,Y:e}}}function Xe(n){clearTimeout(Xt),n=n||{},je.A|=n.A,je.k|=n.k,je.H|=n.H;var t,r=Si.now(),e=!!je.A,i=!!je.k,o=!!je.H,a=n.C,u=0<Fe&&Rt&&!Lt&&!o&&!a&&r-Bt<Fe&&!yr&&!br;if(u&&(Xt=setTimeout(Xe,Fe)),!(Lt||u||$t&&!a||Rt&&!o&&(t=Kt.is(":hidden"))||"inline"===Kt.css("display"))){Bt=r,je={},!Ct||zt.x&&zt.y?Ht=fi({},xt.nativeScrollbarSize):(Ht.x=0,Ht.y=0),ie={x:3*(Ht.x+(zt.x?0:3)),y:3*(Ht.y+(zt.y?0:3))},a=a||{};var f=function(){return ui.apply(this,[].slice.call(arguments).concat([o]))},c={x:Zt[_e](),y:Zt[Se]()},s=qt.scrollbars,l=qt.textarea,v=s.visibility,d=f(v,Rr),h=s.autoHide,p=f(h,Lr),b=s.clickScrolling,y=f(b,Nr),m=s.dragScrolling,g=f(m,Wr),w=qt.className,x=f(w,Er),_=qt.resize,S=f(_,Dr)&&!Wt,z=qt.paddingAbsolute,T=f(z,Sr),O=qt.clipAlways,k=f(O,zr),C=qt.sizeAutoCapable&&!Wt,A=f(C,Hr),H=qt.nativeScrollbarsOverlaid.showNativeScrollbars,R=f(H,Cr),L=qt.autoUpdate,N=f(L,Ar),W=qt.overflowBehavior,D=f(W,Or,o),M=l.dynWidth,E=f(Vr,M),I=l.dynHeight,j=f(Ur,I);if(Yr="n"===h,Kr="s"===h,Gr="m"===h,Jr="l"===h,Xr=s.autoHideDelay,Ir=Er,Qr="n"===_,Zr="b"===_,ne="h"===_,te="v"===_,Mr=qt.normalizeRTL,H=H&&zt.x&&zt.y,Rr=v,Lr=h,Nr=b,Wr=m,Er=w,Dr=_,Sr=z,zr=O,Hr=C,Cr=H,Ar=L,Or=fi({},W),Vr=M,Ur=I,hr=hr||{x:!1,y:!1},x&&(si(Kt,Ir+xe+Ie),ci(Kt,w!==hi&&null!==w&&0<w.length?w:Ie)),N&&(!0===L||null===L&&kt?(Ve(),_t.add(St)):(_t.remove(St),Ue())),A)if(C)if(rr?rr.show():(rr=Ci(ai(Le)),Qt.before(rr)),Mt)Gt.show();else{Gt=Ci(ai(Ne)),ur=Gt[0],rr.before(Gt);var F={w:-1,h:-1};Pe(Gt,function(){var n={w:ur[xi.oW],h:ur[xi.oH]};ui(n,F)&&(Rt&&yr&&0<n.h||br&&0<n.w||Rt&&!yr&&0===n.h||!br&&0===n.w)&&Xe(),F=n}),Mt=!0,null!==At&&Gt.css(pe,At+"(100% + 1px)")}else Mt&&Gt.hide(),rr&&rr.hide();o&&(Jt.find("*").trigger(ge),Mt&&Gt.find("*").trigger(ge)),t=t===hi?Kt.is(":hidden"):t;var P,U=!!Nt&&"off"!==Yt.attr("wrap"),V=f(U,jr),$=Kt.css("direction"),q=f($,_r),B=Kt.css("box-sizing"),X=f(B,mr),Y=ei(ae);try{P=Mt?ur[xi.bCR]():null}catch(gt){return}Dt="border-box"===B;var K=(Vt="rtl"===$)?le:ce,G=Vt?ce:le,J=!1,Q=!(!Mt||"none"===Kt.css(be))&&(0===Oi.round(P.right-P.left)&&(!!z||0<ar[xi.cW]-Et));if(C&&!Q){var Z=ar[xi.oW],nn=rr.css(he);rr.css(he,me);var tn=ar[xi.oW];rr.css(he,nn),(J=Z!==tn)||(rr.css(he,Z+1),tn=ar[xi.oW],rr.css(he,nn),J=Z!==tn)}var rn=(Q||J)&&C&&!t,en=f(rn,br),on=!rn&&br,an=!(!Mt||!C||t)&&0===Oi.round(P.bottom-P.top),un=f(an,yr),fn=!an&&yr,cn=ei(ue,"-"+he,!(rn&&Dt||!Dt),!(an&&Dt||!Dt)),sn=ei(oe),ln={},vn={},dn=function(){return{w:ar[xi.cW],h:ar[xi.cH]}},hn=function(){return{w:fr[xi.oW]+Oi.max(0,sr[xi.cW]-sr[xi.sW]),h:fr[xi.oH]+Oi.max(0,sr[xi.cH]-sr[xi.sH])}},pn=Et=Y.l+Y.r,bn=It=Y.t+Y.b;if(pn*=z?1:0,bn*=z?1:0,Y.c=f(Y,gr),jt=cn.l+cn.r,Ft=cn.t+cn.b,cn.c=f(cn,wr),Pt=sn.l+sn.r,Ut=sn.t+sn.b,sn.c=f(sn,xr),jr=U,_r=$,mr=B,br=rn,yr=an,gr=Y,wr=cn,xr=sn,q&&Mt&&Gt.css(be,G),Y.c||q||T||en||un||X||A){var yn={},mn={},gn=[Y.t,Y.r,Y.b,Y.l];ri(vn,oe,[-Y.t,-Y.r,-Y.b,-Y.l]),z?(ri(yn,ye,gn),ri(Nt?mn:ln,ae)):(ri(yn,ye),ri(Nt?mn:ln,ae,gn)),Qt.css(yn),Yt.css(mn)}ee=hn();var wn=!!Nt&&Be(),xn=Nt&&f(wn,Pr),_n=Nt&&wn?{w:M?wn.X:wn.q,h:I?wn.Y:wn.B}:{};if(Pr=wn,an&&(un||T||X||Y.c||cn.c)?ln[pe]=me:(un||T)&&(ln[pe]=we),rn&&(en||T||X||Y.c||cn.c||q)?(ln[he]=me,vn[de+he]=we):(en||T)&&(ln[he]=we,ln[be]=ye,vn[de+he]=ye),rn?(vn[he]=me,ln[he]=_i.v(he,"max-content intrinsic")||me,ln[be]=G):vn[he]=ye,vn[pe]=an?_n.h||sr[xi.cH]:ye,C&&rr.css(vn),nr.css(ln),ln={},vn={},e||i||xn||q||X||T||en||rn||un||an||R||D||k||S||d||p||g||y||E||j||V){var Sn="overflow",zn=Sn+"-x",Tn=Sn+"-y";if(!Ct){var On={},kn=hr.y&&pr.ys&&!H?zt.y?Zt.css(K):-Ht.y:0,Cn=hr.x&&pr.xs&&!H?zt.x?Zt.css(se):-Ht.x:0;ri(On,ye),Zt.css(On)}var An=oi(),Hn={w:_n.w||An[xi.cW],h:_n.h||An[xi.cH]},Rn=An[xi.sW],Ln=An[xi.sH];Ct||(On[se]=fn?ye:Cn,On[K]=on?ye:kn,Zt.css(On)),ee=hn();var Nn=dn(),Wn={w:Nn.w-Pt-jt-(Dt?0:Et),h:Nn.h-Ut-Ft-(Dt?0:It)},Dn={w:Oi.max((rn?Hn.w:Rn)+pn,Wn.w),h:Oi.max((an?Hn.h:Ln)+bn,Wn.h)};if(Dn.c=f(Dn,Tr),Tr=Dn,C){(Dn.c||an||rn)&&(vn[he]=Dn.w,vn[pe]=Dn.h,Nt||(Hn={w:An[xi.cW],h:An[xi.cH]}));var Mn={},En=function(n){var t=ni(n),r=t.F,e=t.K,i=n?rn:an,o=n?jt:Ft,a=n?Et:It,u=n?Pt:Ut,f=ee[r]-o-u-(Dt?0:a);i&&(i||!cn.c)||(vn[e]=Wn[r]-1),!(i&&Hn[r]<f)||n&&Nt&&U||(Nt&&(Mn[e]=ii(er.css(e))-1),--vn[e]),0<Hn[r]&&(vn[e]=Oi.max(1,vn[e]))};En(!0),En(!1),Nt&&er.css(Mn),rr.css(vn)}rn&&(ln[he]=we),!rn||Dt||qr||(ln[be]="none"),nr.css(ln),ln={};var In={w:An[xi.sW],h:An[xi.sH]};In.c=i=f(In,vr),vr=In,ee=hn(),e=f(Nn=dn(),lr),lr=Nn;var jn=Nt&&(0===ee.w||0===ee.h),Fn=kr,Pn={},Un={},Vn={},$n={},qn={},Bn={},Xn={},Yn=fr[xi.bCR](),Kn=function(n){var t=ni(n),r=ni(!n).U,e=t.U,i=t.F,o=t.K,a=ge+t.G+"Max",u=Yn[o]?Oi.abs(Yn[o]-ee[i]):0,f=Fn&&0<Fn[e]&&0===cr[a];Pn[e]="v-s"===W[e],Un[e]="v-h"===W[e],Vn[e]="s"===W[e],$n[e]=Oi.max(0,Oi.round(100*(In[i]-ee[i]))/100),$n[e]*=jn||f&&0<u&&u<1?0:1,qn[e]=0<$n[e],Bn[e]=Pn[e]||Un[e]?qn[r]&&!Pn[r]&&!Un[r]:qn[e],Bn[e+"s"]=!!Bn[e]&&(Vn[e]||Pn[e]),Xn[e]=qn[e]&&Bn[e+"s"]};if(Kn(!0),Kn(!1),$n.c=f($n,kr),kr=$n,qn.c=f(qn,hr),hr=qn,Bn.c=f(Bn,pr),pr=Bn,zt.x||zt.y){var Gn,Jn={},Qn={},Zn=o;(qn.x||qn.y)&&(Qn.w=zt.y&&qn.y?In.w+Tt.y:ye,Qn.h=zt.x&&qn.x?In.h+Tt.x:ye,Zn=f(Qn,dr),dr=Qn),(qn.c||Bn.c||In.c||q||en||un||rn||an||R)&&(ln[oe+G]=ln[ue+G]=ye,Gn=function(n){var t=ni(n),r=ni(!n),e=t.U,i=n?se:K,o=n?an:rn;zt[e]&&qn[e]&&Bn[e+"s"]?(ln[oe+i]=!o||H?ye:Tt[e],ln[ue+i]=n&&o||H?ye:Tt[e]+"px solid transparent"):(Qn[r.F]=ln[oe+i]=ln[ue+i]=ye,Zn=!0)},Ct?li(Zt,He,!H):(Gn(!0),Gn(!1))),H&&(Qn.w=Qn.h=ye,Zn=!0),Zn&&!Ct&&(Jn[he]=Bn.y?Qn.w:ye,Jn[pe]=Bn.x?Qn.h:ye,tr||(tr=Ci(ai(Re)),Zt.prepend(tr)),tr.css(Jn)),nr.css(ln)}var nt,tt={};yn={};if((e||qn.c||Bn.c||In.c||D||X||R||q||k||un)&&(tt[G]=ye,(nt=function(n){var t=ni(n),r=ni(!n),e=t.U,i=t.J,o=n?se:K,a=function(){tt[o]=ye,re[r.F]=0};qn[e]&&Bn[e+"s"]?(tt[Sn+i]=ge,H||Ct?a():(tt[o]=-(zt[e]?Tt[e]:Ht[e]),re[r.F]=zt[e]?Tt[r.U]:0)):(tt[Sn+i]=ye,a())})(!0),nt(!1),!Ct&&(ee.h<ie.x||ee.w<ie.y)&&(qn.x&&Bn.x&&!zt.x||qn.y&&Bn.y&&!zt.y)?(tt[ae+fe]=ie.x,tt[oe+fe]=-ie.x,tt[ae+G]=ie.y,tt[oe+G]=-ie.y):tt[ae+fe]=tt[oe+fe]=tt[ae+G]=tt[oe+G]=ye,tt[ae+K]=tt[oe+K]=ye,qn.x&&Bn.x||qn.y&&Bn.y||jn?Nt&&jn&&(yn[zn]=yn[Tn]="hidden"):(!O||Un.x||Pn.x||Un.y||Pn.y)&&(Nt&&(yn[zn]=yn[Tn]=ye),tt[zn]=tt[Tn]="visible"),Qt.css(yn),Zt.css(tt),tt={},(qn.c||X||en||un)&&(!zt.x||!zt.y))){var rt=sr[xi.s];rt.webkitTransform="scale(1)",rt.display="run-in",sr[xi.oH],rt.display=ye,rt.webkitTransform=ye}if(ln={},q||en||un)if(Vt&&rn){var et=nr.css(be),it=Oi.round(nr.css(be,ye).css(le,ye).position().left);nr.css(be,et),it!==Oi.round(nr.position().left)&&(ln[le]=it)}else ln[le]=ye;if(nr.css(ln),Nt&&i){var ot=function wt(){var n=or.selectionStart;if(n===hi)return;var t,r,e=Yt.val(),i=e[xi.l],o=e.split("\n"),a=o[xi.l],u=e.substr(0,n).split("\n"),f=0,c=0,s=u[xi.l],l=u[u[xi.l]-1][xi.l];for(r=0;r<o[xi.l];r++)t=o[r][xi.l],c<t&&(f=r+1,c=t);return{Q:s,Z:l,nn:a,tn:c,rn:f,en:n,"in":i}}();if(ot){var at=Fr===hi||ot.nn!==Fr.nn,ut=ot.Q,ft=ot.Z,ct=ot.rn,st=ot.nn,lt=ot.tn,vt=ot.en,dt=ot["in"]<=vt&&Br,ht={x:U||ft!==lt||ut!==ct?-1:kr.x,y:(U?dt||at&&Fn&&c.y===Fn.y:(dt||at)&&ut===st)?kr.y:-1};c.x=-1<ht.x?Vt&&Mr&&Ot.i?0:ht.x:c.x,c.y=-1<ht.y?ht.y:c.y}Fr=ot}Vt&&Ot.i&&zt.y&&qn.x&&Mr&&(c.x+=re.w||0),rn&&Kt[_e](0),an&&Kt[Se](0),Zt[_e](c.x)[Se](c.y);var pt="v"===v,bt="h"===v,yt="a"===v,mt=function(n,t){t=t===hi?n:t,Ke(!0,n,Xn.x),Ke(!1,t,Xn.y)};li(Kt,ke,Bn.x||Bn.y),li(Kt,Ce,Bn.x),li(Kt,Ae,Bn.y),q&&!Wt&&li(Kt,ze,Vt),Wt&&ci(Kt,Te),S&&(li(Kt,Te,Qr),li(ir,We,!Qr),li(ir,De,Zr),li(ir,Me,ne),li(ir,Ee,te)),(d||D||Bn.c||qn.c||R)&&(H?R&&(si(Kt,Oe),H&&mt(!1)):yt?mt(Xn.x,Xn.y):pt?mt(!0):bt&&mt(!1)),(p||R)&&($e(!Jr&&!Gr),Ge(Yr,!Yr)),(e||$n.c||un||en||S||X||T||R||q)&&(Je(!0),Qe(!0),Je(!1),Qe(!1)),y&&Ze(!0,b),g&&Ze(!1,m),ti("onDirectionChanged",{isRTL:Vt,dir:$},q),ti("onHostSizeChanged",{width:lr.w,height:lr.h},e),ti("onContentSizeChanged",{width:vr.w,height:vr.h},i),ti("onOverflowChanged",{x:qn.x,y:qn.y,xScrollable:Bn.xs,yScrollable:Bn.ys,clipped:Bn.x||Bn.y},qn.c||Bn.c),ti("onOverflowAmountChanged",{x:$n.x,y:$n.y},$n.c)}Wt&&$r&&(hr.c||$r.c)&&($r.f||qe(),zt.y&&hr.x&&nr.css(ve+he,$r.w+Tt.y),zt.x&&hr.y&&nr.css(ve+pe,$r.h+Tt.x),$r.c=!1),Rt&&a.updateOnLoad&&Ye(),ti("onUpdated",{forced:o})}}function Ye(){Nt||yt(function(n,t){nr.find(t).each(function(n,t){Si.inA(t,Vn)<0&&(Vn.push(t),Ci(t).off(Un,rt).on(Un,rt))})})}function ot(n){var t=Ti._(n,Ti.g,!0,a);return a=fi({},a,t.S),qt=fi({},qt,t.z),t.z}function at(e){var n="parent",t=yn+xe+On,r=Nt?xe+On:ye,i=qt.textarea.inheritedAttrs,o={},a=function(){var r=e?Yt:Kt;d(o,function(n,t){cn(t)==mi&&(n==xi.c?r.addClass(t):r.attr(n,t))})},u=[rn,en,on,Te,ze,an,un,fn,Oe,ke,Ce,Ae,Ie,yn,On,Er].join(xe),f={};Kt=Kt||(Nt?p?Yt[n]()[n]()[n]()[n]():Ci(ai(on)):Yt),nr=nr||pt(_n+r),Zt=Zt||pt(wn+r),Qt=Qt||pt(gn+r),Jt=Jt||pt("os-resize-observer-host"),er=er||(Nt?pt(mn):hi),p&&ci(Kt,en),e&&si(Kt,u),i=cn(i)==mi?i.split(xe):i,Si.isA(i)&&Nt&&d(i,function(n,t){cn(t)==mi&&(o[t]=e?Kt.attr(t):Yt.attr(t))}),e?(p&&Rt?(Jt.children().remove(),d([Qt,Zt,nr,er],function(n,t){t&&si(t.removeAttr(xi.s),In)}),ci(Kt,Nt?on:rn)):(mt(Jt),nr.contents().unwrap().unwrap().unwrap(),Nt&&(Yt.unwrap(),mt(Kt),mt(er),a())),Nt&&Yt.removeAttr(xi.s),Wt&&si(c,tn)):(Nt&&(qt.sizeAutoCapable||(f[he]=Yt.css(he),f[pe]=Yt.css(pe)),p||Yt.addClass(On).wrap(Kt),Kt=Yt[n]().css(f)),p||(ci(Yt,Nt?t:rn),Kt.wrapInner(nr).wrapInner(Zt).wrapInner(Qt).prepend(Jt),nr=gt(Kt,W+_n),Zt=gt(Kt,W+wn),Qt=gt(Kt,W+gn),Nt&&(nr.prepend(er),a())),Ct&&ci(Zt,He),zt.x&&zt.y&&ci(Zt,xn),Wt&&ci(c,tn),R=Jt[0],ar=Kt[0],fr=Qt[0],cr=Zt[0],sr=nr[0],it())}function ut(){var r,t,e=[112,113,114,115,116,117,118,119,120,121,123,33,34,37,38,39,40,16,17,18,19,20,144],i=[],n="focus";function o(n){Be(),St.update(me),n&&kt&&clearInterval(r)}Nt?(9<I||!kt?Kn(Yt,"input",o):Kn(Yt,[K,G],[function a(n){var t=n.keyCode;sn(t,e)<0&&(i[xi.l]||(o(),r=setInterval(o,1e3/60)),sn(t,i)<0&&i.push(t))},function u(n){var t=n.keyCode,r=sn(t,i);sn(t,e)<0&&(-1<r&&i.splice(r,1),i[xi.l]||o(!0))}]),Kn(Yt,[ge,"drop",n,n+"out"],[function f(n){return Yt[_e](Ot.i&&Mr?9999999:0),Yt[Se](0),Si.prvD(n),Si.stpP(n),!1},function c(n){setTimeout(function(){Lt||o()},50)},function s(){Br=!0,ci(Kt,n)},function l(){Br=!1,i=[],si(Kt,n),o(!0)}])):Kn(nr,Q,function v(n){!0!==Ar&&function l(n){if(!Rt)return 1;var t="flex-grow",r="flex-shrink",e="flex-basis",i=[he,ve+he,de+he,oe+le,oe+ce,le,ce,"font-weight","word-spacing",t,r,e],o=[ae+le,ae+ce,ue+le+he,ue+ce+he],a=[pe,ve+pe,de+pe,oe+fe,oe+se,fe,se,"line-height",t,r,e],u=[ae+fe,ae+se,ue+fe+he,ue+se+he],f="s"===Or.x||"v-s"===Or.x,c=!1,s=function(n,t){for(var r=0;r<n[xi.l];r++)if(n[r]===t)return!0;return!1};return("s"===Or.y||"v-s"===Or.y)&&((c=s(a,n))||Dt||(c=s(u,n))),f&&!c&&((c=s(i,n))||Dt||(c=s(o,n))),c}((n=n.originalEvent||n).propertyName)&&St.update(me)}),Kn(Zt,ge,function d(n){$t||(t!==hi?clearTimeout(t):((Kr||Gr)&&Ge(!0),ht()||ci(Kt,Oe),ti("onScrollStart",n)),V||(Qe(!0),Qe(!1)),ti("onScroll",n),t=setTimeout(function(){Lt||(clearTimeout(t),t=hi,(Kr||Gr)&&Ge(!1),ht()||si(Kt,Oe),ti("onScrollStop",n))},175))},!0)}function ft(i){var n,t,o=function(n){var t=pt(kn+xe+(n?Dn:Mn),!0),r=pt(Cn,t),e=pt(Hn,t);return p||i||(t.append(r),r.append(e)),{an:t,un:r,cn:e}};function r(n){var t=ni(n),r=t.an,e=t.un,i=t.cn;p&&Rt?d([r,e,i],function(n,t){si(t.removeAttr(xi.s),In)}):mt(r||o(n).an)}i?(r(!0),r()):(n=o(!0),t=o(),f=n.an,s=n.un,l=n.cn,v=t.an,b=t.un,y=t.cn,p||(Qt.after(v),Qt.after(f)))}function ct(z){var T,i,O,k,e=ni(z),C=e.sn,t=x.top!==x,A=e.U,r=e.J,H=ge+e.G,o="active",a="snapHandle",u="click",R=1,f=[16,17];function c(n){return I&&t?n["screen"+r]:Si.page(n)[A]}function s(n){return qt.scrollbars[n]}function l(){R=.5}function v(){R=1}function d(n){Si.stpP(n)}function L(n){-1<sn(n.keyCode,f)&&l()}function N(n){-1<sn(n.keyCode,f)&&v()}function W(n){var t=(n.originalEvent||n).touches!==hi;return!($t||Lt||ht()||!Wr||t&&!s("touchSupport"))&&(1===Si.mBtn(n)||t)}function h(n){if(W(n)){var t=C.I,r=C.D,e=C.N*((c(n)-O)*k/(t-r));e=isFinite(e)?e:0,Vt&&z&&!Ot.i&&(e*=-1),Zt[H](Oi.round(i+e)),V&&Qe(z,i+e),g||Si.prvD(n)}else D(n)}function D(n){if(n=n||n.originalEvent,Yn(F,[B,q,K,G,J],[h,D,L,N,tt],!0),Si.rAF()(function(){Yn(F,u,d,!0,{$:!0})}),V&&Qe(z,!0),V=!1,si(P,En),si(e.cn,o),si(e.un,o),si(e.an,o),k=1,v(),T!==(O=i=hi)&&(St.scrollStop(),clearTimeout(T),T=hi),n){var t=ar[xi.bCR]();n.clientX>=t.left&&n.clientX<=t.right&&n.clientY>=t.top&&n.clientY<=t.bottom||Zn(),(Kr||Gr)&&Ge(!1)}}function M(n){i=Zt[H](),i=isNaN(i)?0:i,(Vt&&z&&!Ot.n||!Vt)&&(i=i<0?0:i),k=vt()[A],O=c(n),V=!s(a),ci(P,En),ci(e.cn,o),ci(e.an,o),Yn(F,[B,q,J],[h,D,tt]),Si.rAF()(function(){Yn(F,u,d,!1,{$:!0})}),!I&&w||Si.prvD(n),Si.stpP(n)}Kn(e.cn,$,function p(n){W(n)&&M(n)}),Kn(e.un,[$,X,Y],[function E(n){if(W(n)){var d,t=e.sn.D/Math.round(Oi.min(1,ee[e.F]/vr[e.F])*e.sn.I),h=Oi.round(ee[e.F]*t),p=270*t,b=400*t,y=e.un.offset()[e.P],r=n.ctrlKey,m=n.shiftKey,g=m&&r,w=!0,x=function(n){V&&Qe(z,n)},_=function(){x(),M(n)},S=function(){if(!Lt){var n=(O-y)*k,t=C.W,r=C.I,e=C.D,i=C.N,o=C.R,a=p*R,u=w?Oi.max(b,a):a,f=i*((n-e/2)/(r-e)),c=Vt&&z&&(!Ot.i&&!Ot.n||Mr),s=c?t<n:n<t,l={},v={easing:"linear",step:function(n){V&&(Zt[H](n),Qe(z,n))}};f=isFinite(f)?f:0,f=Vt&&z&&!Ot.i?i-f:f,m?(Zt[H](f),g?(f=Zt[H](),Zt[H](o),f=c&&Ot.i?i-f:f,f=c&&Ot.n?-f:f,l[A]=f,St.scroll(l,fi(v,{duration:130,complete:_}))):_()):(d=w?s:d,(c?d?n<=t+e:t<=n:d?t<=n:n<=t+e)?(clearTimeout(T),St.scrollStop(),T=hi,x(!0)):(T=setTimeout(S,u),l[A]=(d?"-=":"+=")+h,St.scroll(l,fi(v,{duration:a}))),w=!1)}};r&&l(),k=vt()[A],O=Si.page(n)[A],V=!s(a),ci(P,En),ci(e.un,o),ci(e.an,o),Yn(F,[q,K,G,J],[D,L,N,tt]),S(),Si.prvD(n),Si.stpP(n)}},function b(n){U=!0,(Kr||Gr)&&Ge(!0)},function y(n){U=!1,(Kr||Gr)&&Ge(!1)}]),Kn(e.an,$,function m(n){Si.stpP(n)}),j&&Kn(e.an,Q,function(n){n.target===e.an[0]&&(Je(z),Qe(z))})}function Ke(n,t,r){var e=n?f:v;li(Kt,n?an:un,!t),li(e,Ln,!r)}function Ge(n,t){if(clearTimeout(k),n)si(f,Nn),si(v,Nn);else{var r,e=function(){U||Lt||(!(r=l.hasClass("active")||y.hasClass("active"))&&(Kr||Gr||Jr)&&ci(f,Nn),!r&&(Kr||Gr||Jr)&&ci(v,Nn))};0<Xr&&!0!==t?k=setTimeout(e,Xr):e()}}function Je(n){var t={},r=ni(n),e=r.sn,i=Oi.min(1,ee[r.F]/vr[r.F]);t[r.K]=Oi.floor(100*i*1e6)/1e6+"%",ht()||r.cn.css(t),e.D=r.cn[0]["offset"+r.ln],e.M=i}function Qe(n,t){var r,e,i=cn(t)==gi,o=Vt&&n,a=ni(n),u=a.sn,f="translate(",c=_i.u("transform"),s=_i.u("transition"),l=n?Zt[_e]():Zt[Se](),v=t===hi||i?l:t,d=u.D,h=a.un[0]["offset"+a.ln],p=h-d,b={},y=(cr[ge+a.ln]-cr["client"+a.ln])*(Ot.n&&o?-1:1),m=function(n){return isNaN(n/y)?0:Oi.max(0,Oi.min(1,n/y))},g=function(n){var t=p*n;return t=isNaN(t)?0:t,t=o&&!Ot.i?h-d-t:t,t=Oi.max(0,t)},w=m(l),x=g(m(v)),_=g(w);u.N=y,u.R=l,u.L=w,ln?(r=o?-(h-d-x):x,e=n?f+r+"px, 0)":f+"0, "+r+"px)",b[c]=e,j&&(b[s]=i&&1<Oi.abs(x-u.W)?function S(n){var t=_i.u("transition"),r=n.css(t);if(r)return r;for(var e,i,o,a="\\s*(([^,(]+(\\(.+?\\))?)+)[\\s,]*",u=new RegExp(a),f=new RegExp("^("+a+")+$"),c="property duration timing-function delay".split(" "),s=[],l=0,v=function(n){if(e=[],!n.match(f))return n;for(;n.match(u);)e.push(RegExp.$1),n=n.replace(u,ye);return e};l<c[xi.l];l++)for(i=v(n.css(t+"-"+c[l])),o=0;o<i[xi.l];o++)s[o]=(s[o]?s[o]+xe:ye)+i[o];return s.join(", ")}(a.cn)+", "+(c+xe+250)+"ms":ye)):b[a.P]=x,ht()||(a.cn.css(b),ln&&j&&i&&a.cn.one(Q,function(){Lt||a.cn.css(s,ye)})),u.W=x,u.j=_,u.I=h}function Ze(n,t){var r=t?"removeClass":"addClass",e=n?b:y,i=n?An:Rn;(n?s:l)[r](i),e[r](i)}function ni(n){return{K:n?he:pe,ln:n?"Width":"Height",P:n?le:fe,G:n?"Left":"Top",U:n?pn:bn,J:n?"X":"Y",F:n?"w":"h",vn:n?"l":"t",un:n?s:b,cn:n?l:y,an:n?f:v,sn:n?vn:dn}}function st(n){ir=ir||pt(Wn,!0),n?p&&Rt?si(ir.removeAttr(xi.s),In):mt(ir):p||Kt.append(ir)}function ti(n,t,r){if(!1!==r)if(Rt){var e,i=qt.callbacks[n],o=n;"on"===o.substr(0,2)&&(o=o.substr(2,1).toLowerCase()+o.substr(3)),cn(i)==bi&&i.call(St,t),d(Pn,function(){cn((e=this).on)==bi&&e.on(o,t)})}else Lt||jn.push({n:n,a:t})}function ri(n,t,r){r=r||[ye,ye,ye,ye],n[(t=t||ye)+fe]=r[0],n[t+ce]=r[1],n[t+se]=r[2],n[t+le]=r[3]}function ei(n,t,r,e){return t=t||ye,n=n||ye,{t:e?0:ii(Kt.css(n+fe+t)),r:r?0:ii(Kt.css(n+ce+t)),b:e?0:ii(Kt.css(n+se+t)),l:r?0:ii(Kt.css(n+le+t))}}function lt(n,t){var r,e,i,o=function(n,t){if(i="",t&&typeof n==mi)for(e=n.split(xe),r=0;r<e[xi.l];r++)i+="|"+e[r]+"$";return i};return new RegExp("(^"+rn+"([-_].+|)$)"+o(Er,n)+o(Ir,t),"g")}function vt(){var n=fr[xi.bCR]();return{x:ln&&1/(Oi.round(n.width)/fr[xi.oW])||1,y:ln&&1/(Oi.round(n.height)/fr[xi.oH])||1}}function dt(n){var t="ownerDocument",r="HTMLElement",e=n&&n[t]&&n[t].parentWindow||vi;return typeof e[r]==pi?n instanceof e[r]:n&&typeof n==pi&&null!==n&&1===n.nodeType&&typeof n.nodeName==mi}function ii(n,t){var r=t?parseFloat(n):parseInt(n,10);return isNaN(r)?0:r}function ht(){return Cr&&zt.x&&zt.y}function oi(){return Nt?er[0]:sr}function ai(r,n){return"<div "+(r?cn(r)==mi?'class="'+r+'"':function(){var n,t=ye;if(Ci.isPlainObject(r))for(n in r)t+=("c"===n?"class":n)+'="'+r[n]+'" ';return t}():ye)+">"+(n||ye)+"</div>"}function pt(n,t){var r=cn(t)==gi,e=!r&&t||Kt;return p&&!e[xi.l]?null:p?e[r?"children":"find"](W+n.replace(/\s/g,W)).eq(0):Ci(ai(n))}function bt(n,t){for(var r,e=t.split(W),i=0;i<e.length;i++){if(!n[xi.hOP](e[i]))return;r=n[e[i]],i<e.length&&cn(r)==pi&&(n=r)}return r}function yt(n){var t=qt.updateOnLoad;t=cn(t)==mi?t.split(xe):t,Si.isA(t)&&!Lt&&d(t,n)}function ui(n,t,r){if(r)return r;if(cn(n)!=pi||cn(t)!=pi)return n!==t;for(var e in n)if("c"!==e){if(!n[xi.hOP](e)||!t[xi.hOP](e))return!0;if(ui(n[e],t[e]))return!0}return!1}function fi(){return Ci.extend.apply(this,[!0].concat([].slice.call(arguments)))}function ci(n,t){return e.addClass.call(n,t)}function si(n,t){return e.removeClass.call(n,t)}function li(n,t,r){return(r?ci:si)(n,t)}function mt(n){return e.remove.call(n)}function gt(n,t){return e.find.call(n,t).eq(0)}}return ki&&ki.fn&&(ki.fn.overlayScrollbars=function(n,t){return ki.isPlainObject(n)?(ki.each(this,function(){w(this,n,t)}),this):w(this,n)}),w});