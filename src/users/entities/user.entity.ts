
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })
export class User {

    @Prop({ unique: true })
    username: string;

    @Prop({ select: false })
    password: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);