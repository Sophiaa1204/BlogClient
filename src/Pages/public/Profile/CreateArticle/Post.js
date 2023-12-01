import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import request from '../../../../Utils/request'
import Message from '../../../../Utils/message'

import RichText from '../../../../Components/RichText'
import UploadImage from '../../../../Components/UploadImage'

export default function Post() {
    const userInfo = useSelector(state => state.userInfo.info)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        title: '',
        thumbnailUrl: '',
        categoryId: '',
        content: '',
    })
    const [categoryList, setCategoryList] = useState([])
    const getCategoryList = async() => {
        const resp = await request.get('v1/category/list/get')
        setCategoryList(resp.data.rows)
    }
    useEffect(() => {
        getCategoryList()
    }, [])
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!form.thumbnailUrl || !form.content) {
            Message.error('Please fill in the required fields.')
            return
        }
        const resp = await request.post('v1/article', {
            ...form,
            userId: userInfo.id,
            isPublish: true,
        })
        const articleId = resp.data.id
        navigate(`/blogDetail/${articleId}`)
    }
    return <div className="card">

        <div className="card-header border-0 pb-0">
            <h1 className="h4 card-title mb-0">Create an article</h1>
        </div>

        <div className="card-body">
            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-12">
                    <label className="form-label">Title</label>
                    <input
                        required
                        value={form.title}
                        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                        type="text"
                        className="form-control"
                        placeholder="Article title (Required)"
                    />
                    <small>Title that describes what the article is about.</small>
                </div>

                <div className="col-12">
                    <label className="form-label">Thumbnail</label>
                    <div>
                        <UploadImage
                            value={form.thumbnailUrl}
                            onChange={url => setForm(prev => ({ ...prev, thumbnailUrl: url }))}
                        />
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                    <label className="form-label">Category (required)</label>
                    <select
                        required
                        value={form.categoryId}
                        onChange={e => setForm(prev => ({ ...prev, categoryId: Number(e.target.value) }))}
                        className="form-control"
                        aria-label="Default select example"
                    >
                        <option selected>Open this select menu</option>
                        {
                            categoryList.map(item => {
                                return <option value={item.id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>

                <div className="col-12">
                    <label className="form-label">Content</label>
                    <div>
                        <RichText
                            value={form.content}
                            onChange={text => setForm(prev => ({ ...prev, content: text }))}
                        />
                    </div>
                    <small>Character limit: 1000</small>
                </div>

                <hr />

                <div className="col-12 text-end">
                    <button type="submit" className="btn btn-primary mb-0">Create a page</button>
                </div>
            </form>
        </div>

    </div>

}
