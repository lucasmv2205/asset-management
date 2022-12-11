import { companiesList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { CompanyApi } from "../../services"
import { message } from "antd"
import { companyType } from "../../types/company"

export const useCompanies = () => {

  const companies = useRecoilValue<companyType[]>(companiesList)
  const setCompanies = useSetRecoilState(companiesList)

  const editCompany = (company: companyType) => {
    return new Promise((resolve, reject) => {
      CompanyApi.edit(company)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const deleteCompany = (companyId: string) => {
    return new Promise((resolve, reject) => {
      CompanyApi.delete(companyId)
        .then((res) => {
          resolve(res.data)
          const companiesFiltered = companies.filter(company => company.id !== companyId)
          setCompanies(companiesFiltered)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const createCompany = (company: companyType) => {
    return new Promise((resolve, reject) => {
      CompanyApi.create(company)
        .then((res) => {
          resolve(res.data)
          const newCompany = company
          setCompanies([...companies, newCompany])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { companies, setCompanies, editCompany, deleteCompany, createCompany }
}