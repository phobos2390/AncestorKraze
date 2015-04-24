///<reference path="../../IRequirement.ts"/>
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
                function AncestorNameRequirement(ancestorName) {
                    this.ancestorName = ancestorName;
                }
                AncestorNameRequirement.prototype.playerFulfillsRequirement = function (player) {
                    var gottenName = "";
                    return this.ancestorName == gottenName;
                };
                return AncestorNameRequirement;
            })();
            FamilyHistory.AncestorNameRequirement = AncestorNameRequirement;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorNameRequirement.js.map