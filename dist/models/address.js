"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const sequelize_1 = require("sequelize");
class Address extends sequelize_1.Model {
    static initModel(sequelize) {
        Address.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
                field: "Id",
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
                field: "Address",
            },
            type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: "Type",
            },
        }, {
            sequelize,
            tableName: "Address",
            timestamps: true,
        });
        return Address;
    }
}
exports.Address = Address;
//# sourceMappingURL=address.js.map