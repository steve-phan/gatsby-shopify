import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import FormInput from '../../ShareForm/FormInput'
import Button from '../../ShareForm/Button'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
//import firebase
import { auth, handleUserProfile } from './../../firebase/utils'
import { signUpUser } from '../../redux/User/user.actions'

import './styles.scss'
import FacebookIcon from './../../assets/facebook.svg'
import SocialLogin from '../../ShareForm/SocialLogin'

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

export default function Signup(props) {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { currentUser } = useSelector(mapState)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    console.log(history)
    if (currentUser) {
      navigate('/')
    }
  }, [currentUser])

  const handleFormSubmit = e => {
    console.log('cliking')
    e.preventDefault()
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          const additionalData = { displayName }
          const userAuth = user.user
          handleUserProfile({ userAuth, additionalData })

          dispatch(signUpUser())
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <div className="formWrap">
      <SocialLogin />
      <span className="line">Or</span>

      <form onSubmit={handleFormSubmit} action="">
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Full Name"
          handleChange={e => setDisplayName(e.target.value)}
          required
        />
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
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm your password"
          handleChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <span>
          Your password should be at least 8 characters long, contain both lower
          and upper-case letters, and include either a number or a symbol.
        </span>
        <Button type="submit">Submit </Button>
      </form>
    </div>
  )
}
