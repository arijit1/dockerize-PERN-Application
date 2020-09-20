const {logging} = require("./log");
module.exports = function validateData(data) {
    const { user_id, post_id, post_name, post_type, post_data ,userName} = data;
    
    if (post_id === null) logging(userName+" :no post id generated", true);//post id

    if (post_name === '') logging(userName+" :no post name generated", true);//post title

    if (post_type === '') logging(userName+" :no post type  generated", true); //food,travel

    if (post_data === '') logging(userName+" :no post data generated", true); //body

}