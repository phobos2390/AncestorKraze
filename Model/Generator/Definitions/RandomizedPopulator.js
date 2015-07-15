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
                    //Sets a key at the leaf node
                    this.builder.setKey(space, this.builder.peek());
                    this.builder.pop();
                    this.creator.setIteratorToData(space);
                    //moves the iterator up to the start of the branch
                    this.creator.moveUpToStartOfBranch();
                    var firstSpace = this.creator.getIteratorData();
                    //marks the current iterator to prevent the tree from going back down that path
                    this.creator.markCurrentIterator();
                    this.creator.moveIteratorUp(1);
                    var secondSpace = this.creator.getIteratorData();
                    //Sets a door there. (Corrects the spaces on model creation after builder is finished)
                    this.builder.setSpaceBetweenTwoSpaces(firstSpace, secondSpace, this.builder.peek());
                    this.builder.pop();
                    //Pop actually moves an iterator rather than deleting  it completely from the stack
                    //This way the door and key list is preserved to be corrected
                    //This way the populator can stop when the number of unvisited branches is only 1 but
                    //there are still nonempty spaces on the builder stack. This way, the number of branches
                    //is technically immaterial and the maze generation only needs to happen once
                    //This was a very recent change added in to allow the user to define the size of maze they
                    //want in addition to the number generations they want to retrieve.
                };
                return RandomizedPopulator;
            })();
            Definitions.RandomizedPopulator = RandomizedPopulator;
        })(Definitions = Generator.Definitions || (Generator.Definitions = {}));
    })(Generator = Model.Generator || (Model.Generator = {}));
})(Model || (Model = {}));
//# sourceMappingURL=RandomizedPopulator.js.map