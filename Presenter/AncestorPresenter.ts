///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
///<reference path="../View/AncestorMapView.ts"/>
///<reference path="../Model/ModelFacade.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Presenter
{
    import IModelObserver = Model.IModelObserver;
    import IModelArgs = Model.IModelArgs;
    import IModel = Model.IModel;
    import AncestorMapView = View.AncestorMapView;
    import IMove = Model.IMove;
    import IKey = Model.IKey;
    import AncestorName = Model.Definitions.FamilyHistory.AncestorName;
    import IRequirement = Model.IRequirement;
    import IPresenter = Presenter.IPresenter;
    import IModelFactory = Model.IModelFactory;
    import AbstractPresenter = Presenter.AbstractPresenter;

    export class AncestorPresenter implements IPresenter
    {
        private presenter:AbstractPresenter;
        private goingThroughDoor:boolean;
        private justEnteredName:boolean;
        private lastEnteredName:string;
        private pickedUpKeys:IKey[];
        private factory:IModelFactory;

        public constructor(model:IModel,factory:IModelFactory)
        {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model,new AncestorMapView(this,7,7));
            this.pickedUpKeys = [];
            this.justEnteredName = false;
            this.goingThroughDoor = false;
            this.factory = factory;
        }

        private getKey(name:string):IKey
        {
            return this.factory.createKey(this.factory.createKeyParams(name));
        }

        public update(model:IModelArgs):void
        {
            if(model.attemptedToGetInADoor())
            {
                if(model.doorRequirement().playerFulfillsRequirement(model.getPlayer()))
                {
                    var popup = document.getElementById("imagePopup");
                    popup.style.visibility = "hidden";
                    var canvas = document.getElementById("canvas-container");
                    canvas.style.visibility = "visible";
                }
                else if(this.justEnteredName)
                {
                    this.justEnteredName = false;
                    var key:IKey = this.getKey(this.lastEnteredName);
                    model.getPlayer().addKey(key);
                    //this.executeMove(this.getLastMove());
                }
                else
                {
                    var popup = document.getElementById("imagePopup");
                    var elementID:string = model.doorRequirement().toString().replace(/ /g,'');
                    var ancestorPicture = document.getElementById(elementID);
                    var src = document.getElementById("ancestorPicture").setAttribute("src",ancestorPicture.getAttribute("src"));
                    document.getElementById("doorAnswer").value = "";
                    popup.style.visibility = "visible";
                    var canvas = document.getElementById("canvas-container");
                    canvas.style.visibility = "hidden";
                    this.goingThroughDoor = true;
                    this.justEnteredName = false;
                }
            }
            if(model.pickedUpNewKey())
            {
                this.presenter.outputToLog("The slip of paper says: " + model.newKey().toString());
                this.pickedUpKeys.push(model.newKey());
            }
            this.presenter.checkWon(model);
            this.presenter.checkRedraw(model);
        }

        public enterName(name):void
        {
            this.lastEnteredName = name;
            this.justEnteredName = true;
            var popup = document.getElementById("imagePopup");
            popup.style.visibility = "hidden";
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "visible";
            this.goingThroughDoor = false;
            this.executeMove(this.getLastMove());
        }

        public leavePopup():void
        {
            var popup = document.getElementById("imagePopup");
            popup.style.visibility = "hidden";
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "visible";
            this.goingThroughDoor = false;
        }

        public getLastMove():IMove
        {
            return this.presenter.getLastMove();
        }

        public executeMove(move:IMove):void
        {
            if(!this.goingThroughDoor)
            {
                this.presenter.executeMove(move);
            }
        }

        public isInPopup()
        {
            return this.goingThroughDoor;
        }
    }
}