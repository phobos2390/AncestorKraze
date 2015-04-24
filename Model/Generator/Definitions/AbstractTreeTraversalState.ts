///<reference path="../../ISpace.ts"/>
///<reference path="ITreeTraversalState.ts"/>
///<reference path="StandardMazeCreator.ts"/>

/**
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    import ISpace = Model.ISpace;
    import ITreeTraversalState = Model.Generator.Definitions.ITreeTraversalState;
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;

    export class AbstractTreeTraversalState implements ITreeTraversalState
    {
        private creator:StandardMazeCreator;
        private nextState:ITreeTraversalState;

        public constructor(creator:StandardMazeCreator,nextState:ITreeTraversalState)
        {
            this.creator = creator;
            this.nextState = nextState;
        }

        public setNextState(nextState:ITreeTraversalState):void
        {
            this.nextState = nextState;
        }

        public advanceCreatorToNextState()
        {
            this.creator.setCurrentState(this.nextState);
        }

        public getCreator():StandardMazeCreator
        {
            return this.creator;
        }

        public read(data:ISpace):void
        {
            throw new Error('This method is abstract');
        }
    }
}