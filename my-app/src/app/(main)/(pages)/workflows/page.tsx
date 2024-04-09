
import React from 'react'
import WorkFlowBtn from './_components/workFlowBtn'
import WorkFlow from './_components/workflow'

function Page() {
  return (
    <div className='flex flex-col gap-4  relative'>
        <h1 className='text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg
        flex items-center border-b justify-center'>WorkFlows</h1>
        <WorkFlowBtn />
        <WorkFlow 
        description='Creating a test workflow'
        id='e234543678f'
        name="Automation Work-flow"
        publish={false}
        />

    </div>
  )
}

export default Page