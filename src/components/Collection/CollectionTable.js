import React from 'react';
import { Col, Table } from 'antd';

const columns = [
  { title: 'Artist', dataIndex: 'artist', key: 'artist' },
  { title: 'Release', dataIndex: 'title', key: 'title' }
];

const CollectionTable = ({ userPurchases, handleExpand, handleDownload }) => (
  <Col span={22} offset={1}>
    <Table
      columns={columns}
      dataSource={userPurchases}
      expandedRowRender={release => {
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
              {release.files.map(file => <li key={release.files.indexOf(file)} onClick={() => handleDownload(file)}><b>{file.fileName}</b></li>)}
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
