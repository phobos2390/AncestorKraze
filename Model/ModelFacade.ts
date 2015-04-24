///<reference path="IModel.ts"/>
///<reference path="IModelFactory.ts"/>
///<reference path="Definitions/Standard/StandardFactory.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */

import IModel = Model.IModel;
import IModelFactory = Model.IModelFactory;
import StandardFactory = Model.Definitions.Standard.StandardFactory;

class ModelFacade
{
    private model:IModel;
    private factory:IModelFactory;

    public constructor()
    {
        this.factory = new StandardFactory();
        this.model = null;
    }

    public getModel():IModel
    {
        return this.model;
    }

    public setModel(model:IModel)
    {
        this.model = model;
    }

    public getFactory():IModelFactory
    {
        return this.factory;
    }

    public setFactory(factory:IModelFactory)
    {
        this.factory = factory;
    }
}