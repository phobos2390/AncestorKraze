///<reference path="../../ISpace.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IModelBuilder.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModel.ts"/>
///<reference path="StandardModel.ts"/>
///<reference path="../../IModelFactory.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var Model;
(function (Model) {
    var Definitions;
    (function (Definitions) {
        var Standard;
        (function (Standard) {
            var StandardModelBuilder = (function () {
                function StandardModelBuilder(factory) {
                    this.factory = factory;
                    this.spaces = null;
                    this.heightSet = false;
                    this.widthSet = false;
                    this.sizeSet = false;
                    this.height = 0;
                    this.width = 0;
                    this.setSpace = null;
                    this.keyAndDoorStack = [];
                    this.setKeyandDoorStack = [];
                    this.spaceSetKeyandDoorStack = [];
                }
                StandardModelBuilder.prototype.createBoard = function () {
                    if (this.heightSet && this.widthSet) {
                        this.spaces = new Array();
                        for (var i = 0; i < this.height; i++) {
                            var row = new Array();
                            for (var j = 0; j < this.width; j++) {
                                row.push(this.factory.createSpace(i, j));
                            }
                            this.spaces.push(row);
                        }
                        this.sizeSet = true;
                    }
                };
                StandardModelBuilder.prototype.setHeight = function (height) {
                    this.height = height;
                    this.heightSet = true;
                    this.createBoard();
                    return this;
                };
                StandardModelBuilder.prototype.setWidth = function (width) {
                    this.width = width;
                    this.widthSet = true;
                    this.createBoard();
                    return this;
                };
                StandardModelBuilder.prototype.addSpace = function (space) {
                    if (this.sizeSet) {
                        this.spaces[space.getX()][space.getY()] = space;
                    }
                };
                StandardModelBuilder.prototype.setWall = function (space) {
                    space.setSpaceObject(this.factory.createWallSpace());
                    this.addSpace(space);
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.setKey = function (space, key) {
                    space.setSpaceObject(key);
                    this.addSpace(space);
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.setDoor = function (space, door) {
                    space.setSpaceObject(door);
                    this.addSpace(space);
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.setExit = function (space) {
                    space.setSpaceObject(this.factory.createWinSpace());
                    this.addSpace(space);
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.setEmpty = function (space) {
                    space.setSpaceObject(this.factory.createEmptySpace());
                    this.addSpace(space);
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.setWalls = function (space, width, height) {
                    for (var i = 0; i < width; i++) {
                        for (var j = 0; j < height; j++) {
                            var row = space.getX() + i;
                            var col = space.getY() + j;
                            var newSpace = this.factory.createSpace(row, col);
                            this.setWall(newSpace);
                        }
                    }
                    return this;
                };
                StandardModelBuilder.prototype.setEmpties = function (space, width, height) {
                    for (var i = 0; i < width; i++) {
                        for (var j = 0; j < height; j++) {
                            var row = space.getX() + i;
                            var col = space.getY() + j;
                            var newSpace = this.factory.createSpace(row, col);
                            this.setEmpty(newSpace);
                        }
                    }
                    return this;
                };
                StandardModelBuilder.prototype.setWallsAroundSpace = function (space, width, height) {
                    var rightWall = this.factory.createSpace(space.getX() + width - 1, space.getY());
                    var bottomWall = this.factory.createSpace(space.getX(), space.getY() + height - 1);
                    this.setWalls(space, 1, height);
                    this.setWalls(space, width, 1);
                    this.setWalls(bottomWall, width, 1);
                    this.setWalls(rightWall, 1, height);
                    return this;
                };
                StandardModelBuilder.prototype.setBaseFilledPattern = function (space, width, height) {
                    var onlyWallThisRow = true;
                    var wallThisCol = true;
                    for (var i = 0; i < height; i++) {
                        for (var j = 0; j < width; j++) {
                            var row = space.getX() + i;
                            var col = space.getY() + j;
                            var currSpace = this.factory.createSpace(row, col);
                            if (onlyWallThisRow || wallThisCol) {
                                this.setWall(currSpace);
                            }
                            else {
                                this.setEmpty(currSpace);
                            }
                            wallThisCol = !wallThisCol || onlyWallThisRow;
                        }
                        onlyWallThisRow = !onlyWallThisRow;
                    }
                    return this;
                };
                StandardModelBuilder.prototype.setSpaceBetweenTwoSpaces = function (firstSpace, secondSpace, spaceObject) {
                    var space = this.factory.createSpace((firstSpace.getX() + secondSpace.getX()) / 2, (firstSpace.getY() + secondSpace.getY()) / 2);
                    space.setSpaceObject(spaceObject);
                    this.addSpace(space);
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.setPlayer = function (space, player) {
                    this.player = player;
                    this.playerSpace = space;
                    this.setSpace = space;
                    return this;
                };
                StandardModelBuilder.prototype.peek = function () {
                    return this.keyAndDoorStack[this.keyAndDoorStack.length - 1];
                };
                StandardModelBuilder.prototype.pop = function () {
                    this.spaceSetKeyandDoorStack.push(this.setSpace);
                    this.setKeyandDoorStack.push(this.peek());
                    return this.keyAndDoorStack.pop();
                };
                StandardModelBuilder.prototype.setInitialDoor = function (doorParams) {
                    this.keyAndDoorStack.push(this.factory.createDoor(doorParams));
                    return this;
                };
                StandardModelBuilder.prototype.addKeyAndDoorPairToStack = function (key, doorParams) {
                    this.keyAndDoorStack.push(this.factory.createKey(key));
                    this.keyAndDoorStack.push(this.factory.createDoor(doorParams));
                    return this;
                };
                StandardModelBuilder.prototype.addEmptyToStack = function () {
                    this.keyAndDoorStack.push(this.factory.createEmptySpace());
                    return this;
                };
                StandardModelBuilder.prototype.fixKeyList = function () {
                    while (this.setKeyandDoorStack.length > 0) {
                        this.keyAndDoorStack.push(this.setKeyandDoorStack.pop());
                    }
                    var length = this.spaceSetKeyandDoorStack.length;
                    for (var i = 0; i < length; i++) {
                        var space = this.spaceSetKeyandDoorStack[i];
                        var spaceObject = this.keyAndDoorStack[length - i];
                        space.setSpaceObject(spaceObject);
                        this.addSpace(space);
                    }
                };
                StandardModelBuilder.prototype.build = function () {
                    this.fixKeyList();
                    return new Standard.StandardModel(this.spaces, this.playerSpace, this.player, this.factory);
                };
                StandardModelBuilder.prototype.getSpaces = function () {
                    return this.spaces;
                };
                StandardModelBuilder.prototype.getPlayerSpace = function () {
                    return this.playerSpace;
                };
                StandardModelBuilder.prototype.getPlayer = function () {
                    return this.player;
                };
                return StandardModelBuilder;
            })();
            Standard.StandardModelBuilder = StandardModelBuilder;
        })(Standard = Definitions.Standard || (Definitions.Standard = {}));
    })(Definitions = Model.Definitions || (Model.Definitions = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardModelBuilder.js.map