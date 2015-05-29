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
        private playerSpace:ISpace;
        private spaces:ISpace[][];
        private factory:IModelFactory;

        public constructor(spaces:ISpace[][],playerSpace:ISpace, player:IPlayer, factory:IModelFactory)
        {
            this.observers = [];
            this.spaces = spaces;
            this.hasWon = false;
            this.playerSpace = playerSpace;
            this.player = player;
            this.factory = factory;
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
                this.pickedUpKey = true;
                this.key = <IKey>object;
                this.update();
                this.pickedUpKey = false;
                space.setSpaceObject(this.factory.createEmptySpace());
            }
            else if(object.objectIsOfType("IWinSpaceObject"))
            {
                this.hasWon = true;
            }
            //this.setSeenAroundSpace(space.getX(),space.getY());
            //for(var i:number = 0; i < 3; i++)
            //{
            //    for(var j:number = 0; j < 3; j++)
            //    {
            //        var index1 = i - 1 + space.getX();
            //        var index2 = j - 1 + space.getY();
            //        var currSpace:ISpace = this.getSpace(index1, index2);
            //        if(currSpace != null)
            //        {
            //            currSpace.setSeen();
            //        }
            //    }
            //}
            //var x:number = space.getX();
            //var y:number = space.getY();
            //var currSpace:ISpace = this.getSpace(x,y);
            //if(move.getDeltaX() != 0 || move.getDeltaY() != 0)
            //{
            //    while (currSpace != null)
            //    {
            //        currSpace.setSeen();
            //        if (currSpace.getSpaceObject().objectIsOfType("BlankSpace"))
            //        {
            //            x += move.getDeltaX();
            //            y += move.getDeltaY();
            //            currSpace = this.getSpace(x, y);
            //        }
            //        else
            //        {
            //            currSpace = null;
            //        }
            //    }
            //}
            this.setSeenAlongFaceDir(move,space.getX(),space.getY());
            this.setSeenNAwayFromPath(2,space.getX(),space.getY());
            this.playerSpace = space;
            this.update();
        }

        private setSeenAlongFaceDir(move:IMove, initX:number, initY:number)
        {
            var x:number = initX;
            var y:number = initY;
            var currSpace:ISpace = this.getSpace(x,y);
            if(move.getDeltaX() != 0 || move.getDeltaY() != 0)
            {
                while (currSpace != null)
                {
                    if (currSpace.getSpaceObject().objectIsOfType("BlankSpace"))
                    {
                        this.setSeenAroundSpace(x,y);
                        x += move.getDeltaX();
                        y += move.getDeltaY();
                        currSpace = this.getSpace(x, y);
                    }
                    else
                    {
                        currSpace.setSeen();
                        currSpace = null;
                    }
                }
            }
        }

        private setSeenAroundSpace(x:number, y:number)
        {
            for(var i:number = 0; i < 3; i++)
            {
                for(var j:number = 0; j < 3; j++)
                {
                    var index1 = i - 1 + x;
                    var index2 = j - 1 + y;
                    var currSpace:ISpace = this.getSpace(index1, index2);
                    if(currSpace != null)
                    {
                        currSpace.setSeen();
                    }
                }
            }
        }

        private setSeenNAwayFromPath(n:number,x:number,y:number)
        {
            if(n > 0)
            {
                for (var i:number = 0; i < 2; i++)
                {
                    var c:number = 2 * i - 1;
                    var dx:number = c + x;
                    var dy:number = c + y;
                    var scx:ISpace = this.getSpace(dx, y);
                    var scy:ISpace = this.getSpace(x, dy);
                    if (scx != null)
                    {
                        if (scx.getSpaceObject().objectIsOfType("BlankSpace"))
                        {
                            this.setSeenAroundSpace(dx,y);
                            this.setSeenNAwayFromPath(n - 1, dx, y);
                        }
                    }
                    if(scy != null)
                    {
                        if (scy.getSpaceObject().objectIsOfType("BlankSpace"))
                        {
                            this.setSeenAroundSpace(x,dy);
                            this.setSeenNAwayFromPath(n - 1, x, dy);
                        }
                    }
                }
            }
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
                this.update();
                this.triedToGetInDoor = false;
                returnBool = this.player.fulfillsRequirement(this.requirement);
            }
            else
            {
                returnBool = space.getSpaceObject().canEnterSpace();
            }
            return returnBool && !this.hasWon;
        }

        public fulfillRequirement(requirement:IRequirement):void
        {

        }

        public won():boolean
        {
            return this.hasWon;
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

        public update():void
        {
            for(var i = 0; i < this.observers.length; i++)
            {
                this.observers[i].update(this);
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