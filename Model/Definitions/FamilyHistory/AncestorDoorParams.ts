///<reference path="../../IModelFactory.ts"/>
///<reference path="../../IDoorParams.ts"/>
///<reference path="../../IRequirementParams.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.FamilyHistory
{
    export class AncestorDoorParams implements IDoorParams
    {
        private ancestorName:string;
        private factory:IModelFactory;
        private params:IRequirementParams;

        public constructor(ancestorName:string)
        {
            this.factory = new AncestorFactory();
            this.ancestorName = ancestorName;
            this.params = this.factory.createRequirementParams(this.ancestorName);
        }

        public getRequirement():IRequirement
        {
            return this.factory.createRequirement(this.params);
        }
    }
}