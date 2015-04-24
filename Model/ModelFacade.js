///<reference path="IModel.ts"/>
///<reference path="IModelFactory.ts"/>
///<reference path="Definitions/Standard/StandardFactory.ts"/>
/**
 * Created by phobos2390 on 3/19/15.
 */
var StandardFactory = Model.Definitions.Standard.StandardFactory;
var ModelFacade = (function () {
    function ModelFacade() {
        this.factory = new StandardFactory();
        this.model = null;
    }
    ModelFacade.prototype.getModel = function () {
        return this.model;
    };
    ModelFacade.prototype.setModel = function (model) {
        this.model = model;
    };
    ModelFacade.prototype.getFactory = function () {
        return this.factory;
    };
    ModelFacade.prototype.setFactory = function (factory) {
        this.factory = factory;
    };
    return ModelFacade;
})();
//# sourceMappingURL=ModelFacade.js.map