import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { app } from '../../config/firebase.config.js'
import { Link, useNavigate } from '@builder.io/qwik-city';
import { ArrowRightIcon } from '~/assets/icons/authenticationIcons';
import VisibilityIcon from '~/assets/svg/visibilityIcon.svg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from '~/components/alert/alert.js';

export default component$(() => {
    const message = useSignal('');
    const navigate = useNavigate()
    const showPassword = useSignal(false);
    const formData = useStore({
        email: '',
        password: '',
    })

    const { email, password } = formData;

    const onChange = $((event: any) => {
        if (event.target.id === 'email') {
            formData.email = event.target.value
        }
        if (event.target.id === 'password') {
            formData.password = event.target.value
        }
    });

    const onSubmit = $(async () => {
        try {
            const auth = getAuth(app)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            message.value = 'Bad User Credentials';
            setTimeout(() => {
                message.value = '';
            }, 2000);
        }
    })

    return (
        <>
            <div class="pageContainer">
                {message.value !== '' ? <Alert message={message} /> : null}
                <header>
                    <p class="pageHeader">
                        Welcome Back!
                    </p>
                </header>
                <form onSubmit$={onSubmit} preventdefault:submit>
                    <input
                        type="email"
                        class="emailInput"
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange$={onChange}
                    />
                    <div class="passwordInputDiv">
                        <input
                            type={showPassword.value ? 'text' : 'password'}
                            class="passwordInput" placeholder='Password'
                            id='password'
                            value={password}
                            onChange$={onChange}
                        />
                        <img
                            class="showPassword"
                            width="25"
                            height="25"
                            src={VisibilityIcon}
                            onClick$={() => showPassword.value ? showPassword.value = false : showPassword.value = true}
                            alt="show password"
                        />
                    </div>
                    <Link href="/forgot-password" class="forgotPasswordLink">
                        Forgot Password
                    </Link>
                    <div class="signInBar">
                        <p class="signInText"> Sign In</p>
                        <button class="signInButton"><ArrowRightIcon fill="#FFFFFF" /></button>
                    </div>
                </form>
                {/* Google OAuth  */}
                <Link href="/sign-up" class="registerLink">
                    Sign Up Insted
                </Link>
            </div >

        </>
    );
});