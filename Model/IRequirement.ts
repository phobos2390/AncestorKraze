///<reference path="IPlayer.ts"/>
/**
 * Player must fulfill the requirement to get through the door
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IRequirement
    {
        playerFulfillsRequirement(player:IPlayer):boolean;
        toString():string;
    }
}
