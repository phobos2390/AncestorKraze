///<reference path="../../IMove.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardMove = (function () {
                function StandardMove(deltaX, deltaY) {
                    this.deltaX = deltaX;
                    this.deltaY = deltaY;
                    this.directions =
                        [
                            "up",
                            "left",
                            "none",
                            "right",
                            "down" //-1,0->-2 4
                        ];
                    var arrIndexTransform = this.getDXY() + 2;
                    this.moveDirection = this.directions[arrIndexTransform];
                }
                StandardMove.prototype.getDeltaX = function () {
                    return this.deltaX;
                };
                StandardMove.prototype.getDeltaY = function () {
                    return this.deltaY;
                };
                StandardMove.prototype.getDXY = function () {
                    return this.deltaX * 2 + this.deltaY;
                };
                StandardMove.prototype.getMoveString = function () {
                    return this.moveDirection;
                };
                return StandardMove;
            })();
            Standard.StandardMove = StandardMove;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardMove.js.map