import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import { Address } from "./address";

export interface AddressBalanceAttributes {
  id?: number;
  addressId?: number;
  value?: number;
}

export type AddressBalancePk = "id";
export type AddressBalanceId = AddressBalance[AddressBalancePk];
export type AddressBalanceCreationAttributes = Optional<AddressBalanceAttributes, AddressBalancePk>;

export class AddressBalance
  extends Model<AddressBalanceAttributes, AddressBalanceCreationAttributes>
  implements AddressBalanceAttributes {
  id?: number;
  addressId?: number;
  value?: number;

  public readonly createdAt!: Date;

  countAddressBalance!: Sequelize.HasManyCountAssociationsMixin;
  getAddress!: Sequelize.BelongsToGetAssociationMixin<Address>;

  static initModel(sequelize: Sequelize.Sequelize) {
    AddressBalance.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          field: "Id",
        },
        addressId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "AddressId",
        },
        value: {
          type: DataTypes.DOUBLE,
          allowNull: false,
          field: "Value",
        },
      },
      {
        sequelize,
        tableName: "AddressBalance",
        timestamps: true,
      }
    );
    return AddressBalance;
  }
}
