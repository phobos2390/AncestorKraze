///<reference path="../Model/IModelArgs.ts"/>
///<reference path="../Model/IMove.ts"/>
///<reference path="../Model/IModelObserver.ts"/>
/**
 * Created by phobos2390 on 4/24/15.
 */

module Presenter
{
    import IModelArgs = Model.IModelArgs;
    import IMove = Model.IMove;
    import IModelObserver = Model.IModelObserver;

    export interface IPresenter extends IModelObserver
    {
        update(model:IModelArgs):void;
        getLastMove():IMove;
        executeMove(move:IMove):void;
    }
}