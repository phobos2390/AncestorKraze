///<reference path="IKeyParams.ts"/>
///<reference path="IPlayer.ts"/>
///<reference path="IKey.ts"/>
///<reference path="IDoorParams.ts"/>
///<reference path="IDoor.ts"/>
///<reference path="ISpace.ts"/>
///<reference path="IRequirementParams.ts"/>
///<reference path="IRequirement.ts"/>
///<reference path="IModelBuilder.ts"/>
///<reference path="IWallObject.ts"/>
///<reference path="IWinSpaceObject.ts"/>
/**
 * Abstract Factory pattern for creating all of the needed model objects
 * If you need anything from the model, get the StandardFactory and the
 * AncestorFactory. Creates the Builder needed for creating the model.
 * Needed to create moves.
 * Created by phobos2390 on 3/19/15.
 */

module Model
{
    export interface IModelFactory
    {
        createKey(params:IKeyParams):IKey;
        createPlayer():IPlayer;
        createDoor(params:IDoorParams):IDoor;
        createSpace(x:number,y:number):ISpace;
        createRequirement(params:IRequirementParams):IRequirement;
        createBuilder():IModelBuilder;
        createWinSpace():IWinSpaceObject;
        createWallSpace():IWallObject;
        createEmptySpace():ISpaceObject;
        createMove(direction:string):IMove;
        createKeyParams(params):IKeyParams;
        createDoorParams(params):IDoorParams;
        createRequirementParams(params):IRequirementParams;
    }
}
