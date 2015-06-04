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
        AbstractPresenter.prototype.checkWon = function (model) {
            if (model.won()) {
                alert("YOU WON!");
            }
        };
        AbstractPresenter.prototype.checkRedraw = function (model) {
            this.view.draw(model);
        };
        AbstractPresenter.prototype.outputToLog = function (log) {
            var logElement = document.getElementById("log");
            logElement.value += log + "\n";
            //var logLine = document.createElement("li");
            //logLine.innerHTML = log;
            //logElement.appendChild(logLine);
        };
        AbstractPresenter.prototype.checkPickedUpKey = function (model) {
            if (model.pickedUpNewKey()) {
                this.outputToLog("Picked up a new key!!!!");
                model.getPlayer().addKey(model.newKey());
            }
        };
        AbstractPresenter.prototype.update = function (model) {
            this.checkWon(model);
            this.checkRedraw(model);
            this.checkPickedUpKey(model);
        };
        AbstractPresenter.prototype.getLastMove = function () {
            return this.lastMove;
        };
        AbstractPresenter.prototype.executeMove = function (move) {
            this.lastMove = move;
            if (this.model.canMovePlayer(move)) {
                this.model.movePlayer(move);
            }
            else {
                this.model.update();
            }
        };
        AbstractPresenter.prototype.setGender = function (gender) {
            this.view.setGender(gender);
        };
        return AbstractPresenter;
    })();
    Presenter.AbstractPresenter = AbstractPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=AbstractPresenter.js.map