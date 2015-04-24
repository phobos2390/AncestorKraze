///<reference path="../../IMove.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.Standard
{
    export class StandardMove implements IMove
    {
        private deltaX:number;
        private deltaY:number;
        private moveDirection:string;
        private directions;

        public constructor(deltaX:number,deltaY:number)
        {
            this.deltaX = deltaX;
            this.deltaY = deltaY;
            this.directions =
            [
                "up",//1,0->2      0
                "left",//0,-1->-1 1
                "none",//0,0->0   2
                "right",//0,1->1  3
                "down"//-1,0->-2 4
            ];
            var arrIndexTransform:number = this.getDXY()+2;
            this.moveDirection = this.directions[arrIndexTransform];
        }

        public getDeltaX():number
        {
            return this.deltaX;
        }

        public getDeltaY():number
        {
            return this.deltaY;
        }

        public getDXY():number
        {
            return this.deltaX *2 + this.deltaY;
        }

        public getMoveString():string
        {
            return this.moveDirection;
        }
    }
}