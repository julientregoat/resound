import React from 'react';
import { Row, Col, Table } from 'antd';

const columns = [
  { title: 'Artist', dataIndex: 'artist', key: 'artist' },
  { title: 'Release', dataIndex: 'title', key: 'title' },
  { title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (data, record) => <p>{record.price} ETH</p>
  },
];


const UserReleasesManager = ({ userReleases, editReleaseLink }) => (
  <Row className="subcontainer">
    <Col span={22} offset={1}><h2>Your Releases:</h2></Col>
    <Col span={22} offset={1}>
      <Table
        columns={[
          ...columns,
          {title: 'Edit Release',
          key: 'edit',
          render: editReleaseLink
          }
        ]}
        dataSource={userReleases}
      />
    </Col>
  </Row>
);

export default UserReleasesManager;
