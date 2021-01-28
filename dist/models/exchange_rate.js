"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRate = void 0;
const sequelize_1 = require("sequelize");
class ExchangeRate extends sequelize_1.Model {
    static initModel(sequelize) {
        ExchangeRate.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                field: "Id",
            },
            symbol: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: "Symbol",
            },
            price: {
                type: sequelize_1.DataTypes.DOUBLE,
                allowNull: false,
                field: "Price",
            },
        }, {
            sequelize,
            tableName: "ExchangeRate",
            timestamps: true,
        });
        return ExchangeRate;
    }
}
exports.ExchangeRate = ExchangeRate;
//# sourceMappingURL=exchange_rate.js.map