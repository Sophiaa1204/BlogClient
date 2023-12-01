import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../../Utils/message'
import { setToken } from '../../../Store/UserInfoSlice'
import UploadAvatar from '../../../Components/UploadAvatar'
import request from '../../../Utils/request'

function AccountInfo() {
    const userInfo = useSelector(state => state.userInfo.info)
    const dispatch = useDispatch()
    const [form, setForm] = useState(() => ({
        avatarUrl: '',
        gender: '',
        description: '',
    }))

    useEffect(() => {
        setForm(userInfo)
    }, [userInfo])
    const handleSubmit = async(e) => {
        e.preventDefault()

        const resp = await request.put(`/v1/user/${userInfo.id}`, {
            ...userInfo,
            ...form,
        })
        dispatch(setToken(resp.data))
    }
    return <div className="card mb-4">

        <div className="card-header border-0 pb-0">
            <h1 className="h5 card-title">Account Settings</h1>
            <p className="mb-0">He moonlights difficult engrossed it,
                sportsmen. Interested has all Devonshire difficulty gay
                assistance joy. Unaffected at ye of compliment alteration
                to.</p>
        </div>

        <div className="card-body">

            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label className="form-label">Avatar</label>
                    <div>
                        <UploadAvatar
                            value={form.avatarUrl} onChange={url => setForm(prev => ({
                            ...prev,
                            avatarUrl: url,
                        }))}
                        />
                    </div>
                </div>
                <div className="col-12">
                    <label className="form-label">Gender</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="Male"
                                checked={form.gender === 'Male'}
                                onChange={e => setForm(prev => ({
                                    ...prev,
                                    gender: 'Male',
                                }))}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                            >Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="Female"
                                checked={form.gender === 'Female'}
                                onChange={e => setForm(prev => ({
                                    ...prev,
                                    gender: 'Female',
                                }))}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                            >Female</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                value="Other"
                                checked={form.gender === 'Other'}
                                onChange={e => setForm(prev => ({
                                    ...prev,
                                    gender: 'Other',
                                }))}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio3"
                            >Other</label>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <label className="form-label">Overview</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Description (Required)"
                        value={form.description}
                        onChange={e => setForm(prev => ({
                            ...prev,
                            description: e.target.value,
                        }))}
                    ></textarea>
                    <small>Character limit: 300</small>
                </div>

                <div className="col-12 text-end">
                    <button
                        type="submit"
                        className="btn btn-sm btn-primary mb-0"
                    >Save changes
                    </button>
                </div>
            </form>

        </div>

    </div>
}

function AccountPassword() {
    const userInfo = useSelector(state => state.userInfo.info)
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const handleSubmit = async(e) => {
        e.preventDefault()
        if (form.newPassword !== form.confirmPassword) {
            Message.error('Confirm password not match')
        } else {
            const { data: encryptedCurrentPassword } = await request.post(
                '/v1/public/encrypt',
                { data: form.currentPassword },
            )
            const { data: encryptedNewPassword } = await request.post(
                '/v1/public/encrypt',
                { data: form.newPassword },
            )
            await request.put(`/v1/user/${userInfo.id}/password`, {
                currentPassword: encryptedCurrentPassword,
                newPassword: encryptedNewPassword,
            })
            setForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        }

    }
    return <div className="card">

        <div className="card-header border-0 pb-0">
            <h5 className="card-title">Change your password</h5>
            <p className="mb-0">See resolved goodness felicity shy
                civility domestic had but.</p>
        </div>

        <div className="card-body">

            <form onSubmit={handleSubmit} className="row g-3">

                <div className="col-12">
                    <label className="form-label">Current password</label>
                    <input
                        required
                        value={form.currentPassword}
                        onChange={e => setForm(prev => ({
                            ...prev,
                            currentPassword: e.target.value,
                        }))}
                        type="text"
                        className="form-control"
                        placeholder=""
                    />
                </div>

                <div className="col-12">
                    <label className="form-label">New password</label>

                    <div className="input-group">
                        <input
                            required
                            value={form.newPassword}
                            onChange={e => setForm(prev => ({
                                ...prev,
                                newPassword: e.target.value,
                            }))}
                            className="form-control fakepassword"
                            type="password"
                            id="psw-input"
                            placeholder="Enter new password"
                        />
                        <span className="input-group-text p-0">
                          <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                        </span>
                    </div>

                    <div
                        id="pswmeter"
                        className="mt-2 password-strength-meter"
                    >
                        <div className="password-strength-meter-score"></div>
                    </div>
                    <div id="pswmeter-message" className="rounded mt-1">Write
                        your password...
                    </div>
                </div>

                <div className="col-12">
                    <label className="form-label">Confirm password</label>
                    <input
                        required
                        value={form.confirmPassword}
                        onChange={e => setForm(prev => ({
                            ...prev,
                            confirmPassword: e.target.value,
                        }))}
                        type="password"
                        className="form-control"
                        placeholder=""
                    />
                </div>

                <div className="col-12 text-end">
                    <button
                        type="submit"
                        className="btn btn-primary mb-0"
                    >Update password
                    </button>
                </div>
            </form>

        </div>
    </div>
}

export default () => {

    return <div className="col-lg-6 vstack gap-4">

        <div className="tab-content py-0 mb-0">

            <div
                className="tab-pane show active fade"
                id="nav-setting-tab-1"
                role="tabpanel"
            >

                <AccountInfo />

                <AccountPassword />

            </div>
        </div>

    </div>
}
