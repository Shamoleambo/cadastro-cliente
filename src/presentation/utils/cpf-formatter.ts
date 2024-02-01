export class CpfFormatter {
  format (cpf: string): string {
    const maskedFormat = /^\d\d\d\.\d\d\d\.\d\d\d-\d\d$/
    const matchMaskedFormat = maskedFormat.test(cpf)
    if (!matchMaskedFormat) return cpf
  }
}
