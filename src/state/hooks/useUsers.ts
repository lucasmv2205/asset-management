import { usersList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { userType } from "../../types/user"
import UserApi from "../../services/UserApi"

export const useUsers = () => {

  const users = useRecoilValue<userType[]>(usersList)
  const setUser = useSetRecoilState(usersList)

  const deleteUser = (userId: string) => {
    return new Promise((resolve, reject) => {
      UserApi.delete(userId)
        .then((res) => {
          resolve(res.data)
          const usersFiltered = users.filter(user => user.id !== userId)
          setUser(usersFiltered)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const createUser = (user: userType) => {
    return new Promise((resolve, reject) => {
      UserApi.create(user)
        .then((res) => {
          resolve(res.data)
          const newUser = user
          setUser([...users, newUser])
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  const editUser = (user: userType) => {
    return new Promise((resolve, reject) => {
      UserApi.edit(user)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { users, setUser, deleteUser, createUser, editUser }
}