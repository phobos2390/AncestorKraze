///<reference path="../../ISpaceObject.ts"/>
/**
 * Created by phobos2390 on 4/21/15.
 */

module Model.Definitions.Standard
{
    import ISpaceObject = Model.ISpaceObject;

    export class StandardEmptySpace implements ISpaceObject
    {
        private type:string;

        public constructor()
        {
            this.type = "BlankSpace";
        }
        public canEnterSpace():boolean
        {
            return true;
        }

        public getSpaceType():string
        {
            return this.type;
        }

        public objectIsOfType(type:string):boolean
        {
            return this.type.valueOf() == type.valueOf();
        }
    }
}