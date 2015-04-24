/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardRequirementParams = (function () {
                function StandardRequirementParams(numberOfKeys) {
                    this.numberOfKeys = numberOfKeys;
                }
                StandardRequirementParams.prototype.getNumberOfKeys = function () {
                    return this.numberOfKeys;
                };
                return StandardRequirementParams;
            })();
            Standard.StandardRequirementParams = StandardRequirementParams;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardRequirementParams.js.map