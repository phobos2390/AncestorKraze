/**
 * Created by phobos2390 on 5/2/15.
 */
///<reference path="../Presenter/IPresenter.ts"/>
///<reference path="../Model/ISpace.ts"/>
///<reference path="IView.ts"/>
/**
 * Draws the tiled map on the html canvas as well as the player. Used for Ancestor Face/Name pair Game.
 * Created by phobos2390 on 3/24/15.
 */
var View;
(function (View) {
    var AncestorMapView = (function () {
        function AncestorMapView(presenter, viewHeight, viewWidth) {
            //Dependent on IPresenter as an exterior class.
            this.presenter = presenter;
            //Determines the size of the Canvas that is drawn
            this.viewHeight = viewHeight;
            this.viewWidth = viewWidth;
            //The id for the sprites found in the html document that either aren't seen or
            // beyond the bounds of the Maze
            this.outOfMazeSpaceString = "OutOfMaze";
            this.unvisitedSpaceString = "MazeMist";
            //Programmatically determines the size of any individual tile
            var sprite = document.getElementById(this.unvisitedSpaceString);
            var style = window.getComputedStyle(sprite);
            this.spaceHeight = parseInt(style.height.replace(/\D/g, ''));
            this.spaceWidth = parseInt(style.width.replace(/\D/g, ''));
            this.gender = "f";
        }
        //Draws the map based on the passed in model arguments
        AncestorMapView.prototype.draw = function (model) {
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
                    var spriteWidth;
                    var spriteHeight;
                    var currSpace = model.getSpace(row, col);
                    var img;
                    // only null if the row and column are outside the model's bounds
                    if (currSpace != null) {
                        // determines if the space has been revealed and only shows those spaces that have been seen
                        if (currSpace.seen()) {
                            if (currSpace.getSpaceObject().objectIsOfType("IDoor")) {
                                //Gets the image of the tag (EG id=FirstLast src=http:/familysearch.org/name)
                                //Draws the door as that person's portrait
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
                    //gets the size of the image as well as the points on the sprite sheet
                    var imageStyle = window.getComputedStyle(img);
                    //The left and the top are cell values and not the pixel values
                    // leftStr:1px with spaceWidth:25 -> left:25
                    var leftStr = imageStyle.getPropertyValue("left");
                    var topStr = imageStyle.getPropertyValue("top");
                    var left = parseInt(leftStr.replace(/\D/g, '')) * this.spaceWidth;
                    var top = parseInt(topStr.replace(/\D/g, '')) * this.spaceHeight;
                    //Draws the image
                    //(left,top) is the pixel on the spritesheet
                    // spriteWidth x spriteHeight are the dimensions of the space to be retreived from the spritesheet
                    //    OR from the dimensions of the ancestor's picture
                    // (j*this.spaceWidth,i*this.spaceHeight) is the pixel location on the canvas
                    // spaceWidth x spaceHeight are the dimensions of the space to be drawn on the canvas
                    ctx.drawImage(img, left, top, spriteWidth, spriteHeight, j * this.spaceWidth, i * this.spaceHeight, this.spaceWidth, this.spaceHeight);
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
        };
        //sets the gender of the player sprite
        AncestorMapView.prototype.setGender = function (gender) {
            this.gender = gender;
        };
        return AncestorMapView;
    })();
    View.AncestorMapView = AncestorMapView;
})(View || (View = {}));
//# sourceMappingURL=AncestorMapView.js.map