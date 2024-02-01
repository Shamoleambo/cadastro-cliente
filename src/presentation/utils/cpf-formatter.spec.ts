import { CpfFormatter } from './cpf-formatter'

describe('CpfFormatter', () => {
  test('should return the received cpf if it is not masked', () => {
    const sut = new CpfFormatter()
    const cpf = '11111111111'
    const formattedCpf = sut.format(cpf)

    expect(formattedCpf).toBe('11111111111')
  })
})
