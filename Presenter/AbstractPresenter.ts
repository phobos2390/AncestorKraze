///<reference path="../Model/IModelObserver.ts"/>
///<reference path="../Model/IModelArgs.ts"/>
///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="../Model/IMove.ts"/>
///<reference path="../Model/IKey.ts"/>
///<reference path="../Model/IRequirement.ts"/>
/**
 * Created by phobos2390 on 4/24/15.
 */

module Presenter
{
    import IModelObserver = Model.IModelObserver;
    import IModelArgs = Model.IModelArgs;
    import IModel = Model.IModel;
    import IView = View.IView;
    import IMove = Model.IMove;
    import IKey = Model.IKey;
    import IRequirement = Model.IRequirement;

    export class AbstractPresenter
    {
        private model:IModel;
        private view:IView;
        private lastMove:IMove;

        public constructor(model:IModel,view:IView)
        {
            this.model = model;
            this.view = view;
            this.lastMove = null;
        }

        public getView():IView
        {
            return this.view;
        }

        public checkWon(model:IModelArgs):void
        {
            if(model.won())
            {
                alert("YOU WON!");
            }
        }

        public checkRedraw(model:IModelArgs):void
        {
            this.view.draw(model);
        }

        public outputToLog(log:string):void
        {
            var logElement = document.getElementById("log");
            var logLine = document.createElement("li");
            logLine.innerHTML = log;
            logElement.appendChild(logLine);
        }

        public checkPickedUpKey(model:IModelArgs):void
        {
            if(model.pickedUpNewKey())
            {
                this.outputToLog("Picked up a new key!!!!");
                model.getPlayer().addKey(model.newKey());
            }
        }

        public update(model:IModelArgs):void
        {
            this.checkWon(model);
            this.checkRedraw(model);
            this.checkPickedUpKey(model);
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
            else
            {
                this.model.update();
            }
        }

        public setGender(gender:string):void
        {
            this.view.setGender(gender);
        }
    }
}