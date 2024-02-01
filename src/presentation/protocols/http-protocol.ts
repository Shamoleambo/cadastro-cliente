export interface HttpRequest {
  body?: any
  pageQuery?: number
}

export interface HttpResponse {
  statusCode: number
  body: any
}
