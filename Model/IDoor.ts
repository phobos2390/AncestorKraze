///<reference path="IRequirement.ts"/>
///<reference path="ISpaceObject.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */

/**
 * StandardDoor that a player cannot pass through unless that player can fulfill the requirement
 */
module Model
{
    export interface IDoor extends ISpaceObject
    {
        getRequirement():IRequirement;
    }
}