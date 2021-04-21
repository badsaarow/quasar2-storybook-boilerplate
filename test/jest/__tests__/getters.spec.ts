import { StateInterface } from '../../../src/store'
import getters from '../../../src/store/module-user/getters'

const { isLogin } = getters

describe('getters', () => {
  it('isLogin', () => {
    const state = { isLogin: true }
    const rootState: StateInterface = { user: state }

    const result = isLogin(state, {}, rootState, {})
    expect(result).toBe(true)
  })
})
