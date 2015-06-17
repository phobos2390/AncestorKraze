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
                function StandardModel(spaces, playerSpace, player, factory) {
                    this.observers = [];
                    this.spaces = spaces;
                    this.hasWon = false;
                    this.playerSpace = playerSpace;
                    this.player = player;
                    this.factory = factory;
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
                        this.pickedUpKey = true;
                        this.key = object;
                        this.update();
                        this.pickedUpKey = false;
                        space.setSpaceObject(this.factory.createEmptySpace());
                    }
                    else if (object.objectIsOfType("IWinSpaceObject")) {
                        this.hasWon = true;
                    }
                    //this.setSeenAroundSpace(space.getX(),space.getY());
                    //for(var i:number = 0; i < 3; i++)
                    //{
                    //    for(var j:number = 0; j < 3; j++)
                    //    {
                    //        var index1 = i - 1 + space.getX();
                    //        var index2 = j - 1 + space.getY();
                    //        var currSpace:ISpace = this.getSpace(index1, index2);
                    //        if(currSpace != null)
                    //        {
                    //            currSpace.setSeen();
                    //        }
                    //    }
                    //}
                    //var x:number = space.getX();
                    //var y:number = space.getY();
                    //var currSpace:ISpace = this.getSpace(x,y);
                    //if(move.getDeltaX() != 0 || move.getDeltaY() != 0)
                    //{
                    //    while (currSpace != null)
                    //    {
                    //        currSpace.setSeen();
                    //        if (currSpace.getSpaceObject().objectIsOfType("BlankSpace"))
                    //        {
                    //            x += move.getDeltaX();
                    //            y += move.getDeltaY();
                    //            currSpace = this.getSpace(x, y);
                    //        }
                    //        else
                    //        {
                    //            currSpace = null;
                    //        }
                    //    }
                    //}
                    this.setSeenAlongFaceDir(move, space.getX(), space.getY());
                    this.setSeenNAwayFromPath(2, space.getX(), space.getY());
                    this.playerSpace = space;
                    this.update();
                };
                StandardModel.prototype.setSeenAlongFaceDir = function (move, initX, initY) {
                    var x = initX;
                    var y = initY;
                    var currSpace = this.getSpace(x, y);
                    if (move.getDeltaX() != 0 || move.getDeltaY() != 0) {
                        while (currSpace != null) {
                            if (currSpace.getSpaceObject().objectIsOfType("BlankSpace") || currSpace.getSpaceObject().objectIsOfType("IKey")) {
                                this.setSeenAroundSpace(x, y);
                                x += move.getDeltaX();
                                y += move.getDeltaY();
                                currSpace = this.getSpace(x, y);
                            }
                            else {
                                currSpace.setSeen();
                                currSpace = null;
                            }
                        }
                    }
                };
                StandardModel.prototype.setSeenAroundSpace = function (x, y) {
                    for (var i = 0; i < 3; i++) {
                        for (var j = 0; j < 3; j++) {
                            var index1 = i - 1 + x;
                            var index2 = j - 1 + y;
                            var currSpace = this.getSpace(index1, index2);
                            if (currSpace != null) {
                                currSpace.setSeen();
                            }
                        }
                    }
                };
                StandardModel.prototype.setSeenNAwayFromPath = function (n, x, y) {
                    if (n > 0) {
                        for (var i = 0; i < 2; i++) {
                            var c = 2 * i - 1;
                            var dx = c + x;
                            var dy = c + y;
                            var scx = this.getSpace(dx, y);
                            var scy = this.getSpace(x, dy);
                            if (scx != null) {
                                if (scx.getSpaceObject().objectIsOfType("BlankSpace") || scx.getSpaceObject().objectIsOfType("IKey")) {
                                    this.setSeenAroundSpace(dx, y);
                                    this.setSeenNAwayFromPath(n - 1, dx, y);
                                }
                            }
                            if (scy != null) {
                                if (scy.getSpaceObject().objectIsOfType("BlankSpace") || scy.getSpaceObject().objectIsOfType("IKey")) {
                                    this.setSeenAroundSpace(x, dy);
                                    this.setSeenNAwayFromPath(n - 1, x, dy);
                                }
                            }
                        }
                    }
                };
                StandardModel.prototype.canMovePlayer = function (move) {
                    var space = this.moveSpace(move);
                    var returnBool;
                    if (space.getSpaceObject().objectIsOfType("IDoor")) {
                        var door = space.getSpaceObject();
                        this.requirement = door.getRequirement();
                        this.triedToGetInDoor = true;
                        this.update();
                        this.triedToGetInDoor = false;
                        returnBool = this.player.fulfillsRequirement(this.requirement);
                    }
                    else {
                        returnBool = space.getSpaceObject().canEnterSpace();
                    }
                    return returnBool && !this.hasWon;
                };
                StandardModel.prototype.fulfillRequirement = function (requirement) {
                };
                StandardModel.prototype.won = function () {
                    return this.hasWon;
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
                StandardModel.prototype.update = function () {
                    for (var i = 0; i < this.observers.length; i++) {
                        this.observers[i].update(this);
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