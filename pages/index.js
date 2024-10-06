// frontend/pages/index.js
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';  // Import React Hot Toast for notifications
import { FaLink, FaCopy } from 'react-icons/fa';  // Import the link and copy icons

export default function Home() {
  const [url, setUrl] = useState('');  // State to hold the original URL
  const [shortUrl, setShortUrl] = useState('');  // State to hold the shortened URL

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the original URL to the Flask backend to get a shortened URL
      const response = await axios.post('https://shorturldb.onrender.com/shorten', { url });
      setShortUrl(response.data.short_url);
      toast.success('URL shortened successfully!');  // Show success notification
    } catch (error) {
      toast.error('Error shortening URL');  // Show error notification
    }
  };

  // Function to copy the shortened URL to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      toast.success('URL copied to clipboard!');  // Show success notification
    }).catch(() => {
      toast.error('Failed to copy URL');  // Show error if copying fails
    });
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">
            <FaLink />
          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="short-url">
          <p>
            Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
            {/* Add the copy icon next to the shortened URL */}
            <FaCopy className="copy-icon" onClick={handleCopy} />
          </p>
        </div>
      )}

      {/* Styling for the page */}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        .input-group {
          display: flex;
          width: 400px;
        }
        input {
          flex: 1;
          padding: 10px;
          font-size: 1.2rem;
        }
        button {
          padding: 10px;
          font-size: 1.2rem;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        .short-url {
          margin-top: 20px;
        }
        .short-url p {
          display: inline-flex;
          align-items: center;
        }
        .copy-icon {
          margin-left: 10px;
          cursor: pointer;
          font-size: 1.5rem;  /* Increased size */
          color: #0070f3;  /* Icon color */
          padding: 5px;  /* Padding for better click area */
          border: 1px solid #0070f3;  /* Border to match the color */
          border-radius: 5px;  /* Rounded corners */
          transition: background-color 0.3s, color 0.3s;  /* Transition effects */
        }
        .copy-icon:hover {
          background-color: #0070f3;  /* Background color on hover */
          color: white;  /* Change icon color on hover */
        }
      `}</style>
    </div>
  );
}
