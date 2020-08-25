import {takeLatest, call, all , put } from 'redux-saga/effects'
import userTypes from "./user.types";
import { signInSuccess  } from "./user.actions";
import { getCurrentUser, handleUserProfile } from '../../firebase/utils';


export function* getSnapshotFromUserAuth(user, additionalData ={}) {
    try {
const userRef = yield call(handleUserProfile, {
    userAuth : user,
    additionalData,
})
const snapshot = yield userRef.get();
yield put(signInSuccess({
    id : snapshot.id,
    ...snapshot.data()
}))
        
    } catch (error) {
        console.log(error)
    }
}

export function* isUserAuthenticated() {
    try {

        const userAuth = yield getCurrentUser()
        if(!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
        
    } catch (error) {
        console.log(error)
    }
}


export function* onCheckUserSession() {
 yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)


}



export default function* userSagas() {
    yield all([
        call(onCheckUserSession)
    ])
}