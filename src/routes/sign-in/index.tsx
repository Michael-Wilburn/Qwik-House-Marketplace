import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { ArrowRightIcon } from '~/assets/icons/authenticationIcons';
import VisibilityIcon from '~/assets/svg/visibilityIcon.svg';

export default component$(() => {
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

    return (
        <>
            <div class="pageContainer">
                <header>
                    <p class="pageHeader">
                        Welcome Back!
                    </p>
                </header>
                <form>
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