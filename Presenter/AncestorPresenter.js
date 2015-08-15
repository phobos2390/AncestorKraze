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
var Presenter;
(function (Presenter) {
    var AncestorMapView = View.AncestorMapView;
    var AbstractPresenter = Presenter.AbstractPresenter;
    var AncestorPresenter = (function () {
        function AncestorPresenter(model, factory) {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model, new AncestorMapView(this, 11, 11));
            this.pickedUpKeys = [];
            this.justEnteredName = false;
            this.goingThroughDoor = false;
            this.factory = factory;
        }
        AncestorPresenter.prototype.getKey = function (name) {
            return this.factory.createKey(this.factory.createKeyParams(name));
        };
        AncestorPresenter.prototype.update = function (model) {
            //Responds to the attempted to get in a door event
            if (model.attemptedToGetInADoor()) {
                if (model.doorRequirement().playerFulfillsRequirement(model.getPlayer())) {
                    this.leavePopup();
                }
                else if (this.justEnteredName) {
                    //called if the name of the ancestor is entered
                    this.justEnteredName = false;
                    var key = this.getKey(this.lastEnteredName);
                    model.getPlayer().addKey(key);
                }
                else {
                    var elementID = model.doorRequirement().toString().replace(/ /g, '');
                    var ancestorPicture = document.getElementById(elementID);
                    document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
                    this.enterPopup();
                }
            }
            //Responds to the event of the player picking up a key
            if (model.pickedUpNewKey()) {
                this.presenter.outputToLog("The slip of paper says: " + model.newKey().toString());
                model.getPlayer().addKey(model.newKey());
                this.pickedUpKeys.push(model.newKey());
            }
            //calls the other two event handlers
            this.presenter.checkWon(model);
            this.presenter.checkRedraw(model);
        };
        //Name entered by the player. Called by the KrazeClient.
        AncestorPresenter.prototype.enterName = function (name) {
            this.lastEnteredName = name;
            this.justEnteredName = true;
            // popup hidden
            var popup = document.getElementById("imagePopup");
            popup.style.visibility = "hidden";
            // canvas shown
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "visible";
            //sets the ancestor picture to the loading gif
            var elementID = "Loading";
            var ancestorPicture = document.getElementById(elementID);
            document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
            this.goingThroughDoor = false;
            document.getElementById("header").style.visibility = "visible";
            document.getElementById("subMenu").style.visibility = "visible";
            //reexecutes the move that had the player attempt to get through the door
            this.executeMove(this.getLastMove());
        };
        //Called if the player doesn't have the name
        AncestorPresenter.prototype.leavePopup = function () {
            //Popup closed
            var popup = document.getElementById("imagePopup");
            popup.style.visibility = "hidden";
            //Canvas shown
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "visible";
            //sets the portrait photo to the loading gif (to give the photo time to load)
            var elementID = "Loading";
            var ancestorPicture = document.getElementById(elementID);
            document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
            this.goingThroughDoor = false;
            document.getElementById("header").style.visibility = "visible";
            document.getElementById("subMenu").style.visibility = "visible";
        };
        AncestorPresenter.prototype.enterPopup = function () {
            //Called at the very beginning when the player attempts to enter a door
            var popup = document.getElementById("imagePopup");
            //Finds the Ancestor Picture and sets the popup image to that image
            document.getElementById("doorAnswer").value = "";
            //popup set to visible
            popup.style.visibility = "visible";
            //canvas made invisible
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "hidden";
            //Sets the state flags
            this.goingThroughDoor = true;
            this.justEnteredName = false;
            document.getElementById("header").style.visibility = "hidden";
            document.getElementById("subMenu").style.visibility = "hidden";
        };
        AncestorPresenter.prototype.getLastMove = function () {
            return this.presenter.getLastMove();
        };
        //indirection to the abstract presenter's execute move method
        AncestorPresenter.prototype.executeMove = function (move) {
            if (!this.goingThroughDoor) {
                this.presenter.executeMove(move);
            }
        };
        AncestorPresenter.prototype.isInPopup = function () {
            return this.goingThroughDoor;
        };
        AncestorPresenter.prototype.setGender = function (gender) {
            this.presenter.setGender(gender);
        };
        return AncestorPresenter;
    })();
    Presenter.AncestorPresenter = AncestorPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=AncestorPresenter.js.map