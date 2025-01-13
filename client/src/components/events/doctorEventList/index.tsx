import { useState, useEffect } from "react";
import { Event } from "../../../models/Event";
import { EventStatus } from "../../../models/enums/EventStatus";
import { findAllEventsByDoctor } from "../../../services/eventService"; 
import { toast } from "react-toastify";
import { handleCustomError } from "../../../services/customErrorService/errorService";
import { updateEventStatus } from "../../../services/eventService";

const DoctorEventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false); 

  const groupedEvents = {
    PENDING: events.filter((event) => event.status === EventStatus.PENDING),
    APPROVED: events.filter((event) => event.status === EventStatus.APPROVED).sort((a, b) => new Date(a.slot.startTime).getTime() - new Date(b.slot.startTime).getTime()),
  };

  const handleUpdateStatus = async (eventId: string, newStatus: EventStatus) => {
    try {
      await updateEventStatus(eventId, newStatus); 
      setTriggerFetch(prev => !prev);
      toast.success(`Event status updated to ${newStatus}`);
    } catch (error) {
      const errorMsg = handleCustomError(error);
      toast.error(errorMsg);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await findAllEventsByDoctor(); 
        setEvents(response);
      } catch (error) {
        const errorMsg = handleCustomError(error);
        toast.error(errorMsg);
      }
    };
    
    fetchEvents();
  }, [triggerFetch]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="table-th">Patient</th>
            <th className="table-th">Start Time</th>
            <th className="table-th">End Time</th>
            <th className="table-th">Status</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>
        <tbody>
          {groupedEvents.PENDING.length > 0 && (
            <>
              <tr>
                <td colSpan={5} className="text-left font-bold text-yellow-600 font-bold px-4 py-4">
                  Pending Events
                </td>
              </tr>
              {groupedEvents.PENDING.map((event) => (
                <tr key={event._id} className="border-b">
                  <td className="px-4 py-2">{event.patient?.firstName} {event.patient?.lastName}</td>
                  <td className="px-4 py-2">{new Date(event.slot.startTime).toLocaleString()}</td>
                  <td className="px-4 py-2">{new Date(event.slot.endTime).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className="px-4 py-1 rounded-full bg-yellow-200 text-yellow-700">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-1 bg-green-500 text-white rounded mr-2"
                      onClick={() => handleUpdateStatus(event._id!, EventStatus.APPROVED)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleUpdateStatus(event._id!, EventStatus.REJECTED)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}

          {groupedEvents.APPROVED.length > 0 && (
            <>
              <tr>
                <td colSpan={5} className="text-left font-bold text-primaryColor font-bold px-4 py-4">
                  Approved Events
                </td>
              </tr>
              {groupedEvents.APPROVED.map((event) => (
                <tr key={event._id} className="border-b">
                  <td className="px-4 py-2">{event.patient?.firstName} {event.patient?.lastName}</td>
                  <td className="px-4 py-2">{new Date(event.slot.startTime).toLocaleString()}</td>
                  <td className="px-4 py-2">{new Date(event.slot.endTime).toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className="px-4 py-1 rounded-full bg-blue-200 text-blue-700">
                      Approved
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    -
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorEventList;
