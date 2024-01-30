import type { CpfValidator as CpfValidatorInterface } from '../protocols/cpf-validator'

export class CpfValidator implements CpfValidatorInterface {
  private checkDigit (cpfSlice: string[], digit: string): boolean {
    const multiplyArray = cpfSlice.length === 9 ? [10, 9, 8, 7, 6, 5, 4, 3, 2] : [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
    const productsArray = cpfSlice.map((digit, index) => +digit * multiplyArray[index])

    const sum = productsArray.reduce((acc, product) => {
      return acc + product
    }, 0)
    const remainder = sum % 11

    let correctDigit
    if (remainder < 2) {
      correctDigit = 0
    } else if (remainder >= 2) {
      correctDigit = 11 - remainder
    }

    if (+digit === correctDigit) return true
    else return false
  }

  checkValidity (cpf: string): boolean {
    const maskRegex = /^\d\d\d\.\d\d\d\.\d\d\d-\d\d$/
    const matchesMask = maskRegex.test(cpf)

    const numbersOnlyRegex = /^\d\d\d\d\d\d\d\d\d\d\d$/
    const matchesNumbersOnly = numbersOnlyRegex.test(cpf)
    if (!matchesMask && !matchesNumbersOnly) return false

    let completeCpfArray
    if (matchesMask) {
      completeCpfArray = cpf.split('.' || '-')
    } else if (matchesNumbersOnly) {
      completeCpfArray = cpf.split('')
    }

    const checkFirstDigitCpfArray = completeCpfArray.slice(0, completeCpfArray.length - 2)
    const firstDigitToVerificador = completeCpfArray[completeCpfArray.length - 2]

    const firstDigitIsValid = this.checkDigit(checkFirstDigitCpfArray, firstDigitToVerificador)
    if (!firstDigitIsValid) return false

    const checkSecondDigitCpfArray = completeCpfArray.slice(0, completeCpfArray.length - 1)
    const secondDigitToVerificador = completeCpfArray[completeCpfArray.length - 1]

    const secondDigitIsValid = this.checkDigit(checkSecondDigitCpfArray, secondDigitToVerificador)
    if (!secondDigitIsValid) return false

    return true
  }
}
