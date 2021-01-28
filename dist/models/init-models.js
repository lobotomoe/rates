"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.ExchangeRate = exports.AddressBalance = exports.Address = void 0;
const address_1 = require("./address");
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return address_1.Address; } });
const addr_balance_1 = require("./addr_balance");
Object.defineProperty(exports, "AddressBalance", { enumerable: true, get: function () { return addr_balance_1.AddressBalance; } });
const exchange_rate_1 = require("./exchange_rate");
Object.defineProperty(exports, "ExchangeRate", { enumerable: true, get: function () { return exchange_rate_1.ExchangeRate; } });
function initModels(sequelize) {
    address_1.Address.initModel(sequelize);
    addr_balance_1.AddressBalance.initModel(sequelize);
    exchange_rate_1.ExchangeRate.initModel(sequelize);
    addr_balance_1.AddressBalance.belongsTo(address_1.Address, {
        targetKey: "id",
        foreignKey: "addressId",
    });
    address_1.Address.hasMany(addr_balance_1.AddressBalance, { sourceKey: "id", foreignKey: "addressId" });
    return {
        Address: address_1.Address,
        AddressBalance: addr_balance_1.AddressBalance,
        ExchangeRate: exchange_rate_1.ExchangeRate,
    };
}
exports.initModels = initModels;
//# sourceMappingURL=init-models.js.map