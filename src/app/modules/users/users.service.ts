import { User } from './users.model'
import { IUser } from './users.interface'
import config from '../../../config'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // 1. Auto generated incremental id

  const id = await generateUserId()

  user.id = id

  // 2. Default student password
  if (!user.password) {
    user.password = config.student_default_password as string
  }

  const createdUser = await User.create(user)

  if (!createdUser) throw new Error('Failed to create user !!')

  return createdUser
}

export { createUser }
