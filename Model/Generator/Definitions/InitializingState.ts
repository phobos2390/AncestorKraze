///<reference path="../../ISpace.ts"/>
///<reference path="ITreeTraversalState.ts"/>
///<reference path="AbstractTreeTraversalState.ts"/>
///<reference path="StandardMazeCreator.ts"/>
/**
 * Places the current iterator at the space (1,1) (which will be the root tree)
 * (done at the very beginning of the Random Spanning Tree Traversal)
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    import ISpace = Model.ISpace;
    import ITreeTraversalState = Model.Generator.Definitions.ITreeTraversalState;
    import AbstractTreeTraversalState = Model.Generator.Definitions.AbstractTreeTraversalState;
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;

    export class InitializingState extends AbstractTreeTraversalState
    {
        public constructor(creator:StandardMazeCreator,nextState:ITreeTraversalState)
        {
            super(creator,nextState);
        }

        public read(data:ISpace):void
        {
            super.getCreator().setToInitial(data);
            super.advanceCreatorToNextState();
        }
    }
}
