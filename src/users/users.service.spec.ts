import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserRepository } from './repository/user.repository'

const userDto = {
  firstName: 'Jhoe',
  lastName: 'Doe',
  email: 'user@email.com',
  password: '1234567'
}

describe('UsersService', () => {
  let usersService: any,
      userRepository: any
  const mockUserRepository = () => ({
    getAllUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    delete: jest.fn(),
    reateQueryBuilder: jest.fn()
    // createQueryBuilder: jest.fn(() => ({
    //   select: jest.fn().mockReturnThis(),
    //   from: jest.fn().mockReturnThis(),
    // }))
  })

 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository
        }
      ],
    }).compile();
    usersService = await module.get<UsersService>(UsersService)
    userRepository = await module.get<UserRepository>(UserRepository)
  })

  describe('createUser', () => {
    it('should create a new user', async () => {
      userRepository.createUser.mockResolvedValue(userDto)
      expect(userRepository.createUser).not.toHaveBeenCalled()
      const result = await usersService.create(userDto)
      expect(userRepository.createUser).toHaveBeenCalledWith(
        userDto
      )
      expect(result).toEqual(userDto)
    })
  })

  describe('getAllUsers', () => {
    it('List of all users in database', async () => {
      userRepository.getAllUsers.mockResolvedValue('getAllUsers')
      expect(userRepository.getAllUsers).not.toHaveBeenCalled()
      const result = await usersService.getAllUsers()
      expect(userRepository.getAllUsers).toHaveBeenCalled()
      expect(result).toEqual('getAllUsers')
    })
  })

  describe('getUser', () => {
    it('should retrieve an user with an ID', async () => {
        userRepository.getUser.mockResolvedValue(userDto)
        const result = await usersService.findById(1)
        expect(result).toEqual(userDto)
    })
    it('throws an error as a role is not found', async () => {
      userRepository.getUser.mockResolvedValue(null)
        expect(usersService.findById(1)).rejects.toThrow(NotFoundException)
    })
  })

  describe('updateRole', () => {
    it('should update an user', async () => {
        expect(userRepository.createUser).not.toHaveBeenCalled()
        await usersService.create(userDto)
        userRepository.createUser.mockResolvedValue(userDto)

        const userUpdateDto = {
            id: 1,
            firstName: 'Home'
        }
        userRepository.updateUser.mockResolvedValue(userUpdateDto)
        expect(userRepository.updateUser).not.toHaveBeenCalled()
        const resultUpdate = await usersService.update(userUpdateDto)
        expect(userUpdateDto.firstName).toEqual(resultUpdate.firstName)
    })
  })

  describe('deleteUser', () => {
    it('should delete an user', async () => {
      userRepository.delete.mockResolvedValue(1);
      expect(userRepository.delete).not.toHaveBeenCalled();
      await usersService.delete(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
})
