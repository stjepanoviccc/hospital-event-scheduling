import { useState } from "react";
import { validateSlot } from "../../../../utils/validators/slotValidator";
import { createSlot } from "../../../../services/slotService";
import { handleCustomError } from "../../../../services/customErrorService/errorService";
import { SlotStatus } from "../../../../models/enums/SlotStatus";
import { Slot } from "../../../../models/Slot";
import Button from "../../../ui/button";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CreateSlotFormProps {
  addNewSlot: (newSlot: Slot) => void;
}

const CreateSlotForm: React.FC<CreateSlotFormProps> = ({ addNewSlot }) => {
  const [formData, setFormData] = useState<Slot>({
    startTime: new Date(),
    endTime: new Date(),
    status: SlotStatus.FREE,
    doctor: null,
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const isFormValid =
    formData.startTime &&
    formData.endTime &&
    new Date(formData.startTime) < new Date(formData.endTime) &&
    Object.keys(validationErrors).length === 0;

  const handleDateChange = (date: Date, field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: date,
    }));
    setErrorMsg("");
    setValidationErrors({});
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateSlot(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const slotData = {
        doctor: null,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        status: formData.status,
      };

      const newSlot = await createSlot(slotData);
      
      addNewSlot(newSlot)

      setFormData({
        startTime: new Date(),
        endTime: new Date(),
        status: SlotStatus.FREE,
      });
      setErrorMsg("");
      toast.success("Slot successfully created!");
    } catch (error) {
      const errorMsg = handleCustomError(error);
      setErrorMsg(errorMsg);
    }
  };

  return (
    <form onSubmit={handleCreateSlot} className="flex flex-col gap-y-6">
      <div className="w-full">
        <label htmlFor="startTime" className="text-secondaryColor mr-2">
          Start Time:{" "}
        </label>
        <DatePicker
          selected={formData.startTime}
          onChange={(date) => handleDateChange(date!, "startTime")}
          showTimeSelect
          timeFormat="h:mm aa"
          timeIntervals={15}
          dateFormat="Pp"
          className="input"
          placeholderText="Start Time"
        />
        {validationErrors.startTime && (
          <p className="text-dangerColor">{validationErrors.startTime}</p>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="endTime" className="text-secondaryColor mr-2">
          End Time:{" "}
        </label>
        <DatePicker
          selected={formData.endTime}
          onChange={(date) => handleDateChange(date!, "endTime")}
          showTimeSelect
          timeFormat="h:mm aa"
          timeIntervals={15}
          dateFormat="Pp"
          className="input"
          placeholderText="End Time"
        />
        {validationErrors.endTime && (
          <p className="text-dangerColor">{validationErrors.endTime}</p>
        )}
        {validationErrors.time && (
          <p className="text-dangerColor">{validationErrors.time}</p>
        )}
      </div>

      {Object.keys(validationErrors).length === 0 && errorMsg && (
        <p className="text-dangerColor">{errorMsg}</p>
      )}

      <div>
        <Button
          className={` button-primary ${
            !isFormValid && "opacity-50 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Add Slot
        </Button>
      </div>
    </form>
  );
};

export default CreateSlotForm;
