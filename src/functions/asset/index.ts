import { NextFunction } from "express";
import { Asset } from "../../models";
import { CustomError } from "../../utils/error_factory";
import { AssetType } from "../../types/modelTypes";

export const addAsset = async (asset: AssetType, next: NextFunction) => {
  try {
    const toAdd = {
      asset_id: asset.assetId,
      name: asset.name,
      symbol: asset.symbol,
      decimals: asset.decimals,
      icon: asset.icon,
      l1_address: asset.l1Address,
      contract_id: asset.contractId,
      subId: asset.subId,
      price: asset.price,
      is_verified: asset.isVerified,
    };

    //@ts-ignore
    const [newAsset, created] = await Asset.findOrCreate({
      where: {
        asset_id: asset.assetId,
      },
      defaults: toAdd,
    });

    if (!created) {
      newAsset.name = asset.name;
      newAsset.symbol = asset.symbol;
      newAsset.decimals = asset.decimals;
      newAsset.icon = asset.icon;
      newAsset.l1_address = asset.l1Address;
      newAsset.contract_id = asset.contractId;
      newAsset.subId = asset.subId;
      newAsset.price = asset.price;
      newAsset.is_verified = asset.isVerified;
    }

    newAsset.save();

    return newAsset;
  } catch (error) {
    const statusCode = 500;
    const message = "Failed to getAsset from db";

    return next(
      new CustomError(message, statusCode, { context: "addAsset", error })
    );
  }
};
