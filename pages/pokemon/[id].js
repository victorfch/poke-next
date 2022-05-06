import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Pokemon = ({data}) => {
	const {isFallback} = useRouter()

	if (isFallback)
		return <p>Cargando</p>

	return (
		<div>
			<h1>{data.name} #{data.id}</h1>
			<Image src={data.sprites.front_default} alt={data.name} width={400} height={400} />
			<Link href="/">Volver al inicio</Link>
		</div>
	)
}

export default Pokemon

export const getStaticProps = async({params}) => {
	const {id} = params
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	const data = await res.json()

	return {props: {data}}
}

export const getStaticPaths = async() => {
	return {
		paths: [
			{params: {id: "1"}},
			{params: {id: "2"}},
			{params: {id: "3"}}
		],
		fallback: true
	}
}

/*
export const getServerSideProps = async({params}) => {
	const {id} = params
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
	const data = await res.json()

	return {props: {data}}
}
*/