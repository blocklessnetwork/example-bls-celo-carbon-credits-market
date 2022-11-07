import { Container } from '@chakra-ui/react'
import { RiExternalLinkLine } from 'react-icons/ri'
import styled from 'styled-components'
import UserAccounts from '../components/dashboard/UserAccounts'
import UserAssets from '../components/dashboard/UserAssets'
import BaseLayout from '../components/layouts/BaseLayout'
import { CO2_ORACLE_ADDRESS } from '../constants/tokens'
import { usePrices } from '../hooks/usePrices'
import { formatEpochToPrettyDateTime } from '../utils/date'
import { formatNumberWithCurrency } from '../utils/number'
import { formatAddress } from '../utils/strings'

export default function Dashboard() {
  const { prices, lastUpdated } = usePrices()
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

          {
            !!(prices.bCO2) && (
              <DashboardFooter>
                <div>
                  <span>Price Oracle by</span>
                  <img src="/images/blockless-logo.svg" alt="Blockless" />
                </div>

                <div>
                  <span>Last Price</span>
                  <strong>{formatNumberWithCurrency(prices.bCO2)}</strong>
                </div>

                <div>
                  <span>Last Updated</span>
                  <strong>{formatEpochToPrettyDateTime(lastUpdated)}</strong>
                </div>

                <div>
                  <span>Celo Contract</span>
                  <div>
                    <a href="https://explorer.celo.org/alfajores/address/0xc44831f5f424A95465720bda94110AB0140Afc93/contracts" target="_blank" rel="noopener noreferrer">
                      {formatAddress(CO2_ORACLE_ADDRESS)}
                    </a>
                    &nbsp;
                    <RiExternalLinkLine />
                  </div>
                </div>
              </DashboardFooter>
            )
          }
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  margin-top: 4rem;

  background-color: #fafafa;
  border-radius: 8px;

  padding: 1rem;

  span {
    font-size: 0.875rem;
    color: #8c8c8c;
    margin-bottom: 0.5rem;
  }

  strong {
    font-size: 1.125rem;
  }

  img {
    height: 1.5rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > div {
      display: flex;
    }
  }
`