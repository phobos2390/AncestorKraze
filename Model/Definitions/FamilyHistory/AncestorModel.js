///<reference path="../../IModel.ts"/>
///<reference path="../../IModelObserver.ts"/>
///<reference path="../../ISpace.ts"/>
///<reference path="../../IMove.ts"/>
///<reference path="../../IModelArgs.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IWinSpaceObject.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="AncestorFactory.ts"/>
///<reference path="../Standard/StandardFactory.ts"/>
///
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var AncestorFactory = Model.Definitions.FamilyHistory.AncestorFactory;
            var StandardModel = Model.Definitions.Standard.StandardModel;
            var AncestorModel = (function () {
                function AncestorModel(spaces, playerSpace, player) {
                    this.baseModel = new StandardModel(spaces, playerSpace, player);
                    this.playerSpace = playerSpace;
                    this.factory = new AncestorFactory();
                }
                AncestorModel.prototype.getSpace = function (x, y) {
                    return this.baseModel.getSpace(x, y);
                };
                AncestorModel.prototype.movePlayer = function (move) {
                    this.baseModel.movePlayer(move);
                };
                AncestorModel.prototype.canMovePlayer = function (move) {
                    //var space:ISpace = this.moveSpace(move);
                    //var returnBool:boolean;
                    //if(space.getSpaceObject().objectIsOfType("IDoor"))
                    //{
                    //    var door:IDoor = <IDoor>space.getSpaceObject();
                    //    this.requirement = door.getRequirement();
                    //    this.triedToGetInDoor = true;
                    //    this.update(this);
                    //    this.triedToGetInDoor = false;
                    //    returnBool = this.player.fulfillsRequirement(this.requirement);
                    //}
                    //else
                    //{
                    //    returnBool = space.getSpaceObject().canEnterSpace();
                    //}
                    //return returnBool;
                    return this.baseModel.canMovePlayer(move);
                };
                AncestorModel.prototype.fulfillRequirement = function (requirement) {
                };
                AncestorModel.prototype.won = function () {
                    return this.baseModel.won();
                };
                AncestorModel.prototype.mustRedraw = function () {
                    return this.baseModel.mustRedraw();
                };
                AncestorModel.prototype.getPlayer = function () {
                    return this.baseModel.getPlayer();
                };
                AncestorModel.prototype.getCurrentSpace = function () {
                    return this.baseModel.getCurrentSpace();
                };
                AncestorModel.prototype.getObjectInSpace = function (x, y) {
                    return this.baseModel.getObjectInSpace(x, y);
                };
                AncestorModel.prototype.registerObserver = function (observer) {
                    this.baseModel.registerObserver(observer);
                };
                AncestorModel.prototype.update = function (arguments) {
                    this.baseModel.update(arguments);
                };
                AncestorModel.prototype.pickedUpNewKey = function () {
                    return this.baseModel.pickedUpNewKey();
                };
                AncestorModel.prototype.newKey = function () {
                    return this.baseModel.newKey();
                };
                AncestorModel.prototype.attemptedToGetInADoor = function () {
                    return this.baseModel.attemptedToGetInADoor();
                };
                AncestorModel.prototype.doorRequirement = function () {
                    return this.baseModel.doorRequirement();
                };
                return AncestorModel;
            })();
            Standard.AncestorModel = AncestorModel;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorModel.js.map