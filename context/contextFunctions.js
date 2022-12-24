import { signOut } from "firebase/auth";
import { collection, getDocs, query, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../firebase/clientApp";

function SetUsersInContext(setContextAllUsers) {
  (async () => {
    console.log("user in auth user");
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "querySnapshot");
    const arr = [];
    querySnapshot.forEach((doc) => {
      !doc.data().hasOwnProperty("idCount") && arr.push(doc.data());
    });
    setContextAllUsers(arr);
  })();
}

function SetReviewsInContext(setContextReviews) {
  (async () => {
    const q = query(collection(db, "teas"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "querySnapshot");
    const arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc, doc.data(), "reviews");
      arr.push({ ...doc.data(), id: doc.id });
    });
    setContextReviews(arr);
  })();
}

function SetUserInContext(setContextUser, user, page) {
  (async () => {
    //    const router = useRouter();
    console.log("user in auth user for navbar rn");
    const userDoc = doc(db, "users", user.providerData[0].uid);
    const userInDoc = await getDoc(userDoc, user.providerData[0].uid);
    if (userInDoc.exists()) {
      console.log("Document data: n", userInDoc.data());
      setContextUser(userInDoc.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document! n ");
      const result = await signOut(auth);
      //  router.push("/");
      //error toast
      //logout
    }
  })();
}

export { SetUsersInContext, SetReviewsInContext, SetUserInContext };
