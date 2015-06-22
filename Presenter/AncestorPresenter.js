///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
///<reference path="../View/AncestorMapView.ts"/>
///<reference path="../Model/ModelFacade.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Presenter;
(function (Presenter) {
    var AncestorMapView = View.AncestorMapView;
    var AbstractPresenter = Presenter.AbstractPresenter;
    var AncestorPresenter = (function () {
        function AncestorPresenter(model, factory) {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model, new AncestorMapView(this, 15, 15));
            this.pickedUpKeys = [];
            this.justEnteredName = false;
            this.goingThroughDoor = false;
            this.factory = factory;
        }
        AncestorPresenter.prototype.getKey = function (name) {
            return this.factory.createKey(this.factory.createKeyParams(name));
        };
        AncestorPresenter.prototype.update = function (model) {
            if (model.attemptedToGetInADoor()) {
                if (model.doorRequirement().playerFulfillsRequirement(model.getPlayer())) {
                    var popup = document.getElementById("imagePopup");
                    popup.style.visibility = "hidden";
                    var canvas = document.getElementById("canvas-container");
                    canvas.style.visibility = "visible";
                    var elementID = "Loading";
                    var ancestorPicture = document.getElementById(elementID);
                    document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
                }
                else if (this.justEnteredName) {
                    this.justEnteredName = false;
                    var key = this.getKey(this.lastEnteredName);
                    model.getPlayer().addKey(key);
                }
                else {
                    var popup = document.getElementById("imagePopup");
                    var elementID = model.doorRequirement().toString().replace(/ /g, '');
                    var ancestorPicture = document.getElementById(elementID);
                    document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
                    document.getElementById("doorAnswer").value = "";
                    popup.style.visibility = "visible";
                    var canvas = document.getElementById("canvas-container");
                    canvas.style.visibility = "hidden";
                    this.goingThroughDoor = true;
                    this.justEnteredName = false;
                }
            }
            if (model.pickedUpNewKey()) {
                this.presenter.outputToLog("The slip of paper says: " + model.newKey().toString());
                model.getPlayer().addKey(model.newKey());
                this.pickedUpKeys.push(model.newKey());
            }
            this.presenter.checkWon(model);
            this.presenter.checkRedraw(model);
        };
        AncestorPresenter.prototype.enterName = function (name) {
            this.lastEnteredName = name;
            this.justEnteredName = true;
            var popup = document.getElementById("imagePopup");
            popup.style.visibility = "hidden";
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "visible";
            this.goingThroughDoor = false;
            this.executeMove(this.getLastMove());
        };
        AncestorPresenter.prototype.leavePopup = function () {
            var popup = document.getElementById("imagePopup");
            popup.style.visibility = "hidden";
            var canvas = document.getElementById("canvas-container");
            canvas.style.visibility = "visible";
            this.goingThroughDoor = false;
            var elementID = "Loading";
            var ancestorPicture = document.getElementById(elementID);
            document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
        };
        AncestorPresenter.prototype.getLastMove = function () {
            return this.presenter.getLastMove();
        };
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