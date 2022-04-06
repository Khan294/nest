import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from "./entities/company.entity";

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) {}

  create(createCompanyDto: CreateCompanyDto) {
    const newCompany = new this.companyModel(createCompanyDto);
    return newCompany.save();
  }

  findAll() {
    return this.companyModel.find().skip(0).limit(10).populate('owner').exec();
  }

  findOne(id: number) {
    return this.companyModel.findById(id).exec();
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, {new: true})
  }

  remove(id: number) {
    return this.companyModel.findByIdAndRemove(id);
  }
}
