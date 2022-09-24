import axios from "axios";
import {axiosInstance} from "../config";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	height: 100vh;
	color: ${({ theme }) => theme.text};
	position: relative;
`;

const Mid = styled.div`
	position: fixed;
	top: 15vh;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: ${({ theme }) => theme.bgLighter};
	border: 1px solid ${({ theme }) => theme.soft};
	padding: 2rem 5rem;
	/* gap: 10px; */
	@media (max-width: 768px) {
		padding: 2rem 3rem;
	}

	@media (max-width: 600px) {
		padding: 2rem 2rem;
	}
`;

const Title = styled.h1`
	font-size: 1.7rem;
`;

const SubTitle = styled.h2`
	font-size: 1rem;
	font-weight: 300;
	padding: 0.5rem 0;
`;

const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	margin: 0.2rem 0;
	border-radius: 3px;
	padding: 0.6rem;
	background-color: transparent;
	width: 100%;
	color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
	border-radius: 3px;
	border: none;
	padding: 0.7rem 1.5rem;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
	margin: 0.4rem 0;
	&:hover {
		background-color: ${({ theme }) => theme.hover};
	}
`;
const ButtonGoogle = styled.div`
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	border: none;
	padding: 0.7rem 1.5rem;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
	margin: 0.4rem 0;
	&:hover {
		background-color: ${({ theme }) => theme.hover};
	}
	span {
		margin-left: 0.3rem;
	}
`;

const More = styled.div`
	display: flex;
	margin-top: 0.5rem;
	font-size: 0.7rem;
	color: ${({ theme }) => theme.textSoft};
	/* width: 100%; */
	/* background-color: red; */
`;

const Links = styled.div`
	margin-left: 3rem;
`;

const Link = styled.span`
	margin-left: 1.5rem;
`;

const SignIn = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		dispatch(loginStart());
		try {
			const res = await axiosInstance.post("/auth/signin", { name, password });
			console.log(res.data);
			dispatch(loginSuccess(res.data));
			navigate("/");
		} catch (err) {
			dispatch(loginFailure());
		}
	};

	const signInWithGoogle = async () => {
		dispatch(loginStart());
		signInWithPopup(auth, provider)
			.then((result) => {
				axiosInstance
					.post("/auth/google", {
						name: result.user.displayName,
						email: result.user.email,
						img: result.user.photoURL,
					})
					.then((res) => {
						console.log(res);
						dispatch(loginSuccess(res.data));
						navigate("/");
					});
			})
			.catch((error) => {
				dispatch(loginFailure());
			});
	};

	const handleRegister = async (e) => {
		try {
			e.preventDefault();
			const res = await axios.post("/auth/register", {
				name,
				email,
				password,
			});
			res.data && navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Mid>
				<Wrapper>
					<Title>Sign in</Title>
					<SubTitle>to continue to MyTube</SubTitle>
					<Input
						placeholder="username"
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleLogin}>Sign in</Button>
					<Title>or</Title>
					<ButtonGoogle onClick={signInWithGoogle}>
						<FcGoogle />
						<span>Signin with Google</span>
					</ButtonGoogle>
					<Title>or</Title>
					<Input
						placeholder="username"
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button onClick={handleRegister}>Sign up</Button>
				</Wrapper>
				<More>
					English(USA)
					<Links>
						<Link>Help</Link>
						<Link>Privacy</Link>
						<Link>Terms</Link>
					</Links>
				</More>
			</Mid>
		</Container>
	);
};

export default SignIn;
