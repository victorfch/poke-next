import Link from "next/link"

const Pokemon = ({poke}) => {
	const id = poke.url.split("/").filter(x => x).pop()
	return (
		<li>
			<Link href={`/pokemon/${id}`}>{poke.name}</Link>
		</li>
	)
}

export default function Home({pokemons}) {
  return (
    <div>
			<h1 data-testid="title">Mi App de Pokemons</h1>
			{pokemons.map(poke => <Pokemon poke={poke} key={poke.name} /> )}
    </div>
  )
}

export const getStaticProps = async() => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
	const data = await response.json()

	return {
		props: {pokemons: data.results}
	}
} 
