import { Header } from './header'
import { Container } from './container'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'

export function Layout () {
  return (
    <>
      <Container>
        <Header />
          <Outlet />
        <Footer />
      </Container>
    </>
  )
}
