import appFirebase from "./firebase";
import { getFirestore } from 'firebase/firestore/lite';

const db = getFirestore(appFirebase);

export default db;