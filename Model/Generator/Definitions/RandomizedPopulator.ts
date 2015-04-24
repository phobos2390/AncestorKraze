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
            //console.log("Key set at: (" + space.getX() + "," + space.getY() + ")");
            this.builder.pop();
            this.creator.setIteratorToData(space);
            this.creator.moveUpToStartOfBranch();
            var firstSpace:ISpace = this.creator.getIteratorData();
            this.creator.markCurrentIterator();
            this.creator.moveIteratorUp(1);
            var secondSpace:ISpace = this.creator.getIteratorData();
            this.builder.setDoorBetweenTwoSpaces(firstSpace,secondSpace,<IDoor>this.builder.peek());
            //console.log("Door " + this.builder.peek().toString() + " set at: (" + (firstSpace.getX() + secondSpace.getX())/2 + ","
            //                                                                    + (firstSpace.getY() + secondSpace.getY())/2 + ")");
            this.builder.pop();
        }
    }
}