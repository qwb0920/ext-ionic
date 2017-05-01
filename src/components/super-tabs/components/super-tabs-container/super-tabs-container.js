import { Component, Renderer2, ElementRef, Input, Output, EventEmitter, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import { DomController, Platform } from 'ionic-angular';
import { SuperTabsPanGesture } from '../../super-tabs-pan-gesture';
var SuperTabsContainer = (function () {
    function SuperTabsContainer(el, rnd, plt, domCtrl, ngZone) {
        this.el = el;
        this.rnd = rnd;
        this.plt = plt;
        this.domCtrl = domCtrl;
        this.ngZone = ngZone;
        this.tabsCount = 0;
        this.tabSelect = new EventEmitter();
        this.onDrag = new EventEmitter();
        // View bindings
        this.containerPosition = 0;
        this.tabWidth = 0;
        this.containerWidth = 0;
        this.tabs = [];
        this.globalSwipeEnabled = true;
        this.swipeEnabledPerTab = {};
    }
    SuperTabsContainer.prototype.ngAfterViewInit = function () {
        this.init();
    };
    SuperTabsContainer.prototype.ngOnDestroy = function () {
        this.gesture && this.gesture.destroy();
    };
    SuperTabsContainer.prototype.enableTabsSwipe = function (enable) {
        this.globalSwipeEnabled = enable;
    };
    SuperTabsContainer.prototype.enableTabSwipe = function (tabIndex, enable) {
        this.swipeEnabledPerTab[tabIndex] = enable;
    };
    SuperTabsContainer.prototype.refreshDimensions = function () {
        this.calculateContainerWidth();
        this.setContainerWidth();
        this.refreshMinMax();
    };
    SuperTabsContainer.prototype.getNativeElement = function () {
        return this.el.nativeElement;
    };
    SuperTabsContainer.prototype.init = function () {
        var _this = this;
        this.refreshDimensions();
        this.gesture = new SuperTabsPanGesture(this.plt, this.container.nativeElement, this.config, this.rnd);
        this.gesture.onMove = function (delta) {
            if (_this.globalSwipeEnabled === false)
                return;
            if (_this.swipeEnabledPerTab[_this.selectedTabIndex] === false)
                return;
            if ((_this.containerPosition === _this.maxPosX && delta >= 0) || (_this.containerPosition === _this.minPosX && delta <= 0))
                return;
            _this.containerPosition += delta;
            _this.plt.raf(function () {
                _this.onDrag.emit();
                _this.moveContainer();
            });
        };
        this.gesture.onEnd = function (shortSwipe, shortSwipeDelta) {
            if (_this.globalSwipeEnabled === false)
                return;
            if (_this.swipeEnabledPerTab[_this.selectedTabIndex] === false)
                return;
            // get tab index based on container position
            var tabIndex = Math.round(_this.containerPosition / _this.tabWidth);
            // handle short swipes
            // only short swipe if we didn't change tab already in this gesture
            (tabIndex === _this.selectedTabIndex) && shortSwipe && ((shortSwipeDelta < 0 && tabIndex++) || (shortSwipeDelta > 0 && tabIndex--));
            // get location based on tab index
            var position = Math.max(_this.minPosX, Math.min(_this.maxPosX, tabIndex * _this.tabWidth));
            tabIndex = position / _this.tabWidth;
            // move container if we changed position
            if (position !== _this.containerPosition) {
                _this.plt.raf(function () {
                    _this.moveContainer(true, position, function () { return _this.ngZone.run(function () { return _this.setSelectedTab(tabIndex); }); });
                });
            }
            else
                _this.setSelectedTab(tabIndex);
        };
    };
    SuperTabsContainer.prototype.setSelectedTab = function (index) {
        var _this = this;
        var tab = this.tabs[index];
        tab.load().then(function () {
            _this.tabSelect.emit({ index: index, changed: index !== _this.selectedTabIndex });
            _this.selectedTabIndex = index;
        });
    };
    SuperTabsContainer.prototype.calculateContainerWidth = function () {
        this.containerWidth = this.tabWidth * this.tabsCount;
    };
    SuperTabsContainer.prototype.setContainerWidth = function () {
        this.rnd.setStyle(this.container.nativeElement, 'width', this.containerWidth + 'px');
    };
    SuperTabsContainer.prototype.slideTo = function (index, animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var tab = this.tabs[index];
        return tab.load().then(function () {
            _this.plt.raf(function () { return _this.moveContainer(animate, index * _this.tabWidth); });
        });
    };
    SuperTabsContainer.prototype.moveContainer = function (animate, positionX, callback) {
        if (animate === void 0) { animate = false; }
        if (callback === void 0) { callback = function () { }; }
        var el = this.container.nativeElement;
        if (animate) {
            if (el.style[this.plt.Css.transform].indexOf('all') === -1) {
                this.rnd.setStyle(el, this.plt.Css.transition, "all " + this.config.transitionDuration + "ms " + this.config.transitionEase);
            }
            this.rnd.setStyle(el, this.plt.Css.transform, "translate3d(" + -1 * positionX + "px, 0, 0)");
            this.containerPosition = positionX;
        }
        else {
            if (positionX) {
                this.containerPosition = positionX;
            }
            if (el.style[this.plt.Css.transform] !== 'initial') {
                this.rnd.setStyle(el, this.plt.Css.transition, 'initial');
            }
            this.containerPosition = Math.max(this.minPosX, Math.min(this.maxPosX, this.containerPosition));
            this.rnd.setStyle(el, this.plt.Css.transform, "translate3d(" + -1 * this.containerPosition + "px, 0, 0)");
        }
        callback();
    };
    SuperTabsContainer.prototype.refreshMinMax = function () {
        this.minPosX = 0;
        this.maxPosX = (this.tabsCount - 1) * this.tabWidth;
    };
    return SuperTabsContainer;
}());
export { SuperTabsContainer };
SuperTabsContainer.decorators = [
    { type: Component, args: [{
                selector: 'ion-super-tabs-container',
                template: '<div #container><ng-content></ng-content></div>',
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SuperTabsContainer.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: Platform, },
    { type: DomController, },
    { type: NgZone, },
]; };
SuperTabsContainer.propDecorators = {
    'config': [{ type: Input },],
    'tabsCount': [{ type: Input },],
    'selectedTabIndex': [{ type: Input },],
    'tabSelect': [{ type: Output },],
    'onDrag': [{ type: Output },],
    'container': [{ type: ViewChild, args: ['container',] },],
};
//# sourceMappingURL=super-tabs-container.js.map