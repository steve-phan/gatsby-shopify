import userTypes from './user.types'


export const checkUserSession = () => ({
   type : userTypes.CHECK_USER_SESSION,
   // payload : true
})

export const signInWithGoogle = () => ({
   type : userTypes.SIGN_IN_WITH_GOOGLE,
   payload : true  
})

export const signInWithFacebook = () => ({
   type : userTypes.SIGN_IN_WITH_FACEBOOK,
   payload : true
})
export const signUpUser = ( ) => ({
   type  : userTypes.SIGN_UP_USER,
   payload : true
})
export const signInSuccess = user => ({
   type : userTypes.SIGN_IN_SUCCESS,
   payload : user
 })