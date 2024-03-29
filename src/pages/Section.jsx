import Home from "./Home"
import Users from "./Users"
import Agenda from "./Agenda"
import Settings from "./Settings"
import NavBar from "../components/NavBar"

const sections = {
  'home': { page: Home, link: { text: 'Inicio', icon: 'home' }, disabled: false },
  'users': { page: Users, link: { text: 'Usuarios', icon: 'person' }, disabled: false },
  'agenda': { page: Agenda, link: { text: 'Agenda', icon: 'calendar_month' }, disabled: true },
  'settings': { page: Settings, link: { text: 'Ajustes', icon: 'settings' }, disabled: true },
}

export const sectionsArray = Object.keys(sections);

export default function Section({sectionName}) {
  const PageComponent = sections[sectionName.toLowerCase()].page;
  
  return (
    <div className="w-full h-screen md:flex">
      <nav id="side-menu" className="min-w-[320px] h-screen overflow-y-clip py-6 flex flex-col justify-between bg-slate-300">
        <NavBar sections={sections} />
      </nav>
      <main id="page-container" className="h-screen overflow-y-scroll p-6 flex-auto">
        <PageComponent />
      </main>
    </div>
  )
}