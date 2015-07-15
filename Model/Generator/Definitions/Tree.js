/**
 * Tree Data structure used in maze generation and population.
 * Created by phobos2390 on 4/22/15.
 */
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var Tree = (function () {
                function Tree(data) {
                    this.data = data;
                    this.parent = null;
                    this.marked = false;
                    this.subTree = [];
                    this.minDepth = 4;
                }
                Tree.prototype.mark = function () {
                    this.marked = true;
                };
                Tree.prototype.unmark = function () {
                    this.marked = false;
                };
                Tree.prototype.isMarked = function () {
                    return this.marked;
                };
                Tree.prototype.getParent = function () {
                    return this.parent;
                };
                Tree.prototype.getData = function () {
                    return this.data;
                };
                Tree.prototype.setData = function (data) {
                    this.data = data;
                };
                Tree.prototype.getChild = function (index) {
                    return this.subTree[index];
                };
                Tree.prototype.getChildren = function () {
                    return this.subTree;
                };
                Tree.prototype.addChild = function (child) {
                    this.subTree.push(child);
                    child.parent = this;
                };
                Tree.prototype.traverse = function (visitor) {
                    this.recTraverse(visitor, 0);
                };
                //Moves down the tree until it gets to a leaf node
                Tree.prototype.recTraverse = function (visitor, depth) {
                    var unmarkedNeighbors = [];
                    for (var i = 0; i < this.subTree.length; i++) {
                        if (!this.subTree[i].isMarked()) {
                            unmarkedNeighbors.push(this.subTree[i]);
                        }
                    }
                    var max = unmarkedNeighbors.length;
                    var subTreePath = Math.floor(Math.random() * max);
                    if (this.subTree.length == 0 || unmarkedNeighbors.length == 0) {
                        visitor.visit(this.data);
                    }
                    else {
                        if (this.marked && this.parent != null) {
                            visitor.visit(this.data);
                        }
                        else {
                            unmarkedNeighbors[subTreePath].recTraverse(visitor, depth + 1);
                        }
                    }
                };
                return Tree;
            })();
            Definitions.Tree = Tree;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=Tree.js.map