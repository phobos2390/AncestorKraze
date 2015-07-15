///<reference path="IModelArgs.ts"/>
/**
 * observer of the model
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IModelObserver
    {
        update(model:IModelArgs):void;
    }
}
