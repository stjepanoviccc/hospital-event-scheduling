import Wrap from "../../components/layout/wrap";
import DoctorList from "../../components/doctors/doctorList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserRole } from "../../models/enums/UserRole";

const AllDoctors = () => {
  const { role } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <div className="bg-gray-100">
        <Wrap className="flex flex-col gap-y-4 py-12">
          <h1 className="h1 text-primaryColor">All Doctors</h1>
          { role == UserRole.PATIENT && <DoctorList />}
        </Wrap>
      </div>
    </>
  );
};

export default AllDoctors;
