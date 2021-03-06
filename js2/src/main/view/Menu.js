/**
 * 系统菜单视图类
 * @class menu
 */
define([
    'lib2/core/view/View',
    'text!src2/main/template/menu.html'
], function(BaseView, TplMenu) {
    var View = BaseView.extend({
        el: ".crm-home-left",
        template: _.template(TplMenu),
        events: {
            // 'click #homeAddBtn': "checkPerfect",
            // 'click #chat > .mask-layer': 'hideChat'
        },
        initialize: function() {
            this.$el.html(this.template());
        }
    });
    return View;
});
