export interface QueryJourney {
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
    trains: makeQuery(plannedJourneys),
  };
  const headers = new Headers({
    "Content-Type": "application/json",
  });
  const init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  };

  const response = await fetch(
    "https://europe-west3-my-journeys-365118.cloudfunctions.net/get-journeys",
    init
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default getJourneys;
