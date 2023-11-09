import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default function RichText({ value, onChange }) {
    const editorRef = useRef(null)
    const handleChange = (content, editor) => {
        onChange(editorRef.current.getContent())
    }
    return (
        <>
            <Editor
                apiKey="iptnomlhj5q9825f1u226cbmdl29p4xk06mxqsu13eqzkk9p"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={value}
                onChange={handleChange}
                init={{
                    height: 500,
                    plugins: [
                        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media',
                        'table', 'emoticons', 'template', 'help',
                    ],
                    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                        'forecolor backcolor emoticons | help',
                    content_style:
                        'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
        </>
    )
}
