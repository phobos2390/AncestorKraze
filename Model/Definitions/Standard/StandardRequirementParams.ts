/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    export class StandardRequirementParams
    {
        private numberOfKeys:number;

        public constructor(numberOfKeys:number)
        {
            this.numberOfKeys = numberOfKeys;
        }

        public getNumberOfKeys():number
        {
            return this.numberOfKeys;
        }
    }
}