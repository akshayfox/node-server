const { model, Schema } = require('mongoose')

const template_schema = new Schema({
    name:{
        type:String,
    },
    components: {
        type: Array,
        default: []
    },
    image_url: {
        type: String,
        default: ''
    }

}, { timestamps: true })

module.exports = model('templates', template_schema)