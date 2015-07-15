///<reference path = "AbstractTreeTraversalState.ts"/>
///<reference path = "ITreeTraversalState.ts"/>
///<reference path="../../ISpace.ts"/>
/**
 * Adds the child to the Tree as a leaf of the current iterator
 * (done at the beginning of the while loop in the random spanning tree traversal)
 * The other states deal with positioning the current iterator
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    import AbstractTreeTraversalState = Model.Generator.Definitions.AbstractTreeTraversalState;
    import ITreeTraversalState = Model.Generator.Definitions.ITreeTraversalState;
    import ISpace = Model.ISpace;
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;

    export class NewLeafState extends AbstractTreeTraversalState
    {
        public constructor(creator:StandardMazeCreator,nextState:ITreeTraversalState)
        {
            super(creator,nextState);
        }

        public read(data:ISpace):void
        {
            super.getCreator().addChildToTreeGettingGenerated(data);
            super.advanceCreatorToNextState();
        }
    }
}
