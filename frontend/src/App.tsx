import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './components/navbar'
import  { ThemeProvider  } from 'styled-components';
import { Footer } from './components/footer';

function App() {
const theme = {
  colors: {
    blue: '#8CB9BD',
    snow: '#FEFBF6',
    yellow: '#ECB159',
    brown: '#B67352',
    nude: '#f0e4c4',
    nude2: '#f5eee8',
    coffee: '#866552',
    green: '#93bf85',
    red: '#d74f33',
    gray: '#707070',
    gray2: '#969696'
  }
}

const route = useLocation();

  return (
    <ThemeProvider theme={theme} >
      {route.pathname != '/login' && <Navbar/>}
     <Outlet />
     {route.pathname != '/login' && <Footer/>}
    </ThemeProvider>
  )
}

export default App
