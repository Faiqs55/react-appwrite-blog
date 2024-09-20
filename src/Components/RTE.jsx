import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Controller } from "react-hook-form";

const RTE = ({control, name, label, defaultValue=''}) => {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
     name={name || 'content'}
     control={control}
     render={({field: {onChange}}) => (
        <Editor
         onEditorChange={onChange}
         apiKey="4k35rn1tiaqntn4pop4mbzsy5ek8ymh2jrj2p3t2a63tdjhb"
         initialValue={defaultValue}
         init={{
            height: 500,
            menubar: true,
            initialValue: defaultValue,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
         }}
        />
     )}
    />
    </div>
  );
};

export default RTE;
