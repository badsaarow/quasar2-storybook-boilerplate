import { sleepAsync } from '../utils'

// put your own tmdb access token here to make the app work.
// you can register and get one here: https://www.themoviedb.org/signup
const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTMxNGRhMzMzMTgzNDI1Zjk2ZmVjYzAzNDJiMDI3NSIsInN1YiI6IjYwYmYxMDk2MGJjNTI5MDA2ZjI5YjYwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u6HxKbJHwg8kBvsURIHePrJpKGJXCKV9V8onBXJTWTE'

const baseUrl = 'https://api.themoviedb.org/3'
const authHeader = {
  Authorization: `Bearer ${accessToken}`,
}

const searchAsync = async (query: string): Promise<any> => {
  await sleepAsync(500)
  const url = `${baseUrl}/search/multi?query=${query}`
  const res = await fetch(url, {
    headers: { ...authHeader },
  })
  const responseData = res.json()
  return responseData
}

const loadMovieAsync = async (id: string): Promise<any> => {
  await sleepAsync(500)
  const url = `${baseUrl}/movie/${id}`
  const res = await fetch(url, {
    headers: { ...authHeader },
  })
  const responseData = res.json()
  return responseData
}

const loadPersonAsync = async (id: string): Promise<any> => {
  await sleepAsync(500)
  const url = `${baseUrl}/person/${id}`
  const res = await fetch(url, {
    headers: { ...authHeader },
  })
  const responseData = res.json()
  return responseData
}

export { searchAsync, loadMovieAsync, loadPersonAsync }
