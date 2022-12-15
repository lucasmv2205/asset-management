import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { useParams } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";
import { assetType } from "../../types/asset";
import api from "../../services/api";

export function AssetForm() {
  const params = useParams();
  const [asset, setAsset] = useState({} as assetType);

  const getFilteredAssetById = async () => {
    const response = await api.get(`/assets/?id=${params.id}`);
    setAsset(response.data[0]);
  };

  useEffect(() => {
    getFilteredAssetById();
  }, [params]);

  return (
    <div>
      <h2>{params.id ? `Edit ${asset?.name}` : "Create new asset"}</h2>
      <Input defaultValue={asset?.name} />
    </div>
  );
}
