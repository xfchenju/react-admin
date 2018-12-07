import { post, get } from './config';

/**
 * 用户相关
 */
// 注册
export const register = params => post('/api/v1/user/register', params);
// 登录
export const login = params => post('/api/v1/user/login', params);
// 注销
export const logout = params => post('/api/v1/user/logout', params);
// 获取用户列表
export const getUsersList = params => get('/api/v1/user/get-users-list', params);
// 修改用户信息
export const editUser = params => post('/api/v1/user/update-user', params);
// 删除用户
export const deleteUser = params => post('/api/v1/user/delete-user', params);
// 修改密码
export const changePassword = params => post('/api/v1/user/change-password', params);
// 获取用户详情
export const getUserDetail = params => post('/api/v1/user/get-user-detail', params);
/**
 * 分类相关
 */
// 获取分类列表
export const getCategorysList = params => get('/api/v1/category/get-categorys-list', params);
// 获取启用的分类
export const getActiveCategorys = params => get('/api/v1/category/get-active-categorys', params);
// 新增分类
export const createCategory = params => post('/api/v1/category/create-category', params);
// 修改分类
export const updateCategory = params => post('/api/v1/category/update-category', params);
// 禁用/启用分类
export const isEnableCategory = params => post('/api/v1/category/isenable-category', params);
// 删除分类分类相关
export const deleteCategory = params => post('/api/v1/category/delete-category', params);

/**
 * 文章相关
 */
// 获取文章列表
export const getArticlesList = params => get('/api/v1/article/get-articles-list', params);
// 获取文章详情
export const getArticleDetail = params => get('/api/v1/article/get-article-detail', params);
// 新增文章
export const createArticle = params => post('/api/v1/article/create-article', params);
// 修改文章
export const updateArticle = params => post('/api/v1/article/update-article', params);
// 删除文章
export const deleteArticle = params => post('/api/v1/article/delete-article', params);


// /*通用*/
// // 首页
// export const getIndexData = () => post('/admin/get-index');
// // 注销
// export const logout = () => post('admin/logout');
// // 获取数据中心数据列表
// export const getMessageData = params => post('admin/message/list', params);
// // 获取消息详情
// export const getMessageDetail = params => post('admin/message/detail', params);
// // 设置消息已读
// export const setMessageRead = params => post('/admin/message/set-read', params);
// // 获取是否有消息
// export const getHasNotice = params => post('/admin/message/unread-num', params);
// // 上传
// export const uploadFile = params =>  post('/currency/upload', params);
// // 获取菜单
// export const getMenuRights = params =>  post('/admin/system/get-menu', params);
// // 获取地区
// export const getArea = params =>  post('/currency/get-area', params);

// /*节点管理接口*/
// // 获取节点数据（列表）
// export const getNodesData = params =>  post('/admin/system/node', params);
// // 获取节点数据（单条）
// export const getSingleNodeData = params =>  post('/admin/system/node/info', params);
// // 添加节点
// export const postAddNode = params =>  post('/admin/system/node/create', params);
// // 编辑节点
// export const postEditNode = params =>  post('/admin/system/node/update', params);
// // 补全上级节点
// export const complementNodes = params =>  post('/admin/tool/search-node', params);

// /*资质审核接口*/
// // 获取资质审核列表
// export const getCheckData = params =>  post('/admin/audit/list', params);
// // 资质审核提交
// export const submitCheck = params =>  post('/admin/audit/update', params);
// // 导出清单
// export const exportCheckList = params =>  post('/admin/audit/supplier-export', params);
// // 获取商家入驻资料
// export const getEnterDetailData = params =>  post('/admin/audit/supplier-admission', params);
// // 获取账户信息
// export const getAccountDetailData = params =>  post('/admin/supplier/account', params);
// // 备注提交
// export const submitAdminRemark = params =>  post('/admin/audit/admin-remark', params);
// // 商家信息修改
// export const submitEditMerchant = params =>  post('/admin/audit/update-supplier', params);

// /*资质复核接口*/
// // 获取资质复核列表
// export const getRecheckData = params =>  post('/admin/review/list', params);
// // 资质复核提交
// export const submitRecheck = params =>  post('/admin/review/update', params);
// // 复核导出清单
// export const exportRecheckList = params =>  post('/admin/review/supplier-export', params);
// // 上传资料
// export const uploadRecheckInfo = params =>  post('/admin/review/upload', params);
// // 删除资料
// export const removeRecheckInfo = params =>  post('/admin/review/delete-supplier-data', params);
// // 查看资料
// export const viewRecheckInfo = params =>  post('/admin/review/supplier-data', params);


// /*商品报送审核*/
// // 获取商品报送审核列表
// export const getProductCheckData = params => post('/admin/sku/list', params);
// // 商品报送提交
// export const submitProductCheck = params => post('/admin/sku/audit-update', params);
// // 商品报送提交 批量
// export const submitProductCheckBatch = params => post('/admin/sku/audit-batch-update', params);
// // 获取任务分配的人员列表
// export const getPeopleList = () => post('/admin/sku/task');
// // 提交任务分配
// export const submitTasKDistribute = params => post('/admin/sku/do-task', params);
// // 获取spu详情
// export const getSpuDetail = params => post('/admin/sku/sku-detail', params);
// // 获取驳回原因
// export const getRejectOptions = params => post('/admin/sku/get-remark-type', params);
// // 获取所有分类
// export const getCategoryData = params => post('/admin/sku/sku-category', params);
// // 提交黑名单原因
// export const submitBlackReason = params => post('/admin/sku/black', params);

// /*入驻管理*/
// // 获取入驻管理列表
// export const getEnterData = params => post('/admin/supplier/list', params);
// // 解除合作
// export const cancelCooperation = params => post('/admin/supplier/dissolve-cooperation', params);
// // 重新合作
// export const cooperationAgain = params => post('/admin/supplier/restart-cooperation', params);
// // 添加黑名单
// export const addBlack = params => post('/admin/supplier/black', params);
// // 供应商详情
// export const getSupplierDetail = params => post('/admin/supplier/detail', params);
// // 修改商户来源
// export const editShopSource = params => post('/admin/supplier/update-platform', params);
// // 导出
// export const exportEnterData = params => post('/admin/supplier/export-list', params);

// /*黑名单管理*/
// // 获取黑名单管理
// export const getBlackData = params => post('/admin/black/list', params);
// // 解除黑名单
// export const cancelBlack = params => post('/admin/black/cancel', params);

// /*帮助中心*/
// // 列表
// export const getInfoData = params => post('/admin/policy/list', params);
// // 详情
// export const getInfoDetail = params => post('/admin/policy/detail', params);
// // 发送
// export const sendInfo = params => post('/admin/policy/send', params);
// // 更新+修改
// export const addUpdateInfo = params => post('/admin/policy/policy-save', params);
// // 删除
// export const deleteInfo = params => post('/admin/policy/delete', params);

// /*订单管理*/
// // 列表
export const getOrderList = params => post('/admin/order/list', params);
// // 订单导出
// export const exportOrder = params => post('/admin/order/export-list', params);
// // 更新物流
// export const updateExpress = params => post('/admin/order/change-order-express', params);
// // 更新异常订单物流
// export const updateExceptionExpress = params => post('/admin/order/change-exception-express', params);
// // 订单添加备注
// export const submitOrderRemark = params => post('/admin/order/remark', params);
// // 异常订单
// export const getExceptionOrderList = params => post('/admin/order/exception-list', params);
// // 异常订单导出
// export const exportExceptionOrder = params => post('/admin/order/export-exception', params);
// // 异常订单添加备注
// export const submitExceptionOrderRemark = params => post('/admin/order/exception-remark', params);

// /*财务对账单*/
// // 列表
// export const getFinancialStatementData = params => post('/admin/balance/list', params);
// // 详情
// export const getFinancialStatementDetail = params => post('/admin/balance/detail', params);
// // 审核
// export const submitFinancialAudit = params => post('/admin/balance/audit', params);
// // 支付
// export const submitFinancialPay = params => post('/admin/balance/pay', params);
// // 导出
// export const exportFinancial = params => post('/admin/balance/export', params);
// // 上传支付图片
// export const submitPayImages = params => post('/admin/balance/upload-image', params);
// // 获取支付图片
// export const getPayImages = params => post('/admin/balance/get-image', params);
// // 获取导入运费模板
// export const downloadFreightTemplate = 'currency/express-price-template';
// // 导入运费模板
// export const importFreight = params => post('/admin/balance/express-price-import', params);
// // 导出全部信息
// export const exportAllInfo = params => post('/admin/balance/list-export', params);

// /*认领模块*/
// // 认领审核列表
// export const getClaimListDatas = params => post('/admin/claim/check-tender-list', params);
// // 认领审核详情列表
// export const getClaimDetailListDatas = params => post('/admin/claim/get-tender-list', params);
// // 投标sku列表
// export const getClaimSkuListDatas = params => post('/admin/claim/get-tender-detail', params);
// // 选择投标人
// export const submitCliamPerson = params => post('/admin/claim/open-tender', params);
// // 流标
// export const submitFailureOfBid = params => post('/admin/claim/get-tender-wait', params);

// /*处罚管理*/
// // 扣款单列表
// export const getDeductionsListDatas = params => post('/admin/cut/list', params);
// // 扣款或者不处罚
// export const submitNeedDeductions = params => post('/admin/cut/deal', params);
// // 扣款金额输入
// export const submitDeductionsListMoney = params => post('/admin/cut/cut-money', params);
// // 扣款审核列表
// export const getDeductionsListAuditDatas = params => post('/admin/cut/audit-list', params);
// // 扣款审核操作
// export const submitDeductionListAudit = params => post('/admin/cut/audit-deal', params);



