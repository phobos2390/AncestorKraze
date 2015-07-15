/**
 * Graph for the maze.
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    export class Graph
    {
        private dict;
        private nodes;

        public constructor()
        {
            this.dict = {};
            this.nodes = [];
        }

        public addNode(node):void
        {
            this.nodes.push(node);
            this.dict[node.toString()] = [];
        }

        public setAdjacent(src,dst):void
        {
            this.dict[src.toString()].push(dst);
        }

        public getAdjacencies(node)
        {
            return this.dict[node.toString()];
        }

        //traverses a random spanning tree
        public traverse(visitor)
        {
            var marked:boolean[] = [];
            for(var i:number = 0; i < this.nodes.length; i++)
            {
                marked.push(false);
            }
            var currentIndex:number = 0;
            var current = this.nodes[currentIndex];
            //only if there is no marked nodes
            while(marked.indexOf(false) != -1)
            {
                //visits the the current node to put the node in the tree
                //other times the node is visited, the iterator in the visitor
                //is set to that value
                visitor.visit(current);
                marked[currentIndex] = true;
                var adjacent = this.dict[current];
                var unmarkedNeighbors = [];
                var markedNeighbors = [];
                //finds the adjacent nodes that haven't been visited
                for(var i:number = 0; i < adjacent.length; i++)
                {
                    var node = adjacent[i];
                    var indexOfNode:number = this.nodes.indexOf(node);
                    if(!marked[indexOfNode])
                    {
                        unmarkedNeighbors.push(node);
                    }
                    else
                    {
                        markedNeighbors.push(node);
                    }
                }
                var possibleNeighbors:number = unmarkedNeighbors.length;
                //there are enough possible neighbors to need a random adjacent
                if(possibleNeighbors > 1)
                {
                    if(markedNeighbors.length > 0)
                    {
                        visitor.visit(current);
                    }
                    var neighborIndex:number = Math.floor(Math.random() * possibleNeighbors);
                    currentIndex = this.nodes.indexOf(unmarkedNeighbors[neighborIndex]);
                    current = this.nodes[currentIndex];
                }
                //only one neighbor, don't need random
                else if(possibleNeighbors > 0)
                {
                    visitor.visit(current);
                    currentIndex = this.nodes.indexOf(unmarkedNeighbors[0]);
                    current = this.nodes[currentIndex];
                }
                //dead end but not all of the nodes have been marked
                else if(marked.indexOf(false) != -1)
                {
                    //finds the first node that is not marked
                    currentIndex = marked.indexOf(false);
                    current = this.nodes[currentIndex];
                    adjacent = this.dict[current];
                    unmarkedNeighbors = [];
                    markedNeighbors = [];
                    for(var i:number = 0; i < adjacent.length; i++)
                    {
                        var node = adjacent[i];
                        var indexOfNode:number = this.nodes.indexOf(node);
                        if(!marked[indexOfNode])
                        {
                            unmarkedNeighbors.push(node);
                        }
                        else
                        {
                            markedNeighbors.push(node);
                        }
                    }
                    visitor.visit(markedNeighbors[0]);
                }
            }
        }
    }
}
