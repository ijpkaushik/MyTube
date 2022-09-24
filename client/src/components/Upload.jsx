import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import {axiosInstance} from "../config";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #000000a7;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
`;

const Wrapper = styled.div`
	/* position: fixed; */
	max-width: 1000px;
	width: 60vw;
	height: 80vh;
	border-radius: 5px;
	background-color: ${({ theme }) => theme.bgLighter};
	color: ${({ theme }) => theme.text};
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	position: relative;
	@media (max-width: 750px) {
		width: 80vw;
	}
	@media (max-width: 500px) {
		width: 100vw;
	}
`;
const Close = styled.div`
	font-size: 1.5rem;
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
`;
const Title = styled.h1`
	text-align: center;
`;

const Input = styled.input`
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 0.5rem;
	background-color: transparent;
	z-index: 999;
`;
const Desc = styled.textarea`
	border: 1px solid ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.text};
	border-radius: 3px;
	padding: 0.5rem;
	background-color: transparent;
`;
const Button = styled.button`
	border-radius: 3px;
	border: none;
	padding: 0.5rem 1rem;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
`;
const ButtonUpload = styled.div`
	border-radius: 3px;
	border: none;
	text-align: center;
	padding: 0.5rem 1rem;
	font-weight: 500;
	cursor: pointer;
	background-color: ${({ theme }) => theme.soft};
	color: ${({ theme }) => theme.textSoft};
	&:hover {
		background-color: ${({ theme }) => theme.hover};
	}
`;
const Label = styled.label`
	font-size: 1rem;
`;
const Upload = ({ setOpen }) => {
	const [img, setImg] = useState(undefined);
	const [video, setVideo] = useState(undefined);
	const [imgPerc, setImgPerc] = useState(0);
	const [videoPerc, setVideoPerc] = useState(0);
	const [inputs, setInputs] = useState({});
	const [tags, setTags] = useState([]);

	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleTags = (e) => {
		setTags(e.target.value.split(" "));
	};

	const uploadFile = (file, urlType) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				urlType === "imgUrl"
					? setImgPerc(Math.round(progress))
					: setVideoPerc(Math.round(progress));
				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
					default:
						break;
				}
			},
			(error) => {},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setInputs((prev) => {
						return { ...prev, [urlType]: downloadURL };
					});
				});
			}
		);
	};

	useEffect(() => {
		video && uploadFile(video, "videoUrl");
	}, [video]);

	useEffect(() => {
		img && uploadFile(img, "imgUrl");
	}, [img]);

	const handleUpload = async (e) => {
		e.preventDefault();
		const res = await axiosInstance.post("/videos", { ...inputs, tags });
		setOpen(false);
		res.status === 200 && navigate(`/video/${res.data._id}`);
	};

	return (
		<Container>
			<Wrapper>
				<Close onClick={() => setOpen(false)}>
					<MdCancel />
				</Close>
				<Title>Upload a New Video</Title>
				<Label>Video:</Label>
				{videoPerc > 0 ? (
					"Uploading:" + videoPerc
				) : (
					<Input
						type="file"
						accept="video/*"
						onChange={(e) => setVideo(e.target.files[0])}
						required
					/>
				)}
				<Input
					type="text"
					placeholder="Title"
					name="title"
					onChange={handleChange}
					required
				/>
				<Desc
					placeholder="Description"
					name="desc"
					rows={8}
					onChange={handleChange}
					required
				/>
				<Input
					type="text"
					placeholder="Separate the tags with space."
					onChange={handleTags}
				/>
				<Label>Image:</Label>
				{imgPerc > 0 ? (
					"Uploading:" + imgPerc + "%"
				) : (
					<Input
						type="file"
						accept="image/*"
						onChange={(e) => setImg(e.target.files[0])}
						required
					/>
				)}
				<ButtonUpload onClick={handleUpload}>Upload</ButtonUpload>
			</Wrapper>
		</Container>
	);
};

export default Upload;
