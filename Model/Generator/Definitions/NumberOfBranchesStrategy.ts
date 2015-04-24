///<reference path="Tree.ts"/>
/**
 * Created by phobos2390 on 4/23/15.
 */

module Model.Generator.Definitions
{
    import Tree = Model.Generator.Definitions.Tree;

    export class NumberOfBranchesStrategy
    {
        private branches:number;

        public constructor()
        {
            this.branches = 1;
        }

        public traverse(tree:Tree):void
        {
            var children:Tree[] = tree.getChildren();
            var numChildren:number = children.length;
            this.visit(numChildren);
            for(var i:number = 0; i < numChildren; i++)
            {
                var child:Tree = children[i];
                if(!child.isMarked())
                {
                    this.traverse(child);
                }
            }
        }

        public visit(children:number):void
        {
            if(children > 0)
            {
                this.branches = this.branches + (children - 1);
            }
        }

        public getBranches():number
        {
            return this.branches;
        }
    }
}