///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
/**
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
        return StandardPresenter;
    })();
    Presenter.StandardPresenter = StandardPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=StandardPresenter.js.map