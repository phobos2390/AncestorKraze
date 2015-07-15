///<reference path="Tree.ts"/>
/**
 * Finds the number of open leafs in the Tree
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
            var numChildren:number = 0;
            for(var i:number = 0; i < children.length; i++)
            {
                var child:Tree = children[i];
                if(!child.isMarked())
                {
                    //Depth first search
                    this.traverse(child);
                    ++numChildren;
                }
            }
            //Post order visit
            this.visit(numChildren);
        }

        public visit(children:number):void
        {
            //only adds the number of branches beyond the first one
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
