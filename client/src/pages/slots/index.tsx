import { useEffect, useState } from "react";
import Wrap from "../../components/layout/wrap";
import CreateSlotForm from "../../components/forms/slots/create";
import SlotList from "../../components/slots/slotList";
import { Slot } from "../../models/Slot";
import { findAllSlotsByDoctor } from "../../services/slotService";
import { handleCustomError } from "../../services/customErrorService/errorService";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserRole } from "../../models/enums/UserRole";

const Slots = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const addNewSlot = (slot: Slot) => {
    setSlots((prevSlots) => [...prevSlots, slot]);
  };

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const fetchedSlots = await findAllSlotsByDoctor();
        setSlots(fetchedSlots);
      } catch (error) {
        const errorMsg = handleCustomError(error);
        setErrorMsg(errorMsg);
      }
    };

    fetchSlots();
  }, []);

  return (
    <>
      {role == UserRole.DOCTOR ? (
        <>
          <div className="bg-gray-100">
            <Wrap className="flex flex-col gap-y-4 py-12">
              <h1 className="h1 text-primaryColor">Add New Slot</h1>
              <CreateSlotForm addNewSlot={addNewSlot} />
            </Wrap>
          </div>
          <div>
            <Wrap className="flex flex-col gap-y-4 py-12">
              <h2 className="h1 text-primaryColor">All Slots</h2>
              <SlotList slots={slots} errorMsg={errorMsg} />
            </Wrap>
          </div>
        </>
      ) : (
        <>
        <div className="bg-gray-100">
          <Wrap className="flex flex-col gap-4 py-12">
            <p className="text-dangerColor">You are not a doctor!</p>
          </Wrap>
        </div>
        </>
      )}
    </>
  );
};

export default Slots;
