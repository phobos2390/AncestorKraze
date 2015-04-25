///<reference path="../../ISpace.ts"/>
///<reference path="../ITreeVisitor.ts"/>
///<reference path="StandardMazeCreator.ts"/>
/**
 * Created by phobos2390 on 4/23/15.
 */

module Model.Generator.Definitions
{
    import ISpace = Model.ISpace;
    import ITreeVisitor = Model.Generator.ITreeVisitor;
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;
    import IModelBuilder = Model.IModelBuilder;

    export class RandomizedPopulator implements ITreeVisitor
    {
        private creator:StandardMazeCreator;
        private builder:IModelBuilder;

        public constructor(creator:StandardMazeCreator,builder:IModelBuilder)
        {
            this.creator = creator;
            this.builder = builder;
        }

        public visit(space:ISpace):void
        {
            this.builder.setKey(space,<IKey>this.builder.peek());
            this.builder.pop();
            this.creator.setIteratorToData(space);
            this.creator.moveUpToStartOfBranch();
            var firstSpace:ISpace = this.creator.getIteratorData();
            this.creator.markCurrentIterator();
            this.creator.moveIteratorUp(1);
            var secondSpace:ISpace = this.creator.getIteratorData();
            this.builder.setDoorBetweenTwoSpaces(firstSpace,secondSpace,<IDoor>this.builder.peek());
            this.builder.pop();
        }
    }
}