'use client';
import { MdPreview } from 'md-editor-rt';
import React from 'react';

interface props {
  body: string;
}

const MdViewer = (props: props) => {
  return (
    <div className='w-[100%]'>
      <MdPreview id={'preview-only'} modelValue={props.body} language='en-US' />
    </div>
  );
};

export default MdViewer;
