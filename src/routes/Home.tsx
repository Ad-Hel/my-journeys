import { useEffect, useState } from "react";
import plannedJourneys from "../assets/plannedJourneys.json";
import Journey from "../components/Journey";
import Layout from "../components/Layout";
import { VehicleJourney } from "../components/Journey";
import { Link } from "react-router-dom";
interface QueryJourney {
  headsign: string;
  date: string;
  slug: string;
}

const makeSingleQuery = (journey: QueryJourney) => {
  const query = `vehicle_journey.has_headsign(${journey.headsign}) and vehicle_journey.between(${journey.date}T000000Z,${journey.date}T235959Z,realtime)`;
  return query;
};

const makeQuery = (journeys: QueryJourney[]) => {
  const queries: string[] = [];
  journeys.forEach((journey) => {
    queries.push(makeSingleQuery(journey));
  });
  const queriesString = queries.join(" or ");
  return queriesString;
};

const getJourneys = async (plannedJourneys: QueryJourney[]) => {
  const payload = {
    trains: makeQuery(plannedJourneys)
  } 
  console.log(`payload: ${JSON.stringify(payload)}`)
  const headers = new Headers({
    "Content-Type": "application/json"
  })
  const init = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  }
  try {
    const response = await fetch('https://europe-west3-my-journeys-365118.cloudfunctions.net/get-journeys', init)
    const data = await response.json()
    return data
  } catch(error){
    console.log(error)
    return null
  }
}



const Home = () => {
  const [journeys, setJourneys] = useState([])

  useEffect(()=>{
    const fetchJourneys = async() => {
      const res = await getJourneys(plannedJourneys)
      const sorted = res.vehicle_journeys.sort(
             (a: VehicleJourney, b: VehicleJourney) =>
               parseInt(a.calendars[0].active_periods[0].begin, 10) -
               parseInt(b.calendars[0].active_periods[0].begin, 10)
               )
      setJourneys(sorted)
    };
    fetchJourneys()
  }, [])

  return (
    <Layout>
      <Link to="/query-gen">
        <h1 className="text-xl font-bold mb-4">Prochains trajets</h1>
      </Link>
      {journeys.length > 0 &&
        journeys.map((journey) => (
          // @ts-expect-error
          <Journey key={journey.id} journey={journey} />
        ))}
    </Layout>
  );
};

export default Home;
