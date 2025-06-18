import { Firestore, doc, updateDoc } from "firebase/firestore";
import { getSchoolId } from "../../utils";

const setSessionNames = async (db: Firestore, names: string[]): Promise<void> => {
  const schoolId = getSchoolId();
  const sessionsConfigRef = doc(db, `schools/${schoolId}/config/sessions`);
  if (Array.isArray(names)) {
    await updateDoc(sessionsConfigRef, { names});
  }
}

export default setSessionNames;