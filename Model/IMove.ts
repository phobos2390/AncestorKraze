/**
 * The moving class. Defines the movement vector
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IMove
    {
        getDeltaX():number;
        getDeltaY():number;
        getDXY():number;
        getMoveString():string;
    }
}
