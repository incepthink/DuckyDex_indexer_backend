import dbConfig from "../config/db-config";
import { DataTypes, Sequelize } from "sequelize";
import Pool from "./pool";
import Asset from "./asset";

const sequelize = new Sequelize(
  dbConfig.DATABASE,
  dbConfig.USER,
  dbConfig.PASSORD,
  {
    host: dbConfig.HOST,
    //@ts-ignore
    dialect: dbConfig.DIALECT,
  }
);

Asset.init(
  {
    asset_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    decimals: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    l1_address: DataTypes.STRING,
    contract_id: DataTypes.STRING,
    subId: DataTypes.STRING,
    price: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Asset",
    tableName: "assets",
  }
);

Pool.init(
  {
    pool_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
    },
    asset_0: DataTypes.STRING,
    asset_1: DataTypes.STRING,
    is_stable: DataTypes.BOOLEAN,
    reserve_0: DataTypes.STRING,
    reserve_1: DataTypes.STRING,
    create_time: DataTypes.INTEGER,
    decimals_0: DataTypes.INTEGER,
    decimals_1: DataTypes.INTEGER,
    tvl: DataTypes.BIGINT,
  },
  {
    sequelize,
    modelName: "Pool",
    tableName: "pools",
  }
);

const defineAssociations = () => {
  Pool.belongsTo(Asset, {
    foreignKey: "asset_0",
    as: "Asset0",
  });
  Pool.belongsTo(Asset, {
    foreignKey: "asset_1",
    as: "Asset1",
  });
};

defineAssociations();

export { Pool, Asset };
export default sequelize;