///<reference path="../../IWallObject.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.Standard
{
    export class StandardWall implements IWallObject
    {
        private wallString:string;

        public constructor()
        {
            this.wallString = "IWallObject";
        }

        public canEnterSpace():boolean
        {
            return false;
        }

        public getSpaceType():string
        {
            return this.wallString;
        }

        public objectIsOfType(type:string):boolean
        {
            return this.wallString.valueOf() == type.valueOf();
        }
    }
}