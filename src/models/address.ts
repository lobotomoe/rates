import Sequelize, { DataTypes, Model, Optional } from "sequelize";
import { AddressBalance, AddressBalanceId } from "./addr_balance";

export interface AddressAttributes {
  id?: number;
  address?: string;
  type?: string;
}

export type AddressPk = "id";
export type AddressId = Address[AddressPk];
export type AddressCreationAttributes = Optional<AddressAttributes, AddressPk>;

export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes {
  id?: number;
  address?: string;
  type?: "orn" | "eth";

  public readonly createdAt!: Date;

  getAddressBalances!: Sequelize.HasManyGetAssociationsMixin<AddressBalance>;
  addAddressBalance!: Sequelize.HasManyAddAssociationsMixin<
    AddressBalance,
    AddressBalanceId
  >;
  countAddress!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize) {
    Address.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          field: "Id",
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: "Address",
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "Type",
        },
      },
      {
        sequelize,
        tableName: "Address",
        timestamps: true,
      }
    );
    return Address;
  }
}
