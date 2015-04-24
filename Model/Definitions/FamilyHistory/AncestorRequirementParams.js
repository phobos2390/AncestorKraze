///<reference path="../../IRequirementParams.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorRequirementParams = (function () {
                function AncestorRequirementParams(name) {
                    this.name = name;
                }
                AncestorRequirementParams.prototype.getAncestorNameParams = function () {
                    return this.name;
                };
                return AncestorRequirementParams;
            })();
            FamilyHistory.AncestorRequirementParams = AncestorRequirementParams;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorRequirementParams.js.map