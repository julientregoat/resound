import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: 'Artist', dataIndex: 'artist' },
  { title: 'Release', dataIndex: 'title' }
];

const CollectionTable = ({ userReleases }) => (
  <Table
    columns={columns}
    dataSource={userReleases}
  >

  </Table>
);

export default CollectionTable;
