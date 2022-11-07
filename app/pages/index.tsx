import { Container } from '@chakra-ui/react'
import styled from 'styled-components'
import UserAccounts from '../components/dashboard/UserAccounts'
import UserAssets from '../components/dashboard/UserAssets'
import BaseLayout from '../components/layouts/BaseLayout'

export default function Dashboard() {
  return (
    <BaseLayout>
      <DashboardInner>
        <Container maxW='1200px'>
          <DashboardTitle>Blockless Carbon Market.</DashboardTitle>

          <DashboardSubtitle>
            Blockless Carbon Market makes it easy to offset your carbon emissions by harnessing the 
            incredible power of the Blockchain.
          </DashboardSubtitle>

          <DashboardApp>
            <UserAccounts/>
            <UserAssets/>
          </DashboardApp>
        </Container>
      </DashboardInner>
    </BaseLayout>
  )
}

export const DashboardInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  height: 100%;

  @media screen and (min-width: 768px) {
    padding: 4rem;
  }
`

export const DashboardTitle = styled.div`
  font-size: 2.5rem;
  line-height: 1.1;
  font-weight: bold;

  @media screen and (min-width: 768px) {
    font-size: 4rem;
  }

  @media screen and (min-width: 992px) {
    max-width: 60%;
  }
`

export const DashboardSubtitle = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1.5rem;

  @media screen and (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media screen and (min-width: 992px) {
    max-width: 60%;
  }
`

export const DashboardApp = styled.div`
  flex: 1;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media screen and (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    margin-top: 5rem;
  }

  @media screen and (min-width: 1200px) {
    gap: 5rem;
  }

  > div {
    min-width: 0;
  }
`

export const DashboardFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  span {
    font-size: 0.875rem;
    color: #8c8c8c;
  }

  img {
    height: 1.5rem;
    margin-left: 1rem;
  }
`