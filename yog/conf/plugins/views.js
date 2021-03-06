/**
 * @file YOG2 模板层与静态资源管理配置
 * @author fis@baidu.com
 *
 * Yog默认使用swig作为后端模板引擎，
 *
 * 此处包括
 *
 *  1. 后端模板的缓存配置
 *  2. FIS后端静态资源管理
 *  3. Bigpipe配置
 *
 */

/*global yog*/

module.exports.views = {

	/***************************************************************************
	 *
	 * confDir配置
	 *
	 * 后端静态资源配置存放目录，由yog2编译生成
	 *
	 * 默认存储与'memory'。设置 false 会关闭预编译缓存，可以设置一个拥有get, set function的对象自定义缓存
	 *
	 ***************************************************************************/

	confDir: yog.ROOT_PATH + '/conf/fis',

	/***************************************************************************
	 *
	 * bigpipe配置
	 *
	 * 开启Bigpipe功能
	 *
	 ***************************************************************************/

	bigpipe: true,

	/***************************************************************************
	 *
	 * chunkErrorHandler配置
	 *
	 * 开启BigPipe后如果Bigpipe组件获取数据时出现了异常，可以在此处自定义异常处理
	 *
	 * 此阶段无法使用类似res.redirect等命令，因为头信息已经发送完毕了
	 *
	 ***************************************************************************/

	// chunkErrorHandler: function(error, res){},

	/***************************************************************************
	 *
	 * TPL渲染引擎配置
	 *
	 * 更详细的配置可以参考 http://paularmstrong.github.io/swig/
	 *
	 ***************************************************************************/

	tpl: {
		/***************************************************************************
		 *
		 * cache配置
		 *
		 * 模板预编译缓存
		 *
		 * 默认存储与'memory'。设置 false 会关闭预编译缓存，可以设置一个拥有get, set function的对象自定义缓存
		 *
		 ***************************************************************************/
		cache: 'memory',
		filters: {
			orderStatus2name: function (status, type) {
				if ('bus' == type) {
					if ('0' == status.orderStatus) {
						if ('0' == status.payStatus) {
							return '等待买家付款';
						} else if ('1' == status.payStatus) {
							if ('0' == status.revokeStatus) {
								if ('0' == status.sendFlag) {
									return '买家已付款';
								} else if ('1' == status.sendFlag) {
									if ('0' == status.receiveFlag) {
										return '已发货';
									} else { //???
										if ('0' == status.pointFlag) {
											return '待评价';
										} else if ('1' == status.pointFlag) {
											return '已评价';
										}
									}
								}
							} else {
								return '等待退款';

							}
						}
					} else if ('1' == status.orderStatus) {
						if ('0' == status.pointFlag) {
							return '待评价';
						} else if ('1' == status.pointFlag) {
							return '已评价';
						}
					} else if ('2' == status.orderStatus) {
						return '已取消';
					}
				} else {
					if ('0' == status.orderStatus) {
						if ('0' == status.payStatus) {
							return '等待买家付款';
						} else if ('1' == status.payStatus) {
							if ('0' == status.revokeStatus) {
								if ('0' == status.sendFlag) {
									return '等待卖家发货';
								} else if ('1' == status.sendFlag) {
									if ('0' == status.receiveFlag) {
										return '卖家已发货';
									} else { //???
										if ('0' == status.pointFlag) {
											return '待评价';
										} else if ('1' == status.pointFlag) {
											return '已评价';
										}
									}
								}
							} else {
								return '等待退款';
							}
						}
					} else if ('1' == status.orderStatus) {
						if ('0' == status.pointFlag) {
							return '待评价';
						} else if ('1' == status.pointFlag) {
							return '已评价';
						}
					} else if ('2' == status.orderStatus) {
						return '已取消';
					}
				}
			},
		}
	}
};
