///<reference path="IModelObservable.ts"/>
///<reference path="IMove.ts"/>
/**
 * Data structure holding all the information for the game
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IModel extends IModelObservable
    {
        movePlayer(move:IMove):void;
        canMovePlayer(move:IMove):boolean;
        fulfillRequirement(requirement:IRequirement):void;
        won():boolean;
    }
}
