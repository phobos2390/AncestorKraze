///<reference path="IPlayer.ts"/>
///<reference path="ISpace.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IModelArgs
    {
        getPlayer():IPlayer;
        won():boolean;
        getCurrentSpace():ISpace;
        getSpace(x:number, y:number):ISpace;
        pickedUpNewKey():boolean;
        newKey():IKey;
        attemptedToGetInADoor():boolean;
        doorRequirement():IRequirement;
        mustRedraw():boolean;
    }
}