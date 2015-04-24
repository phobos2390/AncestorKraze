///<reference path="IKey.ts"/>
///<reference path="IRequirement.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IPlayer
    {
        fulfillsRequirement(requirement:IRequirement):boolean;
        addKey(key:IKey):void;
        hasKey(key:IKey):boolean;
        numberOfKeys():number;
    }
}