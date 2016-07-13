/**
 * 当前联系人
 */
define([
    "lib/data/Collection",
    "src/im/model/CurrentUser"
], function(BaseCollection, Model) {
    var Collection = BaseCollection.extend({
        urlType: 1,
        model: Model,
        pageSize: 20,
        initialize: function(models, option){
            this.parent(models, option);
            HBY.Events.off(null, null, this);
            HBY.Events.on('im:collection:currentContacts:onAddOne', this.onAddOne, this);
            HBY.Events.on('im:collection:teams:updateTeamName', this.onUpdateTeamName, this);
        },
        onAddOne: function(data) {
            this.add(data);
        },
        onUpdateTeamName: function(data) {
            var theModel = this.get(data.teamId);
            if(theModel){
                theModel.set('name', data.name);
            }
        }
    });
    return Collection;
});