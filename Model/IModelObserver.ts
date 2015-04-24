///<reference path="IModelArgs.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IModelObserver
    {
        update(model:IModelArgs):void;
    }
}