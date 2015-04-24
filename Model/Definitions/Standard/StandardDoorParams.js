///<reference path="StandardRequirementParams.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardDoorParams = (function () {
                function StandardDoorParams(numberOfKeys, factory) {
                    this.numberOfKeys = numberOfKeys;
                    this.factory = factory;
                    this.params = this.factory.createRequirementParams(this.numberOfKeys);
                }
                StandardDoorParams.prototype.getRequirement = function () {
                    return this.factory.createRequirement(this.params);
                };
                return StandardDoorParams;
            })();
            Standard.StandardDoorParams = StandardDoorParams;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardDoorParams.js.map