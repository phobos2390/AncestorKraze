///<reference path="../../IKeyParams.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */
module Model.Definitions.FamilyHistory
{
    export class AncestorNameParams implements IKeyParams
    {
        private name:string;

        public constructor(name:string)
        {
            this.name = name;
        }

        public getName():string
        {
            return this.name;
        }
    }
}