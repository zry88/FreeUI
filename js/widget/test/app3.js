define([
    'lib/view/View',
    'lib/view/component/DataTable',
    'lib/view/element/Button',
    'src/test/collection/Test',
], function(BaseView, DataTable, BtnView, TestCollection) {
    HBY.widgets.test3 = BaseView.extend({
        events: {
            'click th': 'onClickBtn',
            // 'click .li_item_css': 'onResultItem'
        },
        initialize: function(option) {
            var that = this;
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
            // HBY.Events.off(null, null, this);
            // HBY.Events.on(this.pageId + ':onEvent', this.onevent, this);
            // HBY.Events.on(this.id + ':clickNav', this.clickNav, this);

            this.theView = HBY.view.create({
                key: this.id + '_datatable',
                el: this.$el,
                view: DataTable,
                context: this,
                collection: TestCollection,
                options: {
                    className: 'table table-hover table-bordered datatable',
                    selectAble: true,
                    editAble: false,
                    draggAble: true,
                    sortAble: true,
                    changeWidthAble: true,
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
                        //         dataIndex: 'reportName',
                        //         style: {
                        //             width: '200px'
                        //         }
                        //     }, {
                        //         text: '批阅人',
                        //         dataIndex: 'reporter',
                        //         style: {
                        //             width: '200px'
                        //         }
                        //     }]
                        // },
                        {
                            text: '名称',
                            dataIndex: 'reportName',
                            // sortAble: false,
                            format: function(data){
                                return data + 'aaa';
                            },
                            style: {
                                width: '200px'
                            }
                        }, {
                            text: '批阅人',
                            dataIndex: 'reporter',
                            style: {
                                width: '200px'
                            }
                        },
                        {
                            text: '创建日期',
                            dataIndex: 'createdDate',
                            sortAble: false,
                            style: {
                                width: 'auto'
                            }
                        }
                    ],
                    // data: TestCollection
                }
            });
            // 分页
            require(['widget/pagination/App'], function() {
                HBY.view.create({
                    key: that.id + '_paging',
                    el: that.$('.panel-footer'),
                    context: that,
                    inset: 'html',
                    view: HBY.widgets.pagination,
                    collection: TestCollection,
                    options: {
                        style: {
                            margin: '10px'
                        },
                        onGoto: function(event) {
                            console.warn('跳至页');
                        },
                        onPrev: function(event) {
                            console.warn('上一页');
                        },
                        onNext: function(event) {
                            console.warn('下一页');
                        }
                    }
                });
            });
            TestCollection.loadData();
            // console.warn(TestCollection);
        },
        onClickBtn: function(event) {
            console.warn('数据表格已被选中行: ', this.theView.getSelectedRow());
        },
    });
    return HBY.widgets.test3;
});
