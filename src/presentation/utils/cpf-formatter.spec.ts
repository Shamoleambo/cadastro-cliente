import { CpfFormatter } from './cpf-formatter'

describe('CpfFormatter', () => {
  test('should return the received cpf if it is not masked', () => {
    const sut = new CpfFormatter()
    const cpf = '11111111111'
    const formattedCpf = sut.format(cpf)

    expect(formattedCpf).toBe('11111111111')
  })

  test('should return a formatted cpf if it is masked', () => {
    const sut = new CpfFormatter()
    const cpf = '111.111.111-11'
    const formattedCpf = sut.format(cpf)

    expect(formattedCpf).toBe('11111111111')
  })
})
