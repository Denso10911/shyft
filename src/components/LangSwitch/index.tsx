import cn from "classnames"
import { useLocale } from "next-intl"

import Button from "@/components/Button"

import { Link } from "@/i18n/routing"

const LangSwitch = () => {
  const locale = useLocale()

  const languages = ["en", "fr"]

  return (
    <div className="relative flex gap-4 px-4">
      {languages.map(el => (
        <Link href={`/`} locale={el} key={el}>
          <Button
            type="button"
            variant={locale === el ? "green" : "light"}
            size="sm"
            width="max"
            className={cn("rounded uppercase")}
          >
            {el}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default LangSwitch
