///<reference path="../../ISpace.ts"/>
///<reference path="../ITreeVisitor.ts"/>
///<reference path="StandardMazeCreator.ts"/>
/**
 * Created by phobos2390 on 4/23/15.
 */
var Model;
(function (Model) {
    var Generator;
    (function (Generator) {
        var Definitions;
        (function (Definitions) {
            var RandomizedPopulator = (function () {
                function RandomizedPopulator(creator, builder) {
                    this.creator = creator;
                    this.builder = builder;
                }
                RandomizedPopulator.prototype.visit = function (space) {
                    this.builder.setKey(space, this.builder.peek());
                    this.builder.pop();
                    this.creator.setIteratorToData(space);
                    this.creator.moveUpToStartOfBranch();
                    var firstSpace = this.creator.getIteratorData();
                    this.creator.markCurrentIterator();
                    this.creator.moveIteratorUp(1);
                    var secondSpace = this.creator.getIteratorData();
                    this.builder.setDoorBetweenTwoSpaces(firstSpace, secondSpace, this.builder.peek());
                    this.builder.pop();
                };
                return RandomizedPopulator;
            })();
            Definitions.RandomizedPopulator = RandomizedPopulator;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=RandomizedPopulator.js.map