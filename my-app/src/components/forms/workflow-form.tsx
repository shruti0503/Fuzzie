import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import {z} from 'zod'
import { useRouter } from 'next/router';
import { WorkflowFormSchema } from '@/lib/types';
//import { WorkflowFormSchema } from './WorkflowFormSchema'; // Import WorkflowFormSchema from the appropriate file

type Props = {
    title?: string;
    subTitle?: string;
}

const WorkflowForm = ({ subTitle, title }: Props) => {
    const form = useForm<z.infer<typeof WorkflowFormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(WorkflowFormSchema),
        defaultValues: {
            name: '',
            //description: '',
        }
    });

    const isLoading=form.formState.isLoading
    //const router=useRouter() // to refersh 

    return (
        <div>
            WorkflowForm
        </div>
    );
}

export default WorkflowForm;
