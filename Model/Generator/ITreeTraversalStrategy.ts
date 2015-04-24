///<reference path="Definitions/Tree.ts"/>
/**
 * Created by phobos2390 on 4/23/15.
 */

module Model.Generator
{
    import Tree = Model.Generator.Definitions.Tree;

    export interface ITreeTraversalStrategy
    {
        traverse(tree:Tree,visitor):void;
    }
}