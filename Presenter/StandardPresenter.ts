///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
/**
 * Entering point for the MVP architecture. Interacts with both Model and View.
 * Model
 *   |
 * Presenter - KrazeClient
 *   |
 * View
 * FOR THE STANDARD VERSION OF THE GAME
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

    export class StandardPresenter implements IPresenter
    {
        private presenter:AbstractPresenter;

        public constructor(model:IModel)
        {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model,new MapView(this,15,15));
        }

        //Exactly the same as the Abstract Presenter
        public update(model:IModelArgs):void
        {
            if(model.attemptedToGetInADoor())
            {
                //alert("Requirement: " + model.doorRequirement().toString());
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

        public isInPopup()
        {
            return false;
        }

        public setGender(gender:string):void
        {
            this.presenter.setGender(gender);
        }
    }
}
