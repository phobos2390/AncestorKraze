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
        private boolean:inPopup;

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
                37:this.factory.createMove("left"),
                38:this.factory.createMove("up"),
                40:this.factory.createMove("down"),
                39:this.factory.createMove("right"),
                65:this.factory.createMove("left"),
                87:this.factory.createMove("up"),
                83:this.factory.createMove("down"),
                68:this.factory.createMove("right")
            };
        }

        private initVariables(type)
        {
            var mazeHeight:number = 45;
            var mazeWidth:number = 45;
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
                var nameList = [];
                for(var i:number = 0; i < ancestorList.length; i++)
                {
                    nameList.push(ancestorList[i].id);
                }
                for(var i:number = 0; i < 50; i++)
                {
                    var first:number = Math.floor(Math.random()*ancestorList.length);
                    var second:number = Math.floor(Math.random()*ancestorList.length);
                    var temp = nameList[first];
                    nameList[first] = nameList[second];
                    nameList[second] = temp;
                }
                var numberOfKeys = ancestorList.length;
                var ancestorCreator:AncestorMazeCreator = new AncestorMazeCreator(this.factory,numberOfKeys);
                for(var i = 0; i < ancestorList.length; i++)
                {
                    var baseName = nameList[i];
                    var ancestorName = "";
                    var spaceAppend = "";
                    for(var j = 0; j < baseName.length; j++)
                    {
                        var currChar = baseName.charAt(j);
                        if('A'<=currChar&&currChar<='Z')
                        {
                            ancestorName = ancestorName.concat(spaceAppend);
                        }
                        ancestorName = ancestorName.concat(currChar);
                        spaceAppend = " ";
                    }
                    ancestorCreator.addKey(ancestorName);
                }
                this.model = ancestorCreator.createMaze(mazeHeight, mazeWidth);
                this.presenter = new AncestorPresenter(this.model,this.factory);
            }
        }

        public setGender(gender:string)
        {
            this.presenter.setGender(gender);
            this.presenter.executeMove(this.factory.createMove("none"));
        }

        public onKeyDown(key):void
        {
            if(!this.presenter.isInPopup())
            {
                this.presenter.executeMove(<IMove>this.moves[key.keyCode]);
            }
        }

        public enterName(name):void
        {
            (<AncestorPresenter>this.presenter).enterName(name);
        }

        public leavePopup()
        {
            (<AncestorPresenter>this.presenter).leavePopup();
        }
    }
}