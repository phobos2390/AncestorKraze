///<reference path="../../IRequirement.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.FamilyHistory
{
    export class AncestorNameRequirement implements IRequirement
    {
        private ancestorName:string;

        public constructor(ancestorName:string)
        {
            this.ancestorName = ancestorName;
        }

        public playerFulfillsRequirement(player:IPlayer):boolean
        {
            var gottenName:string = "";
            return this.ancestorName == gottenName;
        }
    }
}