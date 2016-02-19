///<reference path="../../IKey.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorName = (function () {
                function AncestorName(name) {
                    this.name = name;
                }
                AncestorName.prototype.canEnterSpace = function () {
                    return true;
                };
                AncestorName.prototype.getSpaceType = function () {
                    return "IKey";
                };
                AncestorName.prototype.objectIsOfType = function (type) {
                    return type.valueOf() == this.name.valueOf()
                        || type.valueOf() == this.getSpaceType().valueOf();
                };
                AncestorName.prototype.toString = function () {
                    return this.name;
                };
                return AncestorName;
            })();
            FamilyHistory.AncestorName = AncestorName;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorName.js.map