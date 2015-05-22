///<reference path="../../IDoor.ts"/>
///<reference path="../../IRequirement.ts"/>
///<reference path="../Standard/StandardDoor.ts"/>
/**
 * Created by phobos2390 on 5/2/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var AncestorDoor = (function () {
                function AncestorDoor(requirement) {
                    this.requirement = requirement;
                    this.doorString = "IDoor";
                }
                AncestorDoor.prototype.getRequirement = function () {
                    return this.requirement;
                };
                AncestorDoor.prototype.canEnterSpace = function () {
                    return true;
                };
                AncestorDoor.prototype.getSpaceType = function () {
                    return this.getRequirement().toString().replace(/ /g, '');
                };
                AncestorDoor.prototype.objectIsOfType = function (type) {
                    return type.valueOf() == this.doorString.valueOf() || type.valueOf() == this.getRequirement().toString().valueOf();
                };
                return AncestorDoor;
            })();
            FamilyHistory.AncestorDoor = AncestorDoor;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorDoor.js.map