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
                function StandardMazeCreator(factory) {
                    this.factory = factory;
                    this.numberOfKeys = 9;
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
                StandardMazeCreator.prototype.moveUpToStartOfBranch = function () {
                    var iterator = this.currentIter;
                    while (iterator != null && iterator.getChildren().length < 2) {
                        var space = this.currentIter.getData();
                        //console.log("Iterator moved up to space: (" + space.getX() + "," + space.getY() + ")");
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
                    var newLeaf = new NewLeafState(this, null);
                    var initial = new InitializingState(this, newLeaf);
                    var newBranch = new NewBranchState(this, newLeaf);
                    newLeaf.setNextState(newBranch);
                    this.currentState = initial;
                    this.rootTree = new Tree(this.factory.createSpace(0, 0));
                    this.graph.traverse(this);
                    return this.rootTree;
                };
                StandardMazeCreator.prototype.setSize = function (height, width) {
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
                StandardMazeCreator.prototype.createGraph = function () {
                    this.graph = new Graph();
                    this.edges = [];
                    for (var i = 0; i < this.positions.length; i++) {
                        for (var j = 0; j < this.positions[i].length; j++) {
                            this.graph.addNode(this.positions[i][j]);
                            var current = this.positions[i][j];
                            for (var k = 0; k < 2; k++) {
                                var change = 2 * k - 1;
                                var newRow = i + change;
                                var newCol = j + change;
                                var rowInBounds = (0 <= newRow && newRow < this.graphHeight);
                                var validPosition = rowInBounds;
                                var edge = false;
                                if (validPosition) {
                                    this.graph.setAdjacent(current, this.positions[newRow][j]);
                                }
                                else {
                                    edge = true;
                                }
                                var colInBounds = (0 <= newCol && newCol < this.graphWidth);
                                validPosition = colInBounds;
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
                StandardMazeCreator.prototype.recCreateFromTree = function (currIter, recBuilder) {
                    var builder = recBuilder;
                    var subTree = currIter.getChildren();
                    var parent = currIter.getData();
                    for (var i = 0; i < subTree.length; i++) {
                        var child = subTree[i].getData();
                        builder.setEmpty(this.factory.createSpace((parent.getX() + child.getX()) / 2, (parent.getY() + child.getY()) / 2));
                        builder = this.recCreateFromTree(subTree[i], builder);
                    }
                    return builder;
                };
                StandardMazeCreator.prototype.markCurrentIterator = function () {
                    this.currentIter.mark();
                };
                StandardMazeCreator.prototype.createMaze = function (height, width) {
                    var builder = this.factory.createBuilder();
                    builder.setHeight(height).setWidth(width);
                    builder.setBaseFilledPattern(this.factory.createSpace(0, 0), width, height);
                    this.setSize(height, width);
                    this.createGraph();
                    var spanningTree = this.createRandomSpanningTree();
                    var branches = this.getTotalNumberOfBranches();
                    builder = this.recCreateFromTree(spanningTree, builder);
                    while (branches < this.numberOfKeys) {
                        builder.setBaseFilledPattern(this.factory.createSpace(0, 0), width, height);
                        spanningTree = this.createRandomSpanningTree();
                        branches = this.getTotalNumberOfBranches();
                        builder = this.recCreateFromTree(spanningTree, builder);
                    }
                    builder.addEmptyToStack();
                    builder.addEmptyToStack();
                    for (var i = 0; i < this.numberOfKeys; i++) {
                        builder.addKeyAndDoorPairToStack(this.factory.createKeyParams((i + 1)), this.factory.createDoorParams((i + 1)));
                    }
                    builder.setExit(this.factory.createSpace(height - 2, width - 1));
                    this.setIteratorToData(this.factory.createSpace(height - 2, width - 2));
                    this.moveUpToStartOfBranch();
                    var firstSpace = this.getIteratorData();
                    this.markCurrentIterator();
                    this.moveIteratorUp(1);
                    var secondSpace = this.getIteratorData();
                    builder.setDoorBetweenTwoSpaces(firstSpace, secondSpace, builder.peek());
                    builder.pop();
                    var populator = new RandomizedPopulator(this, builder);
                    while (!builder.peek().objectIsOfType("BlankSpace")) {
                        spanningTree.traverse(populator);
                    }
                    builder.setPlayer(this.factory.createSpace(1, 1), this.factory.createPlayer());
                    return builder.build();
                };
                return StandardMazeCreator;
            })();
            Definitions.StandardMazeCreator = StandardMazeCreator;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=StandardMazeCreator.js.map