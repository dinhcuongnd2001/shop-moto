import { db } from "./config";
import firebase from 'firebase/compat/app'
import {serverTimestamp, collection, addDoc , doc, setDoc, getDoc, updateDoc} from "firebase/firestore"; 

const addDocument = async (collect, data) => {
    try {
        const docRef = await addDoc(collection(db, collect), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const updateDocument = async (collect, field, data) =>  {
    const fieldUpdate = doc(db, collect, field);
    await updateDoc(fieldUpdate, {
        item: [...data]
    })
}


// const getDocument = async(db, collect, docName){
    

// }

const addOrder = async (uid, data) => {
    const orders = collection(db, "orders");

    await setDoc(doc(orders, uid), {
        ...data
    });
}

const readOrder = async (nameUid) => {
    const docRef = doc(db, 'orders', nameUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data();
    } else {
        // doc.data() will be undefined in this case
        // console.log("No such document!");
        return ;
    }
}
export {addDocument, addOrder, readOrder, updateDocument}