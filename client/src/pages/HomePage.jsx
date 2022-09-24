import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { axiosInstance } from "../config";
const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	/* background-color: pink; */
`;
const NoVideo = styled.div`
	font-size: 2rem;
	width: 100%;
	height: 90vh;
	color: ${({ theme }) => theme.text};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	/* background-color: pink; */
`;

const HomePage = ({ type }) => {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		const fetchVideos = async () => {
			const res = await axiosInstance.get(`/videos/${type}`);
			setVideos(res.data);
		};
		fetchVideos();
	}, [type]);

	return (
		<Container>
			{" "}
			{videos.length != 0 ? (
				videos.map((video) => <Card key={video._id} video={video} />)
			) : (
				<NoVideo>No Video Available</NoVideo>
			)}
		</Container>
	);
};

export default HomePage;
