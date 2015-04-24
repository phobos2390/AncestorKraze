///<reference path = "AbstractTreeTraversalState.ts"/>
///<reference path = "ITreeTraversalState.ts"/>
///<reference path="../../ISpace.ts"/>
/**
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    import AbstractTreeTraversalState = Model.Generator.Definitions.AbstractTreeTraversalState;
    import ITreeTraversalState = Model.Generator.Definitions.ITreeTraversalState;
    import ISpace = Model.ISpace;
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;

    export class NewBranchState extends AbstractTreeTraversalState
    {
        public constructor(creator:StandardMazeCreator,nextState:ITreeTraversalState)
        {
            super(creator,nextState);
        }

        public read(data:ISpace):void
        {
            super.getCreator().setIteratorToData(data);
            super.advanceCreatorToNextState();
        }
    }
}