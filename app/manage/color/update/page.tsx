"use client"

import { CloseOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Flex, Form, Steps } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import First from './first';

const steps = [
  {
    key: '1',
    title: '编辑信息',
  },
  {
    key: '2',
    title: '内容生成',
  },
  {
    key: '3',
    title: '预览',
  },
];

export default function Page() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  
  return (
    <>
    <Flex gap="middle" vertical className='h-full'>
      {/* <div className="border-b border-slate-200">
        <Button type="link">
          <Flex gap="small" align='center'>
            <LeftOutlined />
            <Link href="/manage/color">返回颜色列表</Link>
          </Flex>
        </Button>
      </div> */}
      <Flex gap="large" vertical className='h-full'>
        <Steps current={current} items={steps} />
          <div className='w-full grow overflow-hidden'>
            { current === 0 ? <First /> : '' }
            </div>
          <Flex justify="center" align='center' className="pt-2 border-t border-slate-200">
            <Button type='primary'>
                下一步
              </Button>
        </Flex>
      </Flex>
    </Flex>
    </>
  )
}
