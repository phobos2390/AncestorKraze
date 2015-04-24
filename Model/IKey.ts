///<reference path="ISpaceObject.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */

/**
 * StandardKey that is required in order to move through a door
 */
module Model
{
    export interface IKey extends ISpaceObject
    {
        toString():string;
    }
}
