import React from 'react';

import { Form, Input, Button, Upload } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 2,
      offset: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 5
    },
  },
};

const uploadItemLayout = {
  wrapperCol: {
    xs: {
      span: 5,
      offset: 10
    },
  }
}

const NewReleaseForm = ({submit, upload, idk}) => (

  <Form onSubmit={submit}>

    <Form.Item  {...formItemLayout} label="Artist">
      <Input size="large"/>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Release Title">
      <Input size="large"/>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Tracklist">
      <Input size="large"/>
      <Input size="large"/>
      <Input size="large"/>
      <Input size="large"/>
    </Form.Item>

    <Form.Item  {...uploadItemLayout} >
      <Upload.Dragger
        multiple
        customRequest={idk}
      >
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Upload.Dragger>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Cost">
      <Input size="large"/>
    </Form.Item>

    <Form.Item {...formItemLayout} label="Submit">
      <Button type="primary" htmlType="submit">
        Submit New Release
      </Button>
    </Form.Item>

  </Form>
);

export default NewReleaseForm;
