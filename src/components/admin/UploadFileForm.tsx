import React from 'react';

interface props {
  action: () => void;
}

const UploadFileForm = (props: props) => {
  return (
    <form action={props.action}>
      <label>
        <span>Upload a file</span>
        <input type='file' name='file' />
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default UploadFileForm;
