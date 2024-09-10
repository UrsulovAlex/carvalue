import { 
    Body,
    Controller, 
    Post, 
    Get, 
    Patch, 
    Delete, 
    Param, 
    Query, 
    NotFoundException,
    UseInterceptors,
    ClassSerializerInterceptor,
    Session,
    UseGuards,
 } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize, SerializerInterceptor } from 'src/inreceptors/serialize.interseptors';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { User } from './users.entity';
import { CurrentUserInterseptor } from './interseptors/current-user.interceptor';
import { AuthGuard } from '../guards/auth.guards';


@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterseptor) bad practice
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    // @Get('/whoami')
    // whoAnI(@Session() session: any) {
    //     return this.userService.findOne(session.userId);
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAnI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id
        return user;
    }

    //@UseInterceptors( new SerializerInterceptor(UserDto))
    //@Serialize(UserDto)
    @Get('/:id') 
    async findUser(@Param('id') id: string) {
        const user = await this.userService.findOne(parseInt(id));
        if(!user) {
            throw new NotFoundException('user not found');
        }
        return user
    }

    @Get()
    findAllUsers(@Query('email') email: string ){
        return this.userService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);
    }

    // test session
    // @Get('colors/:color')
    // setColor(@Param('color') color: string, @Session() session: any) {
    //     session.color = color;
    // }

    // @Get('colors')
    // getColor(@Session() session: any) {
    //     return session.color
    // }
}
