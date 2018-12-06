import React, { Component } from 'react';
import { Form, Input, Select, Button, Upload, message, Icon } from 'antd';
import './demo.css';
const FormItem = Form.Item;
const Option = Select.Option;

class PriceInput extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }
  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
      </span>
    );
  }
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);

  console.log('reader', reader);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Demo extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  }

  state = {};

  handleChange = (info) => {
    if (info.file.status === 'done') {
      console.log(info.file)
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }
  render() {
    const imageUrl = this.state.imageUrl;
    const { getFieldDecorator } = this.props.form;
    const props = {
      name: 'file',
      action: 'http://localhost:3002/api/v1/currency/upload',
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Price">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'rmb' },
            rules: [{ validator: this.checkPrice }],
          })(<PriceInput />)}
        </FormItem>
        <FormItem label="头像">
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
        <Upload
          className="avatar-uploader"
          name="file"
          showUploadList={false}
          action="http://localhost:3002/api/v1/currency/upload"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {
            imageUrl ?
              <img src={imageUrl} alt="" className="avatar" /> :
              <Icon type="plus" className="avatar-uploader-trigger" />
          }
        </Upload>
      </Form>
    );
  }
}

Demo = Form.create()(Demo);

export default Demo;