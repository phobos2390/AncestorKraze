///<reference path="ISpaceObject.ts"/>
/**
 * A given tile
 * Created by phobos2390 on 3/19/15.
 */

module Model
{
    export interface ISpace
    {
        getX():number;
        getY():number;
        setSpaceObject(spaceObject:ISpaceObject):void;
        getSpaceObject():ISpaceObject;
        canEnterSpace():boolean;
        setSeen():void;
        seen():boolean;
    }
}
