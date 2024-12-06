import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import localFont from "next/font/local"
import "../../styles/globals.css"
import "react-toastify/dist/ReactToastify.css"
import { localeType } from "@/types/types"
import Providers from "@/app/[locale]/proviers"

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as localeType)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
