import Head from 'next/head'
import { ReactNode } from 'react'
import styled from 'styled-components'
import Sidebar from '../common/Sidebar'

export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <BaseLayoutWrap>
            <Head>
                <title>Blockless Carbon Market</title>
                <meta name="description" content="Blockless Carbon Market built on CELO" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
                <Sidebar/>
                <BaseLayoutContent>
                    {children}
                </BaseLayoutContent>
            </main>
        </BaseLayoutWrap>
    )
}

const BaseLayoutWrap = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    > main {
        flex: 1;
        display: grid;
        grid-template-columns: 1fr;

        @media screen and (max-width: 767px) {
            grid-template-rows: 60px 1fr;
        }

        @media screen and (min-width: 768px) {
            grid-template-columns: 80px 1fr;
        }
    }
`

const BaseLayoutBg = styled.div`
    display: none;

    background-image: url(/images/bg.jpg);
    background-size: cover;
    background-position: center;

    @media screen and (min-width: 768px) {
        display: block;
    }
`

const BaseLayoutContent = styled.div`
    background-color: #EDEEF0;
    
    @media screen and (min-width: 768px) {
        min-width: 720px;
    }
`