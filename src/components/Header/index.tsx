import Link from "next/link"

import LangSwitch from "../LangSwitch"
import Nav from "../Nav"

const Header = () => {
  return (
    <header className="py-3">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="#" className="block px-10 py-1 text-2xl font-extrabold">
            shyft
          </Link>
          <Nav />
        </div>

        <LangSwitch />
      </div>
    </header>
  )
}

export default Header
