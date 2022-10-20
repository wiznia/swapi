import { useState } from 'react';
import Resident from '../Resident/Resident';
import styles from '../../styles/Planet.module.css'

export default function Planet(props) {
  const [showResidents, setShowResidents] = useState(false);
  const { name, climate, population, terrain, url } = props.planet;
  const filtered = props.residents.filter(resident => {
    return resident.homeworld === url;
  });

  return (
    <li className={styles.planet} key={name}>
      <h2>{name}</h2>
      <p>Climate: {climate}</p>
      <p>Population: {population}</p>
      <p>Terrain: {terrain}</p>
      {
        filtered.length > 0 &&
          <>
            <p>List of residents:</p>
            <button onClick={() => setShowResidents(!showResidents)}>{!showResidents ? '+ (Click to expand)' : '- (Click to hide)'}</button>
            {
              showResidents &&
                filtered.map(resident => <Resident key={resident.name} resident={resident} />)
            }
          </>
      }
    </li>
  )
}
