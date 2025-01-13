import { Slot } from "../../../models/Slot";
import { SlotStatus } from "../../../models/enums/SlotStatus";

interface SlotListProps {
  slots: Slot[];
  errorMsg: string;
}

const SlotList: React.FC<SlotListProps> = ({ slots, errorMsg }) => {
  const groupSlotsByDate = (slots: Slot[]) => {
    slots.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

    const grouped: { [key: string]: Slot[] } = {};

    slots.forEach((slot) => {
      const date = new Date(slot.startTime).toLocaleDateString();

      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(slot);
    });

    return grouped;
  };

  const groupedSlots = groupSlotsByDate(slots);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-th">Start Time</th>
            <th className="table-th">End Time</th>
            <th className="table-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedSlots).length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                {errorMsg ? <p className="text-dangerColor">{errorMsg}</p> : "No slots available"}
              </td>
            </tr>
          ) : (
            Object.keys(groupedSlots).map((date) => (
              <>
                <tr>
                  <td colSpan={3} className="text-primaryColor font-bold px-4 py-4">
                    {date}
                  </td>
                </tr>

                {groupedSlots[date].map((slot) => (
                  <tr key={slot._id} className="border-b">
                    <td className="px-4 py-2">
                      {new Date(slot.startTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(slot.endTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-4 py-1 rounded-full ${
                          slot.status === SlotStatus.FREE
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                      >
                        {slot.status === SlotStatus.FREE ? "Free" : "Booked"}
                      </span>
                    </td>
                  </tr>
                ))}
              </>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SlotList;