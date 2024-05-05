"use client"

import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Table } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { columns, data } from './config/data';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export default function Page() {
  const [form] = Form.useForm();
  const [formLayout] = useState<LayoutType>('inline');

  return (
    <>
    <div className='flex flex-col gap-3'>
     <Form
      form={form}
      layout={formLayout}
      initialValues={{ layout: formLayout }}
      style={{ maxWidth: 'none' }}
      >
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Flex gap="small">
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
            <Button>
              <Link href="/manage/color/update">添加</Link>
              </Button>
            </Flex>
        </Form.Item>
      </Form>

    <Table columns={columns} dataSource={data}  />
    </div>
    </>
  )
}
