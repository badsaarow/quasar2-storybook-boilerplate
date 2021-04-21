export interface UserStateInterface {
  isLogin: boolean
}

function state(): UserStateInterface {
  return {
    isLogin: false,
  }
}

export default state
