///<reference path="../Presenter/IPresenter.ts"/>
///<reference path="../Model/ISpace.ts"/>
/**
 * Created by phobos2390 on 4/24/15.
 */

module View
{
    import IModelArgs = Model.IModelArgs;

    export interface IView
    {
        draw(model:IModelArgs):void;
        setGender(gender:string):void;
    }
}