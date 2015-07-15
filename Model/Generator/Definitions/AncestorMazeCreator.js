///<reference path="StandardMazeCreator.ts"/>
/**
 * Created by phobos2390 on 5/2/15.
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
            var StandardMazeCreator = Model.Generator.Definitions.StandardMazeCreator;
            var AncestorMazeCreator = (function (_super) {
                __extends(AncestorMazeCreator, _super);
                function AncestorMazeCreator(factory, numberOfKeys) {
                    _super.call(this, factory, numberOfKeys);
                    this.keys = [];
                }
                AncestorMazeCreator.prototype.addKey = function (key) {
                    this.keys.push(key);
                };
                //Only difference between the Ancestor Maze Creator and the Standard Maze Creator
                AncestorMazeCreator.prototype.initializeKeyList = function (builder) {
                    builder.addEmptyToStack();
                    builder.addEmptyToStack();
                    for (var i = 0; i < this.getNumberOfKeys(); i++) {
                        builder.addKeyAndDoorPairToStack(this.getFactory().createKeyParams(this.keys[i]), this.getFactory().createDoorParams(this.keys[i]));
                    }
                };
                return AncestorMazeCreator;
            })(StandardMazeCreator);
            Definitions.AncestorMazeCreator = AncestorMazeCreator;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=AncestorMazeCreator.js.map