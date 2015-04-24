///<reference path="IModelObservable.ts"/>
///<reference path="IMove.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */

/**
 * Data structure holding all the information for the game
 */
module Model
{
    export interface IModel extends IModelObservable
    {
        movePlayer(move:IMove):void;
        canMovePlayer(move:IMove):boolean;
        won():boolean;
    }
}