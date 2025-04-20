import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import './App.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, 
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,  
  Title,
  Tooltip,
  Legend
);

function App() {
    const [insights, setInsights] = useState(null);
    const [theme, setTheme] = useState('light');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('./ev_insights.json')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data) => setInsights(data))
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError(error.message);
            });
    }, []);
    const getChartOptions = (title) => ({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
              labels: {
                  color: theme === 'dark' ? '#fff' : '#666'
              }
          },
          title: {
              display: true,
              text: title,
              font: {
                  size: 16,
                  weight: 'bold'
              },
              color: theme === 'dark' ? '#fff' : '#666'
          },
      },
      scales: {
          y: {
              beginAtZero: true,
              title: {
                  display: true,
                  text: 'Number of Sales',
                  color: theme === 'dark' ? '#fff' : '#666'
              },
              ticks: {
                  color: theme === 'dark' ? '#fff' : '#666'
              },
              grid: {
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }
          },
          x: {
              title: {
                  display: true,
                  text: 'Year',
                  color: theme === 'dark' ? '#fff' : '#666'
              },
              ticks: {
                  color: theme === 'dark' ? '#fff' : '#666'
              },
              grid: {
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
              }
          }
      }
  });
    if (error) {
        return <div className="text-center mt-20 text-lg text-red-500">Error: {error}</div>;
    }

    if (!insights) {
        return <div className="text-center mt-20 text-lg">Loading...</div>;
    }
    return (
      <div className={`app ${theme}`}>
          <TopBar theme={theme} setTheme={setTheme} />
          <div className="container">
              <Sidebar />
              <main>
                <div className='header'>
                  <h1 className='title' align="center">Electric Vehicle Insights</h1>
                  <p className='ev-description' align="center">Explore the latest trends in Electric Vehicle sales and market share.</p>
                </div>
                  <div className='year-trend-chart'>
                  <div className='line-chart'>
                  <Line
                  data={{
                      labels: Object.keys(insights.year_trend),
                      datasets: [
                          {
                              label: 'Yearly EV Sales',
                              data: Object.values(insights.year_trend),
                              borderColor: '#4CAF50',
                              backgroundColor: 'rgba(76, 175, 80, 0.)',
                              tension: 0.1,
                              borderWidth: 2,
                              pointRadius: 4,
                              pointHoverRadius: 6,
                          },
                      ],
                  }}
                  options={getChartOptions('Yearly EV Sales Trend')}

                />
                </div>
                <div className='line-chart'>
                  <Bar
                  data={{
                      labels: Object.keys(insights.top_makers),
                      datasets: [
                          {
                              label: 'Yearly EV Sales',
                              data: Object.values(insights.top_makers),
                              borderColor: 'pink',
                              backgroundColor: 'rgba(76, 175, 80, 0.)',
                              tension: 0.1,
                              borderWidth: 2,
                              pointRadius: 4,
                              pointHoverRadius: 6,
                          },
                      ],
                  }}
                  options={getChartOptions('Top EV Makers')}
                />
                </div>
                </div>
                <div className='records'>
    <div className='records-grid'>
        <div className='record-item'>
            <h3>Top County</h3>
            <p>{Object.entries(insights.top_counties)[0][0]}: {Object.entries(insights.top_counties)[0][1]}</p>
        </div>
        <div className='record-item'>
            <h3>Top City</h3>
            <p>{Object.entries(insights.top_cities)[0][0]}: {Object.entries(insights.top_cities)[0][1]}</p>
        </div>
        <div className='record-item'>
            <h3>Top Car Maker</h3>
            <p>{Object.entries(insights.top_makers)[0][0]}: {Object.entries(insights.top_makers)[0][1]}</p>
        </div>
        <div className='record-item'>
            <h3>Top Car Model</h3>
            <p>{Object.entries(insights.top_model_counts)[0][0]}: {Object.entries(insights.top_model_counts)[0][1]}</p>
        </div>
        <div className='record-item'>
            <h3>Top Postal Code</h3>
            <p>{Object.entries(insights.top_postal_codes)[0][0]}: {Object.entries(insights.top_postal_codes)[0][1]}</p>
        </div>
        <div className='record-item'>
            <h3>Top Legislative District</h3>
            <p>District {Object.entries(insights.top_legislative_districts_counts)[0][0]}: {Object.entries(insights.top_legislative_districts_counts)[0][1]}</p>
        </div>
        </div>
      </div>
      <div className="footer">
        <p>© 2025 EV Insights. All rights reserved.</p>
      </div>
      </main>
      </div>
      </div>
  );
}

export default App;