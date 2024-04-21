
import React from 'react'
import WorkFlowBtn from './_components/workFlowBtn'
import WorkFlow from './_components/workflow'
import { onGetWorkflows } from './editor/[editorId]/_actions/workFlowConnections';
import Workflow from './_components/workflow';
type Props = {}
const Page= async(props: Props)=> {

  const workflows=await onGetWorkflows()
  return (
    <div className="relative flex flex-col gap-4">

        <h1 className='text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg
        flex items-center border-b justify-between'>WorkFlows   <WorkFlowBtn /></h1>
    



      <section className="flex flex-col m-2">

        {/* <MoreCredits /> */}
        {workflows?.length ? (
          workflows.map((flow) => (
            <Workflow
              key={flow.id}
              {...flow}
            />
          ))
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No Workflows
          </div>
        )}
      </section>
    </div>
  )
}

export default Page