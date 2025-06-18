import { Firestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Add, Minus } from "~/icons";
import {
  getNumberSessions,
  setNumberSessions,
  getSessionTimes,
  setSessionTimes,
  getSessionNames,
  setSessionNames,
} from "~/services"
import { numberToArrayOfStrings } from '~/utils';

type ConfigRowProps = {
  name?: string,
  number: number,
  time: string,
  handleChangeTime: (arg0: number, arg1: string) => void,
  handleChangeName: (arg0: number, arg1: string) => void,

}

const SessionsConfigRow = ({name, number, time, handleChangeTime,handleChangeName }: ConfigRowProps) => {

  return (
    <tr>
      <td className="flex justify-center"><b>{number}</b></td>
      <td >
        <div className="input-field table-input">
          <input
            className="input input-bordered input-md w-full"
            id={`session-${number}-time`}
            defaultValue={name}
            type="text"
            autoComplete="off"
            onChange={(e) => handleChangeName(Number(number), e.target.value)}
          />
        </div>
      </td>

      
      <td className="table-input">
        <div className="input-field table-input">
          <input
            className="input input-bordered input-md w-full"
            id={`session-${number}-time`}
            defaultValue={time}
            type="text"
            autoComplete="off"
            onChange={(e) => handleChangetTime(Number(number), e.target.value)}
          />
          
        </div>
      </td>
    </tr>
  )
}

type ScheduleConfigProps = {
  db: Firestore,
}

const ScheduleConfig = ({ db }: ScheduleConfigProps) => {
  const [numberSessionState, setNumberSessionState] = useState<number>(1);
  const [sessionTimesState, setSessionTimesState] = useState<string[]>([]);

  const [sessionsArray, setSessionsArray] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  ///
  const [sessionNameState, setSessionNameState] = useState<string[]>([]);
  const updateConfig = async (db: Firestore) => {
    setLoading(true);
    const numberSessionsSetting = await getNumberSessions(db);
    const sessionTimesSetting = await getSessionTimes(db);
    //you are added
  const sessionNameSetting =await getSessionNames(db);
    setSessionNameState(sessionNameSetting);
    setNumberSessionState(numberSessionsSetting);
    setSessionTimesState(sessionTimesSetting);
    //added this
    setLoading(false);
  }

  useEffect(() => {
    updateConfig(db);
  }, [db]);

  useEffect(() => {
    const newArr = numberToArrayOfStrings(numberSessionState);
    setSessionsArray(newArr);
  }, [numberSessionState]);

  const handleChangeSessions = async (change: "add" | "remove") => {
    if (change === "add") {
      setNumberSessions(db, numberSessionState + 1)
      setNumberSessionState(numberSessionState + 1)

    } else if (change === "remove") {
      if (numberSessionState > 1) {
        setNumberSessions(db, numberSessionState - 1)
        setNumberSessionState(numberSessionState - 1)
      }
    }
  }

  const handleChangeTime = async (session: number, time: string) => {
    const n = session - 1
    const timesCopy = sessionTimesState
    // Make sure the Array is long enough to contain the index
    if (timesCopy[n]) {
      timesCopy[n] = time
      setSessionTimes(db, timesCopy)
      setSessionTimesState(timesCopy)
    } else {
      for (let i = 0; i < n; i++) {
        timesCopy[i] = timesCopy[i] ?? ""
      }
      timesCopy[n] = time
      setSessionTimes(db, timesCopy)
      setSessionTimesState(timesCopy)
    }

  }
  // handle name change
  const handleChangeName = async (session: number, name: string) => {
    const n = session - 1
    const nameCopy = sessionNameState
    // Make sure the Array is long enough to contain the index
    if (nameCopy[n]) {
      nameCopy[n] = name
      setSessionNames(db, nameCopy)
      setSessionNameState(nameCopy)
    } else {
      for (let i = 0; i < n; i++) {
        nameCopy[i] = nameCopy[i] ?? ""
      }
      nameCopy[n] = name
      setSessionNames(db, nameCopy)
      setSessionNameState(nameCopy)
    }

  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="prose">
      <h1>
        Configure Schedule
      </h1>

      <hr className="my-4" />

      <h2 className="mb-2">Number of Sessions</h2>
      <div className="join">
        <button
          className="btn join-item"
          onClick={() => handleChangeSessions("remove")}
        >
          <Minus />
        </button>
        <span
          className="join-item px-6 text-2xl"
          style={{
            position: "relative",
            lineHeight: 2,
          }}
        >
          {numberSessionState}
        </span>
        <button
          className="btn join-item"
          onClick={() => handleChangeSessions("add")}
        >
          <Add />
        </button>

      </div>
          <div style={{width:"50%", margin:20}}>
             <input 
        
            className="input input-bordered input-md w-full"
            defaultValue="test"
            type="text"
            autoComplete="off"/>
          </div>
      <h2 className="mt-6">Session Times</h2>
      <div>
        <table className="centered highlight">
          <thead>
            <tr>
              <th>Session</th>
              <th>name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sessionsArray.map(s => (
              <SessionsConfigRow
                name={sessionNameState[Number(s) - 1]}
                number={Number(s)}
                time={sessionTimesState[Number(s) - 1]}
                handleChangeTime={handleChangeTime}
                handleChangeName={handleChangeName}
                key={`table-row-session-${s}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ScheduleConfig

