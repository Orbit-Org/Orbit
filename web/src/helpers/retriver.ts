import admin from 'firebase-admin'

export async function retriveUserDataFromUID(uid: string) { //retrive user informations based from the uid
   const db = admin.firestore()
   const docRef = db.collection('users').doc(uid)
   const doc = await docRef.get()

   const username = doc.data()?.username
   const name = doc.data()?.name
   const pfp = doc.data()?.pfp

   return { username, name, pfp } //return these fields
}

export async function retriveUserDataFromUsername(username: string) { //retrive user informations based from the username
   const db = admin.firestore()
   const usersRef = db.collection('users').where("username", "==", username);

   return new Promise((resolve, reject) => {
      usersRef.get().then((snapshot) => { //retrive documents where the username is equal to the username param
         if (!snapshot.empty) {
            snapshot.forEach((doc) => {
               const uid = doc.id;
               resolve(uid); //return the uid of the username
            });
         } else
            reject(new Error('Username doesn\'t exists'))
      })
   })
}
