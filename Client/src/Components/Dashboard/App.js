import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"

export default function Welcome() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div style={{margin: '1em'}}>
        Welcome {user.name}, please select one of the project
      </div>
    </>
  )
}