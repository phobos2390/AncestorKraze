///<reference path="IPlayer.ts"/>
/**
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