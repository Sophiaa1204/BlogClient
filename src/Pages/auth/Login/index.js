import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setToken } from '../../../Store/UserInfoSlice'
import { Figure } from './Figure'
import Background from './Background'
import Message from '../../../Utils/message'
import request from '../../../Utils/request'
import { JSEncrypt } from 'jsencrypt'

export default () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [publicKey, setPublicKey] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getPublicKey = async() => {
    const data = await request.get('/publicKey.txt')
    setPublicKey(data)
  }
  const handleSubmit = async(event) => {
    event.preventDefault()
    if (!form.email || !form.password) {
      Message.error('Please fill all fields')
    } else {
      const { data: encryptedPassword } = await request.post(
        '/v1/public/encrypt',
        { data: form.password },
      )
      const resp = await request.post('/v1/user/login', {
        email: form.email,
        password: encryptedPassword,
      })
      dispatch(setToken(resp.data))
      navigate('/')
    }
  }

  return <div>
    <main>

      <div className="bg-primary pt-5 pb-0 position-relative">
        <Background />

        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">

              <h1 className="display-4 text-white mb-4 position-relative">Welcome
                back!</h1>

              <Figure />

            </div>
            <div className="col-sm-10 col-md-8 col-lg-6 position-relative z-index-1">

              <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">

                <h2 className="h1 mb-2">Sign in</h2>
                <p>Don't have an account?<Link to="/auth/register"> Click here
                  to
                  sign up</Link></p>

                <form className="mt-4" onSubmit={handleSubmit}>

                  <div className="mb-3 position-relative input-group-lg">
                    <input
                      onChange={(event) => {
                        setForm({
                          ...form,
                          email: event.target.value,
                        })
                      }}
                      value={form.email}
                      required
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="mb-3">

                    <div className="input-group input-group-lg">
                      <input
                        onChange={(event) => {
                          setForm({
                            ...form,
                            password: event.target.value,
                          })
                        }}
                        required
                        value={form.password}
                        className="form-control fakepassword"
                        type="password"
                        id="psw-input"
                        placeholder="Enter new password"
                      />
                      <span className="input-group-text p-0">
                    <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"></i>
                  </span>
                    </div>
                  </div>

                  <div className="mb-3 d-sm-flex justify-content-between">
                    <div>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberCheck"
                      >Remember me?</label>
                    </div>
                    {/*TODO*/}
                    <a href="forgot-password.html">Forgot password?</a>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary-soft"
                    >Login
                    </button>
                  </div>

                  <p className="mb-0 mt-3">©2023 <a
                    target="_blank"
                    href="https://www.webestica.com/"
                  >Webestica.</a> All rights reserved</p>
                </form>

              </div>

            </div>
          </div>
        </div>

      </div>

    </main>
  </div>
}
