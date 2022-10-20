import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css'

export async function getServerSideProps(context) {
  const res = await fetch(`https://swapi.dev/api/people/${context.params.id}`);
  const data = await res.json();

  if (data.detail === 'Not found') {
    return {
      notFound: true,
    }
  }

  return { props: { person: data } }
}

function PersonPage({ person }) {
  const { name, height, mass, homeworld } = person;
  const [world, setWorld] = useState([]);
  const planetUrl = parseInt(homeworld.split('/')[5]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(homeworld);
      const data = await response.json();

      setWorld(data);
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <h2>{name}</h2>
      <p>Height: {height !== 'unknown' ? `${height} cm` : 'unknown' }</p>
      <p>Mass: {mass !== 'unknown' ? `${mass} kg` : 'unknown'}</p>
      {
        world.name &&
          <>
            <p>Homeworld:</p>
            <Link href={`/planet/${planetUrl}`}>{world.name}</Link>
          </>
      }
    </main>
  );
}

export default PersonPage;
