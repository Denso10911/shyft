import { FaChartBar } from "react-icons/fa"
import { FaRegCalendarAlt } from "react-icons/fa"
import { FaRegUser } from "react-icons/fa"
import { FaFilePdf } from "react-icons/fa"
import { FaRegClock } from "react-icons/fa"
import cn from "classnames"
import Link from "next/link"

const pages = [
  { id: 1, label: "Shifts", link: "#", icon: FaRegCalendarAlt },
  { id: 2, label: "Work hours", link: "#", icon: FaRegClock },
  { id: 3, label: "Team", link: "#", icon: FaRegUser },
  { id: 4, label: "Reports", link: "#", icon: FaChartBar },
  { id: 5, label: "Documents", link: "#", icon: FaFilePdf },
]

const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        {pages.map(page => (
          <li key={page.id}>
            <Link
              href={page.link}
              className={cn(
                page.id === 1 ? "bg-color-dark-green text-color-white" : "",
                "group flex items-center gap-2 rounded px-4 py-2 uppercase transition-colors duration-300 hover:bg-color-dark-green hover:text-color-white"
              )}
            >
              <page.icon
                className={cn(
                  page.id === 1 ? "fill-color-white" : "",
                  "h-4 w-4 fill-color-dark-green text-color-dark-green transition-colors duration-300 group-hover:fill-color-white"
                )}
              />
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
