"use client"

import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

export default function Page() {
  const [form] = Form.useForm();

  return (
    <>
      <Form
      form={form}
      name="dynamic_form_complex"
      autoComplete="off"
      initialValues={{ items: [{}] }}
      className='h-full'
    >
      <Flex className='h-full gap-2'>
        <div className='w-3/12 pr-2 overflow-y-auto shrink-0'>
          <Form.Item label="色号" name="rgb">
          <Input />
        </Form.Item>
        <Form.Item label="图片" name="pic">
            <Input />
        </Form.Item>
        <Form.Item label="摘要" name="abstract">
          <TextArea />
        </Form.Item>
        </div>
        <div className='border-r border-slate-200'></div>
        <div className='h-full pl-2 grow'>
        <Form.List name="items">
        {(fields, { add, remove }) => (
          <Flex gap="small" vertical className='h-full'>
            <div className='w-max'>
            <Button type="primary"  onClick={() => add()} block>
              + 添加
            </Button>
            </div>
          <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 overflow-y-auto'>
            {fields.map((field) => (
              <Card
                size="small"
                title={`来源 ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="名称" name={[field.name, 'name']}>
                  <Input />
                </Form.Item>
                <Form.Item label="作者" name={[field.name, 'author']}>
                  <Input />
                </Form.Item>
                <Form.Item label="朝代" name={[field.name, 'dynasty']}>
                  <Input />
                </Form.Item>
                <Form.Item label="时间" name={[field.name, 'time']}>
                  <Input />
                </Form.Item>
                <Form.Item label="出处" name={[field.name, 'orign']}>
                  <Input />
                </Form.Item>
                <Form.Item label="图片" name={[field.name, 'orignPic']}>
                  <Input />
                </Form.Item>
                <Form.Item label="链接" name={[field.name, 'link']}>
                  <Input />
                </Form.Item>
                <Form.Item label="备注" name={[field.name, 'desc']}>
                  <TextArea />
                </Form.Item>
              </Card>
            ))}
          </div>
          </Flex>
        )}
      </Form.List>
        </div>
      </Flex>
      
     
      
    </Form>
    </>
  )
}
