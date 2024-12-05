import Components from "@/components/Components"
import { useTranslations } from "next-intl"
export default function Home() {
  const t = useTranslations("HomePage")
  return (
    <div className="p-20 font-[family-name:var(--font-geist-sans)] accent-neutral-400">
      <h1>{t("title")}</h1>
      <Components />
    </div>
  )
}
