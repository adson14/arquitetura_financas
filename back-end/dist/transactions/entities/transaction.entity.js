"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionTypeList = exports.TransactionCateroryList = exports.TransactionType = exports.TransactionCategory = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const account_entity_1 = require("../../accounts/entities/account.entity");
const to_number_decorator_1 = require("../../common/db/to-number.decorator");
var TransactionCategory;
(function (TransactionCategory) {
    TransactionCategory["CATEGORY1"] = "category1";
    TransactionCategory["CATEGORY2"] = "category2";
})(TransactionCategory || (exports.TransactionCategory = TransactionCategory = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
exports.TransactionCateroryList = Object.values(TransactionCategory);
exports.TransactionTypeList = Object.values(TransactionType);
let Transaction = exports.Transaction = class Transaction extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4 }),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", Date)
], Transaction.prototype, "payment_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Transaction.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Transaction.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Transaction.prototype, "category", void 0);
__decorate([
    to_number_decorator_1.ToNumber,
    (0, sequelize_typescript_1.Column)({ allowNull: false, type: sequelize_typescript_1.DataType.DECIMAL(10, 2) }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ allowNull: false }),
    __metadata("design:type", String)
], Transaction.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => account_entity_1.Account),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4, allowNull: false }),
    __metadata("design:type", String)
], Transaction.prototype, "account_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => account_entity_1.Account),
    __metadata("design:type", account_entity_1.Account)
], Transaction.prototype, "account", void 0);
exports.Transaction = Transaction = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'transactions',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
], Transaction);
//# sourceMappingURL=transaction.entity.js.map