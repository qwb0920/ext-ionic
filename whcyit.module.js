"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('./src/rxjs-extensions');
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var ionic_angular_1 = require('ionic-angular');
var angular2_dynamic_component_1 = require('angular2-dynamic-component');
var map_to_iterable_1 = require('./src/pipes/map-to-iterable');
var order_by_1 = require('./src/pipes/order-by');
var alpha_scroll_1 = require('./src/components/alpha-scroll/alpha-scroll');
var open_url_modal_component_1 = require('./src/components/open-url-modal/open-url-modal-component');
var open_url_modal_1 = require('./src/components/open-url-modal/open-url-modal');
var baidu_map_1 = require('./src/components/baidu-map/baidu-map');
var baidu_map_component_1 = require('./src/components/baidu-map/baidu-map-component');
var map_to_iterable_2 = require('./src/pipes/map-to-iterable');
exports.MapToIterable = map_to_iterable_2.MapToIterable;
var order_by_2 = require('./src/pipes/order-by');
exports.OrderBy = order_by_2.OrderBy;
var alpha_scroll_2 = require('./src/components/alpha-scroll/alpha-scroll');
exports.AlphaScroll = alpha_scroll_2.AlphaScroll;
var open_url_modal_2 = require('./src/components/open-url-modal/open-url-modal');
exports.OpenUrlModalController = open_url_modal_2.OpenUrlModalController;
var baidu_map_component_2 = require('./src/components/baidu-map/baidu-map-component');
exports.BaiduMap = baidu_map_component_2.BaiduMap;
__export(require('./src/components/baidu-map/baidu-map-options'));
var WhcyitPipeModule = (function () {
    function WhcyitPipeModule() {
    }
    WhcyitPipeModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            exports: [
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy
            ],
            declarations: [
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy
            ],
            providers: [
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WhcyitPipeModule);
    return WhcyitPipeModule;
}());
var WhcyitModule = (function () {
    function WhcyitModule() {
    }
    WhcyitModule = __decorate([
        core_1.NgModule({
            imports: [
                WhcyitPipeModule,
                ionic_angular_1.IonicModule,
                angular2_dynamic_component_1.DynamicComponentModuleFactory.buildModule([ionic_angular_1.IonicModule])
            ],
            exports: [
                WhcyitPipeModule,
                alpha_scroll_1.AlphaScroll,
                baidu_map_component_1.BaiduMap
            ],
            declarations: [
                alpha_scroll_1.AlphaScroll,
                open_url_modal_component_1.OpenUrlModalCmp,
                baidu_map_component_1.BaiduMap
            ],
            entryComponents: [
                open_url_modal_component_1.OpenUrlModalCmp
            ],
            providers: [
                open_url_modal_1.OpenUrlModalController,
                baidu_map_1.BaiduMapController
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WhcyitModule);
    return WhcyitModule;
}());
exports.WhcyitModule = WhcyitModule;
//# sourceMappingURL=whcyit.module.js.map