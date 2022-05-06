import {render, screen} from "@testing-library/react"
import Index, {getStaticProps} from '../pages/index'

describe("Pokemon index", () => {
	describe("Component", () => {
		it("se renderiza Home", () => {
			render(
				<Index pokemons={[]} />
			)

			/*
			const {getByTestId} = render(
				<Index pokemons={[]} />
			)
			*/

			const title = screen.getByText("Mi App de Pokemons")
			// const title = getByTestId("title")
			expect(title).toBeInTheDocument()
		})

		it("se renderiza pokemon", () => {
			render(
				<Index pokemons={[{name: "Chanchito triste", url: "pokemons/detalle/2"}]} />
			)

			const pokemon = screen.getByText("Chanchito triste")
			const url = pokemon.getAttribute("href")

			expect(url).toEqual("/pokemon/2")
		})

	})
	
	describe("getStaticProps", () => {
		it("return pokemon list", async() => {
			global.fetch = jest.fn()
				.mockImplementation((url) => {
					expect(url).toBe("https://pokeapi.co/api/v2/pokemon?limit=151")
					return new Promise(resolve => {
						resolve({
							json: () => Promise.resolve({
								results: [
									{name: "Chanchito feliz", url: "pokemons/detalle/1"},
									{name: "Chanchito triste", url: "pokemons/detalle/2"},
									{name: "Chanchito cansado", url: "pokemons/detalle/3"}
								]
							})
						})
					})
				})

			const {props} = await getStaticProps()
			expect(props.pokemons).toHaveLength(3)
		})
	})
})