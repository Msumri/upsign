import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getSchoolId } from "../../utils";

interface SessionConfig {
  number: number;
  times: string[];
  names:string[]
}

const defaultSessionsConfig: SessionConfig = {
  number: 5,
  times: [
    "8:30 - 9:35",
    "9:45 - 10:50",
    "11:00 - 12:05 // 11:20 - 12:25",
    "12:35 - 1:40",
    "1:50 - 2:55"
  ],
  names:[
    "Tuesday",
    "Thursday",
    "Friday",
  ]
};

const getSessionNames = async (
  db: Firestore,
  selectedName: Date | null = null
): Promise<string[]> => {
  const schoolId = getSchoolId();
  const sessionsConfigRef = doc(db, `schools/${schoolId}/config/sessions`);
  const sessionConfig = await getDoc(sessionsConfigRef);

  if (sessionConfig.exists()) {
    let names = (sessionConfig.data() as SessionConfig).names;
    if (selectedName) {
      const nameConfigRef = doc(db, `schools/${schoolId}/config/sessions/special_days/${selectedName}`);
      const nameConfig = await getDoc(nameConfigRef);

      if (nameConfig.exists()) {
        names = (nameConfig.data() as SessionConfig).names ?? names;
      }
    }
    return names;
  } else {
    await setDoc(sessionsConfigRef, defaultSessionsConfig);
    return [];
  }
}

export default getSessionNames;
