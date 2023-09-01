import '../sass/reset.scss'
import '../sass/responsive.scss'
import '../sass/global.scss'
import { Dosis } from 'next/font/google'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
const inter = Dosis({ subsets: ['vietnamese'] })
import { config } from "@fortawesome/fontawesome-svg-core";
import { ReduxProvider } from '@/redux/provider';
import ShowFooter from '@/conditionalComponents/ShowFooter';
import ShowHeaderNavbar from '@/conditionalComponents/ShowHeaderNavbar';
import Main from '@/components/Main';
import Navbar from '@/components/Navbar';

config.autoAddCss = false; 
export const metadata = {
  title: 'MeowSocial media',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/logoCat.png" sizes="any" />
        <ReduxProvider>
          <ShowHeaderNavbar></ShowHeaderNavbar>
          <Main>
              {children}
          </Main>
          <ShowFooter></ShowFooter>
        </ReduxProvider>
      </body>
    </html>
      
  )
}

