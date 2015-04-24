///<reference path="../../IPlayer.ts"/>
///<reference path="AncestorName.ts"/>
/**
 * Created by phobos2390 on 4/20/15.
 */

module Model.Definitions.FamilyHistory
{
    export class AncestorPlayer implements IPlayer
    {
        private keys:AncestorName[];

        public fulfillsRequirement(requirement:IRequirement):boolean
        {
            return requirement.playerFulfillsRequirement(this);
        }

        public addKey(key:IKey):void
        {
            this.keys.push(<AncestorName>key);
        }

        public hasKey(key:IKey):boolean
        {
            var keyPlayerHas = <AncestorName>key;
            for(var i:number = 0; i < this.keys.length; i++)
            {
                var checkKey:AncestorName = this.keys[i];
                if(checkKey.getSpaceType().valueOf() == keyPlayerHas.valueOf())
                {
                    return true;
                }
            }
            return false;
        }

        public numberOfKeys():number
        {
            return this.keys.length;
        }
    }
}