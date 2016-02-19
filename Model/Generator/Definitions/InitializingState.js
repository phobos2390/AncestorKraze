///<reference path="../../ISpace.ts"/>
///<reference path="ITreeTraversalState.ts"/>
///<reference path="AbstractTreeTraversalState.ts"/>
///<reference path="StandardMazeCreator.ts"/>
/**
 * Places the current iterator at the space (1,1) (which will be the root tree)
 * (done at the very beginning of the Random Spanning Tree Traversal)
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
            var InitializingState = (function (_super) {
                __extends(InitializingState, _super);
                function InitializingState(creator, nextState) {
                    _super.call(this, creator, nextState);
                }
                InitializingState.prototype.read = function (data) {
                    _super.prototype.getCreator.call(this).setToInitial(data);
                    _super.prototype.advanceCreatorToNextState.call(this);
                };
                return InitializingState;
            })(AbstractTreeTraversalState);
            Definitions.InitializingState = InitializingState;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=InitializingState.js.map