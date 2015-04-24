///<reference path="../../IKeyParams.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IDoorParams.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="StandardPlayer.ts"/>
///<reference path="StandardDoor.ts"/>
///<reference path="StandardDoorParams.ts"/>
///<reference path="../../ISpace.ts"/>
///<reference path="StandardSpace.ts"/>
///<reference path="StandardRequirement.ts"/>
///<reference path="StandardWall.ts"/>
///<reference path="StandardWinObject.ts"/>
///<reference path="StandardKey.ts"/>
///<reference path="StandardMove.ts"/>
///<reference path="StandardModelBuilder.ts"/>
///<reference path="StandardKeyParams.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardKey = Model.Definitions.Standard.StandardKey;
            var StandardPlayer = Model.Definitions.Standard.StandardPlayer;
            var StandardDoor = Model.Definitions.Standard.StandardDoor;
            var StandardSpace = Model.Definitions.Standard.StandardSpace;
            var StandardRequirement = Model.Definitions.Standard.StandardRequirement;
            var StandardModelBuilder = Model.Definitions.Standard.StandardModelBuilder;
            var StandardWinObject = Model.Definitions.Standard.StandardWinObject;
            var StandardWall = Model.Definitions.Standard.StandardWall;
            var StandardMove = Model.Definitions.Standard.StandardMove;
            var StandardKeyParams = Model.Definitions.Standard.StandardKeyParams;
            var StandardDoorParams = Model.Definitions.Standard.StandardDoorParams;
            var StandardRequirementParams = Model.Definitions.Standard.StandardRequirementParams;
            var StandardEmptySpace = Model.Definitions.Standard.StandardEmptySpace;
            var StandardFactory = (function () {
                function StandardFactory() {
                }
                StandardFactory.prototype.createKey = function (params) {
                    return new StandardKey();
                };
                StandardFactory.prototype.createPlayer = function () {
                    return new StandardPlayer();
                };
                StandardFactory.prototype.createDoor = function (params) {
                    return new StandardDoor(params.getRequirement());
                };
                StandardFactory.prototype.createSpace = function (x, y) {
                    return new StandardSpace(x, y);
                };
                StandardFactory.prototype.createRequirement = function (params) {
                    return new StandardRequirement(params.getNumberOfKeys());
                };
                StandardFactory.prototype.createBuilder = function () {
                    return new StandardModelBuilder(this);
                };
                StandardFactory.prototype.createWinSpace = function () {
                    return new StandardWinObject();
                };
                StandardFactory.prototype.createWallSpace = function () {
                    return new StandardWall();
                };
                StandardFactory.prototype.createEmptySpace = function () {
                    return new StandardEmptySpace();
                };
                StandardFactory.prototype.createMove = function (direction) {
                    var deltaX = 0;
                    var deltaY = 0;
                    if (direction == "up") {
                        deltaY = 0;
                        deltaX = -1;
                    }
                    else if (direction == "down") {
                        deltaY = 0;
                        deltaX = 1;
                    }
                    else if (direction == "left") {
                        deltaY = -1;
                        deltaX = 0;
                    }
                    else if (direction == "right") {
                        deltaY = 1;
                        deltaX = 0;
                    }
                    else {
                        deltaX = 0;
                        deltaY = 0;
                    }
                    return new StandardMove(deltaX, deltaY);
                };
                StandardFactory.prototype.createKeyParams = function (params) {
                    return new StandardKeyParams();
                };
                StandardFactory.prototype.createDoorParams = function (params) {
                    return new StandardDoorParams(params, this);
                };
                StandardFactory.prototype.createRequirementParams = function (params) {
                    return new StandardRequirementParams(params);
                };
                return StandardFactory;
            })();
            Standard.StandardFactory = StandardFactory;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardFactory.js.map