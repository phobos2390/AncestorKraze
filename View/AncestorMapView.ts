/**
 * Created by phobos2390 on 5/2/15.
 */

///<reference path="../Presenter/IPresenter.ts"/>
///<reference path="../Model/ISpace.ts"/>
///<reference path="IView.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */

module View
{
    import IModelArgs = Model.IModelArgs;
    import ISpace = Model.ISpace;
    import IPresenter = Presenter.IPresenter;

    export class AncestorMapView implements IView
    {
        private presenter:IPresenter;
        private viewHeight:number;
        private viewWidth:number;
        private spaceHeight:number;
        private spaceWidth:number;
        private outOfMazeSpaceString:string;
        private unvisitedSpaceString:string;
        private gender:string;

        public constructor(presenter:IPresenter,viewHeight:number,viewWidth:number)
        {
            this.presenter = presenter;
            this.viewHeight = viewHeight;
            this.viewWidth = viewWidth;
            this.outOfMazeSpaceString = "OutOfMaze";
            this.unvisitedSpaceString = "MazeMist";
            var sprite = document.getElementById(this.unvisitedSpaceString);
            var style = window.getComputedStyle(sprite);
            this.spaceHeight = parseInt(style.height.replace(/\D/g,''));
            this.spaceWidth = parseInt(style.width.replace(/\D/g,''));
            this.gender = "f";
        }

        public draw(model:IModelArgs):void
        {
            var canvas = <HTMLCanvasElement>document.getElementById("viewScreen");
            canvas.height = this.viewHeight*this.spaceHeight;
            canvas.width = this.viewWidth*this.spaceWidth;
            var ctx = canvas.getContext("2d");
            var playerSpace:ISpace = model.getCurrentSpace();
            for(var i:number = 0; i < this.viewHeight; i++)
            {
                for(var j:number = 0; j < this.viewWidth; j++)
                {
                    var row:number = playerSpace.getX() + Math.ceil(i - this.viewHeight/2);
                    var col:number = playerSpace.getY() + Math.ceil(j - this.viewWidth/2);
                    var spriteWidth:number;
                    var spriteHeight:number;
                    var currSpace:ISpace = model.getSpace(row,col);
                    var img;
                    if(currSpace != null)
                    {
                        if(currSpace.seen())
                        {
                            if(currSpace.getSpaceObject().objectIsOfType("IDoor"))
                            {
                                img = document.getElementById(currSpace.getSpaceObject().getSpaceType());
                                spriteWidth = img.width;//this.spaceWidth; //img.style.width;
                                spriteHeight = img.height;//this.spaceHeight; //img.style.height;
                            }
                            else
                            {
                                img = document.getElementById(currSpace.getSpaceObject().getSpaceType());
                                spriteWidth = this.spaceWidth;
                                spriteHeight = this.spaceHeight;
                            }
                        }
                        else
                        {
                            img = document.getElementById(this.unvisitedSpaceString);
                            spriteWidth = this.spaceWidth;
                            spriteHeight = this.spaceHeight;
                        }
                    }
                    else
                    {
                        img = document.getElementById(this.outOfMazeSpaceString);
                        spriteWidth = this.spaceWidth;
                        spriteHeight = this.spaceHeight;
                    }
                    var imageStyle = window.getComputedStyle(img);
                    var leftStr = imageStyle.getPropertyValue("left");
                    var topStr = imageStyle.getPropertyValue("top");
                    var left = parseInt(leftStr.replace(/\D/g,''))*this.spaceWidth;
                    var top = parseInt(topStr.replace(/\D/g,''))*this.spaceHeight;
                    ctx.drawImage(  img,
                                    left,
                                    top,
                                    spriteWidth,
                                    spriteHeight,
                                    j*this.spaceWidth,
                                    i*this.spaceHeight,
                                    this.spaceWidth,
                                    this.spaceHeight);
                }
            }
            var playerTexture = document.getElementById(this.gender + this.presenter.getLastMove().getMoveString());
            var imageStyle = window.getComputedStyle(playerTexture);
            var leftStr = imageStyle.getPropertyValue("left");
            var topStr = imageStyle.getPropertyValue("top");
            var left = parseInt(leftStr.replace(/\D/g,''))*this.spaceWidth;
            var top = parseInt(topStr.replace(/\D/g,''))*this.spaceHeight;
            var centerX:number = this.spaceWidth*Math.floor(this.viewWidth/2);
            var centerY:number = this.spaceHeight*Math.floor(this.viewHeight/2);
            ctx.drawImage(playerTexture,left,top,this.spaceWidth,this.spaceHeight,centerX,centerY,this.spaceWidth,this.spaceHeight);
        }

        public setGender(gender:string):void
        {
            this.gender = gender;
        }
    }
}