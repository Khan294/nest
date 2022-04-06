import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from "./entities/company.entity";
import { MAX_ITEM_PER_PAGE } from "../common/constants/configuration.contants"

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>) {}

  create(createCompanyDto: CreateCompanyDto) {
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  findAll(skip: number= 0, limit: number= MAX_ITEM_PER_PAGE) {
    limit= limit > MAX_ITEM_PER_PAGE? MAX_ITEM_PER_PAGE: limit
    return this.companyModel.find().skip(skip).limit(limit).populate('owner').exec();
  }

  findOne(id: string) {
    return this.companyModel.findById(id).exec();
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, {new: true})
  }

  remove(id: string) {
    return this.companyModel.softDelete({ _id: id });
  }
}
