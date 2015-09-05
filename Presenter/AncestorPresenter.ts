///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
///<reference path="../View/AncestorMapView.ts"/>
///<reference path="../Model/ModelFacade.ts"/>
/**
 * Main brains of the Ancestor version of the game. Critical to the difference between the standard and
 * ancestor versions of the game. The ancestor version works by having essentially two different views that swap.
 * The canvas and the message box is the standard view of the game. The portrait and the answer box is shown when
 * the player attempts to go through the door.
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
            this.presenter = new AbstractPresenter(model,new AncestorMapView(this,11,29));
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
            //Responds to the attempted to get in a door event
            if(model.attemptedToGetInADoor())
            {
                if(model.doorRequirement().playerFulfillsRequirement(model.getPlayer()))
                {
                    this.leavePopup();
                }
                else if(this.justEnteredName)
                {
                    //called if the name of the ancestor is entered
                    this.justEnteredName = false;
                    var key:IKey = this.getKey(this.lastEnteredName);
                    model.getPlayer().addKey(key);
                    //this.executeMove(this.getLastMove());
                }
                else
                {
                  var elementID:string = model.doorRequirement().toString().replace(/ /g,'');
                  this.setImageSource(elementID,"ancestorPicture");
                  this.enterPopup();
                }
            }
            //Responds to the event of the player picking up a key
            if(model.pickedUpNewKey())
            {
                this.presenter.outputToLog("The slip of paper says: " + model.newKey().toString());
                model.getPlayer().addKey(model.newKey());
                this.pickedUpKeys.push(model.newKey());
            }
            //calls the other two event handlers
            this.presenter.checkWon(model);
            this.presenter.checkRedraw(model);
        }

        private setImageSource(imageSource, imageDestination):void
        {
            document.getElementById(imageDestination).setAttribute("src",document.getElementById(imageSource).getAttribute("src"));
        }

        //Name entered by the player. Called by the KrazeClient.
        public enterName(name):void
        {
            this.lastEnteredName = name;
            this.justEnteredName = true;
            // popup hidden
            setElementVisibility("imagePopup","hidden");
            // canvas shown
            setElementVisibility("canvas-container","visible");
            //sets the ancestor picture to the loading gif
            this.setImageSource("Loading","ancestorPicture");
            this.goingThroughDoor = false;
            setElementVisibility("header","visible");
            setElementVisibility("subMenu","visible");
            //reexecutes the move that had the player attempt to get through the door
            this.executeMove(this.getLastMove());
        }

        //Called if the player doesn't have the name
        public leavePopup():void
        {
            //Popup closed
            setElementVisibility("imagePopup","hidden");
            //Canvas shown
            setElementVisibility("canvas-container","visible");
            //sets the portrait photo to the loading gif (to give the photo time to load)
            this.setImageSource("Loading","ancestorPicture");
            this.goingThroughDoor = false;
            setElementVisibility("header","visible");
            setElementVisibility("subMenu","visible");
        }

        public enterPopup():void
        {
            //Finds the Ancestor Picture and sets the popup image to that image
            document.getElementById("doorAnswer").value = "";
            //Called at the very beginning when the player attempts to enter a door
            //popup set to visible
            setElementVisibility("imagePopup","visible");
            setElementVisibility("canvas-container","hidden");
            //canvas made invisible
            //Sets the state flags
            this.goingThroughDoor = true;
            this.justEnteredName = false;
            setElementVisibility("header","hidden");
            setElementVisibility("subMenu","hidden");
        }

        public getLastMove():IMove
        {
            return this.presenter.getLastMove();
        }

        //indirection to the abstract presenter's execute move method
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

        public setGender(gender:string)
        {
            this.presenter.setGender(gender);
        }
    }
}
