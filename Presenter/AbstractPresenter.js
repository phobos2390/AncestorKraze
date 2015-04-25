///<reference path="../Model/IModelObserver.ts"/>
///<reference path="../Model/IModelArgs.ts"/>
///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
///<reference path="../Model/IMove.ts"/>
///<reference path="../Model/IRequirement.ts"/>
/**
 * Created by phobos2390 on 4/24/15.
 */
var Presenter;
(function (Presenter) {
    var MapView = View.MapView;
    var AbstractPresenter = (function () {
        function AbstractPresenter(model) {
            this.model = model;
            this.view = new MapView(this, 15, 15);
            this.lastMove = null;
        }
        AbstractPresenter.prototype.update = function (model) {
            if (model.won()) {
                alert("YOU WON!");
            }
            if (model.mustRedraw()) {
                this.view.draw(model);
            }
            if (model.pickedUpNewKey()) {
                alert("New key: " + model.newKey().toString());
            }
        };
        AbstractPresenter.prototype.getLastMove = function () {
            return this.lastMove;
        };
        AbstractPresenter.prototype.executeMove = function (move) {
            this.lastMove = move;
            if (this.model.canMovePlayer(move)) {
                this.model.movePlayer(move);
            }
        };
        return AbstractPresenter;
    })();
    Presenter.AbstractPresenter = AbstractPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=AbstractPresenter.js.map