/**
 * Created by phobos2390 on 5/2/15.
 */
///<reference path="../Presenter/IPresenter.ts"/>
///<reference path="../Model/ISpace.ts"/>
///<reference path="IView.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
var View;
(function (View) {
    var AncestorMapView = (function () {
        function AncestorMapView(presenter, viewHeight, viewWidth) {
            this.presenter = presenter;
            this.viewHeight = viewHeight;
            this.viewWidth = viewWidth;
            this.spaceHeight = 25;
            this.spaceWidth = 25;
            this.outOfMazeSpaceString = "OutOfMaze";
            this.unvisitedSpaceString = "MazeMist";
        }
        AncestorMapView.prototype.draw = function (model) {
            var canvas = document.getElementById("viewScreen");
            canvas.height = this.viewHeight * this.spaceHeight;
            canvas.width = this.viewWidth * this.spaceWidth;
            var ctx = canvas.getContext("2d");
            var playerSpace = model.getCurrentSpace();
            for (var i = 0; i < this.viewHeight; i++) {
                for (var j = 0; j < this.viewWidth; j++) {
                    var row = playerSpace.getX() + Math.ceil(i - this.viewHeight / 2);
                    var col = playerSpace.getY() + Math.ceil(j - this.viewWidth / 2);
                    var spriteWidth;
                    var spriteHeight;
                    var currSpace = model.getSpace(row, col);
                    var img;
                    if (currSpace != null) {
                        if (currSpace.seen()) {
                            if (currSpace.getSpaceObject().objectIsOfType("IDoor")) {
                                img = document.getElementById(currSpace.getSpaceObject().getSpaceType());
                                spriteWidth = img.width; //this.spaceWidth; //img.style.width;
                                spriteHeight = img.height; //this.spaceHeight; //img.style.height;
                            }
                            else {
                                img = document.getElementById(currSpace.getSpaceObject().getSpaceType());
                                spriteWidth = this.spaceWidth;
                                spriteHeight = this.spaceHeight;
                            }
                        }
                        else {
                            img = document.getElementById(this.unvisitedSpaceString);
                            spriteWidth = this.spaceWidth;
                            spriteHeight = this.spaceHeight;
                        }
                    }
                    else {
                        img = document.getElementById(this.outOfMazeSpaceString);
                        spriteWidth = this.spaceWidth;
                        spriteHeight = this.spaceHeight;
                    }
                    var imageStyle = window.getComputedStyle(img);
                    var leftStr = imageStyle.getPropertyValue("left");
                    var topStr = imageStyle.getPropertyValue("top");
                    var left = parseInt(leftStr.replace(/\D/g, ''));
                    var top = parseInt(topStr.replace(/\D/g, ''));
                    ctx.drawImage(img, left, top, spriteWidth, spriteHeight, j * this.spaceWidth, i * this.spaceHeight, this.spaceWidth, this.spaceHeight);
                }
            }
            var playerTexture = document.getElementById(this.presenter.getLastMove().getMoveString());
            var imageStyle = window.getComputedStyle(playerTexture);
            var leftStr = imageStyle.getPropertyValue("left");
            var topStr = imageStyle.getPropertyValue("top");
            var left = parseInt(leftStr.replace(/\D/g, ''));
            var top = parseInt(topStr.replace(/\D/g, ''));
            var centerX = this.spaceWidth * Math.floor(this.viewWidth / 2);
            var centerY = this.spaceHeight * Math.floor(this.viewHeight / 2);
            ctx.drawImage(playerTexture, left, top, this.spaceWidth, this.spaceHeight, centerX, centerY, this.spaceWidth, this.spaceHeight);
        };
        return AncestorMapView;
    })();
    View.AncestorMapView = AncestorMapView;
})(View || (View = {}));
//# sourceMappingURL=AncestorMapView.js.map