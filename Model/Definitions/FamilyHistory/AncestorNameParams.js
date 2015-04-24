///<reference path="../../IKeyParams.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorNameParams = (function () {
                function AncestorNameParams(name) {
                    this.name = name;
                }
                AncestorNameParams.prototype.getName = function () {
                    return this.name;
                };
                return AncestorNameParams;
            })();
            FamilyHistory.AncestorNameParams = AncestorNameParams;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorNameParams.js.map