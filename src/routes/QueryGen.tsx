import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface JourneyForm {
  headsign: number;
  date: string;
}

interface JourneyStored extends JourneyForm {
  slug: string
}

const QueryGen = () => {
  const [journeys, setJourneys] = useState<JourneyStored[]>([])
  const { register, handleSubmit, reset } = useForm<JourneyForm>();
  const onSubmit: SubmitHandler<JourneyForm> = (data) => {
    const newJourneys = journeys
    const isoDate = data.date.split('-').join('')
    const slug = `${isoDate}${data.headsign}`
    const newJourney = {
      headsign: data.headsign,
      date: isoDate,
      slug: slug,
    }
    newJourneys.push(newJourney)
    setJourneys(newJourneys)
    reset()
  };

  const makeSingleQuery = (form: JourneyStored) => {
    const query = `vehicle_journey.has_headsign(${form.headsign}) and vehicle_journey.between(${form.date}T000000Z,${form.date}T235959Z,realtime)`;
    return query;
  };

  const makeQuery = () => {
    const queries: string[] = []
    journeys.map((journey)=> {
      queries.push(makeSingleQuery(journey))
    })
    const queriesString = queries.join(' or ')
    return `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys?filter=${queriesString}`
  }

  const deleteJourney = (deletedJourneySlug: string) => {
    const newJourneys = journeys.filter(journey => journey.slug !== deletedJourneySlug)
    setJourneys(newJourneys)
  }

  return (
    <>
      <h1>Query Generator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          min="1111"
          max="9999"
          defaultValue="8080"
          {...register("headsign")}
        />
        <input type="date" {...register("date")} />
        <input type="submit" />
      </form>
      {journeys.length > 0 && 
      <table>
        <tbody>
          {journeys.map((journey: JourneyStored) => (
            <tr key={journey.slug}>
              <td>{journey.headsign}</td>
              <td>{journey.date}</td>
              <td><button onClick={() => deleteJourney(journey.slug)}>supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      }
      {journeys.length > 0 && <p>
        {makeQuery()}
      </p>
      }
    </>
  );
};

export default QueryGen;
