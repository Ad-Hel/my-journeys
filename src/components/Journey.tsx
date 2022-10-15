export interface VehicleJourney {
  codes: {
    type: string;
    value: string;
  }[];
  name: string;
  calendars: {
    active_periods: {
      begin: string;
      end: string;
    }[];
  }[];
  stop_times: {
    stop_point: {
      name: string;
    };
    arrival_time: string;
  }[];
  id: string;
}

const Journey = (journey: VehicleJourney) => {
  const formatTime = (time: string) => {
    const hours = time.slice(0, 2);
    const minutes = time.slice(2, 4);
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: string) => {
    const month = date.slice(4, 6);
    const day = date.slice(-2);
    return `${day}/${month}`;
  };

  return (
    <details
      key={journey.id}
      className="border border-2 border-grey p-4 rounded-xl my-2"
    >
      <summary className=" marker:hidden list-none cursor-pointer">
        <h2 className="inline">
          <span className="font-bold">
            {formatDate(journey.calendars[0].active_periods[0].begin)} :{" "}
          </span>
          {journey.stop_times[0].stop_point.name} -{" "}
          {journey.stop_times[journey.stop_times.length - 1].stop_point.name}
        </h2>
      </summary>
      <ul className="mt-4 mb-2">
        {journey.stop_times.map((stop) => (
          <li key={stop.stop_point.name} className="mb-2">
            {stop.stop_point.name} - {formatTime(stop.arrival_time)}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Journey;
