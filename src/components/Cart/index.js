import React, { useContext } from 'react'
import emailjs from 'emailjs-com'

import StoreContext from '~/context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const templateParams = {
    message_html : 'this is message',
    from_name : 'We can code',
    // oder_hello : checkout.lineItems[0].title
  }

  // emailjs.send('gmail', 'template_vNBZtXYN', {
  //   reply_to: 'phanhaingoc@gmail.com',
  //   to_name: 'KHANH',
  //   from_name: 'lebenistcodd@gmail.com',
  //   message_html: 'chan lam roi',
  // })
  const handleCheckout = () => {
    emailjs
      .send(
        'gmail',
        'template_vNBZtXYN',
        templateParams,
        'user_kg0x3lYVzVIvxdN94ITu1'
      )
      .then(
        result => {
          console.log(result.text)
        },
        error => {
          console.log(error.text)
        }
      )

    //  checkout.lineItems.forEach(item => {
    //    console.log(`${item.title} so luong : ${item.quantity}`)

    //  })    // window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <div>
      {lineItems}
      <h2>Subtotal</h2>
      <p>$ {checkout.subtotalPrice}</p>
      <br />
      <h2>Taxes</h2>
      <p>$ {checkout.totalTax}</p>
      <br />
      <h2>Total</h2>
      <p>$ {checkout.totalPrice}</p>
      <br />
      <button
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
      >
        Check out
      </button>
    </div>
  )
}

export default Cart
