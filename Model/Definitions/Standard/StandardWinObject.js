///<reference path="../../ISpaceObject.ts"/>
///<reference path="../../IWinSpaceObject.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardWinObject = (function () {
                function StandardWinObject() {
                    this.winString = "IWinSpaceObject";
                }
                StandardWinObject.prototype.canEnterSpace = function () {
                    return true;
                };
                StandardWinObject.prototype.getSpaceType = function () {
                    return this.winString;
                };
                StandardWinObject.prototype.objectIsOfType = function (type) {
                    return this.winString.valueOf() == type.valueOf();
                };
                return StandardWinObject;
            })();
            Standard.StandardWinObject = StandardWinObject;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardWinObject.js.map