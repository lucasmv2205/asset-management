import { assetsList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { assetType } from "../../types/asset"

export const useAssets = () => {

  const assets = useRecoilValue<assetType[]>(assetsList)
  const setAssets = useSetRecoilState(assetsList)

  return { assets, setAssets }
}