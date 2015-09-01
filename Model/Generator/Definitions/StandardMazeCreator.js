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
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var Graph = Model.Generator.Definitions.Graph;
            var Tree = Model.Generator.Definitions.Tree;
            var NumberOfBranchesStrategy = Model.Generator.Definitions.NumberOfBranchesStrategy;
            var InitializingState = Model.Generator.Definitions.InitializingState;
            var NewBranchState = Model.Generator.Definitions.NewBranchState;
            var NewLeafState = Model.Generator.Definitions.NewLeafState;
            var RandomizedPopulator = Model.Generator.Definitions.RandomizedPopulator;
            var StandardMazeCreator = (function () {
                function StandardMazeCreator(factory, numberOfKeys) {
                    this.factory = factory;
                    this.numberOfKeys = numberOfKeys;
                }
                StandardMazeCreator.prototype.setCurrentState = function (nextState) {
                    this.currentState = nextState;
                };
                StandardMazeCreator.prototype.setToInitial = function (data) {
                    this.rootTree = new Tree(data);
                    this.currentIter = this.rootTree;
                };
                StandardMazeCreator.prototype.addChildToTreeGettingGenerated = function (data) {
                    this.currentIter.addChild(new Tree(data));
                };
                StandardMazeCreator.prototype.spacesAreEqual = function (space1, space2) {
                    return space1.getX() == space2.getX() && space1.getY() == space2.getY();
                };
                StandardMazeCreator.prototype.setIteratorToData = function (data) {
                    this.currentIter = this.findData(this.rootTree, data);
                };
                StandardMazeCreator.prototype.getIteratorData = function () {
                    return this.currentIter.getData();
                };
                StandardMazeCreator.prototype.getNumberOfIteratorChildren = function () {
                    return this.currentIter.getChildren().length;
                };
                StandardMazeCreator.prototype.getTotalNumberOfBranches = function () {
                    var strat = new NumberOfBranchesStrategy();
                    strat.traverse(this.rootTree);
                    return strat.getBranches();
                };
                StandardMazeCreator.prototype.getNumberOfBranchesBelow = function (data) {
                    this.setIteratorToData(data);
                    var strat = new NumberOfBranchesStrategy();
                    strat.traverse(this.currentIter);
                    return strat.getBranches();
                };
                StandardMazeCreator.prototype.getNumberOfBranchesAboveNode = function (space) {
                    var branches = 0;
                    var iterator = this.currentIter;
                    while (iterator != null) {
                        if (iterator.getChildren().length > 1) {
                            branches++;
                        }
                        iterator = iterator.getParent();
                    }
                    return branches;
                };
                StandardMazeCreator.prototype.getNumberOfMarked = function (children) {
                    var markedChildren = 0;
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].isMarked()) {
                            markedChildren++;
                        }
                    }
                    return markedChildren;
                };
                StandardMazeCreator.prototype.moveUpToStartOfBranch = function () {
                    var iterator = this.currentIter;
                    while (iterator != null && iterator.getChildren().length - this.getNumberOfMarked(iterator.getChildren()) < 2) {
                        var space = this.currentIter.getData();
                        this.currentIter = iterator;
                        iterator = iterator.getParent();
                    }
                };
                StandardMazeCreator.prototype.moveIteratorUp = function (generations) {
                    if (this.currentIter != null && generations > 0) {
                        this.currentIter = this.currentIter.getParent();
                        this.moveIteratorUp(generations - 1);
                    }
                };
                //finds a space value. Returns null if the space does not exist
                StandardMazeCreator.prototype.findData = function (tree, data) {
                    if (this.spacesAreEqual(tree.getData(), data)) {
                        return tree;
                    }
                    else {
                        var subTree = tree.getChildren();
                        for (var i = 0; i < subTree.length; i++) {
                            var child = subTree[i];
                            if (this.spacesAreEqual(child.getData(), data)) {
                                return child;
                            }
                            else {
                                //Depth first search
                                var foundData = this.findData(child, data);
                                if (foundData != null) {
                                    return foundData;
                                }
                            }
                        }
                        return null;
                    }
                };
                StandardMazeCreator.prototype.visit = function (data) {
                    this.currentState.read(data);
                };
                StandardMazeCreator.prototype.createRandomSpanningTree = function () {
                    //NL -> null
                    var newLeaf = new NewLeafState(this, null);
                    //I  -> NL -> null
                    var initial = new InitializingState(this, newLeaf);
                    //I -> NL -> null
                    //     ^
                    //     |
                    //    NB
                    var newBranch = new NewBranchState(this, newLeaf);
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
                    this.rootTree = new Tree(this.factory.createSpace(0, 0));
                    this.graph.traverse(this);
                    return this.rootTree;
                };
                StandardMazeCreator.prototype.setSize = function (height, width) {
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
                    this.graphHeight = (height - 1) / 2;
                    this.graphWidth = (width - 1) / 2;
                    this.positions = [];
                    for (var i = 0; i < this.graphHeight; i++) {
                        this.positions.push([]);
                        for (var j = 0; j < this.graphWidth; j++) {
                            var row = i * 2 + 1;
                            var col = j * 2 + 1;
                            var newSpace = this.factory.createSpace(row, col);
                            this.positions[i].push(newSpace);
                        }
                    }
                };
                //Creates a graph of the entire maze
                //Places the edges
                StandardMazeCreator.prototype.createGraph = function () {
                    this.graph = new Graph();
                    this.edges = [];
                    for (var i = 0; i < this.positions.length; i++) {
                        for (var j = 0; j < this.positions[i].length; j++) {
                            this.graph.addNode(this.positions[i][j]);
                            var current = this.positions[i][j];
                            for (var k = 0; k < 2; k++) {
                                //k = 0 -> change = -1
                                //k = 1 -> change = 1
                                var change = 2 * k - 1;
                                var newRow = i + change;
                                var newCol = j + change;
                                var rowInBounds = (0 <= newRow && newRow < this.graphHeight);
                                var validPosition = rowInBounds;
                                var edge = false;
                                //What it checks
                                //
                                //1S2
                                //
                                if (validPosition) {
                                    this.graph.setAdjacent(current, this.positions[newRow][j]);
                                }
                                else {
                                    edge = true;
                                }
                                var colInBounds = (0 <= newCol && newCol < this.graphWidth);
                                validPosition = colInBounds;
                                //What it checks
                                // 1
                                // S
                                // 2
                                if (validPosition) {
                                    this.graph.setAdjacent(current, this.positions[i][newCol]);
                                }
                                else {
                                    edge = true;
                                }
                                if (edge) {
                                    this.edges.push(current);
                                }
                            }
                        }
                    }
                    return this.graph;
                };
                //Creates the maze from the tree
                StandardMazeCreator.prototype.recCreateFromTree = function (currIter, recBuilder) {
                    //Builder has a maze done in a pattern that looks like this:
                    //XXXXXXXXX
                    //X X X X X
                    //XXXXXXXXX
                    //X X X X X
                    //XXXXXXXXX
                    //X X X X X
                    //XXXXXXXXX
                    //The only empty spaces are the nodes
                    var builder = recBuilder;
                    var subTree = currIter.getChildren();
                    var parent = currIter.getData();
                    for (var i = 0; i < subTree.length; i++) {
                        //Preorder Traversal
                        var child = subTree[i].getData();
                        builder.setEmpty(this.factory.createSpace((parent.getX() + child.getX()) / 2, (parent.getY() + child.getY()) / 2));
                        //The edge between two nodes is the space between a Tree Node and not Children
                        //XXXXX    XXXXX    XXXXX
                        //X X X    X   X    X   X
                        //XXXXX => XXXXX => XXX X Sets two edges. One between (1,1) and (1,3) (at (1,2))
                        //X X X    X X X    X X X then between (1,3) and (3,3) (at (2,3))
                        //XXXXX    XXXXX    XXXXX
                        //Depth first Search
                        builder = this.recCreateFromTree(subTree[i], builder);
                    }
                    return builder;
                };
                StandardMazeCreator.prototype.markCurrentIterator = function () {
                    this.currentIter.mark();
                };
                //Creates a key/door list that are numbered
                StandardMazeCreator.prototype.initializeKeyList = function (builder) {
                    //first empty is to check second empty is used as the final door
                    //(the final door is just an empty space so that the player can get to the key)
                    builder.addEmptyToStack();
                    builder.addEmptyToStack();
                    for (var i = 0; i < this.numberOfKeys; i++) {
                        builder.addKeyAndDoorPairToStack(this.factory.createKeyParams((i + 1)), this.factory.createDoorParams((i + 1)));
                    }
                };
                StandardMazeCreator.prototype.getNumberOfKeys = function () {
                    return this.numberOfKeys;
                };
                StandardMazeCreator.prototype.getFactory = function () {
                    return this.factory;
                };
                //For the analytic html
                StandardMazeCreator.prototype.getAverageNumberOfBranches = function (height, width, times) {
                    this.setSize(height, width);
                    this.createGraph();
                    var total = 0;
                    for (var i = 0; i < times; i++) {
                        var spanningTree = this.createRandomSpanningTree();
                        var branches = this.getTotalNumberOfBranches();
                        total += branches;
                    }
                    return total / times;
                };
                //For the analytic html
                StandardMazeCreator.prototype.getBelowANumber = function (height, width, max) {
                    this.setSize(height, width);
                    this.createGraph();
                    var branches = height * width;
                    var tries = 0;
                    var currentLowest = height * width;
                    while (branches > max) {
                        var spanningTree = this.createRandomSpanningTree();
                        branches = this.getTotalNumberOfBranches();
                        if (branches < currentLowest) {
                            currentLowest = branches;
                            console.log("New lowest: " + branches + " at " + tries + " tries");
                        }
                        ++tries;
                    }
                    return tries;
                };
                StandardMazeCreator.prototype.createMaze = function (height, width) {
                    var builder = this.factory.createBuilder();
                    builder.setHeight(height).setWidth(width);
                    builder.setBaseFilledPattern(this.factory.createSpace(0, 0), width, height);
                    this.setSize(height, width);
                    this.createGraph();
                    var spanningTree = this.createRandomSpanningTree();
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
                    builder = this.recCreateFromTree(spanningTree, builder);
                    //Only point of difference between the standard and the ancestor
                    this.initializeKeyList(builder);
                    this.setExit(builder);
                    var populator = new RandomizedPopulator(this, builder);
                    while (!builder.peek().objectIsOfType("BlankSpace") && this.getTotalNumberOfBranches() > 1) {
                        //goes down a random branch until it gets to a leaf.
                        //at that leaf it places a key
                        //it then moves the iterator up to the start of that branch
                        spanningTree.traverse(populator);
                    }
                    builder.setPlayer(this.factory.createSpace(1, 1), this.factory.createPlayer());
                    return builder.build();
                };
                StandardMazeCreator.prototype.setExit = function (builder) {
                    var height = this.height;
                    var width = this.width;
                    var belowBranches = 1;
                    var aboveBranches = 2;
                    var edgeIndex = Math.floor(Math.random() * this.edges.length);
                    var edge = this.edges[edgeIndex];
                    var below = this.getNumberOfBranchesBelow(edge);
                    var above = this.getNumberOfBranchesAboveNode(edge);
                    while (below > belowBranches && above < aboveBranches) {
                        edgeIndex = Math.floor(Math.random() * this.edges.length);
                        edge = this.edges[edgeIndex];
                        below = this.getNumberOfBranchesBelow(edge);
                        above = this.getNumberOfBranchesAboveNode(edge);
                    }
                    if (edge.getX() == height - 2) {
                        if (edge.getY() == width - 2) {
                            builder.setExit(this.factory.createSpace(height - 2, width - 1));
                        }
                        else {
                            builder.setExit(this.factory.createSpace(edge.getX() + 1, edge.getY()));
                        }
                    }
                    else if (edge.getY() == width - 2) {
                        builder.setExit(this.factory.createSpace(edge.getX(), edge.getY() + 1));
                    }
                    else if (edge.getX() == 1) {
                        builder.setExit(this.factory.createSpace(edge.getX() - 1, edge.getY()));
                    }
                    else if (edge.getY() == 1) {
                        builder.setExit(this.factory.createSpace(edge.getX(), edge.getY() - 1));
                    }
                    else {
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
                    var firstSpace = this.getIteratorData();
                    this.markCurrentIterator();
                    this.moveIteratorUp(1);
                    var secondSpace = this.getIteratorData();
                    builder.setSpaceBetweenTwoSpaces(firstSpace, secondSpace, builder.peek());
                    builder.pop();
                };
                return StandardMazeCreator;
            })();
            Definitions.StandardMazeCreator = StandardMazeCreator;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardMazeCreator.js.map