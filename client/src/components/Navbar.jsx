import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
	MdAccountCircle,
	MdSearch,
	MdOutlineVideoCall,
	MdLogout,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import { logout } from "../redux/userSlice";

const Container = styled.div`
	position: sticky;
	top: 0;
	background-color: ${({ theme }) => theme.bgLighter};
	height: 10vh;
`;

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	padding: 0rem 2rem;
	margin: auto;
	position: relative;
`;

const Search = styled.div`
	width: 40%;
	/* position: absolute; */
	/* left: 0px; */
	/* right: 0px; */
	/* margin: auto; */
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 3px;
	color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
	border: none;
	background-color: transparent;
	outline: none;
	color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	background-color: transparent;
	border: 1px solid #3ea6ff;
	color: #3ea6ff;
	border-radius: 3px;
	font-weight: 500;
	/* margin-top: 1rem; */
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;
const Icon = styled.span`
	font-size: 1.2rem;
`;

const Span = styled.span`
	font-size: 1rem;
`;

const ButtonSignOut = styled.button`
	position: absolute;
	right: 0;
	padding: 1rem 4rem;
	font-size: 1rem;
	gap: 0.5rem;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	&:hover {
		background-color: ${({ theme }) => theme.hover};
	}
`;

const User = styled.div`
	font-size: 1rem;
	display: flex;
	align-items: center;
	gap: 1rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const LogoutControl = styled.div`
	font-size: 1rem;
	display: flex;
	/* flex-direction: column; */
	align-items: center;
	/* gap: 10px; */
	font-weight: 500;
	gap: 1rem;
	color: ${({ theme }) => theme.text};
	cursor: pointer;
`;

const NavbarClick = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* gap: 10px; */
	font-weight: 500;
	color: ${({ theme }) => theme.text};
	cursor: pointer;
`;

const AddVideo = styled.span`
	font-size: 1.5rem;
	cursor: pointer;
`;

const Avatar = styled.img`
	width: 32px;
	height: 32px;
	margin: 0 0 0 1rem;
	border-radius: 50%;
	background-color: #999;
`;

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [logoutt, setLogoutt] = useState(false);
	const [q, setQ] = useState("");
	const { currentUser } = useSelector((state) => state.user);

	const handleSignOut = () => {
		setLogoutt(!logoutt);
		dispatch(logout());
	};
	return (
		<>
			<Container>
				<Wrapper>
					<Search>
						<Input
							placeholder="Search"
							onChange={(e) => setQ(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === "Enter") navigate(`/search?q=${q}`);
							}}
						/>
						<MdSearch onClick={() => navigate(`/search?q=${q}`)} />
					</Search>
					<NavbarClick>
						{currentUser ? (
							<User>
								<AddVideo>
									<MdOutlineVideoCall onClick={() => setOpen(true)} />
								</AddVideo>
								<LogoutControl onClick={() => setLogoutt(!logoutt)}>
									<Avatar src={currentUser.img} />
									{currentUser.name}
								</LogoutControl>
							</User>
						) : (
							<Link to="signin" style={{ textDecoration: "none" }}>
								<Button>
									<Icon>
										<MdAccountCircle />
									</Icon>
									<Span>SIGN IN</Span>
								</Button>
							</Link>
						)}
					</NavbarClick>
				</Wrapper>
				{logoutt && (
					<ButtonSignOut onClick={handleSignOut}>
						SIGN OUT
						<MdLogout />
					</ButtonSignOut>
				)}
			</Container>
			{open && <Upload setOpen={setOpen} />}
		</>
	);
};

export default Navbar;
