///<reference path="../../IKey.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    export class StandardKey implements IKey
    {
        private keyString:string;

        public constructor()
        {
            this.keyString = "IKey";
        }

        public canEnterSpace():boolean
        {
            return true;
        }

        public getSpaceType():string
        {
            return this.keyString;
        }

        public objectIsOfType(type:string):boolean
        {
            return this.keyString.valueOf() == type.valueOf();
        }

        public toString():string
        {
            return this.keyString;
        }
    }
}