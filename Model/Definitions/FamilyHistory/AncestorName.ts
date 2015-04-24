///<reference path="../../IKey.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.FamilyHistory
{
    export class AncestorName implements IKey
    {
        private name:string;

        public constructor(name:string)
        {
            this.name = name;
        }

        public canEnterSpace():boolean
        {
            return true;
        }

        public getSpaceType():string
        {
            return "IKey";
        }

        public objectIsOfType(type:string):boolean
        {
            return true;
        }
    }
}