///<reference path="../Model/IModelObserver.ts"/>
///<reference path="../Model/IModelArgs.ts"/>
///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="../Model/IMove.ts"/>
///<reference path="../Model/IKey.ts"/>
///<reference path="../Model/IRequirement.ts"/>
/**
 * Abstract Presenter. The main brains of the program. Responds to changes in the model and inputs.
 * Entering point for the MVP architecture. Interacts with both Model and View.
 * Model
 *   |
 * Presenter - KrazeClient
 *   |
 * View
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

        //Checks to see if the won event is set
        public checkWon(model:IModelArgs):void
        {
            if(model.won())
            {
                setElementVisibility("canvas-container","hidden");
                setElementVisibility("messages","hidden");
                setElementVisibility("winPopup","visible");
            }
        }

        //redraws the model
        public checkRedraw(model:IModelArgs):void
        {
            this.view.draw(model);
        }

        //Outputs the current string to the log.
        public outputToLog(log:string):void
        {
            var logElement = document.getElementById("log");
            logElement.value += log + "\n";
            logElement.scrollTop = logElement.scrollHeight;
        }

        //Checks to see if the player just picked up a key. (Key event)
        public checkPickedUpKey(model:IModelArgs):void
        {
            if(model.pickedUpNewKey())
            {
                this.outputToLog("Picked up a new key!");
                model.getPlayer().addKey(model.newKey());
            }
        }

        //Checks all of the current events for the presenter
        public update(model:IModelArgs):void
        {
            this.checkWon(model);
            this.checkRedraw(model);
            this.checkPickedUpKey(model);
        }

        //retrieves the last keyed move
        public getLastMove():IMove
        {
            return this.lastMove;
        }

        //moves the player
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

        //Sets the value of the gender
        public setGender(gender:string):void
        {
            this.view.setGender(gender);
        }
    }
}
