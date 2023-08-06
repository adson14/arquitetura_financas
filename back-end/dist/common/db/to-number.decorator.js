"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNumber = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
function ToNumber(target, propertyKey) {
    (0, sequelize_typescript_1.addAttributeOptions)(target, propertyKey, {
        get() {
            return +this.getDataValue(propertyKey);
        },
    });
}
exports.ToNumber = ToNumber;
//# sourceMappingURL=to-number.decorator.js.map