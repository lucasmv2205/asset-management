import { unitsList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { UnitApi } from "../../services"
import { unitType } from "../../types/unit"

export const useUnits = () => {

  const units = useRecoilValue<unitType[]>(unitsList)
  const setUnits = useSetRecoilState(unitsList)

  const editUnit = (unit: unitType) => {
    return new Promise((resolve, reject) => {
      UnitApi.edit(unit)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const deleteUnit = (unitId: string) => {
    return new Promise((resolve, reject) => {
      UnitApi.delete(unitId)
        .then((res) => {
          resolve(res.data)
          const unitiesFiltered = units.filter(unit => unit.id !== unitId)
          setUnits(unitiesFiltered)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const createUnit = (unit: unitType) => {
    return new Promise((resolve, reject) => {
      UnitApi.create(unit)
        .then((res) => {
          resolve(res.data)
          const newUnit = unit
          setUnits([...units, newUnit])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { units, setUnits, deleteUnit, createUnit, editUnit }
}