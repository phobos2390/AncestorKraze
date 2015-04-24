///<reference path="../Model/IModel.ts"/>
///<reference path="../View/MapView.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var Presenter;
(function (Presenter) {
    var MapView = View.MapView;
    var MapPresenter = (function () {
        function MapPresenter(model) {
            this.model = model;
            this.model.registerObserver(this);
            this.view = new MapView(this, 15, 15);
        }
        MapPresenter.prototype.update = function (model) {
            if (model.won()) {
                alert("YOU WON!");
            }
            if (model.mustRedraw()) {
                this.view.draw(model);
            }
            if (model.attemptedToGetInADoor()) {
                alert("Requirement: " + model.doorRequirement().toString());
            }
            if (model.pickedUpNewKey()) {
                alert("New key: " + model.newKey().toString());
            }
        };
        MapPresenter.prototype.getLastMove = function () {
            return this.lastMove;
        };
        MapPresenter.prototype.executeMove = function (move) {
            this.lastMove = move;
            if (this.model.canMovePlayer(move)) {
                this.model.movePlayer(move);
            }
        };
        return MapPresenter;
    })();
    Presenter.MapPresenter = MapPresenter;
})(Presenter || (Presenter = {}));
//# sourceMappingURL=MapPresenter.js.map