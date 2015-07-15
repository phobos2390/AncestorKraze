///<reference path="ISpaceObject.ts"/>
/**
 * StandardKey that is required in order to move through a door
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IKey extends ISpaceObject
    {
        toString():string;
    }
}
