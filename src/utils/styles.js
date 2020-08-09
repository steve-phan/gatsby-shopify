import React from 'react'
import Image from 'gatsby-image'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      body {
        margin: 0;
      }
      html {
        font-family: sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
    `}
  />
)
export const WrapPic = styled.div`
  height: 500px;
  width: 100%;
`

export const ShowImg = styled.ul`
  position: flex-end;
  display: flex;
  justify-content: space-evenly;
  padding : 0;

  img {
    display: block;
    width: 40px;
    height: 40px;
  }
`

export const Img = styled(Image)`
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  margin-bottom: 1.45rem;
  border: 1px solid #ddd;
  cursor: pointer;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
`
// Default breakpoints is l ( Large)
export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr;
  grid-template-rows: 1 auto;
  grid-template-areas: 'left . right';

  @media (max-width: ${breakpoints.s}px) {
    display: block;
  }
`

export const GridLeft = styled.div`
  grid-area: left;
`

export const GridRight = styled.div`
  grid-area: right;
`

export const MainContent = styled.main`
  margin-top: 80px;
  margin-bottom: 40px;

  @media (max-width: ${breakpoints.l}px) {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`
