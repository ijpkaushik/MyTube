import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

import {
	MdOutlineHome,
	MdOutlineExplore,
	MdOutlineSubscriptions,
	MdOutlineVideoLibrary,
	MdHistory,
	MdAccountCircle,
	MdOutlineLibraryMusic,
	MdOutlineSportsBasketball,
	MdOutlineSportsEsports,
	MdOutlineMovie,
	MdOutlineArticle,
	MdOutlineLiveTv,
	MdOutlineSettings,
	MdOutlinedFlag,
	MdOutlineHelpOutline,
	MdOutlineSettingsBrightness,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
	flex: 1;
	background-color: ${({ theme }) => theme.bgLighter};
	min-height: 100vh;
	height: fit-content;
	color: ${({ theme }) => theme.text};
	font-size: 1rem;
	position: sticky;
	top: 0;
`;

const Wrapper = styled.div`
	padding: 1rem 2rem;
`;

const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	font-weight: bold;
	margin-bottom: 1rem;
`;

const Img = styled.img`
	height: 25px;
`;

const Item = styled.div`
	display: flex;
	align-items: center;
	font-weight: 300;
	font-size: 1.4rem;
	gap: 1rem;
	cursor: pointer;
	padding: 0.5rem 0;
	&:hover {
		background-color: ${({ theme }) => theme.soft};
	}
`;

const Span = styled.span`
	font-size: 1rem;
`;

const Hr = styled.hr`
	margin: 1rem 0;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
	font-size: 0.95rem;
`;

const Icon = styled.span`
	font-size: 1.2rem;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	background-color: transparent;
	border: 1px solid #3ea6ff;
	color: #3ea6ff;
	border-radius: 3px;
	font-weight: 500;
	margin-top: 1rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const Title = styled.h2`
	font-size: 1rem;
	font-weight: 500;
	color: #aaaaaa;
	margin-bottom: 1rem;
`;

const Menu = ({ darkMode, setDarkMode }) => {
	const { currentUser } = useSelector((state) => state.user);

	return (
		<Container>
			<Wrapper>
				<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
					<Logo>
						<Img src={logo} />
						MyTube
					</Logo>
				</Link>
				<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
					<Item>
						<MdOutlineHome />
						<Span>Home</Span>
					</Item>
				</Link>
				<Link to="/trends" style={{ textDecoration: "none", color: "inherit" }}>
					<Item>
						<MdOutlineExplore />
						<Span>Explore</Span>
					</Item>
				</Link>
				<Link
					to="/subscriptions"
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<Item>
						<MdOutlineSubscriptions />
						<Span>Subscriptions</Span>
					</Item>
				</Link>
				<Hr />
				<Item>
					<MdOutlineVideoLibrary />
					<Span>Library</Span>
				</Item>
				<Item>
					<MdHistory />
					<Span>History</Span>
				</Item>
				<Hr />
				{!currentUser && (
					<>
						<Login>
							Sign in to like videos, comment, and subscribe.
							<Link to="signin" style={{ textDecoration: "none" }}>
								<Button>
									<Icon>
										<MdAccountCircle />
									</Icon>
									<Span>SIGN IN</Span>
								</Button>
							</Link>
						</Login>
						<Hr />
					</>
				)}
				<Title>BEST OF MYTUBE</Title>
				<Item>
					<MdOutlineLibraryMusic />
					<Span>Music</Span>
				</Item>
				<Item>
					<MdOutlineSportsBasketball />
					<Span>Sports</Span>
				</Item>
				<Item>
					<MdOutlineSportsEsports />
					<Span>Gaming</Span>
				</Item>
				<Item>
					<MdOutlineMovie />
					<Span>Movies</Span>
				</Item>
				<Item>
					<MdOutlineArticle />
					<Span>News</Span>
				</Item>
				<Item>
					<MdOutlineLiveTv />
					<Span>Live</Span>
				</Item>
				<Hr />
				<Item>
					<MdOutlineSettings />
					<Span>Settings</Span>
				</Item>
				<Item>
					<MdOutlinedFlag />
					<Span>Report</Span>
				</Item>
				<Item>
					<MdOutlineHelpOutline />
					<Span>Help</Span>
				</Item>
				<Item onClick={() => setDarkMode(!darkMode)}>
					<MdOutlineSettingsBrightness />
					<Span>{darkMode ? "Light" : "Dark"} Mode</Span>
				</Item>
			</Wrapper>
		</Container>
	);
};

export default Menu;
