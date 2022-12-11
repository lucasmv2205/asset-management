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

  return { users, setUser, deleteUser }
}