///<reference path="Tree.ts"/>
/**
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
                    var numChildren = children.length;
                    this.visit(numChildren);
                    for (var i = 0; i < numChildren; i++) {
                        var child = children[i];
                        if (!child.isMarked()) {
                            this.traverse(child);
                        }
                    }
                };
                NumberOfBranchesStrategy.prototype.visit = function (children) {
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