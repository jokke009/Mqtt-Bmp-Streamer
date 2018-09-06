"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_logging_1 = require("typescript-logging");
typescript_logging_1.CategoryServiceFactory.setDefaultConfiguration(new typescript_logging_1.CategoryConfiguration(typescript_logging_1.LogLevel.Debug));
exports.catService = new typescript_logging_1.Category("service");
exports.catMain = new typescript_logging_1.Category("main", exports.catService);
//# sourceMappingURL=Config.js.map