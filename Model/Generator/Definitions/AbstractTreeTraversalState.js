///<reference path="../../ISpace.ts"/>
///<reference path="ITreeTraversalState.ts"/>
///<reference path="StandardMazeCreator.ts"/>
/**
 * Created by phobos2390 on 4/22/15.
 */
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var AbstractTreeTraversalState = (function () {
                function AbstractTreeTraversalState(creator, nextState) {
                    this.creator = creator;
                    this.nextState = nextState;
                }
                AbstractTreeTraversalState.prototype.setNextState = function (nextState) {
                    this.nextState = nextState;
                };
                AbstractTreeTraversalState.prototype.advanceCreatorToNextState = function () {
                    this.creator.setCurrentState(this.nextState);
                };
                AbstractTreeTraversalState.prototype.getCreator = function () {
                    return this.creator;
                };
                AbstractTreeTraversalState.prototype.read = function (data) {
                    throw new Error('This method is abstract');
                };
                return AbstractTreeTraversalState;
            })();
            Definitions.AbstractTreeTraversalState = AbstractTreeTraversalState;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AbstractTreeTraversalState.js.map