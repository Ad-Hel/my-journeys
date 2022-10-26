import { useQuery } from '@tanstack/react-query'
import { VehicleJourney } from '../components/Journey'
import plannedJourneys from "../assets/plannedJourneys.json";
import getJourneys from '../helper.tsx/getJourney'


const useJourneys = () => {
    const { data, isLoading, isSuccess} = useQuery(['journeys', plannedJourneys], async () => await getJourneys(plannedJourneys))
    const sorted = isSuccess && data.vehicle_journeys.sort(
            (a: VehicleJourney, b: VehicleJourney) =>
              parseInt(a.calendars[0].active_periods[0].begin, 10) -
              parseInt(b.calendars[0].active_periods[0].begin, 10)
              )
    return { journeys: sorted, isLoading, isSuccess}
}

export default useJourneys