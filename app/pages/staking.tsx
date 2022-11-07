import { Container } from '@chakra-ui/react'
import styled from 'styled-components'
import BaseLayout from '../components/layouts/BaseLayout'

export default function Staking() {
  return (
    <BaseLayout>
      <StakingInner>
        <Container maxW='1200px'>
          <StakingTitle>Blockless Carbon Staking.</StakingTitle>

          <StakingSubtitle>
            Blockless Carbon Market makes it easy to offset your carbon emissions by harnessing the
            incredible power of the Blockchain.
          </StakingSubtitle>
        </Container>
      </StakingInner>
    </BaseLayout>
  )
}

export const StakingInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  height: 100%;

  @media screen and (min-width: 768px) {
    padding: 4rem;
  }
`

export const StakingTitle = styled.div`
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

export const StakingSubtitle = styled.div`
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