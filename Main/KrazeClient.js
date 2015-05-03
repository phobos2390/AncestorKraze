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
                65: this.factory.createMove("left"),
                87: this.factory.createMove("up"),
                83: this.factory.createMove("down"),
                68: this.factory.createMove("right")
            };
        };
        KrazeClient.prototype.initVariables = function (type) {
            var mazeHeight = 25;
            var mazeWidth = 25;
            if (type.valueOf() == "standard".valueOf()) {
                this.factory = new StandardFactory();
                var creator = new StandardMazeCreator(this.factory, 9);
                this.model = creator.createMaze(mazeHeight, mazeWidth);
                this.presenter = new StandardPresenter(this.model);
            }
            else if (type.valueOf() == "ancestor".valueOf()) {
                this.factory = new AncestorFactory();
                var ancestorList = document.getElementsByClassName("popupImage");
                var numberOfKeys = ancestorList.length;
                var ancestorCreator = new AncestorMazeCreator(this.factory, numberOfKeys);
                for (var i = 0; i < ancestorList.length; i++) {
                    var baseName = ancestorList[i].id;
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
                    console.log(ancestorName);
                    ancestorCreator.addKey(ancestorName);
                }
                //ancestorCreator.addKey("Joseph Smith");
                //ancestorCreator.addKey("Oliver Cowdery");
                //ancestorCreator.addKey("Brigham Young");
                //ancestorCreator.addKey("John Taylor");
                //ancestorCreator.addKey("Emma Smith");
                //ancestorCreator.addKey("Eliza Snow");
                //ancestorCreator.addKey("Martin Harris");
                //ancestorCreator.addKey("Sidney Rigdon");
                //ancestorCreator.addKey("Heber Kimball");
                //ancestorCreator.addKey("Parley Pratt");
                this.model = ancestorCreator.createMaze(mazeHeight, mazeWidth);
                this.presenter = new AncestorPresenter(this.model);
            }
            this.presenter.executeMove(this.factory.createMove("none"));
        };
        KrazeClient.prototype.onKeyDown = function (key) {
            this.presenter.executeMove(this.moves[key.keyCode]);
        };
        KrazeClient.prototype.enterName = function (name) {
            this.presenter.enterName(name);
        };
        return KrazeClient;
    })();
    Main.KrazeClient = KrazeClient;
})(Main || (Main = {}));
//# sourceMappingURL=KrazeClient.js.map