///<reference path="../../IDoor.ts"/>
///<reference path="../../IRequirement.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
module Model.Definitions.Standard
{
    import IDoor = Model.IDoor;

    export class StandardDoor implements IDoor
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
            return "Door" + this.getRequirement().toString();
        }

        public objectIsOfType(type:string):boolean
        {
            return type.valueOf() == this.doorString.valueOf()
                || type.valueOf() == this.getRequirement().toString().valueOf();
        }
    }
}