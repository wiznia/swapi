import Head from 'next/head'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Planet from '../components/Planet/Planet';

export async function getServerSideProps() {
  const fetchPlanets = async () => {
    let nextPage = 'https://swapi.dev/api/planets/';
    let planets = [];

    while (nextPage) {
      const res = await fetch(nextPage);
      const { next, results } = await res.json();

      nextPage = next;
      planets = [...planets, ...results];
    }
    return planets;
  };
  const fetchPeople = async () => {
    let nextPage = 'https://swapi.dev/api/people/';
    let people = [];

    while (nextPage) {
      const res = await fetch(nextPage);
      const { next, results } = await res.json();

      nextPage = next;
      people = [...people, ...results];
    }
    return people;
  };

  const planets = await fetchPlanets();
  const residents = await fetchPeople();

  return { props: { planets, residents } }
}

export default function Home(props) {
  const { planets, residents } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars - Planets</title>
        <meta name="description" content="Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.h1}>Planets</h1>
        <ul className={styles.ul}>
          {
            planets.length > 0 ? (
              planets.map(planet => {
                return (
                  <Planet key={planet.name} planet={planet} residents={residents} />
              );
            })
            ) : (
              <p>Loading...</p>
            )
          }
        </ul>
      </main>
    </div>
  )
}
