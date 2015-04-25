///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="IPresenter.ts"/>
///<reference path="AbstractPresenter.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Presenter;
(function (Presenter) {
    var AbstractPresenter = Presenter.AbstractPresenter;
    var StandardPresenter = (function () {
        function StandardPresenter(model) {
            model.registerObserver(this);
            this.presenter = new AbstractPresenter(model);
        }
        StandardPresenter.prototype.update = function (model) {
            if (model.attemptedToGetInADoor()) {
                alert("Requirement: " + model.doorRequirement().toString());
            }
            this.presenter.update(model);
        };
        StandardPresenter.prototype.getLastMove = function () {
            return this.presenter.getLastMove();
        };
        StandardPresenter.prototype.executeMove = function (move) {
            this.presenter.executeMove(move);
        };
        return StandardPresenter;
    })();
    Presenter.StandardPresenter = StandardPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=StandardPresenter.js.map