import React, { useEffect } from 'react'
import { Container, Spacer } from 'react-neu'

import Page from '../../components/Page'

import HomeHeader from './components/HomeHeader'
import Integrations from './components/Integrations'


const Home = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  return (
    <Page>
      <Container size='lg'>
        <HomeHeader />
        <Spacer size='lg' />
        {/* <Explanation /> */}
        <Spacer size='lg' />
         <Integrations/>
      </Container>
    </Page>
  )
}

export default Home
