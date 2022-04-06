import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from "./entities/user.entity";
import { MAX_ITEM_PER_PAGE } from "../common/constants/configuration.contants"

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findAll(skip: number= 0, limit: number= MAX_ITEM_PER_PAGE) {
    limit= limit > MAX_ITEM_PER_PAGE? MAX_ITEM_PER_PAGE: limit
    return this.userModel.find().skip(skip).limit(limit).exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
  }

  remove(id: string) {
    // return this.userModel.findByIdAndRemove(id);
    return this.userModel.softDelete({ _id: id });
  }
}
