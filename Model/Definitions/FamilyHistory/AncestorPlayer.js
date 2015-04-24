///<reference path="../../IPlayer.ts"/>
///<reference path="AncestorName.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorPlayer = (function () {
                function AncestorPlayer() {
                }
                AncestorPlayer.prototype.fulfillsRequirement = function (requirement) {
                    return requirement.playerFulfillsRequirement(this);
                };
                AncestorPlayer.prototype.addKey = function (key) {
                    this.keys.push(key);
                };
                AncestorPlayer.prototype.hasKey = function (key) {
                    var keyPlayerHas = key;
                    for (var i = 0; i < this.keys.length; i++) {
                        var checkKey = this.keys[i];
                        if (checkKey.getSpaceType().valueOf() == keyPlayerHas.valueOf()) {
                            return true;
                        }
                    }
                    return false;
                };
                AncestorPlayer.prototype.numberOfKeys = function () {
                    return this.keys.length;
                };
                return AncestorPlayer;
            })();
            FamilyHistory.AncestorPlayer = AncestorPlayer;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorPlayer.js.map