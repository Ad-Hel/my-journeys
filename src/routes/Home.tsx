import journeysJson from '../assets/journeys.json'

const Home = () => {

    const journeys = journeysJson.vehicle_journeys.sort((a, b) => 
        parseInt(a.calendars[0].active_periods[0].begin, 10) - parseInt(b.calendars[0].active_periods[0].begin, 10)
    )

    
    const formatTime = (time: string) => {
        const hours = time.slice(0,2)
        const minutes = time.slice(2,4)
        return `${hours}:${minutes}`
    }

    return (
        <>
        <h1>Prochains trajets</h1>
        {journeys.length > 0 && journeys.map((journey)=>(
            <details key={journey.id}>
                <summary>{journey.name} : {journey.stop_times[0].stop_point.name} - {journey.stop_times[journey.stop_times.length - 1].stop_point.name}</summary>
                <ul>
                    {journey.stop_times.map((stop => (
                        <li key={stop.stop_point.name}>
                            {stop.stop_point.name} - {formatTime(stop.arrival_time)}
                        </li>
                    )))}
                </ul>
            </details>
        ))}
        </>
    )
}

export default Home