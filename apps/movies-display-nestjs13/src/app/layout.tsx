import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SearchBox from "../components/searchBox";

export default function RootLayout({children}: any) {

  return (
    <html lang="en">
         <body>
          <Header />
          <Navbar />
          <SearchBox />
          {children}
        </body>
    </html>
  )
}