///<reference path="../../IRequirement.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    export class StandardPlayer implements IPlayer
    {
        private keys:number;

        public constructor()
        {
            this.keys = 0;
        }

        public fulfillsRequirement(requirement:IRequirement):boolean
        {
            return requirement.playerFulfillsRequirement(this);
        }

        public addKey(key:IKey):void
        {
            this.keys++;
        }

        public hasKey(key:IKey):boolean
        {
            return true;
        }

        public numberOfKeys():number
        {
            return this.keys;
        }
    }
}