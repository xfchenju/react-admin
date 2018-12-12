import React, { Component } from 'react';
import './articleCreate.css';
import { Breadcrumb, Form, Icon, Input, message, Select, Button, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { createArticle, getActiveCategorys } from '../../http/api';
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/github.css'
import E from 'wangeditor';
import xss from 'xss';
import Mditor from 'mditor';

const ReactMarkdown = require('react-markdown')

const FormItem = Form.Item;
const Option = Select.Option;

// 面包屑
class BreadcrumbContainer extends Component {
    render() {
        return (
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/app">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>文章创建</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

// 创建文章表单
class ArticleCreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorysArr: [],
            content: '',
            // mdContent: '',
            // previewContent: ''
        }
        this.props.form.validateFields();
        this._getActiveCategorys();
    }

    componentDidMount() {
        // 使用富文本编辑器
        this.useWangEditor();

        //console.log(Mditor)
        //var mditor =  Mditor.fromTextarea(document.getElementById('editor'));

        //获取或设置编辑器的值
        // mditor.on('ready',function(){
        //     console.log(mditor.value);
        //     mditor.value = '** hello **';	
        // });
        //console.log('111111', xss('<a href="#" onclick="alert(/xss/)">click me</a>'));
        
        // marked.setOptions({
        //     highlight (code) {
        //       return highlight.highlightAuto(code).value
        //     }
        // })
    }

    // 使用富文本编辑器
    useWangEditor() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            this.setState({
                content: xss(html)
            })
        }
        editor.create();
    }

    // 获取已启用分类
	_getActiveCategorys = () => {
		getActiveCategorys().then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
				this.setState({
					categorysArr: res.data.data.avtiveCategorys
				}, function() {
					if(this.state.categorysArr.length > 0) {
						if(!this.props.form.getFieldValue('categoryId')) {
							this.props.form.setFieldsValue({categoryId: this.state.categorysArr[0].id});
							console.log(this.props.form.categoryId, 'this.props.form.categoryId')
						}
					}
				})
			}else {
				message.error(msg);
			} 
        })
    }

    // 提交
    handleSubmit = (e) => {
        e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
                console.log(values, 'values');
				this._createArticle();
			}
		});
    }

    // 新建 接口调用
	_createArticle = () => {
		let data = this.props.form.getFieldsValue();
		// 获取分类的名称
		let category = this.state.categorysArr.find(n => n.id === data.categoryId).name;
        Object.assign(data, {category: category});
        Object.assign(data, {content: this.state.content});
		createArticle(data).then((res)=>{
			let code = res.data.code;
			let msg = res.data.msg;
			if(code === 200) {
                message.success('新建文章成功！');
                // 初始化表单
                this.props.form.resetFields();
                this.setState({
                    content: ''
                })
			}else {
				message.error(msg);
			}
		});
	}

    handleChange = event => {
        this.props.form.setFieldsValue({'content': event.target.value})
        this.setState({ 
            content: event.target.value,
            mdContent: marked(event.target.value)
        });
    }

    onContentChange = (e) => {
        this.setState({
            previewContent: marked(e.target.innerText, {breaks: true})
        })
    }

    render() {
        const { categorysArr, content, previewContent, mdContent } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="article-create__formContainer">
                <Form className="article-create__form" onSubmit={this.handleSubmit.bind(this)}>
                    
                    {/* <FormItem label="文章内容：">
                        <Input.TextArea onChange={this.handleChange.bind(this)} prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入文章内容" autoComplete="off" autosize={{ minRows: 4, maxRows: 6 }}  />
                        <div className="content__view" dangerouslySetInnerHTML={{ __html:mdContent}}></div>
					</FormItem> */}
					<FormItem label="文章标题：">
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '请输入文章标题！' }],
						})(
							<Input prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入文章标题" autoComplete="off" />
						)}
					</FormItem>
                    <FormItem label="标签：">
						{getFieldDecorator('tags', {
							rules: [{ required: true, message: '请输入至少一个标签！' }],
						})(
							<Input prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入至少一个标签" autoComplete="off" />
						)}
					</FormItem>
                    <FormItem label="所属分类：">
						{getFieldDecorator('categoryId', {
							rules: [{ required: true, message: '请选择分类名称！' }],
						})(
							<Select>
								{
									categorysArr.map(item => {
										return <Option value={item.id} key={item.id} >{item.name}</Option>
									})
								}
							</Select>
						)}
					</FormItem>
                    <FormItem label="是否置顶：">
						{getFieldDecorator('isTop', { valuePropName: 'checked' })(
							<Switch />
						)}
					</FormItem>
                    {/* <FormItem label="文章内容：">
						{getFieldDecorator('content', {
							rules: [{ required: true, message: '请输入文章内容！' }],
						})(
							<Input.TextArea onChange={this.handleChange.bind(this)} prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入文章内容" autoComplete="off" />
                        )}
					</FormItem> */}
                    <FormItem label="文章内容：">
                        {/* <div contentEditable="plaintext-only" onInput={this.onContentChange}></div> */}
                        {/* <Input.TextArea style={{height: 200}} onChange={this.handleChange.bind(this)} prefix={<Icon type="copy" style={{ fontSize: 13 }} />} placeholder="请输入文章内容" autoComplete="off" /> */}
                        <div ref="editorElem" style={{textAlign: 'left'}}></div>
                        {/* <div style={{float: 'left', width: '50%', height: '349px', border: '1px solid #000'}} dangerouslySetInnerHTML={{ __html:content}}></div> */}
                        {/* <ReactMarkdown source={previewContent}/> */}
                        {/* <ReactMarkdown source={content}/> */}
                        {/* <div>{previewContent}</div> */}
					</FormItem>
                    <FormItem>
                        <Button htmlType="submit">提交</Button>
					</FormItem>
                </Form>
            </div>
        )
    }
}

// 使用antd的Form的双向绑定方法
ArticleCreateForm = Form.create({})(ArticleCreateForm);

// 创建文章页面
class ArticleCreate extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="article-create">
                <BreadcrumbContainer />
                <ArticleCreateForm />
                
            </div>
        )
    }
}

export default ArticleCreate;