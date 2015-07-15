///<reference path = "AbstractTreeTraversalState.ts"/>
///<reference path = "ITreeTraversalState.ts"/>
///<reference path="../../ISpace.ts"/>
/**
 * Adds the child to the Tree as a leaf of the current iterator
 * (done at the beginning of the while loop in the random spanning tree traversal)
 * The other states deal with positioning the current iterator
 * Created by phobos2390 on 4/22/15.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var AbstractTreeTraversalState = Model.Generator.Definitions.AbstractTreeTraversalState;
            var NewLeafState = (function (_super) {
                __extends(NewLeafState, _super);
                function NewLeafState(creator, nextState) {
                    _super.call(this, creator, nextState);
                }
                NewLeafState.prototype.read = function (data) {
                    _super.prototype.getCreator.call(this).addChildToTreeGettingGenerated(data);
                    _super.prototype.advanceCreatorToNextState.call(this);
                };
                return NewLeafState;
            })(AbstractTreeTraversalState);
            Definitions.NewLeafState = NewLeafState;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=NewLeafState.js.map