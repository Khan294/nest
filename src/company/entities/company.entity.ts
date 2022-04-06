
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as SchemaM } from "mongoose";

import { User } from '../../users/entities/user.entity';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })
export class Company {

    @Prop()
    name: "";

    @Prop()
	details: "";

	@Prop({ type: SchemaM.Types.ObjectId, ref: 'User', index: true })
	owner: User;
}

export const CompanySchema = SchemaFactory.createForClass(Company);