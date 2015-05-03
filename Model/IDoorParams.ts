/**
 * Created by phobos2390 on 3/19/15.
 */
module Model
{
    import IRequirement = Model.IRequirement;

    export interface IDoorParams
    {
        getRequirement():IRequirement;
    }
}