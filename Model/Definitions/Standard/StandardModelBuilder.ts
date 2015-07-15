///<reference path="../../ISpace.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IModelBuilder.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModel.ts"/>
///<reference path="StandardModel.ts"/>
///<reference path="../../IModelFactory.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    import IModelFactory = Model.IModelFactory;
    import ISpace = Model.ISpace;
    import IPlayer = Model.IPlayer;


    export class StandardModelBuilder implements IModelBuilder
    {
        private spaces:ISpace[][];
        private player:IPlayer;
        private factory:IModelFactory;
        private playerSpace:ISpace;
        private height:number;
        private width:number;
        private heightSet:boolean;
        private widthSet:boolean;
        private sizeSet:boolean;
        private keyAndDoorStack;
        private setSpace:ISpace;
        private setKeyandDoorStack;
        private spaceSetKeyandDoorStack;

        public constructor(factory:IModelFactory)
        {
            this.factory = factory;
            this.spaces = null;
            this.heightSet = false;
            this.widthSet = false;
            this.sizeSet = false;
            this.height = 0;
            this.width = 0;
            this.setSpace = null;
            this.keyAndDoorStack = [];
            this.setKeyandDoorStack = [];
            this.spaceSetKeyandDoorStack = [];
        }

        private createBoard()
        {
            if(this.heightSet && this.widthSet)
            {
                this.spaces = new Array<ISpace[]>();
                for(var i:number = 0; i < this.height; i++)
                {
                    var row:ISpace[] = new Array<ISpace>();
                    for(var j:number = 0; j < this.width; j++)
                    {
                        row.push(this.factory.createSpace(i,j));
                    }
                    this.spaces.push(row);
                }
                this.sizeSet = true;
            }
        }

        public setHeight(height:number):IModelBuilder
        {
            this.height = height;
            this.heightSet = true;
            this.createBoard();
            return this;
        }

        public setWidth(width:number):IModelBuilder
        {
            this.width = width;
            this.widthSet = true;
            this.createBoard();
            return this;
        }

        private addSpace(space:ISpace):void
        {
            if(this.sizeSet)
            {
                this.spaces[space.getX()][space.getY()] = space;
            }
        }

        public setWall(space:ISpace):IModelBuilder
        {
            space.setSpaceObject(this.factory.createWallSpace());
            this.addSpace(space);
            this.setSpace = space;
            return this;
        }

        public setKey(space:ISpace, key:IKey):IModelBuilder
        {
            space.setSpaceObject(key);
            this.addSpace(space);
            this.setSpace = space;
            return this;
        }

        public setDoor(space:ISpace, door:IDoor):IModelBuilder
        {
            space.setSpaceObject(door);
            this.addSpace(space);
            this.setSpace = space;
            return this;
        }

        public setExit(space:ISpace):IModelBuilder
        {
            space.setSpaceObject(this.factory.createWinSpace());
            this.addSpace(space);
            this.setSpace = space;
            return this;
        }

        public setEmpty(space:ISpace):IModelBuilder
        {
            space.setSpaceObject(this.factory.createEmptySpace());
            this.addSpace(space);
            this.setSpace = space;
            return this;
        }

        public setWalls(space:ISpace,width:number,height:number):IModelBuilder
        {
            for(var i:number = 0; i < width; i++)
            {
                for(var j:number = 0; j < height; j++)
                {
                    var row:number = space.getX() + i;
                    var col:number = space.getY() + j;
                    var newSpace:ISpace = this.factory.createSpace(row,col);
                    this.setWall(newSpace);
                }
            }
            return this;
        }

        public setEmpties(space:ISpace,width:number,height:number):IModelBuilder
        {
            for(var i:number = 0; i < width; i++)
            {
                for(var j:number = 0; j < height; j++)
                {
                    var row:number = space.getX() + i;
                    var col:number = space.getY() + j;
                    var newSpace:ISpace = this.factory.createSpace(row,col);
                    this.setEmpty(newSpace);
                }
            }
            return this;
        }

        public setWallsAroundSpace(space:ISpace,width:number,height:number):IModelBuilder
        {
            var rightWall:ISpace = this.factory.createSpace(space.getX()+width-1,space.getY());
            var bottomWall:ISpace = this.factory.createSpace(space.getX(),space.getY()+height-1);
            this.setWalls(space,1,height);
            this.setWalls(space,width,1);
            this.setWalls(bottomWall,width,1);
            this.setWalls(rightWall,1,height);
            return this;
        }

        public setBaseFilledPattern(space:ISpace,width:number,height:number):IModelBuilder
        {
            var onlyWallThisRow = true;
            var wallThisCol = true;
            for(var i:number = 0; i < height; i++)
            {
                for(var j:number = 0; j < width; j++)
                {
                    var row:number = space.getX() + i;
                    var col:number = space.getY() + j;
                    var currSpace:ISpace = this.factory.createSpace(row,col);
                    if(onlyWallThisRow || wallThisCol)
                    {
                        this.setWall(currSpace);
                    }
                    else
                    {
                        this.setEmpty(currSpace);
                    }
                    wallThisCol = !wallThisCol || onlyWallThisRow;
                }
                onlyWallThisRow = !onlyWallThisRow;
            }
            return this;
        }

        public setSpaceBetweenTwoSpaces(firstSpace:ISpace,secondSpace:ISpace,spaceObject:ISpaceObject):IModelBuilder
        {
            var space:ISpace = this.factory.createSpace(
                                  (firstSpace.getX() + secondSpace.getX())/2,
                                  (firstSpace.getY() + secondSpace.getY())/2);
            space.setSpaceObject(spaceObject);
            this.addSpace(space);
            this.setSpace = space;
            return this;
        }

        public setPlayer(space:ISpace, player:IPlayer):IModelBuilder
        {
            this.player = player;
            this.playerSpace = space;
            this.setSpace = space;
            return this;
        }

        public peek():ISpaceObject
        {
            return <ISpaceObject>this.keyAndDoorStack[this.keyAndDoorStack.length - 1];
        }

        public pop():ISpaceObject
        {
            this.spaceSetKeyandDoorStack.push(this.setSpace);
            this.setKeyandDoorStack.push(this.peek());
            return <ISpaceObject>this.keyAndDoorStack.pop();
        }

        public setInitialDoor(doorParams:IDoorParams):IModelBuilder
        {
            this.keyAndDoorStack.push(this.factory.createDoor(doorParams));
            return this;
        }

        public addKeyAndDoorPairToStack(key:IKeyParams,doorParams:IDoorParams):IModelBuilder
        {
            this.keyAndDoorStack.push(this.factory.createKey(key));
            this.keyAndDoorStack.push(this.factory.createDoor(doorParams));
            return this;
        }

        public addEmptyToStack():IModelBuilder
        {
            this.keyAndDoorStack.push(this.factory.createEmptySpace());
            return this;
        }

        public fixKeyList():void
        {
            while(this.setKeyandDoorStack.length > 0)
            {
                this.keyAndDoorStack.push(this.setKeyandDoorStack.pop());
            }
            var length:number = this.spaceSetKeyandDoorStack.length;
            for(var i:number = 0; i < length; i++)
            {
                var space:ISpace = this.spaceSetKeyandDoorStack[i];
                var spaceObject:ISpaceObject = this.keyAndDoorStack[length - i];
                space.setSpaceObject(spaceObject);
                this.addSpace(space);
            }
        }

        public build():IModel
        {
            this.fixKeyList();
            return new StandardModel(this.spaces,this.playerSpace,this.player,this.factory);
        }

        public getSpaces():ISpace[][]
        {
            return this.spaces;
        }

        public getPlayerSpace():ISpace
        {
            return this.playerSpace;
        }

        public getPlayer():IPlayer
        {
            return this.player;
        }
    }
}
