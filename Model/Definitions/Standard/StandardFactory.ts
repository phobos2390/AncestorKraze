///<reference path="../../IKeyParams.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IDoorParams.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="StandardPlayer.ts"/>
///<reference path="StandardDoor.ts"/>
///<reference path="StandardDoorParams.ts"/>
///<reference path="../../ISpace.ts"/>
///<reference path="StandardEmptySpace.ts"/>
///<reference path="StandardSpace.ts"/>
///<reference path="StandardRequirement.ts"/>
///<reference path="StandardWall.ts"/>
///<reference path="StandardWinObject.ts"/>
///<reference path="StandardKey.ts"/>
///<reference path="StandardMove.ts"/>
///<reference path="StandardModelBuilder.ts"/>
///<reference path="StandardKeyParams.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */

module Model.Definitions.Standard
{
    import IDoor = Model.IDoor;
    import IDoorParams = Model.IDoorParams;
    import IKey = Model.IKey;
    import IKeyParams = Model.IKeyParams;
    import IModel = Model.IModel;
    import IModelArgs = Model.IModelArgs;
    import IModelBuilder = Model.IModelBuilder;
    import IModelFactory = Model.IModelFactory;
    import IModelObservable = Model.IModelObservable;
    import IModelObserver = Model.IModelObserver;
    import IMove = Model.IMove;
    import IPlayer = Model.IPlayer;
    import IRequirement = Model.IRequirement;
    import IRequirementParams = Model.IRequirementParams;
    import ISpace = Model.ISpace;
    import ISpaceObject = Model.ISpaceObject;
    import IWallObject = Model.IWallObject;
    import IWinSpaceObject = Model.IWinSpaceObject;
    import StandardKey = Model.Definitions.Standard.StandardKey;
    import StandardPlayer = Model.Definitions.Standard.StandardPlayer;
    import StandardDoor = Model.Definitions.Standard.StandardDoor;
    import StandardSpace = Model.Definitions.Standard.StandardSpace;
    import StandardRequirement = Model.Definitions.Standard.StandardRequirement;
    import StandardModelBuilder = Model.Definitions.Standard.StandardModelBuilder;
    import StandardWinObject = Model.Definitions.Standard.StandardWinObject;
    import StandardWall = Model.Definitions.Standard.StandardWall;
    import StandardMove = Model.Definitions.Standard.StandardMove;
    import StandardKeyParams = Model.Definitions.Standard.StandardKeyParams;
    import StandardDoorParams = Model.Definitions.Standard.StandardDoorParams;
    import StandardRequirementParams = Model.Definitions.Standard.StandardRequirementParams;
    import StandardEmptySpace = Model.Definitions.Standard.StandardEmptySpace;

    export class StandardFactory implements IModelFactory
    {
        public constructor()
        {

        }

        public createKey(params:IKeyParams):IKey
        {
            return new StandardKey();
        }

        public createPlayer():IPlayer
        {
            return new StandardPlayer();
        }

        public createDoor(params:IDoorParams):IDoor
        {
            return new StandardDoor(params.getRequirement());
        }

        public createSpace(x:number,y:number):ISpace
        {
            return new StandardSpace(x,y);
        }

        public createRequirement(params:IRequirementParams):IRequirement
        {
            return new StandardRequirement((<StandardRequirementParams>params).getNumberOfKeys());
        }

        public createBuilder():IModelBuilder
        {
            return new StandardModelBuilder(this);
        }

        public createWinSpace():IWinSpaceObject
        {
            return new StandardWinObject();
        }

        public createWallSpace():IWallObject
        {
            return new StandardWall();
        }

        public createEmptySpace():ISpaceObject
        {
            return new StandardEmptySpace();
        }

        public createMove(direction:string):IMove
        {
            var deltaX:number = 0;
            var deltaY:number = 0;
            if(direction == "up")
            {
                deltaY = 0;
                deltaX = -1;
            }
            else if(direction == "down")
            {
                deltaY = 0;
                deltaX = 1;
            }
            else if(direction == "left")
            {
                deltaY = -1;
                deltaX = 0;
            }
            else if(direction == "right")
            {
                deltaY = 1;
                deltaX = 0;
            }
            else
            {
                deltaX = 0;
                deltaY = 0;
            }
            return new StandardMove(deltaX,deltaY);
        }

        public createKeyParams(params):IKeyParams
        {
            return new StandardKeyParams();
        }

        public createDoorParams(params):IDoorParams
        {
            return new StandardDoorParams(<number>params,this);
        }

        public createRequirementParams(params):IRequirementParams
        {
            return new StandardRequirementParams(<number>params);
        }
    }
}