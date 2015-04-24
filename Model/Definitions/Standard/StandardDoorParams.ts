///<reference path="StandardRequirementParams.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    import IDoorParams = Model.IDoorParams;
    import IModelFactory = Model.IModelFactory;
    import IRequirementParams = Model.IRequirementParams;
    import StandardFactory = Model.Definitions.Standard.StandardFactory;
    import StandardRequirementParams = Model.Definitions.Standard.StandardRequirementParams;

    export class StandardDoorParams implements IDoorParams
    {
        private numberOfKeys:number;
        private factory:IModelFactory;
        private params:IRequirementParams;

        public constructor(numberOfKeys:number,factory:IModelFactory)
        {
            this.numberOfKeys = numberOfKeys;
            this.factory = factory;
            this.params = this.factory.createRequirementParams(this.numberOfKeys);
        }

        public getRequirement():IRequirement
        {
            return this.factory.createRequirement(this.params);
        }
    }
}