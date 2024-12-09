import { FaChartBar } from "react-icons/fa"
import { FaRegCalendarAlt } from "react-icons/fa"
import { FaRegUser } from "react-icons/fa"
import { FaFilePdf } from "react-icons/fa"
import { FaRegClock } from "react-icons/fa"
import cn from "classnames"
import Link from "next/link"
import { useTranslations } from "next-intl"

const pages = [
  { id: 1, label: "shifts", link: "#", icon: FaRegCalendarAlt },
  { id: 2, label: "work", link: "#", icon: FaRegClock },
  { id: 3, label: "team", link: "#", icon: FaRegUser },
  { id: 4, label: "reports", link: "#", icon: FaChartBar },
  { id: 5, label: "documents", link: "#", icon: FaFilePdf },
]

const Nav = () => {
  const t = useTranslations("Navigation")

  return (
    <nav>
      <ul className="flex gap-4">
        {pages.map(page => (
          <li key={page.id}>
            <Link
              href={page.link}
              className={cn(
                page.id === 1 ? "bg-color-dark-green text-color-white" : "",
                "hover:bg-color-dark-green group flex items-center gap-2 rounded px-4 py-2 uppercase transition-colors duration-300 hover:text-color-white"
              )}
            >
              <page.icon
                className={cn(
                  page.id === 1 ? "fill-color-white" : "",
                  "fill-color-dark-green text-color-dark-green h-4 w-4 transition-colors duration-300 group-hover:fill-color-white"
                )}
              />
              {t(page.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
