import React from "react";
import { useParams } from "react-router-dom";
import { useAssets } from "../../state/hooks/useAssets";

export function AssetDetail() {
  const params = useParams();
  const { assets } = useAssets();
  const [asset] = assets.filter((asset) => asset.id == params.id);

  return (
    <div>
      <h2>
        {asset.id}: {asset.name}
      </h2>
    </div>
  );
}
