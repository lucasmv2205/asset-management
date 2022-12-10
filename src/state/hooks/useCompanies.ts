import { companiesList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const useCompanies = () => {

  const companies = useRecoilValue(companiesList)
  const setCompanies = useSetRecoilState(companiesList)

  return { companies, setCompanies }
}