///<reference path="../Presenter/IPresenter.ts"/>
///<reference path="../Model/ISpace.ts"/>
///<reference path="IView.ts"/>
/**
 * Draws the tiled map on the html canvas as well as the player. Used for Standard Game.
 * Created by phobos2390 on 3/24/15.
 */
var View;
(function (View) {
    var MapView = (function () {
        function MapView(presenter, viewHeight, viewWidth) {
            //Dependent on IPresenter as an exterior class.
            this.presenter = presenter;
            //Determines the size of the Canvas that is drawn
            this.viewHeight = viewHeight;
            this.viewWidth = viewWidth;
            //The id for the sprites found in the html document that either aren't seen or
            // beyond the bounds of the Maze
            this.blankSpaceString = "OutOfMaze";
            this.unvisitedSpaceString = "MazeMist";
            //Programmatically determines the size of any individual tile
            var sprite = document.getElementById(this.unvisitedSpaceString);
            var style = window.getComputedStyle(sprite);
            this.spaceHeight = parseInt(style.height.replace(/\D/g, ''));
            this.spaceWidth = parseInt(style.width.replace(/\D/g, ''));
        }
        //Draws the map based on the passed in model arguments
        MapView.prototype.draw = function (model) {
            //gets the canvas and sets it to the correct dimensions
            var canvas = document.getElementById("viewScreen");
            canvas.height = this.viewHeight * this.spaceHeight;
            canvas.width = this.viewWidth * this.spaceWidth;
            var ctx = canvas.getContext("2d");
            var playerSpace = model.getCurrentSpace();
            //draws all of the tiles on the canvas that are within the viewing area
            for (var i = 0; i < this.viewHeight; i++) {
                for (var j = 0; j < this.viewWidth; j++) {
                    //Determines the row and column in the model that will be shown
                    var row = playerSpace.getX() + Math.ceil(i - this.viewHeight / 2);
                    var col = playerSpace.getY() + Math.ceil(j - this.viewWidth / 2);
                    var currSpace = model.getSpace(row, col);
                    var img;
                    // only null if the row and column are outside the model's bounds
                    if (currSpace != null) {
                        // determines if the space has been revealed and only shows those spaces that have been seen
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
                    //gets the size of the image as well as the points on the sprite sheet
                    var imageStyle = window.getComputedStyle(img);
                    var leftStr = imageStyle.getPropertyValue("left");
                    var topStr = imageStyle.getPropertyValue("top");
                    //The left and the top are cell values and not the pixel values
                    // leftStr:1px with spaceWidth:25 -> left:25
                    var left = parseInt(leftStr.replace(/\D/g, '')) * this.spaceWidth;
                    var top = parseInt(topStr.replace(/\D/g, '')) * this.spaceHeight;
                    //Draws the image
                    //(left,top) is the pixel on the spritesheet
                    // spaceWidth x spaceHeight are the dimensions of the space to be retreived from the spritesheet
                    // (j*this.spaceWidth,i*this.spaceHeight) is the pixel location on the canvas
                    // the second spaceWidth x spaceHeight are the dimensions of the space to be drawn on the canvas
                    ctx.drawImage(img, left, top, this.spaceWidth, this.spaceHeight, j * this.spaceWidth, i * this.spaceHeight, this.spaceWidth, this.spaceHeight);
                }
            }
            //retrieves the player texture based on the last keyed move
            var playerTexture = document.getElementById(this.gender + this.presenter.getLastMove().getMoveString());
            var imageStyle = window.getComputedStyle(playerTexture);
            var leftStr = imageStyle.getPropertyValue("left");
            var topStr = imageStyle.getPropertyValue("top");
            //cell values like what was above
            var left = parseInt(leftStr.replace(/\D/g, '')) * this.spaceWidth;
            var top = parseInt(topStr.replace(/\D/g, '')) * this.spaceHeight;
            //computes the central cell. The player is in that center space
            var centerX = this.spaceWidth * Math.floor(this.viewWidth / 2);
            var centerY = this.spaceHeight * Math.floor(this.viewHeight / 2);
            //draws the player image. Similar to what is shown above
            ctx.drawImage(playerTexture, left, top, this.spaceWidth, this.spaceHeight, centerX, centerY, this.spaceWidth, this.spaceHeight);
            //writes the number of keys retrieved. ONLY FOR THE STANDARD VERSION
            var keys = document.getElementById("keyNumber");
            keys.textContent = model.getPlayer().numberOfKeys().toString();
        };
        //sets the gender of the player sprite
        MapView.prototype.setGender = function (gender) {
            this.gender = gender;
        };
        return MapView;
    })();
    View.MapView = MapView;
})(View || (View = {}));
//# sourceMappingURL=MapView.js.map