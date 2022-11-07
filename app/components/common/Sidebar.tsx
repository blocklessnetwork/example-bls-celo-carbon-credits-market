import { IconButton } from "@chakra-ui/react"
import styled from "styled-components"
import { RiWallet2Line, RiRecycleLine, RiGitBranchLine, RiGithubLine } from "react-icons/ri";
import { useRouter } from 'next/router'
import Link from "next/link"

export default function Sidebar() {
  const router = useRouter()

  return (
    <SidebarWrap>
      <SidebarLogo>
        <img src="/apple-icon.png" alt="BLS" />  
      </SidebarLogo>

      <SidebarNavigation>
        <Link href='/'>
          <IconButton
            colorScheme={router.pathname === '/' ? 'teal' : 'gray'}
            aria-label='Wallet'
            size='lg'
            icon={<RiWallet2Line />}
          />
        </Link>

        <Link href='/staking' >
          <IconButton
            colorScheme={router.pathname === '/staking' ? 'teal' : 'gray'}
            aria-label='Carbon Credit Staking'
            size='lg'
            icon={<RiRecycleLine />}
          />
        </Link>
      </SidebarNavigation>

      <SidebarSocial>
        <a href="https://github.com/blocklessnetwork/example-bls-celo-carbon-credits-market" target="_blank" rel="noopener noreferrer">
          <RiGithubLine/>
        </a>
      </SidebarSocial>
    </SidebarWrap>
  )
}

const SidebarWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  padding: 0.5rem 1rem;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 0;
  }
`

const SidebarLogo = styled.div`
  img {
    width: 2.5rem;
  }
`

const SidebarNavigation = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  
  @media screen and (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const SidebarSocial = styled.div`
  svg {
    width: 2rem;
    height: 2rem;
  }
`