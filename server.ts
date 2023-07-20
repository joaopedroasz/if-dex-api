import axios from 'axios'
import express, { json } from 'express'
import ColorThief from 'colorthief'

import colors from './colors.json'

function getPokemonImage(id: string | number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
}

const app = express()
const port = 3000

app.use(json())

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})


app.get('/pokedex', async (req, res) => {
  const pokemon = await api.get('/pokemon')
  const results = [];
  for await (const item of pokemon.data.results) {
    const id = item.url.split('/')[6]
    const image = getPokemonImage(id)
    const mainColor = colors[id]
    results.push({
      id,
      name: item.name,
      image,
      mainColor,
    })
  }

  res.status(200).json(results)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})