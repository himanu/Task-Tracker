import { useSelector } from "react-redux"

export default function Welcome() {
  const name = useSelector((state) => state.auth.user.name);
  return (
    <>
      <div style={{margin: '1em'}}>
        Welcome {name}, please select one of the project
      </div>
    </>
  )
}