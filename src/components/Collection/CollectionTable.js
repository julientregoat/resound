import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: 'Artist', dataIndex: 'artist', key: 'artist' },
  { title: 'Release', dataIndex: 'title', key: 'title' }
];

const CollectionTable = ({ userPurchases }) => (
  <Table
    columns={columns}
    dataSource={userPurchases}
  >

  </Table>
);

export default CollectionTable;
