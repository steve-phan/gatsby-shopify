import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Provider } from 'react-redux'

import ContextProvider from '~/provider/ContextProvider'

import { GlobalStyle } from '~/utils/styles'
import Navigation from '~/components/Navigation'

import { store } from './../redux/createStore'
import  "./styles.scss"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 80px 1.0875rem 1.45rem;
`

const Layout = ({ children }) => {
  return (
    <Provider store={store} >
      <ContextProvider>
        <GlobalStyle />
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => (
            <>
              <Navigation siteTitle={data.site.siteMetadata.title} />
              <div className='wrapper-layout'>
                {children}
                <footer>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
              </div>
            </>
          )}
        />
      </ContextProvider>
    </Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
