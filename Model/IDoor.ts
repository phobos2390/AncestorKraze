///<reference path="IRequirement.ts"/>
///<reference path="ISpaceObject.ts"/>
/**
 * StandardDoor that a player cannot pass through unless that player can fulfill the requirement
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IDoor extends ISpaceObject
    {
        getRequirement():IRequirement;
    }
}
