
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

export default function LineChart(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const currentDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(currentDate);

        const query = `https://graph.facebook.com/${props.currentPage.id}/insights?access_token=${props.currentPage.access_token}&metric=page_fans&since=${formattedStartDate}&until=${formattedEndDate}`;
        let rawData = [];
        const fetchData = async () => {
            try {
                const response = await axios.get(query);
                rawData = response.data.data[0].values.map((e) => (e.value));
                const documentStyle = getComputedStyle(document.documentElement);
                const textColor = documentStyle.getPropertyValue('--text-color');
                const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
                const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

                
                const data = {
                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                    datasets: [
                        {
                            label: 'Likes during the last 30 days',
                            data: rawData,
                            fill: false,
                            borderColor: documentStyle.getPropertyValue('--blue-500'),
                            tension: 0.4
                        }
                        // ,
                        // {
                        //     label: 'Second Dataset',
                        //     data: [28, 48, 40, 19, 86, 27, 90],
                        //     fill: false,
                        //     borderColor: documentStyle.getPropertyValue('--pink-500'),
                        //     tension: 0.4
                        // }
                    ]
                };
                const options = {
                    maintainAspectRatio: false,
                    aspectRatio: 0.6,
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: textColorSecondary
                            },
                            grid: {
                                color: surfaceBorder
                            }
                        },
                        y: {
                            ticks: {
                                color: textColorSecondary
                            },
                            grid: {
                                color: surfaceBorder
                            }
                        }
                    }
                };
                setChartData(data);
                setChartOptions(options);
                // console.log(rawData);
            } catch (error) {
            console.error('Error fetching LineChart:', error);
            }
        };

        


        fetchData();
        
        

        
        }, [props.currentPage]);

        function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
        }


    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
        