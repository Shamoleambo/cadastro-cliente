import { DbGetAllClients } from '../../data/usecases/getClients/db-get-clients'
import { ClientMongoRepository } from '../../infra/db/mongodb/client-repository/client'
import { GetAllClients } from '../../presentation/controller/getAllClients/get-all-clients'

export const makeGetAllClientsController = (): GetAllClients => {
  const getAllClientsRepository = new ClientMongoRepository()
  const getClient = new DbGetAllClients(getAllClientsRepository)
  return new GetAllClients(getClient)
}
