///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
///<reference path="../View/AncestorMapView.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Presenter;
(function (Presenter) {
    var AncestorMapView = View.AncestorMapView;
    var AbstractPresenter = Presenter.AbstractPresenter;
    var AncestorPresenter = (function () {
        function AncestorPresenter(model) {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model, new AncestorMapView(this, 15, 15));
            this.pickedUpKeys = [];
            this.justEnteredName = false;
            this.goingThroughDoor = false;
        }
        AncestorPresenter.prototype.hasKey = function (name) {
            for (var i = 0; i < this.pickedUpKeys.length; i++) {
                if (this.pickedUpKeys[i].toString().valueOf() == name.valueOf()) {
                    return true;
                }
            }
            return false;
        };
        AncestorPresenter.prototype.getKey = function (name) {
            for (var i = 0; i < this.pickedUpKeys.length; i++) {
                if (this.pickedUpKeys[i].toString().valueOf() == name.valueOf()) {
                    return this.pickedUpKeys[i];
                }
            }
            return null;
        };
        AncestorPresenter.prototype.update = function (model) {
            if (model.attemptedToGetInADoor()) {
                if (model.doorRequirement().playerFulfillsRequirement(model.getPlayer())) {
                    var popup = document.getElementById("imagePopup");
                    popup.style.visibility = "hidden";
                }
                else if (this.justEnteredName) {
                    this.justEnteredName = false;
                    var playerHasKey = this.hasKey(this.lastEnteredName);
                    var key = this.getKey(this.lastEnteredName);
                    if (playerHasKey) {
                        model.getPlayer().addKey(key);
                        this.executeMove(this.getLastMove());
                    }
                }
                else {
                    var popup = document.getElementById("imagePopup");
                    var elementID = model.doorRequirement().toString().replace(/ /g, '');
                    var ancestorPicture = document.getElementById(elementID);
                    var src = document.getElementById("ancestorPicture").setAttribute("src", ancestorPicture.getAttribute("src"));
                    popup.style.visibility = "visible";
                    this.goingThroughDoor = true;
                    this.justEnteredName = false;
                }
            }
            if (model.pickedUpNewKey()) {
                this.presenter.outputToLog("The slip of paper says: " + model.newKey().toString());
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
            this.goingThroughDoor = false;
            this.executeMove(this.getLastMove());
        };
        AncestorPresenter.prototype.getLastMove = function () {
            return this.presenter.getLastMove();
        };
        AncestorPresenter.prototype.executeMove = function (move) {
            if (!this.goingThroughDoor) {
                this.presenter.executeMove(move);
            }
        };
        return AncestorPresenter;
    })();
    Presenter.AncestorPresenter = AncestorPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=AncestorPresenter.js.map