import axios from "axios";
import {axiosInstance} from "../config";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
	display: flex;
	margin: 1.5rem 0;
	gap: 1rem;
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const Details = styled.div`
	display: flex;
	flex-direction: column;
	color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
	font-size: 1rem;
	font-weight: 500;
`;

const Date = styled.span`
	font-size: 0.7rem;
	font-weight: 400;
	color: ${({ theme }) => theme.textSoft};
	/* margin-left: 5px; */
`;

const Text = styled.span`
	font-size: 0.8rem;
`;

const Comment = ({ comment }) => {
	const [channel, setChannel] = useState({});

	useEffect(() => {
		const fetchComment = async () => {
			const res = await axiosInstance.get(`/users/find/${comment.userId}`);
			setChannel(res.data);
		};
		fetchComment();
	}, [comment.userId]);

	return (
		<Container>
			{channel && <Avatar src={channel.img} />}
			<Details>
				{channel && (
					<Name>
						{channel.name} <Date>{format(comment.createdAt)}</Date>
					</Name>
				)}
				<Text>{comment.desc}</Text>
			</Details>
		</Container>
	);
};

export default Comment;
