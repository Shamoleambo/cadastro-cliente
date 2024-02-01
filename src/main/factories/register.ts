import { RegisterController } from '../../presentation/controller/register/register'
import { CpfValidator } from '../../presentation/utils/cpf-validator'
import { DbAddClient } from '../../data/usecases/addClient/db-add-client'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'

export const makeRegisterController = (): RegisterController => {
  const clientRepository = new ClientMongoRepository()
  const dbAddClient = new DbAddClient(clientRepository)
  const cpfValidator = new CpfValidator()
  return new RegisterController(cpfValidator, dbAddClient)
}
