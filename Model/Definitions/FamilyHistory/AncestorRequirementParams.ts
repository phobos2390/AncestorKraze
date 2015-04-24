///<reference path="../../IRequirementParams.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */

module Model.Definitions.FamilyHistory
{
    export class AncestorRequirementParams implements IRequirementParams
    {
        private name:string;

        public constructor(name:string)
        {
            this.name = name;
        }

        public getAncestorNameParams():string
        {
            return this.name;
        }
    }
}