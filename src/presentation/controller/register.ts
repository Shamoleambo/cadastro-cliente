export class RegisterController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Invalid Name')
    }
  }
}
