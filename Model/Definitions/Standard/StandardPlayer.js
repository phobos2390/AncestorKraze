///<reference path="../../IRequirement.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardPlayer = (function () {
                function StandardPlayer() {
                    this.keys = 0;
                }
                StandardPlayer.prototype.fulfillsRequirement = function (requirement) {
                    return requirement.playerFulfillsRequirement(this);
                };
                StandardPlayer.prototype.addKey = function (key) {
                    this.keys++;
                };
                StandardPlayer.prototype.hasKey = function (key) {
                    return true;
                };
                StandardPlayer.prototype.numberOfKeys = function () {
                    return this.keys;
                };
                return StandardPlayer;
            })();
            Standard.StandardPlayer = StandardPlayer;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardPlayer.js.map