///<reference path="../ISpace.ts"/>
/**
 * Created by phobos2390 on 4/23/15.
 */

module Model.Generator
{
    import ISpace = Model.ISpace;

    export interface ITreeVisitor
    {
        visit(space:ISpace):void;
    }
}