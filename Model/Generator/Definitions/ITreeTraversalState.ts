///<reference path="../../ISpace.ts"/>
/**
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    import ISpace = Model.ISpace;

    export interface ITreeTraversalState
    {
        setNextState(nextState:ITreeTraversalState):void;
        read(data:ISpace):void;
    }
}