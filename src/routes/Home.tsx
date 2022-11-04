import Journey from "../components/Journey";
import Layout from "../components/Layout";
import { VehicleJourney } from "../components/Journey";
import { Link } from "react-router-dom";
import useJourneys from "../hooks/useJourneys";
import usePlannedJourneys from "../hooks/usePlannedJourneys";

const Home = () => {
  const {plannedJourneys, isJsonLoading } = usePlannedJourneys()

  const  {isLoading, journeys} = useJourneys({plannedJourneys})
  console.log(isLoading)

  return (
    <Layout>
      <Link to="/query-gen">
        <h1 className="text-xl font-bold mb-4">Prochains trajets</h1>
      </Link>
      { (isLoading || isJsonLoading) && <p>Chargement...</p> }
      {journeys.length > 0 &&
        journeys.map((journey: VehicleJourney) => (
          <Journey key={journey.id} journey={journey} />
        ))}
    </Layout>
  );
};

export default Home;
