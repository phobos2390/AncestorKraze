///<reference path="../IMazeCreator.ts"/>
///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IModelBuilder.ts"/>
///<reference path="../../IModel.ts"/>
///<reference path="Graph.ts"/>
///<reference path="Tree.ts"/>
///<reference path="ITreeTraversalState.ts"/>
///<reference path="AbstractTreeTraversalState.ts"/>
///<reference path="InitializingState.ts"/>
///<reference path="NewLeafState.ts"/>
///<reference path="NewBranchState.ts"/>
///<reference path="NumberOfBranchesStrategy.ts"/>
///<reference path="RandomizedPopulator.ts"/>
///<reference path="../ITreeVisitor.ts"/>
/**
 * Created by phobos2390 on 4/22/15.
 */

module Model.Generator.Definitions
{
    import IMazeCreator = Model.Generator.IMazeCreator;
    import IModelFactory = Model.IModelFactory;
    import IModelBuilder = Model.IModelBuilder;
    import IModel = Model.IModel;
    import Graph = Model.Generator.Definitions.Graph;
    import Tree = Model.Generator.Definitions.Tree;
    import ITreeTraversalState = Model.Generator.Definitions.ITreeTraversalState;
    import NumberOfBranchesStrategy = Model.Generator.Definitions.NumberOfBranchesStrategy;
    import AbstractTreeTraversalState = Model.Generator.Definitions.AbstractTreeTraversalState;
    import InitializingState = Model.Generator.Definitions.InitializingState;
    import NewBranchState = Model.Generator.Definitions.NewBranchState;
    import NewLeafState = Model.Generator.Definitions.NewLeafState;
    import RandomizedPopulator = Model.Generator.Definitions.RandomizedPopulator;
    import ITreeVisitor = Model.Generator.ITreeVisitor;

    export class StandardMazeCreator implements IMazeCreator
    {
        private factory:IModelFactory;
        private currentState:ITreeTraversalState;
        private currentIter:Tree;
        private rootTree:Tree;
        private graph:Graph;
        private height:number;
        private width:number;
        private graphHeight:number;
        private graphWidth:number;
        private positions:ISpace[][];
        private edges:ISpace[];
        private numberOfKeys:number;

        public constructor(factory:IModelFactory,numberOfKeys:number)
        {
            this.factory = factory;
            this.numberOfKeys = numberOfKeys;
        }

        public setCurrentState(nextState:ITreeTraversalState)
        {
            this.currentState = nextState;
        }

        public setToInitial(data:ISpace)
        {
            this.rootTree = new Tree(data);
            this.currentIter = this.rootTree;
        }

        public addChildToTreeGettingGenerated(data:ISpace)
        {
            this.currentIter.addChild(new Tree(data));
        }

        private spacesAreEqual(space1:ISpace,space2:ISpace)
        {
            return space1.getX() == space2.getX()
                && space1.getY() == space2.getY();
        }

        public setIteratorToData(data:ISpace):void
        {
            this.currentIter = this.findData(this.rootTree,data);
        }

        public getIteratorData():ISpace
        {
            return <ISpace>this.currentIter.getData();
        }

        public getNumberOfIteratorChildren():number
        {
            return this.currentIter.getChildren().length;
        }

        public getTotalNumberOfBranches():number
        {
            var strat:NumberOfBranchesStrategy = new NumberOfBranchesStrategy();
            strat.traverse(this.rootTree);
            return strat.getBranches();
        }

        public getNumberOfBranchesBelow(data:ISpace):number
        {
            this.setIteratorToData(data);
            var strat:NumberOfBranchesStrategy = new NumberOfBranchesStrategy();
            strat.traverse(this.currentIter);
            return strat.getBranches();
        }

        public getNumberOfBranchesAboveNode(space:ISpace):number
        {
            var branches:number = 0;
            var iterator:Tree = this.currentIter;
            while(iterator != null)
            {
                if(iterator.getChildren().length > 1)
                {
                    branches++;
                }
                iterator = iterator.getParent();
            }
            return branches;
        }

        private getNumberOfMarked(children:Tree[]):number
        {
            var markedChildren:number = 0;
            for(var i:number = 0; i < children.length; i++)
            {
                if (children[i].isMarked())
                {
                    markedChildren++;
                }
            }
            return markedChildren;
        }

        public moveUpToStartOfBranch():void
        {
            var iterator:Tree = this.currentIter;
            while(iterator != null
                && iterator.getChildren().length - this.getNumberOfMarked(iterator.getChildren()) < 2)
            {
                var space:ISpace = <ISpace>this.currentIter.getData();
                this.currentIter = iterator;
                iterator = iterator.getParent();
            }
        }

        public moveIteratorUp(generations:number):void
        {
            if(this.currentIter != null && generations > 0)
            {
                this.currentIter = this.currentIter.getParent();
                this.moveIteratorUp(generations - 1);
            }
        }

        //finds a space value. Returns null if the space does not exist
        private findData(tree:Tree,data:ISpace):Tree
        {
            if(this.spacesAreEqual(<ISpace>tree.getData(),data))
            {
                return tree;
            }
            else
            {
                var subTree:Tree[] = tree.getChildren();
                for(var i:number = 0; i < subTree.length; i++)
                {
                    var child = subTree[i];
                    if(this.spacesAreEqual(child.getData(),data))
                    {
                        return child;
                    }
                    else
                    {
                        //Depth first search
                        var foundData:Tree = this.findData(child,data);
                        if(foundData != null)
                        {
                            return foundData;
                        }
                    }
                }
                return null;
            }
        }

        public visit(data):void
        {
            this.currentState.read(<ISpace>data);
        }

        private createRandomSpanningTree():Tree
        {
            //NL -> null
            var newLeaf:ITreeTraversalState = new NewLeafState(this,null);
            //I  -> NL -> null
            var initial:ITreeTraversalState = new InitializingState(this,newLeaf);
            //I -> NL -> null
            //     ^
            //     |
            //    NB
            var newBranch:ITreeTraversalState = new NewBranchState(this,newLeaf);
            newLeaf.setNextState(newBranch);
            //I -> NL -+
            //     ^   |
            //     |   |
            //    NB <-+
            this.currentState = initial;
            //I -> NL --+
            //^    ^    |
            //|    |    |
            //CS   NB <-+
            this.rootTree = new Tree(this.factory.createSpace(0,0));
            this.graph.traverse(this);
            return this.rootTree;
        }

        private setSize(height:number,width:number)
        {
            //looks like this:
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //| | | | | | | | |
            //o-o-o-o-o-o-o-o-o
            //This has a graph size of 9x9
            //This has a resulting maze size of 19x19
            //Hg = (Hm - 1)/2 (and Wg = (Wm - 1)/2)
            //AND
            //Hm = 2Hg + 1 (and Wm = 2Wg + 1)
            this.height = height;
            this.width = width;
            this.graphHeight = (height - 1)/2;
            this.graphWidth = (width - 1)/2;
            this.positions = [];
            for(var i:number = 0; i < this.graphHeight; i++)
            {
                this.positions.push([]);
                for(var j:number = 0; j < this.graphWidth; j++)
                {
                    var row:number = i * 2 + 1;
                    var col:number = j * 2 + 1;
                    var newSpace:ISpace = this.factory.createSpace(row,col);
                    this.positions[i].push(newSpace);
                }
            }
        }

        //Creates a graph of the entire maze
        //Places the edges
        private createGraph():Graph
        {
            this.graph = new Graph();
            this.edges = [];
            for (var i:number = 0; i < this.positions.length; i++)
            {
                for(var j:number = 0; j < this.positions[i].length; j++)
                {
                    this.graph.addNode(this.positions[i][j]);
                    var current:ISpace = this.positions[i][j];
                    //loops twice. The spaces that it covers are as follows:
                    // 1
                    //1S2
                    // 2
                    //1-the first number in the loop
                    //2-the second number in the loop
                    for(var k:number = 0; k < 2; k++)
                    {
                        //k = 0 -> change = -1
                        //k = 1 -> change = 1
                        var change:number = 2*k - 1;
                        var newRow:number = i + change;
                        var newCol:number = j + change;
                        var rowInBounds:boolean = (0 <= newRow && newRow < this.graphHeight);
                        var validPosition:boolean = rowInBounds;
                        var edge:boolean = false;
                        //What it checks
                        //
                        //1S2
                        //
                        if(validPosition)
                        {
                            this.graph.setAdjacent(current, this.positions[newRow][j]);
                        }
                        else
                        {
                            edge = true;
                        }
                        var colInBounds:boolean = (0 <= newCol && newCol < this.graphWidth);
                        validPosition = colInBounds;
                        //What it checks
                        // 1
                        // S
                        // 2
                        if(validPosition)
                        {
                            this.graph.setAdjacent(current, this.positions[i][newCol]);
                        }
                        else
                        {
                            edge = true;
                        }
                        if(edge)
                        {
                            this.edges.push(current);
                        }
                    }
                }
            }
            return this.graph;
        }

        //Creates the maze from the tree
        private recCreateFromTree(currIter:Tree,recBuilder:IModelBuilder):IModelBuilder
        {
            //Builder has a maze done in a pattern that looks like this:
            //XXXXXXXXX
            //X X X X X
            //XXXXXXXXX
            //X X X X X
            //XXXXXXXXX
            //X X X X X
            //XXXXXXXXX
            //The only empty spaces are the nodes
            var builder:IModelBuilder = recBuilder;
            var subTree:Tree[] = currIter.getChildren();
            var parent:ISpace = <ISpace>currIter.getData();
            for(var i:number = 0; i < subTree.length; i++)
            {
                //Preorder Traversal
                var child:ISpace = <ISpace>subTree[i].getData();
                builder.setEmpty(this.factory.createSpace((parent.getX() + child.getX())/2,
                                                          (parent.getY() + child.getY())/2));
                //The edge between two nodes is the space between a Tree Node and not Children
                //XXXXX    XXXXX    XXXXX
                //X X X    X   X    X   X
                //XXXXX => XXXXX => XXX X Sets two edges. One between (1,1) and (1,3) (at (1,2))
                //X X X    X X X    X X X then between (1,3) and (3,3) (at (2,3))
                //XXXXX    XXXXX    XXXXX
                //Depth first Search
                builder = this.recCreateFromTree(subTree[i],builder);
            }
            return builder;
        }

        public markCurrentIterator()
        {
            this.currentIter.mark();
        }

        //Creates a key/door list that are numbered
        public initializeKeyList(builder:IModelBuilder):void
        {
            //first empty is to check second empty is used as the final door
            //(the final door is just an empty space so that the player can get to the key)
            builder.addEmptyToStack();
            builder.addEmptyToStack();
            for(var i:number = 0; i < this.numberOfKeys; i++)
            {
                builder.addKeyAndDoorPairToStack(this.factory.createKeyParams((i + 1)),
                    this.factory.createDoorParams((i + 1)));
            }
        }

        public getNumberOfKeys():number
        {
            return this.numberOfKeys;
        }

        public getFactory():IModelFactory
        {
            return this.factory;
        }

        //For the analytic html
        public getAverageNumberOfBranches(height:number, width:number, times:number)
        {
            this.setSize(height,width);
            this.createGraph();
            var total:number = 0;
            var branchesData:number[] = [];
            for(var i:number = 0; i < times; i++)
            {
                var spanningTree:Tree = this.createRandomSpanningTree();
                var branches:number = this.getTotalNumberOfBranches();
                branchesData.push(branches);
                total += branches;
            }
            branchesData.sort(function(a,b){return a-b;});
            var sdTotal:number = 0;
            for(var i:number = 0; i < branchesData.length; i++)
            {
                var diff = branchesData[i] - total/times;
                sdTotal += diff*diff;
            }
            var min:number = branchesData[0];
            var q1:number = branchesData[Math.ceil(branchesData.length/4)];
            var med:number = branchesData[Math.ceil(branchesData.length/2)];
            var q3:number = branchesData[Math.ceil(branchesData.length * 3/4)];
            var max:number = branchesData[branchesData.length - 1];
            var returnArray = [];
            returnArray.push(total/times);
            returnArray.push(Math.sqrt(sdTotal/(branchesData.length - 1)));
            returnArray.push(min);
            returnArray.push(q1);
            returnArray.push(med);
            returnArray.push(q3);
            returnArray.push(max);
            console.log(branchesData);
            console.log(returnArray);
            //if(branches.length % 2 == 0)
            //{
            //    var medIndex = branches.length/2;
            //    med = (branchesData[branchesData.length/2] + branchesData[branchesData.length/2 - 1])/2;
            //    if(medIndex % 2 == 0)
            //    {
            //        q1 = (branchesData[medIndex/2] + branchesData[medIndex/2 - 1])/2;
            //        q3 = (branchesData[medIndex/2 + medIndex] + branchesData[medIndex/2 + medIndex - 1])/2;
            //    }
            //    else
            //    {
            //        q1 = branchesData[Math.floor(medIndex/2)];
            //        q3 = branchesData[Math.floor(medIndex/2) + medIndex];
            //        //(branchesData[medIndex/2 + medIndex] + branchesData[medIndex/2 + medIndex - 1])/2;
            //    }
            //}
            //else
            //{
            //    med = branchesData[Math.floor(branchesData.length/2)];
            //    var medIndex = Math.floor(branches.length/2);
            //    if(medIndex % 2 == 0)
            //    {
            //        q1 = (branchesData[medIndex/2] + branchesData[medIndex/2 - 1])/2;
            //        q3 = (branchesData[medIndex * 3/2] + branchesData[medIndex * 3/2 + 1])/2;
            //    }
            //    else
            //    {
            //        q1 = branchesData[Math.floor(medIndex/2)];
            //        q3 = branchesData[Math.floor(medIndex/2) + medIndex + 1];
            //        //(branchesData[medIndex/2 + medIndex] + branchesData[medIndex/2 + medIndex - 1])/2;
            //    }
            //}
            return returnArray;
            //[
            //    total/times,
            //    Math.sqrt(sdTotal/(branchesData.length - 1)),
            //    min,
            //    q1,
            //    med,
            //    q3,
            //    max
            //];
        }

        //For the analytic html
        public getBelowANumber(height:number, width:number, max:number):number
        {
            this.setSize(height,width);
            this.createGraph();
            var branches:number = height * width;
            var tries:number = 0;
            var currentLowest = height * width;
            while(branches > max)
            {
                var spanningTree:Tree = this.createRandomSpanningTree();
                branches = this.getTotalNumberOfBranches();
                if(branches < currentLowest)
                {
                    currentLowest = branches;
                    console.log("New lowest: " + branches + " at " + tries + " tries");
                }
                ++tries;
            }
            return tries;
        }

        public createMaze(height:number,width:number):IModel
        {
            var builder:IModelBuilder = this.factory.createBuilder();
            builder.setHeight(height).setWidth(width);
            builder.setBaseFilledPattern(this.factory.createSpace(0,0),width,height);
            this.setSize(height,width);
            this.createGraph();
            var spanningTree:Tree = this.createRandomSpanningTree();
            //var branches:number = this.getTotalNumberOfBranches();
            //var branchesBelowExit:number = this.getNumberOfBranchesBelow(exitSpace) - 1;
            //Originally checked to see if there were enough branches.
            // Now it places until they aren't enough branches and then
            // the builder puts the correct keys and doors in their spots.
            //while(branches - branchesBelowExit + 1 < this.numberOfKeys + 3)
            //{
            //    console.log("Not enough branches! We have only " + branches + " branches");
            //    //builder.setBaseFilledPattern(this.factory.createSpace(0,0),width,height);
            //    spanningTree = this.createRandomSpanningTree();
            //    branches = this.getTotalNumberOfBranches();
            //    //builder = this.recCreateFromTree(spanningTree,builder);
            //}
            builder = this.recCreateFromTree(spanningTree,builder);
            //Only point of difference between the standard and the ancestor
            this.initializeKeyList(builder);
            this.setExit(builder);
            var populator:ITreeVisitor = new RandomizedPopulator(this,builder);
            while(!builder.peek().objectIsOfType("BlankSpace")
                  &&this.getTotalNumberOfBranches()>1)
            {
                //goes down a random branch until it gets to a leaf.
                //at that leaf it places a key
                //it then moves the iterator up to the start of that branch
                spanningTree.traverse(populator);
            }
            builder.setPlayer(this.factory.createSpace(1,1),this.factory.createPlayer());
            return builder.build();
        }

        private setExit(builder:IModelBuilder):void
        {
            var height = this.height;
            var width = this.width;
            var belowBranches:number = 1;
            var aboveBranches:number = 2;
            var edgeIndex:number = Math.floor(Math.random() * this.edges.length);
            var edge:ISpace = this.edges[edgeIndex];
            var below:number = this.getNumberOfBranchesBelow(edge);
            var above:number = this.getNumberOfBranchesAboveNode(edge);
            while(below > belowBranches || above < aboveBranches)
            {
                edgeIndex = Math.floor(Math.random() * this.edges.length);
                edge = this.edges[edgeIndex];
                below = this.getNumberOfBranchesBelow(edge);
                above = this.getNumberOfBranchesAboveNode(edge);
            }
            if(edge.getX() == height - 2)
            {
                if(edge.getY() == width - 2)
                {
                    builder.setExit(this.factory.createSpace(height - 2, width - 1));
                }
                else
                {
                    builder.setExit(this.factory.createSpace(edge.getX() + 1, edge.getY()));
                }
            }
            else if(edge.getY() == width - 2)
            {
                builder.setExit(this.factory.createSpace(edge.getX(),edge.getY() + 1));
            }
            else if(edge.getX() == 1)
            {
                builder.setExit(this.factory.createSpace(edge.getX() - 1,edge.getY()));
            }
            else if(edge.getY() == 1)
            {
                builder.setExit(this.factory.createSpace(edge.getX(),edge.getY() - 1));
            }
            else
            {
                console.log("WHAT? How did it get here?");
                console.log("Space is : (" + edge.getX() + ", " + edge.getY() + ")");
                console.log(height - 2 + " is the height of the maze");
                console.log(width - 2 + " is the width of the maze");
            }
            //builder.setExit(this.factory.createSpace(height - 2, width - 1));
            //var exitSpace = this.factory.createSpace(height - 2, width - 2);
            //this.setIteratorToData(exitSpace);
            this.setIteratorToData(edge);
            this.moveUpToStartOfBranch();
            var firstSpace:ISpace = this.getIteratorData();
            this.markCurrentIterator();
            this.moveIteratorUp(1);
            var secondSpace:ISpace = this.getIteratorData();
            builder.setSpaceBetweenTwoSpaces(firstSpace,secondSpace,builder.peek());
            builder.pop();
        }
    }
}
