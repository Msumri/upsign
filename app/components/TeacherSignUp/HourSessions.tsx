import { Firestore } from "@firebase/firestore";
import { useState } from "react";
import { Session, UpsignUser } from "~/types";

import SessionEditor from "./SessionEditor";
import { addTeacherSession } from "~/services";

type HourSessionsParams = {
  db: Firestore,
  selectedDate: Date,
  hour: number,
  sessionTimes: string[] | null | undefined,
  sessionNames: string[] | null | undefined,
  sessions: Session[],
  user: UpsignUser,
  groupOptions: string[]
  hideAdd?: boolean,
  allStudents?: UpsignUser[]
}

const HourSessions = ({
  db,
  selectedDate,
  hour,
  sessionTimes,
  sessionNames,
  sessions,
  user,
  groupOptions,
  hideAdd,
  allStudents,
}: HourSessionsParams) => {
  const [sessionAdding, setSessionAdding] = useState<boolean>(false);

  const handleAddSession = () => {
    setSessionAdding(true);
    addTeacherSession(db, selectedDate, user, hour).then(() => {
      setSessionAdding(false);
    });
  }
  console.log(sessionNames)
  return (
    <div key={`session-${hour}-holder`} className="print:break-inside-avoid">
      <div className="prose">
        <h2 className="mt-4 mb-2">
          {(Array.isArray(sessionNames) && sessionNames.length > 0)
            ? sessionNames[hour - 1]
            : `session ${hour}`}
          <span className="ml-2 font-light opacity-80">
            {(Array.isArray(sessionTimes) && sessionTimes[hour - 1])
              ? `(${sessionTimes[hour - 1]})`
              : ''}
          </span>
        </h2>
      </div>
      <hr />

      {sessions?.sort((a, b) =>
        (a.created_at ?? new Date(0)) > (b.created_at ?? new Date(0))
          ? 1 : -1
      ).map((s, i) => {
        return (
          <div key={`teacher-card-${s.id}`} className="card teacher-card">
            <SessionEditor
              session={s}
              db={db}
              user={user}
              index={100 - parseInt(`${s.session}${i}`)}
              date={selectedDate}
              groupOptions={groupOptions}
              hasMultipleSessions={sessions.length > 1}
              allStudents={allStudents}
            />
          </div>
        )
      })}

      {!hideAdd && <button
        className="btn btn-ghost w-full print:hidden"
        onClick={handleAddSession}
        disabled={sessionAdding}
      >+ Add Session</button>}
    </div>
  )

}

export default HourSessions;

