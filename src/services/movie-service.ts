import { moduleNames } from '../store'
import { mutationNames } from '../store/module-movie'
import { Commit } from 'vuex'
import * as tmdbClient from '../api-clients/tmdb-client'

export const getMovieAsync = async (commit: Commit, id: string): Promise<void> => {
  commit(`${moduleNames.movie}/${mutationNames.loadStarted}`)

  const result = await tmdbClient.loadMovieAsync(id)

  commit(`${moduleNames.movie}/${mutationNames.loadCompleted}`, {
    data: result,
  })
}
