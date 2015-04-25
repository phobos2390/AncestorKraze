///<reference path="../Model/IModelObserver.ts"/>
///<reference path="../Model/IModelArgs.ts"/>
///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="../Model/IMove.ts"/>
///<reference path="../Model/IRequirement.ts"/>
/**
 * Created by phobos2390 on 4/24/15.
 */

module Presenter
{
    import IModelObserver = Model.IModelObserver;
    import IModelArgs = Model.IModelArgs;
    import IModel = Model.IModel;
    import MapView = View.MapView;
    import IMove = Model.IMove;
    import IRequirement = Model.IRequirement;

    export class AbstractPresenter
    {
        private model:IModel;
        private view:MapView;
        private lastMove:IMove;

        public constructor(model:IModel)
        {
            this.model = model;
            this.view = new MapView(this,15,15);
            this.lastMove = null;
        }

        public update(model:IModelArgs):void
        {
            if(model.won())
            {
                alert("YOU WON!");
            }
            if(model.mustRedraw())
            {
                this.view.draw(model);
            }
            if(model.pickedUpNewKey())
            {
                alert("New key: " + model.newKey().toString());
            }
        }

        public getLastMove():IMove
        {
            return this.lastMove;
        }

        public executeMove(move:IMove):void
        {
            this.lastMove = move;
            if(this.model.canMovePlayer(move))
            {
                this.model.movePlayer(move);
            }
        }
    }
}