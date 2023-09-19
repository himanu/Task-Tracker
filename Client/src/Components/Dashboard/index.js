import ProjectDrawer from "./Sidebar";
import DashboardApp from "./App";
import useFetch from "../../hooks/useFetch";
import api from "../../api";

export default function Home() {
  const { data: projectsObject, isFetching, error } = useFetch(api.getProjects);

  return (
    <div>
      <ProjectDrawer projectsObject={projectsObject} isFetching={isFetching} error={error} />
      <DashboardApp />
    </div>
  )
}