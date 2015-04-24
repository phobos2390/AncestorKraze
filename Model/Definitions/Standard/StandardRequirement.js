///<reference path="../../IPlayer.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardRequirement = (function () {
                function StandardRequirement(numberOfKeys) {
                    this.numberOfKeys = numberOfKeys;
                }
                StandardRequirement.prototype.playerFulfillsRequirement = function (player) {
                    return player.numberOfKeys() >= this.numberOfKeys;
                };
                StandardRequirement.prototype.toString = function () {
                    return this.numberOfKeys.toString();
                };
                return StandardRequirement;
            })();
            Standard.StandardRequirement = StandardRequirement;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardRequirement.js.map