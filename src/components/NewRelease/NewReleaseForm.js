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

const NewReleaseForm = ({ submit, upload }) => (

  <Form onSubmit={submit}>

    <Form.Item  {...formItemLayout} label="Artist">
      <Input size="large"/>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Release Title">
      <Input size="large"/>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Tracklisting">
      <Input.TextArea autosize={{minRows: 4, maxRows: 20}}/>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Description">
      <Input.TextArea autosize={{minRows: 6, maxRows: 20}}/>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="File Upload">
      <Upload.Dragger
        accept="audio/mp3"
        multiple
        customRequest={upload}
        data={upload}
      >
        <p className="ant-upload-text">Click or drag files to this area to upload.</p>
        <p className="ant-upload-hint">MP3 files only.</p>
      </Upload.Dragger>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Price">
      <Input size="large" addonAfter="ETH"/>
    </Form.Item>

    <Form.Item {...uploadItemLayout}>
      <Button type="primary" htmlType="submit">
        Submit New Release
      </Button>
    </Form.Item>

  </Form>
);

export default NewReleaseForm;
