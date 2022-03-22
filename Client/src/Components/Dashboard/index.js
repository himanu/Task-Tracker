import ProjectDrawer from "./drawer";
import { useSelector } from "react-redux";

export default function Home() {
  const {user} = useSelector((state) => state.auth);
  return (
    <div>
      <ProjectDrawer />
      Hii {user.given_name}
      <p>
        Welcome to the todoist <br/>
        You can create new project or can see the todos of your previous projects by clicking the project on left sidebar.
      </p>
      
    </div>
  )
}