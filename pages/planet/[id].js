import { useState, useEffect } from 'react';
import Planet from '../../components/Planet/Planet';
import Resident from '../../components/Resident/Resident';

export async function getServerSideProps(context) {
  const res = await fetch(`https://swapi.dev/api/planets/${context.params.id}`);
  const data = await res.json();

  if (data.detail === 'Not found') {
    return {
      notFound: true,
    }
  }

  return { props: { planet: data } }
}

function PlanetPage({ planet }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let nextPage = 'https://swapi.dev/api/people/';
      let people = [];

      while (nextPage) {
        const res = await fetch(nextPage);
        const { next, results } = await res.json();

        nextPage = next;
        people = [...people, ...results];
      }
      setResidents(people);
    };

    fetchData();
  }, []);
  return (
    <ul>
      <Planet key={planet.name} planet={planet} residents={residents} />
    </ul>
  );
}

export default PlanetPage;
