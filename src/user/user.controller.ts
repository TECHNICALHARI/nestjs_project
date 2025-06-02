import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}
  @Post()
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateUserDto) {
    return this.UserService.create(dto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
   return this.UserService.findAll();
  }

  //   @Get(":id")
  //   @Roles(Role.ADMIN)
  //   findOne(@Param('id') id: string){
  //     return this.UserService.findOne(id)
  //   }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    console.log(id, dto)
    return this.UserService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.UserService.delete(id);
  }
}
