///<reference path="../../IDoor.ts"/>
///<reference path="../../IRequirement.ts"/>
///<reference path="../Standard/StandardDoor.ts"/>
/**
 * Created by phobos2390 on 5/2/15.
 */
module Model.Definitions.FamilyHistory
{
    import IDoor = Model.IDoor;
    import StandardDoor = Model.Definitions.Standard.StandardDoor;

    export class AncestorDoor implements IDoor
    {
        private requirement:IRequirement;
        private doorString:string;

        public constructor(requirement:IRequirement)
        {
            this.requirement = requirement;
            this.doorString = "IDoor";
        }

        public getRequirement():IRequirement
        {
            return this.requirement;
        }

        public canEnterSpace():boolean
        {
            return true;
        }

        public getSpaceType():string
        {
            return this.getRequirement().toString().replace(/ /g,'');
        }

        public objectIsOfType(type:string):boolean
        {
            return type.valueOf() == this.doorString.valueOf()
                || type.valueOf() == this.getRequirement().toString().valueOf();
        }
    }
}