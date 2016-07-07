define([
    'core/view/View',
    'core/view/component/DataTable',
    'core/view/element/Button',
], function(BaseView, DataTable, BtnView) {
    FUI.widgets.test3 = BaseView.extend({
        events: {
            'click th': 'onClickBtn',
            // 'click .li_item_css': 'onResultItem'
        },
        initialize: function(option) {
            var defaults = {
                options: {
                    style: {
                        borderRadius: 0
                    },
                    header: {
                        html: '<h4 class="panel-title text-primary">面板标题' + option.key + '<span></span></h4>',
                        className: 'panel-heading border-light'
                    },
                    body: {
                        html: '<p></p>'
                    },
                    footer: {
                        html: '这是footer',
                        hide: false
                    }
                }
            };
            if (option) $.extend(true, defaults, option || {});
            this.parent(defaults);
            this.pageId = option.context.id;
            // FUI.Events.off(null, null, this);
            // FUI.Events.on(this.pageId + ':onEvent', this.onevent, this);
            // FUI.Events.on(this.id + ':clickNav', this.clickNav, this);

            this.theView = FUI.view.create({
                key: this.id + '_datatable',
                el: this.$el,
                view: DataTable,
                context: this,
                options: {
                    className: 'table table-hover table-bordered datatable',
                    selectable: true,
                    hideColSetting: false,
                    hideScroll: false,
                    thead: {
                        // hide: true,
                        // textAlign: 'center'
                    },
                    tfoot: {
                        // hide: true
                    },
                    columns: [
                        // {
                        //     text: '产品',
                        //     children: [{
                        //         text: '名称',
                        //         dataIndex: 'name',
                        //         style: {
                        //             width: '100px'
                        //         }
                        //     }, {
                        //         text: '尺寸',
                        //         dataIndex: 'size',
                        //         style: {
                        //             width: '100px'
                        //         }
                        //     }]
                        // },
                        {
                            text: '名称',
                            dataIndex: 'name',
                            style: {
                                width: '200px'
                            }
                        }, {
                            text: '尺寸',
                            dataIndex: 'size',
                            style: {
                                width: '200px'
                            }
                        },
                        {
                            text: '说明',
                            dataIndex: 'desc',
                            style: {
                                width: 'auto'
                            }
                        }
                    ],
                    data: [{
                        name: '玻璃心',
                        size: 100,
                        desc: '小心轻放'
                    }, {
                        name: '爱心',
                        size: 800,
                        desc: '玩不起就别玩'
                    }, {
                        name: '苹果',
                        size: 200,
                        desc: '很好吃'
                    }, {
                        name: '玻璃心',
                        size: 100,
                        desc: '小心轻放'
                    }, {
                        name: '爱心',
                        size: 800,
                        desc: '玩不起就别玩'
                    }, {
                        name: '苹果',
                        size: 200,
                        desc: '很好吃'
                    }, {
                        name: '玻璃心',
                        size: 100,
                        desc: '小心轻放'
                    }, {
                        name: '爱心',
                        size: 800,
                        desc: '玩不起就别玩'
                    }, {
                        name: '苹果',
                        size: 200,
                        desc: '很好吃'
                    }]
                }
            });
        },
        onClickBtn: function(event) {
            console.warn('数据表格已被选中行: ', this.theView.getSelectedRow());
        },
    });
    return FUI.widgets.test3;
});
