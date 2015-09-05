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
 * Main entry point for the program. Keeps track of the factory which
 * determines all of the distinctiveness of the type of the game. It
 * initially creates the client as the standard version with numbered
 * keys and doors. The numbers determine the size of the maze being
 * created. The maze must contain an odd number of tiles for both the
 * height and the width. The Client.html, AncestorIndex.html, and the
 * index.html call this and only this.
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
        function KrazeClient(type, height, width) {
            this.initVariables(type, height, width);
            this.initMoves();
        }
        KrazeClient.create = function (type, height, width) {
            return new KrazeClient(type, height, width);
        };
        //Utilizes the moves that are used mapped to their keyboard counterparts
        KrazeClient.prototype.initMoves = function () {
            this.moves = {
                //directional buttons
                37: this.factory.createMove("left"),
                38: this.factory.createMove("up"),
                40: this.factory.createMove("down"),
                39: this.factory.createMove("right"),
                //AWSD buttons
                65: this.factory.createMove("left"),
                87: this.factory.createMove("up"),
                83: this.factory.createMove("down"),
                68: this.factory.createMove("right")
            };
        };
        KrazeClient.prototype.initVariables = function (type, height, width) {
            var mazeHeight = height;
            var mazeWidth = width;
            //Creates the different versions of the game based on the type variable passed in
            if (type.valueOf() == "standard".valueOf()) {
                //The factory field is set to standard. This is the only
                // distinctively Standard variable needed for the model
                this.factory = new StandardFactory();
                //The creator is what's used mainly to generate the maze
                //It requires an already set factory and the number of key/door pairs
                var creator = new StandardMazeCreator(this.factory, 67);
                //Creating the model recquires the dimensions of the maze to be created
                //The method is explained in the included pictures
                this.model = creator.createMaze(mazeHeight, mazeWidth);
                //presenter is the middle man between the view and the model and dictates
                // how to react to certain model events
                this.presenter = new StandardPresenter(this.model);
            }
            else if (type.valueOf() == "ancestor".valueOf()) {
                //The Ancestor factory, a different factory from the Standard factory is created
                this.factory = new AncestorFactory();
                //All of the key/door pairs for the maze are created by tags in the html document
                //They all have to go by the class name popupImage
                //They must also have a valid id that follows these conventions: FirstnameMiddlenameLastname
                //They must also have a valid picture that is referenced
                var ancestorList = document.getElementsByClassName("popupImage");
                var nameList = [];
                for (var i = 0; i < ancestorList.length; i++) {
                    nameList.push(ancestorList[i].id);
                }
                //shuffles the ancestor list so that each time played, the ordering of the ancestors is different
                //works by swapping elements at two random locations does this the size of the list times two
                var randomizeNumber = ancestorList.length * 2;
                for (var i = 0; i < randomizeNumber; i++) {
                    var first = Math.floor(Math.random() * ancestorList.length);
                    var second = Math.floor(Math.random() * ancestorList.length);
                    var temp = nameList[first];
                    nameList[first] = nameList[second];
                    nameList[second] = temp;
                }
                //The strings are in FirstnameMiddlenameLastname format. They need to be changed to
                //Firstname Middlename Lastname so that it's not as weird when trying guess names
                var numberOfKeys = ancestorList.length;
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
                //Model is created via the Ancestor Maze Creator class,
                // which works in a nearly identical way as the Standard
                // Maze Creator class
                this.model = ancestorCreator.createMaze(mazeHeight, mazeWidth);
                //Ancestor Presenter works as the middle man. Does roughly the same thing as the Standard Presenter
                this.presenter = new AncestorPresenter(this.model, this.factory);
            }
        };
        // Called with AncestorIndex.html and with Canvas.html when starting game
        KrazeClient.prototype.setGender = function (gender) {
            this.presenter.setGender(gender);
            this.presenter.executeMove(this.factory.createMove("none"));
        };
        //Called with all three of the html documents. Tells the presenter to execute a move
        KrazeClient.prototype.onKeyDown = function (key) {
            if (!this.presenter.isInPopup()) {
                this.presenter.executeMove(this.moves[key.keyCode]);
            }
        };
        //Only called in index.html and AncestorIndex.html to enter in a name while at a door
        KrazeClient.prototype.enterName = function (name) {
            this.presenter.enterName(name);
        };
        //Only called in index.html and AncestorIndex.html to leave a door unanswered
        KrazeClient.prototype.leavePopup = function () {
            this.presenter.leavePopup();
        };
        return KrazeClient;
    })();
    Main.KrazeClient = KrazeClient;
})(Main || (Main = {}));
//# sourceMappingURL=KrazeClient.js.map