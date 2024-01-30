import type { CpfValidator as CpfValidatorInterface } from '../protocols/cpf-validator'

export class CpfValidator implements CpfValidatorInterface {
  checkValidity (cpf: string): boolean {
    const maskRegex = /\d\d\d\.\d\d\d\.\d\d\d-\d\d/
    const matchesMask = maskRegex.test(cpf)
    if (!matchesMask) return false
  }
}
