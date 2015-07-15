///<reference path="../../ISpace.ts"/>
///<reference path="../../IKey.ts"/>
///<reference path="../../IModelBuilder.ts"/>
///<reference path="../../IDoor.ts"/>
///<reference path="../../IPlayer.ts"/>
///<reference path="../../IModel.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../Standard/StandardModelBuilder.ts"/>
///<reference path="AncestorModel.ts"/>
/**
 * Child class of the Standard Model Builder. The only difference between the two is
 * that the Ancestor Builder builds an Ancestor Model and not a Standard Model
 * Created by phobos2390 on 5/2/15.
 */
module Model.Definitions.FamilyHistory
{
    import IModelFactory = Model.IModelFactory;
    import ISpace = Model.ISpace;
    import IPlayer = Model.IPlayer;
    import StandardModelBuilder = Model.Definitions.Standard.StandardModelBuilder;
    import AncestorModel = Model.Definitions.FamilyHistory.AncestorModel;

    export class AncestorBuilder implements IModelBuilder
    {
        private base:StandardModelBuilder;
        private factory:IModelFactory;

        public constructor(factory:IModelFactory)
        {
            this.factory = factory;
            this.base = new StandardModelBuilder(this.factory);
        }

        public setHeight(height:number):IModelBuilder
        {
            return this.base.setHeight(height);
        }

        public setWidth(width:number):IModelBuilder
        {
            return this.base.setWidth(width);
        }

        public setWall(space:ISpace):IModelBuilder
        {
            return this.base.setWall(space);
        }

        public setKey(space:ISpace, key:IKey):IModelBuilder
        {
            return this.base.setKey(space,key);
        }

        public setDoor(space:ISpace, door:IDoor):IModelBuilder
        {
            return this.base.setDoor(space,door);
        }

        public setExit(space:ISpace):IModelBuilder
        {
            return this.base.setExit(space);
        }

        public setEmpty(space:ISpace):IModelBuilder
        {
            return this.base.setEmpty(space);
        }

        public setWalls(space:ISpace,width:number,height:number):IModelBuilder
        {
            return this.base.setWalls(space,width,height);
        }

        public setEmpties(space:ISpace,width:number,height:number):IModelBuilder
        {
            return this.base.setEmpties(space,width,height);
        }

        public setWallsAroundSpace(space:ISpace,width:number,height:number):IModelBuilder
        {
            return this.base.setWallsAroundSpace(space,width,height);
        }

        public setBaseFilledPattern(space:ISpace,width:number,height:number):IModelBuilder
        {
            return this.base.setBaseFilledPattern(space,width,height);
        }

        public setSpaceBetweenTwoSpaces(firstSpace:ISpace,secondSpace:ISpace,spaceObject:ISpaceObject):IModelBuilder
        {
            return this.base.setSpaceBetweenTwoSpaces(firstSpace,secondSpace,spaceObject);
        }

        public setPlayer(space:ISpace, player:IPlayer):IModelBuilder
        {
            return this.base.setPlayer(space,player);
        }

        public peek():ISpaceObject
        {
            return this.base.peek();
        }

        public pop():ISpaceObject
        {
            return this.base.pop();
        }

        public setInitialDoor(doorParams:IDoorParams):IModelBuilder
        {
            return this.base.setInitialDoor(doorParams);
        }

        public addKeyAndDoorPairToStack(key:IKeyParams,doorParams:IDoorParams):IModelBuilder
        {
            return this.base.addKeyAndDoorPairToStack(key,doorParams);
        }

        public addEmptyToStack():IModelBuilder
        {
            return this.base.addEmptyToStack();
        }

        public build():IModel
        {
            this.base.fixKeyList();
            return new AncestorModel(this.base.getSpaces(),this.base.getPlayerSpace(),this.base.getPlayer(),this.factory);
        }
    }
}
