///<reference path="../../ISpaceObject.ts"/>
/**
 * Created by phobos2390 on 4/21/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardEmptySpace = (function () {
                function StandardEmptySpace() {
                    this.type = "BlankSpace";
                }
                StandardEmptySpace.prototype.canEnterSpace = function () {
                    return true;
                };
                StandardEmptySpace.prototype.getSpaceType = function () {
                    return this.type;
                };
                StandardEmptySpace.prototype.objectIsOfType = function (type) {
                    return this.type.valueOf() == type.valueOf();
                };
                return StandardEmptySpace;
            })();
            Standard.StandardEmptySpace = StandardEmptySpace;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardEmptySpace.js.map