import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import { useDispatch, useSelector } from 'react-redux'
import { signInWithGoogle } from '../../redux/User/user.actions'

import { auth, GoogleProvider, handleUserProfile } from './../../firebase/utils'


const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

const SignIn = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(mapState)
  const handleSignInWithGoogle = e => {
    e.preventDefault()
    auth
      .signInWithPopup(GoogleProvider)
      .then((user) => {
        const additionalData = user.user.displayName
        
        console.log(additionalData)
        const userAuth = user.user
        handleUserProfile({ userAuth, additionalData })

        dispatch(signInWithGoogle())
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (currentUser) {
      console.log(' User is Online')
    }
  }, [])

  return (
    <div>
      <button onClick={handleSignInWithGoogle}> Sign In With Google </button>
    </div>
  )
}

export default SignIn