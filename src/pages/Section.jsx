import Home from "./Home"
import Users from "./Users"
import Agenda from "./Agenda"
import Settings from "./Settings"
import NavBar from "../components/NavBar"

const sections = {
  'home': <Home />,
  'users': <Users />,
  'agenda': <Agenda />,
  'settings': <Settings />,
}

export default function Section({sectionName}) {
  return (
    <>
      <NavBar />
      {sections[sectionName.toLowerCase()]}
    </>
  )
}