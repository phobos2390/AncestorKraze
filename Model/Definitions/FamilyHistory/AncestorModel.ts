///<reference path="../../IModel.ts"/>
///<reference path="../../IModelObserver.ts"/>
///<reference path="../../ISpace.ts"/>
///<reference path="../../IMove.ts"/>
///<reference path="../../IModelArgs.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IWinSpaceObject.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="AncestorFactory.ts"/>
///<reference path="../Standard/StandardFactory.ts"/>
///
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.FamilyHistory
{
    import IModelObserver = Model.IModelObserver;
    import ISpace = Model.ISpace;
    import IPlayer = Model.IPlayer;
    import StandardFactory = Model.Definitions.Standard.StandardFactory;
    import IModelFactory = Model.IModelFactory;
    import AncestorFactory = Model.Definitions.FamilyHistory.AncestorFactory;
    import StandardModel = Model.Definitions.Standard.StandardModel;

    export class AncestorModel implements IModel, IModelArgs
    {
        private baseModel:StandardModel;
        private playerSpace:ISpace;
        private factory:IModelFactory;

        public constructor(spaces:ISpace[][],playerSpace:ISpace, player:IPlayer,factory:IModelFactory)
        {
            this.factory = factory;
            this.baseModel = new StandardModel(spaces,playerSpace,player,this.factory);
            this.playerSpace = playerSpace;
        }

        public getSpace(x:number, y:number):ISpace
        {
            return this.baseModel.getSpace(x,y);
        }

        public movePlayer(move:IMove):void
        {
            this.baseModel.movePlayer(move);
        }

        public canMovePlayer(move:IMove):boolean
        {
            //var space:ISpace = this.moveSpace(move);
            //var returnBool:boolean;
            //if(space.getSpaceObject().objectIsOfType("IDoor"))
            //{
            //    var door:IDoor = <IDoor>space.getSpaceObject();
            //    this.requirement = door.getRequirement();
            //    this.triedToGetInDoor = true;
            //    this.update(this);
            //    this.triedToGetInDoor = false;
            //    returnBool = this.player.fulfillsRequirement(this.requirement);
            //}
            //else
            //{
            //    returnBool = space.getSpaceObject().canEnterSpace();
            //}
            //return returnBool;
            return this.baseModel.canMovePlayer(move);
        }

        public fulfillRequirement(requirement:IRequirement):void
        {

        }

        public won():boolean
        {
            return this.baseModel.won();
        }

        public getPlayer():IPlayer
        {
            return this.baseModel.getPlayer();
        }

        public getCurrentSpace():ISpace
        {
            return this.baseModel.getCurrentSpace();
        }

        public getObjectInSpace(x:number,y:number):ISpaceObject
        {
            return this.baseModel.getObjectInSpace(x,y);
        }

        public registerObserver(observer:IModelObserver):void
        {
            this.baseModel.registerObserver(observer);
        }

        public update():void
        {
            this.baseModel.update();
        }

        public pickedUpNewKey():boolean
        {
            return this.baseModel.pickedUpNewKey();
        }

        public newKey():IKey
        {
            return this.baseModel.newKey();
        }

        public attemptedToGetInADoor():boolean
        {
            return this.baseModel.attemptedToGetInADoor();
        }

        public doorRequirement():IRequirement
        {
            return this.baseModel.doorRequirement();
        }
    }
}