define([
	'lib2/core/data/Proxy',
], function(BaseProxy){
	var Dataproxy = BaseProxy.extend({
		initialize: function(){
			// console.warn('aaaaaaaaa');
		}
	});
	return new Dataproxy();
});