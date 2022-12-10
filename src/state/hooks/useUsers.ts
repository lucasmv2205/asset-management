import { usersList } from "../atom"
import { useRecoilValue, useSetRecoilState } from "recoil"

export const useUsers = () => {

  const users = useRecoilValue(usersList)
  const setUser = useSetRecoilState(usersList)

  return { users, setUser }
}