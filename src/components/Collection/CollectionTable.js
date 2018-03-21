import React from 'react';
import { Col, Table } from 'antd';

const columns = [
  { title: 'Artist', dataIndex: 'artist', key: 'artist' },
  { title: 'Release', dataIndex: 'title', key: 'title' }
];

const CollectionTable = ({ userPurchases, handleExpand }) => (
  <Col span={20} offset={2}>
    <Table
      bordered
      columns={columns}
      dataSource={userPurchases}
      expandedRowRender={release => {
        console.log(release)
        return (
          <React.Fragment>
            <Col span={12}>
              <h3> Description </h3>
              <p>{release.description}</p>

              <h3> Tracklisting </h3>
              <p>{release.description}</p>
            </Col>
            <Col span={12}>
              <h3>Download Links</h3>
              {release.files.map(file => <b>{file.fileName}</b>)}
            </Col>
          </React.Fragment>
        )
      }}
      expandRowByClick
      onExpand={handleExpand}
    />
  </Col>
);

export default CollectionTable;
