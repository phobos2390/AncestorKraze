///<reference path="../../IKey.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardKey = (function () {
                function StandardKey() {
                    this.keyString = "IKey";
                }
                StandardKey.prototype.canEnterSpace = function () {
                    return true;
                };
                StandardKey.prototype.getSpaceType = function () {
                    return this.keyString;
                };
                StandardKey.prototype.objectIsOfType = function (type) {
                    return this.keyString.valueOf() == type.valueOf();
                };
                StandardKey.prototype.toString = function () {
                    return this.keyString;
                };
                return StandardKey;
            })();
            Standard.StandardKey = StandardKey;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardKey.js.map