///<reference path="Tree.ts"/>
/**
 * Finds the number of open leafs in the Tree
 * Created by phobos2390 on 4/23/15.
 */
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var NumberOfBranchesStrategy = (function () {
                function NumberOfBranchesStrategy() {
                    this.branches = 1;
                }
                NumberOfBranchesStrategy.prototype.traverse = function (tree) {
                    var children = tree.getChildren();
                    var numChildren = 0;
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if (!child.isMarked()) {
                            //Depth first search
                            this.traverse(child);
                            ++numChildren;
                        }
                    }
                    //Post order visit
                    this.visit(numChildren);
                };
                NumberOfBranchesStrategy.prototype.visit = function (children) {
                    //only adds the number of branches beyond the first one
                    if (children > 0) {
                        this.branches = this.branches + (children - 1);
                    }
                };
                NumberOfBranchesStrategy.prototype.getBranches = function () {
                    return this.branches;
                };
                return NumberOfBranchesStrategy;
            })();
            Definitions.NumberOfBranchesStrategy = NumberOfBranchesStrategy;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=NumberOfBranchesStrategy.js.map