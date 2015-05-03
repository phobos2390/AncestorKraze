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

    export class MapView implements IView
    {
        private presenter:IPresenter;
        private viewHeight:number;
        private viewWidth:number;
        private spaceHeight:number;
        private spaceWidth:number;
        private blankSpaceString:string;

        public constructor(presenter:IPresenter,viewHeight:number,viewWidth:number)
        {
            this.presenter = presenter;
            this.viewHeight = viewHeight;
            this.viewWidth = viewWidth;
            this.spaceHeight = 25;
            this.spaceWidth = 25;
            this.blankSpaceString = "BlankSpace"
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
                    var currSpace:ISpace = model.getSpace(row,col);
                    var img;
                    if(currSpace != null)
                    {
                        img = document.getElementById(currSpace.getSpaceObject().getSpaceType());
                    }
                    else
                    {
                        img = document.getElementById(this.blankSpaceString);
                    }
                    var imageStyle = window.getComputedStyle(img);
                    var leftStr = imageStyle.getPropertyValue("left");
                    var topStr = imageStyle.getPropertyValue("top");
                    var left = parseInt(leftStr.replace(/\D/g,''));
                    var top = parseInt(topStr.replace(/\D/g,''));
                    ctx.drawImage(img,left,top,this.spaceWidth,this.spaceHeight,j*this.spaceWidth,i*this.spaceHeight,this.spaceWidth,this.spaceHeight);
                }
            }
            var playerTexture = document.getElementById(this.presenter.getLastMove().getMoveString());
            var imageStyle = window.getComputedStyle(playerTexture);
            var leftStr = imageStyle.getPropertyValue("left");
            var topStr = imageStyle.getPropertyValue("top");
            var left = parseInt(leftStr.replace(/\D/g,''));
            var top = parseInt(topStr.replace(/\D/g,''));
            var centerX:number = this.spaceWidth*Math.floor(this.viewWidth/2);
            var centerY:number = this.spaceHeight*Math.floor(this.viewHeight/2);
            ctx.drawImage(playerTexture,left,top,this.spaceWidth,this.spaceHeight,centerX,centerY,this.spaceWidth,this.spaceHeight);
            var keys = document.getElementById("keyNumber");
            keys.textContent = model.getPlayer().numberOfKeys().toString();
        }
    }
}