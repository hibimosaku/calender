import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Reserve } from "./model/reserve.model";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
} from "firebase/auth";
import router from "./router/router";

export async function createReserveFirebase(userId: string, reserve: Reserve) {
  return setDoc(doc(getFirestore(), "reserves", reserve.id.raw), {
    userId,
    year: reserve.calender.year,
    month: reserve.calender.month,
    day: reserve.calender.day,
    weekDay: reserve.calender.weekDay,
    time: reserve.time,
  });
}

export async function deleteReserveFirebase(id: string) {
  return deleteDoc(doc(getFirestore(), "reserves", id));
}

export async function getReserveFirebase() {
  const querySnapshot = await getDocs(collection(getFirestore(), "reserves"));

  let result: Array<any> = [];
  querySnapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return result;
}

export async function signUpFirebase(email: string, pw: string) {
  return createUserWithEmailAndPassword(getAuth(), email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.log("失敗", error);
    });
}

export async function signInFirebase(email: string, pw: string) {
  return signInWithEmailAndPassword(getAuth(), email, pw)
    .then(() => {
      // Signed in
      router.push("/reservationCalendar");
    })
    .catch((error) => {
      console.log(error);
      alert("pw誤り等により、ログインできませんでした。");
    });
}

export async function logOutFirebase() {
  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function deleteUserFirebase() {
  const user = await getAuth().currentUser;
  if (!user) return;
  await deleteUser(user);
  const q = await query(
    collection(getFirestore(), "reserves"),
    where("userId", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((v) => {
    deleteDoc(doc(getFirestore(), "reserves", v.id));
  });
}
