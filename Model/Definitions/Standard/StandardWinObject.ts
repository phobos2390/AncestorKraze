///<reference path="../../ISpaceObject.ts"/>
///<reference path="../../IWinSpaceObject.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.Standard
{
    export class StandardWinObject implements IWinSpaceObject
    {
        private winString:string;

        public constructor()
        {
            this.winString = "IWinSpaceObject";
        }

        public canEnterSpace():boolean
        {
            return true;
        }

        public getSpaceType():string
        {
            return this.winString;
        }

        public objectIsOfType(type:string):boolean
        {
            return this.winString.valueOf() == type.valueOf();
        }
    }
}