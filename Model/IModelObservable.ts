///<reference path="IModelObserver.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IModelObservable
    {
        registerObserver(observer:IModelObserver):void;
        update(arguments:IModelArgs):void;
    }
}