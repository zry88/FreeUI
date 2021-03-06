/**
 * 联系人视图
 */
define([
    "lib2/core/view/List",
    'src2/im/view/ContactsItem',
], function(ListView, ContactsItem) {
    var View = ListView.extend({
        el: '#listMemberAndGroup',
        itemEl: '#listMemberAndGroup',
        itemView: ContactsItem,
        events: {
            'dblclick .depart_member li': 'showChat',
            'click .depart_member li': 'clickItem'
        },
        initialize: function(option) {
            this.parent(option);
            Hby.selectedArr = [];
            Hby.Events.off(null, null, this);
            Hby.Events.on('im:view:contacts:showHideChatBtn', this.showHideChatBtn, this);
        },
        clickItem: function(event) {
            var target = $(event.currentTarget),
                userId = target.data('userid'),
                chatId = target.data('chatid');
            if(chatId == window.imUser.imAccountId) return false;
            target.toggleClass('im_message_box_list_active_li').find('.selectIcon').toggle();
            this.showHideChatBtn();
            this.changeSelected({
                chatId: chatId,
                userId: userId
            });
        },
        // 显示隐藏创建聊天按钮
        showHideChatBtn: function(isHide){
            var theList = this.$('.depart_member > li');
            if(isHide){
                Hby.selectedArr = [];
                theList.removeClass('im_message_box_list_active_li').find('.selectIcon').hide();
            }
            var newChatWindow = $('.newChatWindow');
            if (this.$('.im_message_box_list_active_li').length) {
                newChatWindow.show();
            } else {
                newChatWindow.hide();
            }
        },
        changeSelected: function(obj) {
            var theModel = _.findWhere(Hby.selectedArr, { chatId: obj.chatId });
            if (theModel) {
                Hby.selectedArr = _.filter(Hby.selectedArr, function(model) {
                    return model.chatId !== obj.chatId;
                });
            } else {
                Hby.selectedArr.push(obj);
            }
        },
        // 打开聊天窗
        showChat: function(event) {
            var target = $(event.currentTarget),
                userId = target.data('userid'),
                chatId = target.data('chatid');
            if (chatId == window.imUser.imAccountId || !chatId) {
                event.stopPropagation();
                return false;
            }
            this.showHideChatBtn(true);
            Hby.ux.util.IM.openChat({
                chatId: chatId,
                userId: userId
            });
            event.stopPropagation();
        }
    });
    return View;
});
