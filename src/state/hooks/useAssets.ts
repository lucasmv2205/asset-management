import { assetsList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { assetType } from "../../types/asset"
import { AssetApi } from "../../services"

export const useAssets = () => {

  const assets = useRecoilValue<assetType[]>(assetsList)
  const setAssets = useSetRecoilState(assetsList)

  const deleteAsset = (assetId: string) => {
    
    return new Promise((resolve, reject) => {
      AssetApi.delete(assetId)
        .then((res) => {
            const assetsFiltered = assets.filter(asset => asset.id !== assetId)
            setAssets(assetsFiltered)
            resolve(assetsFiltered)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { assets, setAssets, deleteAsset }
}