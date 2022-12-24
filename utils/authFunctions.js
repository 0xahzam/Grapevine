import { signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, runTransaction } from "firebase/firestore";
import { SetUserInContext } from "../context/contextFunctions";

import { auth, db } from "../firebase/clientApp";

const login = async (provider, user, contextUser, setContextUser) => {
  console.log(1);
  if (user) {
    SetUserInContext(setContextUser, user, "username");
    return;
  } else {
    const result = await signInWithPopup(auth, provider);
    console.log(result, "result");
    const userDoc = doc(db, "users", result.user.providerData[0].uid);
    const userInDoc = await getDoc(userDoc, result.user.providerData[0].uid);

    if (userInDoc.exists()) {
      console.log("Document data:", userInDoc.data());
      setContextUser(userInDoc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");

      try {
        await runTransaction(db, async (transaction) => {
          const idRef = doc(db, "users", "--idCount--");
          const idDoc = await transaction.get(idRef);
          console.log(idDoc, "12", idDoc.data());
          if (!idDoc.exists()) {
            throw "Document does not exist!";
          }

          const newId = idDoc.data().idCount + 1;
          transaction.update(idRef, { idCount: newId });
          setContextUser({
            anonId: newId,
            name: result.user.displayName,
            email: result.user.providerData[0].email,
            photoURL: result.user.providerData[0].photoURL,
            twitterID: result.user.providerData[0].uid,
            username: result._tokenResponse.screenName,
          });
          const e = transaction.set(userDoc, {
            anonId: newId,
            name: result.user.displayName,
            email: result.user.providerData[0].email,
            photoURL: result.user.providerData[0].photoURL,
            twitterID: result.user.providerData[0].uid,
            username: result._tokenResponse.screenName,
          });
          console.log(e, "Transaction successfully committed!");
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }
    // router.push("/feed");
    console.log(contextUser, 23);
    alert(`logged in ${contextUser?.name}`);
  }
};
const logout = async () => {
  alert("loggin out");
  const result = await signOut(auth);
  console.log(result, "logged out");
  alert("logged out");
};

export { login, logout };
