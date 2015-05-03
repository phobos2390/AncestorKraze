///<reference path="../../IRequirement.ts"/>
///<reference path="../../IModelFactory.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorNameRequirement = (function () {
                function AncestorNameRequirement(ancestorName, factory) {
                    this.ancestorName = ancestorName;
                    this.factory = factory;
                }
                AncestorNameRequirement.prototype.playerFulfillsRequirement = function (player) {
                    return player.hasKey(this.factory.createKey(this.factory.createKeyParams(this.ancestorName)));
                };
                AncestorNameRequirement.prototype.toString = function () {
                    return this.ancestorName;
                };
                return AncestorNameRequirement;
            })();
            FamilyHistory.AncestorNameRequirement = AncestorNameRequirement;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorNameRequirement.js.map