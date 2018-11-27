import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

export default class Setting extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log('values of form: ', values);
      }
    })
  }
	render() {
		return (
      <div style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff' }}>
  		  <Form style={{width: 400}}>
          <FormItem label="asd">
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          </FormItem>
          <FormItem>
            <Button type="primary">提交</Button>
          </FormItem>
        </Form>
      </div>
		);
	}
}