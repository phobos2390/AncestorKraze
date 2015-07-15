///<reference path="../../ISpace.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IModelBuilder.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModel.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../Standard/StandardModelBuilder.ts"/>
///<reference path="AncestorModel.ts"/>
/**
 * Child class of the Standard Model Builder. The only difference between the two is
 * that the Ancestor Builder builds an Ancestor Model and not a Standard Model
 * Created by phobos2390 on 5/2/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var FamilyHistory;
        (function (FamilyHistory) {
            var StandardModelBuilder = Model.Definitions.Standard.StandardModelBuilder;
            var AncestorModel = Model.Definitions.FamilyHistory.AncestorModel;
            var AncestorBuilder = (function () {
                function AncestorBuilder(factory) {
                    this.factory = factory;
                    this.base = new StandardModelBuilder(this.factory);
                }
                AncestorBuilder.prototype.setHeight = function (height) {
                    return this.base.setHeight(height);
                };
                AncestorBuilder.prototype.setWidth = function (width) {
                    return this.base.setWidth(width);
                };
                AncestorBuilder.prototype.setWall = function (space) {
                    return this.base.setWall(space);
                };
                AncestorBuilder.prototype.setKey = function (space, key) {
                    return this.base.setKey(space, key);
                };
                AncestorBuilder.prototype.setDoor = function (space, door) {
                    return this.base.setDoor(space, door);
                };
                AncestorBuilder.prototype.setExit = function (space) {
                    return this.base.setExit(space);
                };
                AncestorBuilder.prototype.setEmpty = function (space) {
                    return this.base.setEmpty(space);
                };
                AncestorBuilder.prototype.setWalls = function (space, width, height) {
                    return this.base.setWalls(space, width, height);
                };
                AncestorBuilder.prototype.setEmpties = function (space, width, height) {
                    return this.base.setEmpties(space, width, height);
                };
                AncestorBuilder.prototype.setWallsAroundSpace = function (space, width, height) {
                    return this.base.setWallsAroundSpace(space, width, height);
                };
                AncestorBuilder.prototype.setBaseFilledPattern = function (space, width, height) {
                    return this.base.setBaseFilledPattern(space, width, height);
                };
                AncestorBuilder.prototype.setSpaceBetweenTwoSpaces = function (firstSpace, secondSpace, spaceObject) {
                    return this.base.setSpaceBetweenTwoSpaces(firstSpace, secondSpace, spaceObject);
                };
                AncestorBuilder.prototype.setPlayer = function (space, player) {
                    return this.base.setPlayer(space, player);
                };
                AncestorBuilder.prototype.peek = function () {
                    return this.base.peek();
                };
                AncestorBuilder.prototype.pop = function () {
                    return this.base.pop();
                };
                AncestorBuilder.prototype.setInitialDoor = function (doorParams) {
                    return this.base.setInitialDoor(doorParams);
                };
                AncestorBuilder.prototype.addKeyAndDoorPairToStack = function (key, doorParams) {
                    return this.base.addKeyAndDoorPairToStack(key, doorParams);
                };
                AncestorBuilder.prototype.addEmptyToStack = function () {
                    return this.base.addEmptyToStack();
                };
                AncestorBuilder.prototype.build = function () {
                    this.base.fixKeyList();
                    return new AncestorModel(this.base.getSpaces(), this.base.getPlayerSpace(), this.base.getPlayer(), this.factory);
                };
                return AncestorBuilder;
            })();
            FamilyHistory.AncestorBuilder = AncestorBuilder;
        })(FamilyHistory = Definitions.FamilyHistory || (Definitions.FamilyHistory = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorBuilder.js.map