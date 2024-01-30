import { CpfValidator } from './cpf-validator'

describe('CpfValidator', () => {
  test('should return false if masked cpf does not match masked pattern', () => {
    const sut = new CpfValidator()

    const invalidMaskedCpf = '12.3456.789-10'
    const isValid = sut.checkValidity(invalidMaskedCpf)
    expect(isValid).toBe(false)
  })

  test('should return false if numbers only cpf does not match pattern', () => {
    const sut = new CpfValidator()

    const invalidCpf = '1234567891'
    const isValid = sut.checkValidity(invalidCpf)
    expect(isValid).toBe(false)
  })

  test('should return false if first dígito verificador is incorrect', () => {
    const sut = new CpfValidator()

    const invalidCpf = '12345678910'
    const isValid = sut.checkValidity(invalidCpf)
    expect(isValid).toBe(false)
  })

  test('should return false if second dígito verificador is incorrect', () => {
    const sut = new CpfValidator()

    const invalidCpf = '12345678900'
    const isValid = sut.checkValidity(invalidCpf)
    expect(isValid).toBe(false)
  })
})
