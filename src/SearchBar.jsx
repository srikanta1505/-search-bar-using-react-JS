import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard";

const SearchBar = () => {
	const [search, setSearch] = useState("");
	const [result, setResult] = useState([]);

	useEffect(() => {
		if (search !== "")
			fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
				.then((res) => res.json())
				.then((data) => {
					setResult(data);
					console.log(data);
				});
	}, [search]);

	const HandleCloseClick = () => {
		setSearch("");
		setResult([]);
	};

	return (
		<>
			<h2 className="  text-center m-10 font-extrabold text-3xl ">
				React Search Bar
			</h2>
			<div className="flex items-center justify-center">
				<input
					className="h-9 pl-4 w-96 outline-none text-gray-600 border-2 border-solid border-gray-400 rounded-l-full"
					type="text"
					value={search}
					placeholder="Search..."
					onChange={(e) => setSearch(e.target.value)}
					required
				/>
				{search === "" ? (
					<span className="cursor-pointer font-bold outline-none text-xl h-9 w-12 pl-2 border-2 border-solid rounded-r-full bg-gray-400 border-gray-400">
						🔍
					</span>
				) : (
					<span
						onClick={HandleCloseClick}
						className="cursor-pointer font-bold outline-none text-xl h-9 w-12 pl-3 border-2 border-solid rounded-r-full bg-gray-400 border-gray-400"
					>
						X
					</span>
				)}
			</div>
			<div className="flex items-center justify-center">
				<div className=" flex justify-center items-center flex-wrap h-9 w-96 ">
					{result.map((item) => (
						<div
							className="h-9 w-96"
							key={item.show.url}
						>
							<a
								href={item.show.url}
								className="flex h-9 pl-4 w-96 items-center cursor-pointer hover:bg-gray-300 rounded-full "
							>
								{item.show.name}
							</a>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default SearchBar;
