///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
///<reference path="../View/AncestorMapView.ts"/>
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
    import AbstractPresenter = Presenter.AbstractPresenter;

    export class AncestorPresenter implements IPresenter
    {
        private presenter:AbstractPresenter;
        private goingThroughDoor:boolean;
        private justEnteredName:boolean;
        private lastEnteredName:string;
        private pickedUpKeys:IKey[];

        public constructor(model:IModel)
        {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model,new AncestorMapView(this,15,15));
            this.pickedUpKeys = [];
            this.justEnteredName = false;
            this.goingThroughDoor = false;
        }

        private hasKey(name:string):boolean
        {
            for(var i:number = 0; i < this.pickedUpKeys.length; i++)
            {
                if((<AncestorName>this.pickedUpKeys[i]).toString().valueOf() == name.valueOf())
                {
                    return true;
                }
            }
            return false;
        }

        private getKey(name:string):IKey
        {
            for(var i:number = 0; i < this.pickedUpKeys.length; i++)
            {
                if((<AncestorName>this.pickedUpKeys[i]).toString().valueOf() == name.valueOf())
                {
                    return this.pickedUpKeys[i];
                }
            }
            return null;
        }

        public update(model:IModelArgs):void
        {
            if(model.attemptedToGetInADoor())
            {
                if(model.doorRequirement().playerFulfillsRequirement(model.getPlayer()))
                {
                    var popup = document.getElementById("imagePopup");
                    popup.style.visibility = "hidden";
                }
                else if(this.justEnteredName)
                {
                    this.justEnteredName = false;
                    var playerHasKey:boolean = this.hasKey(this.lastEnteredName);
                    var key:IKey = this.getKey(this.lastEnteredName);
                    if(playerHasKey)
                    {
                        model.getPlayer().addKey(key);
                        this.executeMove(this.getLastMove());
                    }
                }
                else
                {
                    var popup = document.getElementById("imagePopup");
                    var elementID:string = model.doorRequirement().toString().replace(/ /g,'');
                    var ancestorPicture = document.getElementById(elementID);
                    var src = document.getElementById("ancestorPicture").setAttribute("src",ancestorPicture.getAttribute("src"));
                    popup.style.visibility = "visible";
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
            this.goingThroughDoor = false;
            this.executeMove(this.getLastMove());
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
    }
}