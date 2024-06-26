import { Header } from './header'
import { Container } from './container'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'

const containerStyle = {
  paddingTop: '70px',
  paddingBottom: '70px'
}

export const Layout = () => {
  return (
    <>
      <Container>
        <Header />
        <div className="page__content" style={containerStyle}>
          <Outlet />
        </div>
        <Footer />
      </Container>
    </>
  )
}
