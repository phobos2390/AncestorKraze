///<reference path="../../IDoor.ts"/>
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
            var StandardDoor = (function () {
                function StandardDoor(requirement) {
                    this.requirement = requirement;
                    this.doorString = "IDoor";
                }
                StandardDoor.prototype.getRequirement = function () {
                    return this.requirement;
                };
                StandardDoor.prototype.canEnterSpace = function () {
                    return true;
                };
                StandardDoor.prototype.getSpaceType = function () {
                    return "Door" + this.getRequirement().toString();
                };
                StandardDoor.prototype.objectIsOfType = function (type) {
                    return type.valueOf() == this.doorString.valueOf() || type.valueOf() == this.getRequirement().toString().valueOf();
                };
                return StandardDoor;
            })();
            Standard.StandardDoor = StandardDoor;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardDoor.js.map