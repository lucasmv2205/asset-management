import { assetsList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const useAssets = () => {

  const assets = useRecoilValue(assetsList)
  const setAssets = useSetRecoilState(assetsList)

  return { assets, setAssets }
}