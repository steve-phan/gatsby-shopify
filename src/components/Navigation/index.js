import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useSelector } from 'react-redux'

import StoreContext from '~/context/StoreContext'

import {auth} from './../../firebase/utils'
// import { CartCounter, Container, Link, Wrapper } from './styles'

import './styles.scss'
import ShoppingCart from './../../assets/shopping.svg'
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
    <div className='wrapper-navigation'>
      <div className='container-navigation'>
        <Link to="/" className="menulink-main" >{siteTitle}</Link>
  <button onClick={e => auth.signOut()} >logoug</button>
         <nav className='wrapper-nav'>
          {currentUser ? (
            <Link to="/" className="menulink-nav" >Your Account</Link>
          ) : (
            <>
              <Link  to="/login" className="menulink-nav login-link">
                Login
              </Link>
              <Link to="/registation" className="menulink-nav registation-link">
                Registation
              </Link>
            </>
          )}

          <Link  to="/cart" className="menulink-nav wrapper-cart">
           <ShoppingCart className='cartlogo' />
            {hasItems && <span className='cartcounter' >{quantity}</span>}
          </Link>
        </nav>
      </div>
    </div>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
