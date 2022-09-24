import axios from "axios";
import {axiosInstance} from "../config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
	display: flex;
	align-items: center;
`;

const Avatar = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const Input = styled.input`
	border: none;
	border-bottom: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	background-color: transparent;
	outline: none;
	padding: 1rem;
	width: 100%;
`;

const Comments = ({ videoId }) => {
	const { currentUser } = useSelector((state) => state.user);

	const [comments, setComments] = useState([]);
	const [desc, setDesc] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const res = await axiosInstance.get(`/comments/${videoId}`);
				setComments(res.data);
			} catch (err) {}
		};
		fetchComments();
	}, [videoId]);

	const addComment = async (e) => {
		try {
			// e.preventDefault();
			const res = await axiosInstance.post("/comments", {
				userId: currentUser._id,
				videoId,
				desc,
			});
			console.log(res);
			res.status === 200 && navigate(`/video/${res.data._id}`);
		} catch (error) {
			console.log(error);
		}

		navigate(`/`);
	};

	return (
		<Container>
			<NewComment>
				{currentUser && (
					<>
						<Avatar src={currentUser.img} />
						<Input
							placeholder="Add a comment..."
							onKeyPress={(e) => {
								if (e.key === "Enter") addComment();
							}}
							onChange={(e) => {
								setDesc(e.target.value);
							}}
						/>
					</>
				)}
			</NewComment>
			{comments.map((comment) => (
				<Comment key={comment._id} comment={comment} />
			))}
		</Container>
	);
};

export default Comments;
