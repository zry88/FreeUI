/**
 * 数据模型基类
 * @author: yrh
 * @create: 2015/2/6
 * @update: 2015/2/6
 */
define([
    "lib2/core/Hby"
], function(Hby) {
    var BaseModel = Hby.Model.extend({
        urlRoot: '',
        initialize: function(attributes, option) {
            option = option || {};
            this.bind("error", function(model, error) {
                debug.log(model, " Model ERROR : ", error);
            });
            this.bind('invalid', function(model, errors) {
                debug.log(model, " INIT INVALID ERRORS : ", errors);
            });
        },
    });
    return BaseModel;
});