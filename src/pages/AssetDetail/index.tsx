import React from "react";
import { useParams } from "react-router-dom";

export function AssetDetail() {
  const params = useParams();
  return (
    <div>
      <h2>editar asset {params.id}</h2>
    </div>
  );
}
