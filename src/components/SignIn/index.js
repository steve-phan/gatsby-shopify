import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart } from '../../redux/User/user.actions'

import { auth, GoogleProvider, handleUserProfile } from './../../firebase/utils'
import SocialLogin from '../../ShareForm/SocialLogin'
import FormInput from '../../ShareForm/FormInput'
import Button from '../../ShareForm/Button'


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapState)

  const handleSignIn = (e) => {
    e.preventDefault()
    dispatch(emailSignInStart({ email, password }));
    console.log(email)
  }
  useEffect(() => {
    if (currentUser) {
     navigate('/')
    }
  }, [currentUser])

  return (
    <div   className="formWrap">
        <SocialLogin />
        <span className="line">Or</span>
        <form 
         onSubmit={handleSignIn}
        action="">
          <FormInput 
               type="email"
               name="email"
               value={email}
               placeholder="Your Email"
               handleChange={e => setEmail(e.target.value)}
               required
          />
          <FormInput
          type="password"
          name="password"
          value={password}
          placeholder="Your password"
          handleChange={e => setPassword(e.target.value)}
          required
        />
        <Button type='submit'>Submit</Button>

        </form>
       
    </div>
  )
}

export default SignIn
