import { useCallback, useRef } from 'react'
import request from '../../Utils/request'

export default ({
                    value, onChange,
                }) => {
    const fileRef = useRef(null)
    const handleUploadFile = async(event) => {
        const file = event.target.files[0]
        if (!file) {
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        const resp = await request.post('/v1/public/upload', formData)
        onChange(resp.data)
    }

    const selectFile = (e) => {
        e.preventDefault()
        fileRef.current.click()
    }

    //TODO url for image server
    return <>
        {
            value
                ? <img
                    className={'rounded border border-primary-subtle border-3'}
                    width={'100px'}
                    height={'100px'}
                    src={value.includes('http') ? value : ('http://localhost:8000' + value)}
                    onClick={selectFile}
                />
                : <button
                    className={'btn btn-sm btn-primary'}
                    onClick={selectFile}
                >Upload
                </button>
        }
        <input
            ref={fileRef} type={'file'} style={{ display: 'none' }}
            onChange={handleUploadFile}
        />
    </>
}
