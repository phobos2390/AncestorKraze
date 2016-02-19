///<reference path = "AbstractTreeTraversalState.ts"/>
///<reference path = "ITreeTraversalState.ts"/>
///<reference path="../../ISpace.ts"/>
/**
 * Places the current iterator at the correct position to have the
 * new leaf state place the data as a leaf of the current iterator
 * (done in the if statements in the while loop in the random spanning tree traversal)
 * Created by phobos2390 on 4/22/15.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var AbstractTreeTraversalState = Model.Generator.Definitions.AbstractTreeTraversalState;
            var NewBranchState = (function (_super) {
                __extends(NewBranchState, _super);
                function NewBranchState(creator, nextState) {
                    _super.call(this, creator, nextState);
                }
                NewBranchState.prototype.read = function (data) {
                    _super.prototype.getCreator.call(this).setIteratorToData(data);
                    _super.prototype.advanceCreatorToNextState.call(this);
                };
                return NewBranchState;
            })(AbstractTreeTraversalState);
            Definitions.NewBranchState = NewBranchState;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=NewBranchState.js.map