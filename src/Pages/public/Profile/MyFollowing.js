import { useSelector } from 'react-redux'
import FollowerList from '../../../Components/FollowerList'

export default () => {
    const userInfo = useSelector(state => state.userInfo.info)

    return <div className="col-md-8 col-lg-9 vstack gap-4">
        <FollowerList userId={userInfo.id} type={'following'} />
    </div>
}
