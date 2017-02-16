"use strict";
var _ = require('lodash');
var core_1 = require('@angular/core');
var util_1 = require('../utils/util');
exports.REGISTAR_KEY = '__registerKey__';
var RegistarProvider = (function () {
    function RegistarProvider() {
        this.dict = {};
    }
    RegistarProvider.prototype.register = function (obj) {
        if (!this.isRegistar(obj)) {
            return;
        }
        this.dict[obj[exports.REGISTAR_KEY]] = obj;
    };
    RegistarProvider.prototype.unregister = function (obj) {
        if (!this.isRegistar(obj)) {
            return;
        }
        delete this.dict[obj[exports.REGISTAR_KEY]];
    };
    RegistarProvider.prototype.registers = function (objs) {
        var _this = this;
        if (!util_1.isPresent(objs)) {
            return;
        }
        objs.forEach(function (obj) { return _this.register(obj); });
    };
    RegistarProvider.prototype.unregisters = function (objs) {
        var _this = this;
        if (!util_1.isPresent(objs)) {
            return;
        }
        objs.forEach(function (obj) { return _this.unregister(obj); });
    };
    RegistarProvider.prototype.get = function (key) {
        return this.dict[key];
    };
    RegistarProvider.prototype.isRegistar = function (obj) {
        return util_1.isPresent(obj) && _.has(obj, exports.REGISTAR_KEY);
    };
    RegistarProvider.decorators = [
        { type: core_1.Injectable },
    ];
    RegistarProvider.ctorParameters = [];
    return RegistarProvider;
}());
exports.RegistarProvider = RegistarProvider;
//# sourceMappingURL=registar.js.map