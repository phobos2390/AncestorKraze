///<reference path="../Presenter/StandardPresenter.ts"/>
///<reference path="../Model/IModelBuilder.ts"/>
///<reference path="../Model/IModelFactory.ts"/>
///<reference path="../Model/Definitions/Standard/StandardFactory.ts"/>
///<reference path="../Model/Generator/Definitions/StandardMazeCreator.ts"/>
///<reference path="../Model/Generator/IMazeCreator.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */
var Main;
(function (Main) {
    var StandardFactory = Model.Definitions.Standard.StandardFactory;
    var MapPresenter = Presenter.StandardPresenter;
    var StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;
    var KrazeClient = (function () {
        function KrazeClient() {
            this.initVariables();
            this.initMoves();
        }
        KrazeClient.Main = function () {
            var client = new KrazeClient();
        };
        KrazeClient.create = function () {
            return new KrazeClient();
        };
        KrazeClient.prototype.initMoves = function () {
            this.moves = {
                65: this.factory.createMove("left"),
                87: this.factory.createMove("up"),
                83: this.factory.createMove("down"),
                68: this.factory.createMove("right")
            };
        };
        KrazeClient.prototype.initVariables = function () {
            var mazeHeight = 51;
            var mazeWidth = 51;
            this.factory = new StandardFactory();
            var creator = new StandardMazeCreator(this.factory);
            this.model = creator.createMaze(mazeHeight, mazeWidth);
            this.presenter = new MapPresenter(this.model);
            this.presenter.executeMove(this.factory.createMove("none"));
        };
        KrazeClient.prototype.onKeyDown = function (key) {
            this.presenter.executeMove(this.moves[key.keyCode]);
        };
        return KrazeClient;
    })();
    Main.KrazeClient = KrazeClient;
})(Main || (Main = {}));
//# sourceMappingURL=KrazeClient.js.map