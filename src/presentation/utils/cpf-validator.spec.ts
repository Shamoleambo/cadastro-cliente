import { CpfValidator } from './cpf-validator'

describe('CpfValidator', () => {
  test('should return false if masked cpf does not match masked patterns', () => {
    const sut = new CpfValidator()

    const invalidMaskedCpf = '12.3456.789-10'
    const isValid = sut.checkValidity(invalidMaskedCpf)
    expect(isValid).toBe(false)
  })
})
