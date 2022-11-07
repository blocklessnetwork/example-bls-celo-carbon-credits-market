import styled from "styled-components"

import { useBalances } from "../../hooks/useBalances"
import { Skeleton } from "@chakra-ui/react"
import { usePrices } from "../../hooks/usePrices"
import { formatNumber, formatNumberWithCurrency } from "../../utils/number"
import FaucetButton from "../common/FaucetButton"

interface UserAssetsProps { }

export default function UserAssets({ }: UserAssetsProps) {
  const { isLoading: isBalancesLoading, balances } = useBalances()
  const { isLoading: isPricesLoading, prices } = usePrices()

  const isLoading = isBalancesLoading && isPricesLoading

  return <UserAssetsWrap>
    <UserAssetsInner>
      <UserAssetsHeader>
        <UserAssetsHeaderItem>Asset</UserAssetsHeaderItem>
        <UserAssetsHeaderItem>Balance</UserAssetsHeaderItem>
      </UserAssetsHeader>

      <UserAssetsList>
        <UserAssetsListItem>
          <UserAssetsListItemInner>
            <UserAssetsListItemName>
              <UserAssetsListItemIcon>
                <img src="/images/celo-icon.svg" alt="CELO" />
              </UserAssetsListItemIcon>
              <span>CELO</span>
            </UserAssetsListItemName>
            <UserAssetsListItemBalance>
              {
                isLoading && <Skeleton width='10rem' height='2.5rem' />
              }
              {
                !isLoading && <>
                  <span>{formatNumber(balances.celo)}</span>
                  <small>
                    Total: <strong>{formatNumberWithCurrency(prices.celo * balances.celo)}</strong> &nbsp;|&nbsp; Price: <strong>{formatNumberWithCurrency(prices.celo)}</strong>
                  </small>
                </>
              }
            </UserAssetsListItemBalance>
          </UserAssetsListItemInner>
        </UserAssetsListItem>

        <UserAssetsListItem>
          <UserAssetsListItemInner>
            <UserAssetsListItemName>
              <UserAssetsListItemIcon>
                <img src="/apple-icon.png" alt="CELO" />
              </UserAssetsListItemIcon>
              <span>Blockless tCO2e</span>
            </UserAssetsListItemName>
            <UserAssetsListItemBalance>
              {
                isLoading && <Skeleton width='10rem' height='2.5rem' />
              }
              {
                !isLoading && <>
                  <span>{formatNumber(balances.bCO2)}</span>
                  <small>
                    Total: <strong>{formatNumberWithCurrency(prices.bCO2 * balances.bCO2)}</strong> &nbsp;|&nbsp; Price: <strong>{formatNumberWithCurrency(prices.bCO2)}</strong>
                  </small>
                </>
              }
            </UserAssetsListItemBalance>
          </UserAssetsListItemInner>
          <UserAssetsListItemAction>
            <FaucetButton/>
            <small>$100 worth of tCO2e tokens every 24 hours.</small>
          </UserAssetsListItemAction>
        </UserAssetsListItem>
      </UserAssetsList>
    </UserAssetsInner>
  </UserAssetsWrap >
}

const UserAssetsWrap = styled.div`
`

const UserAssetsInner = styled.div`
  display: flex;
  flex-direction: column;
`

const UserAssetsHeader = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-gap: 1rem;
  background-color: #d2d2d2;
  border-radius: 4px;
`
const UserAssetsHeaderItem = styled.div`
  text-transform: uppercase;
  font-size: 0.625rem;
  font-weight: bold;
  color: #8c8c8c;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1.5rem;

  &:last-child {
    text-align: right;
  }
`

const UserAssetsList = styled.div`
  
`

const UserAssetsListItem = styled.div`
  background-color: #fff;
  border-radius: 8px;
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
`

const UserAssetsListItemInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  min-height: 120px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const UserAssetsListItemIcon = styled.div`
  margin-right: 1rem;
  
  img {
    width: 2rem;
  }
`

const UserAssetsListItemName = styled.div`
  display: flex;
  align-items: center;

  font-weight: bold;
`
const UserAssetsListItemBalance = styled.div`
  font-size: 1.5rem;
  
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  
  @media screen and (min-width: 768px) {
    text-align: right;
    justify-content: flex-end;
    margin-top: 0;
  }

  small {
    font-size: 0.875rem;
  }
`
const UserAssetsListItemAction = styled.div`
  padding: 0.5rem;
  text-align: center;
  
  small {
    color: var(--bls--text-muted);
  }

  button {
    width: 100%;
  }
`