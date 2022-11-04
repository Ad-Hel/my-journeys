import { useQuery } from "@tanstack/react-query"

const usePlannedJourneys = () => {
    const getPlannedJourneys = async () => { 
        const response = await fetch('my-journeys/data/plannedJourneys.json')
        return response.json()
    }
    const { data, isLoading, isSuccess} = useQuery(['planned-journeys'], async () => await getPlannedJourneys())

    return { plannedJourneys: data, isJsonLoading: isLoading, isJsonSuccess: isSuccess }

}

export default usePlannedJourneys