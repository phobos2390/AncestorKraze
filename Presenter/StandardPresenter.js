///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
/**
 * Entering point for the MVP architecture. Interacts with both Model and View.
 * Model
 *   |
 * Presenter - KrazeClient
 *   |
 * View
 * FOR THE STANDARD VERSION OF THE GAME
 * Created by phobos2390 on 3/24/15.
 */
var Presenter;
(function (Presenter) {
    var MapView = View.MapView;
    var AbstractPresenter = Presenter.AbstractPresenter;
    var StandardPresenter = (function () {
        function StandardPresenter(model) {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model, new MapView(this, 15, 15));
        }
        //Exactly the same as the Abstract Presenter
        StandardPresenter.prototype.update = function (model) {
            if (model.attemptedToGetInADoor()) {
            }
            this.presenter.update(model);
        };
        StandardPresenter.prototype.getLastMove = function () {
            return this.presenter.getLastMove();
        };
        StandardPresenter.prototype.executeMove = function (move) {
            this.presenter.executeMove(move);
        };
        StandardPresenter.prototype.isInPopup = function () {
            return false;
        };
        StandardPresenter.prototype.setGender = function (gender) {
            this.presenter.setGender(gender);
        };
        return StandardPresenter;
    })();
    Presenter.StandardPresenter = StandardPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=StandardPresenter.js.map