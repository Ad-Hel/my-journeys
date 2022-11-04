import { useQuery } from "@tanstack/react-query";
import { VehicleJourney } from "../components/Journey";
import getJourneys from "../helper/getJourney";
import { JourneyStored } from "../routes/QueryGen";

interface Props {
  plannedJourneys: JourneyStored[];
}

const useJourneys = ({ plannedJourneys }: Props) => {
  const { data, isLoading, isSuccess } = useQuery(
    ["journeys", plannedJourneys],
    async () => await getJourneys(plannedJourneys)
  );

  const sorted =
    isSuccess &&
    data.vehicle_journeys.sort(
      (a: VehicleJourney, b: VehicleJourney) =>
        parseInt(a.calendars[0].active_periods[0].begin, 10) -
        parseInt(b.calendars[0].active_periods[0].begin, 10)
    );
  return { journeys: sorted, isLoading, isSuccess };
};

export default useJourneys;
