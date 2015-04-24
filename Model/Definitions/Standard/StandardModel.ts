///<reference path="../../IModel.ts"/>
///<reference path="../../IModelObserver.ts"/>
///<reference path="../../ISpace.ts"/>
///<reference path="../../IMove.ts"/>
///<reference path="../../IModelArgs.ts"/>
///<reference path="StandardWall.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="StandardFactory.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IWinSpaceObject.ts"/>
///
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    import IModelObserver = Model.IModelObserver;
    import ISpace = Model.ISpace;
    import IPlayer = Model.IPlayer;
    import StandardFactory = Model.Definitions.Standard.StandardFactory;

    export class StandardModel implements IModel, IModelArgs
    {
        private observers:IModelObserver[];
        private player:IPlayer;
        private pickedUpKey:boolean;
        private key:IKey;
        private triedToGetInDoor:boolean;
        private requirement:IRequirement;
        private hasWon:boolean;
        private redraw:boolean;
        private playerSpace:ISpace;
        private spaces:ISpace[][];
        private factory:IModelFactory;

        public constructor(spaces:ISpace[][],playerSpace:ISpace, player:IPlayer)
        {
            this.observers = [];
            this.spaces = spaces;
            this.hasWon = false;
            this.playerSpace = playerSpace;
            this.player = player;
            this.factory = new Model.Definitions.Standard.StandardFactory();
        }

        public getSpace(x:number, y:number):ISpace
        {
            if(0 <= x && x < this.spaces.length)
            {
                if(0 <= y && y < this.spaces[x].length)
                {
                    return this.spaces[x][y];
                }
            }
            return null;
        }

        private offsetSpace(move:IMove,space:ISpace):ISpace
        {
            return this.factory.createSpace(move.getDeltaX()+space.getX(),
                                            move.getDeltaY()+space.getY());
        }

        private moveSpace(amountMoved:IMove):ISpace
        {
            var space:ISpace = this.offsetSpace(amountMoved,this.playerSpace);
            space = this.getSpace(space.getX(),space.getY());
            return space;
        }

        public movePlayer(move:IMove):void
        {
            var space:ISpace = this.moveSpace(move);
            var object:ISpaceObject = space.getSpaceObject();
            if(object.objectIsOfType("IKey"))
            {
                this.player.addKey(object);
                this.pickedUpKey = true;
                this.key = <IKey>object;
                this.update(this);
                this.pickedUpKey = false;
                space.setSpaceObject(this.factory.createEmptySpace());
            }
            else if(object.objectIsOfType("IWinSpaceObject"))
            {
                this.hasWon = true;
            }
            this.playerSpace = space;
            this.redraw = true;
            this.update(this);
            this.redraw = false;
        }

        public canMovePlayer(move:IMove):boolean
        {
            var space:ISpace = this.moveSpace(move);
            var returnBool:boolean;
            if(space.getSpaceObject().objectIsOfType("IDoor"))
            {
                var door:IDoor = <IDoor>space.getSpaceObject();
                this.requirement = door.getRequirement();
                this.triedToGetInDoor = true;
                this.update(this);
                this.triedToGetInDoor = false;
                returnBool = this.player.fulfillsRequirement(this.requirement);
            }
            else
            {
                returnBool = space.getSpaceObject().canEnterSpace();
            }
            return returnBool;
        }

        public won():boolean
        {
            return this.hasWon;
        }

        public mustRedraw():boolean
        {
            return this.redraw;
        }

        public getPlayer():IPlayer
        {
            return this.player;
        }

        public getCurrentSpace():ISpace
        {
            return this.playerSpace;
        }

        public getObjectInSpace(x:number,y:number):ISpaceObject
        {
            return this.getSpace(x,y).getSpaceObject();
        }

        public registerObserver(observer:IModelObserver):void
        {
            this.observers.push(observer);
        }

        public update(arguments:IModelArgs):void
        {
            for(var i = 0; i < this.observers.length; i++)
            {
                this.observers[i].update(arguments);
            }
        }

        public pickedUpNewKey():boolean
        {
            return this.pickedUpKey;
        }

        public newKey():IKey
        {
            return this.key;
        }

        public attemptedToGetInADoor():boolean
        {
            return this.triedToGetInDoor;
        }

        public doorRequirement():IRequirement
        {
            return this.requirement;
        }
    }
}