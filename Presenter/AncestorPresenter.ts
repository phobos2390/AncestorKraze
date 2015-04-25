///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Presenter
{
    import IModelObserver = Model.IModelObserver;
    import IModelArgs = Model.IModelArgs;
    import IModel = Model.IModel;
    import MapView = View.MapView;
    import IMove = Model.IMove;
    import IRequirement = Model.IRequirement;
    import IPresenter = Presenter.IPresenter;
    import AbstractPresenter = Presenter.AbstractPresenter;

    export class AncestorPresenter implements IPresenter
    {
        private presenter:AbstractPresenter;

        public constructor(model:IModel)
        {
            this.presenter = new AbstractPresenter(model);
        }

        public update(model:IModelArgs):void
        {
            if(model.attemptedToGetInADoor())
            {

            }
            this.presenter.update(model);
        }

        public getLastMove():IMove
        {
            return this.presenter.getLastMove();
        }

        public executeMove(move:IMove):void
        {
            this.presenter.executeMove(move);
        }
    }
}