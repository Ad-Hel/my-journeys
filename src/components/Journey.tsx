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
    stop_times: VehicleJourneyStop[];
    id: string;
  };

interface Props {
  journey: VehicleJourney
}

interface VehicleJourneyStop {
  stop_point: {
    name: string;
  };
  arrival_time: string;
}

const Journey = ({ journey }: Props) => {
  console.log(journey);
  const formatTime = (time: string) => {
    console.log(time)
    const hours = time.slice(0, 2);
    const minutes = time.slice(2, 4);
    return `${hours}:${minutes}`;
  };

  const formatDate = (date: string) => {
    const month = date.slice(4, 6);
    const day = date.slice(-2);
    return `${day}/${month}`;
  };

  interface DisplayedJourneyStop {
    name: string;
    arrival_time: string;
  }

  const makeDisplayedSteps = (stops: VehicleJourneyStop[]) => {
    const steps: DisplayedJourneyStop[] = [];
    stops.forEach((stop) => {
      steps.push({
        name: stop?.stop_point?.name,
        arrival_time: formatTime(stop?.arrival_time),
      });
    });
    return steps;
  };

  const displayedJourney = {
    date: formatDate(journey?.calendars[0]?.active_periods[0]?.begin),
    departure: journey?.stop_times[0]?.stop_point?.name,
    arrival:
      journey?.stop_times[journey.stop_times.length - 1]?.stop_point?.name,
    steps: makeDisplayedSteps(journey.stop_times),
  };

  return (
    <details className="border-2 border-grey p-4 rounded-xl my-2">
      <summary className=" marker:hidden list-none cursor-pointer">
        <h2 className="inline">
          <span className="font-bold">{displayedJourney.date} : </span>
          {displayedJourney.departure} - {displayedJourney.arrival}
        </h2>
      </summary>
      <ul className="mt-4 mb-2">
        {displayedJourney.steps.map((stop) => (
          <li key={stop?.name} className="mb-2">
            {stop?.name} - {stop?.arrival_time}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Journey;
