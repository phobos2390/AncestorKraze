///<reference path="../Presenter/StandardPresenter.ts"/>
///<reference path="../Model/IModelBuilder.ts"/>
///<reference path="../Model/IModelFactory.ts"/>
///<reference path="../Model/Definitions/Standard/StandardFactory.ts"/>
///<reference path="../Model/Generator/Definitions/StandardMazeCreator.ts"/>
///<reference path="../Model/Generator/Definitions/AncestorMazeCreator.ts"/>
///<reference path="../Model/Generator/IMazeCreator.ts"/>
///<reference path="../Model/Definitions/FamilyHistory/AncestorFactory.ts"/>
///<reference path="../Presenter/AncestorPresenter.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */
var Main;
(function (Main) {
    var StandardFactory = Model.Definitions.Standard.StandardFactory;
    var AncestorFactory = Model.Definitions.FamilyHistory.AncestorFactory;
    var AncestorPresenter = Presenter.AncestorPresenter;
    var StandardPresenter = Presenter.StandardPresenter;
    var StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;
    var AncestorMazeCreator = Model.Generator.Definitions.AncestorMazeCreator;
    var KrazeClient = (function () {
        function KrazeClient(type) {
            this.initVariables(type);
            this.initMoves();
        }
        KrazeClient.Main = function () {
            var client = new KrazeClient("standard");
        };
        KrazeClient.create = function (type) {
            return new KrazeClient(type);
        };
        KrazeClient.prototype.initMoves = function () {
            this.moves = {
                37: this.factory.createMove("left"),
                38: this.factory.createMove("up"),
                40: this.factory.createMove("down"),
                39: this.factory.createMove("right"),
                65: this.factory.createMove("left"),
                87: this.factory.createMove("up"),
                83: this.factory.createMove("down"),
                68: this.factory.createMove("right")
            };
        };
        KrazeClient.prototype.initVariables = function (type) {
            var mazeHeight = 25;
            var mazeWidth = 25;
            var averageBranches = 14;
            if (type.valueOf() == "standard".valueOf()) {
                this.factory = new StandardFactory();
                var creator = new StandardMazeCreator(this.factory, Math.min(19, averageBranches));
                this.model = creator.createMaze(mazeHeight, mazeWidth);
                this.presenter = new StandardPresenter(this.model);
            }
            else if (type.valueOf() == "ancestor".valueOf()) {
                this.factory = new AncestorFactory();
                var ancestorList = document.getElementsByClassName("popupImage");
                var nameList = [];
                for (var i = 0; i < ancestorList.length; i++) {
                    nameList.push(ancestorList[i].id);
                }
                var randomizeNumber = ancestorList.length * 2;
                for (var i = 0; i < randomizeNumber; i++) {
                    var first = Math.floor(Math.random() * ancestorList.length);
                    var second = Math.floor(Math.random() * ancestorList.length);
                    var temp = nameList[first];
                    nameList[first] = nameList[second];
                    nameList[second] = temp;
                }
                var numberOfKeys = Math.min(ancestorList.length, averageBranches);
                var ancestorCreator = new AncestorMazeCreator(this.factory, numberOfKeys);
                for (var i = 0; i < numberOfKeys; i++) {
                    var baseName = nameList[i];
                    var ancestorName = "";
                    var spaceAppend = "";
                    for (var j = 0; j < baseName.length; j++) {
                        var currChar = baseName.charAt(j);
                        if ('A' <= currChar && currChar <= 'Z') {
                            ancestorName = ancestorName.concat(spaceAppend);
                        }
                        ancestorName = ancestorName.concat(currChar);
                        spaceAppend = " ";
                    }
                    ancestorCreator.addKey(ancestorName);
                }
                this.model = ancestorCreator.createMaze(mazeHeight, mazeWidth);
                this.presenter = new AncestorPresenter(this.model, this.factory);
            }
        };
        KrazeClient.prototype.setGender = function (gender) {
            this.presenter.setGender(gender);
            this.presenter.executeMove(this.factory.createMove("none"));
        };
        KrazeClient.prototype.onKeyDown = function (key) {
            if (!this.presenter.isInPopup()) {
                this.presenter.executeMove(this.moves[key.keyCode]);
            }
        };
        KrazeClient.prototype.enterName = function (name) {
            this.presenter.enterName(name);
        };
        KrazeClient.prototype.leavePopup = function () {
            this.presenter.leavePopup();
        };
        return KrazeClient;
    })();
    Main.KrazeClient = KrazeClient;
})(Main || (Main = {}));
//# sourceMappingURL=KrazeClient.js.map