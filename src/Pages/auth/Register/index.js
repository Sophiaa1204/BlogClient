import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import request from '../../../Utils/request'
import { Figure } from './Figure'
import Background from './Background'
import Message from '../../../Utils/message'

export default () => {
  const navigate = useNavigate()
  const iconRef = useRef()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  useEffect(() => {
    new window.bootstrap.Popover(iconRef.current)
  }, [])

  useEffect(() => {
    console.log(form)
  }, [form])

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.confirmPassword) {
      Message.error('Please fill all fields')
      return
    }
    if (form.password !== form.confirmPassword) {
      Message.error('Password and confirm password must be the same')
      return
    }
    const { data: encryptedPassword } = await request.post(
      '/v1/public/encrypt',
      { data: form.password },
    )
    await request.post('/v1/user/signUp', {
      email: form.email,
      password: encryptedPassword,
    })
    navigate('/auth/login')
  }
  return <div>
    <main>

      <div className="bg-primary pt-5 pb-0 position-relative">
        <Background />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center">

              <h1 className="display-4 text-white mb-4 position-relative">Welcome
                back!</h1>

              <Figure />

            </div>
            <div className="col-sm-10 col-md-8 col-lg-6 position-relative z-index-1">

              <div className="card card-body p-4 p-sm-5 mt-sm-n5 mb-n5">
                <div className="text-center">
                  <h2 className="h1 mb-2">Sign up</h2>
                  <span className="d-block">Already have an account? <Link to="/auth/login">Sign in here</Link></span>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                  <div className="mb-3 input-group-lg">
                    <input
                      type="email"
                      required
                      className="form-control"
                      placeholder="Enter email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }}
                    />
                    <small>We'll never share your email with anyone
                      else.</small>
                  </div>
                  <div className="mb-3 position-relative">
                    <div className="input-group input-group-lg">
                      <input
                        className="form-control fakepassword"
                        type={showPassword ? 'text' : 'password'}
                        id="psw-input"
                        required
                        placeholder="Enter new password"
                        value={form.password}
                        onChange={(e) => {
                          setForm({
                            ...form,
                            password: e.target.value,
                          })
                        }}
                      />
                      <span className="input-group-text p-0">
                    <i
                      onClick={() => setShowPassword(!showPassword)}
                      className={`fakepasswordicon fa-solid ${showPassword
                        ? 'fa-eye'
                        : 'fa-eye-slash'} cursor-pointer p-2 w-40px`}
                    ></i>
                  </span>
                    </div>
                    <div id="pswmeter" className="mt-2 password-strength-meter">
                      <div className="password-strength-meter-score"></div>
                    </div>
                    <div className="d-flex mt-1">
                      <div id="pswmeter-message" className="rounded">Write your
                        password...
                      </div>
                      <div className="ms-auto">
                        <i
                          ref={iconRef}
                          className="bi bi-info-circle ps-1"
                          data-bs-container="body"
                          data-bs-toggle="popover"
                          data-bs-placement="top"
                          data-bs-content="Include at least one uppercase, one lowercase, one special character, one number and 8 characters long."
                          data-bs-original-title=""
                          title=""
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 input-group-lg">
                    <input
                      className="form-control"
                      type="password"
                      required
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          confirmPassword: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="mb-3 text-start">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="keepSignedCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="keepSignedCheck"
                    > Keep me signed in</label>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary"
                    >Sign me up
                    </button>
                  </div>
                  <p className="mb-0 mt-3 text-center">©2022 <a
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
