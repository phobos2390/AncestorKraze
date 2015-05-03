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

        public moveUpToStartOfBranch():void
        {
            var iterator:Tree = this.currentIter;
            while(iterator != null
                && iterator.getChildren().length < 2)
            {
                var space:ISpace = <ISpace>this.currentIter.getData();
                //console.log("Iterator moved up to space: (" + space.getX() + "," + space.getY() + ")");
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
            var newLeaf:ITreeTraversalState = new NewLeafState(this,null);
            var initial:ITreeTraversalState = new InitializingState(this,newLeaf);
            var newBranch:ITreeTraversalState = new NewBranchState(this,newLeaf);
            newLeaf.setNextState(newBranch);
            this.currentState = initial;
            this.rootTree = new Tree(this.factory.createSpace(0,0));
            this.graph.traverse(this);
            return this.rootTree;
        }

        private setSize(height:number,width:number)
        {
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
                    for(var k:number = 0; k < 2; k++)
                    {
                        var change:number = 2*k - 1;
                        var newRow:number = i + change;
                        var newCol:number = j + change;
                        var rowInBounds:boolean = (0 <= newRow && newRow < this.graphHeight);
                        var validPosition:boolean = rowInBounds;
                        var edge:boolean = false;
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

        private recCreateFromTree(currIter:Tree,recBuilder:IModelBuilder):IModelBuilder
        {
            var builder:IModelBuilder = recBuilder;
            var subTree:Tree[] = currIter.getChildren();
            var parent:ISpace = <ISpace>currIter.getData();
            for(var i:number = 0; i < subTree.length; i++)
            {
                var child:ISpace = <ISpace>subTree[i].getData();
                builder.setEmpty(this.factory.createSpace((parent.getX() + child.getX())/2,
                                                          (parent.getY() + child.getY())/2));
                builder = this.recCreateFromTree(subTree[i],builder);
            }
            return builder;
        }

        public markCurrentIterator()
        {
            this.currentIter.mark();
        }

        public initializeKeyList(builder:IModelBuilder):void
        {
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

        public createMaze(height:number,width:number):IModel
        {
            var builder:IModelBuilder = this.factory.createBuilder();
            builder.setHeight(height).setWidth(width);
            builder.setBaseFilledPattern(this.factory.createSpace(0,0),width,height);
            this.setSize(height,width);
            this.createGraph();
            var spanningTree:Tree = this.createRandomSpanningTree();
            var branches:number = this.getTotalNumberOfBranches();
            builder = this.recCreateFromTree(spanningTree,builder);
            while(branches < this.numberOfKeys)
            {
                builder.setBaseFilledPattern(this.factory.createSpace(0,0),width,height);
                spanningTree = this.createRandomSpanningTree();
                branches = this.getTotalNumberOfBranches();
                builder = this.recCreateFromTree(spanningTree,builder);
            }
            this.initializeKeyList(builder);
            builder.setExit(this.factory.createSpace(height - 2, width - 1));
            this.setIteratorToData(this.factory.createSpace(height - 2, width - 2));
            this.moveUpToStartOfBranch();
            var firstSpace:ISpace = this.getIteratorData();
            this.markCurrentIterator();
            this.moveIteratorUp(1);
            var secondSpace:ISpace = this.getIteratorData();
            builder.setDoorBetweenTwoSpaces(firstSpace,secondSpace,<IDoor>builder.peek());
            builder.pop();
            var populator:ITreeVisitor = new RandomizedPopulator(this,builder);
            while(!builder.peek().objectIsOfType("BlankSpace"))
            {
                spanningTree.traverse(populator);
            }
            builder.setPlayer(this.factory.createSpace(1,1),this.factory.createPlayer());
            return builder.build();
        }
    }
}