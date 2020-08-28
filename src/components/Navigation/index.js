import React, { useContext, useState } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useSelector, useDispatch } from 'react-redux'

import StoreContext from '~/context/StoreContext'

import { auth } from './../../firebase/utils'
// import { CartCounter, Container, Link, Wrapper } from './styles'

import './styles.scss'
import ShoppingCart from './../../assets/shopping.svg'
import Button from '../../ShareForm/Button'
import { userSignOut } from '../../redux/User/user.actions'
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

export const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = (props) => {
  const [hasItems, quantity] = useQuantity()
  const [openmodal, setOpenmodal] = useState()
  const { currentUser } = useSelector(mapState)
  const dispatch  = useDispatch()
  const openBoard = () => {
 console.log(props)
    const modal = document.getElementById('openmodal-btn')
    window.addEventListener('click', e => {
      if (e.target === modal) {
        setOpenmodal('openmodal')
      } else {
        setOpenmodal('')
      }
    })
  }
  const handleSignOut = () => {
    auth.signOut()
    .then(()=>{
      dispatch(userSignOut())
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }
  return (
    <div className="wrapper-navigation">
      <div className="container-navigation">
        <Link to="/" className="menulink-main">
          WeLoveTech
        </Link>
        <nav className="wrapper-nav">
          <div  className={`account-modal ${openmodal}`}>
            <div className="modal-link">
              <Link to='/dashboard' >Your Address</Link>
            </div>
            <div className="modal-link">
              <Link to='/cart'>Your oder Cart</Link>
            </div>
            <div className="modal-link">
              <Link to='/' onClick={handleSignOut}>Sign out</Link>
            </div>
          </div>
          {currentUser ? (
            <div onClick={openBoard}>
              <a  id="openmodal-btn" className="menulink-nav navbar-btn">
                Your Account
              </a>
            </div>
          ) : (
            // <Link to="/" className="menulink-nav" >Your Account</Link>
            <>
              <Link to="/login" className="menulink-nav login-link">
                Login
              </Link>
              <Link to="/registation" className="menulink-nav registation-link">
                Registation
              </Link>
            </>
          )}

          <Link to="/cart" className="menulink-nav wrapper-cart">
            <ShoppingCart className="cartlogo" />
            {hasItems && <span className="cartcounter">{quantity}</span>}
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
