///<reference path="ISpace.ts"/>
///<reference path="IKey.ts"/>
///<reference path="IDoor.ts"/>
///<reference path="IPlayer.ts"/>
///<reference path="IModel.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */

/**
 * Builds the Model
 */
module Model
{
    export interface IModelBuilder
    {
        setWall(space:ISpace):IModelBuilder;
        setKey(space:ISpace,key:IKey):IModelBuilder;
        setDoor(space:ISpace,door:IDoor):IModelBuilder;
        setDoorBetweenTwoSpaces(firstSpace:ISpace,secondSpace:ISpace,door:IDoor):IModelBuilder;
        setExit(space:ISpace):IModelBuilder;
        setEmpty(space:ISpace):IModelBuilder;
        setWalls(space:ISpace,width:number,height:number):IModelBuilder;
        setEmpties(space:ISpace,width:number,height:number):IModelBuilder;
        setWallsAroundSpace(space:ISpace,width:number,height:number):IModelBuilder;
        setBaseFilledPattern(space:ISpace,width:number,height:number):IModelBuilder;
        peek():ISpaceObject;
        pop():ISpaceObject
        setInitialDoor(doorParams:IDoorParams):IModelBuilder;
        addEmptyToStack():IModelBuilder;
        addKeyAndDoorPairToStack(key:IKeyParams,doorParams:IDoorParams):IModelBuilder;
        setPlayer(space:ISpace, player:IPlayer):IModelBuilder;
        setHeight(height:number):IModelBuilder;
        setWidth(width:number):IModelBuilder;
        build():IModel;
    }
}