///<reference path="../../ISpace.ts"/>
///<reference path="StandardEmptySpace.ts"/>
///<reference path="../../ISpaceObject.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardEmptySpace = Model.Definitions.Standard.StandardEmptySpace;
            var StandardSpace = (function () {
                function StandardSpace(x, y) {
                    this.x = x;
                    this.y = y;
                    this.spaceObject = new StandardEmptySpace();
                    this.hasBeenSeen = false;
                }
                StandardSpace.prototype.getX = function () {
                    return this.x;
                };
                StandardSpace.prototype.getY = function () {
                    return this.y;
                };
                StandardSpace.prototype.setSpaceObject = function (spaceObject) {
                    this.spaceObject = spaceObject;
                };
                StandardSpace.prototype.getSpaceObject = function () {
                    return this.spaceObject;
                };
                StandardSpace.prototype.canEnterSpace = function () {
                    return this.spaceObject.canEnterSpace();
                };
                StandardSpace.prototype.toString = function () {
                    return "(" + this.getX() + "," + this.getY() + ")";
                };
                StandardSpace.prototype.setSeen = function () {
                    this.hasBeenSeen = true;
                };
                StandardSpace.prototype.seen = function () {
                    return this.hasBeenSeen;
                };
                return StandardSpace;
            })();
            Standard.StandardSpace = StandardSpace;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardSpace.js.map