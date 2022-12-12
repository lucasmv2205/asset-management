import React from "react";
import { Input } from "antd";
import { useParams } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";

export function AssetForm() {
  const params = useParams();
  const { assets } = useAssets();
  const [asset] = assets.filter((asset) => asset.id === params?.id);

  return (
    <div>
      <h2>
        {params.id ? "edit asset here " + params.id : "create asset here"}
      </h2>
      <Input placeholder="asset name" defaultValue="" />
    </div>
  );
}
