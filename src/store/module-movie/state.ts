export interface MovieStateInterface {
  isLoadInProgress: boolean
  data: any
}

function state(): MovieStateInterface {
  return {
    isLoadInProgress: false,
    data: {},
  }
}

export default state
