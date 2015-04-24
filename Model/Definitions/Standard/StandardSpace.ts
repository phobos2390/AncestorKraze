///<reference path="../../ISpace.ts"/>
///<reference path="../../ISpaceObject.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    import ISpace = Model.ISpace;
    import ISpaceObject = Model.ISpaceObject;
    import StandardEmptySpace = Model.Definitions.Standard.StandardEmptySpace;

    export class StandardSpace implements ISpace
    {
        private x:number;
        private y:number;
        private spaceObject:ISpaceObject;

        public constructor(x:number, y:number)
        {
            this.x = x;
            this.y = y;
            this.spaceObject = new StandardEmptySpace();
        }

        public getX():number
        {
            return this.x;
        }

        public getY():number
        {
            return this.y;
        }

        public setSpaceObject(spaceObject:ISpaceObject):void
        {
            this.spaceObject = spaceObject;
        }

        public getSpaceObject():ISpaceObject
        {
            return this.spaceObject;
        }

        public canEnterSpace():boolean
        {
            return this.spaceObject.canEnterSpace();
        }

        public toString():string
        {
            return "(" + this.getX() + "," + this.getY() + ")";
        }
    }
}