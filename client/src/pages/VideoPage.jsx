import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	MdThumbUpOffAlt,
	MdThumbUp,
	MdThumbDownOffAlt,
	MdThumbDown,
	MdShare,
	MdAddTask,
} from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {axiosInstance} from "../config";
import Comments from "../components/Comments";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
	min-height: 100vh;
	display: flex;
	gap: 1rem;
`;

const Content = styled.div`
	flex: 5;
`;
const VideoWrapper = styled.div`
	/* background-color: red; */
`;

const Title = styled.h1`
	font-size: 1rem;
	font-weight: 400;
	margin: 1rem 0;
	color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 750px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 1rem;
	}
`;

const Info = styled.span`
	color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
	display: flex;
	gap: 1rem;
	color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
`;

const Hr = styled.hr`
	margin: 1rem 0;
	border: 0.5px solid ${({ theme }) => theme.soft};
`;

const NoDescription = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Channel = styled.div`
	color: ${({ theme }) => theme.text}; ;
`;

const ChannelInfo = styled.div`
	display: flex;
	gap: 1rem;
`;

const Image = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const ChannelDetail = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
	font-weight: 500;
`;

const ChannelCounter = styled.span`
	margin-top: 0.5rem;
	margin-bottom: 1.5rem;
	color: ${({ theme }) => theme.textSoft};
	font-size: 0.7rem;
`;

const Description = styled.p`
	font-size: 0.9rem;
`;

const Subscribe = styled.button`
	background-color: #cc1a00;
	font-weight: 500;
	color: white;
	border: none;
	border-radius: 3px;
	height: max-content;
	padding: 0.7rem 1.5rem;
	cursor: pointer;
`;

const VideoFrame = styled.video`
	border-radius: 3px;
	max-height: fit-content;
	width: 100%;
	object-fit: cover;
	cursor: pointer;
`;

const VideoPage = () => {
	const { currentUser } = useSelector((state) => state.user);
	const { currentVideo } = useSelector((state) => state.video);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const path = useLocation().pathname.split("/")[2];

	const [channel, setChannel] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const videoRes = await axiosInstance.get(`/videos/find/${path}`);
				const channelRes = await axiosInstance.get(
					`/users/find/${videoRes.data.userId}`
				);
				console.log(videoRes);
				setChannel(channelRes.data);
				dispatch(fetchSuccess(videoRes.data));
			} catch (err) {}
		};
		fetchData();
	}, [path, dispatch]);

	const handleLike = async () => {
		await axiosInstance.put(`/users/like/${currentVideo._id}`);
		dispatch(like(currentUser._id));
	};
	const handleDislike = async () => {
		await axiosInstance.put(`/users/dislike/${currentVideo._id}`);
		dispatch(dislike(currentUser._id));
	};

	const handleSub = async () => {
		currentUser
			? currentUser.subscribedUsers.includes(channel._id)
				? await axiosInstance.put(`/users/unsub/${channel._id}`)
				: await axiosInstance.put(`/users/sub/${channel._id}`)
			: navigate("/signin");
		dispatch(subscription(channel._id));
	};

	return (
		currentVideo && (
			<Container>
				<Content>
					<VideoWrapper>
						<VideoFrame src={currentVideo.videoUrl} controls />
					</VideoWrapper>
					<Title>{currentVideo.title}</Title>
					<Details>
						<Info>
							{currentVideo.views} views • {format(currentVideo.createdAt)}
						</Info>
						<Buttons>
							<Button onClick={handleLike}>
								{currentVideo.likes?.includes(currentUser?._id) ? (
									<MdThumbUp />
								) : (
									<MdThumbUpOffAlt />
								)}
								{currentVideo.likes?.length}
							</Button>
							<Button onClick={handleDislike}>
								{currentVideo.dislikes?.includes(currentUser?._id) ? (
									<MdThumbDown />
								) : (
									<MdThumbDownOffAlt />
								)}
								Dislike
							</Button>
							<Button>
								<MdShare /> Share
							</Button>
							<Button>
								<MdAddTask /> Save
							</Button>
						</Buttons>
					</Details>
					<Hr />
					{channel && (
						<Channel>
							<NoDescription>
								<ChannelInfo>
									<Image src={channel.img} />
									<ChannelDetail>
										<ChannelName>{channel.name}</ChannelName>
										<ChannelCounter>
											{channel.subscribers} subscribers
										</ChannelCounter>
									</ChannelDetail>
								</ChannelInfo>
								<Subscribe onClick={handleSub}>
									{currentUser
										? currentUser.subscribedUsers?.includes(channel._id)
											? "SUBSCRIBED"
											: "SUBSCRIBE"
										: "SUBSCRIBE"}
								</Subscribe>
							</NoDescription>
							<Description>{currentVideo.desc}</Description>
						</Channel>
					)}
					<Hr />
					<Comments videoId={currentVideo._id} />
				</Content>
				<Recommendation tags={currentVideo.tags} />
			</Container>
		)
	);
};

export default VideoPage;
