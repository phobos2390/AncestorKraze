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
module Main
{
    import IModelFactory = Model.IModelFactory;
    import IModelBuilder = Model.IModelBuilder;
    import IModel = Model.IModel;
    import IMove = Model.IMove;
    import IPlayer = Model.IPlayer;
    import ISpace = Model.ISpace;
    import StandardFactory = Model.Definitions.Standard.StandardFactory;
    import AncestorFactory = Model.Definitions.FamilyHistory.AncestorFactory;
    import AncestorPresenter = Presenter.AncestorPresenter;
    import StandardPresenter = Presenter.StandardPresenter;
    import IPresenter = Presenter.IPresenter;
    import IMazeCreator = Model.Generator.IMazeCreator;
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;
    import AncestorMazeCreator = Model.Generator.Definitions.AncestorMazeCreator;

    export class KrazeClient
    {
        private factory:IModelFactory;
        private builder:IModelBuilder;
        private model:IModel;
        private presenter:IPresenter;
        private moves;

        public static Main():void
        {
            var client = new KrazeClient("standard");
        }

        public static create(type):KrazeClient
        {
            return new KrazeClient(type);
        }

        public constructor(type)
        {
            this.initVariables(type);
            this.initMoves();
        }

        private initMoves()
        {
            this.moves =
            {
                65:this.factory.createMove("left"),
                87:this.factory.createMove("up"),
                83:this.factory.createMove("down"),
                68:this.factory.createMove("right")
            };
        }

        private initVariables(type)
        {
            var mazeHeight:number = 25;
            var mazeWidth:number = 25;
            if(type.valueOf() == "standard".valueOf())
            {
                this.factory = new StandardFactory();
                var creator:IMazeCreator = new StandardMazeCreator(this.factory,9);
                this.model = creator.createMaze(mazeHeight, mazeWidth);
                this.presenter = new StandardPresenter(this.model);
            }
            else if(type.valueOf() == "ancestor".valueOf())
            {
                this.factory = new AncestorFactory();
                var ancestorList = document.getElementsByClassName("popupImage");
                var numberOfKeys = ancestorList.length;
                var ancestorCreator:AncestorMazeCreator = new AncestorMazeCreator(this.factory,numberOfKeys);
                for(var i = 0; i < ancestorList.length; i++)
                {
                    var baseName = ancestorList[i].id;
                    var ancestorName = "";
                    var spaceAppend = "";
                    for(var j = 0; j < baseName.length; j++)
                    {
                        var currChar:char = baseName.charAt(j);
                        if('A'<=currChar&&currChar<='Z')
                        {
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
        }

        public onKeyDown(key):void
        {
            this.presenter.executeMove(<IMove>this.moves[key.keyCode]);
        }

        public enterName(name):void
        {
            (<AncestorPresenter>this.presenter).enterName(name);
        }
    }
}