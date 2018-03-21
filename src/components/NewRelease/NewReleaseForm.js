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

const NewReleaseForm = ({ submit,
                          setFileList,
                          setImage,
                          artworkPreview,
                          form,
                          USDConversion,
                          calculateUSD,
                          validatePrice }) => (
  <Form
    onSubmit={(e) => submit(e, form)}>

    <Form.Item  {...formItemLayout} label="Artist">
      {form.getFieldDecorator('artist',
        {rules: [{required: true}]})(<Input size="large"/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Release Title">
      {form.getFieldDecorator('title',
        {rules: [{required: true}]})(<Input size="large"/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Artwork" extra="Your artwork will be resized to 300px x 300px. Ensure it is a square for best results.">
      {form.getFieldDecorator('artwork', {rules: [{required: true}]})(
          <Upload
          accept="image/*"
          listType="picture-card"
          beforeUpload={() => false}
          showUploadList={false}
          onChange={setImage}
          >
            {artworkPreview ? <img
              src={artworkPreview}
              className="image-upload-preview"
              alt="preview"
              /> : "Click to upload."}
        </Upload>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Tracklisting">
      {form.getFieldDecorator('tracklist',
        {rules: [{required: true}]})(<Input.TextArea autosize={{minRows: 4, maxRows: 20}}/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Description">
      {form.getFieldDecorator('description',
        {rules: [{required: true}]})(<Input.TextArea autosize={{minRows: 6, maxRows: 20}}/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Music Upload" extra="MP3 files only. 70 character limit on filenames, including '.mp3'. Anything over will be truncated. Filenames will remain the same when a user purchases your release.">
      {form.getFieldDecorator('music',
          {rules: [{required: true}]})(
          <Upload.Dragger
          accept="audio/mp3"
          multiple
          onChange={setFileList}
          beforeUpload={() => false}
          >
          <p className="ant-upload-text">Click or drag files to this area to upload.</p>
        </Upload.Dragger>)}
    </Form.Item>

    <Form.Item
      {...formItemLayout}
      label="Price"
      extra={"$" + USDConversion + " USD"}
      >
      {form.getFieldDecorator('price',
        {initialValue: "0.0000",
          rules: [
            {validator: validatePrice},
            {required: true}
          ]
        })(<Input size="large" addonAfter="ETH" onChange={calculateUSD}/>)}
    </Form.Item>

    <Form.Item {...uploadItemLayout}>
      <Button type="primary" htmlType="submit">
        Submit New Release
      </Button>
    </Form.Item>

  </Form>
);

export default Form.create()(NewReleaseForm);
