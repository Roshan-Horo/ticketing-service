import mongoose from "mongoose";

interface FormAttrs {
    title: string,
    userId: string;
    questions: string[]
}

interface FormDoc extends mongoose.Document {
    title: string,
    userId: string,
    questions: string[]
}

interface FormModel extends mongoose.Model<FormDoc> {
    build(attrs: FormAttrs): FormDoc;
}

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true 
    },
    questions: [{
        type: String
    }]
    }, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

formSchema.statics.build = (attrs: FormAttrs) => {
    return new Form(attrs);
}

const Form = mongoose.model<FormDoc, FormModel>('Form', formSchema);

export { Form };