/**
 * 当前联系人条目
 */
define([
    "lib/view/Item",
    "text!src/im/template/current-contacts-item.html"
], function(ItemView, Template) {
    var View = ItemView.extend({
        template: _.template(Template),
        events: {
            'click a': 'clickItem',
            'click i': 'onRemoveItem'
        },
        initialize: function(option) {
            this.parent(option);
            // ItemView.prototype.initialize.call(this, option);
            this.el.id = 'currentContact_' + this.model.get('chatId');
            HBY.Events.on('im:view:currentItem:removeOne', this.removeOne, this);
        },
        clickItem: function(event) {
            var target = $(event.currentTarget),
                scene = target.data('scene'),
                userId = target.data('userid'),
                chatId = target.data('chatid');
            window.location.hash = '#im/' + scene + '/' + chatId + '/' + (userId || 0);
            this.setCurrentItem(chatId);
            HBY.Events.trigger('onCurrent:onChangeBg', {
                chatId:chatId
            });
            event.stopPropagation();
        },
        setCurrentItem: function(chatId){
            HBY.datas.session.currentItem = chatId;
        },
        onRemoveItem: function(event){
            this.removeOne();
            event.stopPropagation();
        },
        // 删除当前条目
        removeOne: function(id) {
            if(id){
                if(this.model.get('chatId') !== id) return false;
            }
            this.remove();
            HBY.datas.currentContacts.remove(this.model);
            var theLastModel = HBY.datas.currentContacts.at(HBY.datas.currentContacts.length - 1);
            if(theLastModel){
                var chatId = theLastModel.get('chatId'),
                    userId = theLastModel.get('user') ? theLastModel.get('user').userId : 0,
                    scene = theLastModel.get('scene');
                window.location.hash = '#im/' + scene + '/' + chatId + '/' + userId;
                this.setCurrentItem(chatId);
            }else{
                $('#chatpanel').remove();
            }
            // 重置当前会话
            var theSessionModel = HBY.datas.session.findWhere({
                to: this.model.get('chatId')
            });
            if (theSessionModel) {
                var sessionId = (this.model.get('scene') == 'team' ? 'team-' : 'p2p-') + this.model.get('chatId');
                HBY.Events.trigger('im:reSetUnread', sessionId);
            }
        },
    });

    return View;
});
