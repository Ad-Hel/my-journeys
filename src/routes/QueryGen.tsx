import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

interface JourneyForm {
  headsign: number;
  date: string;
}

export interface JourneyStored {
  headsign: string;
  date: string;
  slug: string;
}
const isoDate = (date: string) => date.split("-").join("");
const slug = (isoDate: string, headsign: number) => `${isoDate}${headsign}`;
const newJourney = ({ date, headsign }: JourneyForm) => ({
  headsign: headsign.toString(),
  date: isoDate(date),
  slug: slug(isoDate(date), headsign),
});

const QueryGen = () => {
  const [journeys, setJourneys] = useState<JourneyStored[]>([]);
  const { register, handleSubmit, reset } = useForm<JourneyForm>();

  const onSubmit: SubmitHandler<JourneyForm> = (data) => {
    const newJourneys = journeys;
    const journey = newJourney(data);
    newJourneys.push(journey);

    setJourneys(newJourneys);

    reset();
  };

  const deleteJourney = (deletedJourneySlug: string) => {
    const newJourneys = journeys.filter(
      (journey) => journey.slug !== deletedJourneySlug
    );
    setJourneys(newJourneys);
  };

  const setNextMonthJourneys = () => {
    let diff = 1;
    const defaultJourneys = [];
    while (diff < 30) {
      let journey = null;
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + diff);
      switch (nextDate.getDay()) {
        case 1:
          journey = newJourney({
            date: nextDate.toISOString().split("T")[0],
            headsign: 8802,
          });
          break;
        case 3:
          journey = newJourney({
            date: nextDate.toISOString().split("T")[0],
            headsign: 8931,
          });
          break;
        case 4:
          journey = newJourney({
            date: nextDate.toISOString().split("T")[0],
            headsign: 8818,
          });
          break;
      }
      if (journey) {
        defaultJourneys.push(journey);
      }
      diff += 1;
    }
    setJourneys(defaultJourneys);
  };

  return (
    <Layout>
      <Link to="/">
        <h1>Query Generator</h1>
      </Link>
      <button onClick={() => setNextMonthJourneys()}>
        Charger prochain mois
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 my-4"
      >
        <input
          type="number"
          min="1111"
          max="9999"
          defaultValue="8080"
          {...register("headsign")}
        />
        <input type="date" {...register("date")} />
        <input
          className="border-2 border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-800 cursor-pointer"
          type="submit"
        />
      </form>
      {journeys.length > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start">N°</th>
              <th className="text-start">date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {journeys.map((journey: JourneyStored) => (
              <tr className="hover:bg-gray-600" key={journey.slug}>
                <td>{journey.headsign}</td>
                <td>{journey.date.slice(4, 8)}</td>
                <td className="flex justify-end">
                  <button onClick={() => deleteJourney(journey.slug)}>
                    supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {journeys.length > 0 && <p>{JSON.stringify(journeys)}</p>}
    </Layout>
  );
};

export default QueryGen;
