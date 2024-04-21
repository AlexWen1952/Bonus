import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
 fetchData() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json()) // Parse JSON
        .then(data => {
            console.log(JSON.stringify(data));

            // Process the data            
            var item = data[0];
            document.getElementById('image-id').textContent = "Image ID: " + item['id'];
            document.getElementById('image-width').textContent = "Image Width: " + item['width'];
            document.getElementById('image-height').textContent = "Image Height: " + item['height'];

            var img = document.createElement('img');
            img.src = item['url'];
            document.getElementById('image-container').appendChild(img);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

 handleRefresh = () => {
  document.getElementById('image-container').innerHTML = '';
  this.fetchData();
};

// Call the fetchData function when the page loads
  render() {
    return (
      <div>
        {/* Your component content */}
        <button onClick={this.handleRefresh}>Refresh</button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

  