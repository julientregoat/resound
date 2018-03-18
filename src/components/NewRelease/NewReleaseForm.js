import React from 'react';

import { Form, Input, Button, Upload } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 3,
      offset: 5
    }
  },
  wrapperCol: {
    xs: {
      span: 8
    },
  },
};

const uploadItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 10
    },
  }
};

const NewReleaseForm = ({ submit, setFileList, form }) => (
  <Form
    onSubmit={submit}>

    <Form.Item  {...formItemLayout} label="Artist">
      {form.getFieldDecorator('artist')(<Input size="large"/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Release Title">
      {form.getFieldDecorator('title')(<Input size="large"/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Tracklisting">
      {form.getFieldDecorator('tracklist')(<Input.TextArea autosize={{minRows: 4, maxRows: 20}}/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Description">
      {form.getFieldDecorator('description')(<Input.TextArea autosize={{minRows: 6, maxRows: 20}}/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="File Upload" extra="Please note that your tracks will have the same title when downloaded as uploaded">
      <Upload.Dragger
        accept="audio/mp3"
        multiple
        onChange={setFileList}
        beforeUpload={() => false}
      >
        <p className="ant-upload-text">Click or drag files to this area to upload.</p>
        <p className="ant-upload-hint">MP3 files only.</p>
      </Upload.Dragger>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Price">
      {form.getFieldDecorator('price')(<Input size="large" addonAfter="ETH"/>)}
    </Form.Item>

    <Form.Item {...uploadItemLayout}>
      <Button type="primary" htmlType="submit">
        Submit New Release
      </Button>
    </Form.Item>

  </Form>
);

export default Form.create()(NewReleaseForm);
