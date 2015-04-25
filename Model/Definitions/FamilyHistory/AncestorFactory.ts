/**
 * Created by phobos2390 on 3/24/15.
 */

///<reference path="../../IKeyParams.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IDoorParams.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../Standard/StandardPlayer.ts"/>
///<reference path="../Standard/StandardKey.ts"/>
///<reference path="../Standard/StandardFactory.ts"/>
///<reference path="AncestorName.ts"/>
///<reference path="AncestorPlayer.ts"/>
///<reference path="AncestorDoorParams.ts"/>
///<reference path="AncestorNameRequirement.ts"/>
///<reference path="AncestorRequirementParams.ts"/>
///<reference path="AncestorNameParams.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.FamilyHistory
{
    import IModelFactory = Model.IModelFactory;
    import IKey = Model.IKey;
    import IKeyParams = Model.IKeyParams;
    import IPlayer = Model.IPlayer;
    import IDoor = Model.IDoor;
    import IDoorParams = Model.IDoorParams;
    import ISpace = Model.ISpace;
    import IRequirement = Model.IRequirement;
    import IRequirementParams = Model.IRequirementParams;
    import StandardFactory = Model.Definitions.Standard.StandardFactory;

    export class AncestorFactory implements IModelFactory
    {
        private factory:IModelFactory;

        public constructor()
        {
            this.factory = new StandardFactory();
        }

        public createKey(params:IKeyParams):IKey
        {
            return new AncestorName((<AncestorNameParams>params).getName());
        }

        public createPlayer():IPlayer
        {
            return new AncestorPlayer();
        }

        public createDoor(params:IDoorParams):IDoor
        {
            return this.factory.createDoor((<AncestorDoorParams>params).getRequirement());
        }

        public createEmptySpace():ISpaceObject
        {
            return this.factory.createEmptySpace();
        }

        public createSpace(x:number,y:number):ISpace
        {
            return this.factory.createSpace(x,y);
        }

        public createRequirement(params:IRequirementParams):IRequirement
        {
            var name:string = (<AncestorRequirementParams>params).getAncestorNameParams();
            return new AncestorNameRequirement(name);
        }

        public createBuilder():IModelBuilder
        {
            return this.factory.createBuilder();
        }

        public createWinSpace():IWinSpaceObject
        {
            return this.factory.createWinSpace();
        }

        public createWallSpace():IWallObject
        {
            return this.factory.createWallSpace();
        }

        public createMove(direction:string):IMove
        {
            return this.factory.createMove(direction);
        }

        public createKeyParams(params):IKeyParams
        {
            return new AncestorNameParams(<string>params);
        }

        public createDoorParams(params):IDoorParams
        {
            return new AncestorDoorParams(<string>params);
        }

        public createRequirementParams(params):IRequirementParams
        {
            return new AncestorRequirementParams(<string>params);
        }
    }
}