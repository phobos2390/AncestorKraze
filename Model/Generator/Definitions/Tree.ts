/**
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    export class Tree
    {
        private minDepth:number;
        private data;
        private parent:Tree;
        private subTree:Tree[];
        private marked:boolean;

        public constructor(data)
        {
            this.data = data;
            this.parent = null;
            this.marked = false;
            this.subTree = [];
            this.minDepth = 4;
        }

        public mark()
        {
            this.marked = true;
        }

        public unmark()
        {
            this.marked = false;
        }

        public isMarked():boolean
        {
            return this.marked;
        }

        public getParent():Tree
        {
            return this.parent;
        }

        public getData()
        {
            return this.data;
        }

        public setData(data)
        {
            this.data = data;
        }

        public getChild(index:number):Tree
        {
            return this.subTree[index];
        }

        public getChildren():Tree[]
        {
            return this.subTree;
        }

        public addChild(child:Tree)
        {
            this.subTree.push(child);
            child.parent = this;
        }

        public traverse(visitor):void
        {
            this.recTraverse(visitor,0);
        }

        private recTraverse(visitor,depth:number):void
        {
            var unmarkedNeighbors:Tree[] = [];
            for(var i:number = 0; i < this.subTree.length; i++)
            {
                if(!this.subTree[i].isMarked())
                {
                    unmarkedNeighbors.push(this.subTree[i]);
                }
            }
            var max:number = unmarkedNeighbors.length;
            var subTreePath = Math.floor(Math.random()*max);
            if(this.subTree.length == 0 || unmarkedNeighbors.length == 0)
            {
                visitor.visit(this.data);
            }
            else
            {
                if(this.marked && this.parent != null)
                {
                    visitor.visit(this.data);
                }
                else
                {
                    unmarkedNeighbors[subTreePath].recTraverse(visitor,depth + 1);
                }
            }
        }
    }
}