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
var Presenter;
(function (Presenter) {
    var AbstractPresenter = (function () {
        function AbstractPresenter(model, view) {
            this.model = model;
            this.view = view;
            this.lastMove = null;
        }
        AbstractPresenter.prototype.getView = function () {
            return this.view;
        };
        //Checks to see if the won event is set
        AbstractPresenter.prototype.checkWon = function (model) {
            if (model.won()) {
                alert("YOU WON!");
            }
        };
        //redraws the model
        AbstractPresenter.prototype.checkRedraw = function (model) {
            this.view.draw(model);
        };
        //Outputs the current string to the log.
        AbstractPresenter.prototype.outputToLog = function (log) {
            var logElement = document.getElementById("log");
            logElement.value += log + "\n";
            logElement.scrollTop = logElement.scrollHeight;
        };
        //Checks to see if the player just picked up a key. (Key event)
        AbstractPresenter.prototype.checkPickedUpKey = function (model) {
            if (model.pickedUpNewKey()) {
                this.outputToLog("Picked up a new key!");
                model.getPlayer().addKey(model.newKey());
            }
        };
        //Checks all of the current events for the presenter
        AbstractPresenter.prototype.update = function (model) {
            this.checkWon(model);
            this.checkRedraw(model);
            this.checkPickedUpKey(model);
        };
        //retrieves the last keyed move
        AbstractPresenter.prototype.getLastMove = function () {
            return this.lastMove;
        };
        //moves the player
        AbstractPresenter.prototype.executeMove = function (move) {
            this.lastMove = move;
            if (this.model.canMovePlayer(move)) {
                this.model.movePlayer(move);
            }
            else {
                this.model.update();
            }
        };
        //Sets the value of the gender
        AbstractPresenter.prototype.setGender = function (gender) {
            this.view.setGender(gender);
        };
        return AbstractPresenter;
    })();
    Presenter.AbstractPresenter = AbstractPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=AbstractPresenter.js.map