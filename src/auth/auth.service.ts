import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { errorResponse } from '../../utils/error.message';
import { successResponse } from '../../utils/success.message';
import { SigninUserDto } from './dto/signin-user.dto';
import { createCipheriv } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly AuthModel,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(CreateUserDto: CreateUserDto) {
    try {
      const user = await this.findUser('email', CreateUserDto.email);
      if (user) {
        return errorResponse(404, 'User Already Exist');
      } else {
        let user = await this.addUser(CreateUserDto);

        user.password = undefined;
        return successResponse(user, 201, 'User created successfully');
      }
    } catch (error) {
      console.log(error);
      return errorResponse(500, error?.message ?? 'Server Error');
    }
  }
  async signinUser(SigninUserDto: SigninUserDto) {
    try {
      const user = await this.findUser('email', SigninUserDto.email);
      if (!user) {
        return errorResponse(404, 'User Not Found');
      } else if (!(await user.matchPassword(SigninUserDto.password))) {
        return errorResponse(404, 'Invalid Credentials');
      } else {
        user.password = undefined;

        const algorithm = process.env.AES_ALGORITHM;

        // generate 16 bytes of random data
        const initVector = process.env.INIT_VECTOR_CRYPTO;

        // secret key generate 32 bytes of random data
        const securitykey = process.env.SECURITY_KEY_CRYPTO;

        // the cipher function
        const cipher = createCipheriv(algorithm, securitykey, initVector);

        const objC = {
          id: user._id,
        };

        //encrypt the OBJ
        let cObj = cipher.update(JSON.stringify(objC), 'utf-8', 'hex');
        cObj += cipher.final('hex');

        const payloadForToken = { id: cObj };
        const access_token = await this.jwtService.signAsync(payloadForToken, {
          secret: process.env.JWT_SECRET,
          expiresIn: parseInt(process.env.SESSION_TIME, 10),
        });

        const responseData = {
          ...user._doc,
          token: access_token, // Include the generated token
        };

        return successResponse(responseData, 201, 'User Login Successfully');
      }
    } catch (error) {
      console.log(error);
      return errorResponse(500, error?.message ?? 'Server Error');
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
