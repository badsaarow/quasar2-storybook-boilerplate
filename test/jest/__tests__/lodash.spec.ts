import _ from 'lodash'

describe('Test lodash', () => {
  it('lodash random', () => {
    expect(_.random(10)).toBeLessThanOrEqual(11)
  })

  it('lodash map', () => {
    const square = (n: number): number => {
      return n * n
    }

    expect(_.map([4, 8], square)).toStrictEqual([16, 64])
  })
})
