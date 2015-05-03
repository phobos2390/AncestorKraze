///<reference path="StandardMazeCreator.ts"/>
/**
 * Created by phobos2390 on 5/2/15.
 */

module Model.Generator.Definitions
{
    import StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;

    export class AncestorMazeCreator extends StandardMazeCreator
    {
        private keys:string[];

        public constructor(factory:IModelFactory,numberOfKeys:number)
        {
            super(factory,numberOfKeys);
            this.keys = [];
        }

        public addKey(key:string)
        {
            this.keys.push(key);
        }

        public initializeKeyList(builder:IModelBuilder):void
        {
            builder.addEmptyToStack();
            builder.addEmptyToStack();
            for(var i:number = 0; i < this.getNumberOfKeys(); i++)
            {
                builder.addKeyAndDoorPairToStack(this.getFactory().createKeyParams(this.keys[i]),
                                                this.getFactory().createDoorParams(this.keys[i]));
            }
        }
    }
}