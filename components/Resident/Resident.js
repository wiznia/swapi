import Link from 'next/link';

export default function Resident(props) {
  const personId = parseInt(props.resident.url.split('/')[5]);

  return (
    <>
      <Link key={props.resident.name} href={`/person/${personId}`}>
        {props.resident.name}
      </Link>
    </>
  )
}
