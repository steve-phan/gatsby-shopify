import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import StoreContext from '~/context/StoreContext'
import { CartCounter, Container, MenuLink, Wrapper } from './styles'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()
  const { currentUser } = useSelector(mapState)

  return (
    <Wrapper>
      <Container>
        <MenuLink to="/">{siteTitle}</MenuLink>
        {currentUser ? (
          <MenuLink to="/">Your Account</MenuLink>
        ) : (
          <MenuLink to="/signin">SignIn</MenuLink>
        )}

        <MenuLink to="/cart">
          {hasItems && <CartCounter>{quantity}</CartCounter>}
          Cart 🛍
        </MenuLink>
      </Container>
    </Wrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
