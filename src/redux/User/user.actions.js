import userTypes from './user.types'

export const signInWithGoogle = () => ({
   type : userTypes.SIGN_IN_WITH_GOOGLE,
   payload : true  
})