///<reference path="../Presenter/IPresenter.ts"/>
///<reference path="../Model/ISpace.ts"/>
///<reference path="IView.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var View;
(function (View) {
    var MapView = (function () {
        function MapView(presenter, viewHeight, viewWidth) {
            this.presenter = presenter;
            this.viewHeight = viewHeight;
            this.viewWidth = viewWidth;
            this.blankSpaceString = "OutOfMaze";
            this.unvisitedSpaceString = "MazeMist";
            var sprite = document.getElementById(this.unvisitedSpaceString);
            var style = window.getComputedStyle(sprite);
            this.spaceHeight = parseInt(style.height.replace(/\D/g, ''));
            this.spaceWidth = parseInt(style.width.replace(/\D/g, ''));
        }
        MapView.prototype.draw = function (model) {
            var canvas = document.getElementById("viewScreen");
            canvas.height = this.viewHeight * this.spaceHeight;
            canvas.width = this.viewWidth * this.spaceWidth;
            var ctx = canvas.getContext("2d");
            var playerSpace = model.getCurrentSpace();
            for (var i = 0; i < this.viewHeight; i++) {
                for (var j = 0; j < this.viewWidth; j++) {
                    var row = playerSpace.getX() + Math.ceil(i - this.viewHeight / 2);
                    var col = playerSpace.getY() + Math.ceil(j - this.viewWidth / 2);
                    var currSpace = model.getSpace(row, col);
                    var img;
                    if (currSpace != null) {
                        if (currSpace.seen()) {
                            img = document.getElementById(currSpace.getSpaceObject().getSpaceType());
                        }
                        else {
                            img = document.getElementById(this.unvisitedSpaceString);
                        }
                    }
                    else {
                        img = document.getElementById(this.blankSpaceString);
                    }
                    var imageStyle = window.getComputedStyle(img);
                    var leftStr = imageStyle.getPropertyValue("left");
                    var topStr = imageStyle.getPropertyValue("top");
                    var left = parseInt(leftStr.replace(/\D/g, '')) * this.spaceWidth;
                    var top = parseInt(topStr.replace(/\D/g, '')) * this.spaceHeight;
                    ctx.drawImage(img, left, top, this.spaceWidth, this.spaceHeight, j * this.spaceWidth, i * this.spaceHeight, this.spaceWidth, this.spaceHeight);
                }
            }
            var playerTexture = document.getElementById(this.gender + this.presenter.getLastMove().getMoveString());
            var imageStyle = window.getComputedStyle(playerTexture);
            var leftStr = imageStyle.getPropertyValue("left");
            var topStr = imageStyle.getPropertyValue("top");
            var left = parseInt(leftStr.replace(/\D/g, '')) * this.spaceWidth;
            var top = parseInt(topStr.replace(/\D/g, '')) * this.spaceHeight;
            var centerX = this.spaceWidth * Math.floor(this.viewWidth / 2);
            var centerY = this.spaceHeight * Math.floor(this.viewHeight / 2);
            ctx.drawImage(playerTexture, left, top, this.spaceWidth, this.spaceHeight, centerX, centerY, this.spaceWidth, this.spaceHeight);
            var keys = document.getElementById("keyNumber");
            keys.textContent = model.getPlayer().numberOfKeys().toString();
        };
        MapView.prototype.setGender = function (gender) {
            this.gender = gender;
        };
        return MapView;
    })();
    View.MapView = MapView;
})(View || (View = {}));
//# sourceMappingURL=MapView.js.map