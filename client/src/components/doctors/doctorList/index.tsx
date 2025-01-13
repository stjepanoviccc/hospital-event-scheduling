import { useEffect, useState } from "react";
import { findAllDoctors } from "../../../services/doctorService";
import { handleCustomError } from "../../../services/customErrorService/errorService";
import { Doctor } from "../../../models/Doctor";
import Slots from "./Slots";

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getDoctors = async () => {
    try {
      const doctorsList = await findAllDoctors();
      setDoctors(doctorsList);
    } catch (error) {
      const errorMsg = handleCustomError(error);
      setErrorMsg(errorMsg);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="text-left border-b">
            <th className="table-th">First Name</th>
            <th className="table-th">Last Name</th>
            <th className="table-th">Email</th>
            <th className="table-th">Reserve Slot</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                {errorMsg ? (
                  <p className="text-dangerColor">{errorMsg}</p>
                ) : (
                  "No doctors available"
                )}
              </td>
            </tr>
          ) : (
            doctors.map((doctor) => (
              <tr key={doctor._id} className="border-b">
                <td className="px-4 py-2">{doctor.firstName}</td>
                <td className="px-4 py-2">{doctor.lastName}</td>
                <td className="px-4 py-2">{doctor.email}</td>
                <td className="px-4 py-2">
                  <button
                    className="button button-primary"
                    onClick={() => setSelectedDoctorId(doctor._id)}
                  >
                    Check Available Slots
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedDoctorId && (
        <Slots doctorId={selectedDoctorId} />
      )}
    </div>
  );
};

export default DoctorList;
