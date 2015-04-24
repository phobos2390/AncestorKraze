/**
 * Created by phobos2390 on 3/24/15.
 */
///<reference path="../../IKeyParams.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IDoorParams.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../Standard/StandardPlayer.ts"/>
///<reference path="../Standard/StandardKey.ts"/>
///<reference path="../Standard/StandardFactory.ts"/>
///<reference path="AncestorName.ts"/>
///<reference path="AncestorPlayer.ts"/>
///<reference path="AncestorDoorParams.ts"/>
///<reference path="AncestorNameRequirement.ts"/>
///<reference path="AncestorRequirementParams.ts"/>
///<reference path="AncestorNameParams.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var StandardFactory = Model.Definitions.Standard.StandardFactory;
            var AncestorFactory = (function () {
                function AncestorFactory() {
                    this.factory = new StandardFactory();
                }
                AncestorFactory.prototype.createKey = function (params) {
                    return new FamilyHistory.AncestorName(params.getName());
                };
                AncestorFactory.prototype.createPlayer = function () {
                    return new FamilyHistory.AncestorPlayer();
                };
                AncestorFactory.prototype.createDoor = function (params) {
                    return this.factory.createDoor(params.getRequirement());
                };
                AncestorFactory.prototype.createEmptySpace = function () {
                    return this.factory.createEmptySpace();
                };
                AncestorFactory.prototype.createSpace = function (x, y) {
                    return this.factory.createSpace(x, y);
                };
                AncestorFactory.prototype.createRequirement = function (params) {
                    var name = params.getAncestorNameParams();
                    return new FamilyHistory.AncestorNameRequirement(name);
                };
                AncestorFactory.prototype.createBuilder = function () {
                    return this.factory.createBuilder();
                };
                AncestorFactory.prototype.createWinSpace = function () {
                    return this.factory.createWinSpace();
                };
                AncestorFactory.prototype.createWallSpace = function () {
                    return this.factory.createWallSpace();
                };
                AncestorFactory.prototype.createMove = function (direction) {
                    return this.factory.createMove(direction);
                };
                AncestorFactory.prototype.createKeyParams = function (params) {
                    return new FamilyHistory.AncestorNameParams(params);
                };
                AncestorFactory.prototype.createDoorParams = function (params) {
                    return new FamilyHistory.AncestorDoorParams(params);
                };
                AncestorFactory.prototype.createRequirementParams = function (params) {
                    return new FamilyHistory.AncestorRequirementParams(params);
                };
                return AncestorFactory;
            })();
            FamilyHistory.AncestorFactory = AncestorFactory;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorFactory.js.map