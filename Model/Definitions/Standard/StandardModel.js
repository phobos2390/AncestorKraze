///<reference path="../../IModel.ts"/>
///<reference path="../../IModelObserver.ts"/>
///<reference path="../../ISpace.ts"/>
///<reference path="../../IMove.ts"/>
///<reference path="../../IModelArgs.ts"/>
///<reference path="StandardWall.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="StandardFactory.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IWinSpaceObject.ts"/>
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
            var StandardModel = (function () {
                function StandardModel(spaces, playerSpace, player) {
                    this.observers = [];
                    this.spaces = spaces;
                    this.hasWon = false;
                    this.playerSpace = playerSpace;
                    this.player = player;
                    this.factory = new Model.Definitions.Standard.StandardFactory();
                }
                StandardModel.prototype.getSpace = function (x, y) {
                    if (0 <= x && x < this.spaces.length) {
                        if (0 <= y && y < this.spaces[x].length) {
                            return this.spaces[x][y];
                        }
                    }
                    return null;
                };
                StandardModel.prototype.offsetSpace = function (move, space) {
                    return this.factory.createSpace(move.getDeltaX() + space.getX(), move.getDeltaY() + space.getY());
                };
                StandardModel.prototype.moveSpace = function (amountMoved) {
                    var space = this.offsetSpace(amountMoved, this.playerSpace);
                    space = this.getSpace(space.getX(), space.getY());
                    return space;
                };
                StandardModel.prototype.movePlayer = function (move) {
                    var space = this.moveSpace(move);
                    var object = space.getSpaceObject();
                    if (object.objectIsOfType("IKey")) {
                        this.player.addKey(object);
                        this.pickedUpKey = true;
                        this.key = object;
                        this.update(this);
                        this.pickedUpKey = false;
                        space.setSpaceObject(this.factory.createEmptySpace());
                    }
                    else if (object.objectIsOfType("IWinSpaceObject")) {
                        this.hasWon = true;
                    }
                    this.playerSpace = space;
                    this.redraw = true;
                    this.update(this);
                    this.redraw = false;
                };
                StandardModel.prototype.canMovePlayer = function (move) {
                    var space = this.moveSpace(move);
                    var returnBool;
                    if (space.getSpaceObject().objectIsOfType("IDoor")) {
                        var door = space.getSpaceObject();
                        this.requirement = door.getRequirement();
                        this.triedToGetInDoor = true;
                        this.update(this);
                        this.triedToGetInDoor = false;
                        returnBool = this.player.fulfillsRequirement(this.requirement);
                    }
                    else {
                        returnBool = space.getSpaceObject().canEnterSpace();
                    }
                    return returnBool;
                };
                StandardModel.prototype.won = function () {
                    return this.hasWon;
                };
                StandardModel.prototype.mustRedraw = function () {
                    return this.redraw;
                };
                StandardModel.prototype.getPlayer = function () {
                    return this.player;
                };
                StandardModel.prototype.getCurrentSpace = function () {
                    return this.playerSpace;
                };
                StandardModel.prototype.getObjectInSpace = function (x, y) {
                    return this.getSpace(x, y).getSpaceObject();
                };
                StandardModel.prototype.registerObserver = function (observer) {
                    this.observers.push(observer);
                };
                StandardModel.prototype.update = function (arguments) {
                    for (var i = 0; i < this.observers.length; i++) {
                        this.observers[i].update(arguments);
                    }
                };
                StandardModel.prototype.pickedUpNewKey = function () {
                    return this.pickedUpKey;
                };
                StandardModel.prototype.newKey = function () {
                    return this.key;
                };
                StandardModel.prototype.attemptedToGetInADoor = function () {
                    return this.triedToGetInDoor;
                };
                StandardModel.prototype.doorRequirement = function () {
                    return this.requirement;
                };
                return StandardModel;
            })();
            Standard.StandardModel = StandardModel;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardModel.js.map