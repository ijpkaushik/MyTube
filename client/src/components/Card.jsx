import axios from "axios";
import {axiosInstance} from "../config"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
	width: ${(props) => props.type !== "sm" && "360px"};
	margin-bottom: ${(props) => (props.type === "sm" ? "1rem" : "2rem")};
	/* padding: ${(props) => props.type !== "sm" && "0rem 1rem"}; */
	cursor: pointer;
	display: ${(props) => props.type === "sm" && "flex"};
	gap: 1rem;
	/* background-color: burlywood; */
`;

const Image = styled.img`
	border-radius: 5px;
	width: 100%;
	max-width: ${(props) => props.type === "sm" && "220px"};
	height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
	/* width: ${(props) => (props.type === "sm" ? "40px" : "67px")}; */
	background-color: #999;
	/* flex: 3; */
`;

const Details = styled.div`
	display: flex;
	margin-top: ${(props) => props.type !== "sm" && "1rem"};
	gap: 1rem;
	/* flex: 3; */
`;

const ChannelImage = styled.img`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background-color: #999;
	display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
	font-size: 1.1rem;
	font-weight: 500;
	color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
	font-size: 0.9rem;
	color: ${({ theme }) => theme.textSoft};
	margin: 0.3rem 0;
`;

const Info = styled.div`
	font-size: 0.9rem;
	color: ${({ theme }) => theme.textSoft};
`;
const Card = ({ type, video }) => {
	const [channel, setChannel] = useState({});

	useEffect(() => {
		const fetchChannel = async () => {
			const res = await axiosInstance.get(`/users/find/${video.userId}`);
			setChannel(res.data);
		};
		fetchChannel();
	}, [video.userId]);

	return (
		<Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
			<Container type={type}>
				<Image type={type} src={video.imgUrl} />
				<Details type={type}>
					{channel && <ChannelImage type={type} src={channel.img} />}
					<Texts>
						<Title>{video.title}</Title>
						{channel && <ChannelName>{channel.name}</ChannelName>}
						<Info>
							{video.views} views • {format(video.createdAt)}
						</Info>
					</Texts>
				</Details>
			</Container>
		</Link>
	);
};

export default Card;
