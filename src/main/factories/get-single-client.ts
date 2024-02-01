import { DbGetClient } from '../../data/usecases/getClient/db-get-client'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'
import { GetSingleClient } from '../../presentation/controller/getSingleClient/get-single-client'
import { CpfValidator } from '../../presentation/utils/cpf-validator'

export const makeGetSingleClientController = (): GetSingleClient => {
  const cpfValidator = new CpfValidator()
  const getClientRepository = new ClientMongoRepository()
  const getClient = new DbGetClient(getClientRepository)
  return new GetSingleClient(cpfValidator, getClient)
}
