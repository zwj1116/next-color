// list
import Image from 'next/image'
import { useState } from 'react'

const Card = () => {
  return <div className="rounded-lg p-2 border border-gray-200 overflow-hidden w-full h-60 duration-150 flex flex-col">
      <div className="rounded-lg w-full h-3/4 bg-gray-200 group/bg relative">
      <div className="rounded-lg invisible group-hover/bg:visible size-full absolute shadow blur-sm"></div>
        <div className="invisible group-hover/bg:visible size-full flex justify-center items-center gap-6 absolute z-1">
          <Image
              src="/static/icons/heart-pulse.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
        </div>
      </div>
      <div className="p-2 pt-1 pb-0 grow flex flex-col">
        <div className="flex items-center justify-between grow">
          <b className="">Test</b>
          <b className="text-[13px]">ces</b>
        </div>
        <span className="text-xs line-clamp-2">这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注这是一个备注</span>
      </div>
  </div>
}

export default function Page() {
  const [state, setState] = useState({
    mode: 0,
  })

  const switchRender = () => {
    switch(state.mode) {
      case 0:
        break;
    }
  }
  return (
    <>
    <header className="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
        sdf
      </div>
    </header>
    <main className="p-24 mx-auto">
      <div className="size-full overflow-auto">
        <div className="p-4 flex flex-row-reverse w-full gap-6">
          <Image
              src="/static/icons/list.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/static/icons/grip.svg"
              alt=""
              width={20}
              height={20}
              className="cursor-pointer"
            />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {
            new Array(20).fill(0).map((e, index) => {
              return <Card key={index} />
            })
          }
        </div>
      </div>
    </main>
    </>
  )
}
