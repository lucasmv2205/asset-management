import { unitsList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const useUnits = () => {

  const units = useRecoilValue(unitsList)
  const setUnits = useSetRecoilState(unitsList)

  return { units, setUnits }
}