import {Category,CategoryServiceFactory,CategoryConfiguration,LogLevel} from "typescript-logging";

// Optionally change default settings, in this example set default logging to Info.
// Without changing configuration, categories will log to Error.
CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Debug));

// Create categories, they will autoregister themselves.
// This creates one root (no parent) category, with two children.
export const catService = new Category("service");
export const catMain = new Category("main", catService);
//export const catProd = new Category("product", catService);

// This is not needed anymore since 0.5.0, but effectively does the same for given category.
// It can be retrieved for a category directly, this is mostly for backwards compatibility.
//export const logProduct: CategoryLogger = CategoryServiceFactory.getLogger(catProd);