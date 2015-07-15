///<reference path="IModelObserver.ts"/>
/**
 * observer pattern that the presenter observes
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    export interface IModelObservable
    {
        registerObserver(observer:IModelObserver):void;
        update():void;
    }
}
