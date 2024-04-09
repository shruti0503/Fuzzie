'use client'
import React, { useEffect } from 'react';
import { useRouter,  } from 'next/router';
import { redirect } from 'next/navigation'

const Page = () => {
  

  useEffect(() => {
    // Navigate to /workflow/editor/[id]
     redirect('/workflows/editor/2');
  }, []); 

  return <div>Page</div>;
};

export default Page;
