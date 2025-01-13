import { useEffect, useState } from "react";
import { findSlotsByDoctorIdAndByDate } from "../../../services/slotService";
import { handleCustomError } from "../../../services/customErrorService/errorService";
import { Slot } from "../../../models/Slot";
import { createEvent } from "../../../services/eventService";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";

const Slots = ({ doctorId }: { doctorId: string }) => {
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  const handleEventCreate = async (slotId: string) => {
    try {
      await createEvent(slotId);
      toast.success("Event created successfully!");
      setTriggerFetch((prev) => !prev);
    } catch (error) {
      const toastError = handleCustomError(error);
      setTriggerFetch((prev) => !prev);
      toast.error(toastError);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const getSlots = async (date: Date) => {
      try {
        const formattedDate = date.toISOString();
        const { availableSlots, bookedSlots } =
          await findSlotsByDoctorIdAndByDate(doctorId, formattedDate);

        setAvailableSlots(availableSlots);
        setBookedSlots(bookedSlots);
      } catch (error) {
        const errorMsg = handleCustomError(error);
        toast.error(errorMsg);
      }
    };

    getSlots(selectedDate!);
  }, [doctorId, selectedDate, triggerFetch]);

  return (
    <div className="mt-6">
      <h3 className="text-primaryColor font-bold pb-4">
        Available and Booked Slots
      </h3>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        minDate={new Date()}
        placeholderText="Select a date"
      />

      {selectedDate && (
        <div>
          <h4 className="text-primaryColor font-bold pt-6">
            Slots for {selectedDate.toLocaleDateString()}
          </h4>

          <div>
            <p className="text-primaryColor font-bold pt-6 pb-2">
              Available Slots
            </p>
            {availableSlots?.length === 0 ? (
              <p className="text-dangerColor">
                No available slots for the selected date
              </p>
            ) : (
              <ul>
                {availableSlots.map((slot) => (
                  <li
                    key={slot._id}
                    className="pt-2 flex items-center justify-between"
                  >
                    <span>
                      {new Date(slot.startTime).toLocaleString()} -{" "}
                      {new Date(slot.endTime).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleEventCreate(slot._id!)}
                      className="button button-primary ml-2"
                    >
                      Reserve Slot
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="text-primaryColor font-bold pt-6 pb-2">
              Booked Slots
            </p>
            {bookedSlots.length === 0 ? (
              <p className="text-dangerColor">
                No booked slots for the selected date
              </p>
            ) : (
              <ul>
                {bookedSlots.map((slot) => (
                  <li
                    key={slot._id}
                    className="pt-2 flex items-center justify-between"
                  >
                    <span>
                      {new Date(slot.startTime).toLocaleString()} -{" "}
                      {new Date(slot.endTime).toLocaleString()}
                    </span>
                    <span className="text-dangerColor">Booked</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slots;
