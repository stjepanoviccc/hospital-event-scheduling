import { useState, useEffect } from "react";
import { Event } from "../../../models/Event";
import { EventStatus } from "../../../models/enums/EventStatus";
import { findAllEventsByPatient } from "../../../services/eventService";
import { toast } from "react-toastify";
import { handleCustomError } from "../../../services/customErrorService/errorService";

const PatientEventList = () => {
  const [groupedEvents, setGroupedEvents] = useState<{
    PENDING: Event[];
    APPROVED: Event[];
    REJECTED: Event[];
  }>({ PENDING: [], APPROVED: [], REJECTED: [] });

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await findAllEventsByPatient();
        setGroupedEvents(response);
      } catch (error) {
        const errorMsg = handleCustomError(error);
        toast.error(errorMsg);
      }
    };

    getEvents();
  }, []);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-th">Doctor</th>
            <th className="table-th">Start Time</th>
            <th className="table-th">End Time</th>
            <th className="table-th">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(groupedEvents).every((group) => group.length === 0) ? (
            <tr>
              <td colSpan={4} className="text-left py-4">
                <p className="text-secondaryColor px-4">No events available</p>
              </td>
            </tr>
          ) : (
            <>
              {Object.entries(groupedEvents).map(
                ([status, eventsForStatus]) => {
                  const eventStatus = status as EventStatus;

                  return (
                    eventsForStatus.length > 0 && (
                      <>
                        <tr>
                          <td
                            colSpan={4}
                            className="text-primaryColor font-bold py-4 px-4"
                          >
                            {eventStatus === EventStatus.PENDING
                              ? "Pending Events"
                              : eventStatus === EventStatus.APPROVED
                              ? "Approved Events"
                              : "Rejected Events"}
                          </td>
                        </tr>
                        {eventsForStatus.map((event) => (
                          <tr key={event._id} className="border-b">
                            <td className="px-4 py-2">
                              {event.slot?.doctor?.firstName} {event.slot?.doctor?.lastName}
                            </td>
                            <td className="px-4 py-2">
                              {new Date(event.slot.startTime).toLocaleString()}
                            </td>
                            <td className="px-4 py-2">
                              {new Date(event.slot.endTime).toLocaleString()}
                            </td>
                            <td className="px-4 py-2">
                              <span
                                className={`px-4 py-1 rounded-full ${
                                  event.status === EventStatus.PENDING
                                    ? "bg-yellow-200 text-yellow-700"
                                    : event.status === EventStatus.APPROVED
                                    ? "bg-green-200 text-green-700"
                                    : "bg-red-200 text-red-700"
                                }`}
                              >
                                {event.status === EventStatus.PENDING
                                  ? "Pending"
                                  : event.status === EventStatus.APPROVED
                                  ? "Approved"
                                  : "Rejected"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )
                  );
                }
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientEventList;
