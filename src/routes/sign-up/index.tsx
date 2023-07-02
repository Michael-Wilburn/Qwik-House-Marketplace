import { $, component$, useSignal, useStore } from '@builder.io/qwik';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app, db } from '../../config/firebase.config.js'
import { Link, useNavigate } from '@builder.io/qwik-city';
import { ArrowRightIcon } from '~/assets/icons/authenticationIcons';
import VisibilityIcon from '~/assets/svg/visibilityIcon.svg';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'


export default component$(() => {
    const showPassword = useSignal(false);
    const navigate = useNavigate();
    const formData = useStore({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = formData;

    const onChange = $((event: any) => {
        if (event.target.id === 'email') {
            formData.email = event.target.value
        }
        if (event.target.id === 'password') {
            formData.password = event.target.value
        }
        if (event.target.id === 'name') {
            formData.name = event.target.value
        }
    });

    const onSubmit = $(async () => {
        try {
            const auth = getAuth(app);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            updateProfile(user, {
                displayName: name
            })

            const formDataCopy: {
                name: string,
                email: string,
                password?: string,
                timestamp?: unknown
            } = { ...formData }

            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')
        } catch (error) {
            console.log(error)
        }

    })

    return (
        <>
            <div class="pageContainer">
                <header>
                    <p class="pageHeader">
                        Welcome Back!
                    </p>
                </header>
                <form onSubmit$={onSubmit} preventdefault:submit>
                    <input
                        type="text"
                        class="nameInput"
                        placeholder='Name'
                        id='name'
                        value={name}
                        onChange$={onChange}
                    />
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
                    <div class="signUpBar">
                        <p class="signUpText"> Sign Up</p>
                        <button class="signUpButton"><ArrowRightIcon fill="#FFFFFF" /></button>
                    </div>
                </form>
                {/* Google OAuth  */}
                <Link href="/sign-in" class="registerLink">
                    Sign In Insted
                </Link>
            </div >

        </>
    );
});