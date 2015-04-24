/**
 * Created by phobos2390 on 3/24/15.
 */

module Model
{
    export interface ISpaceObject
    {
        canEnterSpace():boolean;
        getSpaceType():string;
        objectIsOfType(type:string):boolean;
    }
}
