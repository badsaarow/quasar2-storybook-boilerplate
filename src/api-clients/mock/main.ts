import createMockServer from './index'

if (process.env.NODE_ENV === 'development') {
  createMockServer()
}
