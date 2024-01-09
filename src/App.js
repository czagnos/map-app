import logo from './logo.svg';
import './App.css';
import React, {Component, useEffect, useState} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {render} from 'react-dom';
import axios from 'axios';


const mapStyles = {
  width: '100%',
  height: '100%',
};


function ApiCall(props) {
    const [posts, setPosts] = useState([]);


    useEffect = () =>  {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        };

        var latitude = document.getElementById("latitude").value
        var longitude = document.getElementById("longitude").value
        var radius = document.getElementById("radius").value

        axios.get('http://localhost:8070/coordinate?longitude=' + longitude + '&latitude=' + latitude + '&radius=' + radius, {headers})
            .then(({data}) => {
                setPosts([data.coordinateList, ...posts])
                console.log(data.coordinateList)
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        <div>
            <p>Latitude:</p>
            <input type="text" id="latitude" defaultValue={-33.8711471}/>
            <p>Longitude:</p>
            <input type="text" id="longitude" defaultValue={151.1978497}/>
            <p>Radius:</p>
            <input type="text" id="radius" defaultValue={1500}/>

            <button id={"submitButton"} onClick={useEffect} > Submit
            </button>

            <Map
                google={props.google}
                zoom={8}
                style={mapStyles}
                defaultCenter={props.default}
                initialCenter={{ lat: -33.8711471, lng: 151.1978497 }}>
                {posts[0]?.map((post, index) => {
                    return <Marker key={index} id={index} position={{
                        lat: post.latitude,
                        lng: post.longitude
                    }}
                                   onClick={() => console.log("You clicked me!")} />
                })}
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJvuPQDeBQstcmg8Ki7z9u9fZh3ZwGuKE'
})(ApiCall);

