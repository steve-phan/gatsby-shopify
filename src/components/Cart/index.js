import React, { useContext, useState, useEffect } from 'react'
import emailjs from 'emailjs-com'

import { useSelector, useDispatch } from 'react-redux'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'
import './styles.scss'
import { useQuantity } from '../Navigation'
import { userAddAddress } from './../../redux/User/user.actions'
import { auth, firestore, getCurrentUser } from './../../firebase/utils'
import { navigate } from 'gatsby'
import ProductGrid from '../ProductGrid'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const Cart = () => {
  const { currentUser } = useSelector(mapState)
  const [displayName, setDisplayName] = useState('')
  const [street, setStreet] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [floor, setFloor] = useState('')

  const dispatch = useDispatch()
  const [hasItems, quantity] = useQuantity()
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const templateParams = {
    message_html: 'this is message',
    from_name: 'We can code - this is line for test fearture/add-to-cart',
    // oder_hello : checkout.lineItems[0].title
  }

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        const userRef = firestore.doc(`users/${user.uid}`)
        // userRef.update({ ...additionalData })
        userRef
          .get()
          .then(doc => {
            if (doc.data().street) {
              setDisplayName(doc.data().displayName)
              setStreet(doc.data().street)
              setPostcode(doc.data().postcode)
              setCity(doc.data().city)
              setFloor(doc.data().floor)
            }
          })
          .catch(err => console.log(err))
      }
    })
  }, [currentUser])

  // emailjs.send('gmail', 'template_vNBZtXYN', {
  //   reply_to: 'phanhaingoc@gmail.com',
  //   to_name: 'KHANH',
  //   from_name: 'lebenistcodd@gmail.com',
  //   message_html: 'chan lam roi',
  // })
  const handleCheckout = () => {
    if (!street) {
      alert('update your address to Oder')
      navigate('/dashboard')
    }
    // emailjs
    //   .send(
    //     'gmail',
    //     'template_vNBZtXYN',
    //     templateParams,
    //     'user_kg0x3lYVzVIvxdN94ITu1'
    //   )
    //   .then(
    //     result => {
    //       console.log(result.text)
    //     },
    //     error => {
    //       console.log(error.text)
    //     }
    //   )
    //  checkout.lineItems.forEach(item => {
    //    console.log(`${item.title} so luong : ${item.quantity}`)
    //  })    // window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))
  console.log(checkout.lineItems.length)

  return (
    <div className="formWrap-Cart">
      {checkout.lineItems.length !== 0 ? (
        <div className="cartWrap">
          <div className="cartItems">{lineItems}</div>
          <div className="cartDetails-wrap">
            <div className="cartDetails">
              <h4 className="subtotal">Subtotal : {quantity} items</h4>
              <hr />
              <p className="lineItemPay">€{checkout.subtotalPrice} </p>
              <br />

              {/* <h2>Taxes</h2>
            <p>$ {checkout.totalTax}</p>
            <br /> */}
              {/* <h2>Total</h2>
            <p>$ {checkout.totalPrice}</p>
            <br /> */}
              <button
                onClick={handleCheckout}
                disabled={checkout.lineItems.length === 0}
              >
                Check out
              </button>
            </div>
            <div className="cartDetails delivery-address">
              <h4>Delivery Address </h4>
              <hr />
              {street ? (
                <div className="user-address">
                  <h5> {displayName} </h5>
                  <span> {street} </span>
                  <span>{floor} </span>
                  <span> {postcode} </span>
                  <span>{city} </span>
                </div>
              ) : (
                <p> update your address to Oder</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="wrap-empty">
          <h3 className="cart-empty">Your oders is empty</h3>
          <ProductGrid />
        </div>
      )}
    </div>
  )
}

export default Cart
