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
      {form.getFieldDecorator('artist')
        (<Input size="large"/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Release Title">
      {form.getFieldDecorator('title')
        (<Input size="large"/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Artwork" extra="Your artwork will be resized to a square. Please make sure it is at least 300 pixels on all sides.">
      <Upload
        accept="image/*"
        listType="picture-card"
        multiple={false}
        beforeUpload={() => false}
        showUploadList={false}
        onChange={setImage}
        >
          {artworkPreview ? <img
            src={artworkPreview}
            className="image-upload-preview"
            alt="preview"
            /> : "Click to upload."}

      </Upload>
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Tracklisting">
      {form.getFieldDecorator('tracklist')
        (<Input.TextArea autosize={{minRows: 4, maxRows: 20}}/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Description">
      {form.getFieldDecorator('description')
        (<Input.TextArea autosize={{minRows: 6, maxRows: 20}}/>)}
    </Form.Item>

    <Form.Item  {...formItemLayout} label="Music Upload" extra="MP3 files only.">
      <Upload.Dragger
        accept="audio/mp3"
        multiple
        onChange={setFileList}
        beforeUpload={() => false}
        >
        <p className="ant-upload-text">Click or drag files to this area to upload.</p>
      </Upload.Dragger>
    </Form.Item>

    <Form.Item
      {...formItemLayout}
      label="Price"
      extra={"$" + USDConversion + " USD"}
      >
      {form.getFieldDecorator('price',
        {initialValue: "0.0000",
          rules: [
            {validator: validatePrice}
          ]
        })
        (<Input size="large" addonAfter="ETH" onChange={calculateUSD}/>)}
    </Form.Item>

    <Form.Item {...uploadItemLayout}>
      <Button type="primary" htmlType="submit">
        Submit New Release
      </Button>
    </Form.Item>

  </Form>
);

export default Form.create()(NewReleaseForm);
