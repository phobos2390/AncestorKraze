///<reference path="../../IWallObject.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardWall = (function () {
                function StandardWall() {
                    this.wallString = "IWallObject";
                }
                StandardWall.prototype.canEnterSpace = function () {
                    return false;
                };
                StandardWall.prototype.getSpaceType = function () {
                    return this.wallString;
                };
                StandardWall.prototype.objectIsOfType = function (type) {
                    return this.wallString.valueOf() == type.valueOf();
                };
                return StandardWall;
            })();
            Standard.StandardWall = StandardWall;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardWall.js.map