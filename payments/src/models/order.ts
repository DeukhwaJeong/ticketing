import mongoose from "mongoose";
import { OrderStatus } from "@deukhwatickets/common";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface OrderAttrs {
    id: string;
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}

// Why doesn't it have id?
// Because mongoose will automatically add id to the document
interface OrderDoc extends mongoose.Document {
    version: number;
    userId: string;
    price: number;
    status: OrderStatus;
}


interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

// version is not included since mongoose will automatically add/update it
const orderSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        userId: attrs.userId,
        price: attrs.price,
        status: attrs.status
    })
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };