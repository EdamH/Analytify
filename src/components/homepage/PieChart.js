import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import { Skeleton } from 'primereact/skeleton';


function PieChart(props) {
    function getRandomColors(numColors) {
        const colors = [];

        for (let i = 0; i < numColors; i++) {
            const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            colors.push(color);
        }

        return colors;
    }

    function darkenColor(color) {
        const HEX_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        const [, red, green, blue] = HEX_REGEX.exec(color);
        const darkerRed = Math.floor(parseInt(red, 16) * 0.8);
        const darkerGreen = Math.floor(parseInt(green, 16) * 0.8);
        const darkerBlue = Math.floor(parseInt(blue, 16) * 0.8);
        return `#${darkerRed.toString(16)}${darkerGreen.toString(16)}${darkerBlue.toString(16)}`;
    }

    
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    // const [backgroundColors, setBackgroundColors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let rawData = {};
        
        const query = `https://graph.facebook.com/${props.currentPage.id}/insights?access_token=${props.currentPage.access_token}&metric=page_fans_gender_age`;
        console.log(query)
        const fetchData = async () => {
            axios.get(query, {})
                .then(response => {
                    rawData = response.data.data[0].values[0].value;
                    let backgroundColors = getRandomColors(Object.keys(response.data.data[0].values[0].value).length);
                    const data = {
                        labels: rawData && Object.keys(rawData),
                        datasets: [
                            {
                                data: Object.values(rawData),
                                backgroundColor: backgroundColors && backgroundColors,
                                hoverBackgroundColor: backgroundColors && backgroundColors.map(e => darkenColor(e))
                            }
                        ]
                    };
                    const options = {
                        plugins: {
                            legend: {
                                labels: {
                                    usePointStyle: true,
                                }
                            }
                        }
                    };
                    setChartData(data);
                    setChartOptions(options);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching PieChart:', error.message);
                })
                ;

        };
    
        
        
        

        fetchData();
        
        // console.log(data);
    }, [props.currentPage]);

    if (isLoading) {
        return (
        <div className="card d-flex justify-content-center align-items-center">
            <Skeleton shape="circle" size="30rem"></Skeleton>;
        </div> 
        )
    }
    return (
        <div className="card flex justify-content-center">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
        </div>
    )
}

export default PieChart