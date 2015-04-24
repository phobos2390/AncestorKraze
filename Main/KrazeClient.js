///<reference path="../Presenter/MapPresenter.ts"/>
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
    var MapPresenter = Presenter.MapPresenter;
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
            //this.builder = this.factory.createBuilder();
            //this.builder.setHeight(mazeHeight)
            //            .setWidth(mazeWidth);
            //var player:IPlayer = this.factory.createPlayer();
            //var playerSpace:ISpace = this.factory.createSpace(1,1);
            //var wallSpace:ISpace = this.factory.createSpace(0,0);
            var creator = new StandardMazeCreator(this.factory);
            this.model = creator.createMaze(mazeHeight, mazeWidth);
            //this.builder.setBaseFilledPattern(wallSpace,mazeHeight,mazeWidth);
            //this.builder.setWallsAroundSpace(wallSpace,15,15);
            //this.builder.setKey(this.factory.createSpace(5,5),this.factory.createKey(this.factory.createKeyParams(1)));
            //this.builder.setWall(this.factory.createSpace(13,12));
            //this.builder.setWall(this.factory.createSpace(12,12));
            //this.builder.setDoor(this.factory.createSpace(12,13),this.factory.createDoor(this.factory.createDoorParams(1)));
            //this.builder.setExit(this.factory.createSpace(13,14));
            //this.builder.setPlayer(playerSpace,player);
            //this.model = this.builder.build();
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