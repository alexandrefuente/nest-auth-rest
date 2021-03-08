import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesRepository } from './repository/roles.repository'

describe('RolesService', () => {
    let rolesService: any,
        rolesRepository: any
    const mockRolesRepository = () => ({
        getRoles: jest.fn(),
        createRole: jest.fn(),
        show: jest.fn(),
        updateRole: jest.fn()
    })
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
            RolesService,
            {
                provide: RolesRepository,
                useFactory: mockRolesRepository
            }
        ],
      }).compile();
       rolesService = await module.get<RolesService>(RolesService)
       rolesRepository = await module.get<RolesRepository>(RolesRepository)
    })

    describe('createRole', () => {
        it('should save a role in the database', async() => {
            rolesRepository.createRole.mockResolvedValue('createRole')
            expect(rolesRepository.createRole).not.toHaveBeenCalled()
            const rolesDto = {
                name: 'Administrator'
            }
            const result = await rolesService.create(rolesDto)
            expect(rolesRepository.createRole).toHaveBeenCalledWith(
                rolesDto
            )
            expect(result).toEqual('createRole')
        })
    })

    describe('getAllRoles', () => {
        it('should get all roles', async () => {
            rolesRepository.getRoles.mockResolvedValue('getRole')
            expect(rolesRepository.getRoles).not.toHaveBeenCalled()
            const result = await rolesService.getRoles()
            expect(rolesRepository.getRoles).toHaveBeenCalled()
            expect(result).toEqual('getRole')
        })
    })

    describe('getRole', () => {
        it('should retrieve a role with an ID', async () => {
            const mockRole = {
                name: 'Common'
            }
            rolesRepository.show.mockResolvedValue(mockRole)
            const result = await rolesService.findOne(1)
            expect(result).toEqual(mockRole)
        })
        it('throws an error as a role is not found', async () => {
            rolesRepository.show.mockResolvedValue(null)
            expect(rolesService.findOne(1)).rejects.toThrow(NotFoundException)
        })
    })

    describe('updateRole', () => {
        it('should update a role', async () => {
            const rolesDto = {
                id: 1,
                name: 'Administrator'
            }
            expect(rolesRepository.createRole).not.toHaveBeenCalled()
            await rolesService.create(rolesDto)
            rolesRepository.createRole.mockResolvedValue(rolesDto)

            const rolesUpdateDto = {
                id: 1,
                name: 'Common'
            }
            rolesRepository.updateRole.mockResolvedValue(rolesUpdateDto)
            expect(rolesRepository.updateRole).not.toHaveBeenCalled()
            const resultUpdate = await rolesService.update(rolesUpdateDto)
            expect(rolesUpdateDto.name).toEqual(resultUpdate.name)
        })
    })
})

