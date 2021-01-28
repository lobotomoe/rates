"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBalance = void 0;
const sequelize_1 = require("sequelize");
class AddressBalance extends sequelize_1.Model {
    static initModel(sequelize) {
        AddressBalance.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                field: "Id",
            },
            addressId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                field: "AddressId",
            },
            value: {
                type: sequelize_1.DataTypes.DOUBLE,
                allowNull: false,
                field: "Value",
            },
        }, {
            sequelize,
            tableName: "AddressBalance",
            timestamps: true,
        });
        return AddressBalance;
    }
}
exports.AddressBalance = AddressBalance;
//# sourceMappingURL=addr_balance.js.map