import Sidebar, { SidebarItem } from "../components/sidebar"
import { Gauge, FolderCode, Network, TvMinimalPlay, Video } from "lucide-react"
import { Link } from "react-router-dom";

export default function Tkj() {
  return (
    <div className="flex">
      <Sidebar>
        <Link to="/dashboard">
          <SidebarItem icon={<Gauge size={20} />} text="Dashboard" />
        </Link>

        <Link to="/rpl">
          <SidebarItem icon={<FolderCode size={20} />} text="RPL" />
        </Link>

        <Link to="/tkj">
          <SidebarItem icon={<Network size={20} />} text="TKJ" active />
        </Link>

        <Link to="/dkv">
          <SidebarItem icon={<TvMinimalPlay size={20} />} text="DKV" />
        </Link>

        <Link to="/pspt">
          <SidebarItem icon={<Video size={20} />} text="PSPT" />
        </Link>
      </Sidebar>

      <div className="flex-1 p-4">
        <h1>TKJ Content</h1>
      </div>
    </div>
  )
}
