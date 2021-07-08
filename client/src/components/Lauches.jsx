import React, { useState, useEffect, useLayoutEffect } from 'react';
import gql from 'graphql-tag';
import LaunchItem from './LaunchItem';
import { useLazyQuery } from "react-apollo";
import Search from "./Search";
import LoadingScreen from './LoadingScreen';


const LAUNCHES_QUERY = gql`
query LauchesQuery($miss_name:String){
	launches(miss_name:$miss_name) {
		id
		name
		date_local
		success
		details
	}
}
`;


export default function Lunches() {

	const [search, setSearch] = useState("");
	const [fetchData, { loading, data, error }] = useLazyQuery(LAUNCHES_QUERY);


	useLayoutEffect(() => {

		let timer = setTimeout(() => {
			fetchData({
				variables: {
					miss_name: search
				}
			});
		}, 500);

		return () => {
			clearTimeout(timer);
		};

	}, [search]);




	const handleSearch = (e) => {
		setSearch(e.target.value);

	};



	if (loading) return <><LoadingScreen /><Search handleSearch={handleSearch} search={search} /></>;
	if (error) return console.log(error);


	return (
		<>
			<Search handleSearch={handleSearch} search={search} />
			{/* <h4 className="display-6 my-3">Launches</h4> */}
			{
				data?.launches?.map(launch => (
					<LaunchItem key={launch.id} launch={launch} details={launch.details} />
				))
			}
		</>
	);


}


