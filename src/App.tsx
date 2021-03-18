import React,{useState,useCallback} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import styled from 'styled-components'
import Home from './views/Home'
import Vault from './views/Vault';


import TopBar from './components/TopBar'


const App:React.FC =() =>{
  const [mobileMenu, setMobileMenu] = useState(false)
  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

   return(
     <Router>
       <StyledBackgroundDiv>
          <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
          <Switch>
           <Route exact path='/'>
              <Home title={'Rack - Home'} />
            </Route>
            <Route exact path='/vault'>
              <Vault title={'Rack - Vault'} />
            </Route>
          </Switch>
        </StyledBackgroundDiv>
     </Router>
   
   )
}


const StyledBackgroundDiv = styled.div`
  // background:#222;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  
`
export default App;