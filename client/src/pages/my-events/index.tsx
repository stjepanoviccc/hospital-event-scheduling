import Wrap from "../../components/layout/wrap";
import PatientEventList from "../../components/events/patientEventList";
import DoctorEventList from "../../components/events/doctorEventList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserRole } from "../../models/enums/UserRole";

const MyEvents = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="bg-gray-100">
        <Wrap className="flex flex-col gap-y-4 py-12">
          <h1 className="h1 text-primaryColor">My Events</h1>
          { role == UserRole.DOCTOR ? (
            <DoctorEventList />
          ) : role == UserRole.PATIENT ? (
            <PatientEventList />
          ) : 
          (
            <p className="text-dangerColor">Invalid role.</p>
          )}
        </Wrap>
      </div>
    </>
  );
};

export default MyEvents;
