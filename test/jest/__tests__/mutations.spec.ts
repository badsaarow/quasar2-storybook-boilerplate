import mutations from '../../../src/store/module-user/mutations'

const { setLogin, setLogout } = mutations

describe('mutation', () => {
  it('Login', () => {
    const state = { isLogin: false }
    setLogin(state)
    expect(state.isLogin).toBe(true)
  })

  it('Logout', () => {
    const state = { isLogin: true }
    setLogout(state)
    expect(state.isLogin).toBe(false)
  })
})
