import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { errorResponse } from '../../utils/error.message';
import { successResponse } from '../../utils/success.message';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('Auth') private readonly AuthModel) {}

  async createUser(CreateUserDto: CreateUserDto) {
    try {
      const user = await this.findUser('email', CreateUserDto.email);
      if (user) {
        return successResponse(null, 200, 'User Already Exist');
      } else {
        console.log(CreateUserDto, 'CreateUserDto');

        let user = await this.addUser(CreateUserDto);
        console.log(user, 'user');

        user.password = undefined;
        return successResponse(user, 201, 'User created successfully');
      }
    } catch (error) {
      console.log(error);
      return errorResponse(400, error?.message ?? 'Server Error');
    }
  }
  async signinUser(SigninUserDto: SigninUserDto) {
    try {
      const user = await this.findUser('email', SigninUserDto.email);
      if (!user) {
        return successResponse(null, 201, 'User Not Found');
      } else if (!(await user.matchPassword(SigninUserDto.password))) {
        return successResponse(null, 201, 'Invalid Credentials');
      } else {
        user.password = undefined;
        const token = user.generateToken();
        console.log(token, 'token');
        const responseData = {
          ...user._doc,
          token: token, // Include the generated token
        };

        console.log(responseData, 'user');

        return successResponse(responseData, 201, 'User Login Successfully');
      }
    } catch (error) {
      console.log(error);
      return errorResponse(400, error?.message ?? 'Server Error');
    }
  }

  async findUser(fieldName, value) {
    let user;
    const query = {};
    query[fieldName] = value;
    try {
      user = await this.AuthModel.findOne(query).exec();
      return user || null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addUser(userData) {
    try {
      const createdUser = new this.AuthModel({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        createdAt: new Date().getTime(),
      });
      return await createdUser.save();
    } catch (error) {
      throw new Error(error);
    }
  }
}
