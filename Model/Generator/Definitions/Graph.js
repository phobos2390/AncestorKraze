/**
 * Graph for the maze.
 * Created by phobos2390 on 4/22/15.
 */
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var Graph = (function () {
                function Graph() {
                    this.dict = {};
                    this.nodes = [];
                }
                Graph.prototype.addNode = function (node) {
                    this.nodes.push(node);
                    this.dict[node.toString()] = [];
                };
                Graph.prototype.setAdjacent = function (src, dst) {
                    this.dict[src.toString()].push(dst);
                };
                Graph.prototype.getAdjacencies = function (node) {
                    return this.dict[node.toString()];
                };
                //traverses a random spanning tree
                Graph.prototype.traverse = function (visitor) {
                    var marked = [];
                    for (var i = 0; i < this.nodes.length; i++) {
                        marked.push(false);
                    }
                    var currentIndex = 0;
                    var current = this.nodes[currentIndex];
                    //only if there is no marked nodes
                    while (marked.indexOf(false) != -1) {
                        //visits the the current node to put the node in the tree
                        //other times the node is visited, the iterator in the visitor
                        //is set to that value
                        visitor.visit(current);
                        marked[currentIndex] = true;
                        var adjacent = this.dict[current];
                        var unmarkedNeighbors = [];
                        var markedNeighbors = [];
                        //finds the adjacent nodes that haven't been visited
                        for (var i = 0; i < adjacent.length; i++) {
                            var node = adjacent[i];
                            var indexOfNode = this.nodes.indexOf(node);
                            if (!marked[indexOfNode]) {
                                unmarkedNeighbors.push(node);
                            }
                            else {
                                markedNeighbors.push(node);
                            }
                        }
                        var possibleNeighbors = unmarkedNeighbors.length;
                        //there are enough possible neighbors to need a random adjacent
                        if (possibleNeighbors > 1) {
                            if (markedNeighbors.length > 0) {
                                visitor.visit(current);
                            }
                            var neighborIndex = Math.floor(Math.random() * possibleNeighbors);
                            currentIndex = this.nodes.indexOf(unmarkedNeighbors[neighborIndex]);
                            current = this.nodes[currentIndex];
                        }
                        else if (possibleNeighbors > 0) {
                            visitor.visit(current);
                            currentIndex = this.nodes.indexOf(unmarkedNeighbors[0]);
                            current = this.nodes[currentIndex];
                        }
                        else if (marked.indexOf(false) != -1) {
                            //finds the first node that is not marked
                            currentIndex = marked.indexOf(false);
                            current = this.nodes[currentIndex];
                            adjacent = this.dict[current];
                            unmarkedNeighbors = [];
                            markedNeighbors = [];
                            for (var i = 0; i < adjacent.length; i++) {
                                var node = adjacent[i];
                                var indexOfNode = this.nodes.indexOf(node);
                                if (!marked[indexOfNode]) {
                                    unmarkedNeighbors.push(node);
                                }
                                else {
                                    markedNeighbors.push(node);
                                }
                            }
                            visitor.visit(markedNeighbors[0]);
                        }
                    }
                };
                return Graph;
            })();
            Definitions.Graph = Graph;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=Graph.js.map