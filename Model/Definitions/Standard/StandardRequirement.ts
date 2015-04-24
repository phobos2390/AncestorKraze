///<reference path="../../IPlayer.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    export class StandardRequirement implements IRequirement
    {
        private numberOfKeys:number;

        public constructor(numberOfKeys:number)
        {
            this.numberOfKeys = numberOfKeys;
        }

        public playerFulfillsRequirement(player:IPlayer):boolean
        {
            return player.numberOfKeys() >= this.numberOfKeys;
        }

        public toString():string
        {
            return this.numberOfKeys.toString();
        }
    }
}