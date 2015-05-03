///<reference path="../../IRequirement.ts"/>
///<reference path="../../IModelFactory.ts"/>
/**
 * Created by phobos2390 on 3/24/15.
 */
module Model.Definitions.FamilyHistory
{
    export class AncestorNameRequirement implements IRequirement
    {
        private ancestorName:string;
        private factory:IModelFactory;

        public constructor(ancestorName:string,factory:IModelFactory)
        {
            this.ancestorName = ancestorName;
            this.factory = factory;
        }

        public playerFulfillsRequirement(player:IPlayer):boolean
        {
            return player.hasKey(this.factory.createKey(this.factory.createKeyParams(this.ancestorName)));
        }

        public toString():string
        {
            return this.ancestorName;
        }
    }
}