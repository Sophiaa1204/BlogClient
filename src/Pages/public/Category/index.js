import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import request from '../../../Utils/request'
import TabPanel from './TabPanel'
import Tabs from './Tabs'
import Search from './Search'


export default () => {
    let { id } = useParams()
    const [categoryList, setCategoryList] = useState([])
    const [articleList, setArticleList] = useState([])
    const [currentTab, setCurrentTab] = useState(null)
    const [searchText, setSearchText] = useState('')
    const filteredList = useMemo(() => {
        return articleList.filter(item => item.categoryId === currentTab).filter(item => item.title.includes(searchText))
    }, [currentTab, articleList, searchText])
    useEffect(() => {
        getCategoryList()
        getAllArticleList()
    }, [])
    const getAllArticleList = async() => {
        const resp = await request.get('/v1/article/list/all')
        setArticleList(resp.data)
    }
    const getCategoryList = async() => {
        const resp = await request.get('/v1/category/list/get')
        setCategoryList(resp.data.rows)
        if (resp.data.rows.length) {
            setCurrentTab(Number(id) || resp.data.rows[0].id)
        }
    }
    const handleTabChange = (id) => {
        setCurrentTab(id)
    }
    return <main className="pt-5">
        <Search value={searchText} onChange={setSearchText} />
        <div className="py-5">
            <div className="container">
                <Tabs data={categoryList} value={currentTab} onChange={handleTabChange} />
                <TabPanel data={filteredList} />
            </div>
        </div>
    </main>
}
