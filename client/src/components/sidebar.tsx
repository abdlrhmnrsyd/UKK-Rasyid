
import '../index.css';

// Add proper typing for the context


// Sidebar component
export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="h-screen">
      <nav className="flex flex-col h-full bg-white border-r shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
        </div>

        <ul className="flex-1 px-3">
          {children}
        </ul>

      </nav>
    </aside>
  );
}

// SidebarItem component
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

export function SidebarItem({ icon, text, active }: SidebarItemProps) {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <span className="flex items-center justify-center w-8 h-8 text-lg mr-3">
        {icon}
      </span>
      <span>{text}</span>
    </li>
  );
}