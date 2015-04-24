///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IDoorParams.ts"/>
///<reference path="../../IRequirementParams.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorDoorParams = (function () {
                function AncestorDoorParams(ancestorName) {
                    this.factory = new FamilyHistory.AncestorFactory();
                    this.ancestorName = ancestorName;
                    this.params = this.factory.createRequirementParams(this.ancestorName);
                }
                AncestorDoorParams.prototype.getRequirement = function () {
                    return this.factory.createRequirement(this.params);
                };
                return AncestorDoorParams;
            })();
            FamilyHistory.AncestorDoorParams = AncestorDoorParams;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorDoorParams.js.map