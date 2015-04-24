///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
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

    export class MapPresenter implements IModelObserver
    {
        private model:IModel;
        private view:MapView;
        private lastMove:IMove;

        public constructor(model:IModel)
        {
            this.model = model;
            this.model.registerObserver(this);
            this.view = new MapView(this, 15, 15);
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
            if(model.attemptedToGetInADoor())
            {
                alert("Requirement: " + model.doorRequirement().toString());
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
                //console.log("Moved: <" + move.getDeltaX() + "," + move.getDeltaY() + ">");
            }
        }
    }
}